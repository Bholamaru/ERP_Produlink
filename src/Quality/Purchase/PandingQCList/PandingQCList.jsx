import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PandingQCList.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

import axios from "axios";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const PandingQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [plant, setPlant] = useState("SHARP");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [mainGroup, setMainGroup] = useState("Select");
  const [itemGroup, setItemGroup] = useState("ALL");
  const [supplierName, setSupplierName] = useState("");
  const [itemNoDesc, setItemNoDesc] = useState("");
  const [poNo, setPoNo] = useState("");
  const [grnNo, setGrnNo] = useState("");

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (plant) params.plant = plant;
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (mainGroup && mainGroup !== "Select") params.main_group = mainGroup;
      if (itemGroup && itemGroup !== "ALL") params.item_group = itemGroup;
      if (supplierName) params.supplier_name = supplierName;
      if (itemNoDesc) params.item_no_desc = itemNoDesc;
      if (poNo) params.po_no = poNo;
      if (grnNo) params.grn_no = grnNo;

      const resp = await axios.get("http://127.0.0.1:8000/Quality/purchase-pending-qc/", { params });
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setQcList(data);
    } catch (error) {
      console.error("Error fetching purchase pending QC:", error);
      setQcList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (qcList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = qcList.map((row, index) => ({
      "Sr No": index + 1,
      "Year": row.Year || (row.ReturnDate ? new Date(row.ReturnDate).getFullYear().toString().slice(-2) : "24-25"),
      "Plant": row.Plant || "SHARP",
      "Return No": row.ReturnNo || row.return_no || "",
      "Return Date": row.ReturnDate || row.return_date || "",
      "Customer Name": row.CustomerName || row.cust_name || "",
      "Item Code": row.ItemCode || row.item_code || "",
      "Item Desc": row.ItemDesc || row.item_desc || "",
      "Return Qty": row.ReturnQty || row.return_qty || 0,
      "User": row.User || row.username || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase GRN Pending QC List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Purchase_GRN_Pending_QC_List.xlsx");
  };

  return (
    <div className="PandingQCListMaster">
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
                <div className="PandingQCList mt-5">
                  <div className="PandingQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> <span className="purch">Purchase GRN : </span> Pending QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleExportExcel}>
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="PandingQCList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant :</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="SHARP">SHARP</option>
                            <option value="DI">DI</option>
                          </select>
                        </div>

                        {/* From Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Main Group :</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} value={mainGroup} onChange={(e) => setMainGroup(e.target.value)}>
                            <option value="Select">Select</option>
                            <option value="FG">FG</option>
                            <option value="RM">RM</option>
                            <option value="Tools">Tools</option>
                            <option value="Instrument">Instrument</option>
                            <option value="Machine">Machine</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Safety Equ">Safety Equ</option>
                            <option value="Service">Service</option>
                            <option value="Asset">Asset</option>
                            <option value="F4">F4</option>
                            <option value="Scrap">Scrap</option>
                            <option value="SF">SF</option>
                            <option value="BO">BO</option>
                            <option value="DI">DI</option>
                          </select>
                        </div>

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item Group:</label>
                          <select className="form-control" style={{ marginTop: "-1px" }} value={itemGroup} onChange={(e) => setItemGroup(e.target.value)}>
                            <option value="ALL">ALL</option>
                            <option value="BEARING">BEARING</option>
                            <option value="BELTS">BELTS</option>
                            <option value="CAMS">CAMS</option>
                            <option value="COLLECTS & HOLDERS">COLLECTS & HOLDERS</option>
                            <option value="COMPUTER">COMPUTER</option>
                            <option value="CUTTING TOOLS">CUTTING TOOLS</option>
                            <option value="ELECTRICAL PARTS">ELECTRICAL PARTS</option>
                            <option value="END PIECE">END PIECE</option>
                            <option value="FIXCTURE">FIXCTURE</option>
                            <option value="FORMING TOOLS">FORMING TOOLS</option>
                            <option value="GAUGES & INSTUMENTS">GAUGES & INSTUMENTS</option>
                            <option value="GENRAL">GENRAL</option>
                            <option value="HOLDERS">HOLDERS</option>
                            <option value="INSERTS">INSERTS</option>
                            <option value="IT SUPPORTS">IT SUPPORTS</option>
                            <option value="MACHINE SPARE">MACHINE SPARE</option>
                            <option value="MACHINING">MACHINING</option>
                            <option value="OIL & LUBRICANTS">OIL & LUBRICANTS</option>
                            <option value="PACKING">PACKING</option>
                            <option value="SERVICES">SERVICES</option>
                            <option value="STATIONARY">STATIONARY</option>
                            <option value="TOOLING SPARE">TOOLING SPARE</option>
                          </select>
                        </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Supplier Name:</label>
                          <input type="text" placeholder="Name..." className="form-control" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item No Desc:</label>
                          <input type="text" placeholder="Item..." className="form-control" value={itemNoDesc} onChange={(e) => setItemNoDesc(e.target.value)} />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>PO No:</label>
                          <input type="text" placeholder="PO No..." className="form-control" value={poNo} onChange={(e) => setPoNo(e.target.value)} />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>GRN No:</label>
                          <input type="text" placeholder="GRN No..." className="form-control" value={grnNo} onChange={(e) => setGrnNo(e.target.value)} />
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                          <button type="button" className="btn btn-primary w-100" onClick={handleSearch}>
                            Search
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Return No</th>
                          <th scope="col">Return Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Return Qty</th>
                          <th scope="col">User</th>
                          <th scope="col">QC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="11" className="text-center">Loading...</td>
                          </tr>
                        ) : qcList.length === 0 ? (
                          <tr>
                            <td colSpan="11" className="text-center">No records found</td>
                          </tr>
                        ) : (
                          qcList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.Year || (row.ReturnDate ? new Date(row.ReturnDate).getFullYear().toString().slice(-2) : "24-25")}</td>
                              <td>{row.Plant || "SHARP"}</td>
                              <td>{row.ReturnNo || row.return_no || ""}</td>
                              <td>{row.ReturnDate || row.return_date || ""}</td>
                              <td>{row.CustomerName || row.cust_name || ""}</td>
                              <td>{row.ItemCode || row.item_code || ""}</td>
                              <td>{row.ItemDesc || row.item_desc || ""}</td>
                              <td>{row.ReturnQty || row.return_qty || 0}</td>
                              <td>{row.User || row.username || ""}</td>
                              <td>
                                <Link to="#" className="btn btn-sm btn-primary">QC</Link>
                              </td>
                            </tr>
                          ))
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

export default PandingQCList;