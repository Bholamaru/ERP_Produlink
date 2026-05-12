import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DebitNoteList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaEye } from "react-icons/fa";

const DebitNoteList = () => {
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
    { sr: 1, type: "Purchase DN", certNo: "262700011", date: "08/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "20367", amount: "133517", user: "prakash" },
    { sr: 2, type: "Purchase DN", certNo: "262700010", date: "08/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "209.24", amount: "1371.74", user: "prakash" },
    { sr: 3, type: "Purchase DN", certNo: "262700009", date: "07/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "279", amount: "1829", user: "prakash" },
    { sr: 4, type: "Purchase DN", certNo: "262700008", date: "07/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "194.4", amount: "1274.4", user: "prakash" },
    { sr: 5, type: "Purchase DN", certNo: "262700007", date: "04/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "143.1", amount: "938.1", user: "prakash" },
    { sr: 6, type: "Purchase DN", certNo: "262700006", date: "02/05/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "214.64", amount: "1407.14", user: "Togre" },
    { sr: 7, type: "Purchase DN", certNo: "262700005", date: "30/04/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "279", amount: "1829", user: "Togre" },
    { sr: 8, type: "Purchase DN", certNo: "262700004", date: "23/04/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "139.5", amount: "914.5", user: "Togre" },
    { sr: 9, type: "Purchase DN", certNo: "262700003", date: "23/04/2026", party: "VISHWA SAMRUDHI INDUSTRIES", tax: "142.2", amount: "932.2", user: "Togre" },
  ];

  return (
    <div className="debit-note-list">
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
                          Debit Note List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                          <span style={{ fontSize: "12px", fontWeight: "bold" }}>Debite Note Register</span>
                          <button className="btn d-inline-flex align-items-center gap-2"><FaFilePdf className="text-danger" /> PDF</button>
                          <button className="btn d-inline-flex align-items-center gap-2 ms-1"><FaFileExcel className="text-success" /> EXCEL</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="row align-items-end g-3 mt-2 mb-3">
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" defaultChecked />
                          <label className="form-label mb-0 fw-bold">From Date :</label>
                        </div>
                        <input type="date" className="form-control" defaultValue="2026-04-08" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold">To Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-05-09" />
                      </div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" />
                          <label className="form-label mb-0 fw-bold">Party Name :</label>
                        </div>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                          <input type="text" className="form-control" placeholder="Party Name..." />
                          <button className="btn ms-1 text-nowrap d-flex align-items-center gap-2">
                            <FaSearch size={12} /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Type</th>
                          <th>AP <input type="checkbox" defaultChecked /></th>
                          <th>Cert. No</th>
                          <th>Date</th>
                          <th>Name of Party</th>
                          <th className="text-end">Tax Amount</th>
                          <th className="text-end">Amount</th>
                          <th>User</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sr}</td>
                            <td>{row.type}</td>
                            <td><input type="checkbox" /></td>
                            <td>{row.certNo}</td>
                            <td>{row.date}</td>
                            <td className="text-start">{row.party}</td>
                            <td className="text-end">{row.tax}</td>
                            <td className="text-end">{row.amount}</td>
                            <td>{row.user}</td>
                            <td>
                              <button className="btn btn-sm p-1"><FaEye /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn d-flex align-items-center gap-2 border">
                        <FaCheck className="text-success" /> Post To A/c
                      </button>
                    </div>

                    <div className="d-flex gap-5" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      <div>Total Records : 9</div>
                      <div>Assessable Value : 144013.08</div>
                    </div>
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

export default DebitNoteList;
