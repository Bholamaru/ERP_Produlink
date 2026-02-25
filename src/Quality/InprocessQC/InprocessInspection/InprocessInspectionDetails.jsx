import React, { useState } from "react";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./InprocessInspectionDetails.css";
import VisualInspection from "./VisualInspection"; 
import ReworkRejectQty from "./ReworkRejectQty"; 
import QCInfo from "./QCInfo";


const InprocessInspectionDetails = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rework");

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className="InprocessInspectionMaster">
      <NavBar toggleSideNav={toggleSideNav} />
      <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

      <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
        <div className="container-fluid p-3">

          <div className="InprocessInspection-card"> 

            {/* TITLE BAR */}
            <div className="InprocessInspection-header d-flex justify-content-between align-items-center mb-3">
              <h4 className="header-title">
                INPROCESS INSPECTION
              </h4>

              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm">Pending List</button>
                <button className="btn btn-primary btn-sm">Insp. List</button>
              </div>
            </div>

           <div className="tab-buttons mb-3">

           <button
           type="button"
          className={`btn btn-sm px-3 ${
      activeTab === "dimensional"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setActiveTab("dimensional")}
  >
    A. Dimensional
  </button>

  <button
    type="button"
    className={`btn btn-sm px-3 ${
      activeTab === "visual"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setActiveTab("visual")}
  >
    B. Visual Inspection
  </button>

  <button
    type="button"
    className={`btn btn-sm px-3 ${
      activeTab === "rework"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setActiveTab("rework")}
  >
    C. Rework & Rej Qty
  </button>

  <button
    type="button"
    className={`btn btn-sm px-3 ${
      activeTab === "qcinfo"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setActiveTab("qcinfo")}
  >
    D. QC Info
  </button>

</div>
          </div>
           {activeTab === "dimensional" && (
           <>
            {/* Input Header Section */}
            <div className="InprocessInspection-Main mb-3">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Test No</th>
                      <th>Test Description</th>
                      <th>Specification</th>
                      <th>Dimensions</th>
                      <th>Tol (-)</th>
                      <th>Tol (+)</th>
                      <th>Method of Check</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>Remark</th>
                      <th>Actual Observations</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className="form-control" placeholder="Enter.." /></td>
                      <td><input className="form-control" placeholder="Enter.." /></td>
                      <td><input className="form-control" placeholder="Enter.." /></td>
                      <td><input className="form-control" placeholder="Enter.." /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><input className="form-control" /></td>
                      <td><button>Add</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid Section */}
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Test No</th>
                    <th>Test Description</th>
                    <th>Specification</th>
                    <th>Dimensions</th>
                    <th>Tol (-)</th>
                    <th>Tol (+)</th>
                    <th>Method of Check</th>
                    <th>M1</th>
                    <th>M2</th>
                    <th>M3</th>
                    <th>M4</th>
                    <th>M5</th>
                    <th>Remark</th>
                    <th>Actual Observations</th>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button className="btn-link text-danger">🗑</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Enable Fields */}
            <div className="enable-field-wrapper text-start">
              <div className="form-check m-0">
                <input className="form-check-input" type="checkbox" id="enableFields" />
                <label className="form-check-label" htmlFor="enableFields">
                  Enable Fields
                </label>
              </div>
            </div>
        </>
      )}  
      {activeTab === "visual" && <VisualInspection />}  
      {activeTab === "rework" && <ReworkRejectQty />}
      {activeTab === "qcinfo" && <QCInfo />}
            </div>
          </main> 
        </div> 
  );
};

export default InprocessInspectionDetails;