import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseRegister.css";
import { FaFileExcel, FaSearch, FaEye, FaEdit, FaTrash, FaFileAlt, FaExclamationTriangle, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

const PurchaseRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Query");
  const [masterTab, setMasterTab] = useState("Query Master");
  const [detailsTab, setDetailsTab] = useState("Query");
  
  const [fromDate, setFromDate] = useState("2026-04-01");
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      
      const [jobworkResponse, purchaseResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/Account/jobwork-bill-register/?from_date=${fromDate}&to_date=${toDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching jobwork bills:", err);
          return { data: [] };
        }),
        axios.get(`http://127.0.0.1:8000/Account/bill-register/?from_date=${fromDate}&to_date=${toDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching purchase bills:", err);
          return { data: [] };
        })
      ]);
      
      const rawJobworkData = Array.isArray(jobworkResponse.data) ? jobworkResponse.data : 
                      (jobworkResponse.data?.data ? jobworkResponse.data.data : []);
      const processedJobwork = rawJobworkData.map(item => ({ ...item, isJobwork: true }));
                      
      const rawPurchaseData = Array.isArray(purchaseResponse.data) ? purchaseResponse.data : 
                      (purchaseResponse.data?.data ? purchaseResponse.data.data : []);
      const processedPurchase = rawPurchaseData.map(item => ({ ...item, isJobwork: false }));
                      
      const combinedRawData = [...processedJobwork, ...processedPurchase];
      
      const mappedData = combinedRawData.map((item, index) => ({
        sr: index + 1,
        id: item.id,
        pdfId: item.id,
        isJobwork: item.isJobwork,
        year: "",
        billNo: item.bill_no || item.no || "",
        billDate: item.posting_date || item.bill_date || "",
        type: item.type || "",
        billType: item.bill_type || "",
        challanNo: item.inv_challan_no || item.challan_no || "",
        challanDate: item.inv_challan_date || item.challan_date || "",
        poNo: item.items?.[0]?.po_no || "",
        grnNo: item.items?.[0]?.grn_no || "",
        code: item.supplier_code || "",
        supplier: item.supplier || item.supplier_name || "",
        assAmt: item.assable_value || "",
        totalAmt: item.grand_total || item.net_total || "",
        user: item.prepared_by || ""
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching purchase register:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleViewPdf = async (id, isJobwork) => {
    if (!id) {
      alert("Invalid ID for PDF generation.");
      return;
    }
    
    // Open a new tab immediately to prevent popup blocker
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><head><title>Loading PDF...</title></head><body style="font-family: sans-serif; padding: 20px;">Loading PDF securely...</body></html>');
    }

    try {
      const token = localStorage.getItem("accessToken");
      const endpoint = isJobwork ? 'jobwork-bill-pdf' : 'bill-register-pdf';
      const response = await axios.get(`https://erp-render.onrender.com/Account/${endpoint}/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      if (newWindow) {
        newWindow.location.href = fileURL;
      } else {
        window.open(fileURL, '_blank');
      }
    } catch (error) {
      if (newWindow) newWindow.close();
      console.error("Error viewing PDF:", error);
      alert("Failed to load PDF. Make sure you have permission or the record exists.");
    }
  };

  return (
    <div className="purchase-register">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="register-container">

                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start mb-0">Purchase Register</h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2">
                        <button 
                          className="btn d-inline-flex align-items-center gap-1"
                          onClick={() => setShowQueryModal(true)}
                        >
                          <i className="fa fa-search-plus text-primary"></i> Purchase Register Query
                        </button>
                        <button 
                          className="btn d-inline-flex align-items-center gap-1"
                          onClick={() => setShowDetailsModal(true)}
                        >
                          <i className="fa fa-list text-primary"></i> Purchase Register Details
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-1">
                          <FaFileExcel className="excel-icon text-success" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="d-flex align-items-center flex-wrap gap-3 text-start">
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">From Date:</label>
                        <input 
                          type="date" 
                          className="form-control form-control-sm" 
                          value={fromDate} 
                          onChange={(e) => setFromDate(e.target.value)} 
                          style={{ width: "135px" }} 
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">To Date:</label>
                        <input 
                          type="date" 
                          className="form-control form-control-sm" 
                          value={toDate} 
                          onChange={(e) => setToDate(e.target.value)} 
                          style={{ width: "135px" }} 
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Bill Type :</label>
                        <select className="form-select form-select-sm" style={{ width: "110px" }}>
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Type :</label>
                        <select className="form-select form-select-sm" style={{ width: "110px" }}>
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Item Type :</label>
                        <select className="form-select form-select-sm" style={{ width: "110px" }}>
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Item Group :</label>
                        <select className="form-select form-select-sm" style={{ width: "110px" }}>
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">GST :</label>
                        <select className="form-select form-select-sm" style={{ width: "90px" }}>
                          <option>ALL</option>
                        </select>
                      </div>
                      <button 
                        className="btn d-flex align-items-center gap-1"
                        onClick={handleSearch}
                        disabled={loading}
                      >
                        <FaSearch className="search-icon text-primary" /> {loading ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive shadow-sm border rounded bg-white table-scroll-container">
                    <table className="table table-bordered table-hover mb-0 custom-register-table">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Year</th>
                          <th>Bill (P) No.</th>
                          <th>Bill (P) Date</th>
                          <th>Type</th>
                          <th>Bill Type</th>
                          <th>Challan No</th>
                          <th>Challan Date</th>
                          <th>PO No</th>
                          <th>GRN No</th>
                          <th>Code</th>
                          <th>Supplier/Vendor Name</th>
                          <th>Ass Amt.</th>
                          <th>Total Amt.</th>
                          <th>User</th>
                          <th>Auth</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Del</th>
                          <th>Doc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((row, index) => (
                            <tr key={index}>
                              <td>{row.sr}</td>
                              <td>{row.year}</td>
                              <td>{row.billNo}</td>
                              <td>{row.billDate}</td>
                              <td>{row.type}</td>
                              <td>{row.billType}</td>
                              <td>{row.challanNo}</td>
                              <td>{row.challanDate}</td>
                              <td>{row.poNo}</td>
                              <td>{row.grnNo}</td>
                              <td>{row.code}</td>
                              <td className="text-start">{row.supplier}</td>
                              <td className="text-end">{row.assAmt}</td>
                              <td className="text-end">{row.totalAmt}</td>
                              <td>{row.user}</td>
                              <td className="text-center">
                                {index % 3 === 0 ? (
                                  <div className="badge bg-success p-1"><FaCheck /></div>
                                ) : (
                                  <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                                )}
                              </td>
                              <td className="text-center">
                                <FaEye 
                                  className="text-primary cursor-pointer"
                                  onClick={() => handleViewPdf(row.pdfId, row.isJobwork)}
                                  title="View PDF"
                                />
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaEdit />
                                </button>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaTrash />
                                </button>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaFileAlt />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="20" className="text-center py-5 text-muted">
                              No records found for the selected criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="register-footer mt-2 p-2 bg-light border d-flex justify-content-between align-items-center small fw-bold">
                    <div>Total Record's : {data.length}</div>
                    <div>Total Amt : 6,53,48,404.87</div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {/* Query Modal */}
      {showQueryModal && (
        <div className="query-modal-overlay">
          <div className="query-modal-content shadow-lg animate-fade-in">
            <div className="query-modal-header d-flex justify-content-between align-items-center p-2">
              <span className="modal-title fw-bold ms-2">Purchase Register Query</span>
              <div className="header-actions d-flex align-items-center gap-2">
                <div className="form-check mb-0 me-2">
                  <input className="form-check-input" type="checkbox" id="companyHeader" defaultChecked />
                  <label className="form-check-label small fw-bold" htmlFor="companyHeader" style={{ fontSize: '11px', color: '#0056b3' }}>With Company Header</label>
                </div>
                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-2 py-1"
                  style={{ fontSize: '11px' }}
                  onClick={() => setShowMasterModal(true)}
                >
                  <i className="fa fa-database text-primary"></i> Query Master
                </button>
                <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-2 py-1" style={{ fontSize: '11px' }}>
                  <FaFileExcel className="text-success" /> Export Report
                </button>
                <button
                  className="btn border-0 p-0 ms-2"
                  onClick={() => setShowQueryModal(false)}
                  style={{ color: '#000', fontSize: '18px', display: 'flex', alignItems: 'center' }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="query-modal-tabs d-flex">
              <button
                className={`tab-btn ${activeTab === "Query" ? "active" : ""}`}
                onClick={() => setActiveTab("Query")}
              >
                Query
              </button>
              <button
                className={`tab-btn ${activeTab === "Result" ? "active" : ""}`}
                onClick={() => setActiveTab("Result")}
              >
                Result
              </button>
            </div>

            <div className="query-modal-body p-3">
              {activeTab === "Query" ? (
                <div className="query-form row g-2">
                  <div className="col-12 d-flex align-items-center gap-3 mb-2">
                    <div className="d-flex align-items-center gap-1">
                      <input type="radio" name="dateType" id="billDate" defaultChecked />
                      <label htmlFor="billDate" className="small">Bill_Date</label>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <input type="radio" name="dateType" id="challanDate" />
                      <label htmlFor="challanDate" className="small">Challan_Date :</label>
                    </div>
                    <input type="text" className="form-control form-control-sm w-auto" defaultValue="09/05/2026" />
                    <span className="small">To</span>
                    <input type="text" className="form-control form-control-sm w-auto" defaultValue="09/05/2026" />
                  </div>

                  <div className="col-md-6">
                    <div className="row mb-1 align-items-center">
                      <label className="col-4 small">Bill Type</label>
                      <div className="col-8">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <label className="col-4 small">Type :</label>
                      <div className="col-8">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <label className="col-4 small">Item Type :</label>
                      <div className="col-8">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <label className="col-4 small">Item Group :</label>
                      <div className="col-8">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <label className="col-4 small">GST :</label>
                      <div className="col-8">
                        <select className="form-select form-select-sm w-auto"><option>ALL</option></select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="row mb-1 align-items-center">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="custBillNo" />
                        <label htmlFor="custBillNo" className="small">Cust Bill No :</label>
                      </div>
                      <div className="col-9 d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm w-25" />
                        <span className="small">To</span>
                        <input type="text" className="form-control form-control-sm w-25" />
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="supplierName" />
                        <label htmlFor="supplierName" className="small">Supplier Name :</label>
                      </div>
                      <div className="col-9">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="itemName" />
                        <label htmlFor="itemName" className="small">Item Name :</label>
                      </div>
                      <div className="col-9">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>
                    <div className="row mb-1 align-items-center mt-2">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="radio" name="queryType" id="userQuery" />
                        <label htmlFor="userQuery" className="small">User Query</label>
                      </div>
                      <div className="col-6">
                        <select className="form-select form-select-sm"><option>Select</option></select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 ms-5 px-3">
                      <FaSearch className="text-primary" /> Execute
                    </button>
                  </div>
                </div>
              ) : (
                <div className="result-tab-container d-flex flex-column h-100">
                  <div className="result-content-area flex-grow-1 bg-white border" style={{ minHeight: '350px' }}>
                    {/* Results table or data would go here */}
                  </div>
                  <div className="result-footer border mt-1 p-1 bg-light d-flex align-items-center">
                    <span className="fw-bold ms-2" style={{ fontSize: '12px' }}>00</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Query Master Modal (Nested) */}
      {showMasterModal && (
        <div className="query-modal-overlay second-modal" style={{ zIndex: 1100 }}>
          <div className="query-modal-content shadow-lg animate-fade-in" style={{ maxWidth: '600px' }}>
            <div className="query-modal-header d-flex justify-content-between align-items-center p-2">
              <span className="modal-title fw-bold ms-2" style={{ color: '#007bff' }}>Sales Query Master</span>
              <button
                className="btn border-0 p-0 me-1"
                onClick={() => setShowMasterModal(false)}
                style={{ color: '#000', fontSize: '18px' }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="query-modal-tabs d-flex">
              <button
                className={`tab-btn ${masterTab === "Query Master" ? "active" : ""}`}
                onClick={() => setMasterTab("Query Master")}
              >
                Query Master
              </button>
              <button
                className={`tab-btn ${masterTab === "Query Designer" ? "active" : ""}`}
                onClick={() => setMasterTab("Query Designer")}
              >
                Query Designer
              </button>
            </div>

            <div className="query-modal-body p-4" style={{ height: '400px' }}>
              {masterTab === "Query Master" ? (
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="fw-bold small">Report Name</label>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-3">
                      <FaCheck className="text-success" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="query-designer-form">
                  <div className="row g-2 mb-3">
                    <div className="col-md-6 d-flex align-items-center gap-2">
                      <label className="small fw-bold text-nowrap" style={{ width: '100px' }}>Select Report</label>
                      <select className="form-select form-select-sm"><option>Select</option></select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center gap-2">
                      <label className="small fw-bold text-nowrap" style={{ width: '100px' }}>Type :</label>
                      <select className="form-select form-select-sm"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row g-2">
                    {/* Left List */}
                    <div className="col-5">
                      <label className="small fw-bold mb-1">All Data- Column List :</label>
                      <select multiple className="form-select" style={{ height: '220px', fontSize: '11px' }}>
                        {/* Options would go here */}
                      </select>
                    </div>

                    {/* Middle Action Buttons */}
                    <div className="col-1 d-flex flex-column justify-content-center align-items-center gap-2">
                      <button className="btn btn-sm btn-light border px-1 w-100" style={{ fontSize: '11px' }}>{">"}</button>
                      <button className="btn btn-sm btn-light border px-1 w-100" style={{ fontSize: '11px' }}>{">>"}</button>
                    </div>

                    {/* Right List */}
                    <div className="col-4">
                      <label className="small fw-bold mb-1">Selectd Data- Column List</label>
                      <select multiple className="form-select" style={{ height: '220px', fontSize: '11px' }}>
                        {/* Selected Options would go here */}
                      </select>
                    </div>

                    {/* Far Right Navigation Buttons */}
                    <div className="col-2 d-flex flex-column justify-content-start gap-2 mt-4">
                      <button className="btn btn-sm btn-light border w-100 py-1" style={{ fontSize: '11px' }}>Up</button>
                      <button className="btn btn-sm btn-light border w-100 py-1" style={{ fontSize: '11px' }}>Down</button>
                      <button className="btn btn-sm btn-light border w-100 py-1 mt-auto" style={{ fontSize: '11px' }}>Remove</button>
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1 px-4">
                      <FaCheck className="text-success" /> Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Details Modal (Bill Register Summary) */}
      {showDetailsModal && (
        <div className="query-modal-overlay">
          <div className="query-modal-content shadow-lg animate-fade-in">
            <div className="query-modal-header d-flex justify-content-between align-items-center p-2">
              <span className="modal-title fw-bold ms-2">Bill Register Summary</span>
              <div className="header-actions d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-2 py-1" style={{ fontSize: '11px' }}>
                  <FaFileExcel className="text-success" /> Export to Excel
                </button>
                <button
                  className="btn border-0 p-0 ms-2"
                  onClick={() => setShowDetailsModal(false)}
                  style={{ color: '#000', fontSize: '18px' }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="query-modal-tabs d-flex">
              <button
                className={`tab-btn ${detailsTab === "Query" ? "active" : ""}`}
                onClick={() => setDetailsTab("Query")}
              >
                Query
              </button>
              <button
                className={`tab-btn ${detailsTab === "Result" ? "active" : ""}`}
                onClick={() => setDetailsTab("Result")}
              >
                Result
              </button>
            </div>

            <div className="query-modal-body p-3" style={{ height: '500px', overflowY: 'auto' }}>
              {detailsTab === "Query" ? (
                <div className="query-form row g-2">
                  <div className="col-12 mb-2">
                    <div className="row align-items-center">
                      <label className="col-2 small fw-bold">Group :</label>
                      <div className="col-3">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="postingDate" />
                        <label htmlFor="postingDate" className="small text-nowrap">Posting Date From :</label>
                      </div>
                      <div className="col-9 d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                        <span className="small">To</span>
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="challanDateFrom" />
                        <label htmlFor="challanDateFrom" className="small text-nowrap">Challan Date From :</label>
                      </div>
                      <div className="col-9 d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                        <span className="small">To</span>
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsItemName" />
                        <label htmlFor="detailsItemName" className="small">Item Name :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsSuppName" />
                        <label htmlFor="detailsSuppName" className="small">Supp Name :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsChallanNo" />
                        <label htmlFor="detailsChallanNo" className="small">Challan No :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="mt-4 ms-5">
                      <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-2 px-3">
                        <FaSearch className="text-primary" /> Execute-Report
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="result-tab-container d-flex flex-column h-100">
                  <div className="result-content-area flex-grow-1 bg-white border" style={{ minHeight: '350px' }}>
                  </div>
                  <div className="result-footer border mt-1 p-1 bg-light d-flex align-items-center">
                    <span className="fw-bold ms-2" style={{ fontSize: '12px' }}>00</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseRegister;
