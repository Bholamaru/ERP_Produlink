import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaSave, FaFileAlt, FaCopy, FaTrash, FaEdit } from "react-icons/fa";
import "./BusinessPlan.css";

const BusinessPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [plant, setPlant] = useState("");
  const [month, setMonth] = useState("");
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="BusinessPlanMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                <div className="BusinessPlan mt-2">
                  {/* Header */}
                  <div className="BusinessPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0">Business Plan</h6>
                    <div className="header-actions d-flex align-items-center gap-2">
                        <div style={{ width: '10px', height: '24px', backgroundColor: '#dc3545', marginRight: '5px' }}></div>
                        <button className="erp-btn-grey d-flex align-items-center gap-1">
                           <FaFileAlt size={12} /> Annual Report
                        </button>
                        <button className="erp-btn-grey d-flex align-items-center gap-1">
                           <FaFileAlt size={12} /> Report
                        </button>
                        <button className="erp-btn-grey d-flex align-items-center gap-1">
                           <FaCopy size={12} /> Copy Plan
                        </button>
                    </div>
                  </div>

                  {/* Filter/Entry Bar */}
                  <div className="BusinessPlan-Entry p-2 border-bottom bg-white">
                    <div className="row g-2 align-items-end">
                      <div className="col-auto">
                        <label className="filter-label d-block">Plant :</label>
                        <select 
                          className="form-select form-select-xs" 
                          style={{ width: '120px' }}
                          value={plant}
                          onChange={(e) => setPlant(e.target.value)}
                        >
                          <option>Select</option>
                          <option>ProduLink</option>
                        </select>
                      </div>
                      <div className="col-auto">
                        <label className="filter-label d-block">Select Month :</label>
                        <select 
                          className="form-select form-select-xs" 
                          style={{ width: '120px' }}
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          <option>Select</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                          {/* Add other months */}
                        </select>
                      </div>
                      <div className="col-auto">
                        <label className="filter-label d-block">Select Customer :</label>
                        <div className="d-flex gap-1">
                          <input type="text" className="form-control form-control-xs" placeholder="Enter Name.." style={{ width: '180px' }} />
                          <button className="erp-btn-grey-sm"><FaSearch size={10} /> Search</button>
                        </div>
                      </div>
                      <div className="col-auto">
                        <label className="filter-label d-block">Select Item Name :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Enter Code No.." style={{ width: '200px' }} />
                      </div>
                      <div className="col-auto">
                        <label className="filter-label d-block">Plan.Qty :</label>
                        <input type="number" className="form-control form-control-xs" style={{ width: '80px' }} />
                      </div>
                      <div className="col-auto">
                        <button className="erp-btn-grey d-flex align-items-center gap-1">
                          <FaSave size={12} /> Save
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="BusinessPlan-Content" style={{ minHeight: '400px', backgroundColor: '#fff' }}>
                    <div className="table-responsive">
                      <table className="table table-bordered erp-table text-center mb-0">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Plant</th>
                            <th>Month Name</th>
                            <th>Customer Name</th>
                            <th>Item No</th>
                            <th>Item Code</th>
                            <th>Description</th>
                            <th>Plan Qty</th>
                            <th>Rate</th>
                            <th>Plan Value</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example row to match screenshot */}
                          <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><span className="text-primary cursor-pointer">Edit</span></td>
                            <td><span className="text-danger cursor-pointer">Delete</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="BusinessPlan-Footer d-flex justify-content-between align-items-center p-1 bg-light border-top">
                    <div className="footer-stat">Total Records : 1</div>
                    <div className="footer-stat">Total Value : 00</div>
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

export default BusinessPlan;
