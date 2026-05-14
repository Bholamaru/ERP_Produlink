import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR1.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";

const GSTR1 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Account/invoice/date-filter/`, {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      if (response.data && response.data.status && Array.isArray(response.data.data)) {
        const flattenedData = response.data.data.flatMap((invoice) => {
          const gst = invoice.GSTdetails?.[0] || {};
          return (invoice.items || []).map((item) => ({
            custName: item.customer || invoice.bill_to || "",
            gstin: "", // GSTIN not directly provided in this API endpoint
            stateCode: invoice.place_of_supply || "",
            pos: invoice.place_of_supply || "",
            invoiceNo: invoice.invoice_no || "",
            invoiceDate: invoice.invoice_Date || "",
            invoiceValue: gst.grand_total || "0",
            hsn: item.hsn_code || "",
            description: item.description || "",
            taxableValue: gst.assessble_value || "0",
            qty: item.inv_qty || "0",
            unitCode: "NOS",
            cgstPer: gst.cgst || "0",
            cgstAmt: gst.cgst_amt || "0",
            sgstPer: gst.sgst || "0",
            sgstAmt: gst.sgst_amt || "0",
            igstPer: gst.igst || "0",
            igstAmt: gst.igst_amt || "0",
            cess: "0",
            cessAmt: "0",
            tcsPer: "0",
            tcsAmt: "0",
            transport: gst.transport_crg || "0",
            freight: gst.freight_crg || "0",
            other: gst.other_crg || "0",
            pack: gst.pack_fwrd || "0",
            cancel: "N",
          }));
        });
        setReportData(flattenedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching GSTR-1 report:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };



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
                      <label className="form-label mb-0 fw-bold">From:</label>
                      <input
                        type="date"
                        className="form-control form-control-sm filter-date-input"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold">To:</label>
                      <input
                        type="date"
                        className="form-control form-control-sm filter-date-input"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold">Sales Type:</label>
                      <select className="form-select form-select-sm filter-select">
                        <option value="GST_Invoice">GST_Invoice</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 fw-bold">Type:</label>
                      <select className="form-select form-select-sm filter-select">
                        <option value="Invoice_Wise">Invoice_Wise</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2 ms-auto">
                      <button className="btn filter-btn">Search</button>
                      <button className="btn filter-btn">Export To Excel</button>
                      <button 
                        className="btn btn-sm btn-light border px-3 d-inline-flex align-items-center gap-2" 
                        style={{ height: "32px" }}
                        onClick={handleSearch}
                        disabled={loading}
                      >
                        <FaSearch className="search-icon" /> {loading ? "Searching..." : "Search"}
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
                         {Array.isArray(reportData) && reportData.map((row, index) => (
                          <tr key={index}>
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
                     <span className="total-label">Total Records: : <span className="total-value">{reportData.length}</span></span>
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
