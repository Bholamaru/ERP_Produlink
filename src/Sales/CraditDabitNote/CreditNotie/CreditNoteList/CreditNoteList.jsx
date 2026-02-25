import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./CreditNoteList.css";


const CreditNoteList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/'); 
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
    <div className="CreditNoteListMaster">
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
                <div className="CreditNoteList mt-5">
                  <div className="CreditNoteList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Credit Note List</h5>
                      </div>
                                  
                        <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          Credit Note - Query
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="CreditNoteList-main">
                    
                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">From Date</label>
                             <input type="date" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">To Date:</label> 
                             <input type="date" className="form-control" placeholder="" />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Plant:</label>
                                <select name="" id="" className="form-control">
                                    <option value="">Produlink</option>
                                </select>         
                         </div>
                          <div className="col-md-2 ">
                          <label htmlFor="">
                            PartyName:</label>
                            <input type="text" className="form-control" placeholder="Party Name" />
                         </div>
                         <div className="col-md-2 mt-4">
                            <button className="btn">Search</button>
                         </div>

                      </div>

                      
                     <div className="table-responsive mt-5">
                                  <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>Sr.</th>
                                            <th>Year </th>
                                            <th>Plant</th>
                                            <th>Note No</th>
                                            <th>Note Date </th>
                                            <th>Code </th>
                                            <th>Cust/Supp. Name</th>
                                            <th>Amount</th>
                                            <th>User</th>
                                            <th>IRN</th>
                                            <th>Cancel</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Del</th>
                                            <th>All</th>
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
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                 </table>
                                            
                                  <div className="row">
                                        <div className="col-4 text-start">Total Record : 00</div>
                                        <div className="col-2"></div>                                             <div className="col-6 text-end">Total Amount : 00.00 
                                            <button className="btn">Bulk Print</button>
                                            <button className="btn">Delete Selected</button>
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

export default CreditNoteList