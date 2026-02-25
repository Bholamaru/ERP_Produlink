
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTSalesReturnList.css";
import {  FaEye, FaRegEdit} from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { MdDeleteForever, MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const GSTSalesReturnList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/GSTSalesReturn'); 
        };

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
    <div className="GSTSalesReturnListMaster">
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
              <div className="GSTSalesReturnList mt-5">
                <div className="GSTSalesReturnList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title"> GST Sales Return List </h5>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className="btn" to="#/" onClick={handleButtonClick}>
                        New GST Sales Return
                        </button>
                        <button type="button" className="btn" to="#/">
                         GST Sales Return - Query
                        </button>   
                        
                    </div>


                  </div>
                </div>
               
                <div className="GSTSalesReturnList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start mt-3">  

                       <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control" id="">
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Party Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Inv.No: </label>
                        </div>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cancel: </label>
                        </div>
                        <select name="" className="form-control" id="">
                            <option value="">All</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                      </div>


                      <div className="col-6 col-md-1 mt-5">
                          <button type="button" className="btn btn-primary">
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
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Return No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Item Qty Desc</th>
                          <th scope="col">Amount</th>
                          <th scope="col">User</th>
                          <th scope="col">Info</th>
                          <th scope="col">IRN</th>
                          <th scope="col">Cancel </th>
                          <th scope="col">View </th>
                          <th scope="col">Edit </th>
                          <th scope="col">Doc </th>
                          <th scope="col">Del </th>

                        </tr>
                      </thead>

                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>24-25</td>
                          <td>Produlink</td>
                          <td>GSR-242500116</td>
                          <td>09/12/24</td>
                          <td>027</td>
                          <td>C0005 ENDURANGE TECHNOLOGIES LTD (I) </td>
                          <td>Rate : 19.86 | Qty : 528 | FG1017</td>
                          <td>13,355.07</td>
                          <td>Torge</td>
                          <td> </td>
                          <td> </td>
                          <td> <MdCancel /> </td>
                          <td> <FaEye /></td>
                          <td> <FaRegEdit /></td>
                          <td> <IoDocuments /></td>
                          <td> <MdDeleteForever /></td>
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

export default GSTSalesReturnList