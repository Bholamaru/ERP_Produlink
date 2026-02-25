import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./JobWorkRateDiff.css";


const JobWorkRateDiff = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/DabitNoteList'); 
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
    <div className="JobWorkRateDiffMaster">
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
                <div className="JobWorkRateDiff mt-5">
                  <div className="JobWorkRateDiff-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">New Dabit Note (JobWork Rate Diff.)</h5>
                      </div>
                        
                        <div className="col-md-6 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          Dabit Note List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="JobWorkRateDiff-main">
                      <div className="row text-start">
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6">
                                  <label htmlFor="" className="mt-2">DabitNote NO:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="text" className="form-control" placeholder="24250001"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">DabitNote Date:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="date" className="form-control" placeholder=""/>
                               </div>
                          </div>
                        </div>
                       </div>
                    </div>

                    <div className="table-responsive mt-5"> 
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th colSpan="5">  
                                            <div className="row">
                                               <div className="col-2">
                                                   <div className="row">
                                                       <div className="col-md-6">
                                                          <label htmlFor="">Select Tax Invoice : From:</label>
                                                       </div>
                                                       <div className="col-md-6">
                                                           <input type="date" className="form-control" placeholder=""/>
                                                       </div>
                                                   </div>
                                                </div>
                                                <div className="col-2">
                                                   <div className="row">
                                                       <div className="col-md-4">
                                                          <label htmlFor="">TO:</label>
                                                       </div>
                                                       <div className="col-md-8">
                                                           <input type="date" className="form-control" placeholder=""/>
                                                       </div>
                                                   </div>
                                                </div>
                                                <div className="col-2">
                                                   <div className="row">
                                                       <div className="col-md-4">
                                                          <label htmlFor="">Cust:</label>
                                                       </div>
                                                       <div className="col-md-8">
                                                           <input type="text" className="form-control" placeholder=""/>
                                                       </div>
                                                   </div>
                                                </div>
                                                <div className="col-2">
                                                   <div className="row">
                                                       <div className="col-md-4">
                                                       <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                                                            <label htmlFor="Checkbox" className="form-check-label"> Item: </label>
                                                        </div>
                                                       </div>
                                                       <div className="col-md-8">
                                                           <input type="text" className="form-control" placeholder="item Code"/>
                                                       </div>
                                                   </div>
                                                </div>
                                                <div className="col-2">
                                                   <div className="row">
                                                       <div className="col-md-4">
                                                       <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                                                            <label htmlFor="Checkbox" className="form-check-label"> InvNo: </label>
                                                        </div>
                                                       </div>
                                                       <div className="col-md-8">
                                                           <input type="text" className="form-control" placeholder=""/>
                                                       </div>
                                                   </div>
                                                </div>
                                                <div className="col-1">
                                                <button type="button" className="btn btn-primary">
                                                    Search
                                                </button>
                                                </div>
                                            </div>
                                        </th>
                                     
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            NO DATA FOUND !
                                        </td>
                                        
                                    </tr>
                                    </tbody>
                                </table>
                   </div>

                  <div className="JobWorkRateDiff-main mt-5">
                    <div className="JobWorkRateDiff-tabs">
                   
                      <div className="tab-content mt-4" id="" >
                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>No.</th>
                                            <th>Inv No </th>
                                            <th>Inv Date</th>
                                            <th>HSN Code</th>
                                            <th>Qty</th>
                                            <th>Edit</th>
                                            <th>Old Rate</th>
                                            <th className="d-flex">NewRate <input type="text" className="form-control" /> <button className="btn"> SetAll </button></th>
                                            <th>Diff</th>
                                            <th>Diff Amt</th>
                                            <th>GRIR  No.</th>
                                            <th>GRIR Date</th>
                                            <th>Del</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Edit</td>
                                                <td></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="date" className="form-control" /></td>
                                                <td><span style={{border:"1px solid black"}}>X</span></td>
                                            </tr>
                                        </tbody>
                                        </table>
                            </div>

                      </div>

                    </div>
                  </div>

                      <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <tr>
                                            <td colSpan="5" className="text-start">Debit Note / Tax Details.</td>
                                        </tr>
                                        <tr>
                                            <th>SubTotal</th>
                                            <th>CGST</th>
                                            <th>SGST</th>
                                            <th>IGST</th>
                                            <th>UTGST</th>
                                            <th>Grand Total</th>
                                        </tr>

                                        <tr>
                                        <td>  </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                      
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                    
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        
                                        </tr>
                                        <tr>
                                        <td> <input type="text" className="form-control" placeholder="" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                      
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                    
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        
                                        </tr>
                                    </table>
                                </div>
                            </div>
                      </div>


                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Remark</label>
                             <textarea name=""  className="form-control" id=""></textarea>
                          </div>
                          <div className="col-md-2">
                             <input type="checkbox" className="mt-5 " placeholder="" />
                             <label htmlFor=""> IS Service Invoice</label>
                          </div>
                          <div className="col-md-2 mt-5">
                            <button className="btn">Save Dabit Note</button>
                            <button className="btn">Cancel</button>
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



export default JobWorkRateDiff