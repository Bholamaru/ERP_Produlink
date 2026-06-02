import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ProformaInvoiceList.css";
import { Link, useNavigate } from 'react-router-dom';

const ProformaInvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://erp-render.onrender.com/Sales/profoma-invoice/");
      const list = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setInvoices(list);
    } catch (error) {
      console.error("Error fetching proforma invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

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

  return (
    <div className="ProformaInvoiceListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                <div className="ProformaInvoiceList">
                  {/* ===== HEADER ===== */}
                  <div className="ProformaInvoiceList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Proforma Invoice List</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="vndrbtn fw-bold" style={{ color: "green" }}>
                          EXPORT EXCEL
                        </button>
                        <button type="button" className="vndrbtn fw-bold text-primary">
                          <span className="me-1">🌐</span> Proforma Invoice Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ===== FILTERS ===== */}
                  <div className="ProformaInvoiceList-Main">
                    <div className="container-fluid p-0">
                      <div className="row g-2 align-items-end text-start">
                        <div className="col-auto">
                          <label>From Date :</label>
                          <input type="date" className="form-control" defaultValue="2026-04-01" />
                        </div>
                        <div className="col-auto">
                          <label>To Date :</label>
                          <input type="date" className="form-control" defaultValue="2026-05-29" />
                        </div>
                        <div className="col-auto">
                          <label>Series :</label>
                          <select className="form-select">
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="col-auto">
                          <div className="form-check p-0 mb-1 d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkCustName" />
                            <label htmlFor="chkCustName" className="mb-0">Customer Name :</label>
                          </div>
                          <input type="text" className="form-control" placeholder="Customer Name..." />
                        </div>
                        <div className="col-auto">
                          <div className="form-check p-0 mb-1 d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkInvNo" />
                            <label htmlFor="chkInvNo" className="mb-0">Invoice No :</label>
                          </div>
                          <input type="text" className="form-control" placeholder="No." />
                        </div>
                        <div className="col-auto">
                          <div className="form-check p-0 mb-1 d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkItemDesc" />
                            <label htmlFor="chkItemDesc" className="mb-0">Item Code / Description :</label>
                          </div>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-auto">
                          <div className="form-check p-0 mb-1 d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkSONo" />
                            <label htmlFor="chkSONo" className="mb-0">SO No :</label>
                          </div>
                          <input type="text" className="form-control" placeholder="SO No..." />
                        </div>
                        <div className="col-auto">
                          <button type="button" className="vndrbtn pb-1 pt-1" onClick={fetchInvoices}>
                            <span className="me-1">🔍</span> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== TABLE ===== */}
                  <div className="ProformaInvoiceList-Main mt-2 table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Series</th>
                          <th>Type</th>
                          <th>Invoice No</th>
                          <th>Inv. Date</th>
                          <th>Cust PO No</th>
                          <th>Cust Code</th>
                          <th>Customer Name</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="10" className="text-center py-3 text-muted">
                              Loading...
                            </td>
                          </tr>
                        ) : invoices.length > 0 ? (
                          invoices.map((inv, index) => {
                            const [custName, custCode] = (inv.customer || "").split(" | ");
                            const invDate = inv.order_date || "";
                            const year = invDate ? invDate.split("-")[0] : "";
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{year}</td>
                                <td>{inv.series}</td>
                                <td>{inv.type}</td>
                                <td>{inv.invoice_no}</td>
                                <td>{invDate}</td>
                                <td>{inv.items?.[0]?.po_no || inv.select_so}</td>
                                <td>{custCode || ""}</td>
                                <td>{custName || inv.customer}</td>
                                <td>{inv.grand_total}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center py-3 text-muted">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
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

export default ProformaInvoiceList;
