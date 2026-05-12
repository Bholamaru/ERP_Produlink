import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR1.css";
import { FaDownload, FaFilter } from "react-icons/fa";

const GSTR1 = () => {
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
    <div className="gstr-1">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="header-title text-start">
                          GSTR-1 Report
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaDownload /> Download JSON
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaDownload /> Download Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-end mt-2 mb-3">
                      <div className="col-md-3">
                        <label className="form-label mb-1">Financial Year:</label>
                        <select className="form-select">
                          <option value="2026-27">2026-27</option>
                          <option value="2025-26">2025-26</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1">Tax Period:</label>
                        <select className="form-select">
                          <option value="May">May</option>
                          <option value="April">April</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <button className="btn w-100 d-inline-flex align-items-center justify-content-center gap-2">
                          <FaFilter /> Generate Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <strong>Note:</strong> GSTR-1 contains details of outward supplies of goods or services or both.
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Description</th>
                          <th>No. of Records</th>
                          <th>Taxable Value</th>
                          <th>IGST</th>
                          <th>CGST</th>
                          <th>SGST</th>
                          <th>Cess</th>
                          <th>Total Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>B2B</td>
                          <td>Business to Business</td>
                          <td>15</td>
                          <td>1,50,000</td>
                          <td>18,000</td>
                          <td>4,500</td>
                          <td>4,500</td>
                          <td>0</td>
                          <td>27,000</td>
                        </tr>
                        <tr>
                          <td>B2C</td>
                          <td>Business to Consumer</td>
                          <td>45</td>
                          <td>50,000</td>
                          <td>0</td>
                          <td>4,500</td>
                          <td>4,500</td>
                          <td>0</td>
                          <td>9,000</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan="2" className="text-end">Total</td>
                          <td>60</td>
                          <td>2,00,000</td>
                          <td>18,000</td>
                          <td>9,000</td>
                          <td>9,000</td>
                          <td>0</td>
                          <td>36,000</td>
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

export default GSTR1;
