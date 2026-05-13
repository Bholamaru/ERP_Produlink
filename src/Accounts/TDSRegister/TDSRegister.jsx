import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./TDSRegister.css";
import { FaFileExcel, FaSearch, FaPrint } from "react-icons/fa";

const TDSRegister = () => {
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
    <div className="tds-register">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0 text-start">TDS Register</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2 border">
                          <FaPrint className="text-dark" /> PRINT TDS
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2 border ms-1">
                          <FaFileExcel className="text-success" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Exactly as Image */}
                  <div className="header-section mb-4">
                    <div className="d-flex align-items-center gap-3 flex-nowrap mt-1 mb-2">
                      <div className="d-flex align-items-center gap-1">
                        <label className="form-label mb-0 fw-bold">From:</label>
                        <input type="date" className="form-control" style={{ width: "135px" }} defaultValue="2026-04-08" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="form-label mb-0 fw-bold">To:</label>
                        <input type="date" className="form-control" style={{ width: "135px" }} defaultValue="2026-05-09" />
                      </div>
                      <div className="d-flex align-items-center gap-1 flex-grow-1">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-label mb-0 fw-bold">Customer</label>
                        <input type="text" className="form-control ms-1" style={{ maxWidth: "400px" }} />
                        <button className="btn d-flex align-items-center gap-2 ms-1 text-nowrap">
                          <FaSearch size={12} /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section - Blue Headers */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr</th>
                          <th>Doc Date</th>
                          <th>Inv No.</th>
                          <th>Inv Date</th>
                          <th>Cust Code</th>
                          <th>Customer Name</th>
                          <th>GST No</th>
                          <th>PAN No</th>
                          <th>TDS GL</th>
                          <th>TCS GL</th>
                          <th>SubTotal</th>
                          <th>TDS Rate</th>
                          <th>TDS Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="13" className="text-start py-5 ps-4 text-muted fw-bold bg-white">
                             No records found !!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-bar mt-3 shadow-sm">
                    <div className="fw-bold">Total Records : 0</div>
                    <div className="fw-bold">Total Amt : 0</div>
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

export default TDSRegister;
