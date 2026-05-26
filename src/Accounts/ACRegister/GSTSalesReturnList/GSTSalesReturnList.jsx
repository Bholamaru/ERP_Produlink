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

  const [salesReturns, setSalesReturns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSalesReturns();
  }, []);

  const fetchSalesReturns = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/Sales/Gstsalesretun/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setSalesReturns(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setSalesReturns(resData.data);
      }
    } catch (error) {
      console.error("Error fetching GST sales returns:", error);
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

  const getYear = (invoiceNo) => {
    if (!invoiceNo) return "-";
    // Usually formatted as XX-XX
    if (invoiceNo.length >= 4 && !isNaN(invoiceNo.substring(0, 4))) {
      return `${invoiceNo.substring(0, 2)}-${invoiceNo.substring(2, 4)}`;
    }
    return "-";
  };

  const calculateTotalAmount = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => acc + (Number(item.grand_total) || Number(item.total_amount) || 0), 0);
  };

  const totalOverallAmount = salesReturns.reduce((acc, row) => acc + calculateTotalAmount(row.items), 0);

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
                        {loading ? (
                          <tr>
                            <td colSpan="11" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : salesReturns.length === 0 ? (
                          <tr>
                            <td colSpan="11" className="text-center py-3 text-muted fw-bold">No Records Found</td>
                          </tr>
                        ) : (
                          salesReturns.map((row, index) => {
                            const totalAmount = calculateTotalAmount(row.items);
                            return (
                              <tr key={row.id || index}>
                                <td>{index + 1}</td>
                                <td>{getYear(row.sales_return_no)}</td>
                                <td>{row.series || "GST SALES RETURN"}</td>
                                <td className="text-primary fw-bold">{row.sales_return_no || "-"}</td>
                                <td><input type="checkbox" /></td>
                                <td>{formatDate(row.sales_return_date)}</td>
                                <td className="text-start">{row.cust_name || "-"}</td>
                                <td className="text-start" style={{ fontSize: "12px" }}>
                                  {row.items && row.items.length > 1 ? (
                                    <span className="text-primary fw-bold">Total Item : {row.items.length}</span>
                                  ) : row.items && row.items.length === 1 ? (
                                    <>
                                      <span className="text-primary fw-bold">Rate : {row.items[0].rate || 0}</span>
                                      <span className="text-primary fw-bold mx-1">| Qty : {row.items[0].return_qty || row.items[0].inv_qty || 0}</span>
                                      <span className="text-orange ms-1">| {row.items[0].item_code || "-"} {row.items[0].reason || ""}</span>
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td className="text-end fw-bold">{totalAmount.toFixed(2)}</td>
                                <td>prakash</td>
                                <td>
                                  <button className="view-eye-btn">
                                    <FaEye size={16} />
                                  </button>
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
                    <div className="fw-bold">Total Record : {salesReturns.length}</div>
                    <button className="btn d-flex align-items-center gap-2 border">
                       <FaCheck size={14} className="text-success" /> Post To A/c
                    </button>
                    <div className="fw-bold">Total Amount : {totalOverallAmount.toFixed(2)}</div>
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
