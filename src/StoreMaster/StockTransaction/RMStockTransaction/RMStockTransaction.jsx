import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";

import "react-toastify/dist/ReactToastify.css";
import "./RMStoclTransaction.css";
import { Link } from "react-router-dom";
const RMStockTransaction = () => {
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
    <div className="NewStoreRMStock">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="RMStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title text-start">
                        RM Stock Transaction Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-8 d-flex align-items-end">
                        
                         
                          <Link className="pobtn">Export To Excel</Link>
                        
                          <Link className="pobtn" to="/RMTOtherGroup">RM To Other Group</Link>

                          <Link className="pobtn" to="/RMToTransaction" >RM To RM Transaction</Link>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="RMStock-main">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">

                          
                          {/* From Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Plant */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          

                          {/* Series */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Series</label>
                            <select className="form-select">
                              <option value="">All</option>
                              <option value="Scrap">Scrap</option>
                              <option value="Rejection">Rejection</option>

                              <option value="RM To RM">RM To RM</option>
                              <option value="RM to End Pices">RM to End Pices</option>
''
                              </select>

                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Search Item Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Name"
                            />
                          </div>

                         

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="pobtn w-100">
                              Search
                            </button>
                           
                          </div>
                          
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreRMStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr</th>
                              <th>Year</th>
                              <th>##</th>
                              <th>Trn No.</th>
                              <th>Trn Date</th>
                              <th>Type</th>
                              <th>Item No(from)</th>
                              <th>Item Desc (from)</th>
                              <th>Heat (Dr)</th>
                              <th>Qty (Dr)</th>
                              <th>UOM</th>
                              <th>Item No(To)</th>
                              <th>Item Desc(To)</th>
                              <th>Heat(cr)</th>
                              <th>Qty (Cr)</th>
                              <th>UOM</th>
                              <th>User</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Table rows will go here */}
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

export default RMStockTransaction
