import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./HSNSACSummary.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

const HSNSACSummary = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [type, setType] = useState("Sales");
  const [hsnData, setHsnData] = useState([]);
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
    fetchHsnData();
  }, []);

  const fetchHsnData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/Account/hsn-summary/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setHsnData(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setHsnData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching HSN summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (hsnData.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = hsnData.map((row, index) => ({
      "Sr.": index + 1,
      "HSN/SAC": row.hsn_sac || "",
      "Description": row.description || "",
      "Type Of Supply": row.type_of_supply || "GST Sales",
      "Group": row.group || "FG",
      "UOM": row.uom || "NOS",
      "Total Qty": row.total_qty || 0,
      "Total Amt": row.total_amt || 0,
      "GST %": row.gst_percent || 0,
      "Taxable_Value": row.taxable_value || 0,
      "IGST Amt": row.igst_amt || 0,
      "CGST Amt": row.cgst_amt || 0,
      "SGST Amt": row.sgst_amt || 0,
      "CESS": row.cess || 0,
      "TCS Amt": row.tcs_amt || 0,
      "Total GST Amt": row.total_gst_amt || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HSN Wise Summary");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "HSN_Wise_Summary.xlsx");
  };

  const formatNum = (num) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(num || 0);

  // Dynamic calculation for footer totals
  const totals = hsnData.reduce((acc, curr) => ({
    qty: acc.qty + (Number(curr.total_qty) || 0),
    amt: acc.amt + (Number(curr.total_amt) || 0),
    taxable: acc.taxable + (Number(curr.taxable_value) || 0),
    igst: acc.igst + (Number(curr.igst_amt) || 0),
    cgst: acc.cgst + (Number(curr.cgst_amt) || 0),
    sgst: acc.sgst + (Number(curr.sgst_amt) || 0),
    totalGst: acc.totalGst + (Number(curr.total_gst_amt) || 0)
  }), { qty: 0, amt: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, totalGst: 0 });

  return (
    <div className="hsn-summary">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

                {/* Header Section */}
                <div className="WorkOrderEntry-header mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title text-start">HSN Wise Summary</h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <button className="btn" onClick={handleExportExcel}>
                        <FaFileExcel className="excel-icon me-1" /> Export To Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="header-section mb-3">
                  <div className="d-flex align-items-center flex-wrap gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">From Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">To Date :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ width: "135px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label fw-bold">Type :</label>
                      <select
                        className="form-select form-select-sm"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: "150px" }}
                      >
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <button className="btn">
                      <FaSearch className="search-icon me-1" /> Search
                    </button>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-container">
                  <div className="table-responsive">
                    <table className="custom-table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>HSN/SAC</th>
                          <th>Description</th>
                          <th>Type Of Supply</th>
                          <th>Group</th>
                          <th>UOM</th>
                          <th>Total Qty</th>
                          <th>Total Amt</th>
                          <th>GST %</th>
                          <th>Taxable_Value</th>
                          <th>IGST Amt</th>
                          <th>CGST Amt</th>
                          <th>SGST Amt</th>
                          <th>CESS</th>
                          <th>TCS Amt</th>
                          <th>Total GST Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="16" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : hsnData.length === 0 ? (
                          <tr>
                            <td colSpan="16" className="text-center py-3 text-muted fw-bold">No Records Found</td>
                          </tr>
                        ) : (
                          hsnData.map((row, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td>{row.hsn_sac}</td>
                              <td>{row.description}</td>
                              <td>{row.type_of_supply || "GST Sales"}</td>
                              <td className="text-center">{row.group || "FG"}</td>
                              <td className="text-center">{row.uom || "NOS"}</td>
                              <td className="text-right">{row.total_qty}</td>
                              <td className="text-right">{formatNum(row.total_amt)}</td>
                              <td className="text-center">{row.gst_percent || 0}</td>
                              <td className="text-right">{formatNum(row.taxable_value)}</td>
                              <td className="text-right">{formatNum(row.igst_amt)}</td>
                              <td className="text-right">{formatNum(row.cgst_amt)}</td>
                              <td className="text-right">{formatNum(row.sgst_amt)}</td>
                              <td className="text-center">{formatNum(row.cess)}</td>
                              <td className="text-center">{formatNum(row.tcs_amt)}</td>
                              <td className="text-right">{formatNum(row.total_gst_amt)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      <tfoot className="table-footer-totals">
                        <tr>
                          <td colSpan="6" className="text-start fw-bold">Total Amt :</td>
                          <td className="text-right fw-bold">{totals.qty}</td>
                          <td className="text-right fw-bold">{formatNum(totals.amt)}</td>
                          <td className="text-center"></td>
                          <td className="text-right fw-bold">{formatNum(totals.taxable)}</td>
                          <td className="text-right fw-bold">{formatNum(totals.igst)}</td>
                          <td className="text-right fw-bold">{formatNum(totals.cgst)}</td>
                          <td className="text-right fw-bold">{formatNum(totals.sgst)}</td>
                          <td className="text-center fw-bold">0</td>
                          <td className="text-center fw-bold">0</td>
                          <td className="text-right fw-bold">{formatNum(totals.totalGst)}</td>
                        </tr>
                      </tfoot>
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

export default HSNSACSummary;
