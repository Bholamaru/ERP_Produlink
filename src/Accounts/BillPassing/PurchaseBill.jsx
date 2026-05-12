import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseBill.css";
import { FaEye, FaCheck, FaExclamationTriangle, FaFileExcel, FaSearch, FaCogs } from "react-icons/fa";

const PurchaseBill = () => {
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

  // Mock Data from image
  const mockData = [
    { id: 1, year: "26-27", grnNo: "GRN 262700758", grnDate: "09/05/2026", challanNo: "262700415", challanDate: "09/05/2026", invoiceNo: "262700415", invoiceDate: "09/05/2026", supplier: "SHAKAMBHARI ENTERPRISES", poNo: "262700002", total: "21024", user: "prakash" },
    { id: 2, year: "26-27", grnNo: "GRN 262700757", grnDate: "09/05/2026", challanNo: "190", challanDate: "09/05/2026", invoiceNo: "190", invoiceDate: "09/05/2026", supplier: "Ayush Enterprises (C-242)", poNo: "262700003", total: "9193", user: "Togre" },
    { id: 3, year: "26-27", grnNo: "GRN 262700756", grnDate: "09/05/2026", challanNo: "3048010010691", challanDate: "09/05/2026", invoiceNo: "3048010010691", invoiceDate: "09/05/2026", supplier: "TUBE INVESTMENT OF INDIA LTD", poNo: "262700004", total: "211741.96", user: "prakash" },
    { id: 4, year: "26-27", grnNo: "GRN 262700755", grnDate: "08/05/2026", challanNo: "189", challanDate: "08/05/2026", invoiceNo: "189", invoiceDate: "08/05/2026", supplier: "Ayush Enterprises (C-242)", poNo: "262700003", total: "117373.8", user: "Togre" },
    { id: 5, year: "26-27", grnNo: "GRN 262700754", grnDate: "08/05/2026", challanNo: "262700414", challanDate: "08/05/2026", invoiceNo: "262700414", invoiceDate: "08/05/2026", supplier: "SHAKAMBHARI ENTERPRISES", poNo: "262700002", total: "187240.8", user: "prakash" },
    { id: 6, year: "26-27", grnNo: "GRN 262700753", grnDate: "08/05/2026", challanNo: "3048010010634", challanDate: "08/05/2026", invoiceNo: "3048010010634", invoiceDate: "08/05/2026", supplier: "TUBE INVESTMENT OF INDIA LTD", poNo: "262700004", total: "372489.6", user: "prakash" },
    { id: 7, year: "26-27", grnNo: "GRN 262700752", grnDate: "08/05/2026", challanNo: "3048010010633", challanDate: "08/05/2026", invoiceNo: "3048010010633", invoiceDate: "08/05/2026", supplier: "TUBE INVESTMENT OF INDIA LTD", poNo: "262700004", total: "240019.07", user: "prakash" },
    { id: 8, year: "26-27", grnNo: "GRN 262700751", grnDate: "08/05/2026", challanNo: "262700412", challanDate: "08/05/2026", invoiceNo: "262700412", invoiceDate: "08/05/2026", supplier: "SHAKAMBHARI ENTERPRISES", poNo: "262700002", total: "21432", user: "Togre" },
    { id: 9, year: "26-27", grnNo: "GRN 262700750", grnDate: "08/05/2026", challanNo: "262700413", challanDate: "08/05/2026", invoiceNo: "262700413", invoiceDate: "08/05/2026", supplier: "SHAKAMBHARI ENTERPRISES", poNo: "262700002", total: "73179.3", user: "Togre" },
    { id: 10, year: "26-27", grnNo: "GRN 262700749", grnDate: "08/05/2026", challanNo: "3048010010630", challanDate: "08/05/2026", invoiceNo: "3048010010630", invoiceDate: "08/05/2026", supplier: "TUBE INVESTMENT OF INDIA LTD", poNo: "262700004", total: "239544.94", user: "prakash" },
    { id: 11, year: "26-27", grnNo: "GRN 262700748", grnDate: "08/05/2026", challanNo: "3048010010631", challanDate: "08/05/2026", invoiceNo: "3048010010631", invoiceDate: "08/05/2026", supplier: "TUBE INVESTMENT OF INDIA LTD", poNo: "262700004", total: "172655.35", user: "prakash" },
  ];

  return (
    <div className="purchase-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start">
                          Pending BILL GRN List
                        </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center">
                            <span className="me-2 small">Purchase GRN Auth-Pending Bill :</span>
                            <span className="badge bg-primary">225</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center">
                            <span className="me-2 small">Bill Passing (Purchase) :</span>
                            <span className="badge bg-primary">225</span>
                        </div>
                        <button className="btn d-inline-flex align-items-center gap-2">
                           <FaFileExcel /> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-center g-2">
                      <div className="col-auto d-flex align-items-center gap-3 pe-4">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="poGrn" defaultChecked />
                          <label className="form-check-label fw-bold small" htmlFor="poGrn">PO GRN</label>
                        </div>
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="directGrn" />
                          <label className="form-check-label fw-bold small" htmlFor="directGrn">Direct GRN</label>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 whitespace-nowrap small fw-bold">Plant:</label>
                            <select className="form-select form-select-sm">
                                <option value="SHARP">SHARP</option>
                            </select>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 small fw-bold">From:</label>
                            <input type="date" className="form-control form-control-sm" defaultValue="2026-04-08" />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 small fw-bold">To:</label>
                            <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                        </div>
                      </div>

                      <div className="col-auto d-flex gap-2">
                        <button className="btn btn-primary d-inline-flex align-items-center gap-2 py-1 px-3">
                            <FaSearch /> Search
                        </button>
                        <button className="btn btn-secondary d-inline-flex align-items-center gap-2 py-1 px-3">
                            <FaCogs /> Search Option
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>GRN No.</th>
                          <th>GRN Date</th>
                          <th>Challan No.</th>
                          <th>Challan Date</th>
                          <th>Invoice No.</th>
                          <th>Invoice Date</th>
                          <th>Supplier Name</th>
                          <th>PO No.</th>
                          <th>Total</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Auth1</th>
                          <th>Auth2</th>
                          <th>QC</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.year}</td>
                            <td>{data.grnNo}</td>
                            <td>{data.grnDate}</td>
                            <td>{data.challanNo}</td>
                            <td>{data.challanDate}</td>
                            <td>{data.invoiceNo}</td>
                            <td>{data.invoiceDate}</td>
                            <td>{data.supplier}</td>
                            <td>{data.poNo}</td>
                            <td>{data.total}</td>
                            <td>{data.user}</td>
                            <td><FaEye className="text-primary cursor-pointer" /></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td>
                                {index % 3 === 0 ? 
                                    <div className="badge bg-success p-1"><FaCheck /></div> : 
                                    <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                                }
                            </td>
                            <td><input type="checkbox" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="footer-actions mt-3 text-end">
                    <button className="btn btn-success d-inline-flex align-items-center gap-2">
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

export default PurchaseBill;
