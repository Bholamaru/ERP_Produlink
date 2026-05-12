import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPlus, FaPrint, FaRegEye, FaEdit, FaFilePdf } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DailyDispatchPlan.css";

const DailyDispatchPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // "list" or "new"
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchCustName, setSearchCustName] = useState(false);
  const [custName, setCustName] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [itemSummary, setItemSummary] = useState([]);
  const [poList, setPoList] = useState([]);
  const [stockList, setStockList] = useState([]);
  
  const [formData, setFormData] = useState({
    planDate: new Date().toISOString().split('T')[0],
    customerName: "",
    item: "",
    stock: "",
    planQuantity: "",
    heatCode: "",
    heatNo: "",
    challanNo: "",
    poNo: "",
    selectMaterial: "",
    machine: "",
    dieNo: "",
    material: "",
    weight: "",
    trayWeight: "",
    deptPpc: "",
    deptCc: "",
    statusRemark: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        plan_date: formData.planDate,
        customer_name: formData.customerName,
        item: formData.item,
        stock: formData.stock,
        plan_quantity: formData.planQuantity,
        heat_code: formData.heatCode,
        heat_no: formData.heatNo,
        challan_no: formData.challanNo,
        po_no: formData.poNo,
        select_material: formData.selectMaterial,
        machine: formData.machine,
        die_no: formData.dieNo,
        material: formData.material,
        weight: formData.weight,
        tray_weight: formData.trayWeight,
        dept_ppc: formData.deptPpc,
        dept_cc: formData.deptCc,
        status_remark: formData.statusRemark
      };

      const response = await fetch("https://erp-render.onrender.com/Planning/dispatch-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success("Dispatch Plan saved successfully!");
        // Reset form to blank state after saving
        setFormData({
          planDate: new Date().toISOString().split('T')[0],
          customerName: "",
          item: "",
          stock: "",
          planQuantity: "",
          heatCode: "",
          heatNo: "",
          challanNo: "",
          poNo: "",
          selectMaterial: "",
          machine: "",
          dieNo: "",
          material: "",
          weight: "",
          trayWeight: "",
          deptPpc: "",
          deptCc: "",
          statusRemark: ""
        });
      } else {
        const errorData = await response.text();
        console.error("Save failed:", errorData);
        toast.error("Failed to save Dispatch Plan!");
      }
    } catch (error) {
      console.error("Error saving dispatch plan:", error);
      toast.error("Network error while saving!");
    }
  };

  const fetchPOList = async () => {
    if (!formData.customerName || !formData.item) return;
    try {
      const token = localStorage.getItem("accessToken");
      
      // Extract Customer Name | Number
      const customerObj = customerList.find(c => 
        (c.Name || c.customer_name || c.CustomerName) === formData.customerName ||
        `${c.Name || c.customer_name || c.CustomerName} | ${c.number || ""}` === formData.customerName
      );
      
      const custParam = customerObj 
        ? `${customerObj.Name || customerObj.customer_name || customerObj.CustomerName} | ${customerObj.number || ""}` 
        : formData.customerName;

      // Extract Item (User's example item_no=FGFG1002 matches the first part of the string)
      const itemParts = formData.item.split(" | ");
      const itemNoParam = itemParts[0].trim();

      const url = `https://erp-render.onrender.com/Planning/salesorder-po-search/?customer=${encodeURIComponent(custParam)}&item_no=${encodeURIComponent(itemNoParam)}`;
      
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Handle different API response structures
        const list = Array.isArray(data) ? data : (data.data || []);
        
        // Map to a consistent format (strings)
        const formattedList = list.map(item => {
           if (typeof item === 'string') return item;
           // Use keys found in the error message (cust_po) and other common variations
           const val = item.cust_po || item.Cust_PO_No || item.PO_No || item.po_no || item.po_number || "";
           return typeof val === 'object' ? "" : String(val);
        }).filter(Boolean);

        setPoList(formattedList);
      } else {
        setPoList([]);
      }
    } catch (error) {
      console.error("Error fetching PO list:", error);
      setPoList([]);
    }
  };  const fetchStockList = async () => {
    if (!formData.item) return;
    try {
      const token = localStorage.getItem("accessToken");
      const itemParts = formData.item.split(" | ");
      const itemNoParam = itemParts[0].trim();

      const url = `https://erp-render.onrender.com/Planning/dispatch-stock-wip/?q=${encodeURIComponent(itemNoParam)}`;
      
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Extract lots from last_operation as requested
        const lots = data.last_operation?.lots || [];
        setStockList(lots);
      } else {
        setStockList([]);
      }
    } catch (error) {
      console.error("Error fetching stock list:", error);
      setStockList([]);
    }
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    fetchCustomers();
    fetchItemSummary();
  }, [sideNavOpen]);

  useEffect(() => {
    if (formData.item) {
      fetchStockList();
    }
    if (formData.customerName && formData.item) {
      fetchPOList();
    }
  }, [formData.customerName, formData.item]);

  const fetchItemSummary = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/All_Masters/api/item/summary/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setItemSummary(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://erp-render.onrender.com/Planning/customer/list/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        // Access the "data" array inside the response object
        setCustomerList(Array.isArray(result.data) ? result.data : []);
      } else {
        setCustomerList([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerList([]);
    }
  };

  return (
    <div className="DailyDispatchPlanMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                 {currentView === "list" ? (
                  <div className="DailyDispatchPlan mt-2">
                    {/* Header */}
                    <div className="DailyDispatchPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                      <h6 className="header-title mb-0">Dispatch Plan List</h6>
                      <div className="header-actions d-flex gap-2">
                          <button className="erp-btn-cyan d-flex align-items-center gap-1" onClick={() => setCurrentView("new")}>
                             New Dispatch Plan
                          </button>
                          <button className="erp-btn-cyan d-flex align-items-center gap-1">
                             Dispatch Plan : Report
                          </button>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="DailyDispatchPlan-Filters p-2 border-bottom bg-white">
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                          <label className="filter-label">From Date :</label>
                          <input 
                            type="date" 
                            className="form-control form-control-xs" 
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="filter-label">To Date :</label>
                          <input 
                            type="date" 
                            className="form-control form-control-xs" 
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="searchCustCheck"
                            checked={searchCustName}
                            onChange={(e) => setSearchCustName(e.target.checked)}
                          />
                          <label htmlFor="searchCustCheck" className="filter-label">Search Cust Name :</label>
                          <input 
                            type="text" 
                            className="form-control form-control-xs" 
                            placeholder="Enter Name.."
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            style={{ width: '180px' }}
                          />
                        </div>
                        <div className="d-flex gap-2">
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             <FaSearch size={10} /> Search
                          </button>
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             <FaPrint size={10} /> View Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="DailyDispatchPlan-Content" style={{ minHeight: '450px', backgroundColor: '#fff' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered erp-table text-center mb-0">
                          <thead>
                            <tr>
                              <th style={{ width: '50px' }}>SR.</th>
                              <th style={{ width: '120px' }}>DATE</th>
                              <th>CUSTNAME</th>
                              <th style={{ width: '60px' }}>EDIT</th>
                              <th style={{ width: '60px' }}>VIEW</th>
                              <th style={{ width: '60px' }}>VIEW</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Placeholder row to match screenshot */}
                            <tr style={{ height: '350px' }}>
                              <td colSpan="6"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="DailyDispatchPlan-Footer d-flex justify-content-end align-items-center p-1 bg-white border-top">
                      <div className="d-flex align-items-center gap-2">
                        <label className="filter-label mb-0">Report Format :</label>
                        <select className="form-select form-select-xs" style={{ width: '100px' }}>
                          <option>PDF</option>
                          <option>Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="DispatchPlanEntry mt-2">
                    {/* Entry Header */}
                    <div className="DailyDispatchPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                      <h6 className="header-title mb-0" style={{ color: 'blue' }}>Dispatch Plan</h6>
                      <button className="erp-btn-grey-sm d-flex align-items-center gap-1" onClick={() => setCurrentView("list")}>
                         Dispatch Plan List
                      </button>
                    </div>

                    <div className="p-3 bg-white border rounded-bottom shadow-sm">
                      <ToastContainer position="top-right" autoClose={2000} />
                      {/* Mandatory Fields Section */}
                      <div className="section-title mb-2 d-flex align-items-center gap-2">
                        <span style={{ color: '#007bff' }}>🔹 Mandatory Fields</span>
                      </div>
                      
                      <div className="row g-3 mb-4">
                        {/* Row 1 */}
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Plan Date :</label>
                            <input 
                              type="date" 
                              name="planDate"
                              className="form-control form-control-sm" 
                              value={formData.planDate} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>

                        {/* Row 2 */}
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Customer Name :</label>
                            <input 
                              type="text" 
                              name="customerName"
                              className="form-control form-control-sm" 
                              placeholder="Enter Cust Name.." 
                              list={formData.customerName.length > 0 ? "customerListOptions" : ""}
                              value={formData.customerName}
                              onChange={handleInputChange}
                            />
                            <datalist id="customerListOptions">
                              {Array.isArray(customerList) && customerList.map((c, idx) => (
                                <option 
                                  key={idx} 
                                  value={`${c.Name || c.customer_name || c.CustomerName || ""} | ${c.number || ""}`} 
                                />
                              ))}
                            </datalist>
                            <button className="erp-btn-grey-sm d-flex align-items-center gap-1" style={{ height: '26px' }}>
                              <FaSearch size={10} /> Search
                            </button>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Item :</label>
                            <input 
                              type="text" 
                              name="item"
                              className="form-control form-control-sm" 
                              placeholder="Enter Item Name.." 
                              list={formData.item.length > 0 ? "itemListOptions" : ""}
                              value={formData.item}
                              onChange={handleInputChange}
                            />
                            <datalist id="itemListOptions">
                              {itemSummary.map((it, idx) => (
                                <option 
                                  key={idx} 
                                  value={`${it.part_no || ""} | ${it.Part_Code || ""} | ${it.Name_Description || ""}`} 
                                />
                              ))}
                            </datalist>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Stock :</label>
                            <select 
                              className="form-select form-select-sm"
                              name="stock"
                              value={formData.stock}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Stock</option>
                              {stockList.map((st, idx) => {
                                const displayVal = `${st.lot_no || ""} | ${st.prod_qty || 0}`;
                                return (
                                  <option key={idx} value={displayVal}>
                                    {displayVal}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Plan Quantity :</label>
                            <input 
                              type="text" 
                              name="planQuantity"
                              className="form-control form-control-sm" 
                              value={formData.planQuantity}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Heat Code :</label>
                            <input 
                              type="text" 
                              name="heatCode"
                              className="form-control form-control-sm" 
                              value={formData.heatCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Heat No :</label>
                            <input 
                              type="text" 
                              name="heatNo"
                              className="form-control form-control-sm" 
                              value={formData.heatNo}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Optional Fields Section */}
                      <div className="section-title mb-2 d-flex align-items-center gap-2 border-top pt-3">
                        <span style={{ color: '#007bff' }}>🔹 Optional Fields</span>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '130px' }}>Cust/Ref. Challan No :</label>
                            <input 
                              type="text" 
                              name="challanNo"
                              className="form-control form-control-sm" 
                              value={formData.challanNo}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>PO No :</label>
                            <select 
                              className="form-select form-select-sm"
                              name="poNo"
                              value={formData.poNo}
                              onChange={handleInputChange}
                            >
                              <option value="">Select PO</option>
                              {poList.map((po, idx) => (
                                <option key={idx} value={po}>
                                  {po}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Select Material :</label>
                            <input 
                              type="text" 
                              name="selectMaterial"
                              className="form-control form-control-sm" 
                              value={formData.selectMaterial}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Machine :</label>
                            <input 
                              type="text" 
                              name="machine"
                              className="form-control form-control-sm" 
                              value={formData.machine}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>DIE No :</label>
                            <input 
                              type="text" 
                              name="dieNo"
                              className="form-control form-control-sm" 
                              value={formData.dieNo}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Material :</label>
                            <textarea 
                              name="material"
                              className="form-control form-control-sm" 
                              rows="1"
                              value={formData.material}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Weight :</label>
                            <input 
                              type="text" 
                              name="weight"
                              className="form-control form-control-sm" 
                              value={formData.weight}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Tray Weight :</label>
                            <input 
                              type="text" 
                              name="trayWeight"
                              className="form-control form-control-sm" 
                              value={formData.trayWeight}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Dept (PPC) :</label>
                            <input 
                              type="text" 
                              name="deptPpc"
                              className="form-control form-control-sm" 
                              value={formData.deptPpc}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Dept (CC) :</label>
                            <input 
                              type="text" 
                              name="deptCc"
                              className="form-control form-control-sm" 
                              value={formData.deptCc}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <label className="form-label-sm flex-shrink-0" style={{ width: '120px' }}>Status / Remark :</label>
                            <textarea 
                              name="statusRemark"
                              className="form-control form-control-sm" 
                              rows="1"
                              value={formData.statusRemark}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 border-top pt-3 d-flex justify-content-start">
                        <button 
                          className="erp-btn-cyan d-flex align-items-center gap-2 px-4 py-2"
                          onClick={handleSave}
                        >
                          <FaPlus size={14} /> Save {`>>`}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-2 bg-light border text-danger text-center" style={{ fontSize: '12px' }}>
                       No Data Found !!
                    </div>
                  </div>
                )}

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDispatchPlan;
