import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./IndentList.css";
import { getIndentData, deleteIndent } from "../../../Service/StoreApi.jsx";
import * as XLSX from "xlsx";

const IndentList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [indentList, setIndentList] = useState([]);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getIndentData();
      setIndentList(response.data || []);
    } catch (error) {
      console.error("Error fetching indent data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this indent?")) {
      try {
        await deleteIndent(id);
        alert("Indent deleted successfully!");
        fetchData();
      } catch (error) {
        console.error("Error deleting indent:", error);
        alert("Failed to delete indent.");
      }
    }
  };

  const handleExportExcel = () => {
    if (indentList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = indentList.map((item, index) => {
      const year = item.SchDate ? new Date(item.SchDate).getFullYear() : new Date().getFullYear();
      return {
        "Sr no.": index + 1,
        "Year": year,
        "Ind No | Date": `${item.id} | ${item.SchDate || ""}`,
        "Required Delivery": item.SchDate || "",
        "Item No | Desc": `${item.SelectItem || ""} | ${item.Description || ""}`,
        "Ind. Qty": item.Qty || "",
        "MRP Run Date": item.SchDate || "",
        "Autho. Details": item.Remark || "-",
        "Status": "Pending",
        "Supplier": item.Department || "-",
        "User": "-",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Indent List");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Store_Indent_List.xlsx");
  };

  return (
    <div className="NewStoreIndentList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="IndentList-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">Indent List</h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-6 d-flex align-items-end gap-2 justify-content-end">
                          <Link className="pobtn" to="/IndentStatusReport">Indent Status Report</Link>

                          <button className="pobtn" onClick={handleExportExcel}>Export Excel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="IndentList-main">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* Plant */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* From Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Supplier Name"
                            />
                          </div>

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Indent No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Supplier Name"
                            />
                          </div>

                          {/* Type */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Type</label>
                            <select className="form-select">
                              <option value="">Select Type</option>
                              <option value="PurchaseGRN">Purchase GRN</option>
                              <option value="ScheduleGRN">Schedule GRN</option>
                              <option value="ImportGRN">Import GRN</option>
                              <option value="57F4GRN">57F4 GRN</option>
                              <option value="jobworkGRN">jobwork GRN</option>
                              <option value="DC GRN">DC GRN</option>
                              <option value="InterStoreInvoice">
                                Inter Store Invoice
                              </option>
                              <option value="InterStoreChallan">
                                Inter Store Challan
                              </option>
                              <option value="Sales Return">Sales Return</option>
                              <option value="DirectGRN">Direct GRN</option>
                              <option value="General/Document/Courier">
                                General/Document/Courier
                              </option>
                            </select>
                          </div>

                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Status</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>

                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Main Group</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>

                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Item Group</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>

                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">User</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Department</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                          {/* Status */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Direct/MRP</label>
                            <select className="form-select">
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="pobtn w-100">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIndentList">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Ind No | Date</th>
                              <th>Required Delivery</th>
                              <th>Item No | Desc</th>
                              <th>Ind. Qty</th>
                              <th>MRP Run Date</th>
                              <th>Autho. Details</th>
                              <th>Status</th>
                              <th>Supplier</th>
                              <th>User</th>
                              <th>Delete</th>
                              <th>Edit</th>
                              <th>View</th>
                              <th>Doc.</th>
                              <th>Email</th>
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
                            ) : indentList.length === 0 ? (
                              <tr>
                                <td colSpan="16" className="text-center py-3 text-muted fw-bold">No Records Found</td>
                              </tr>
                            ) : (
                              indentList.map((item, index) => {
                                const year = item.SchDate ? new Date(item.SchDate).getFullYear() : new Date().getFullYear();
                                return (
                                  <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{year}</td>
                                    <td>{item.id} | {item.SchDate}</td>
                                    <td>{item.SchDate}</td>
                                    <td>{item.SelectItem} | {item.Description}</td>
                                    <td className="text-right">{item.Qty}</td>
                                    <td>{item.SchDate}</td>
                                    <td>{item.Remark || "-"}</td>
                                    <td className="text-center">
                                      <span className="badge bg-warning text-dark">Pending</span>
                                    </td>
                                    <td>{item.Department || "-"}</td>
                                    <td>-</td>
                                    <td className="text-center">
                                      <button 
                                        className="btn btn-sm btn-danger px-2 py-1"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                    <td className="text-center">
                                      <Link to={`/Newindent/${item.id}`} className="btn btn-sm btn-primary px-2 py-1">
                                        Edit
                                      </Link>
                                    </td>
                                    <td className="text-center">
                                      <Link to={`/Newindent/${item.id}`} className="btn btn-sm btn-info text-white px-2 py-1">
                                        View
                                      </Link>
                                    </td>
                                    <td className="text-center">
                                      <button className="btn btn-sm btn-secondary px-2 py-1">Doc.</button>
                                    </td>
                                    <td className="text-center">
                                      <button className="btn btn-sm btn-outline-primary px-2 py-1">Email</button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
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

export default IndentList;
