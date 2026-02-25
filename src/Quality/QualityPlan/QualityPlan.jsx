import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./QualityPlan.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

const QualityPlan = () => {
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
    <div className="QualityPlanMaster">
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
              <div className="QualityPlanList mt-5">
                <div className="QualityPlanList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Quality Control Plan List </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <button type="button" className="btn" to="/">
                        New Plan
                      </button>
                      <button type="button" className="btn" to="#/">
                        Export Report
                      </button>
                     </div>
                  </div>
                </div>

                <div className="ProQualityPlan-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Main Group :</label>
                        <select className="form-control" style={{marginTop:"1px"}}>
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
                        <label>Item Name:</label>
                        <input type="text" className="form-control"/>
                      </div>

                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" >
                          Search
                      </button> 
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" >
                          Clear
                      </button> 
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" >
                          View All
                      </button> 
                      </div>
                
                    </div>
                  </div>
                </div>

             <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Description</th>
                          <th scope="col">Operation</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Del</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
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
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QualityPlan