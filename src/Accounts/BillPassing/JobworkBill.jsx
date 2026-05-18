import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./JobworkBill.css";
import { FaEye, FaCheck, FaPlus, FaTrash, FaFileExcel, FaSearch, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const JobworkBill = () => {
  const navigate = useNavigate();
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

  // Mock Data for Top Table
  const topTableData = [
    { id: 1, year: "26-27", grnNo: "262701696", grnDate: "09/05/2026", type: "Our_F4", vendChNo: "3104", chDate: "09/05/2026", code: "00111", vendor: "VENTURE ENTERPRISES", f4Out: "262700231, 262700040", qtyDesc: "Total Item : 2 ..", user: "Togre" },
    { id: 2, year: "26-27", grnNo: "262701695", grnDate: "09/05/2026", type: "Our_F4", vendChNo: "w91/26-27/243", chDate: "09/05/2026", code: "J/W0064", vendor: "PRANAV COATING", f4Out: "262700978", qtyDesc: "Qty : 2183 | FG1305 | PLFG 1305 END CONNECTOR 50-55\" BL ACK ABS00010", user: "Togre" },
    { id: 3, year: "26-27", grnNo: "262701694", grnDate: "09/05/2026", type: "Our_F4", vendChNo: "086", chDate: "09/05/2026", code: "0000102", vendor: "SHANTAI INDUSTRIES", f4Out: "262700296", qtyDesc: "Qty : 1927 | FG1147 | GR1F G1147 PUSH ROD M/Cyl 2WH Rear", user: "Togre" },
    { id: 4, year: "26-27", grnNo: "262701693", grnDate: "09/05/2026", type: "Our_F4", vendChNo: "041", chDate: "09/05/2026", code: "000097", vendor: "MATOSHRI ENTERPRISES", f4Out: "262701097", qtyDesc: "Qty : 7463 | FG1021 | CNC 1FG1021 WEEL CYLSLOTTED PISTON-", user: "Togre" },
  ];

  return (
    <div className="jobwork-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start">
                          Pending Bill Inward Challan List
                        </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center bg-white">
                          <span className="me-2 small fw-bold">57F4 GRN Auth-Pending Bill :</span>
                          <span className="badge bg-primary">1193</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center bg-white">
                          <span className="me-2 small fw-bold">Bill Passing (JobWork) :</span>
                          <span className="badge bg-primary">1193</span>
                        </div>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="row align-items-end g-3 mb-2">
                      <div className="col-md-1">
                        <label className="form-label mb-1 small fw-bold">Plant :</label>
                        <select className="form-select form-select-sm">
                          <option value="SHARP">SHARP</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold">From Date :</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-05-08" />
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">To Date :</label>
                            <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0">
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">Vendor Name :</label>
                            <input type="text" className="form-control form-control-sm" placeholder="Enter Name ..." />
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0">
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <select className="form-select form-select-sm fw-bold border-bottom-0 rounded-bottom-0 mb-0">
                              <option>57F4 GRN No</option>
                            </select>
                            <input type="text" className="form-control form-control-sm rounded-top-0" placeholder="No..." />
                          </div>
                          <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center px-2 gap-1 mb-0">
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Table */}
                  <div className="table-responsive top-table-container">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>57F4 GRNNo</th>
                          <th>GRN Date</th>
                          <th>57F4Type</th>
                          <th>Vend Ch.No</th>
                          <th>Ch. Date</th>
                          <th>Code</th>
                          <th>Vendor Name</th>
                          <th>f4 out no</th>
                          <th>Item Qty | Desc</th>
                          <th>User</th>
                          <th>Auth1</th>
                          <th>Auth2</th>
                          <th>QC</th>
                          <th>View</th>
                          <th>Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topTableData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.year}</td>
                            <td>{data.grnNo}</td>
                            <td>{data.grnDate}</td>
                            <td>{data.type}</td>
                            <td>{data.vendChNo}</td>
                            <td>{data.chDate}</td>
                            <td>{data.code}</td>
                            <td>{data.vendor}</td>
                            <td>{data.f4Out}</td>
                            <td className="text-start small" style={{ minWidth: '200px' }}>
                              <span className={data.qtyDesc.includes('Qty') ? 'text-warning' : ''}>
                                {data.qtyDesc}
                              </span>
                            </td>
                            <td>{data.user}</td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td>
                              {index % 3 === 0 ? (
                                <div className="badge bg-success p-1"><FaCheck /></div>
                              ) : (
                                <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                              )}
                            </td>
                            <td><FaEye className="text-primary cursor-pointer" /></td>
                            <td>
                              <button className="btn btn-sm">
                                <FaPlus />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Sub Table Section */}
                  <div className="sub-table-header mt-4 mb-2">
                    <h6 className="fw-bold mb-0">List Of GRN for Bill :</h6>
                  </div>
                  <div className="table-responsive bottom-table-container">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>57F4 GRNNo</th>
                          <th>GRN Date</th>
                          <th>57F4 Type</th>
                          <th>Vend Ch.No</th>
                          <th>Ch. Date</th>
                          <th>Code</th>
                          <th>Vendor Name</th>
                          <th>f4 out no</th>
                          <th>Item Qty | Desc</th>
                          <th>User</th>
                          <th>Select</th>
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
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><input type="checkbox" disabled /></td>
                          <td>
                            <button className="btn btn-sm">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Actions */}
                  <div className="footer-actions mt-3 text-end">
                    <button
                      className="btn btn-success d-inline-flex align-items-center gap-2"
                      onClick={() => navigate("/accounts/bill-passing/confirm-gst-bill")}
                    >
                      <FaCheck /> Confirm To GST Bill
                    </button>
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

export default JobworkBill;
