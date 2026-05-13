import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./HSNSACSummary.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";

const HSNSACSummary = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [type, setType] = useState("Sales");

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

  // Mock data based on the provided image
  const tableData = [
    { id: 1, hsnSac: "87141090", description: "Brake Part", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "364236", totalAmt: "3,892,804.93", gstPerc: "18", taxableValue: "3,285,876.44", igstAmt: "140,937.36", cgstAmt: "225,260.24", sgstAmt: "225,260.24", cess: "0", tcsAmt: "0", totalGstAmt: "591,457.84" },
    { id: 2, hsnSac: "87141091", description: "Clutch Part", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "125400", totalAmt: "1,250,500.00", gstPerc: "18", taxableValue: "1,059,745.76", igstAmt: "45,000.00", cgstAmt: "72,877.12", sgstAmt: "72,877.12", cess: "0", tcsAmt: "0", totalGstAmt: "190,754.24" },
    { id: 3, hsnSac: "87141092", description: "Gear Part", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "85200", totalAmt: "850,200.00", gstPerc: "12", taxableValue: "759,107.14", igstAmt: "0.00", cgstAmt: "45,546.43", sgstAmt: "45,546.43", cess: "0", tcsAmt: "0", totalGstAmt: "91,092.86" },
    { id: 4, hsnSac: "87141093", description: "Wheel Rim", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "45000", totalAmt: "450,000.00", gstPerc: "18", taxableValue: "381,355.93", igstAmt: "0.00", cgstAmt: "34,322.03", sgstAmt: "34,322.03", cess: "0", tcsAmt: "0", totalGstAmt: "68,644.07" },
    { id: 5, hsnSac: "87141094", description: "Brake Shoe", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "96000", totalAmt: "960,000.00", gstPerc: "18", taxableValue: "813,559.32", igstAmt: "146,440.68", cgstAmt: "0.00", sgstAmt: "0.00", cess: "0", tcsAmt: "0", totalGstAmt: "146,440.68" },
    { id: 6, hsnSac: "87141095", description: "Engine Part", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "52000", totalAmt: "520,000.00", gstPerc: "28", taxableValue: "406,250.00", igstAmt: "0.00", cgstAmt: "56,875.00", sgstAmt: "56,875.00", cess: "0", tcsAmt: "0", totalGstAmt: "113,750.00" },
    { id: 7, hsnSac: "87141096", description: "Mirror Set", typeOfSupply: "GST Sales", group: "FG", uom: "SET", totalQty: "32000", totalAmt: "320,000.00", gstPerc: "12", taxableValue: "285,714.29", igstAmt: "0.00", cgstAmt: "17,142.86", sgstAmt: "17,142.86", cess: "0", tcsAmt: "0", totalGstAmt: "34,285.71" },
    { id: 8, hsnSac: "87141097", description: "Chain Kit", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "74000", totalAmt: "740,000.00", gstPerc: "18", taxableValue: "627,118.64", igstAmt: "0.00", cgstAmt: "56,440.68", sgstAmt: "56,440.68", cess: "0", tcsAmt: "0", totalGstAmt: "112,881.36" },
    { id: 9, hsnSac: "87141098", description: "Side Stand", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "21000", totalAmt: "210,000.00", gstPerc: "18", taxableValue: "177,966.10", igstAmt: "32,033.90", cgstAmt: "0.00", sgstAmt: "0.00", cess: "0", tcsAmt: "0", totalGstAmt: "32,033.90" },
    { id: 10, hsnSac: "87141099", description: "Handle Bar", typeOfSupply: "GST Sales", group: "FG", uom: "NOS", totalQty: "18000", totalAmt: "180,000.00", gstPerc: "18", taxableValue: "152,542.37", igstAmt: "0.00", cgstAmt: "13,728.81", sgstAmt: "13,728.81", cess: "0", tcsAmt: "0", totalGstAmt: "27,457.63" },
  ];

  // Dynamic calculation for footer totals
  const totals = tableData.reduce((acc, curr) => ({
    qty: acc.qty + parseFloat(curr.totalQty || 0),
    amt: acc.amt + parseFloat(curr.totalAmt.replace(/,/g, '') || 0),
    taxable: acc.taxable + parseFloat(curr.taxableValue.replace(/,/g, '') || 0),
    igst: acc.igst + parseFloat(curr.igstAmt.replace(/,/g, '') || 0),
    cgst: acc.cgst + parseFloat(curr.cgstAmt.replace(/,/g, '') || 0),
    sgst: acc.sgst + parseFloat(curr.sgstAmt.replace(/,/g, '') || 0),
    totalGst: acc.totalGst + parseFloat(curr.totalGstAmt.replace(/,/g, '') || 0)
  }), { qty: 0, amt: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, totalGst: 0 });

  const formatNum = (num) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(num);

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
                      <button className="btn">
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
                        {tableData.map((row) => (
                          <tr key={row.id}>
                            <td className="text-center">{row.id}</td>
                            <td>{row.hsnSac}</td>
                            <td>{row.description}</td>
                            <td>{row.typeOfSupply}</td>
                            <td className="text-center">{row.group}</td>
                            <td className="text-center">{row.uom}</td>
                            <td className="text-right">{row.totalQty}</td>
                            <td className="text-right">{row.totalAmt}</td>
                            <td className="text-center">{row.gstPerc}</td>
                            <td className="text-right">{row.taxableValue}</td>
                            <td className="text-right">{row.igstAmt}</td>
                            <td className="text-right">{row.cgstAmt}</td>
                            <td className="text-right">{row.sgstAmt}</td>
                            <td className="text-center">{row.cess}</td>
                            <td className="text-center">{row.tcsAmt}</td>
                            <td className="text-right">{row.totalGstAmt}</td>
                          </tr>
                        ))}
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
