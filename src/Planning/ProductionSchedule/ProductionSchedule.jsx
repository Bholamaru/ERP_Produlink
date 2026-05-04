import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel, FaList, FaEye, FaPlus, FaTrash, FaHistory, FaTable, FaCalendarAlt } from "react-icons/fa";
import "./ProductionSchedule.css";

const ProductionSchedule = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // 'list', 'planning', or 'edit'
  const [selectedPeriod, setSelectedPeriod] = useState({ month: "APR-2024", revNo: "0" });
  const [scheduleData, setScheduleData] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Settings/schedule-month/");
      if (response.ok) {
        const result = await response.json();
        const rawData = Array.isArray(result) ? result : (result.data || result.results || []);
        
        const mappedData = rawData.map((item, index) => {
          // Format "MAY 2026" to "MAY-2026" or similar
          const monthYear = (item.month_name || "").replace(" ", "-");
          
          // Format YYYY-MM-DD to DD/MM/YYYY
          const formatDt = (d) => {
            if (!d) return "";
            if (d.includes("/")) return d;
            const [y, m, d1] = d.split("-");
            return `${d1}/${m}/${y}`;
          };

          return {
            id: item.id || index,
            monthYear: monthYear,
            fromDate: formatDt(item.from_date),
            toDate: formatDt(item.to_date),
            revNo: item.rev_no || "0",
            totalItem: item.total_item || 0,
            workingDays: item.w_days || item.w_day || 0
          };
        });
        setScheduleData(mappedData);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const [itemData, setItemData] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [itemList, setItemList] = useState([]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://erp-render.onrender.com/Sales/items/customers-list/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result.results || result || [];
        setCustomers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://erp-render.onrender.com/All_Masters/api/item/summary/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result.results || result || [];
        setItemList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchScheduleItems = async (monthYear) => {
    setLoadingItems(true);
    try {
      // Assuming the API filters by monthYear or similar parameter
      const response = await fetch(`https://erp-render.onrender.com/Planning/production-schedule/?month=${monthYear}`);
      if (response.ok) {
        const result = await response.json();
        const rawItems = Array.isArray(result) ? result : (result.data || result.results || []);
        setItemData(rawItems);
      }
    } catch (error) {
      console.error("Error fetching schedule items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  useEffect(() => {
    fetchSchedules();
    fetchCustomers();
    fetchItems();
  }, []);

  const handleViewStatus = (row) => {
    setSelectedPeriod({ month: row.monthYear, revNo: row.revNo });
    fetchScheduleItems(row.monthYear);
    setCurrentView("planning");
  };

  const [editFormData, setEditFormData] = useState({
    customer_name: "",
    po_no_date: "",
    item_code: "",
    sch_rec_on: "",
    sch_qty: "",
    buffer_qty: "",
    next_month_sc: "0",
    due_dispatch_date: ""
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    // Extract parts if the user selected from the datalist (formatted as "PartNo - PartCode - Description")
    let itemParts = editFormData.item_code.split(" - ");
    let finalItemNo = itemParts[0] || "";
    let finalItemCode = itemParts[1] || itemParts[0] || "";
    let finalItemDesc = itemParts[2] || "";

    const payload = {
      customer_name: editFormData.customer_name,
      po_no_date: editFormData.po_no_date,
      item_no: finalItemNo,
      item_code: finalItemCode,
      item_description: finalItemDesc,
      sch_rec_on: editFormData.sch_rec_on,
      sch_qty: editFormData.sch_qty,
      buffer_qty: editFormData.buffer_qty,
      next_month_sc: editFormData.next_month_sc,
      due_dispatch_date: editFormData.due_dispatch_date,
      month: selectedPeriod.month,
      rev_no: selectedPeriod.revNo
    };

    try {
      const response = await fetch("https://erp-render.onrender.com/Planning/production-schedule/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Item added to schedule successfully!");
        setEditFormData({
          customer_name: "",
          po_no_date: "ALL",
          item_code: "",
          sch_rec_on: "",
          sch_qty: "",
          buffer_qty: "",
          next_month_sc: "0",
          due_dispatch_date: ""
        });
        fetchScheduleItems(selectedPeriod.month); // Refresh the items table
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to add: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error adding schedule item:", error);
    }
  };

  const handleEdit = (row) => {
    setSelectedPeriod({ month: row.monthYear, revNo: row.revNo });
    fetchScheduleItems(row.monthYear);
    setCurrentView("edit");
  };

  return (
    <div className="ProductionScheduleMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* --- CASE 1: SUMMARY LIST VIEW --- */}
                {currentView === "list" && (
                  <div className="ProductionSchedule mt-5">
                    <div className="ProductionSchedule-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title">Production Schedule</h5>
                        </div>
                        <div className="col-md-8 text-end">
                          <button type="button" className="btn me-1">Schedule Search</button>
                          <button type="button" className="btn me-1">Schedule Month Master</button>
                          <button type="button" className="btn me-1">MRP - Report</button>
                          <button type="button" className="btn">Report</button>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col" style={{textAlign: 'left'}}>Month / Year</th>
                            <th scope="col">Total Item</th>
                            <th scope="col">Working Days</th>
                            <th scope="col">View</th>
                            <th scope="col">Action</th>
                            <th scope="col">Planning</th>
                            <th scope="col">Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleData.map((row, index) => (
                            <tr key={row.id}>
                              <td>{index + 1}</td>
                              <td style={{textAlign: 'left'}}>
                                {row.monthYear}&nbsp;
                                <span className="text-muted" style={{ fontSize: "14px" }}>({row.fromDate} – {row.toDate})</span>
                                {row.revNo !== "-" && (
                                  <span className="ms-2" style={{ fontSize: "14px", color: "#0a6638", fontWeight: "bold" }}>Rev No: {row.revNo}</span>
                                )}
                              </td>
                              <td>{row.totalItem}</td>
                              <td>{row.workingDays}</td>
                              <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleViewStatus(row)}>View Status</button>
                              </td>
                              <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Add/Edit</button>
                              </td>
                              <td><button className="btn btn-link">📋</button></td>
                              <td><button className="btn btn-link">📄</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-2 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center" style={{ gap: "4px" }}>
                        <button className="btn btn-sm btn-outline-secondary">Previous</button>
                        <button className="btn btn-sm btn-primary">1</button>
                        <button className="btn btn-sm btn-outline-secondary">Next</button>
                      </div>
                      <div className="d-flex align-items-center">
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>Report Format :</span>
                        <select className="ms-2 form-select form-select-sm" style={{ width: "100px", height: "35px" }}>
                          <option value="PDF">PDF</option>
                          <option value="Excel">Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- CASE 2: PLANNING STATUS VIEW --- */}
                {currentView === "planning" && (
                  <div className="ProductionScheduleStatus mt-5">
                    <div className="ProductionScheduleStatus-header mb-4 text-start">
                      <div className="d-flex justify-content-between align-items-center mb-0">
                        <div className="d-flex align-items-center gap-2">
                          <h5 className="header-title mb-0">Production Schedule Planning</h5>
                          <span className="text-primary fw-bold">{selectedPeriod.month}</span>
                          <span className="fs-6 fw-normal text-muted ms-3">Rev No :</span>
                          <select className="form-select form-select-sm" style={{width: 'auto'}}>
                            <option>ALL</option>
                            <option>{selectedPeriod.revNo}</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-outline-success btn-sm"><FaFileExcel /> Export Excel</button>
                          <button className="btn btn-outline-success btn-sm"><FaFileExcel /> Export Excel V2</button>
                          <button className="btn btn-primary btn-sm btn-schedule-list" onClick={() => setCurrentView("list")}>
                            <FaList /> Schedule List
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ProductionScheduleStatus-Main mb-4">
                      <div className="container-fluid">
                        <div className="row g-3 align-items-end text-start">
                          <div className="col-md-2">
                            <label className="form-label">Report Type :</label>
                            <select className="form-select form-select-sm"><option>Item</option></select>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Select Cust. :</label>
                            <select className="form-select form-select-sm"><option>ALL Customer</option></select>
                          </div>
                          <div className="col-md-3">
                            <div className="d-flex align-items-center gap-2">
                               <input type="checkbox" className="form-check-input" />
                               <label className="form-label mb-0">Select Item :</label>
                            </div>
                            <input type="text" className="form-control form-control-sm mt-1" />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">Item Group :</label>
                            <select className="form-select form-select-sm"><option>ALL</option></select>
                          </div>
                          <div className="col-md-2">
                            <button className="btn btn-primary btn-sm w-100" style={{height: '35px'}}><FaSearch /> Search</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-sm text-center">
                        <thead className="ps-table-header">
                          <tr>
                            <th>Sr.</th><th>Item No / Code</th><th style={{width: '25%'}}>Item Desc</th>
                            <th>Sch.Qty</th><th>Dis.Qty</th><th>Bal.Qty</th><th>Days.Comp</th>
                            <th>Cur.Avg</th><th>Days.Rem.</th><th>Ask.Rate</th>
                            <th style={{width: '120px'}}>Status (%)</th><th>Rev Nos</th><th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemData.map((item, idx) => (
                            <tr key={idx} className="align-middle">
                              <td>{item.sr}</td><td>{(item.itemNo || item.item_no || "-") + " / " + (item.itemCode || item.item_code || "-")}</td>
                              <td className="text-start ps-2">{item.itemDesc || item.item_description || "-"}</td>
                              <td>{item.schQty}</td><td>{item.disQty || 0}</td>
                              <td className="bg-danger text-white fw-bold">{item.balQty}</td>
                              <td>{item.daysComp}</td><td>{item.curAvg}</td><td>{item.daysRem}</td>
                              <td>{item.askRate}</td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" style={{width: `${item.status}%`}}></div>
                                  <span className="progress-text">{item.status}%</span>
                                </div>
                              </td>
                              <td className="text-primary">{item.revNos}</td>
                              <td><button className="btn btn-link p-0 text-dark" onClick={() => setCurrentView("edit")}><FaEye /></button></td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="table-light fw-bold">
                          <tr>
                            <td colSpan="4" className="text-start ps-2">Total Item : 224</td>
                            <td colSpan="2" className="text-end pe-2">Sch.Qty : 13124665</td>
                            <td colSpan="2" className="text-start ps-2">Dis.Qty : 1935214</td>
                            <td colSpan="3" className="text-start ps-2">Bal.Qty: 11189451</td>
                            <td colSpan="3" className="text-start ps-2">Per : 14.74 %</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- CASE 3: ADD/EDIT VIEW --- */}
                {currentView === "edit" && (
                  <div className="ProductionScheduleEdit mt-5">
                    {/* Header */}
                    <div className="ProductionScheduleEdit-header mb-4 text-start">
                       <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <h5 className="header-title mb-0 me-2" style={{color: '#007bff'}}>Edit - Production Schedule</h5>
                            <span className="fw-bold me-1">- Rev No :</span>
                            <select className="form-select form-select-sm d-inline-block" style={{width: '70px'}}>
                              <option>0</option>
                            </select>
                            <span className="ms-4 fw-bold" style={{fontSize: '14px', color: '#007bff'}}>Schedule Type : Sales Order</span>
                          </div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => setCurrentView("list")}>Back to List</button>
                       </div>
                    </div>

                    {/* Entry Form Card - Complete Horizontal Line */}
                    <div className="ProductionScheduleEdit-Form mb-4 p-2 border rounded shadow-sm bg-light overflow-auto">
                       <div className="d-flex align-items-center flex-nowrap gap-3 text-start">
                          <div className="d-flex align-items-center gap-1" style={{width: '210px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Customer Name:</label>
                             <div className="input-group input-group-sm">
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="customer_name" 
                                  list="customerList"
                                  value={editFormData.customer_name} 
                                  onChange={handleEditInputChange} 
                                  placeholder="Enter Name.." 
                                />
                                <datalist id="customerList">
                                  {editFormData.customer_name.length > 0 && customers.map((c, i) => (
                                    <option key={i} value={c.Name || c.customer_name || c.CustomerName || c.party_name || c.name || (typeof c === 'string' ? c : "")} />
                                  ))}
                                </datalist>
                                <button className="btn btn-outline-secondary"><FaSearch /></button>
                             </div>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '180px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>PO Date:</label>
                             <div className="input-group input-group-sm">
                                <input type="date" className="form-control" name="po_no_date" value={editFormData.po_no_date} onChange={handleEditInputChange} id="input-po-date" />
                                <button className="btn btn-outline-secondary p-1" onClick={() => document.getElementById('input-po-date').showPicker()}><FaCalendarAlt /></button>
                             </div>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '220px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Item Name <FaTable />:</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               name="item_code" 
                               list="itemList"
                               value={editFormData.item_code} 
                               onChange={handleEditInputChange} 
                               placeholder="Enter Code No.." 
                             />
                             <datalist id="itemList">
                                {editFormData.item_code.length > 0 && itemList.map((it, i) => {
                                  const displayValue = `${it.part_no || ""} - ${it.Part_Code || ""} - ${it.Name_Description || it.item_description || ""}`;
                                  return (
                                    <option key={i} value={displayValue}>
                                      {displayValue}
                                    </option>
                                  );
                                })}
                             </datalist>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '180px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Rec.On:</label>
                             <div className="input-group input-group-sm">
                                <input type="date" className="form-control" name="sch_rec_on" value={editFormData.sch_rec_on} onChange={handleEditInputChange} id="input-rec-date" />
                                <button className="btn btn-outline-secondary p-1" onClick={() => document.getElementById('input-rec-date').showPicker()}><FaCalendarAlt /></button>
                             </div>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '100px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Qty:</label>
                             <input type="text" className="form-control form-control-sm" name="sch_qty" value={editFormData.sch_qty} onChange={handleEditInputChange} />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '110px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Buffer:</label>
                             <input type="text" className="form-control form-control-sm" name="buffer_qty" value={editFormData.buffer_qty} onChange={handleEditInputChange} />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '100px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Next:</label>
                             <input type="text" className="form-control form-control-sm" name="next_month_sc" value={editFormData.next_month_sc} onChange={handleEditInputChange} />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '240px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Due Date:</label>
                             <div className="input-group input-group-sm">
                                <input type="date" className="form-control" name="due_dispatch_date" value={editFormData.due_dispatch_date} onChange={handleEditInputChange} id="input-due-date" />
                                <button className="btn btn-outline-secondary p-1" onClick={() => document.getElementById('input-due-date').showPicker()}><FaCalendarAlt /></button>
                             </div>
                          </div>
                          <div className="ms-auto">
                             <button className="btn btn-outline-dark btn-sm fw-bold" style={{height: '32px'}} onClick={handleAddItem}>Add>></button>
                          </div>
                       </div>
                    </div>

                    {/* Table View */}
                    <div className="table-responsive edit-table-wrapper">
                       <table className="table table-bordered table-sm text-center align-middle">
                          <thead className="ps-table-header">
                             <tr>
                                <th rowSpan="2">Sr.</th>
                                <th rowSpan="2">Customer Name</th>
                                <th>SO No</th>
                                <th>PO No</th>
                                <th rowSpan="2">Schedule No</th>
                                <th rowSpan="2">Item No / Code</th>
                                <th rowSpan="2">Item Description</th>
                                <th rowSpan="2">Schedule Qty</th>
                                <th rowSpan="2">Cust/ sch Qty</th>
                                <th rowSpan="2">Buffer Qty</th>
                                <th rowSpan="2">Next Month schedule</th>
                                <th rowSpan="2">Schedule Received dt. <FaTable /></th>
                                <th rowSpan="2">Due / Dispatch Dt. <FaTable /></th>
                                <th rowSpan="2">Del</th>
                                <th rowSpan="2"><input type="checkbox" /> All</th>
                                <th rowSpan="2">Create/Update By</th>
                                <th rowSpan="2">Hist</th>
                             </tr>
                             <tr>
                                <th>/ Date</th>
                                <th>/ Date</th>
                             </tr>
                          </thead>
                          <tbody>
                             {itemData.length > 0 ? itemData.map((item, idx) => (
                               <tr key={idx}>
                                 <td>{idx + 1}</td>
                                 <td className="text-start">{item.customer_name}</td>
                                 <td>{item.so_no_date || "-"}</td>
                                 <td>{item.po_no_date || "-"}</td>
                                 <td>{item.schedule_no || "-"}</td>
                                 <td>{(item.item_no || "-") + " / " + (item.item_code || "-")}</td>
                                 <td className="text-start">{item.itemDesc || item.item_description || item.Name_Description || "-"}</td>
                                 <td>{item.sch_qty}</td>
                                 <td>{item.cust_sch_qty || 0}</td>
                                 <td>{item.buffer_qty}</td>
                                 <td>{item.next_month_sc}</td>
                                 <td>{item.sch_rec_on}</td>
                                 <td>{item.due_dispatch_date}</td>
                                 <td><FaTrash className="text-danger" style={{cursor: 'pointer'}} /></td>
                                 <td><input type="checkbox" /></td>
                                 <td>{item.user || "Admin"}</td>
                                 <td><FaHistory /></td>
                               </tr>
                             )) : (
                               <tr style={{height: '200px'}}>
                                  <td colSpan="17" className="text-muted">No records added yet. Use the form above to add items.</td>
                               </tr>
                             )}
                          </tbody>
                       </table>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                       <span className="text-primary fw-bold" style={{cursor: 'pointer', fontSize: '14px'}}>View All Item</span>
                       <button className="btn btn-light btn-sm border shadow-sm"><FaTrash className="me-1" /> Delete Selected</button>
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

export default ProductionSchedule;
