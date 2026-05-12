import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GLMaster.css";
import { FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";

const GLMaster = () => {
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

  // Mock Data from the provided image
  const mockData = [
    { id: 1, glCode: "17", glDesc: "Purchase Servises", glCategory: "General", user: "vishwas" },
    { id: 2, glCode: "16", glDesc: "Services Purchase 18%", glCategory: "Other", user: "vishwas" },
    { id: 3, glCode: "15", glDesc: "Purchase Rm 18%", glCategory: "TCS", user: "vishwas" },
    { id: 4, glCode: "14", glDesc: "Purchase con. 5%", glCategory: "Other", user: "vishwas" },
    { id: 5, glCode: "13", glDesc: "Purchase con. 12%", glCategory: "Other", user: "vishwas" },
    { id: 6, glCode: "12", glDesc: "Purchase con. 18%", glCategory: "General", user: "vishwas" },
    { id: 7, glCode: "11", glDesc: "Purchase Rm 18%", glCategory: "General", user: "vishwas" },
    { id: 8, glCode: "10", glDesc: "Purchase FG 28 %", glCategory: "Other", user: "vishwas" },
    { id: 9, glCode: "1", glDesc: "Purchase Rm 18%", glCategory: "Other", user: "vishwas" },
    { id: 10, glCode: "09", glDesc: "Services Purchase 18%", glCategory: "General", user: "vishwas" },
    { id: 11, glCode: "07", glDesc: "Purchase FG 28 %", glCategory: "Other", user: "vishwas" },
    { id: 12, glCode: "06", glDesc: "Purchase FG 18%", glCategory: "General", user: "vishwas" },
  ];

  return (
    <div className="gl-master">
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
                          General Ledger Master
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel /> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-end mt-2 mb-3">
                      <div className="col-md-3">
                        <label className="form-label mb-1">GL Code :</label>
                        <input type="text" className="form-control" placeholder="Enter GL Code" />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label mb-1">GL Name :</label>
                        <input type="text" className="form-control" placeholder="Enter GL Name" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1">GL Category :</label>
                        <select className="form-select">
                          <option value="General">General</option>
                          <option value="Other">Other</option>
                          <option value="TCS">TCS</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                        <button className="btn w-100">Save</button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>GL Code</th>
                          <th>GL Description</th>
                          <th>GL Category</th>
                          <th>User</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.glCode}</td>
                            <td>{data.glDesc}</td>
                            <td>{data.glCategory}</td>
                            <td>{data.user}</td>
                            <td>
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm">
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

export default GLMaster;
