import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CreditNoteList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

const CreditNoteList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchCreditNotes();
  }, []);

  const fetchCreditNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/Sales/credit-note/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setCreditNotes(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setCreditNotes(resData.data);
      }
    } catch (error) {
      console.error("Error fetching credit note data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTaxAmount = (row) => {
    return (Number(row.cgst_amt) || 0) + (Number(row.sgst_amt) || 0) + (Number(row.igst_amt) || 0) + (Number(row.utgst_amt) || 0);
  };

  const getGrandTotal = (row) => {
    return Number(row.grand_total) || 0;
  };

  const totalAssessableValue = creditNotes.reduce((acc, row) => {
    const taxAmount = getTaxAmount(row);
    const grandTotal = getGrandTotal(row);
    return acc + (grandTotal - taxAmount);
  }, 0);

  const handleExportExcel = () => {
    if (creditNotes.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = creditNotes.map((row, index) => {
      const taxAmount = getTaxAmount(row);
      const grandTotal = getGrandTotal(row);
      return {
        "Sr. No.": index + 1,
        "Type": row.notetype || "Sales CN",
        "Cert. No": row.credit_note_no || "",
        "Date": formatDate(row.credit_note_date),
        "Name of Party": row.party_name || "",
        "Tax Amount": taxAmount,
        "Amount": grandTotal,
        "User": "prakash"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Credit Notes");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Credit_Note_List.xlsx");
  };

  return (
    <div className="credit-note-list">
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
                          Credit Note List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                           <button className="btn d-inline-flex align-items-center gap-2"><FaFilePdf className="text-danger" /> PDF</button>
                           <button className="btn d-inline-flex align-items-center gap-2 ms-1" onClick={handleExportExcel}><FaFileExcel className="text-success" /> EXCEL</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="d-flex align-items-end gap-3 flex-nowrap mt-2 mb-3">
                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" defaultChecked />
                          <label className="form-label mb-0 fw-bold">From Date :</label>
                        </div>
                        <input type="date" className="form-control" defaultValue="2026-04-08" />
                      </div>

                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <label className="form-label mb-1 fw-bold">To Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-05-09" />
                      </div>

                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <input type="checkbox" />
                          <label className="form-label mb-0 fw-bold">Party Name :</label>
                        </div>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="text" className="form-control" style={{ maxWidth: "400px" }} placeholder="Party Name..." />
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
                          <th style={{ width: "50px" }}>Sr.</th>
                          <th>Type</th>
                          <th>AP <input type="checkbox" /></th>
                          <th>Cert. No</th>
                          <th>Date</th>
                          <th>Name of Party</th>
                          <th>Tax Amount</th>
                          <th>Amount</th>
                          <th>User</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="10" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : creditNotes.length === 0 ? (
                          <tr>
                            <td colSpan="10" className="text-center py-3 text-muted fw-bold">No Records Found</td>
                          </tr>
                        ) : (
                          creditNotes.map((row, index) => {
                            const taxAmount = getTaxAmount(row);
                            const grandTotal = getGrandTotal(row);
                            return (
                              <tr key={row.id || index}>
                                <td>{index + 1}</td>
                                <td>{row.notetype || "Sales CN"}</td>
                                <td><input type="checkbox" /></td>
                                <td>{row.credit_note_no || "-"}</td>
                                <td>{formatDate(row.credit_note_date)}</td>
                                <td className="text-start">{row.party_name || "-"}</td>
                                <td>{taxAmount.toFixed(2)}</td>
                                <td>{grandTotal.toFixed(2)}</td>
                                <td>prakash</td>
                                <td>
                                  <button className="btn btn-sm p-1"><FaEye /></button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-bar shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn d-flex align-items-center gap-2 border">
                         <FaCheck className="text-success" /> Post To A/c
                      </button>
                    </div>
                    
                    <div className="d-flex gap-5" style={{ fontSize: "14px", fontWeight: "bold" }}>
                      <div>Total Records : {creditNotes.length}</div>
                      <div>Assessable Value : {totalAssessableValue.toFixed(2)}</div>
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

export default CreditNoteList;
