import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { FaEdit,FaTrash } from "react-icons/fa";
import './AddQuater.css';

const AddQuater = () => {
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
     <div className="QuarterMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Quarter mt-5">
                  <div className="Quarter-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Quarter Master</h5>
                      </div>
                      
                    </div>
                  </div>

                  <div className="Quarter-Main mt-5">
                    <div className="container-fluid">
                        <div className="row text-start">
                            <div className="col-md-1">
                                <label>Year:</label>
                            </div>
                            <div className="col-md-1">
                                <select><option>select All</option></select>
                            </div>
                            <div className="col-md-1">
                                <label>Quarter:</label>
                            </div>
                            <div className="col-md-1">
                                <select><option>select All</option></select>
                            </div>
                            <div className="col-md-1">
                                <label>Quarter Name:</label>
                            </div>
                            <div className="col-md-1">
                                <input type="text" className="form-control mt-1"/>
                            </div>
                            <div className="col-md-1">
                                <label>From Date:</label>
                            </div>
                            <div className="col-md-1">
                                <input type="date" className="form-control mt-1"/>
                            </div>
                          
                            <div className="col-md-1">
                                <label>To Date:</label>
                            </div>
                            <div className="col-md-1">
                                <input type="date" className="form-control mt-1"/>
                            </div>
                            
                            <div className="col-md-2 mt-1">
                              <button type="button" className="btn">SAVE</button>
                            </div>
                            
                        </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Financial Year</th>
                          <th scope="col">Quarter No</th>
                          <th scope="col">Quarter Name</th>
                          <th scope="col">From Date</th>
                          <th scope="col">To Date</th>                       
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>January</td>
                          <td>01/01/2024</td>
                          <td>31/01/2024</td>
                          <td>1</td>
                          <td>2024</td>
                          
                          <td>
                            <button className="btn btn-link">
                              <FaEdit/>
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-link text-danger">
                             <FaTrash/>
                            </button>
                          </td>
                        </tr>
                        {/* More rows can be added here */}
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

export default AddQuater
