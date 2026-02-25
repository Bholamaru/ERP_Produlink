import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PandingQCList.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

const PandingQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);

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

  useEffect(() => {
    // setQcList(dummyData); // Uncomment and ensure dummyData is defined
  }, []);

  return (
    <div className="PandingQCListMaster">
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
                <div className="PandingQCList mt-5">
                  <div className="PandingQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> <span className="purch">Purchase GRN : </span> Pending QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn">
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="PandingQCList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant :</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} >
                            <option>SHARP</option>
                            <option>DI</option>
                          </select>
                        </div>

                        {/* From Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Main Group :</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} >
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

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item Group:</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} >
                            <option>ALL</option>
                            <option>BEARING</option>
                            <option>BELTS</option>
                            <option>CAMS</option>
                            <option>COLLECTS & HOLDERS</option>
                            <option>COMPUTER</option>
                            <option>CUTTING TOOLS</option>
                            <option>ELECTRICAL PARTS</option>
                            <option>END PIECE</option>
                            <option>FIXCTURE</option>
                            <option>FORMING TOOLS</option>
                            <option>GAUGES & INSTUMENTS</option>
                            <option>GENRAL</option>
                            <option>HOLDERS</option>
                            <option>INSERTS</option>
                            <option>IT SUPPORTS</option>
                            <option>MACHINE SPARE</option>
                            <option>MACHINING</option>
                            <option>OIL & LUBRICANTS</option>
                            <option>PACKING</option>
                            <option>SERVICES</option>
                            <option>STATIONARY</option>
                            <option>TOOLING SPARE</option>
                          </select>
                        </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Supplier Name:</label>
                          <input type="text" placeholder="Name..." className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item No Desc:</label>
                          <input type="text" placeholder="Item..." className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>PO No:</label>
                          <input type="text" placeholder="PO No..." className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>GRN No:</label>
                          <input type="text" placeholder="GRN No..." className="form-control" />
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                          <button type="button" className="btn btn-primary w-100" >
                            Search
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Return No</th>
                          <th scope="col">Return Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Return Qty</th>
                          <th scope="col">User</th>
                          <th scope="col">QC</th>
                        </tr>
                      </thead>
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

export default PandingQCList;