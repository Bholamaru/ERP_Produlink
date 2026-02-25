import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PaddingQCInward.css";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaddingQCInward = () => {
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
    <div className="PaddingQCInwardMaster">
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
                <div className="PaddingQCInward">
                  <div className="PaddingQCInward-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          {" "}
                          <span className="purch">
                            Subcon / Jobwork Inward :{" "}
                          </span>{" "}
                          Pending QC List{" "}
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn" to="#/">
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="PaddingQCInward-Main mt-2">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-2px" }}
                          >
                            <option>Produlink</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>57F4 Type :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-2px" }}
                          >
                            <option>Select</option>
                            <option>Our_F4</option>
                            <option>Vendor_F4</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label type="checkbox">Select Vendar:</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label type="checkbox">Select Item:</label>
                          <input
                            type="text"
                            placeholder="Name..."
                            className="form-control"
                          />
                        </div>
                        <div className="col-6 col-md-2 mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <select className="form-select">
                            <option>57F4 GRN No :</option>
                            <option>Our_F4</option>
                            <option>Vendor_F4</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Name..."
                            className="form-control"
                          />
                        </div>

                        <div className="col-6 col-md-2 mt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-2">
                    <div className="table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">57F4 GRN No</th>
                            <th scope="col">57F4 Date</th>
                            <th scope="col">Entry Date</th>
                            <th scope="col">57F4 Type</th>
                            <th scope="col">Vendor Ch. No</th>
                            <th scope="col">Ch. Date</th>
                            <th scope="col">Code</th>
                            <th scope="col">Vendor Name</th>
                            <th scope="col">F4 Out No</th>
                            <th scope="col">Item Qty | Desc</th>
                            <th scope="col">User</th>
                            <th scope="col">View </th>
                            <th scope="col">QC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example data row */}
                          <tr>
                            <td>1</td>
                            <td>242512362</td>
                            <td>02/12/24</td>
                            <td>02/12/24 15:04</td>
                            <td>
                              <span className="ourf4"> Our_F4 </span>
                            </td>
                            <td>740</td>
                            <td>02/12/24</td>
                            <td>JVOO51</td>
                            <td>Mamtal Engineering</td>
                            <td>""</td>
                            <td>Total Item : (2) 📝</td>
                            <td>Togre</td>
                            <td>
                              {" "}
                              <FaEye />
                            </td>
                            <td>
                             <Link to={"/SubconJobworkInwardQC"}  className="vndrbtn" >  ! </Link> 
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

export default PaddingQCInward;
