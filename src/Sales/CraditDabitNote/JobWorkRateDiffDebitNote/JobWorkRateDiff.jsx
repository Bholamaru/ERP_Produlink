import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import "./JobWorkRateDiff.css";

const JobWorkRateDiff = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  // --- Form State (for API submission) ---
  const [debitNoteNo, setDebitNoteNo] = useState("");
  const [debitNoteDate, setDebitNoteDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [remark, setRemark] = useState("");
  const [isServiceInvoice, setIsServiceInvoice] = useState(false);
  const [saving, setSaving] = useState(false);

  // Table row fields
  const [invNo, setInvNo] = useState("");
  const [invDate, setInvDate] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [qty, setQty] = useState("");
  const [oldRate, setOldRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [diff, setDiff] = useState("");
  const [diffAmt, setDiffAmt] = useState("");
  const [grirNo, setGrirNo] = useState("");
  const [grirDate, setGrirDate] = useState("");

  // Tax summary fields
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");
  const [utgst, setUtgst] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [cgstAmt, setCgstAmt] = useState("");
  const [sgstAmt, setSgstAmt] = useState("");
  const [igstAmt, setIgstAmt] = useState("");
  const [utgstAmt, setUtgstAmt] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  const fetchDebitNoteNo = async () => {
    try {
      const res = await fetch("https://erp-render.onrender.com/Sales/Gst-jobwork-diff/no/");
      if (res.ok) {
        const data = await res.json();
        const no = data.debit_note_no || data.invoice_no || data.no || (Array.isArray(data) ? data[0]?.debit_note_no : "");
        if (no) setDebitNoteNo(String(no));
      }
    } catch (err) {
      console.error("Debit Note No fetch error:", err);
    }
  };

  // POST API handler
  const handleSave = async () => {
    setSaving(true);
    const payload = {
      debit_note_no: debitNoteNo,
      debit_note_date: debitNoteDate,
      from_date: fromDate,
      to_date: toDate,
      customer,
      item_code: itemCode,
      invoice_no: invoiceNo,
      remark,
      is_service_invoice: isServiceInvoice,
      // Tax fields at root level (matching API response structure)
      sub_total: subTotal || null,
      cgst: cgst || null,
      sgst: sgst || null,
      igst: igst || null,
      utgst: utgst || null,
      cgst_amt: cgstAmt || null,
      sgst_amt: sgstAmt || null,
      igst_amt: igstAmt || null,
      utgst_amt: utgstAmt || null,
      grand_total: grandTotal || null,
      items: [
        {
          inv_no: invNo || null,
          inv_date: invDate || null,
          hsn_code: hsnCode || null,
          qty: qty || null,
          old_rate: oldRate || null,
          new_rate: newRate || null,
          diff: diff || null,
          diff_amt: diffAmt || null,
          grir_no: grirNo || null,
          grir_date: grirDate || null,
        }
      ],
    };

    try {
      const response = await fetch("https://erp-render.onrender.com/Sales/gst-jobwork-rate-diff/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log("API Response Status:", response.status);
      console.log("API Response Body:", responseText);

      if (response.ok) {
        alert("Debit Note saved successfully!");
        // Auto-update debit note number after save
        fetchDebitNoteNo();
        
        // Reset form fields
        setCustomer("");
        setItemCode("");
        setInvoiceNo("");
        setRemark("");
        setIsServiceInvoice(false);
        setDebitNoteDate("");
        setFromDate("");
        setToDate("");
        
        // Reset table row fields
        setInvNo("");
        setInvDate("");
        setHsnCode("");
        setQty("");
        setOldRate("");
        setNewRate("");
        setDiff("");
        setDiffAmt("");
        setGrirNo("");
        setGrirDate("");
        
        // Reset tax summary fields
        setCgst("");
        setSgst("");
        setIgst("");
        setUtgst("");
        setSubTotal("");
        setCgstAmt("");
        setSgstAmt("");
        setIgstAmt("");
        setUtgstAmt("");
        setGrandTotal("");
        
        // Page stays open after save
      } else {
        alert("Save failed (Status " + response.status + "): " + responseText);
      }
    } catch (error) {
      console.error("Save Debit Note error:", error);
      alert("Network error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Fetch Debit Note No on mount
  useEffect(() => {
    fetchDebitNoteNo();
  }, []);

  const handleButtonClick = () => {
    navigate('/DabitNoteList');
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
    <div className="JobWorkRateDiffMaster">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="JobWorkRateDiff p-1">

                  {/* Header Row */}
                  <div className="JobWorkRateDiff-header">
                    <h5 className="header-title">New Debit Note (Jobwork Rate Diff.)</h5>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleButtonClick} style={{fontSize: '11px'}}>
                      Debit Note List
                    </button>
                  </div>

                  <div className="p-2">
                    {/* Top Info Row */}
                    <div className="d-flex align-items-center gap-4 mb-2" style={{fontSize: '12px', background: '#fff', padding: '5px', borderRadius: '4px', border: '1px solid #ddd'}}>
                        <div className="d-flex align-items-center gap-2">
                            <label className="m-0 fw-bold">Debit Note No :</label>
                            <span className="fw-bold" style={{color: '#000'}}>{debitNoteNo || 'Loading...'}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <label className="m-0 fw-bold">Debit Note Date :</label>
                            <input type="date" className="form-control form-control-sm py-0" style={{height: '24px', width: '130px'}} value={debitNoteDate} onChange={e => setDebitNoteDate(e.target.value)} />
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="filter-bar-erp">
                        <div className="d-flex align-items-center gap-1">
                            <label>Select Tax Invoice : From</label>
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                            <label>To</label>
                            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <label>Customer :</label>
                            <input type="text" placeholder="Enter Name..." style={{width: '200px'}} value={customer} onChange={e => setCustomer(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkItemCode" />
                            <label htmlFor="chkItemCode" style={{cursor: 'pointer'}}>Item Code :</label>
                            <input type="text" placeholder="Item Code" style={{width: '120px'}} value={itemCode} onChange={e => setItemCode(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input type="checkbox" id="chkInvoiceNo" />
                            <label htmlFor="chkInvoiceNo" style={{cursor: 'pointer'}}>Invoice No :</label>
                            <input type="text" placeholder="Invoice No" style={{width: '100px'}} value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                        </div>
                        <button className="btn btn-sm btn-light border py-0 px-2 d-flex align-items-center gap-1" style={{height: '22px', fontSize: '11px'}}>
                            <FaSearch size={10} /> Search
                        </button>
                    </div>

                    {/* Message Bar */}
                    <div style={{fontSize: '11px', color: '#666', borderBottom: '1px solid #ddd', padding: '2px 5px', background: '#fff'}}>
                        No Data Found !!
                    </div>

                    {/* Table Section */}
                    <div className="table-responsive mt-3">
                        <table className="table-erp">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Inv No</th>
                                    <th>Inv Date</th>
                                    <th>HSN Code</th>
                                    <th>Qty</th>
                                    <th>Edit</th>
                                    <th>Old Rate</th>
                                    <th>#</th>
                                    <th>
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                            New Rate <input type="text" style={{width: '40px', height: '18px', color: '#000'}} value={newRate} onChange={e => setNewRate(e.target.value)} />
                                            <button className="btn btn-xs btn-success py-0" style={{fontSize: '9px', height: '18px'}}>Set All</button>
                                        </div>
                                    </th>
                                    <th>Diff</th>
                                    <th>Diff Amt</th>
                                    <th>GRIR No.</th>
                                    <th>GRIR Date</th>
                                    <th>Del</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={invNo} onChange={e => setInvNo(e.target.value)} /></td>
                                    <td><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={invDate} onChange={e => setInvDate(e.target.value)} /></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={hsnCode} onChange={e => setHsnCode(e.target.value)} /></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={qty} onChange={e => setQty(e.target.value)} /></td>
                                    <td className="text-primary" style={{cursor: 'pointer'}}>Edit</td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={oldRate} onChange={e => setOldRate(e.target.value)} /></td>
                                    <td></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={newRate} onChange={e => setNewRate(e.target.value)} /></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={diff} onChange={e => setDiff(e.target.value)} /></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={diffAmt} onChange={e => setDiffAmt(e.target.value)} /></td>
                                    <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={grirNo} onChange={e => setGrirNo(e.target.value)} /></td>
                                    <td><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={grirDate} onChange={e => setGrirDate(e.target.value)} /></td>
                                    <td className="text-danger"><span style={{border: '1px solid #ccc', padding: '0 5px', cursor: 'pointer'}}>X</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Section */}
                    <div className="footer-summary mt-4">
                        <div className="footer-summary-header">Debit Note / Tax Details.</div>
                        <div className="table-responsive">
                            <table className="table footer-table m-0">
                                <thead>
                                    <tr>
                                        <th style={{width: '150px'}}>SubTotal</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>IGST</th>
                                        <th>UTGST</th>
                                        <th>Grand Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{background: '#fff'}}>
                                        <td></td>
                                        <td><div className="d-flex align-items-center gap-1"><input type="text" placeholder="00.00" style={{width: '60px'}} value={cgst} onChange={e => setCgst(e.target.value)} /> %</div></td>
                                        <td><div className="d-flex align-items-center gap-1"><input type="text" placeholder="00.00" style={{width: '60px'}} value={sgst} onChange={e => setSgst(e.target.value)} /> %</div></td>
                                        <td><div className="d-flex align-items-center gap-1"><input type="text" placeholder="00.00" style={{width: '60px'}} value={igst} onChange={e => setIgst(e.target.value)} /> %</div></td>
                                        <td><div className="d-flex align-items-center gap-1"><input type="text" placeholder="00.00" style={{width: '60px'}} value={utgst} onChange={e => setUtgst(e.target.value)} /> %</div></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{background: '#fff'}}>
                                        <td><input type="text" className="w-100" value={subTotal} onChange={e => setSubTotal(e.target.value)} /></td>
                                        <td><input type="text" className="w-100" placeholder="00.00" value={cgstAmt} onChange={e => setCgstAmt(e.target.value)} /></td>
                                        <td><input type="text" className="w-100" placeholder="00.00" value={sgstAmt} onChange={e => setSgstAmt(e.target.value)} /></td>
                                        <td><input type="text" className="w-100" placeholder="00.00" value={igstAmt} onChange={e => setIgstAmt(e.target.value)} /></td>
                                        <td><input type="text" className="w-100" placeholder="00.00" value={utgstAmt} onChange={e => setUtgstAmt(e.target.value)} /></td>
                                        <td><input type="text" className="w-100" placeholder="00.00" value={grandTotal} onChange={e => setGrandTotal(e.target.value)} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Remarks & Buttons */}
                    <div className="d-flex align-items-start gap-4 mt-3 p-2" style={{background: '#fff', border: '1px solid #ddd'}}>
                        <div style={{width: '200px'}}>
                            <label className="fw-bold d-block mb-1" style={{fontSize: '12px'}}>Remark</label>
                            <textarea className="form-control form-control-sm" rows="1" value={remark} onChange={e => setRemark(e.target.value)}></textarea>
                        </div>
                        <div className="pt-3">
                            <label className="d-flex align-items-center gap-1" style={{fontSize: '12px', cursor: 'pointer'}}>
                                <input type="checkbox" checked={isServiceInvoice} onChange={e => setIsServiceInvoice(e.target.checked)} /> IS Service Invoice
                            </label>
                        </div>
                        <div className="ms-auto pt-3 d-flex gap-2">
                            <button className="btn btn-sm btn-success px-3" onClick={handleSave} disabled={saving}>
                              {saving ? 'Saving...' : 'Save Debit Note'}
                            </button>
                            <button className="btn btn-sm btn-danger px-3" onClick={() => navigate('/DabitNoteList')}>Cancel</button>
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

export default JobWorkRateDiff;