import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import './WeekMaster.css';

const WeekMaster = () => {
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
    <div className="WeekMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Week mt-5">
                  <div className="Week-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 col-sm-12">
                        <h5 className="header-title">Schedule Week Master</h5>
                      </div>
                    </div>
                  </div>
                  
                  <div className="Week-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        <div className="col-md-2 col-sm-6">
                          <label>Select Month</label>
                          <select className="form-control">
                            <option>Select</option>
                            <option value="Sep">Sep</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-sm-6">
                          <label>WK No</label>
                          <input type="text" className="form-control" placeholder="Enter Week No" />
                        </div>
                        <div className="col-md-2 col-sm-6">
                          <label>From Date</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-2 col-sm-6">
                          <label>To Date</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-1 col-sm-12 mt-5">
                          <button type="button" className="btn btn-primary w-100">Save</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Week-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Month</th>
                            <th>Work No</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Dynamic rows will go here */}
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

export default WeekMaster;
