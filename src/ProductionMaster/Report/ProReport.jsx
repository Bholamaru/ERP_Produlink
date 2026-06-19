import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ProReportt.css";
import axios from "axios";
import * as XLSX from "xlsx";

const ProReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("Select All");
  const [operator, setOperator] = useState("");
  const [item, setItem] = useState("");

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
      if (plant && plant !== "Select All") params.plant = plant;
      if (operator) params.operator = operator;
      if (item) params.item = item;

      const resp = await axios.get("http://127.0.0.1:8000/Production/production-filter/", { params });
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching rejection report:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = reportData.map((row, index) => ({
      "Sr": index + 1,
      "Date": row.Date || row.date || "",
      "Part Name": row.PartName || row.part_name || "",
      "M/C No": row.MachineNo || row.mc_no || "",
      "CP No": row.CPNo || row.cp_no || "",
      "Shift": row.Shift || row.shift || "",
      "Operator Name": row.OperatorName || row.operator_name || "",
      "Supervisor Name": row.SupervisorName || row.supervisor_name || "",
      "Prod Qty": row.ProdQty || row.prod_qty || 0,
      "Rej. Qty": row.RejQty || row.rej_qty || 0,
      "Rej. %": row.RejPercent || row.rej_percent || 0,
      "Rej. Reason": row.RejReason || row.rej_reason || "",
      "Slip No": row.SlipNo || row.slip_no || "",
      "Type": row.Type || row.trn_type || "",
      "Remark": row.Remark || row.remark || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rejection Report");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Rejection_Report.xlsx");
  };

  return (
    <div className="ProReportMaster">
    
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
              <div className="ProReport">
                <div className="ProReport-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">Material Defect - Rejection Report</h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <button type="button" className="btn" onClick={handleExportExcel}>
                        Export To Excel
                      </button>
                      <button type="button" className="btn" to="#/">
                        Print Format
                      </button>
                      <button type="button" className="btn" to="#/">
                        Print Format 2
                      </button>
                      <button type="button" className="btn" to="#/">
                        Machine Wise Defect Report
                      </button>
                      <button type="button" className="btn" to="#/">
                        Rejection Report - OP Wise
                      </button>
                      <button type="button" className="btn" to="#/">
                        Rejection Report - Quary
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ProReport-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Plant:</label>
                        <select className="form-select" value={plant} onChange={(e) => setPlant(e.target.value)}>
                          <option value="Select All">Select All</option>
                          <option value="Produlink">Produlink</option>
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

                      {/* Months Wise */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Months Wise :</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Operator Wise */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Operator Wise:</label>
                        <input type="text" className="form-control" value={operator} onChange={(e) => setOperator(e.target.value)} />
                      </div>

                      {/* Reason Wise */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Reason Wise:</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Item Wise */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Item Wise:</label>
                        <input type="text" className="form-control" value={item} onChange={(e) => setItem(e.target.value)} />
                      </div>

                      {/* Machine Wise */}
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>Machine Wise :</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      <div className="col-sm-2 col-md-2 col-lg-1 mt-4">
                      <button type="button" className="btn btn-primary w-100" onClick={handleSearch}>
                          Search
                      </button>   
                      </div>

                   
                     
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                <table className="table table-striped table-bordered ">
      <thead>
        <tr className="clr"> 
          <th>Sr</th>
          <th>Date </th>
          <th>Part Name</th>
          <th>M/C No</th>
          <th>CP No</th>
          <th>Shift</th>
          <th>Operator Name</th>
          <th>Supervisor Name</th>
          <th>Pord Qty </th>
          <th>Rej. Qty</th>
          <th>Rej. %</th>
          <th>Rej. Reason</th>
          <th>Slip No</th>
          <th>Type</th>
          <th>Remark</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan="15" className="text-center">Loading...</td>
          </tr>
        ) : reportData.length === 0 ? (
          <tr>
            <td colSpan="15" className="text-center">No records found</td>
          </tr>
        ) : (
          reportData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.Date || row.date || ""}</td>
              <td>{row.PartName || row.part_name || ""}</td>
              <td>{row.MachineNo || row.mc_no || ""}</td>
              <td>{row.CPNo || row.cp_no || ""}</td>
              <td>{row.Shift || row.shift || ""}</td>
              <td>{row.OperatorName || row.operator_name || ""}</td>
              <td>{row.SupervisorName || row.supervisor_name || ""}</td>
              <td>{row.ProdQty || row.prod_qty || 0}</td>
              <td>{row.RejQty || row.rej_qty || 0}</td>
              <td>{row.RejPercent || row.rej_percent || 0}</td>
              <td>{row.RejReason || row.rej_reason || ""}</td>
              <td>{row.SlipNo || row.slip_no || ""}</td>
              <td>{row.Type || row.trn_type || ""}</td>
              <td>{row.Remark || row.remark || ""}</td>
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
            
      
  )
}

export default ProReport
