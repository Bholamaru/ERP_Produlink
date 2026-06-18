import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TaxInvoiceList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaEye, FaCheck } from "react-icons/fa";
import * as XLSX from "xlsx";

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

  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/Sales/invoice/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setInvoiceList(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setInvoiceList(resData.data);
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (invoiceList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = invoiceList.map((row, index) => {
      const total = calculateInvoiceTotal(row);
      const itemsText = (row.items || []).map(item =>
        `Qty: ${item.inv_qty || 0} Rate: ${item.rate || 0} | ${item.part_code || item.hsn_code || "-"} | ${item.description || "-"}`
      ).join("\n");

      return {
        "SrNo.": index + 1,
        "Year": getYear(row.invoice_no),
        "Invoice No": row.invoice_no || "",
        "Invoice Date": formatDate(row.invoice_Date),
        "Cust PO No": row.items && row.items.length > 0 ? row.items[0].po_no || "-" : "-",
        "Type": "GST",
        "Customer Name": row.bill_to || "",
        "TOTAL": total,
        "Item Qty | Desc": itemsText,
        "Cancel": "N",
        "User": "prakash"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tax Invoices");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Tax_Invoice_List.xlsx");
  };

  const calculateInvoiceTotal = (invoice) => {
    if (!invoice.items || !Array.isArray(invoice.items)) return 0;
    return invoice.items.reduce((acc, item) => acc + ((Number(item.inv_qty) || 0) * (Number(item.rate) || 0)), 0);
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

  const getYear = (invoiceNo) => {
    if (!invoiceNo) return "-";
    if (invoiceNo.length >= 4 && !isNaN(invoiceNo.substring(0, 4))) {
      return `${invoiceNo.substring(0, 2)}-${invoiceNo.substring(2, 4)}`;
    }
    return "-";
  };

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
                              <button className="btn d-inline-flex align-items-center gap-2" style={{ height: "32px" }} onClick={handleExportExcel}>
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
                        {loading ? (
                          <tr>
                            <td colSpan="13" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : invoiceList.length === 0 ? (
                          <tr>
                            <td colSpan="13" className="text-center py-3">No records found</td>
                          </tr>
                        ) : (
                          invoiceList.map((row, index) => {
                            const total = calculateInvoiceTotal(row);
                            return (
                              <tr key={row.id || index}>
                                <td>{index + 1}</td>
                                <td>{getYear(row.invoice_no)}</td>
                                <td><input type="checkbox" /></td>
                                <td className="fw-bold">{row.invoice_no || "-"}</td>
                                <td>{formatDate(row.invoice_Date)}</td>
                                <td>{row.items && row.items.length > 0 ? row.items[0].po_no || "-" : "-"}</td>
                                <td>GST</td>
                                <td className="text-start ps-2">{row.bill_to || "-"}</td>
                                <td className="fw-bold">{total.toFixed(2)}</td>
                                <td className="text-start ps-2" style={{ fontSize: "11px", whiteSpace: "normal" }}>
                                  {row.items && row.items.length > 1 ? (
                                    <span className="text-primary fw-bold">Total Item : {row.items.length}</span>
                                  ) : row.items && row.items.length === 1 ? (
                                    <>
                                      <span className="text-primary-deep fw-bold">Qty: {row.items[0].inv_qty || 0} Rate: {row.items[0].rate || 0}</span>
                                      <span className="text-purple fw-bold mx-1">| {row.items[0].part_code || row.items[0].hsn_code || "-"} |</span>
                                      <span className="text-orange">{row.items[0].description || "-"}</span>
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td><span className="cancel-badge">N</span></td>
                                <td>prakash</td>
                                <td>
                                  <button className="btn border-0 p-1" style={{ background: "transparent" }}>
                                    <FaEye />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border shadow-sm">
                    <div style={{ fontSize: "13px" }}>Total Records : <b>{invoiceList.length}</b></div>
                    <button className="btn btn-success btn-sm d-flex align-items-center gap-2 px-4 shadow-sm">
                      <FaCheck /> Post To A/c
                    </button>
                    <div style={{ fontSize: "13px" }}><b>Total : {invoiceList.reduce((acc, row) => acc + calculateInvoiceTotal(row), 0).toFixed(2)}</b></div>
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
