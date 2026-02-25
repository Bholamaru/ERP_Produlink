import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./GSTSalesReturn.css";
import Cached from "@mui/icons-material/Cached.js";
import axios from "axios";



const GSTSalesReturn = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();  
  const [gateEntries, setGateEntries] = useState([]);  
  const [selectedType, setSelectedType] = useState(""); 
  const [selectedGateEntry, setSelectedGateEntry] = useState("")
  const handleButtonClick = () => {
      navigate('/GSTSalesReturnList'); 
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
  useEffect(() => {
  fetchGateEntries();
}, []);

const fetchGateEntries = async () => {
  try {
    const response = await axios.get(
      "https://erp-render.onrender.com/Sales/salesreturn/gate-entry"
    );
    setGateEntries(response.data);
  } catch (error) {
    console.error("Error fetching gate entries:", error);
  }
};


  return (
    <div className="GSTSalesReturnMaster">
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
                <div className="GSTSalesReturn mt-5">
                  <div className="GSTSalesReturn-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">New GST Sales Return</h5>
                      </div>
                    
                    
                        <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                        GST Sales Return List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="GSTSalesReturn-main">
                    <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Plant:</th>
                                        <th>Gate Entry No: </th>
                                        <th>Series:</th>
                                        <th>Type:</th>
                                        <th>Sales Return No: </th>
                                        <th>Sales Return Date:</th>
                                        <th>Cust Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                           <select name=""  className="form-control" id="">
                                                <option value="">ProduLink</option>
                                            </select>
                                        </td>
                                        <td>
                                    <select
                                      className="form-control"
                                      value={selectedGateEntry}
                                      onChange={(e) => setSelectedGateEntry(e.target.value)}
                                    >
                                      <option value="">Select</option>

                                      {gateEntries.map((item) => (
                                        <option key={item.id} value={item.id}>
                                          {item.GE_No}
                                        </option>
                                      ))}
                                    </select>

                                    <button type="button" className="btn" onClick={fetchGateEntries}>
                                      <Cached />
                                    </button>
                                  </td>

                                        <td>
                                          <select name=""  className="form-control" id="">
                                                <option value="">Select</option>
                                                <option value="GSTSalesReturn">GST Sales Return</option>
                                            </select>
                                        </td>
                                        <td>
                                      <select
                                        className="form-control"
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                      >
                                        <option value="">Select</option>
                                        <option value="Invoice">Invoice</option>
                                        <option value="Direct">Direct</option>
                                      </select>

                                      <button type="button" className="btn">
                                        <Cached />
                                      </button>
                                    </td>

                                        <td>
                                        <input type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="date" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" placeholder="Name..." />
                                            <button className="btn">Search</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                          </div>
                    </div>
                  {selectedType === "Invoice" && (
                 <div style={{ height: "200px" }}></div>
                  )}

                  <div className="GSTSalesReturn-main mt-5">
                    <div className="GSTSalesReturn-tabs">
                   
                      <div className="tab-content mt-4" id="" >

                          <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Sales Inv.No</th>
                                        <th>Sales Inv.Date </th>
                                        <th>Item Code</th>
                                        <th>Item Desc</th>
                                        <th>Remark</th>
                                        <th>HSN Code</th>
                                        <th>Rate</th>
                                        <th>Disc%</th>
                                        <th>Inv.Qty</th>
                                        <th>Return.Qty</th>
                                        <th> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                          <input type="text" placeholder="" className="form-control" />
                                        </td>
                                        <td> <input type="date" placeholder="" className="form-control" /></td>
                                        <td>
                                            <input type="text" placeholder="Enter Code" className="form-control" />
                                            <button className="btn w-50">Search</button>
                                        </td>
                                        <td><textarea className="form-control"></textarea></td>
                                        <td><textarea className="form-control"></textarea></td>
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
                                            <input type="text" className="form-control" />
                                            <select name="" id="">
                                                <option value="">Select</option>
                                            </select>
                                        </td>
                                        <td><button className="btn">Add</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                          </div>

                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>No.</th>
                                            <th>Inv No </th>
                                            <th>Inv Date</th>
                                            <th>Item Code</th>
                                            <th>Item Desc</th>
                                            <th>HSNCode</th>
                                            <th>Rate.</th>
                                            <th>Disc%.</th>
                                            <th>TotalAmt</th>
                                            <th>Inv.Qty</th>
                                            <th>Edit</th>
                                            <th>Return Qty</th>
                                            <th>Lot/HC</th>
                                            <th>Reason</th>
                                            <th>GRIR No.</th>
                                            <th>GRIR Date.</th>
                                            <th>Del.</th>
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
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Edit</td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <textarea name=""  id=""></textarea></td>
                                                <td> <input type="text" className="form-control" /></td>
                                                <td> <input type="date" className="form-control" /></td>
                                                <td><button className="btn"> X </button></td>
                                            </tr>
                                        </tbody>
                                        </table>
                            </div>

                      </div>

                       <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <th>Basic</th>
                                            <th>Disc</th>
                                            <th>SubTotal</th>
                                            <th>TotalAmt</th>
                                            <th colSpan="2">CGST</th>
                                            <th colSpan="2">SGST</th>
                                            <th colSpan="2">IGST</th>
                                            <th colSpan="2">UTGST</th>
                                            <th>TOC(Other)</th>
                                            <th colSpan="2">TSC </th>
                                            <th>Grand Total</th>
                                        </thead>

                                        <tbody>
                                        <td> <input type="text" className="form-control" placeholder="" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="" /> </td>
                                        <td> <input type="text" className="form-control" /></td>
                                        <td> <input type="text" className="form-control" /></td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td> 
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                       </div>


                       <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Invoice Challan No</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Invoice Challan Date:</label>
                             <input type="date" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Transport Mode:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Transport Name:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">LR No:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Vehicle No:</label>
                             <input type="text" className="form-control" placeholder="" />
                          </div>
                      </div>
                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Remark</label>
                             <textarea name=""  className="form-control" id=""></textarea>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="">For E-Invoice :</label>
                             <select name="" className="form-control" id="">
                                <option value="">Bussiness To Bussiness</option>
                             </select>
                          </div>
                          <div className="col-md-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <input type="checkbox" placeholder="" />
                            <label htmlFor=""> ISService</label>
                            </div>

                            <div className="col-2 mt-4">
                                <input type="file" id="file-upload" style={{ display: 'none' }} />
                                <label htmlFor="file-upload" style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                    DooTC Upload 
                                </label>
                            </div>
                          <div className="col-md-2 mt-4">
                            <button className="btn">Save Dabit Note</button>
                            <button className="btn">Clear</button>
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


export default GSTSalesReturn