import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./SubconJobworkInwardQC.css";

const SubconJobworkInwardQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  
  // State for dropdowns
  const [selectedSeries, setSelectedSeries] = useState(""); 
  const [selectedItem, setSelectedItem] = useState(""); 

  // React-controlled tabs
  const [activeTab, setActiveTab] = useState("dimensional");

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  
  const dimensionalData = [
    { sr: 1, testNo: "7", desc: "ID", spec: "ID", dim: "5.6", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 2, testNo: "4", desc: "OD", spec: "OD", dim: "13.5", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 3, testNo: "9", desc: "DEPTH", spec: "DEPTH", dim: "17", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 4, testNo: "5", desc: "OD", spec: "OD", dim: "11", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 5, testNo: "8", desc: "COLLAR", spec: "COLLAR", dim: "2.5", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 6, testNo: "6", desc: "ID", spec: "ID", dim: "8", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 7, testNo: "1", desc: "LENGTH", spec: "LENGTH", dim: "18.5", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 8, testNo: "2", desc: "OD", spec: "OD", dim: "17.5", tolMinus: "0.3", tolPlus: "00", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
    { sr: 9, testNo: "3", desc: "OD", spec: "OD", dim: "14", tolMinus: "0.2", tolPlus: "0.2", method: "DVC", s1: "", s2: "", s3: "", s4: "", s5: "", remark: "" },
  ];

  
  const isItemSelected = selectedSeries === "Subcon GRN" && selectedItem === "FG1019|B3SD001260|SPR";
  const displayData = isItemSelected ? dimensionalData : [];

  return (
    <div className="SubconJobworkInwardQCMaster" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0 position-relative">
            <div className="Main-NavBar">
              
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} />

              <main
                className={`main-content ${sideNavOpen ? "shifted" : ""}`}
                style={{ padding: "10px", transition: "margin-left 0.3s ease", marginLeft: sideNavOpen ? "250px" : "0" }}
              >
                <div className="SubconJobworkInwardQC bg-white border shadow-sm" style={{ fontSize: "12px", padding: "10px" }}>
                  
                  {/* ================= HEADER ================= */}
                  <div className="SubconJobworkInwardQC-header border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title text-primary mb-0 fw-bold" style={{ fontSize: "18px" }}>
                        Subcon / Jobwork Inward QC
                      </h5>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-none" style={{fontSize: "11px"}}>
                          <span style={{ fontSize: "12px" }}>≡</span> Pending List
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-none" style={{fontSize: "11px"}}>
                          <span style={{ fontSize: "12px" }}>≡</span> Inward Insp. List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ================= FILTER ROW ================= */}
                  <div className="d-flex align-items-center gap-3 p-2 border mb-2 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="d-flex align-items-center gap-2">
                      <label className="fw-medium text-nowrap mb-0">Series :</label>
                      <select
                        className="form-select form-select-sm shadow-none"
                        style={{ width: "150px", fontSize: "11px" }}
                        value={selectedSeries}
                        onChange={(e) => setSelectedSeries(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Subcon GRN">Subcon GRN</option>
                      </select>
                    </div>

                    <div className="d-flex align-items-center gap-2 border-start ps-3">
                      <label className="fw-medium text-nowrap mb-0">Select Item</label>
                      <select
                        className="form-select form-select-sm shadow-none"
                        style={{ width: "250px", fontSize: "11px" }}
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="FG1019|B3SD001260|SPR">
                          FG1019 | B3SD001260 | SPR
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* ================= TABS & CONTENT ================= */}
                  <div className="AssemblyEntry-bottom mt-3">
                    
                    <div className="d-flex flex-wrap gap-2 mb-2 pb-2 border-bottom" style={{ fontSize: "12px" }}>
                      {[
                        { id: "dimensional", label: "A. Dimensional" },
                        { id: "visualinspection", label: "B. Visual Inspection" },
                        { id: "reworkRej", label: "C. Rework & Rej Qty" },
                        { id: "qcInfo", label: "D. Qc Info" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          className={`btn btn-sm fw-bold px-4 py-2 ${activeTab === tab.id ? "text-white shadow-sm" : "text-secondary bg-light"}`}
                          style={{
                            backgroundColor: activeTab === tab.id ? "#007bff" : "#f8f9fa",
                            border: activeTab === tab.id ? "1px solid #007bff" : "1px solid #dee2e6",
                            borderRadius: "4px", // Full button, small round edges, rectangular
                            transition: "all 0.2s ease"
                          }}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="tab-content border p-2 rounded" style={{minHeight: "450px"}}>
                      
                      {/* ================= A. DIMENSIONAL TAB ================= */}
                      {activeTab === "dimensional" && (
                        <div className="tab-pane fade show active">
                          {/* Input Form Table */}
                          <div className="table-responsive mb-2">
                            <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead style={{ backgroundColor: "#f2f2f2", color: "#666" }}>
                                <tr>
                                  <th>Test No</th>
                                  <th>Test Description</th>
                                  <th>Specification</th>
                                  <th>Dimensions</th>
                                  <th>Tol (-)</th>
                                  <th>Tol (+)</th>
                                  <th>Method Of Check</th>
                                  <th style={{ width: "40px" }}>1</th>
                                  <th style={{ width: "40px" }}>2</th>
                                  <th style={{ width: "40px" }}>3</th>
                                  <th style={{ width: "40px" }}>4</th>
                                  <th style={{ width: "40px" }}>5</th>
                                  <th>Remark</th>
                                  <th style={{ width: "60px" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "50px", fontSize: "11px" }} /></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "120px", fontSize: "11px", resize: "none" }}></textarea></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "120px", fontSize: "11px", resize: "none" }}></textarea></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "70px", fontSize: "11px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "100px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "100px" }} /></td>
                                  <td>
                                    <button className="btn btn-sm btn-light border fw-medium d-flex align-items-center justify-content-center w-100 shadow-none" style={{ fontSize: "11px" }}>
                                      ⊕ Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Data Table */}
                          <div className="table-responsive border" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <table className="table table-bordered table-sm table-hover align-middle text-start mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead className="sticky-top" style={{ backgroundColor: "#007bff", color: "white", zIndex: 1 }}>
                                <tr className="text-center">
                                  <th className="fw-normal border-end border-bottom-0">Sr.</th>
                                  <th className="fw-normal border-end border-bottom-0">Test No</th>
                                  <th className="fw-normal border-end border-bottom-0">Test Description</th>
                                  <th className="fw-normal border-end border-bottom-0">Specification</th>
                                  <th className="fw-normal border-end border-bottom-0">Dimensions</th>
                                  <th className="fw-normal border-end border-bottom-0">Tol (-)</th>
                                  <th className="fw-normal border-end border-bottom-0">Tol (+)</th>
                                  <th className="fw-normal border-end border-bottom-0">Method Of Check</th>
                                  <th className="fw-normal border-end border-bottom-0">S1</th>
                                  <th className="fw-normal border-end border-bottom-0">S2</th>
                                  <th className="fw-normal border-end border-bottom-0">S3</th>
                                  <th className="fw-normal border-end border-bottom-0">S4</th>
                                  <th className="fw-normal border-end border-bottom-0">S5</th>
                                  <th className="fw-normal border-end border-bottom-0">Remark</th>
                                  <th className="fw-normal border-bottom-0">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayData.length > 0 ? (
                                  displayData.map((row, index) => (
                                    <tr key={index}>
                                      <td className="text-center text-muted">{row.sr}</td>
                                      <td className="text-center">{row.testNo}</td>
                                      <td>{row.desc}</td>
                                      <td>{row.spec}</td>
                                      <td>{row.dim}</td>
                                      <td>{row.tolMinus}</td>
                                      <td>{row.tolPlus}</td>
                                      <td>{row.method}</td>
                                      <td>{row.s1}</td>
                                      <td>{row.s2}</td>
                                      <td>{row.s3}</td>
                                      <td>{row.s4}</td>
                                      <td>{row.s5}</td>
                                      <td>{row.remark}</td>
                                      <td className="text-center">
                                        <button className="btn btn-link text-secondary p-0 shadow-none border-0 text-decoration-none" title="Delete">🗑️</button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td className="text-center text-muted">1</td>
                                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                    <td className="text-center">
                                      <button className="btn btn-link text-secondary p-0 shadow-none border-0 text-decoration-none fw-bold">🗑️</button>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* ================= B. VISUAL INSPECTION TAB ================= */}
                      {activeTab === "visualinspection" && (
                        <div className="tab-pane fade show active">
                           {/* Input Form Table */}
                           <div className="table-responsive mb-2">
                            <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead style={{ backgroundColor: "#f2f2f2", color: "#666" }}>
                                <tr>
                                  <th>Test No</th>
                                  <th>Test Description</th>
                                  <th>Specification</th>
                                  <th>Method Of Check</th>
                                  <th style={{ width: "40px" }}>1</th>
                                  <th style={{ width: "40px" }}>2</th>
                                  <th style={{ width: "40px" }}>3</th>
                                  <th style={{ width: "40px" }}>4</th>
                                  <th style={{ width: "40px" }}>5</th>
                                  <th>Merge</th>
                                  <th>Remarks</th>
                                  <th style={{ width: "60px" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "60px", fontSize: "11px" }} /></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "160px", fontSize: "11px", resize: "none" }}></textarea></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter Specification.." rows="1" style={{ width: "160px", fontSize: "11px", resize: "none" }}></textarea></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "120px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} /></td>
                                  <td><input type="checkbox" className="form-check-input" /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "120px" }} /></td>
                                  <td>
                                    <button className="btn btn-sm btn-light border fw-medium d-flex align-items-center justify-content-center w-100 shadow-none" style={{ fontSize: "11px" }}>
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Data Table */}
                          <div className="table-responsive border" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <table className="table table-bordered table-sm table-hover align-middle text-start mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead className="sticky-top" style={{ backgroundColor: "#007bff", color: "white", zIndex: 1 }}>
                                <tr className="text-center">
                                  <th className="fw-normal border-end border-bottom-0">Sr.</th>
                                  <th className="fw-normal border-end border-bottom-0">Test No</th>
                                  <th className="fw-normal border-end border-bottom-0">Test Description</th>
                                  <th className="fw-normal border-end border-bottom-0">Specification</th>
                                  <th className="fw-normal border-end border-bottom-0">Method Of Check</th>
                                  <th className="fw-normal border-end border-bottom-0">M1</th>
                                  <th className="fw-normal border-end border-bottom-0">M2</th>
                                  <th className="fw-normal border-end border-bottom-0">M3</th>
                                  <th className="fw-normal border-end border-bottom-0">M4</th>
                                  <th className="fw-normal border-end border-bottom-0">M5</th>
                                  <th className="fw-normal border-end border-bottom-0">Merge</th>
                                  <th className="fw-normal border-end border-bottom-0">Remark</th>
                                  <th className="fw-normal border-bottom-0">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-center text-muted">1</td>
                                  <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                  <td className="text-center"><input type="checkbox" className="form-check-input" /></td>
                                  <td></td>
                                  <td className="text-center">
                                    <button className="btn btn-link text-secondary p-0 shadow-none border-0 text-decoration-none" title="Delete">🗑️</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* ================= C. REWORK & REJ QTY TAB ================= */}
                      {activeTab === "reworkRej" && (
                        <div className="tab-pane fade show active">
                          
                          {/* Top Action Bar */}
                          <div className="d-flex align-items-center gap-3 p-2 border border-bottom-0 bg-light rounded-top">
                            <span className="text-primary fw-medium">Rework | Reject :</span>
                            <button className="btn btn-sm btn-light border shadow-none py-0" style={{fontSize: "11px"}}>Rework Master</button>
                            <button className="btn btn-sm btn-light border shadow-none py-0" style={{fontSize: "11px"}}>Reject Master</button>
                            <div className="d-flex align-items-center gap-1 ms-2">
                              <input type="checkbox" className="form-check-input mt-0" />
                              <span className="text-muted">Supplier:</span>
                              <span className="text-secondary ms-1">JV0067 Ayush Enterprises</span>
                            </div>
                          </div>

                          {/* Two Column Layout */}
                          <div className="row g-0 border border-bottom-0">
                            
                            {/* Rework Column */}
                            <div className="col-6 border-end p-2 pb-5">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <label className="fw-medium mb-0">Rework :</label>
                                <select className="form-select form-select-sm shadow-none" style={{width: "120px", fontSize: "11px"}}>
                                  <option>Select</option>
                                </select>
                                <input type="text" className="form-control form-control-sm shadow-none" style={{width: "60px"}} />
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-3" style={{fontSize: "11px"}}>Add</button>
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-2" style={{fontSize: "11px"}}>⟳</button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px" }}>
                                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                                    <tr>
                                      <th className="fw-normal">Sr</th>
                                      <th className="fw-normal">Description</th>
                                      <th className="fw-normal">Qty</th>
                                      <th className="fw-normal">Supplier</th>
                                      <th className="fw-normal">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-muted">1</td>
                                      <td></td><td></td><td></td>
                                      <td><button className="btn btn-sm btn-light border text-secondary py-0 px-1 shadow-none" style={{fontSize: "10px"}}>X</button></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Reject Column */}
                            <div className="col-6 p-2 pb-5">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <label className="fw-medium mb-0">Reject :</label>
                                <select className="form-select form-select-sm shadow-none" style={{width: "120px", fontSize: "11px"}}>
                                  <option>Select</option>
                                </select>
                                <input type="text" className="form-control form-control-sm shadow-none" style={{width: "60px"}} />
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-3" style={{fontSize: "11px"}}>Add</button>
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-2" style={{fontSize: "11px"}}>⟳</button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px" }}>
                                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                                    <tr>
                                      <th className="fw-normal">Sr</th>
                                      <th className="fw-normal">Description</th>
                                      <th className="fw-normal">Qty</th>
                                      <th className="fw-normal">Supplier</th>
                                      <th className="fw-normal">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-muted">1</td>
                                      <td></td><td></td><td></td>
                                      <td><button className="btn btn-sm btn-light border text-secondary py-0 px-1 shadow-none" style={{fontSize: "10px"}}>X</button></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* Summary Footer */}
                          <div className="d-flex justify-content-around align-items-center p-2 border bg-white rounded-bottom" style={{fontSize: "12px", fontWeight: "600"}}>
                            <div>OK Qty : <span className="badge bg-success rounded-pill px-3 py-1 ms-1">0</span></div>
                            <span className="text-primary">|</span>
                            <div>Rework : <span className="badge bg-warning text-dark rounded-pill px-3 py-1 ms-1">0</span></div>
                            <span className="text-primary">|</span>
                            <div>Reject : <span className="badge bg-danger rounded-pill px-3 py-1 ms-1">0</span></div>
                            <span className="text-primary">|</span>
                            <div>Total Qty : <span className="badge bg-primary rounded-pill px-3 py-1 ms-1">0</span></div>
                          </div>

                        </div>
                      )}

                      {/* ================= D. QC INFO TAB ================= */}
                      {activeTab === "qcInfo" && (
                        <div className="tab-pane fade show active">
                          
                          {/* Top Header Bar */}
                          <div className="d-flex justify-content-between align-items-center bg-light p-2 border-bottom fw-bold rounded-top" style={{fontSize: "11px", color: "#333"}}>
                            <div>
                              <span className="text-dark">57F4 GRN No : </span> <span className="text-dark">252614738</span>
                              <span className="mx-2 text-muted">|</span>
                              <span className="text-dark">57F4 GRN Date : </span> <span className="text-dark">14/01/2026</span>
                              <span className="mx-2 text-muted">|</span>
                              <span className="text-dark">JV0067 | Ayush Enterprises</span>
                            </div>
                            <div className="text-dark" style={{cursor: "pointer"}}>
                              View 57F4 Outward Details 👁️
                            </div>
                          </div>

                          <div className="p-3">
                            <div className="row g-2 mb-3">
                              {/* Col 1 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">QC (IIR) No :</label></div>
                                  <div className="col-7 d-flex gap-1">
                                    <input type="text" className="form-control form-control-sm border shadow-none" value="252611392" readOnly />
                                    <button className="btn btn-sm btn-light border py-0 px-2">⟳</button>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Vendor Heat Code :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Lot Accepted / Rejected :</label></div>
                                  <div className="col-7">
                                    <select className="form-select form-select-sm border shadow-none"><option>Accept</option><option>Reject</option></select>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Control Plan No :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Total Coil(s) :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                              </div>

                              {/* Col 2 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">QC (IIR) Date :</label></div>
                                  <div className="col-8 d-flex gap-1 align-items-center">
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" value="14/01/2026" readOnly /> 📅
                                    <span className="ms-1 text-muted">Time:</span>
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" value="12:09:50 PM" readOnly />
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Vendor TC No :</label></div>
                                  <div className="col-8 d-flex gap-1 align-items-center">
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" />
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" value="14/01/2026" readOnly /> 📅
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Sample Qty :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none w-50" value="0" readOnly /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Wire Size :</label></div>
                                  <div className="col-8 d-flex gap-1">
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" />
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" />
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Coil From No :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                              </div>

                              {/* Col 3 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">(ISO) Format No :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" value="F/QA/01" readOnly /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">(ISO) Rev. No :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" value="0.00" readOnly /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">(ISO) Rev. Date :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" value="01/01/2021" readOnly /></div>
                                </div>
                                <div className="row align-items-center mb-4"></div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Coil To No :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                              </div>
                            </div>

                            {/* Quantities Box Area */}
                            <div className="p-2 mb-3 border rounded bg-light d-flex flex-wrap gap-3 align-items-center">
                              <div className="d-flex gap-2 mb-1">
                                <div className="d-flex align-items-center"><span className="text-muted me-1">Heat No</span> <input className="form-control form-control-sm border shadow-none" value="A66774" readOnly style={{width:"80px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">GRN Qty:</span> <input className="form-control form-control-sm border shadow-none" value="2700" readOnly style={{width:"60px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">QC Qty:</span> <input className="form-control form-control-sm border shadow-none" value="0" readOnly style={{width:"50px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Qc Pending Qty:</span> <span className="ms-1 fw-bold text-dark">2700</span></div>
                              </div>
                              <div className="w-100 m-0"></div>
                              <div className="d-flex gap-2 mb-1">
                                <div className="d-flex align-items-center"><span className="text-muted me-1">QC Qty:</span> <input className="form-control form-control-sm border shadow-none" value="2700" style={{width:"60px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">OK Qty:</span> <input className="form-control form-control-sm border shadow-none" value="2700" style={{width:"60px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Rework Qty:</span> <input className="form-control form-control-sm border shadow-none" value="0" readOnly style={{width:"50px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Reject Qty:</span> <input className="form-control form-control-sm border shadow-none" value="0" readOnly style={{width:"50px"}} /></div>
                              </div>
                              <div className="w-100 m-0"></div>
                              <div className="d-flex gap-2">
                                <div className="d-flex align-items-center"><input className="form-control form-control-sm border shadow-none" value="0" style={{width:"50px"}} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Store Qty:</span> <input className="form-control form-control-sm border shadow-none" value="2700" style={{width:"60px"}} /> <span className="ms-1 text-muted" style={{fontSize:"10px"}}>(Pass Qty. Into Stock)</span></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">A.U.D. Qty:</span> <input className="form-control form-control-sm border shadow-none" value="0" style={{width:"50px"}} /></div>
                              </div>
                            </div>

                            {/* Bottom Fields */}
                            <div className="row g-2">
                              {/* Col 1 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Raw Material :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">LAB / MILL TC No :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-start mb-1">
                                  <div className="col-5 text-end mt-1"><label className="mb-0 text-muted">Remark :</label></div>
                                  <div className="col-7"><textarea className="form-control form-control-sm border shadow-none" rows="2"></textarea></div>
                                </div>
                                <div className="row align-items-center mb-1 mt-2">
                                  <div className="col-5 text-end"><label className="mb-0 text-muted">Inspected By :</label></div>
                                  <div className="col-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                              </div>
                              
                              {/* Col 2 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Drawing Rev No :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none w-50" value="00" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">LAB / MILL TC Name :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1" style={{marginTop: "55px"}}>
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Approved By :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" value="more" readOnly /></div>
                                </div>
                              </div>

                              {/* Col 3 */}
                              <div className="col-md-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Grade :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">LAB / MILL TC Date :</label></div>
                                  <div className="col-8 d-flex align-items-center gap-1">
                                    <input type="text" className="form-control form-control-sm border shadow-none" value="14/01/2026" /> 📅
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* ================= FOOTER ================= */}
                      
                      {activeTab === "dimensional" || activeTab === "visualinspection" ? (
                        <div className="mt-3 w-100 d-flex flex-column align-items-start text-start">
                          <div className="form-check" style={{ marginBottom: "150px" }}>
                            <input className="form-check-input shadow-none" type="checkbox" id="enableFields" style={{ cursor: "pointer" }} />
                            <label className="form-check-label text-dark fw-medium" htmlFor="enableFields" style={{ cursor: "pointer" }}>
                              Enable Fields
                            </label>
                          </div>

                          <div className="border text-start" style={{ width: "220px", backgroundColor: "#e8ece0", padding: "5px" }}>
                            <div className="fw-bold mb-1" style={{ fontSize: "12px", color: "#555" }}>Special Symbol</div>
                            <input 
                              type="text" 
                              className="form-control form-control-sm mb-1 bg-white shadow-none" 
                              value="LAIK" 
                              readOnly 
                              style={{ border: "1px solid #ccc", fontSize: "12px" }}
                            />
                            <a href="#/" className="text-decoration-none fw-medium" style={{ fontSize: "12px", color: "#007bff" }}>Update</a>
                          </div>
                        </div>
                      ): null}

                    </div>
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

export default SubconJobworkInwardQC;