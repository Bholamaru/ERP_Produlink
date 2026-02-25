import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './FinancialMonth.css';


import { FaEdit,FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";





const FinancialMonth = () => {
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
    <div className="Financialmonth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="FinancialMon mt-5">
                  <div className="month-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Month Master</h5>
                      </div>
                      <div className="col-md-8 text-end">

                        <Link type="button" className="btn" to='/AddQuater'>Add Quarter</Link>
                        

                        <Link type="button" className="btn" to='/Companysetup'>Company Info</Link>


                       
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr. Id</th>
                          <th scope="col">Month Name</th>
                          <th scope="col">From Date</th>
                          <th scope="col">To Date</th>
                          <th scope="col">Month No</th>
                          <th scope="col">Year No</th>
                          <th scope="col">W Day</th>
                          <th scope="col">Scrap OPBal</th>
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
                          <td>21</td>
                          <td>100</td>
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
  );
}

export default FinancialMonth;
