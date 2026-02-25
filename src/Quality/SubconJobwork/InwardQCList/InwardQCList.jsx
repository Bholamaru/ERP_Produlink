import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardQCList.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { MdMarkEmailRead, MdDeleteForever } from "react-icons/md";

const InwardQCList = () => {
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
    <div className="InwardQCListMaster">
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
                <div className="InwardQCList">
                  <div className="InwardQCList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Inward 57F4 QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          Jobwork QC Query
                        </button>
                        <button
                          type="button"
                          className="btn"
                          to="/PaddingQCInward"
                        >
                          Padding QC List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="InwardQCList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Plant :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>SHARP</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Type :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>All</option>
                            <option>Our_F4</option>
                            <option>Vendor_F4</option>
                            <option>Non Returnable</option>
                            <option>Vendor_Scrap</option>
                            <option>Cust_Rework_In</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Status :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>All</option>
                            <option>Accpet</option>
                            <option>Reject</option>
                            <option>Hold</option>
                            <option>AUD</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Item Group :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>Select</option>
                            <option>FG</option>
                            <option>RM</option>
                            <option>Tools</option>
                            <option>Instrument</option>
                            <option>Machine</option>
                            <option>Consumable</option>
                            <option>Safety Equ</option>
                            <option>Service</option>
                            <option>Asset</option>
                            <option>F4</option>
                            <option>Scrap</option>
                            <option>SF</option>
                            <option>BO</option>
                            <option>DI</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox"> Vendor Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox">Item :</label>
                          <input
                            type="text"
                            placeholder="Enter Code"
                            className="form-control"
                          />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox">Lot No :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                          />
                        </div>

                        <div className="col-6 col-md-2 mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                      </div>
                    
                      <div className="row mt-2 text-start">
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>57F4 GRN No :</option>
                            <option>IIR (QC) No</option>
                            <option>Vendor Challan NO</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <input
                            type="text"
                            placeholder="No."
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: "1px" }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-2">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Type</th>
                          <th scope="col">Plant</th>
                          <th scope="col">QC No</th>
                          <th scope="col">QC Date</th>
                          <th scope="col">Entry Date</th>
                          <th scope="col">Vendor Name</th>
                          <th scope="col">In/Ch No</th>
                          <th scope="col">In/Ch Date</th>
                          <th scope="col">Item | Part Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">QC Qty</th>
                          <th scope="col">OK Qty</th>
                          <th scope="col">Rew.</th>
                          <th scope="col">Rej.</th>
                          <th scope="col">Lot Status .</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit </th>
                          <th scope="col">Doc </th>
                          <th scope="col">View </th>
                          <th scope="col">Email </th>
                          <th scope="col">Del</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>24-25</td>
                          <td>
                            <span className="ourf4"> Our_F4 </span>
                          </td>
                          <td>SHARP</td>
                          <td>242508230</td>
                          <td>02/12/24</td>
                          <td>
                            02/12/24 <br /> 15:04
                          </td>
                          <td>
                            Swami Engineering <br />| 000094
                          </td>
                          <td>
                            {" "}
                            <span className="nummmr">
                              242512350
                            </span> <br /> 1923
                          </td>
                          <td>
                            02/12/24 <br /> 02/12/24
                          </td>
                          <td>
                            FG1022 CNG 1FG 1022 <br /> 550QJOO412
                          </td>
                          <td>FORK-BOLT UG-4.5 </td>
                          <td>4805</td>
                          <td>4805</td>
                          <td>0</td>
                          <td>0</td>
                          <td>Accept</td>
                          <td>mobin</td>
                          <td>
                            <FaEdit />
                          </td>
                          <td>
                            <HiDocumentArrowDown />
                          </td>
                          <td>
                            {" "}
                            <FaEye />
                          </td>
                          <td>
                            <MdMarkEmailRead />
                          </td>
                          <td>
                            {" "}
                            <MdDeleteForever />{" "}
                          </td>
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

export default InwardQCList;
