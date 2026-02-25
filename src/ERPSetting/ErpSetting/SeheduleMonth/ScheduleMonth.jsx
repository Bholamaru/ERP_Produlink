import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './ScheduleMonth.css';
import { Link } from "react-router-dom";


const ScheduleMonth = () => {
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
    <div className="ScheduleMonthMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ScheduleMonth mt-5">
                  <div className="Schedule-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Schedule Month Master</h5>
                      </div>
                      <div className="col-md-8 text-end">

<Link type="button" className="btn" to='/WeekMaster'>Week Master</Link>




</div>
                    </div>
                  </div>
                  <div className="Schedule-Main">
  <div className="container-fluid">
    <div className="row align-items-center text-start">
      <div className="col-md-1">
        <label htmlFor="monthName">Month Name</label>
      </div>
      <div className="col-md-1">
        <input type="text" id="monthName" className="form-control" placeholder="Enter month name" />
      </div>
      <div className="col-md-1">
        <label htmlFor="fromDate">From Date</label>
      </div>
      <div className="col-md-1">
        <input type="date" id="fromDate" className="form-control" />
      </div>
      <div className="col-md-1">
        <label htmlFor="toDate">To Date</label>
      </div>
      <div className="col-md-1">
        <input type="date" id="toDate" className="form-control" />
      </div>
      <div className="col-md-1">
        <label htmlFor="monthNo">Month No</label>
      </div>
      <div className="col-md-1">
        <input type="text" id="monthNo" className="form-control" placeholder="MM" />
      </div>
      <div className="col-md-1">
        <label htmlFor="yearNo">Year No</label>
      </div>
      <div className="col-md-1">
        <input type="text" id="yearNo" className="form-control" placeholder="YYYY" />
      </div>
      <div className="col-md-2 mt-2">
        <button type="button" className="btn btn-primary w-100">Add</button>
      </div>
    </div>
  </div>
</div>


                  <div className="Schedule-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Month Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Month No</th>
                            <th>Year No</th>
                            <th>W Days</th>
                            <th>User</th>
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
  )
}

export default ScheduleMonth
