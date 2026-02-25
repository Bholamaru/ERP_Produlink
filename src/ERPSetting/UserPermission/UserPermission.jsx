import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./UserPermission.css";

const UserPermission = () => {
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
    <div className="UserPermission">
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
                <div className="Permission">
                  <div className="header mb-4">
                    <div className="row">
                      <div className="col-md-2">
                        <h5 className="header-title text-start">
                          Parameter Setting
                        </h5>
                      </div>
                      <div className="col-md-10 text-end">
                        <button className="btn btn-outline-secondary">
                          Setting History
                        </button>
                        <button className="btn btn-outline-secondary">
                          Company Info
                        </button>
                        <button className="btn btn-outline-secondary">
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row text-start">
                    <div className="col-md-2">
                      <h6>Select Module</h6>

                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Master</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">CRM</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Store</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Purchase</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Production</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Subcron</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Planning</label>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="header-section mb-4">
                        <div className="row align-items-start">
                          <div className="col-md-1">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />{" "}
                              Purchase
                            </label>
                          </div>
                          <div className="col-md-2">
                            <label className="form-check-label">
                              Setting Name:
                            </label>
                          </div>
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Name Like"
                            />
                          </div>
                          <div className="col-md-2">
                            <button className="btn btn-primary">Search</button>
                          </div>
                        </div>
                      </div>
                      <table className="parameter-table table table-striped">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Setting Name</th>
                            <th>Value</th>
                            <th>Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Allow Generate PO From Indent Only</td>
                            <td>
                              <select className="form-select">
                                <option>NO</option>
                                <option>YES</option>
                              </select>
                            </td>
                            <td>
                              <button className="btn btn-success">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Allow PO Edit After Approval</td>
                            <td>
                              <select className="form-select">
                                <option>NO</option>
                                <option>YES</option>
                              </select>
                            </td>
                            <td>
                              <button className="btn btn-success">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Allow View PO Without Authorization</td>
                            <td>
                              <select className="form-select">
                                <option>NO</option>
                                <option>YES</option>
                              </select>
                            </td>
                            <td>
                              <button className="btn btn-success">
                                Update
                              </button>
                            </td>
                          </tr>
                          {/* Add more rows as needed */}
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

export default UserPermission;
