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
                  {/* Top Bar matching BillMaterial style */}
                  <div className="d-flex align-items-center justify-content-between rounded p-1 mb-2 bg-light shadow-sm" style={{ fontSize: "12px" }}>
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 fw-bold text-primary" style={{ fontSize: '14px', marginLeft: '4px' }}>
                        General Ledger Master
                      </h5>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <a href="#" className="text-primary text-decoration-underline fw-bold" style={{ fontSize: '12px' }}>Export Excel</a>
                    </div>
                  </div>

                  {/* Form Section mapped to table layout style */}
                  <div className="w-100 mb-3" style={{ fontSize: '11px', border: '1px solid #d9d9d9', overflow: 'hidden' }}>
                    <table className="table table-bordered mb-0" style={{ width: '100%', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa', color: '#666' }}>
                          <th style={{ padding: '2px 4px', fontWeight: 'normal', width: '25%', borderBottom: 'none' }}>GL Code :</th>
                          <th style={{ padding: '2px 4px', fontWeight: 'normal', width: '35%', borderBottom: 'none' }}>GL Name :</th>
                          <th style={{ padding: '2px 4px', fontWeight: 'normal', width: '25%', borderBottom: 'none' }}>GL Category :</th>
                          <th style={{ padding: '2px 4px', fontWeight: 'normal', width: '15%', borderBottom: 'none' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '2px 4px' }}>
                            <input type="text" className="form-control form-control-sm" placeholder="Enter GL Code" style={{ padding: '1px 4px', fontSize: '11px' }} />
                          </td>
                          <td style={{ padding: '2px 4px' }}>
                            <input type="text" className="form-control form-control-sm" placeholder="Enter GL Name" style={{ padding: '1px 4px', fontSize: '11px' }} />
                          </td>
                          <td style={{ padding: '2px 4px' }}>
                            <select className="form-select form-select-sm" style={{ padding: '1px 4px', fontSize: '11px' }}>
                              <option value="General">General</option>
                              <option value="Other">Other</option>
                              <option value="TCS">TCS</option>
                            </select>
                          </td>
                          <td style={{ padding: '2px 4px' }} className="text-center align-middle">
                            <button className="btn btn-sm btn-light border w-100" style={{ padding: '2px', fontSize: '11px', background: '#e9ecef' }}>
                              SAVE
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive edit-table-wrapper" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-sm text-center align-middle mb-0">
                      <thead className="ps-table-header" style={{ background: 'linear-gradient(to bottom, #4a8bce, #2e6ca4)', color: 'white' }}>
                        <tr>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>Sr. No.</th>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>GL Code</th>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>GL Description</th>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>GL Category</th>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>User</th>
                          <th style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #73a6d8', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>Edit</th>
                          <th style={{ padding: '4px', fontSize: '11px', verticalAlign: 'middle', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((data, index) => (
                          <tr key={data.id}>
                            <td style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #dee2e6' }}>{index + 1}</td>
                            <td style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #dee2e6' }}>{data.glCode}</td>
                            <td style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #dee2e6' }}>{data.glDesc}</td>
                            <td style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #dee2e6' }}>{data.glCategory}</td>
                            <td style={{ padding: '4px', fontSize: '11px', borderRight: '1px solid #dee2e6' }}>{data.user}</td>
                            <td style={{ padding: '4px', borderRight: '1px solid #dee2e6' }}>
                              <button className="btn btn-sm btn-light border p-0 d-flex align-items-center justify-content-center bg-white" style={{ width: '20px', height: '20px', margin: '0 auto' }}>
                                <FaEdit className="text-warning" style={{ fontSize: '11px', filter: 'drop-shadow(1px 1px 0px #000)' }} />
                              </button>
                            </td>
                            <td style={{ padding: '4px', borderRight: '1px solid #dee2e6' }}>
                              <button className="btn btn-sm btn-light border p-0 d-flex align-items-center justify-content-center bg-white" style={{ width: '20px', height: '20px', margin: '0 auto' }}>
                                <FaTrash className="text-secondary" style={{ fontSize: '11px' }} />
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
