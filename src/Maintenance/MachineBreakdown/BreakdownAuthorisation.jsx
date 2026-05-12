import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./BreakdownAuthorisation.css";
import {
  FaFileExcel,
  FaSearch
} from "react-icons/fa";

const BreakdownAuthorisation = () => {
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
    <div className="breakdown-authorisation">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Synchronized with BreakdownList */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          Maintenance : Breakdown Log List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel className="text-success" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section Synchronized with BreakdownList */}
                  <div className="header-section mb-4">
                    <div className="row align-items-center g-3 mt-2 mb-3">

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Plant :</label>
                        <select className="form-select" style={{ width: "120px" }}>
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">From :</label>
                        <input type="date" className="form-control" style={{ width: "150px" }} defaultValue="2026-04-07" />
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">To Date :</label>
                        <input type="date" className="form-control" style={{ width: "150px" }} defaultValue="2026-05-08" />
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Category :</label>
                        <select className="form-select" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Status :</label>
                        <select className="form-select" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="col-auto">
                        <button className="btn d-flex align-items-center gap-2">
                          <FaSearch /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Records - Moved to Top */}
                  <div className="mb-2 text-start">
                    <span className="total-records">
                      Total Records : 00
                    </span>
                  </div>

                  {/* Table Area - Transparent BG */}
                  <div className="table-area">
                    <div className="no-data-msg">No Data Found !!</div>
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

export default BreakdownAuthorisation;
