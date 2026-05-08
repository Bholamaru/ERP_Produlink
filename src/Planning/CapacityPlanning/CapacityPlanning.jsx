import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel, FaCog, FaListAlt, FaIndustry, FaPrint, FaTimes } from "react-icons/fa";
import "./CapacityPlanning.css";

const CapacityPlanning = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportFromDate, setReportFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportToDate, setReportToDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportEfficiency, setReportEfficiency] = useState("100");
  const [reportFormat, setReportFormat] = useState("PDF");
  
  const machineTypes = [
    "CENTERLESS GRINDING", "CNC", "DRILLING", "GRINDER", "INDUCTION", 
    "LATHE", "MANUAL", "MILLING", "PRESS", "SECOND OPERATION", 
    "SPM", "TAPPING", "THREAD ROLLING", "TROUB", "VMC"
  ];
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="CapacityPlanningMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                <div className="CapacityPlanning mt-2 border rounded shadow-sm">
                  {/* Header */}
                  <div className="CapacityPlanning-header d-flex justify-content-between align-items-center bg-white border-bottom">
                    <h6 className="header-title mb-0">Capacity Planning</h6>
                    <div className="header-actions d-flex align-items-center gap-2">
                        <button 
                            className="erp-btn-grey-sm d-flex align-items-center gap-1"
                            onClick={() => setShowReportModal(true)}
                        >
                           <FaListAlt size={10} /> Work Order Wise Report
                        </button>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaCog size={10} /> Setting
                        </button>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaIndustry size={10} /> Machine Plan
                        </button>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaFileExcel size={10} /> Export To Excel
                        </button>
                    </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="CapacityPlanning-Filters p-2 bg-white">
                    <div className="d-flex align-items-center gap-4 flex-wrap">
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold mb-0">Item Code :</label>
                        <input 
                            type="text" 
                            className="form-control form-control-xs" 
                            placeholder="Enter Item Code.." 
                            style={{ width: '220px', backgroundColor: '#fffbe6' }} 
                            value={itemCode}
                            onChange={e => setItemCode(e.target.value)}
                        />
                        <span className="text-danger">*</span>
                        <button className="erp-btn-grey-sm ms-2">Search</button>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold mb-0">Efficiency</label>
                        <input 
                            type="text" 
                            className="form-control form-control-xs" 
                            placeholder="Efficiency" 
                            style={{ width: '100px' }} 
                            value={efficiency}
                            onChange={e => setEfficiency(e.target.value)}
                        />
                        <span className="text-danger">*</span>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold mb-0">Quantity</label>
                        <input 
                            type="text" 
                            className="form-control form-control-xs" 
                            placeholder="Quantity" 
                            style={{ width: '100px' }} 
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <span className="text-danger">*</span>
                        <button className="erp-btn-grey-sm ms-2">Set Value</button>
                      </div>
                    </div>
                  </div>

                  {/* Table Area */}
                  <div className="CapacityPlanning-Content bg-white">
                    <div className="table-responsive">
                       <table className="table table-bordered erp-table text-center mb-0">
                          <thead>
                             <tr>
                                <th style={{ width: '40px' }}>#</th>
                                <th>Code</th>
                                <th>Operation</th>
                                <th>Op No.</th>
                                <th>Quantity Awaiting</th>
                                <th>Machine</th>
                                <th>CT (Min.Sec)</th>
                                <th>Efficiency</th>
                                <th>Time (Hr.Min)</th>
                                <th>Shift</th>
                             </tr>
                          </thead>
                          <tbody>
                             <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <input type="text" className="table-input-xs" placeholder="Quantity" />
                                </td>
                                <td>
                                    <select className="table-select-xs">
                                        <option></option>
                                    </select>
                                </td>
                                <td></td>
                                <td>
                                    <input type="text" className="table-input-xs" placeholder="Efficiency" />
                                </td>
                                <td></td>
                                <td></td>
                             </tr>
                          </tbody>
                       </table>
                    </div>

                    {/* Footer Clear Button */}
                    <div className="CapacityPlanning-Footer d-flex justify-content-end">
                       <button className="erp-btn-grey-sm px-4">Clear</button>
                    </div>
                  </div>
                </div>

                {/* Work Order Wise Report Modal */}
                {showReportModal && (
                  <div className="CapacityPlanning-Modal-Overlay">
                    <div className="CapacityPlanning-Modal">
                      <div className="CapacityPlanning-Modal-Header">
                        <h6>Work Order Wise Report ..</h6>
                        <button className="close-btn" onClick={() => setShowReportModal(false)}><FaTimes /></button>
                      </div>
                      <div className="CapacityPlanning-Modal-Body">
                        <div className="modal-row">
                          <label className="modal-label">From Date :</label>
                          <input type="date" className="form-control form-control-xs" style={{ width: '150px' }} value={reportFromDate} onChange={e => setReportFromDate(e.target.value)} />
                        </div>
                        <div className="modal-row">
                          <label className="modal-label">To Date :</label>
                          <input type="date" className="form-control form-control-xs" style={{ width: '150px' }} value={reportToDate} onChange={e => setReportToDate(e.target.value)} />
                        </div>
                        <div className="modal-row">
                          <label className="modal-label">Efficiency :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '100px' }} value={reportEfficiency} onChange={e => setReportEfficiency(e.target.value)} />
                        </div>
                        <div className="modal-row justify-content-between">
                          <label className="fw-bold">Machine Type :</label>
                          <div className="d-flex align-items-center gap-1">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll" className="mb-0">Select ALL</label>
                          </div>
                        </div>
                        <div className="machine-list-container">
                          {machineTypes.map((type, idx) => (
                            <div key={idx} className="machine-item">
                              <input type="checkbox" id={`machine-${idx}`} />
                              <label htmlFor={`machine-${idx}`} className="mb-0">{type}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="CapacityPlanning-Modal-Footer">
                        <div className="d-flex align-items-center gap-2">
                          <label className="fw-bold mb-0">Report Format :</label>
                          <select 
                            className="form-select form-select-xs" 
                            style={{ width: '80px' }}
                            value={reportFormat}
                            onChange={e => setReportFormat(e.target.value)}
                          >
                            <option>PDF</option>
                            <option>EXCEL</option>
                          </select>
                        </div>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1 py-1 px-3">
                          <FaPrint size={10} /> View Report
                        </button>
                      </div>
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

export default CapacityPlanning;
