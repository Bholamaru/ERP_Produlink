import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./CreditNotie.css";


const CreditNotie = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/CreditNoteList'); 
    };
    const handleBttnClick = () => {
      navigate('/Creditnoteto'); 
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
    <div className="CreditNotieMaster">
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
                <div className="CreditNotie mt-5">
                  <div className="CreditNotie-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-1">
                        <h5 className="header-title">New Credit Note </h5>
                      </div>
                      <div className="col-md-2">
                         <div className="row">
                             <div className="col-4 mt-3">
                               <label htmlFor="">Plant:</label>
                             </div>
                             <div className="col-8">
                               <select name="" className="form-control" id="">
                                  <option value="">ProduLink</option>
                               </select>
                             </div>
                         </div>
                      </div>
                      <div className="col-md-2">
                         <div className="row">
                             <div className="col-4 mt-3">
                               <label htmlFor="">Series:</label>
                             </div>
                             <div className="col-8">
                               <select name="" className="form-control" id="">
                                  <option value="">Credit Note</option>
                               </select>
                             </div>
                         </div>
                      </div>
                      <div className="col-md-2">
                         <div className="row">
                             <div className="col-4 mt-3">
                               <label htmlFor="">Type:</label>
                             </div>
                             <div className="col-8">
                               <select name="" className="form-control" id="">
                                  <option value="">Direct</option>
                                  <option value="">GRN</option>
                               </select>
                             </div>
                         </div>
                      </div>
                      <div className="col-md-2">
                         <div className="row">
                             <div className="col-4 mt-3">
                               <label htmlFor="">SubType:</label>
                             </div>
                             <div className="col-8">
                               <select name="" className="form-control" id="">
                                  <option value="">Select</option>
                                  <option value="">Rejection</option>
                                  <option value="">RateDiff</option>
                                  <option value="">Quantity</option>
                                  <option value="">Other</option>
                               </select>
                             </div>
                         </div>
                      </div>
                        
                        <div className="col-md-3 text-end">
                        <button type="button" className="btn" onClick={handleBttnClick}>
                          CN-Against Inv.
                        </button>
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          Credit Note List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="CreditNotie-main">
                      <div className="row text-start">
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">CreditNote NO:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="text" className="form-control" placeholder="24250001"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">CreditNote Date:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="date" className="form-control" placeholder=""/>
                               </div>
                          </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-4 mt-2">
                                  <label htmlFor="">Party Name:</label>
                               </div>
                               <div className="col-md-8">
                                  <input type="text" className="form-control" placeholder="Enter Party Name"/>
                               </div>
                          </div>
                        </div>
                        <div className="col-1 mt-2">
                            <button type="button" className="btn">Search</button>
                        </div>
                       </div>
                    </div>


                  <div className="CreditNotie-main mt-5">
                    <div className="CreditNotie-tabs">
                   
                      <div className="tab-content mt-4" id="" >
                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead class="table-header">
                                            <tr>
                                            <th>Item Code.</th>
                                            <th>Item Desc </th>
                                            <th>Remark</th>
                                            <th>HSN Code</th>
                                            <th>Rate</th>
                                            <th>Qty</th>
                                            <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" className="form-control" /> <button className="btn">Search</button></td>
                                                <td><textarea name="" id=""></textarea></td>
                                                <td><textarea name="" id=""></textarea></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <button className="btn"> Add </button></td>
                                                
                                            </tr>
                                        </tbody>
                                        </table>

                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                              <th>Sr</th>
                                              <th>GRN No</th>
                                              <th>GRN Date</th>
                                            <th>Item Code.</th>
                                            <th>Item Desc </th>
                                            <th>HSN Code</th>
                                            <th>Reason</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                            <th>GST C+S+I</th>
                                            <th>Ammount</th>
                                            <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                              <td>1</td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                                <td><textarea name="" id=""></textarea></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td> + + </td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <button className="btn"> X </button></td>
                                                
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
                                            <th>SubTotal</th>
                                            <th colSpan="2">CGST</th>
                                            <th colSpan="2">SGST</th>
                                            <th colSpan="2">IGST</th>
                                            <th colSpan="2">UTGST</th>
                                            <th>TCS</th>
                                            <th>Grand Total</th>
                                        </tr>

                                        <tr>
                                        <td> <input type="text" className="form-control" /> </td>
                                    <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" className="form-control" placeholder="00.00" /> </td>

                                    <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" className="form-control" placeholder="00.00" /> </td>

                                    <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" className="form-control" placeholder="00.00" /> </td>

                                  <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>   
                                    <td> <input type="text" className="form-control" placeholder="00.00" /> </td>

                                   <td>  <input type="text" className="form-control" placeholder="00.00"/> <br />
                                   <input type="text" className="form-control" placeholder="00.00"/> </td>
                                   <td> <input type="text" className="form-control" placeholder="00.00" /></td>
                                        
                                    </tr>
                                    </table>
                                </div>
                                
                            </div>
                      </div>

                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Supp CrDr No:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Supp CrDr Date:</label>
                             <input type="date" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Inv NO:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Inv Date:</label>
                             <input type="date" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor=""> Select GL:</label>
                             <select name="" className="form-control" id="">
                               <option value="">Select GL</option>
                             </select>
                          </div>
                      </div>

                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Remark</label>
                             <textarea name=""  className="form-control" id=""></textarea>
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Other Ref.</label>
                             <textarea name=""  className="form-control" id=""></textarea>
                          </div>
                          <div className="col-md-2">
                             <label htmlFor=""> For E-Invoice :</label>
                             <select name="" className="form-control" id="">
                               <option value="">Bussiness-to-Bussiness</option>
                             </select>
                          </div>
                          <div className="col-md-2">
                             <input type="checkbox" className="mt-5 " placeholder="" />
                             <label htmlFor="" className="ml-3"> IS Service Invoice</label>
                          </div>
                          <div className="col-md-2 mt-5">
                            <button className="btn">Save Dabit Note</button>
                            <button className="btn">Clear</button>
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


export default CreditNotie