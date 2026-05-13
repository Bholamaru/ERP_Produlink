import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GLLedger.css";
import { FaFileExcel, FaSearch, FaFilePdf } from "react-icons/fa";

const GLLedger = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [glName, setGlName] = useState("");

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

  // Mock data for the ledger table
  const ledgerData = [
    { id: 1, date: "08/05/2026", particular: "Cash Sale", voucherType: "Sales", voucherNo: "S/001", debit: "1500.00", credit: "0.00", balance: "1500.00 Dr" },
    { id: 2, date: "09/05/2026", particular: "Rent Payment", voucherType: "Payment", voucherNo: "P/005", debit: "0.00", credit: "5000.00", balance: "3500.00 Cr" },
  ];

  return (
    <div className="gl-ledger-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

                {/* Header Section */}
                <div className="WorkOrderEntry-header d-flex justify-content-between align-items-center mb-3">
                  <h5 className="header-title mb-0">GL Ledger</h5>
                  <button className="btn">
                    <FaFileExcel className="excel-icon me-1" /> Excel
                  </button>
                </div>

                {/* Filter Bar */}
                <div className="filter-card p-3 mb-3">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-auto">
                      <label className="form-label small fw-bold mb-1">From Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-auto">
                      <label className="form-label small fw-bold mb-1">To Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-auto">
                      <label className="form-label small fw-bold mb-1">GL Name :</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Enter GL Name.."
                        value={glName}
                        onChange={(e) => setGlName(e.target.value)}
                        style={{ minWidth: "200px" }}
                      />
                    </div>
                    <div className="col-md-auto d-flex gap-2">
                      <button className="btn">
                        <FaSearch className="search-icon me-1" /> Search
                      </button>
                      <button className="btn">
                        <FaFileExcel className="excel-icon me-1" /> Export To Excel
                      </button>
                      <button className="btn">
                        <FaFilePdf className="pdf-icon me-1" /> Export To PDF (Summary)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                <div className="table-responsive bg-white rounded shadow-sm">
                  <table className="table table-bordered custom-ledger-table mb-0">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Particular</th>
                        <th>Voucher Type</th>
                        <th>Voucher No</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerData.length > 0 ? (
                        ledgerData.map((row) => (
                          <tr key={row.id}>
                            <td>{row.date}</td>
                            <td className="text-start">{row.particular}</td>
                            <td>{row.voucherType}</td>
                            <td>{row.voucherNo}</td>
                            <td className="text-end">{row.debit}</td>
                            <td className="text-end">{row.credit}</td>
                            <td className="text-end fw-bold">{row.balance}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-muted">No data available for the selected range.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLLedger;
