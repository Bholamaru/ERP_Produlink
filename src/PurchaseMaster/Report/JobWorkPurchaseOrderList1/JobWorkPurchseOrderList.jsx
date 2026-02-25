import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobWorkPurchaseOrderList.css"
const JobWorkPurchseOrderList = () => {

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
    <div className="JobWorkPurchseOrderList">
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
              <div className="JobWorkPurchseOrderList-header  text-start mt-5">
                    <div className="row align-items-center">
                  <div className="col-md-4">
                    <h5 className="header-title">
                    JobWork Purchse Order List
                    </h5>
                  </div>
                  <div className="col-md-8 text-end">
                    
                        <button className="pobtn">JobWork PO - Query</button>
                    
                  </div>
                </div>
              </div>
              <div className="JobWorkPurchse-main mt-5">
                <div className="container-fluid mt-4">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Plant</th>
                          <th>Type</th>
                          <th>Series</th>
                          <th>PO Status</th>
                        
                          <th>
                            <input type="checkbox" id="supplier" />
                            <label htmlFor="supplier" className="ml-2">
                              Supplier Name
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="item" />
                            <label htmlFor="item" className="ml-2">
                              PO No
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="poNo" />
                            <label htmlFor="poNo" className="ml-2">
                              Part Code
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="itemGroup" />
                            <label htmlFor="itemGroup" className="ml-2">
                              Item No
                            </label>
                          </th>
                          <th>
                           Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="date" className="form-control" />
                          </td>
                          <td>
                            <input type="date" className="form-control" />
                          </td>
                          <td>
                            <select className="form-control">
                              <option>Plant 1</option>
                              <option>Plant 2</option>
                              <option>Plant 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>Type 1</option>
                              <option>Type 2</option>
                              <option>Type 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>JobWork</option>
                              <option>Status 2</option>
                              <option>Status 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Status 2</option>
                              <option>Status 3</option>
                            </select>
                          </td>
                          
                          <td>
                            <input type="text" className="form-control" />
                          </td>
                          <td>
                            <input type="text" className="form-control" />
                          </td>
                          <td>
                            <input type="text" className="form-control" />
                          </td>
                          <td>
                            <input type="text" className="form-control" />
                          </td>
                          <td>
                            <button className="pobtn">Search</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="JobWorkOrdertable">
                  <div className="container-fluid mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th>Year</th>
                            <th>Plant</th>
                            <th>PO No</th>
                            <th>PO Date</th>
                            <th>PO Type</th>
                            <th>Code No.</th>
                            <th>Supplier/Vendor Name</th>
                            <th>User</th>
                            <th>Info</th>
                            <th>Auth Status</th>
                            <th>Po Status</th>
                            <th>Email</th>
                            <th>Docs</th>
                            <th>Disc (%)</th>
                            
                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>{/* Data rows will go here */}</tr>
                        </tbody>
                      </table>
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
  )
}

export default JobWorkPurchseOrderList
