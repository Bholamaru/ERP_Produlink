import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachinePreventiveReport.css";
import { FaChartBar, FaTrash } from "react-icons/fa";

const MachinePreventiveReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  return (
    <div className="machinepreventivereport">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title text-start mb-0">
                          Repair List
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaChartBar /> Repair Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row mt-2 mb-3">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">From:</label>
                          <input type="date" className="form-control flex-grow-1" />
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">To:</label>
                          <input type="date" className="form-control flex-grow-1" />
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <div className="form-check mb-0 d-flex align-items-center gap-1">
                            <input className="form-check-input mt-0" type="checkbox" id="itemCheck" />
                            <label className="form-check-label mb-0 text-nowrap" htmlFor="itemCheck">Item:</label>
                          </div>
                          <input type="text" className="form-control flex-grow-1" />
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">Frequency:</label>
                          <select className="form-select flex-grow-1">
                            <option value="">All</option>
                          </select>
                          <button className="btn text-nowrap">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Records - Moved to Top */}
                  <div className="mb-2 text-start">
                    <span className="fw-bold" style={{ fontSize: "14px" }}>Total Records: 00</span>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Trn No</th>
                          <th>TrnDate</th>
                          <th>MachineName</th>
                          <th>MType</th>
                          <th>Part Name</th>
                          <th>MParameter</th>
                          <th>MethodName</th>
                          <th>Specification</th>
                          <th>Frequency</th>
                          <th>ReactionPlan</th>
                          <th>ActionTaken</th>
                          <th>Doc</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>TRN-001</td>
                          <td>2023-10-01</td>
                          <td>Machine A</td>
                          <td>Preventive</td>
                          <td>Gearbox</td>
                          <td>Oil Level</td>
                          <td>Visual</td>
                          <td>Full</td>
                          <td>Monthly</td>
                          <td>Refill</td>
                          <td>Refilled</td>
                          <td>Doc-1</td>
                          <td>
                            <button className="btn d-inline-flex align-items-center justify-content-center p-1">
                              <FaTrash size={12} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default MachinePreventiveReport;
