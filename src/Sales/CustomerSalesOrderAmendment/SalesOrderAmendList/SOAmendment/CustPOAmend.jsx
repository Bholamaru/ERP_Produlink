import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./CustPOAmend.css";


const CustPOAmend    = () => {
    const navigate = useNavigate();
    const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleNavigate = () => {
    navigate('/CustPOAmend');
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="CustPOAmendMaster">
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
              <div className="CustPOAmend mt-5">
                <div className="CustPOAmend-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Customer PO Amendment </h5>
                    </div>
                    <div className="col-md-1">
                            series
                    </div>
                    <div className="col-md-1">
                        <select name="" id="">
                            <option value="">Select</option>
                            <option value="">SO Amendment</option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className="btn" to="#/" onClick={handleNavigate}>
                            SO Amendment List
                        </button>
                    </div>
                  </div>
                </div>
               
                <div className="CustPOAmend-Main">
                    <div className="container-fluid">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Amd No. :</th>
                          <th scope="col">Amd Date :</th>
                          <th scope="col">Cust Name :</th>
                          <th scope="col">PO No :</th>
                          <th scope="col">Amd Type :</th>
                          <th scope="col"> Rev No :</th>
                          <th scope="col">Ref :</th>
                          <th scope="col">Ref Date : </th>
                          <th scope="col">Narration : </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td><input type="text" /> <input type="text" /> </td>
                          <td><input type="date" /></td>
                          <td><input type="text" placeholder="Name" /></td>
                          <td> 
                            <select name="" id="">
                               <option value="">Select an Option</option>
                               <option value=""></option>
                               <option value=""></option>
                            </select>
                        </td>
                          <td>
                          <input type="radio" id="" name="fav_language" value="" />
                          <label for="">Rate</label>
                          <input type="radio" id="" name="fav_language" value="" />
                           <label for="">Qty</label>
                           <input type="radio" id="" name="fav_language" value="" />
                          <label for="">Close</label>
                          <input type="radio" id="" name="fav_language" value="" />
                           <label for="">PO Date</label>

                           <button>Add</button>
                          </td>
                          <td>  </td>
                          <td> <input type="text" /> </td>
                          <td><input type="date" /></td>
                          <td><textarea name="" id=""></textarea></td>
                        </tr>
                      </tbody>  
                    </table>
                    </div>
                  </div>

             <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Cust PO No</th>
                          <th scope="col">PO Date</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Eff Date</th>
                          <th scope="col">Remark Note</th>
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

export default CustPOAmend