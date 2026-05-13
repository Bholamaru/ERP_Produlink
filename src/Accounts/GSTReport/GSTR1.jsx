import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR1.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";

const GSTR1 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-12");

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

  const mockData = [
    {
      id: 1,
      custName: "ENDURANCE TECHNOLOGIES LTD (I)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702431",
      invoiceDate: "01/05/2026",
      invoiceValue: "9915.97",
      hsn: "87141090",
      description: "S2CW03311B D NUT",
      taxableValue: "8403.37",
      qty: "340",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "756.3",
      sgstPer: "9",
      sgstAmt: "756.3",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    {
      id: 2,
      custName: "ENDURANCE TECHNOLOGIES LTD (I)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702432",
      invoiceDate: "02/05/2026",
      invoiceValue: "13218.85",
      hsn: "87141090",
      description: "S2CW03311B D NUT",
      taxableValue: "11202.41",
      qty: "530",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "1008.22",
      sgstPer: "9",
      sgstAmt: "1008.22",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    {
      id: 3,
      custName: "ENDURANCE TECHNOLOGIES LTD (I)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702433",
      invoiceDate: "02/05/2026",
      invoiceValue: "51871.74",
      hsn: "87141090",
      description: "530PA00502 TUBE RING",
      taxableValue: "43959.1",
      qty: "4000",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "3956.32",
      sgstPer: "9",
      sgstAmt: "3956.32",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    {
      id: 4,
      custName: "ENDURANCE TECHNOLOGIES LTD (I)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702434",
      invoiceDate: "02/05/2026",
      invoiceValue: "9345.84",
      hsn: "87141090",
      description: "520PA01402 TUBE RING",
      taxableValue: "7920.2",
      qty: "2000",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "712.82",
      sgstPer: "9",
      sgstAmt: "712.82",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    {
      id: 5,
      custName: "ENDURANCE TECHNOLOGIES LTD (F)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702435",
      invoiceDate: "02/05/2026",
      invoiceValue: "10359.78",
      hsn: "87141090",
      description: "550BZ04302 CAP OIL LOCK (DT)",
      taxableValue: "8779.48",
      qty: "540",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "790.15",
      sgstPer: "9",
      sgstAmt: "790.15",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    {
      id: 6,
      custName: "ENDURANCE TECHNOLOGIES LTD (F)",
      gstin: "27AAACE7066P1Z3",
      stateCode: "MAHARASHTRA",
      pos: "27",
      invoiceNo: "262702436",
      invoiceDate: "02/05/2026",
      invoiceValue: "9112.89",
      hsn: "87141090",
      description: "520BZ00102 CAP OIL LOCK-LML",
      taxableValue: "7222.79",
      qty: "990",
      unitCode: "NOS",
      cgstPer: "9",
      cgstAmt: "695.05",
      sgstPer: "9",
      sgstAmt: "695.05",
      igstPer: "0",
      igstAmt: "0",
      cess: "0",
      cessAmt: "0",
      tcsPer: "0",
      tcsAmt: "0",
      transport: "0",
      freight: "0",
      other: "0",
      pack: "0",
      cancel: "N"
    },
    { id: 7, custName: "VARROC ENGINEERING LTD", gstin: "27AAACV1234A1Z1", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702437", invoiceDate: "03/05/2026", invoiceValue: "15000.00", hsn: "87141090", description: "BUSHING REAR", taxableValue: "12711.86", qty: "100", unitCode: "NOS", cgstPer: "9", cgstAmt: "1144.07", sgstPer: "9", sgstAmt: "1144.07", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 8, custName: "GABRIEL INDIA LTD", gstin: "27AAACG5678B1Z2", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702438", invoiceDate: "03/05/2026", invoiceValue: "25000.00", hsn: "87141090", description: "FRONT FORK ASSY", taxableValue: "21186.44", qty: "50", unitCode: "NOS", cgstPer: "9", cgstAmt: "1906.78", sgstPer: "9", sgstAmt: "1906.78", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 9, custName: "BADVE ENGINEERING LTD", gstin: "27AAACB9012C1Z3", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702439", invoiceDate: "04/05/2026", invoiceValue: "45000.00", hsn: "87141090", description: "CHASSIS FRAME", taxableValue: "38135.59", qty: "20", unitCode: "NOS", cgstPer: "9", cgstAmt: "3432.20", sgstPer: "9", sgstAmt: "3432.20", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 10, custName: "RICHA INDUSTRIES LTD", gstin: "27AAACR3456D1Z4", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702440", invoiceDate: "04/05/2026", invoiceValue: "12000.00", hsn: "87141090", description: "PIVOT PIN", taxableValue: "10169.49", qty: "500", unitCode: "NOS", cgstPer: "9", cgstAmt: "915.25", sgstPer: "9", sgstAmt: "915.25", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 11, custName: "MINDARIKA PVT LTD", gstin: "27AAACM7890E1Z5", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702441", invoiceDate: "05/05/2026", invoiceValue: "8000.00", hsn: "87141090", description: "SWITCH ASSY", taxableValue: "6779.66", qty: "200", unitCode: "NOS", cgstPer: "9", cgstAmt: "610.17", sgstPer: "9", sgstAmt: "610.17", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 12, custName: "AUTOPLAST PVT LTD", gstin: "27AAACA1234F1Z6", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702442", invoiceDate: "05/05/2026", invoiceValue: "3200.00", hsn: "87141090", description: "PLASTIC COVER", taxableValue: "2711.86", qty: "150", unitCode: "NOS", cgstPer: "9", cgstAmt: "244.07", sgstPer: "9", sgstAmt: "244.07", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 13, custName: "PRECISION CAMSHAFTS LTD", gstin: "27AAACP5678G1Z7", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702443", invoiceDate: "06/05/2026", invoiceValue: "60000.00", hsn: "87141090", description: "CAMSHAFT MACHINED", taxableValue: "50847.46", qty: "40", unitCode: "NOS", cgstPer: "9", cgstAmt: "4576.27", sgstPer: "9", sgstAmt: "4576.27", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 14, custName: "BHARAT FORGE LTD", gstin: "27AAACB9012H1Z8", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702444", invoiceDate: "06/05/2026", invoiceValue: "95000.00", hsn: "87141090", description: "CRANKSHAFT FORGING", taxableValue: "80508.47", qty: "10", unitCode: "NOS", cgstPer: "9", cgstAmt: "7245.76", sgstPer: "9", sgstAmt: "7245.76", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" },
    { id: 15, custName: "SUPRAJIT ENGINEERING LTD", gstin: "27AAACS3456I1Z9", stateCode: "MAHARASHTRA", pos: "27", invoiceNo: "262702445", invoiceDate: "07/05/2026", invoiceValue: "1800.00", hsn: "87141090", description: "CONTROL CABLE", taxableValue: "1525.42", qty: "300", unitCode: "NOS", cgstPer: "9", cgstAmt: "137.29", sgstPer: "9", sgstAmt: "137.29", igstPer: "0", igstAmt: "0", cess: "0", cessAmt: "0", tcsPer: "0", tcsAmt: "0", transport: "0", freight: "0", other: "0", pack: "0", cancel: "N" }
  ];

  return (
    <div className="gstr-1">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* Header Section */}
                <div className="WorkOrderEntry-header d-flex justify-content-between align-items-center mb-3">
                  <h5 className="header-title">GSTR - 1</h5>
                </div>

                {/* Filter Section - Pixel Perfect Inline Layout */}
                <div className="header-section mb-4 py-2">
                  <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap px-2">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold text-nowrap">From :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        style={{ width: "135px" }}
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold text-nowrap">To :</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        style={{ width: "135px" }}
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold text-nowrap">Sales Type :</label>
                      <select className="form-select form-select-sm" style={{ width: "150px" }}>
                        <option value="GST_Invoice">GST_Invoice</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold text-nowrap">Type :</label>
                      <select className="form-select form-select-sm" style={{ width: "150px" }}>
                        <option value="Invoice_Wise">Invoice_Wise</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2 ms-auto">
                      <button className="btn btn-sm btn-light border px-3 d-inline-flex align-items-center gap-2" style={{ height: "32px" }}>
                        <FaSearch className="search-icon" /> Search
                      </button>
                      <button className="btn btn-sm btn-light border px-3 d-inline-flex align-items-center gap-2" style={{ height: "32px" }}>
                        <FaFileExcel className="excel-icon" /> Export Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-container">
                  <div className="table-responsive">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>CustName</th>
                          <th>GSTIN</th>
                          <th>StateCode</th>
                          <th>POS</th>
                          <th>Invoice_No</th>
                          <th>Invoice_Date</th>
                          <th>Invoice_Value</th>
                          <th>HSN/SAC</th>
                          <th>Goods/Service description</th>
                          <th>Taxable_Value</th>
                          <th>Qty</th>
                          <th>UnitCode</th>
                          <th>CGST_Per</th>
                          <th>CGSTAmt</th>
                          <th>SGST_Per</th>
                          <th>SGSTAmt</th>
                          <th>IGS_Per</th>
                          <th>IGSTAmt</th>
                          <th>Cess</th>
                          <th>CessAmt</th>
                          <th>TcsPer</th>
                          <th>TcsAmt</th>
                          <th>TransportCharges</th>
                          <th>FreightCharges</th>
                          <th>OtherInstallCharges</th>
                          <th>PackCharges</th>
                          <th>Cancel</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((row) => (
                          <tr key={row.id}>
                            <td>{row.custName}</td>
                            <td className="text-center">{row.gstin}</td>
                            <td>{row.stateCode}</td>
                            <td className="text-center">{row.pos}</td>
                            <td className="text-center">{row.invoiceNo}</td>
                            <td className="text-center">{row.invoiceDate}</td>
                            <td className="text-right">{row.invoiceValue}</td>
                            <td className="text-center">{row.hsn}</td>
                            <td>{row.description}</td>
                            <td className="text-right">{row.taxableValue}</td>
                            <td className="text-right">{row.qty}</td>
                            <td className="text-center">{row.unitCode}</td>
                            <td className="text-right">{row.cgstPer}</td>
                            <td className="text-right">{row.cgstAmt}</td>
                            <td className="text-right">{row.sgstPer}</td>
                            <td className="text-right">{row.sgstAmt}</td>
                            <td className="text-right">{row.igstPer}</td>
                            <td className="text-right">{row.igstAmt}</td>
                            <td className="text-right">{row.cess}</td>
                            <td className="text-right">{row.cessAmt}</td>
                            <td className="text-right">{row.tcsPer}</td>
                            <td className="text-right">{row.tcsAmt}</td>
                            <td className="text-right">{row.transport}</td>
                            <td className="text-right">{row.freight}</td>
                            <td className="text-right">{row.other}</td>
                            <td className="text-right">{row.pack}</td>
                            <td className="text-center">{row.cancel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="footer-totals-bar">
                    <span className="total-label">Total Records: : <span className="total-value">864</span></span>
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

export default GSTR1;
