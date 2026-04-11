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

  const scheduleData = [
    { id: 1, monthYear: "MAY-2026", fromDate: "01/05/2026", toDate: "31/05/2026", revNo: "-", totalItem: 0,   workingDays: 25 },
    { id: 2, monthYear: "APR-2026", fromDate: "01/04/2026", toDate: "30/04/2026", revNo: "0", totalItem: 224, workingDays: 26 },
  ];

  const itemData = [
    { sr: 207, itemNo: "FG1012", itemCode: "B35KD01260", itemDesc: "PIVOT PIN FOR PRKG LEVER(S.P.)", schQty: 50000, disQty: 16000, balQty: 34000, daysComp: 8, curAvg: 2285.71, daysRem: 18, askRate: 1888.89, status: 32, revNos: "0," },
    { sr: 208, itemNo: "FG1039", itemCode: "530DP00902", itemDesc: "EXTENSION (PULSAR)", schQty: 6000, disQty: 2000, balQty: 4000, daysComp: 8, curAvg: 285.71, daysRem: 18, askRate: 222.22, status: 33.33, revNos: "0," },
    { sr: 209, itemNo: "FG1051", itemCode: "520DU00102", itemDesc: "FIX NUT", schQty: 90000, disQty: 30000, balQty: 60000, daysComp: 8, curAvg: 4285.71, daysRem: 18, askRate: 3333.33, status: 33.33, revNos: "0," },
    { sr: 210, itemNo: "FG1234", itemCode: "52DP07202B", itemDesc: "EXTENSION K3 NEW", schQty: 30000, disQty: 10000, balQty: 20000, daysComp: 8, curAvg: 1428.57, daysRem: 18, askRate: 1111.11, status: 33.33, revNos: "0," },
    { sr: 211, itemNo: "FG1427", itemCode: "F2DZ10302B", itemDesc: "FORK BOLT -H107", schQty: 3000, disQty: 1000, balQty: 2000, daysComp: 8, curAvg: 142.86, daysRem: 18, askRate: 111.11, status: 33.33, revNos: "0," },
    { sr: 212, itemNo: "FG1347", itemCode: "B2RW015020", itemDesc: "PISTON ACTUATOR - HERO CBS", schQty: 54094, disQty: 19910, balQty: 34184, daysComp: 8, curAvg: 2844.29, daysRem: 18, askRate: 1899.11, status: 36.81, revNos: "0," },
    { sr: 213, itemNo: "FG1037", itemCode: "520DP00602", itemDesc: "EXTENSION (20 X16)", schQty: 4000, disQty: 1500, balQty: 2500, daysComp: 8, curAvg: 214.29, daysRem: 18, askRate: 138.89, status: 37.5, revNos: "0," },
  ];

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const handleViewStatus = (row) => {
    setSelectedPeriod({ month: row.monthYear, revNo: row.revNo });
    setCurrentView("planning");
  };

  const handleEdit = (row) => {
    setSelectedPeriod({ month: row.monthYear, revNo: row.revNo });
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
                            <th>Sr.</th><th>Item No</th><th>Item Code</th><th style={{width: '25%'}}>Item Desc</th>
                            <th>Sch.Qty</th><th>Dis.Qty</th><th>Bal.Qty</th><th>Days.Comp</th>
                            <th>Cur.Avg</th><th>Days.Rem.</th><th>Ask.Rate</th>
                            <th style={{width: '120px'}}>Status (%)</th><th>Rev Nos</th><th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemData.map((item, idx) => (
                            <tr key={idx} className="align-middle">
                              <td>{item.sr}</td><td>{item.itemNo}</td><td>{item.itemCode}</td>
                              <td className="text-start ps-2">{item.itemDesc}</td>
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
                                <input type="text" className="form-control" placeholder="Enter Name.." />
                                <button className="btn btn-outline-secondary"><FaSearch /></button>
                             </div>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '120px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>CustPO:</label>
                             <select className="form-select form-select-sm"><option>ALL</option></select>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '220px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Item Name <FaTable />:</label>
                             <input type="text" className="form-control form-control-sm" placeholder="Enter Code No.." />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '180px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Rec.On:</label>
                             <div className="input-group input-group-sm">
                                <input type="date" className="form-control" id="input-rec-date" />
                                <button className="btn btn-outline-secondary p-1" onClick={() => document.getElementById('input-rec-date').showPicker()}><FaCalendarAlt /></button>
                             </div>
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '100px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Qty:</label>
                             <input type="text" className="form-control form-control-sm" />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '110px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Buffer:</label>
                             <input type="text" className="form-control form-control-sm" />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '100px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Next:</label>
                             <input type="text" className="form-control form-control-sm" defaultValue="0" />
                          </div>
                          <div className="d-flex align-items-center gap-1" style={{width: '240px', flex: '0 0 auto'}}>
                             <label className="form-label mb-0 text-nowrap" style={{fontSize: '11px', fontWeight: '600'}}>Due Date:</label>
                             <div className="input-group input-group-sm">
                                <input type="date" className="form-control" id="input-due-date" />
                                <button className="btn btn-outline-secondary p-1" onClick={() => document.getElementById('input-due-date').showPicker()}><FaCalendarAlt /></button>
                             </div>
                          </div>
                          <div className="ms-auto">
                             <button className="btn btn-outline-dark btn-sm fw-bold" style={{height: '32px'}}>Add>></button>
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
                                <th>Item No</th>
                                <th rowSpan="2">Item Description</th>
                                <th rowSpan="2">Schedule Qty</th>
                                <th rowSpan="2">Cust/ sch Qty</th>
                                <th rowSpan="2">Buffer Qty</th>
                                <th rowSpan="2">Next Month schedule</th>
                                <th rowSpan="2">Schedule Received dt. <FaTable /></th>
                                <th rowSpan="2">Due / Dispatch Dt. <FaTable /></th>
                                <th rowSpan="2">Del</th>
                                <th rowSpan="2"><input type="checkbox" /> All</th>
                                <th rowSpan="2">Create/Upda te By</th>
                                <th rowSpan="2">Hist</th>
                             </tr>
                             <tr>
                                <th>/ Date</th>
                                <th>/ Date</th>
                                <th>/code</th>
                             </tr>
                          </thead>
                          <tbody>
                             <tr style={{height: '200px'}}>
                                <td colSpan="17" className="text-muted">No records added yet. Use the form above to add items.</td>
                             </tr>
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
