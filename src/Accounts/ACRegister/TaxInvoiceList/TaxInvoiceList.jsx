import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TaxInvoiceList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaEye, FaCheck } from "react-icons/fa";

const TaxInvoiceList = () => {
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

  const mockData = [
    { srNo: 1, year: "26-27", invoiceNo: "262703067", date: "09/05/2026", poNo: "1900004259", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "10170.65", details: { qty: "750", rate: "11.550000", code: "FG1047", desc: "S2DP03802B, EXTENSION-K11 GDC," }, user: "prakash" },
    { srNo: 2, year: "26-27", invoiceNo: "262703066", date: "09/05/2026", poNo: "1900005296", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "7267.38", details: { qty: "1575", rate: "3.930000", code: "FG1409", desc: "530LZ00602, SPACER (JZ & JL)," }, user: "prakash" },
    { srNo: 3, year: "26-27", invoiceNo: "262703065", date: "09/05/2026", poNo: "1900006351", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (F)", total: "85191.76", details: { qty: "3920", rate: "18.510000", code: "FG1263", desc: "F2BZ05712B, CAP OIL LOCK J1D FF (10 mm taper)," }, user: "prakash" },
    { srNo: 4, year: "26-27", invoiceNo: "262703064", date: "09/05/2026", poNo: "1900004244", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (F)", total: "10577.47", details: { qty: "1155", rate: "7.800000", code: "FG1084", desc: "520BZ00102, CAP OIL LOCK-LML," }, user: "prakash" },
    { srNo: 5, year: "26-27", invoiceNo: "262703063", date: "09/05/2026", poNo: "1900006046", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "52777.44", details: { qty: "3060", rate: "14.690000", code: "FG1572", desc: "S2CW05007B, D NUT," }, user: "prakash" },
    { srNo: 6, year: "26-27", invoiceNo: "262703062", date: "09/05/2026", poNo: "1900004259", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "20311.94", details: { qty: "2000", rate: "8.650000", code: "FG1040", desc: "S2DP04702B, EXTENSION -K10[20X34.5]," }, user: "prakash" },
    { srNo: 7, year: "26-27", invoiceNo: "262703061", date: "09/05/2026", poNo: "1900005296", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "9533.7", details: { qty: "1000", rate: "8.120000", code: "FG1234", desc: "S2DP07202B, EXTENSION K3 NEW," }, user: "prakash" },
    { srNo: 8, year: "26-27", invoiceNo: "262703060", date: "09/05/2026", poNo: "1900004248", type: "GST", customer: "ENDURANCE TECHNOLOGIES LTD (I)", total: "32961.91", details: { isTotal: true, text: "Total Item : 2" }, user: "prakash" },
  ];

  return (
    <div className="tax-invoice-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Actions - Added proper gaps and spacing */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title text-start mb-0">
                          Tax Invoice List
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <div className="d-inline-flex align-items-center gap-3">
                          <div className="d-inline-flex align-items-center">
                            <span style={{ fontSize: "12px", marginRight: "10px" }}>(GST) Sales Register</span>
                            <select className="form-select d-inline-block w-auto" style={{ fontSize: "12px", height: "32px" }}>
                              <option>Format 1 (Invoice Wise)</option>
                            </select>
                          </div>

                          <select className="form-select d-inline-block w-auto" style={{ fontSize: "12px", height: "32px" }}>
                            <option>PDF</option>
                          </select>

                          <button className="btn d-inline-flex align-items-center gap-2" style={{ height: "32px" }}>
                            <FaSearch size={14} /> <span style={{ whiteSpace: "nowrap" }}>Execute</span>
                          </button>

                          <div className="d-inline-flex align-items-center">
                            <span style={{ fontSize: "12px", marginRight: "10px" }}>(Excise) Sales Register</span>
                            <div className="d-inline-flex gap-2">
                              <button className="btn d-inline-flex align-items-center gap-2" style={{ height: "32px" }}>
                                <FaFilePdf className="text-danger" /> <span style={{ whiteSpace: "nowrap" }}>PDF</span>
                              </button>
                              <button className="btn d-inline-flex align-items-center gap-2" style={{ height: "32px" }}>
                                <FaFileExcel className="text-success" /> <span style={{ whiteSpace: "nowrap" }}>EXCEL</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Fixed Search buttons in one line */}
                  <div className="header-section mb-4">
                    <div className="row align-items-end g-3 mt-1 mb-2">
                      <div className="col-md-2">
                        <label className="form-label mb-1">Invoice Type:</label>
                        <select className="form-select form-select-sm">
                          <option>Domestic</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">From Date:</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-05-08" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">To Date:</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Customer Name:</label>
                        <div className="d-flex align-items-center gap-1">
                          <input type="checkbox" className="form-check-input mt-0" />
                          <input type="text" className="form-control form-control-sm" placeholder="Customer Name..." />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Select Item:</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                          <input type="checkbox" className="form-check-input mt-0" />
                          <input type="text" className="form-control form-control-sm" placeholder="Item Name..." />
                          <button className="btn btn-sm d-inline-flex align-items-center gap-1 border" style={{ whiteSpace: "nowrap" }}>
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">Invoice No :</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                          <input type="text" className="form-control form-control-sm" placeholder="No" />
                          <button className="btn btn-sm d-inline-flex align-items-center gap-1 border" style={{ whiteSpace: "nowrap" }}>
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>SrNo.</th>
                          <th style={{ width: "60px" }}>Year</th>
                          <th style={{ width: "60px" }}>AP <input type="checkbox" /></th>
                          <th style={{ width: "100px" }}>Invoice No</th>
                          <th style={{ width: "100px" }}>Invoice Date</th>
                          <th style={{ width: "120px" }}>Cust PO No</th>
                          <th style={{ width: "60px" }}>Type</th>
                          <th>Customer Name</th>
                          <th style={{ width: "120px" }}>TOTAL</th>
                          <th style={{ width: "420px" }}>Item Qty | Desc</th>
                          <th style={{ width: "60px" }}>Cancel</th>
                          <th style={{ width: "80px" }}>User</th>
                          <th style={{ width: "60px" }}>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.srNo}</td>
                            <td>{row.year}</td>
                            <td><input type="checkbox" /></td>
                            <td className="fw-bold">{row.invoiceNo}</td>
                            <td>{row.date}</td>
                            <td>{row.poNo}</td>
                            <td>{row.type}</td>
                            <td className="text-start ps-2">{row.customer}</td>
                            <td className="fw-bold">{row.total}</td>
                            <td className="text-start ps-2" style={{ fontSize: "11px", whiteSpace: "normal" }}>
                              {row.details.isTotal ? (
                                <span className="text-primary fw-bold">{row.details.text}</span>
                              ) : (
                                <>
                                  <span className="text-primary-deep fw-bold">Qty: {row.details.qty} Rate: {row.details.rate}</span>
                                  <span className="text-purple fw-bold mx-1">| {row.details.code} |</span>
                                  <span className="text-orange">{row.details.desc}</span>
                                </>
                              )}
                            </td>
                            <td><span className="cancel-badge">N</span></td>
                            <td>{row.user}</td>
                            <td>
                              <button className="btn border-0 p-1" style={{ background: "transparent" }}>
                                <FaEye />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border shadow-sm">
                    <div style={{ fontSize: "13px" }}>Total Records : <b>102</b></div>
                    <button className="btn btn-success btn-sm d-flex align-items-center gap-2 px-4 shadow-sm">
                      <FaCheck /> Post To A/c
                    </button>
                    <div style={{ fontSize: "13px" }}><b>Total : 3877334.23</b></div>
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

export default TaxInvoiceList;
