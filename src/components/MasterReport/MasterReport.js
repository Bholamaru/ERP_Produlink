import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./MasterReport.css";
const MasterReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const [activeTab, setActiveTab] = useState("itemReport");
  return (
    <div className="Report">
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
                <div className="Reportrmaster">
                <div className="Report1-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Master Report</h5>
                        </div>
                      </div>
                    </div>
                  
                  <div className="ReportMain mt-5">
                    <div className="container-fluid">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "itemReport" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("itemReport")}
                          >
                            Item Report
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "customerSupplierReport"
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setActiveTab("customerSupplierReport")
                            }
                          >
                            Customer/Supplier Report
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content mt-3">
                        {activeTab === "itemReport" && (
                          <div className="tab-pane active">
                            <div className="ReportMain1">
                              <div className="row text-start Reportselect1">
                                <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="selectPlant"
                                    className="col-form-label"
                                  >
                                    Select Report Name:
                                  </label>
                                </div>
                                <div className="col-md-2 col-sm-9 mb-3 mb-sm-0">
                                  <select
                                    id="selectPlant"
                                    className="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected>Produlink</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div>
                                <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="machineType"
                                    className="col-form-label"
                                  >
                                    Main Group:
                                  </label>
                                </div>
                                <div className="col-md-2 col-sm-9 mb-3 mb-sm-0">
                                  <select
                                    id="machineType"
                                    className="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected>ALL</option>
                                    <option value="1">
                                      CENTERLESS GRINDING
                                    </option>
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
                                <div className="col-md-1 col-sm-12 text-sm-start text-md-end">
                                  <button className="btn">
                                     Search
                                  </button>
                                </div>
                                <div className="col-md-2 col-sm-12 text-sm-start text-md-end">
                                  <button className="btn">
                                     Export Report
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="ReportTable1">
                              <div className="row">
                                <div className="col-md-12">
                                  <table className="table">
                                    <thead className="table-primary">
                                      <tr>
                                        <th scope="col">Sr</th>
                                        <th scope="col">Item No</th>
                                        <th scope="col">Item Code</th>
                                        <th scope="col">Item Desc</th>
                                        <th scope="col"></th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Grade</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">HSN Code</th>
                                        <th scope="col">Item Id</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="Reportbotton1">
                              <div className="col-md-12 text-start">
                                <p>Total Record :00</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "customerSupplierReport" && (
                          <div className="tab-pane active">
                            <div className="ReportMain2">
                              <div className="row text-start Reportselect2">
                                <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="selectPlant"
                                    className="col-form-label"
                                  >
                                    Select Report Name:
                                  </label>
                                </div>
                                <div className="col-md-2 col-sm-9 mb-3 mb-sm-0">
                                  <select
                                    id="selectPlant"
                                    className="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected>Produlink</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div>
                                <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="machineType"
                                    className="col-form-label"
                                  >
                                    Type:
                                  </label>
                                </div>
                                <div className="col-md-2 col-sm-9 mb-3 mb-sm-0">
                                  <select
                                    id="machineType"
                                    className="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected>ALL</option>
                                    <option value="1">
                                      CENTERLESS GRINDING
                                    </option>
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
                                <div className="col-md-1 col-sm-12 text-sm-start text-md-end">
                                  <button className="btn">
                                     Search
                                  </button>
                                </div>
                                <div className="col-md-2 col-sm-12 text-sm-start text-md-end">
                                  <button className="btn">
                                     Export Report
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="ReportTable2">
                              <div className="row">
                                <div className="col-md-12">
                                  <table className="table">
                                    <thead className="table-primary">
                                      <tr>
                                        <th scope="col">Sr</th>
                                        <th scope="col">Cust Code</th>
                                        <th scope="col">Cust Name</th>
                                        <th scope="col">Code Address</th>
                                        <th scope="col">Gst No</th>
                                        <th scope="col">Cust Id</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="Reportbotton2">
                              <div className="col-md-12 text-start">
                                <p>Total Record :00</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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

export default MasterReport;
