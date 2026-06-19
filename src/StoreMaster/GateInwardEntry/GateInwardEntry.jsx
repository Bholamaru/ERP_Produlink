import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./GateInwardEntry.css";
import { getgateInward, deleteGateInward } from "../../Service/StoreApi.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";

const GateInwardEntry = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [gateInwardData, setGateInwardData] = useState([]);
  const [grnDataMap, setGrnDataMap] = useState({});

  useEffect(() => {
    fetchGateInward();
    fetchGrnData();
  }, []);

 const fetchGateInward = async () => {
    const data = await getgateInward();
    setGateInwardData(data.sort((a, b) => b.id - a.id));
  };

  const fetchGrnData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch("http://127.0.0.1:8000/Store/gate-entry-wise-grn-data/", { headers });
      const json = await response.json();
      if (json.status && Array.isArray(json.results)) {
        const map = {};
        json.results.forEach((entry) => {
          if (entry.GateEntryNo && Array.isArray(entry.data) && entry.data.length > 0) {
            map[entry.GateEntryNo] = {
              GrnNo: entry.data[0].GrnNo || "-",
              GrnDate: entry.data[0].GrnDate || "-",
            };
          }
        });
        setGrnDataMap(map);
      }
    } catch (error) {
      console.error("Error fetching GRN data:", error);
    }
  };

  // --- DELETE FUNCTIONALITY ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteGateInward(id);
        if (response.status === 204 || response.status === 200) {
          alert("Entry Deleted Successfully");
          setGateInwardData(gateInwardData.filter((item) => item.id !== id));
        } else {
          alert("Failed to delete entry");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    }
  };

  const handleExportExcel = () => {
    if (gateInwardData.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = gateInwardData.map((item, index) => ({
      "Sr no.": index + 1,
      "Year": item.GE_Date ? new Date(item.GE_Date).getFullYear() : "",
      "Plant": item.Plant || "",
      "Entry No": item.GE_No || "",
      "Entry Date": item.GE_Date || "",
      "Entry Time": item.GE_Time || "",
      "Type": item.Type || "",
      "Custo/Supplier Name": item.Supp_Cust || "",
      "Challan No": item.ChallanNo || "",
      "Challan Date": item.ChallanDate || "",
      "Invoice No": item.InVoiceNo || "",
      "Invoice Date": item.Invoicedate || "",
      "Ref Doc No": grnDataMap[item.GE_No]?.GrnNo || "-",
      "Ref Doc Date": grnDataMap[item.GE_No]?.GrnDate || "-",
      "User": item.User || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gate Inward Register");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Gate_Inward_Register.xlsx");
  };

  return (
    <div className="NewStoreGateInward1">
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
                <div className="GateInward1-header  mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title">
                        Gate Entry Inward Register
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <Link className="btn" to={"/New-Gate-Entry"}>
                        New Gate Entry
                      </Link>

                      <Link className="btn">Gate Inward Material Reg</Link>

                      <button className="btn" onClick={handleExportExcel}>Export Excel</button>

                      <Link className="btn">Gate Entry Inward - Query</Link>
                    </div>
                  </div>
                </div>
                <div className="GateInward-main1 mt-5">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
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

                          {/* Plant */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
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

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Supplier Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Supplier Name"
                            />
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Name"
                            />
                          </div>

                          {/* Gate Entry No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Gate Entry No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Gate Entry No."
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-5 align-self-end">
                            <button type="submit" className="pobtn">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreGateInward1">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>Entry No</th>
                              <th>Entry Date</th>
                              <th>Entry Time</th>
                              <th>Type</th>
                              <th>Custo/Supplier Name</th>
                              <th>Challan No</th>
                              <th>Challan Date</th>
                              <th>Invoice No</th>
                              <th>Invoice Date</th>
                              <th>Ref Doc No</th>
                              <th>Ref Doc Date</th>
                              <th>User</th>
                              <th>Edit</th>
                              <th>View</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gateInwardData
                              .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                              )
                              .map((item, index) => (
                                <tr key={item.id}>
                                  <td>
                                    {(currentPage - 1) * itemsPerPage +
                                      index +
                                      1}
                                  </td>

                                  <td>
                                    {new Date(item.GE_Date).getFullYear()}
                                  </td>
                                  <td>{item.Plant}</td>
                                  <td>{item.GE_No}</td>
                                  <td>{item.GE_Date}</td>
                                  <td>{item.GE_Time}</td>
                                  <td>{item.Type}</td>
                                  <td>{item.Supp_Cust}</td>
                                  <td>{item.ChallanNo}</td>
                                  <td>{item.ChallanDate}</td>
                                  <td>{item.InVoiceNo}</td>
                                  <td>{item.Invoicedate}</td>
                                  <td>{grnDataMap[item.GE_No]?.GrnNo || "-"}</td>
                                  <td>{grnDataMap[item.GE_No]?.GrnDate || "-"}</td>

                                  <td>{item.User || "-"}</td>

                                  <td>
                                    <Link
                                      to={`/New-Gate-Entry/${item.id}`}
                                      className="btn btn-sm btn-warning"
                                    >
                                      <FaEdit />
                                    </Link>
                                  </td>

                                  <td>
                                    <a
                                      href={`http://127.0.0.1:8000/${item.View}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-sm btn-primary"
                                    >
                                      View
                                    </a>
                                  </td>

                                 
                                  <td>
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>

                        <span>
                          Page {currentPage} of{" "}
                          {Math.ceil(gateInwardData.length / itemsPerPage)}
                        </span>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              prev <
                              Math.ceil(gateInwardData.length / itemsPerPage)
                                ? prev + 1
                                : prev
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(gateInwardData.length / itemsPerPage)
                          }
                        >
                          Next
                        </button>
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

export default GateInwardEntry;
