import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./WorkSchedule.css";

const WorkSchedule = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className="Workschedule">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Workschedulemaster">
                    <div className="Workschedule1-header mb-4 text-start mt-5">
                      <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Work Center Idle Time | Setting</h5>
                        </div>
                      </div>
                    </div>
               
                  <div className="WorkscheduleMain mt-5">
                    <div className="container-fluid">
                      <div className="row text-start Workscheduleselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="selectPlant"
                            className="col-form-label"
                          >
                            Shift:
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="selectPlant"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>All</option>
                            <option value="1">
                              FIRST 8HRS FROM :07:00:00 TO :15:30:00
                            </option>
                            <option value="2">
                              SECOND 8HRS FROM :15:30:00 TO :23:30:00
                            </option>
                            <option value="3">THIRD</option>
                            <option value="3">THIRD</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="machineType"
                            className="col-form-label"
                          >
                            Work Center Type
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="machineType"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>ALL</option>
                            <option value="1">CENTERLESS GRINDING</option>
                            <option value="2">CNC</option>
                            <option value="3">DRILLING</option>
                            <option value="1">GRINDER</option>
                            <option value="2">INDUCTION</option>
                            <option value="3">LATHE</option>
                            <option value="1">MANUAL</option>
                            <option value="2">MILLING</option>
                            <option value="3">PRESS</option>
                            <option value="1">SECOND OPERATION</option>
                            <option value="2">SPM</option>
                            <option value="3">TAPPING</option>
                            <option value="1">THREAD ROLLING</option>
                            <option value="2">TROUB</option>
                            <option value="3">VMC</option>
                          </select>
                        </div>
                        <div className="col-md-1 text-sm-start mt-2">
                          <button className="btn">
                           Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="WorkscheduleTable mt-5">
                    <div className="container-fluid"></div>
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

export default WorkSchedule;
