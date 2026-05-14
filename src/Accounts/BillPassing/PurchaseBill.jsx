import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseBill.css";
import { FaEye, FaCheck, FaExclamationTriangle, FaFileExcel, FaSearch, FaCogs } from "react-icons/fa";

const PurchaseBill = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirmToGstBill = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one entry.");
      return;
    }
    const selectedData = reportData.filter((item) => selectedIds.includes(item.id));
    navigate("/direct-bill", { state: { selectedInvoices: selectedData } });
  };

  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://erp-render.onrender.com/Account/purchase-po-date-filter/`, {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      if (response.data && Array.isArray(response.data.data)) {
        const mappedData = response.data.data.flatMap((item) => {
          const items = Array.isArray(item.item_details) ? item.item_details : [];
          const gstDetails = Array.isArray(item.gst_details) ? item.gst_details : [];

          if (items.length === 0) {
            return [{
              id: item.id,
              year: item.Series || "",
              grnNo: item.PoNo || "",
              grnDate: item.PoDate || "",
              challanNo: item.PoNo || "",
              challanDate: item.PoDate || "",
              invoiceNo: item.PoNo || "",
              invoiceDate: item.PoDate || "",
              supplier: item.Supplier || "",
              poNo: item.PoNo || "",
              total: item.GR_Total || "0",
              user: item.created_by_username || "",
              description: "",
              hsn: "",
              qty: 0,
              taxableValue: 0,
              cgstPer: 0,
              sgstPer: 0,
              igstPer: 0,
            }];
          }

          return items.map((detail, idx) => {
            const gst = gstDetails[idx] || gstDetails[0] || {};
            const rate = parseFloat(detail.Rate || 0);
            const qty = parseFloat(detail.Qty || 0);
            return {
              id: `${item.id}-${idx}`,
              year: item.Series || "",
              grnNo: item.PoNo || "",
              grnDate: item.PoDate || "",
              challanNo: item.PoNo || "",
              challanDate: item.PoDate || "",
              invoiceNo: item.PoNo || "",
              invoiceDate: item.PoDate || "",
              supplier: item.Supplier || "",
              supplierCode: item.CodeNo || "",
              poNo: item.PoNo || "",
              total: item.GR_Total || (rate * qty).toString(),
              user: item.created_by_username || "",
              description: detail.Item && detail.ItemDescription 
                ? `${detail.Item} - ${detail.ItemDescription}` 
                : detail.Item || detail.ItemDescription || "",
              hsn: detail.HSNCode || "",
              qty: qty,
              taxableValue: rate * qty,
              cgstPer: parseFloat(gst.cgst_per || 0),
              sgstPer: parseFloat(gst.sgst_per || 0),
              igstPer: parseFloat(gst.igst_per || 0),
            };
          });
        });
        setReportData(mappedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching Purchase Bill report:", error);
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
    <div className="purchase-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start">
                          Pending BILL GRN List
                        </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center">
                            <span className="me-2 small">Purchase GRN Auth-Pending Bill :</span>
                            <span className="badge bg-primary">225</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center">
                            <span className="me-2 small">Bill Passing (Purchase) :</span>
                            <span className="badge bg-primary">225</span>
                        </div>
                        <button className="btn d-inline-flex align-items-center gap-2">
                           <FaFileExcel /> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-center g-2">
                      <div className="col-auto d-flex align-items-center gap-3 pe-4">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="poGrn" defaultChecked />
                          <label className="form-check-label fw-bold small" htmlFor="poGrn">PO GRN</label>
                        </div>
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="directGrn" />
                          <label className="form-check-label fw-bold small" htmlFor="directGrn">Direct GRN</label>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 whitespace-nowrap small fw-bold">Plant:</label>
                            <select className="form-select form-select-sm">
                                <option value="SHARP">SHARP</option>
                            </select>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 small fw-bold">From:</label>
                             <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label mb-0 small fw-bold">To:</label>
                             <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-auto d-flex gap-2">
                         <button className="btn btn-primary d-inline-flex align-items-center gap-2 py-1 px-3" onClick={handleSearch} disabled={loading}>
                             <FaSearch /> {loading ? "Searching..." : "Search"}
                         </button>
                        <button className="btn btn-secondary d-inline-flex align-items-center gap-2 py-1 px-3">
                            <FaCogs /> Search Option
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>GRN No.</th>
                          <th>GRN Date</th>
                          <th>Challan No.</th>
                          <th>Challan Date</th>
                          <th>Invoice No.</th>
                          <th>Invoice Date</th>
                          <th>Supplier Name</th>
                          <th>PO No.</th>
                          <th>Total</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Auth1</th>
                          <th>Auth2</th>
                          <th>QC</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                         {Array.isArray(reportData) && reportData.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.year}</td>
                            <td>{data.grnNo}</td>
                            <td>{data.grnDate}</td>
                            <td>{data.challanNo}</td>
                            <td>{data.challanDate}</td>
                            <td>{data.invoiceNo}</td>
                            <td>{data.invoiceDate}</td>
                            <td>{data.supplier}</td>
                            <td>{data.poNo}</td>
                            <td>{data.total}</td>
                            <td>{data.user}</td>
                            <td><FaEye className="text-primary cursor-pointer" /></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td><div className="badge bg-success p-1"><FaCheck /></div></td>
                            <td>
                                {index % 3 === 0 ? 
                                    <div className="badge bg-success p-1"><FaCheck /></div> : 
                                    <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                                }
                            </td>
                            <td>
                              <input 
                                type="checkbox" 
                                checked={selectedIds.includes(data.id)}
                                onChange={() => handleCheckboxChange(data.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="footer-actions mt-3 text-end">
                    <button 
                      className="btn btn-success d-inline-flex align-items-center gap-2"
                      onClick={handleConfirmToGstBill}
                    >
                        <FaCheck /> Confirm To GST Bill
                    </button>
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

export default PurchaseBill;
