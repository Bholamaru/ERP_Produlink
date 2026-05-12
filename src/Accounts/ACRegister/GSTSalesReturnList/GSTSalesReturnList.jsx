import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTSalesReturnList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaEye } from "react-icons/fa";

const GSTSalesReturnList = () => {
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
    { sr: 1, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700020", ap: false, date: "30/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (H)", itemDetails: "Rate : 19.58 | Qty : 2574 | FG1152 FORK BOLT PRFH-006", amount: "59173.37", user: "Togre" },
    { sr: 2, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700019", ap: false, date: "30/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 22.39 | Qty : 140 | FG1073 TAP REBOUND SPLIT", amount: "3680.33", user: "Togre" },
    { sr: 3, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700018", ap: false, date: "30/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 22.39 | Qty : 300 | FG1073 TAP REBOUND SPLIT", amount: "7886.44", user: "Togre" },
    { sr: 4, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700017", ap: false, date: "30/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 8.27 | Qty : 246 | FG1313 LOCK NUT - Ø31 SPD", amount: "2388.61", user: "Togre" },
    { sr: 5, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700016", ap: false, date: "27/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 12.59 | Qty : 500 | FG1155 NUT REBOUND (MY-17)", amount: "7390.96", user: "prakash" },
    { sr: 6, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700015", ap: false, date: "27/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 8.27 | Qty : 1856 | FG1313 LOCK NUT - Ø31 SPD", amount: "18021.39", user: "prakash" },
    { sr: 7, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700014", ap: false, date: "27/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 8.27 | Qty : 1694 | FG1313 LOCK NUT - Ø31 SPD", amount: "16448.41", user: "prakash" },
    { sr: 8, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700013", ap: false, date: "23/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 7.20 | Qty : 82 | FG1500 EXTENSION B106C", amount: "693.19", user: "Togre" },
    { sr: 9, year: "26-27", series: "GST SALES RETURN", no: "GSR 262700012", ap: false, date: "23/04/2026", party: "ENDURANCE TECHNOLOGIES LTD (I)", itemDetails: "Rate : 7.20 | Qty : 2000 | FG1500 EXTENSION B106C", amount: "16907.04", user: "Togre" },
  ];

  return (
    <div className="gst-sales-return-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          GST Sales Return List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                           <span style={{ fontSize: "12px", fontWeight: "bold" }}>(GST) Sales Return List</span>
                           <button className="btn d-inline-flex align-items-center gap-2"><FaFilePdf className="text-danger" /> PDF</button>
                           <button className="btn d-inline-flex align-items-center gap-2 ms-1"><FaFileExcel className="text-success" /> EXCEL</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="d-flex align-items-center gap-3 flex-nowrap mt-1 mb-2">
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" defaultChecked />
                        <label className="form-label mb-0 fw-bold">From Date :</label>
                        <input type="date" className="form-control" style={{ width: "135px" }} defaultValue="2026-04-08" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="form-label mb-0 fw-bold">To Date :</label>
                        <input type="date" className="form-control" style={{ width: "135px" }} defaultValue="2026-05-09" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" />
                        <label className="form-label mb-0 fw-bold">Party Name :</label>
                        <input type="text" className="form-control" placeholder="Party Name..." style={{ width: "200px" }} />
                      </div>
                      <div className="d-flex align-items-center gap-1 flex-grow-1">
                        <input type="checkbox" />
                        <label className="form-label mb-0 fw-bold">Item :</label>
                        <input type="text" className="form-control" style={{ maxWidth: "400px" }} />
                        <button className="btn d-flex align-items-center gap-2 ms-1 text-nowrap">
                          <FaSearch size={12} /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr.</th>
                          <th style={{ width: "70px" }}>Year</th>
                          <th style={{ width: "180px" }}>Series</th>
                          <th style={{ width: "150px" }}>No.</th>
                          <th style={{ width: "60px" }}>AP <input type="checkbox" /></th>
                          <th style={{ width: "110px" }}>Date</th>
                          <th style={{ width: "300px" }}>Name of Party</th>
                          <th>Item Qty | Desc</th>
                          <th style={{ width: "120px" }}>Amount</th>
                          <th style={{ width: "100px" }}>User</th>
                          <th style={{ width: "60px" }}>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sr}</td>
                            <td>{row.year}</td>
                            <td>{row.series}</td>
                            <td className="text-primary fw-bold">{row.no}</td>
                            <td><input type="checkbox" checked={row.ap} readOnly /></td>
                            <td>{row.date}</td>
                            <td className="text-start">{row.party}</td>
                            <td className="text-start" style={{ fontSize: "12px" }}>
                              {row.itemDetails.split('|').map((part, i) => {
                                if (i === 0) return <span key={i} className="text-primary fw-bold">{part}</span>;
                                if (i === 1) return <span key={i} className="text-primary fw-bold mx-1">| {part}</span>;
                                return <span key={i} className="text-orange ms-1">| {part}</span>;
                              })}
                            </td>
                            <td className="text-end fw-bold">{row.amount}</td>
                            <td>{row.user}</td>
                            <td>
                              <button className="view-eye-btn">
                                <FaEye size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-bar shadow-sm">
                    <div className="fw-bold">Total Record : 18</div>
                    <button className="btn d-flex align-items-center gap-2 border">
                       <FaCheck size={14} className="text-success" /> Post To A/c
                    </button>
                    <div className="fw-bold">Total Amount : 169608.2</div>
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

export default GSTSalesReturnList;
