import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CreditNoteList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck } from "react-icons/fa";

const CreditNoteList = () => {
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
    <div className="credit-note-list">
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
                        <h5 className="header-title text-start mb-0">
                          Credit Note List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                           <button className="btn d-inline-flex align-items-center gap-2"><FaFilePdf className="text-danger" /> PDF</button>
                           <button className="btn d-inline-flex align-items-center gap-2 ms-1"><FaFileExcel className="text-success" /> EXCEL</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="d-flex align-items-end gap-3 flex-nowrap mt-2 mb-3">
                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" defaultChecked />
                          <label className="form-label mb-0 fw-bold">From Date :</label>
                        </div>
                        <input type="date" className="form-control" defaultValue="2026-04-08" />
                      </div>

                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <label className="form-label mb-1 fw-bold">To Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-05-09" />
                      </div>

                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" />
                          <label className="form-label mb-0 fw-bold">Party Name :</label>
                        </div>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="text" className="form-control" style={{ maxWidth: "400px" }} placeholder="Party Name..." />
                           <button className="btn ms-1 text-nowrap d-flex align-items-center gap-2">
                             <FaSearch size={12} /> Search
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr.</th>
                          <th>Type</th>
                          <th>AP <input type="checkbox" /></th>
                          <th>Cert. No</th>
                          <th>Date</th>
                          <th>Name of Party</th>
                          <th>Tax Amount</th>
                          <th>Amount</th>
                          <th>User</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="10" className="text-start py-5 ps-4 text-muted fw-bold">
                            No Data Found !!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-bar shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn d-flex align-items-center gap-2 border">
                         <FaCheck className="text-success" /> Post To A/c
                      </button>
                    </div>
                    
                    <div className="d-flex gap-5" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      <div>Total Records : 0</div>
                      <div>Assessable Value : </div>
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

export default CreditNoteList;
