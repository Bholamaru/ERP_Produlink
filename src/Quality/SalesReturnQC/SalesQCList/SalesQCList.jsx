import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './SalesQCList.css';
import axios from "axios";
import * as XLSX from "xlsx";

const defaultQCList = [
  {
    year: "24-25",
    plant: "SHARP",
    qcNo: "SRQC24250001",
    qcDate: "02/12/24",
    custName: "Ram kumawat",
    itemNo: "FG1018",
    itemDesc: "SECONDARY PISTON FOR TMC",
    partCode: "CNC1FG1018",
    reQty: 10,
    qkQty: 8,
    rejQty: 2,
    rewQty: 0,
    reason: "ANGLE NOT OK",
    doc: "SR-DOC-001",
    user: "Anupam"
  },
  {
    year: "24-25",
    plant: "SHARP",
    qcNo: "SRQC24250002",
    qcDate: "03/12/24",
    custName: "Ram kumawat",
    itemNo: "FG1263",
    itemDesc: "CAP OIL LOCK J1D FF",
    partCode: "PDFG1263",
    reQty: 25,
    qkQty: 20,
    rejQty: 5,
    rewQty: 0,
    reason: "BURR",
    doc: "SR-DOC-002",
    user: "Anupam"
  }
];

const SalesQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState(defaultQCList);
  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("SHARP");
  const [custName, setCustName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [rejectReason, setRejectReason] = useState("ALL");

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
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (plant) params.plant = plant;
      if (custName) params.cust_name = custName;
      if (itemCode) params.item_code = itemCode;
      if (rejectReason && rejectReason !== "ALL") params.reject_reason = rejectReason;

      const resp = await axios.get("http://127.0.0.1:8000/Quality/sales-return-qc/", { params });
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setQcList(data);
    } catch (error) {
      console.error("Error fetching Sales Return QC:", error);
      const filtered = defaultQCList.filter(row => {
        if (custName && !row.custName.toLowerCase().includes(custName.toLowerCase())) return false;
        if (itemCode && !row.itemNo.toLowerCase().includes(itemCode.toLowerCase()) && !row.partCode.toLowerCase().includes(itemCode.toLowerCase())) return false;
        if (rejectReason && rejectReason !== "ALL" && row.reason !== rejectReason) return false;
        return true;
      });
      setQcList(filtered);
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
      "Sr.": index + 1,
      "Year": row.year || row.Year || "",
      "Plant": row.plant || row.Plant || "",
      "QC No": row.qcNo || row.QcNo || row.qc_no || "",
      "QC Date": row.qcDate || row.QcDate || row.qc_date || "",
      "Cust Name": row.custName || row.CustName || row.cust_name || "",
      "Item No": row.itemNo || row.ItemNo || row.item_no || "",
      "Item Desc": row.itemDesc || row.ItemDesc || row.item_desc || "",
      "Part Code": row.partCode || row.PartCode || row.part_code || "",
      "Re. Qty": row.reQty || row.ReQty || row.return_qty || 0,
      "Qk Qty": row.qkQty || row.QkQty || row.ok_qty || 0,
      "Rej Qty": row.rejQty || row.RejQty || row.reject_qty || 0,
      "Rew Qty": row.rewQty || row.RewQty || row.rework_qty || 0,
      "Reason": row.reason || row.Reason || row.reject_reason || "",
      "Doc": row.doc || row.Doc || row.document_no || "",
      "User": row.user || row.User || row.username || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Return QC List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Sales_Return_QC_List.xlsx");
  };

  return (
    <div className="SalesQCListMaster">
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
                <div className="SalesQCList mt-5">
                  <div className="SalesQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title"> Sales Return QC List </h5>
                      </div>
                      <div className="col-md-2">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> With Company Header </label>
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <button type="button" className="btn" onClick={handleExportExcel}>
                          Export Excel
                        </button>
                        <button type="button" className="btn">
                          GST Sales Return QC-Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="SalesQCList-filter mb-4 mt-5">
                    <div className="row text-start">
                      
                      <div className="col-md-1">
                        <label>From Date</label>
                        <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                      </div>
                      <div className="col-md-1">
                        <label>To Date</label>
                        <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                      </div>

                      <div className="col-md-2">
                        <label>Plant</label>
                        <select className="form-select" style={{marginTop:"1px"}} value={plant} onChange={(e) => setPlant(e.target.value)}>
                          <option value="SHARP">SHARP</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text" placeholder="Cust Name" className="form-control" value={custName} onChange={(e) => setCustName(e.target.value)} />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Code: </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                      </div>
            
                      <div className="col-md-2">
                        <label>Reject Reason</label>
                        <select className="form-select" style={{marginTop:"1px"}} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}>
                          <option value="ALL">ALL</option>
                          <option>ANGLE NOT OK</option>
                          <option>Assembled parts</option>
                          <option>Blackodising NG</option>
                          <option>Broken</option>
                          <option>BURR</option>
                        </select>
                      </div>

                      <div className="col-md-1">               
                         <button className="btn btn-primary" style={{marginTop:"29px"}} onClick={handleSearch} disabled={loading}>
                           {loading ? "Searching..." : "Search"}
                         </button>          
                      </div>

                    </div>
                   
                  </div>

                  {/* Table Section */}
                  <div className="SalesQCList-Main mt-5">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Plant</th>
                          <th>QC No</th>
                          <th>QC Date</th>
                          <th>Cust Name</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Part Code</th>
                          <th>Re. Qty</th>
                          <th>Qk Qty</th>
                          <th>Rej Qty</th>
                          <th>Rew Qty</th>
                          <th>Reason</th>
                          <th>Doc</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="19" className="text-center">Loading...</td>
                          </tr>
                        ) : qcList.length === 0 ? (
                          <tr>
                            <td colSpan="19" className="text-center">No records found</td>
                          </tr>
                        ) : (
                          qcList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.year || row.Year || ""}</td>
                              <td>{row.plant || row.Plant || ""}</td>
                              <td>{row.qcNo || row.QcNo || row.qc_no || ""}</td>
                              <td>{row.qcDate || row.QcDate || row.qc_date || ""}</td>
                              <td>{row.custName || row.CustName || row.cust_name || ""}</td>
                              <td>{row.itemNo || row.ItemNo || row.item_no || ""}</td>
                              <td>{row.itemDesc || row.ItemDesc || row.item_desc || ""}</td>
                              <td>{row.partCode || row.PartCode || row.part_code || ""}</td>
                              <td>{row.reQty || row.ReQty || row.return_qty || 0}</td>
                              <td>{row.qkQty || row.QkQty || row.ok_qty || 0}</td>
                              <td>{row.rejQty || row.RejQty || row.reject_qty || 0}</td>
                              <td>{row.rewQty || row.RewQty || row.rework_qty || 0}</td>
                              <td>{row.reason || row.Reason || row.reject_reason || ""}</td>
                              <td>{row.doc || row.Doc || row.document_no || ""}</td>
                              <td>{row.user || row.User || row.username || ""}</td>
                              <td>
                                <button className="btn btn-sm btn-light">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-light">
                                  <i className="fas fa-edit"></i>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-light">
                                  <i className="fas fa-trash"></i>
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesQCList