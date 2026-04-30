import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./SalesOrderAmendList.css";
import { FaEye, FaSearch } from "react-icons/fa";
import { Search, FileSpreadsheet, BarChart } from "lucide-react";

const SalesOrderAmendList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="SalesOrderAmendListMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`} style={{ paddingTop: '60px' }}>
                
                {/* Header Section */}
                <div className="SalesOrderAmendList-header d-flex justify-content-between align-items-center">
                  <h5 className="header-title">
                    Sales Order Amendment List
                  </h5>

                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-action">
                      <FileSpreadsheet size={16} className="text-success" />
                      SO Amendment Register
                    </button>
                    <div className="custom-dropdown">
                      <button 
                        className="btn btn-action dropdown-toggle" 
                        type="button" 
                        onClick={toggleMenu}
                      >
                        <BarChart size={16} className="text-primary" />
                        Sales Order Amendment Menu
                      </button>
                      {menuOpen && (
                        <ul className="custom-dropdown-menu">
                          <li><Link className="dropdown-item" to="/CustPOAmend">SO Amendment</Link></li>
                          <li><Link className="dropdown-item" to="#">Item Addition (Regular)</Link></li>
                          <li><Link className="dropdown-item" to="#">Item Addition (Export)</Link></li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="SalesOrderAmendList-Main">
                  {/* Compact Filter Bar */}
                  <div className="compact-filter-bar">
                    <div className="filter-group">
                      <label>From:</label>
                      <input type="date" className="form-control" style={{ width: '110px' }} />
                    </div>

                    <div className="filter-group">
                      <label>To:</label>
                      <input type="date" className="form-control" style={{ width: '110px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="custCheck" />
                      <label htmlFor="custCheck">Customer:</label>
                      <input type="text" placeholder="Name..." className="form-control" style={{ width: '140px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="itemCheck" />
                      <label htmlFor="itemCheck">Item:</label>
                      <input type="text" placeholder="Name..." className="form-control" style={{ width: '140px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="amdCheck" />
                      <label htmlFor="amdCheck">Amd No:</label>
                      <input type="text" className="form-control" style={{ width: '60px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="poCheck" />
                      <label htmlFor="poCheck">Po No:</label>
                      <input type="text" className="form-control" style={{ width: '60px' }} />
                    </div>

                    <div className="filter-group">
                      <input type="checkbox" className="form-check-input" id="authCheck" />
                      <label htmlFor="authCheck">Auth Pending:</label>
                    </div>

                    <button type="button" className="btn-search">
                      <FaSearch size={11} /> Search
                    </button>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Type</th>
                            <th>Amd No</th>
                            <th>Amd Date</th>
                            <th>Ref No</th>
                            <th>Ref Date</th>
                            <th>Cust Name</th>
                            <th>SO No</th>
                            <th>SO Date</th>
                            <th>CustPo No</th>
                            <th>CustPo Date</th>
                            <th>User</th>
                            <th>Auth Status</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">1</td>
                            <td>Rate</td>
                            <td>SOAMD242500123</td>
                            <td className="text-center">02/12/24</td>
                            <td>00000034</td>
                            <td className="text-center">12/12/24</td>
                            <td>C0005 ENDURANGE TECHNOLOGIES LTD (I)</td>
                            <td>2223000135</td>
                            <td className="text-center">10/11/23</td>
                            <td>19000008022</td>
                            <td className="text-center">09/01/23</td>
                            <td>More</td>
                            <td className="text-center">! More</td>
                            <td className="text-center">
                              <FaEye className="view-icon" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default SalesOrderAmendList;