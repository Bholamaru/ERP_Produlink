import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './SalesQCList.css';

const SalesQCList = () => {
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
    <div className="SalesQCListMaster">
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
                <div className="SalesQCList mt-5">
                  <div className="SalesQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title"> Sales Return QC List </h5>
                      </div>
                      <div className="col-md-2">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> With Company Header </label>
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <button type="button" className="btn">
                          Export Excel
                        </button>
                        <button type="button" className="btn">
                          GST Sales Return QC-Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="SalesQCList-filter mb-4 mt-5">
                    <div className="row text-start">
                      
                      <div className="col-md-1">
                        <label>From Date</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-1">
                        <label>To Date</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-md-2">
                        <label>Plant</label>
                        <select className="form-select" style={{marginTop:"1px"}}>
                          <option value="SHARP">SHARP</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text"  placeholder="Cust Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Code: </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" />
                      </div>
            
                      <div className="col-md-2">
                        <label>Reject Reason</label>
                        <select className="form-select" style={{marginTop:"1px"}}>
                          <option value="ALL">ALL</option>
                          <option>ANGLE NOT OK</option>
                          <option>Assembled parts</option>
                          <option>Blackodising NG</option>
                          <option>Broken</option>
                          <option>BURR</option>
                        </select>
                      </div>

                      <div className="col-md-1">               
                         <button className="btn btn-primary" style={{marginTop:"29px"}}>Search</button>          
                      </div>

                    </div>
                   
                  </div>

                  {/* Table Section */}
                  <div className="SalesQCList-Main mt-5">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Plant</th>
                          <th>QC No</th>
                          <th>QC Date</th>
                          <th>Cust Name</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Part Code</th>
                          <th>Re. Qty</th>
                          <th>Qk Qty</th>
                          <th>Rej Qty</th>
                          <th>Rew Qty</th>
                          <th>Reason</th>
                          <th>Doc</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>1</td>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        
                          <td>
                            <button className="btn btn-sm btn-light">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                        {/* Additional rows can be added dynamically here */}
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

export default SalesQCList