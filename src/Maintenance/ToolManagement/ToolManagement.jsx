import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ToolManagement.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ToolManagement = () => {
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

  // Mock Data
  const mockData = [
    { id: 1, itemNo: "ITM001", itemDesc: "Steel Pipe A", partCode: "PC-100", toolCode: "TC-01", toolDesc: "Cutter Blade", make: "In-house", lifePerResharp: 5000, noOfResharp: 5, totalLife: 25000, requiredPieces: 10000 },
    { id: 2, itemNo: "ITM002", itemDesc: "Aluminum Sheet", partCode: "PC-101", toolCode: "TC-02", toolDesc: "Press Die", make: "External", lifePerResharp: 10000, noOfResharp: 3, totalLife: 30000, requiredPieces: 15000 },
    { id: 3, itemNo: "ITM003", itemDesc: "Copper Wire", partCode: "PC-102", toolCode: "TC-03", toolDesc: "Wire Drawer", make: "In-house", lifePerResharp: 8000, noOfResharp: 4, totalLife: 32000, requiredPieces: 20000 },
    { id: 4, itemNo: "ITM004", itemDesc: "Plastic Casing", partCode: "PC-103", toolCode: "TC-04", toolDesc: "Injection Mould", make: "External", lifePerResharp: 50000, noOfResharp: 10, totalLife: 500000, requiredPieces: 100000 },
    { id: 5, itemNo: "ITM005", itemDesc: "Rubber Seal", partCode: "PC-104", toolCode: "TC-05", toolDesc: "Punch Tool", make: "In-house", lifePerResharp: 2000, noOfResharp: 2, totalLife: 4000, requiredPieces: 1000 },
  ];

  return (
    <div className="toolmanagement">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="header-title text-start">
                          Tool Management
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">Mould Life Report</button>
                        <button className="btn d-inline-flex align-items-center gap-2">Tool Report</button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-end mt-2 mb-3">
                      <div className="col-md-2">
                        <label className="form-label mb-1">Item Name:</label>
                        <div className="d-flex">
                          <input type="text" className="form-control" placeholder="Enter Item Code" />
                          <button className="btn ms-1">Search</button>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Part Code:</label>
                        <select className="form-select">
                          <option value=""></option>
                        </select>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Tools :</label>
                        <div className="d-flex">
                          <input type="text" className="form-control" placeholder="Enter Item Code" />
                          <button className="btn ms-1">Search</button>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Tool/Die Life:</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">No. of Resharpening:</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-1">
                        <label className="form-label mb-1">Total Life:</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-1">
                        <button className="btn w-100 d-inline-flex align-items-center justify-content-center">Save</button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Setup Part Code</th>
                          <th>Tool Code</th>
                          <th>Tool Description</th>
                          <th>Make</th>
                          <th>Tool Life/Resharpening</th>
                          <th>No of Resharpening/Tool</th>
                          <th>Total Life</th>
                          <th>Total Required/Pieces</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.itemNo}</td>
                            <td>{data.itemDesc}</td>
                            <td>{data.partCode}</td>
                            <td>{data.toolCode}</td>
                            <td>{data.toolDesc}</td>
                            <td>{data.make}</td>
                            <td>{data.lifePerResharp}</td>
                            <td>{data.noOfResharp}</td>
                            <td>{data.totalLife}</td>
                            <td>{data.requiredPieces}</td>
                            <td>
                              <button className="btn">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
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
};

export default ToolManagement;
