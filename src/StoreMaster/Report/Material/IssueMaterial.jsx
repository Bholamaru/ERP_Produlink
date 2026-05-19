import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./IssueMaterial.css";
import { FaInfoCircle, FaTrash, FaEye } from "react-icons/fa";

const IssueMaterial = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [materialIssues, setMaterialIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URLs
  const GET_API_URL = "https://erp-render.onrender.com/Store/api/New-Material-Issue/";
  const PDF_API_BASE_URL =
    "https://erp-render.onrender.com/Store/generate-materialissue/";
  const DELETE_API_BASE_URL =
    "https://erp-render.onrender.com/Store/material-challan/delete/"; // New Delete API URL

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(GET_API_URL); // Fetching data from API
      setMaterialIssues(response.data);
      setError(null);
    } catch (err) {
      setError("Error while fetching data. Please check the API server.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Action Functions ---

  // View: Opens the PDF in a new tab
  const handleViewClick = (id) => {
    const pdfUrl = `${PDF_API_BASE_URL}${id}/`;
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  // Delete: Deletes the record using the new API
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // Using the new delete API URL
        await axios.delete(`${DELETE_API_BASE_URL}${id}/`);

        // Remove the deleted item from UI in real-time
        setMaterialIssues(materialIssues.filter((item) => item.id !== id));

        alert("Item deleted successfully!");
      } catch (err) {
        setError("Error while deleting item.");
        console.error("Error deleting item:", err);
      }
    }
  };

  // Info
  const handleInfoClick = (id) => alert(`Info for item ID: ${id}`);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="IssueMaterial">
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
                <div className="IssueMaterial-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Material Issue List
                      </h5>
                    </div>
                    <div className="col-md-9 text-end">
                      <Link className="vndrbtn"> Report</Link>
                      <Link
                        type="button"
                        className="vndrbtn"
                        to="/MaterialQuery"
                      >
                        M-Issue Query
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="IssueMaterial-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* Form Inputs */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search Option
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIssueMaterial">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>M Issue No</th>
                              <th>M Issue Date</th>
                              <th>MRN No</th>
                              <th>WO No</th>
                              <th>Emp Operator | Dept</th>
                              <th>Item | Desc | Qty</th>
                              <th>User</th>
                              <th>Info</th>
                              <th>Del</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="13" className="text-center">
                                  Loading...
                                </td>
                              </tr>
                            ) : error ? (
                              <tr>
                                <td
                                  colSpan="13"
                                  className="text-center text-danger"
                                >
                                  {error}
                                </td>
                              </tr>
                            ) : (
                              materialIssues.map((issue, index) => (
                                <tr key={issue.id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {new Date(
                                      issue.MaterialIssueDate
                                    ).getFullYear()}
                                  </td>
                                  <td>{issue.Plant || "Produlink"}</td>
                                  <td>{issue.ChallanNo}</td>
                                  <td>
                                    {issue.MaterialIssueDate ? issue.MaterialIssueDate : "N/A"}  <br/>
                                    {issue.MaterialIssueTime ? ` ${issue.MaterialIssueTime}` : ""}
                                  </td>
                                  <td>{issue.MaterialChallanTable?.[0]?.MrnNo || " "}</td>                                
                                  <td>{"N/A"}</td>
                                  <td>{`${
                                    issue.MaterialChallanTable?.[0]?.Employee ||
                                    "N/A"
                                  } | ${
                                    issue.MaterialChallanTable?.[0]?.Dept ||
                                    "N/A"
                                  }`}</td>
                                  <td>{`${issue.Item || "N/A"} | ${
                                    issue.MaterialChallanTable?.[0]
                                      ?.ItemDescription || "N/A"
                                  } | ${
                                    issue.MaterialChallanTable?.[0]?.Qty ||
                                    "N/A"
                                  }`}</td>
                                  <td>{"N/A"}</td>
                                  <td className="text-center">
                                    <button
                                      className="btn btn-sm btn-info"
                                      onClick={() => handleInfoClick(issue.id)}
                                    >
                                      <FaInfoCircle />
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={() => handleDelete(issue.id)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      className="btn btn-sm btn-secondary"
                                      onClick={() => handleViewClick(issue.id)}
                                    >
                                      <FaEye />
                                    </button>
                                  </td>
                                </tr>
                              ))
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

export default IssueMaterial;
