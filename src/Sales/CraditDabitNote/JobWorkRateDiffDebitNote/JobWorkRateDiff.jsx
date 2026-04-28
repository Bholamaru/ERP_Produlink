import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import axios from "axios";
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

  // Search and selected rows management
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [newRate, setNewRate] = useState(""); // Missing state restored

  // Tax summary fields
  const [cgst, setCgst] = useState("0");
  const [sgst, setSgst] = useState("0");
  const [igst, setIgst] = useState("0");
  const [utgst, setUtgst] = useState("0");
  const [subTotal, setSubTotal] = useState("0.00");
  const [cgstAmt, setCgstAmt] = useState("0.00");
  const [sgstAmt, setSgstAmt] = useState("0.00");
  const [igstAmt, setIgstAmt] = useState("0.00");
  const [utgstAmt, setUtgstAmt] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  const fetchDebitNoteNo = async () => {
    try {
      // Using the user-specified remote production URL
      const res = await axios.get(`https://erp-render.onrender.com/Sales/gst-jobwork-rate-diff/no/?t=${Date.now()}`);
      console.log("Fetched Debit Note No Response:", res.data);
      
      const no = res.data.debit_note_no || res.data.invoice_no || res.data.no || (Array.isArray(res.data) ? res.data[0]?.debit_note_no : "");
      if (no) {
        setDebitNoteNo(String(no));
      }
    } catch (err) {
      console.error("Debit Note No fetch error:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const url = `https://erp-render.onrender.com/Sales/gst-jobwork-invoice/`;
      const response = await axios.get(url);
      const allInvoices = Array.isArray(response.data) ? response.data : [];

      // Client-side filtering
      const filtered = allInvoices.filter(inv => {
        if (customer) {
          const custName = (inv.bill_to_cust || "").toLowerCase();
          if (!custName.includes(customer.toLowerCase())) return false;
        }
        if (invoiceNo && inv.invoice_no !== invoiceNo) return false;
        if (!inv.items || inv.items.length === 0) return false;
        return true;
      });

      // Flatten: one row per item
      const flattened = [];
      filtered.forEach(inv => {
        inv.items.forEach(itm => {
          flattened.push({
            invoice_no: inv.invoice_no,
            invoice_date: inv.invoice_date || "",
            bill_to: inv.bill_to_cust,
            display_item: {
              hsn_code: itm.hsn_code || "",
              description: itm.description || "",
              inv_qty: itm.invoice_qty_nos || itm.inv_qty || itm.invoice_qty_kg || 0,
              qty: itm.invoice_qty_nos || itm.inv_qty || itm.invoice_qty_kg || 0,
              jobwork_rate: parseFloat(itm.jobwork_rate) || 0,
              item_code: itm.item_code || ""
            },
            gst_details: inv.gst_details || null
          });
        });
      });

      setSearchResults(flattened);
      if (flattened.length === 0) alert("No matching invoices with items found.");
    } catch (err) {
      console.error("Search error:", err);
      alert(`Search error: ${err.message}`);
    }
  };

  const handleAddInvoice = (row) => {
    const itm = row.display_item || {};
    // Check if this specific item from this specific invoice is already added
    if (selectedInvoices.some(si => si.inv_no === row.invoice_no && si.item_desc === itm.description)) {
      alert("This item from the invoice is already added.");
      return;
    }
    
    // API might return qty in different fields, we check all common ones
    const quantity = itm.inv_qty || itm.qty || itm.invoice_qty_nos || itm.invoice_qty_kg || 0;

    const newEntry = {
      inv_no: row.invoice_no || "",
      inv_date: row.invoice_date || "",
      hsn_code: itm.hsn_code || "",
      item_code: itm.item_code || "",
      qty: quantity,
      old_rate: itm.jobwork_rate || 0,
      new_rate: "",
      diff: "0.00",
      diff_amt: "0.00",
      grir_no: "",
      grir_date: "",
      item_desc: itm.description || ""
    };
    setSelectedInvoices([...selectedInvoices, newEntry]);

    // Pull GST percentages from invoice gst_details
    const gstData = row.gst_details || null;
    
    if (gstData) {
      // API sometimes stores amount in cgst field instead of percentage
      // If value > 50, it's likely an amount — use 9% as default percentage
      const cVal = parseFloat(gstData.cgst) || 0;
      const sVal = parseFloat(gstData.sgst) || 0;
      const iVal = parseFloat(gstData.igst) || 0;
      const uVal = parseFloat(gstData.utgst) || 0;
      
      setCgst(cVal > 0 && cVal <= 50 ? String(cVal) : "9");
      setSgst(sVal > 0 && sVal <= 50 ? String(sVal) : "9");
      setIgst(iVal > 0 && iVal <= 50 ? String(iVal) : "0");
      setUtgst(uVal > 0 && uVal <= 50 ? String(uVal) : "0");
    } else {
      setCgst("9");
      setSgst("9");
      setIgst("0");
      setUtgst("0");
    }
  };

  const handleTableChange = (index, field, value) => {
    const updated = [...selectedInvoices];
    updated[index][field] = value;
    
    // Auto calculate diff if rates are changed
    if (field === 'new_rate' || field === 'old_rate' || field === 'qty') {
      const nr = parseFloat(updated[index].new_rate) || 0;
      const or = parseFloat(updated[index].old_rate) || 0;
      const qtyVal = parseFloat(updated[index].qty) || 0;
      const diffVal = (nr - or).toFixed(2);
      updated[index].diff = diffVal;
      updated[index].diff_amt = (parseFloat(diffVal) * qtyVal).toFixed(2);
    }
    
    setSelectedInvoices(updated);
  };

  // Real-time calculations for Summary Section
  useEffect(() => {
    const totalDiffAmt = selectedInvoices.reduce((sum, itm) => sum + (parseFloat(itm.diff_amt) || 0), 0);
    setSubTotal(totalDiffAmt.toFixed(2));

    const cRate = parseFloat(cgst) || 0;
    const sRate = parseFloat(sgst) || 0;
    const iRate = parseFloat(igst) || 0;
    const uRate = parseFloat(utgst) || 0;

    const cAmt = totalDiffAmt * (cRate / 100);
    const sAmt = totalDiffAmt * (sRate / 100);
    const iAmt = totalDiffAmt * (iRate / 100);
    const uAmt = totalDiffAmt * (uRate / 100);

    setCgstAmt(cAmt.toFixed(2));
    setSgstAmt(sAmt.toFixed(2));
    setIgstAmt(iAmt.toFixed(2));
    setUtgstAmt(uAmt.toFixed(2));

    const gt = totalDiffAmt + cAmt + sAmt + iAmt + uAmt;
    setGrandTotal(gt.toFixed(2));
  }, [selectedInvoices, cgst, sgst, igst, utgst]);

  const handleSetAllNewRate = () => {
    if (!newRate) return;
    const updated = selectedInvoices.map(itm => {
      const nr = parseFloat(newRate) || 0;
      const or = parseFloat(itm.old_rate) || 0;
      const qtyVal = parseFloat(itm.qty) || 0;
      const diffVal = (nr - or).toFixed(2);
      return {
        ...itm,
        new_rate: newRate,
        diff: diffVal,
        diff_amt: (parseFloat(diffVal) * qtyVal).toFixed(2)
      };
    });
    setSelectedInvoices(updated);
  };

  // POST API handler
  const handleSave = async () => {
    setSaving(true);

    const parseNum = (val) => (val === "" ? 0 : parseFloat(val));
    const parseDate = (val) => (val === "" ? null : val);

    const payload = {
      debit_note_no: debitNoteNo,
      debit_note_date: parseDate(debitNoteDate),
      from_date: parseDate(fromDate),
      to_date: parseDate(toDate),
      customer,
      item_code: itemCode,
      invoice_no: invoiceNo,
      remark,
      is_service_invoice: isServiceInvoice,
      
      // Totals and Tax (at root level as expected by backend)
      sub_total: parseNum(subTotal),
      cgst: parseNum(cgst),
      sgst: parseNum(sgst),
      igst: parseNum(igst),
      utgst: parseNum(utgst),
      cgst_amt: parseNum(cgstAmt),
      sgst_amt: parseNum(sgstAmt),
      igst_amt: parseNum(igstAmt),
      utgst_amt: parseNum(utgstAmt),
      grand_total: parseNum(grandTotal),

      items: selectedInvoices.map(itm => ({
        inv_no: itm.inv_no,
        inv_date: parseDate(itm.inv_date),
        hsn_code: itm.hsn_code,
        item_code: itm.item_code || "",
        description: itm.item_desc || "",
        qty: parseNum(itm.qty),
        old_rate: parseNum(itm.old_rate),
        new_rate: parseNum(itm.new_rate),
        diff: parseNum(itm.diff),
        diff_amt: parseNum(itm.diff_amt),
        grir_no: itm.grir_no,
        grir_date: parseDate(itm.grir_date),
      })),
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
        
        // Auto-update debit note number after save (with small delay for local DB consistency)
        setTimeout(() => {
          fetchDebitNoteNo();
        }, 500);
        
        // Reset form fields
        setCustomer("");
        setItemCode("");
        setInvoiceNo("");
        setRemark("");
        setIsServiceInvoice(false);
        setFromDate("");
        setToDate("");
        setNewRate("");
        
        // Reset table rows
        setSelectedInvoices([]);
        setSearchResults([]);
        
        // Reset tax summary fields (back to defaults)
        setCgst("0");
        setSgst("0");
        setIgst("0");
        setUtgst("0");
        setSubTotal("0.00");
        setCgstAmt("0.00");
        setSgstAmt("0.00");
        setIgstAmt("0.00");
        setUtgstAmt("0.00");
        setGrandTotal("0.00");
        
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
                        <button 
                            className="btn btn-sm btn-light border py-0 px-2 d-flex align-items-center gap-1" 
                            style={{height: '22px', fontSize: '11px'}}
                            onClick={handleSearch}
                        >
                            <FaSearch size={10} /> Search
                        </button>
                    </div>

                    {/* Message Bar / Search Results Table */}
                    {searchResults.length > 0 ? (
                      <div className="table-responsive search-results-table mt-2" style={{maxHeight: '200px', overflowY: 'auto'}}>
                         <table className="table-erp table-hover">
                           <thead style={{position: 'sticky', top: 0, zIndex: 1}}>
                             <tr>
                               <th>No.</th>
                               <th>Invoice No</th>
                               <th>Invoice Date</th>
                               <th>HSN Code</th>
                               <th>Item Desc</th>
                               <th>Qty</th>
                               <th>Debit Note No</th>
                               <th>Rate Diff</th>
                               <th>Select</th>
                             </tr>
                           </thead>
                           <tbody style={{background: '#f8f9fa'}}>
                             {searchResults.map((row, idx) => (
                               <tr key={idx} style={{fontSize: '11px'}}>
                                 <td>{idx + 1}</td>
                                 <td>{row.invoice_no}</td>
                                 <td>{row.invoice_date}</td>
                                 <td>{row.display_item?.hsn_code}</td>
                                 <td>{row.display_item?.description}</td>
                                 <td>{row.display_item?.inv_qty || row.display_item?.qty || row.display_item?.invoice_qty_nos || '0'}</td>
                                 <td>{row.debit_note_no || '-'}</td>
                                 <td>{row.rate_diff || '-'}</td>
                                 <td className="text-center">
                                   <button className="btn btn-xs btn-primary py-0" style={{fontSize: '10px'}} onClick={() => handleAddInvoice(row)}>Add</button>
                                 </td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                      </div>
                    ) : (
                      <div style={{fontSize: '11px', color: '#666', borderBottom: '1px solid #ddd', padding: '2px 5px', background: '#fff'}}>
                          {searchResults.length === 0 && customer ? "No Data Found !!" : "Enter filters and click Search to see results."}
                      </div>
                    )}
 
                    {/* Selected Invoice List Label */}
                    <div className="mt-3 mb-1" style={{fontSize: '12px', fontWeight: 'bold', color: '#0d6efd'}}>
                      Selected Invoice List :
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
                                            <button className="btn btn-xs btn-success py-0" style={{fontSize: '9px', height: '18px'}} onClick={handleSetAllNewRate}>Set All</button>
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
                                {selectedInvoices.map((item, index) => (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.inv_no} readOnly /></td>
                                      <td><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.inv_date} readOnly /></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.hsn_code} readOnly /></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.qty} onChange={e => handleTableChange(index, 'qty', e.target.value)} /></td>
                                      <td className="text-primary" style={{cursor: 'pointer'}}>Edit</td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.old_rate} onChange={e => handleTableChange(index, 'old_rate', e.target.value)} /></td>
                                      <td></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.new_rate} onChange={e => handleTableChange(index, 'new_rate', e.target.value)} /></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.diff} readOnly /></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.diff_amt} readOnly /></td>
                                      <td><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.grir_no} onChange={e => handleTableChange(index, 'grir_no', e.target.value)} /></td>
                                      <td><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.grir_date} onChange={e => handleTableChange(index, 'grir_date', e.target.value)} /></td>
                                      <td className="text-center">
                                        <span 
                                          style={{border: '1px solid #ccc', padding: '0 5px', cursor: 'pointer', borderRadius: '3px', color: 'red'}}
                                          onClick={() => setSelectedInvoices(selectedInvoices.filter((_, i) => i !== index))}
                                        >
                                          &times;
                                        </span>
                                      </td>
                                  </tr>
                                ))}
                                {selectedInvoices.length === 0 && (
                                  <tr>
                                    <td colSpan="14" className="text-center text-muted" style={{fontSize: '11px', padding: '10px'}}>No invoices selected. Use the search table above to add rows.</td>
                                  </tr>
                                )}
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