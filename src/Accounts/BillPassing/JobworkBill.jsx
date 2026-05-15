import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./JobworkBill.css";
import axios from "axios";
import { FaEye, FaCheck, FaPlus, FaTrash, FaFileExcel, FaSearch, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const JobworkBill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selectedGrns, setSelectedGrns] = useState(location.state?.selectedGrns || []);
  const [loading, setLoading] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const formatDateToISO = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const parts = dateStr.split(/[/-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  const handleAddGrn = (grn) => {
    if (!selectedGrns.some(item => item.id === grn.id)) {
      setSelectedGrns([...selectedGrns, grn]);
    }
  };

  const handleRemoveGrn = (id) => {
    setSelectedGrns(selectedGrns.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const fetchSuppliers = async (search) => {
    if (!search) {
      setSupplierList([]);
      return;
    }
    try {
      const response = await axios.get(`https://erp-render.onrender.com/Purchase/Fetch_Supplier_Code/`, {
        params: { search }
      });
      console.log("Supplier Suggestion API Response:", response.data);
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      if (Array.isArray(data)) {
        setSupplierList(data);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleVendorChange = (e) => {
    const value = e.target.value;
    setVendorName(value);
    fetchSuppliers(value);
  };

  const handleSearch = async (type = 'date') => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      let url = `https://erp-render.onrender.com/Account/inwardchllan-date-fillter/`;
      let params = {};

      if (type === 'supplier') {
        params = { supplier_name: vendorName };
      } else {
        if (!fromDate || !toDate) {
          alert("Please select both From and To dates.");
          setLoading(false);
          return;
        }
        params = { from_date: fromDate, to_date: toDate };
      }

      const response = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Inward Challan API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        const mappedData = response.data.data.flatMap((item) => {
          // Handle potential nested items (like in InwardChallanTable or item_details)
          const nestedItems = item.InwardChallanTable || item.item_details || [item];
          
          return nestedItems.map((detail, idx) => ({
            id: `${item.id}-${idx}`,
            year: item.Series || item.series || item.Year || item.Series_No || "",
            grnNo: item.InwardF4No || item.no || item.Inward_no || item.No || item.PoNo || "",
            grnDate: item.InwardDate || item.challan_date || item.Date || item.PoDate || "",
            type: item.Series || item.bill_type || "Our_F4",
            vendChNo: item.ChallanNo || item.challan_no || item.Invoice_No || item.invoice_no || "",
            chDate: formatDateToISO(item.ChallanDate || item.challan_no_date || item.challan_date || item.Date || ""),
            code: item.CodeNo || item.SupplierCode || item.supplier_code || item.Code || item.Supp_Code || "",
            vendor: item.SupplierName || item.supplier_name || item.Supplier || item.vendor_name || "",
            f4Out: item.OutwardChallan || item.OutwardChallanNo || item.f4_out_no || item.Outward_no || "",
            qtyDesc: (() => {
              const qty = detail.InQtyNOS || detail.InQtyKg || item.TotalQtyNo || "0";
              const desc = detail.ItemDescription || detail.description || "";
              const cleanDesc = desc.split('| Qty:')[0].trim();
              return `Qty: ${qty} | ${cleanDesc}`;
            })(),
            qty: detail.InQtyNOS || detail.InQtyKg || item.TotalQtyNo || 0,
            itemNo: (() => {
              const base = detail.ItemNo || detail.item_no || detail.PartNo || "";
              if (base) return base;
              const desc = detail.ItemDescription || detail.description || detail.ItemName || "";
              // Match "Part: CODE - NO" or just "gr1..." / "FG..." at start
              const partMatch = desc.match(/Part:\s*[^-\|]+-\s*([^-\|]+)/i);
              if (partMatch) return partMatch[1].trim();
              return "1";
            })(),
            itemCode: (() => {
              const base = detail.ItemCode || detail.item_code || detail.Code || "";
              if (base) return base;
              const desc = detail.ItemDescription || detail.description || detail.ItemName || "";
              const partMatch = desc.match(/Part:\s*([^-\|]+)/i);
              if (partMatch) return partMatch[1].trim();
              // Try to extract first word if it looks like a code
              const wordMatch = desc.match(/^([A-Z0-9]+)/i);
              return wordMatch ? wordMatch[1].trim() : "";
            })(),
            itemDesc: detail.ItemDescription || detail.description || detail.ItemName || "",
            hsnCode: detail.HSNCode || detail.hsn_code || "998898",
            rate: detail.Rate || detail.rate || 0,
            poNo: item.PoNo || detail.PoNo || item.PO_No || item.Po_No || "",
            poDate: item.PoDate || detail.PoDate || "",
            cgst: detail.CGST_P || detail.cgst || 0,
            sgst: detail.SGST_P || detail.sgst || 0,
            igst: detail.IGST_P || detail.igst || 0,
            user: item.PreparedBy || item.created_by_username || item.User || "Admin"
          }));
        });
        console.log("Mapped Jobwork Report Data:", mappedData);
        setReportData(mappedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching Inward Challan data:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="jobwork-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start">
                          Pending Bill Inward Challan List
                        </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center bg-white">
                          <span className="me-2 small fw-bold">57F4 GRN Auth-Pending Bill :</span>
                          <span className="badge bg-primary">1193</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center bg-white">
                          <span className="me-2 small fw-bold">Bill Passing (JobWork) :</span>
                          <span className="badge bg-primary">1193</span>
                        </div>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="row align-items-end g-3 mb-2">
                      <div className="col-md-1">
                        <label className="form-label mb-1 small fw-bold">Plant :</label>
                        <select className="form-select form-select-sm">
                          <option value="SHARP">SHARP</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold">From Date :</label>
                        <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                      </div>
                      <div className="col-md-2 me-4">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">To Date :</label>
                            <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0" onClick={() => handleSearch('date')} disabled={loading}>
                            <FaSearch size={10} /> {loading ? "..." : "Search"}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">Vendor Name :</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              placeholder="Enter Name ..." 
                              value={vendorName} 
                              onChange={handleVendorChange} 
                              list="vendor-suggestions"
                            />
                            <datalist id="vendor-suggestions">
                              {supplierList.map((sup, idx) => (
                                <option 
                                  key={idx} 
                                  value={typeof sup === 'string' ? sup : (sup.Name || sup.supplier_name || sup.Supplier || sup.supplier || "")} 
                                />
                              ))}
                            </datalist>
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0" onClick={() => handleSearch('supplier')} disabled={loading}>
                            <FaSearch size={10} /> {loading ? "..." : "Search"}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <select className="form-select form-select-sm fw-bold border-bottom-0 rounded-bottom-0 mb-0">
                              <option>57F4 GRN No</option>
                            </select>
                            <input type="text" className="form-control form-control-sm rounded-top-0" placeholder="No..." />
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0">
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Table */}
                  <div className="table-responsive top-table-container">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>57F4 GRNNo</th>
                          <th>GRN Date</th>
                          <th>57F4Type</th>
                          <th>Vend Ch.No</th>
                          <th>Ch. Date</th>
                          <th>Code</th>
                          <th>Vendor Name</th>
                          <th>f4 out no</th>
                          <th>Item Qty | Desc</th>
                          <th>User</th>
                          <th>Auth1</th>
                          <th>Auth2</th>
                          <th>QC</th>
                          <th>View</th>
                          <th>Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.year}</td>
                            <td>{data.grnNo}</td>
                            <td>{data.grnDate}</td>
                            <td>{data.type}</td>
                            <td>{data.vendChNo}</td>
                            <td>{data.chDate}</td>
                            <td>{data.code}</td>
                            <td>{data.vendor}</td>
                            <td>{data.f4Out}</td>
                            <td className="text-start small" style={{ minWidth: '200px' }}>
                              <span className={data.qtyDesc.includes('Qty') ? 'text-warning' : ''}>
                                {data.qtyDesc}
                              </span>
                            </td>
                            <td>{data.user}</td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td>
                              {index % 3 === 0 ? (
                                <div className="badge bg-success p-1"><FaCheck /></div>
                              ) : (
                                <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                              )}
                            </td>
                            <td><FaEye className="text-primary cursor-pointer" /></td>
                            <td>
                              <button className="btn btn-sm" onClick={() => handleAddGrn(data)}>
                                <FaPlus />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Sub Table Section */}
                  <div className="sub-table-header mt-4 mb-2">
                    <h6 className="fw-bold mb-0">List Of GRN for Bill :</h6>
                  </div>
                  <div className="table-responsive bottom-table-container">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>57F4 GRNNo</th>
                          <th>GRN Date</th>
                          <th>57F4 Type</th>
                          <th>Vend Ch.No</th>
                          <th>Ch. Date</th>
                          <th>Code</th>
                          <th>Vendor Name</th>
                          <th>f4 out no</th>
                          <th>Item Qty | Desc</th>
                          <th>User</th>
                          <th>Select</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedGrns.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.grnNo}</td>
                            <td>{data.grnDate}</td>
                            <td>{data.type}</td>
                            <td>{data.vendChNo}</td>
                            <td>{data.chDate}</td>
                            <td>{data.code}</td>
                            <td>{data.vendor}</td>
                            <td>{data.f4Out}</td>
                            <td className="text-start small">{data.qtyDesc}</td>
                            <td>{data.user}</td>
                            <td><input type="checkbox" checked readOnly /></td>
                            <td>
                              <button className="btn btn-sm text-danger" onClick={() => handleRemoveGrn(data.id)}>
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Actions */}
                  <div className="footer-actions mt-3 text-end">
                    <button 
                      className="btn btn-success d-inline-flex align-items-center gap-2"
                      onClick={() => {
                        if (selectedGrns.length === 0) {
                          alert("Please select at least one GRN.");
                          return;
                        }
                        navigate("/accounts/bill-passing/confirm-gst-bill", { state: { selectedInvoices: selectedGrns } });
                      }}
                    >
                      <FaCheck /> Confirm To GST Bill
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobworkBill;
