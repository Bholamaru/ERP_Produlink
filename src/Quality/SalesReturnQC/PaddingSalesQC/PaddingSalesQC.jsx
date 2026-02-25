import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PaddingSalesQC.css";
import { useNavigate } from "react-router-dom";

const PaddingSalesQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);
  const navigate = useNavigate();

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
    setQcList(dummyData);
  }, []);

  const dummyData = [
    {
      year: "25-26",
      plant: "SHARP",
      returnNo: "25060001",
      returnDate: "07/01/2026",
      customerName: "ENDURANCE TECHNOLOGIES LTD",
      itemCode: "FG1183",
      itemDesc: "CAP NUT M10",
      returnQty: 80,
      user: "Togre"
    }
  ];
  const handleQCClick = (item) => {
    navigate("/RejectionMaterialQC", { state: item });
  };
  return (
    <div className="PaddingSalesQCMaster">
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
                <div className="PaddingSalesQC mt-5">
                  <div className="PaddingSalesQC-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Pending Sales Return QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="PaddingSalesQC-filter mb-4 mt-5">
                    <div className="row text-start">

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Plant :</label>
                        <select className="form-select" style={{ marginTop: "-1px" }}>
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1" >
                        <label>From:</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>To Date:</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text" placeholder="Cust Name" className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label">Item Code: </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label"> Sales-Return-No: </label>
                        </div>
                        <input type="text" placeholder="" className="form-control" />
                      </div>


                      <div className="col-6 col-md-1 mt-4">

                        <button type="button" className="btn btn-primary">
                          Search
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-4">
                  <table className="table table-bordered table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Sr no</th>
                        <th>Year</th>
                        <th>Plant</th>
                        <th>Return No</th>
                        <th>Return Date</th>
                        <th>Customer Name</th>
                        <th>Item Code</th>
                        <th>Item Desc</th>
                        <th>Return Qty</th>
                        <th>User</th>
                        <th>QC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qcList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>   {/* Sr No */}
                          <td>{item.year}</td>
                          <td>{item.plant}</td>
                          <td>{item.returnNo}</td>
                          <td>{item.returnDate}</td>
                          <td>{item.customerName}</td>
                          <td>{item.itemCode}</td>
                          <td>{item.itemDesc}</td>
                          <td>{item.returnQty}</td>
                          <td>{item.user || "Togre"}</td>
                          <td
                            className="text-center text-danger fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleQCClick(item)}
                          >
                            !
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaddingSalesQC;