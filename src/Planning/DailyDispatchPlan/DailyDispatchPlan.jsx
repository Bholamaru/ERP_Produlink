import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPlus, FaPrint, FaRegEye, FaEdit, FaFilePdf } from "react-icons/fa";
import "./DailyDispatchPlan.css";

const DailyDispatchPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchCustName, setSearchCustName] = useState(false);
  const [custName, setCustName] = useState("");
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="DailyDispatchPlanMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                <div className="DailyDispatchPlan mt-2">
                  {/* Header */}
                  <div className="DailyDispatchPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0">Dispatch Plan List</h6>
                    <div className="header-actions d-flex gap-2">
                        <button className="erp-btn-cyan d-flex align-items-center gap-1">
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
                            <th style={{ width: '50px' }}>Sr.</th>
                            <th style={{ width: '120px' }}>Date</th>
                            <th>CustName</th>
                            <th style={{ width: '60px' }}>Edit</th>
                            <th style={{ width: '60px' }}>View</th>
                            <th style={{ width: '60px' }}>View</th>
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

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDispatchPlan;
