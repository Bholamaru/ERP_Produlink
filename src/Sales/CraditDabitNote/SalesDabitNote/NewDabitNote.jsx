import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./NewDabitNote.css";

const NewDabitNote = () => {
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
    <div className="NewDabitNoteMaster">
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
                <div className="NewDabitNote mt-5">
                  <div className="NewDabitNote-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">New Debit Note (Sales Rate Diff.) </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          Debit Note List
                        </button>
                        </div>
                    </div>
                  </div>

                  <div className="NewDabitNote-main mt-5">
                     <div className="row text-start">

                     <div className="col-md-2">
                            <label htmlFor="">Debit Note No :</label>
                            <input type="text" className="form-control" placeholder="262700001"/>                            
                      </div> 
                     <div className="col-md-2">
                            <label htmlFor="">Debit Note Date :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">Type :</label>
                            <select name="" id="" className="form-control">
                               <option value="">Select</option>
                               <option value="">Group</option>
                               <option value="">Single</option>
                           </select>
                      </div> 
                      <div className="col-md-6 d-flex align-items-center mt-3">
                            <label className="mb-0">Group : 1 Debit Note , Single : Per Itemwise Debit Note <span className="text-primary">ON Without-Invoice</span></label>
                      </div>

                     </div>
                  </div>

                  <div className="NewDabitNote-main mt-5">
                    <div className="NewDabitNote-second">
                      <ul className="nav nav-tabs" id="NewDabitNoteTabs" role="tablist" >
                        <li className="nav-item" role="presentation">
                          <button  className="nav-link active"  id="invoicedetails-tab"  data-bs-toggle="tab"  data-bs-target="#invoicedetails"  type="button"  role="tab"  >
                            Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="dabitnotedetails-tab" data-bs-toggle="tab" data-bs-target="#dabitnotedetails" type="button" role="tab" >
                            Debit Note Details
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4"  id="NewDabitNoteTabsContent">

                        <div className="tab-pane fade show active" id="invoicedetails" role="tabpanel">
                            <div className="p-3 bg-light border mt-3 rounded shadow-sm">
                                <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant :</label>
                                        <select className="form-control form-control-sm">
                                            <option>ProduLink</option>
                                        </select>
                                    </div> 
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                                        <input type="date" className="form-control form-control-sm"/>
                                    </div>
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                                        <input type="date" className="form-control form-control-sm"/>
                                    </div>
                                    <div style={{minWidth: '150px'}} className="flex-grow-1">
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Customer :</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Enter Name ..."/>                            
                                    </div> 
                                  
                                    <div style={{minWidth: '100px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Add Code :</label>
                                        <select className="form-control form-control-sm">
                                            <option>Select</option>
                                        </select>
                                    </div> 
                                    <div style={{minWidth: '180px'}}>
                                        <div className="d-flex align-items-center mb-1">
                                            <input type="checkbox" id="Item-checkbox" className="mt-0 me-1" style={{width: '13px', height: '13px', cursor: 'pointer'}} />
                                            <label htmlFor="Item-checkbox" className="fw-bold mb-0" style={{fontSize: '12px', cursor: 'pointer'}}>Item :</label>
                                        </div>
                                        <input type="text" placeholder="Enter Code | Name" className="form-control form-control-sm"/>
                                    </div> 

                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Note Type :</label>
                                        <select className="form-control form-control-sm">
                                            <option>All Inv</option>
                                        </select>
                                    </div> 
                                    <div>
                                        <button type="button" className="btn btn-primary btn-sm px-4">
                                            Search
                                        </button> 
                                    </div>
                                </div>
                            </div> 
                        </div>

                         <div className="tab-pane fade" id="dabitnotedetails" role="tabpanel" >
                              <div className="NewDabitNote-header mb-4 text-start">

                                 <div className="table-responsive">
                                  <table className="table table-bordered table-sm align-middle">
                                        <thead className="table-light">
                                            <tr>
                                              <th>No.</th>
                                              <th>Inv.No</th>
                                              <th>Item</th>
                                              <th>HSNCode</th>
                                              <th>Qty</th>
                                              <th>Edit</th>
                                              <th>Old Rate</th>
                                              <th>New Rate</th>
                                              <th>Disc(%)</th>
                                              <th>Diff</th>
                                              <th>Diff.Amt</th>
                                              <th>GRIR No.</th>
                                              <th>GRIR Date</th>
                                              <th>GRIR Qty</th>
                                              <th>Line No</th>
                                              <th>Po No | Date</th>
                                              <th>Amd No | Date</th>
                                              <th>Remark</th>
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
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td></td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td><input type="date" className="form-control form-control-sm" /></td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td>
                                                  <div className="d-flex gx-1">
                                                    <input type="text" className="form-control form-control-sm me-1" />
                                                    <input type="date" className="form-control form-control-sm" />
                                                  </div>
                                                </td>
                                                <td>
                                                  <div className="d-flex gx-1">
                                                    <input type="text" className="form-control form-control-sm me-1" />
                                                    <input type="date" className="form-control form-control-sm" />
                                                  </div>
                                                </td>
                                                <td><input type="text" className="form-control form-control-sm" /></td>
                                                <td><button className="btn btn-sm btn-outline-danger">X</button></td>
                                            </tr>
                                        </tbody>
                                 </table>
                                 </div>

                                 <div className="d-flex justify-content-between align-items-center bg-light p-2 border mt-3 fw-bold" style={{fontSize: '0.9rem'}}>
                                    <span>Debit Note / Tax Details</span>
                                    <span>Total Qty :</span>
                                 </div>

                                 <div className="table-responsive mt-0">
                                    <table className="table table-bordered table-sm align-middle text-center">
                                      <thead className="table-light">
                                        <tr>
                                          <th>SubTotal</th>
                                          <th>Disc Amt</th>
                                          <th>Ass Amt</th>
                                          <th>CGST</th>
                                          <th>SGST</th>
                                          <th>IGST</th>
                                          <th>UTGST</th>
                                          <th>TCS</th>
                                          <th>Grand Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="border-bottom-0"></td>
                                          <td className="border-bottom-0"></td>
                                          <td className="border-bottom-0"></td>
                                          <td className="border-bottom-0">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} /> <span className="ms-1">%</span>
                                            </div>
                                          </td>
                                          <td className="border-bottom-0">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} /> <span className="ms-1">%</span>
                                            </div>
                                          </td>
                                          <td className="border-bottom-0">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} /> <span className="ms-1">%</span>
                                            </div>
                                          </td>
                                          <td className="border-bottom-0">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} /> <span className="ms-1">%</span>
                                            </div>
                                          </td>
                                          <td className="border-bottom-0">
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} /> <span className="ms-1">%</span>
                                            </div>
                                          </td>
                                          <td className="border-bottom-0"></td>
                                        </tr>
                                        <tr>
                                          <td><input type="text" className="form-control form-control-sm" /></td>
                                          <td><input type="text" className="form-control form-control-sm" /></td>
                                          <td><input type="text" className="form-control form-control-sm" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td>
                                          <td><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" /></td> 
                                        </tr>
                                      </tbody>
                                    </table>
                                 </div>

                                 <div className="d-flex align-items-center flex-nowrap mt-4 pb-2 text-start" style={{overflowX: 'auto', gap: '15px'}}>
                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Bill To Add Code :</label>
                                      <select className="form-control form-control-sm me-2" style={{width: "80px"}}>
                                          <option></option>
                                      </select>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} readOnly />
                                    </div>
                                    
                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Other Reference(s) :</label>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} />
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Remark :</label>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} />
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">For E-Invoice :</label>
                                      <select className="form-control form-control-sm" style={{width: "120px"}}>
                                          <option>Business-to-B</option>
                                      </select>
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap mx-2 flex-shrink-0">
                                      <input type="checkbox" id="isServiceInvoice" style={{width: '13px', height: '13px', cursor: 'pointer'}} />
                                      <label className="mb-0 fw-bold ms-1 cursor-pointer" htmlFor="isServiceInvoice" style={{fontSize: '12px', cursor: 'pointer'}}>Is Service Invoice</label>
                                    </div>
                                    
                                    <div className="d-flex align-items-center text-nowrap">
                                      <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center text-nowrap me-2" style={{width: 'auto', padding: '5px 15px'}}>
                                          <span className="me-1">✔</span> Save Debit Note
                                      </button>
                                      <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center text-nowrap" style={{width: 'auto', padding: '5px 15px'}}>
                                          <span className="me-1">❌</span> Cancel
                                      </button>
                                    </div>
                                 </div>

                             </div>
                         </div>

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
  );
};


export default NewDabitNote