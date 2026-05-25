import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInvoiceList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaTrashAlt } from "react-icons/fa";

const JobworkInvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [jobworkInvoices, setJobworkInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    fetchJobworkInvoices();
  }, []);

  const fetchJobworkInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://erp-render.onrender.com/Sales/gst-jobwork-invoice/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setJobworkInvoices(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setJobworkInvoices(resData.data);
      }
    } catch (error) {
      console.error("Error fetching job-work invoice data:", error);
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

  const calculateTotalQty = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => acc + (Number(item.invoice_qty_nos) || 0) + (Number(item.invoice_qty_kg) || 0), 0);
  };

  const totalAssessableValue = jobworkInvoices.reduce((acc, row) => acc + (Number(row.gst_details?.assessable_value) || 0), 0);
  const totalNetTotal = jobworkInvoices.reduce((acc, row) => acc + (Number(row.gst_details?.gr_total) || 0), 0);


  return (
    <div className="jobwork-invoice-list">
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
                          Job-Work Invoice List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <span style={{ fontSize: "12px", marginRight: "10px" }}>Report :</span>
                        <select className="form-select d-inline-block w-auto me-2" style={{ fontSize: "12px", height: "32px", backgroundColor: "#fffde7" }}>
                          <option>Job-Work Sales Register</option>
                        </select>
                        <button className="btn d-inline-flex align-items-center gap-2"><FaFilePdf className="text-danger" /> PDF</button>
                        <button className="btn d-inline-flex align-items-center gap-2 ms-1"><FaFileExcel className="text-success" /> EXCEL</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="row align-items-end g-2 mt-2 mb-3">
                      <div className="col-md-1">
                        <label className="form-label mb-1">Plant :</label>
                        <select className="form-select">
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1">From Date:</label>
                        <input type="date" className="form-control" defaultValue="2026-05-08" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1 text-nowrap">To Date :</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="date" className="form-control" defaultValue="2026-05-09" />
                           <button className="btn ms-1 text-nowrap d-flex align-items-center gap-1"><FaSearch size={12} /> Search</button>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1">Customer Name :</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="text" className="form-control" placeholder="Name..." />
                           <button className="btn ms-1 text-nowrap d-flex align-items-center gap-1"><FaSearch size={12} /> Search</button>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label mb-1">Invoice No :</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                          <input type="text" className="form-control" placeholder="No" />
                          <button className="btn ms-1 text-nowrap d-flex align-items-center gap-1"><FaSearch size={12} /> Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section - Exact Columns as Image */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>SrNo.</th>
                          <th>Invoice No</th>
                          <th>Date</th>
                          <th>Customer Name</th>
                          <th>Total Qty</th>
                          <th>Assessable Value</th>
                          <th>CGST</th>
                          <th>SGST</th>
                          <th>IGST</th>
                          <th>TCS</th>
                          <th>Net Total</th>
                          <th>User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="12" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : jobworkInvoices.length === 0 ? (
                          <tr>
                            <td colSpan="12" className="text-start py-5 ps-4 text-muted fw-bold">
                              No Data Found !!
                            </td>
                          </tr>
                        ) : (
                          jobworkInvoices.map((row, index) => {
                            const totalQty = calculateTotalQty(row.items);
                            const gst = row.gst_details || {};
                            return (
                              <tr key={row.id || index}>
                                <td>{index + 1}</td>
                                <td className="fw-bold">{row.invoice_no || "-"}</td>
                                <td>{formatDate(row.invoice_date)}</td>
                                <td className="text-start ps-2">{row.bill_to_cust || "-"}</td>
                                <td>{totalQty}</td>
                                <td>{Number(gst.assessable_value || 0).toFixed(2)}</td>
                                <td>{Number(gst.cgst_amt || 0).toFixed(2)}</td>
                                <td>{Number(gst.sgst_amt || 0).toFixed(2)}</td>
                                <td>{Number(gst.igst_amt || 0).toFixed(2)}</td>
                                <td>{Number(gst.tcs_amt || 0).toFixed(2)}</td>
                                <td className="fw-bold">{Number(gst.gr_total || 0).toFixed(2)}</td>
                                <td>prakash</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section - MIRRORING TAX INVOICE LIST */}
                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border">
                    <div>Total Records : <b>{jobworkInvoices.length}</b></div>
                    <button className="btn d-flex align-items-center gap-2">
                       <FaCheck /> Post To A/c
                    </button>
                    <div className="d-flex gap-4">
                      <div><b>Assessable Value : {totalAssessableValue.toFixed(2)}</b></div>
                      <div><b>Net Total : {totalNetTotal.toFixed(2)}</b></div>
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

export default JobworkInvoiceList;
