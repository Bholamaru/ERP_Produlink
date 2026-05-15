import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./DirectBill.css";
import { FaPlus, FaTrash, FaSearch, FaCheck, FaFileExcel } from "react-icons/fa";

const DirectBill = () => {
  const location = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      grNo: '',
      chalNo: '',
      poNo: '',
      itemCode: '',
      hsnCode: '',
      rate: 0,
      grnQty: 0,
      dis: 0,
      total: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      glId: '',
      remark: ''
    }
  ]);
  const [newRow, setNewRow] = useState({
    supplierName: "",
    itemName: "",
    rate: "",
    qty: "",
  });

  const [footerData, setFooterData] = useState({
    invChallanDate: "2026-05-09",
    invChallanNo: "",
    paymentTermDays: "",
    paymentDate: "2026-05-09",
    postingDate: "2026-05-09",
    otherAmount: 0,
    remark: "",
    roundOffAmt: 0,
    roundOffType: "+",
    billNo: "",
    packCharges: 0,
    transCharges: 0,
    insCharges: 0,
    instCharges: 0,
    otherCharges: 0,
    tdsPer: 0,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const fetchNextBillNo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000/Account/generate-bill-no/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Bill No Response:", response.data);
      const nextNo = response.data.next_bill_no || response.data.bill_no || response.data.no;
      if (nextNo) {
        setFooterData(prev => ({ ...prev, billNo: nextNo }));
      }
    } catch (error) {
      console.error("Error fetching bill no:", error);
    }
  };

  useEffect(() => {
    fetchNextBillNo();
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedInvoices) {
      const incomingInvoices = location.state.selectedInvoices;
      const mappedRows = incomingInvoices.map((inv, idx) => ({
        id: inv.id || idx + 1,
        grNo: inv.grnNo || "",
        chalNo: inv.challanNo || "",
        poNo: inv.poNo || "",
        itemCode: inv.description || "",
        hsnCode: inv.hsnCode || "",
        rate: inv.qty > 0 ? parseFloat(inv.taxableValue || 0) / parseFloat(inv.qty) : 0,
        grnQty: parseFloat(inv.qty || 0),
        dis: parseFloat(inv.dis || 0),
        total: parseFloat(inv.total || 0),
        cgst: parseFloat(inv.cgst || 0),
        sgst: parseFloat(inv.sgst || 0),
        igst: parseFloat(inv.igst || 0),
        glId: "",
        remark: "",
      }));
      setRows(mappedRows);

      if (incomingInvoices.length > 0) {
        const first = incomingInvoices[0];
        setNewRow((prev) => ({
          ...prev,
          supplierName: first.supplier || "",
          supplierCode: first.supplierCode || "",
        }));

        setFooterData((prev) => ({
          ...prev,
          invChallanDate: first.challanDate || prev.invChallanDate,
          invChallanNo: first.challanNo || prev.invChallanNo,
          paymentTermDays: first.paymentTerms || prev.paymentTermDays,
          paymentDate: first.poDate || prev.paymentDate,
          // Mapping TOC charges if available
          otherAmount: first.otherCharges || prev.otherAmount,
          packCharges: first.packCharges || 0,
          transCharges: first.transCharges || 0,
          insCharges: first.insCharges || 0,
          instCharges: first.instCharges || 0,
          otherCharges: first.otherCharges || 0,
          tdsPer: first.tdsPer || 0,
        }));
      }
    }
  }, [location.state]);

  const handleSaveBill = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        plant: "SHARP",
        bill_type: "PO-GRN-BILL",
        series_no: "", // Can be filled if series state is added later
        no: footerData.invChallanNo,
        supplier_name: newRow.supplierName,
        item_name: rows[0]?.itemCode?.split(' - ')[0] || "",
        rate: Number(rows[0]?.rate) || 0,
        qty: Number(rows[0]?.grnQty) || 0,
        fwd_charges: 0,
        transport_charged: 0,
        insurence: 0,
        installation_charges: 0,
        other_charges: Number(footerData.otherAmount) || 0,
        challan_date: footerData.invChallanDate,
        payment_days_terms: Number(footerData.paymentTermDays) || 0,
        tds: 0,
        sub_total: Number(totals.basicTotal),
        challan_no: footerData.invChallanNo,
        payment_date: footerData.paymentDate,
        other_amt: Number(footerData.otherAmount) || 0,
        assable_value: Number(totals.basicTotal),
        posting_date: footerData.postingDate,
        round_of_amt: Number(footerData.roundOffAmt) || 0,
        net_total: Number(totals.finalAmount),
        remark: footerData.remark,
        no: footerData.billNo,
        
        // Master TOC Fields
        TOC_PackCharges: Number(footerData.packCharges) || 0,
        TOC_TransportCost: Number(footerData.transCharges) || 0,
        TOC_Insurance: Number(footerData.insCharges) || 0,
        TOC_InstallationCharges: Number(footerData.instCharges) || 0,
        TOC_TDS: Number(footerData.tdsPer) || 0,
        
        items: rows.map(row => ({
          grn_no: row.grNo,
          chall_no: row.chalNo,
          po_no: row.poNo,
          item_code: row.itemCode?.split(' - ')[0] || "",
          item_no: "", // Internal ID if needed
          item_description: row.itemCode?.split(' - ')[1] || row.itemCode || "",
          hsn_code: row.hsnCode,
          rate: Number(row.rate),
          grn_qty: Number(row.grnQty),
          discount: Number(row.dis) || 0,
          cgst: Number(row.cgst) || 0,
          sgst: Number(row.sgst) || 0,
          igst: Number(row.igst) || 0,
          cgst_amt: Number((row.total * (row.cgst / 100)).toFixed(2)),
          sgst_amt: Number((row.total * (row.sgst / 100)).toFixed(2)),
          igst_amt: Number((row.total * (row.igst / 100)).toFixed(2)),
          total: Number(row.total.toFixed(2)),
          glid: row.glId,
          remark: row.remark
        }))
      };

      const response = await axios.post("http://127.0.0.1:8000/Account/bill-register/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.data.stat || response.status === 200 || response.status === 201) {
        alert("Bill Registered Successfully!");
        setShowConfirmModal(false);
        fetchNextBillNo();
        
        // Reset Page State (Clear all data)
        setRows([
          {
            id: 1,
            grNo: '',
            chalNo: '',
            poNo: '',
            itemCode: '',
            hsnCode: '',
            rate: 0,
            grnQty: 0,
            dis: 0,
            total: 0,
            cgst: 0,
            sgst: 0,
            igst: 0,
            glId: '',
            remark: ''
          }
        ]);
        setNewRow({
          supplierName: "",
          itemName: "",
          rate: "",
          qty: "",
          supplierCode: ""
        });
        setFooterData({
          invChallanDate: new Date().toISOString().split('T')[0],
          invChallanNo: "",
          paymentTermDays: "",
          paymentDate: new Date().toISOString().split('T')[0],
          postingDate: new Date().toISOString().split('T')[0],
          otherAmount: 0,
          remark: "",
          roundOffAmt: 0,
          roundOffType: "+",
          billNo: "", // Temporarily clear, will be refilled by next call
        });
        fetchNextBillNo(); // Fetch AFTER reset to avoid overwrite
      } else {
        const errorMsg = response.data.message || response.data.error || "Failed to register bill";
        alert("Error: " + errorMsg);
      }
    } catch (error) {
      console.error("Save Bill Error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data) || error.message || "Failed to register bill. Please try again.";
      alert("Save Failed: " + errorMsg);
    }
  };

  const handleAddRow = () => {
    if (!newRow.itemName) return;
    const itemTotal = parseFloat(newRow.rate) * parseFloat(newRow.qty);
    const id = Date.now();
    setRows([...rows, {
      id,
      grNo: '',
      chalNo: '',
      poNo: '',
      itemCode: newRow.itemName,
      hsnCode: '',
      rate: parseFloat(newRow.rate),
      grnQty: parseFloat(newRow.qty),
      dis: 0,
      total: itemTotal,
      cgst: 0,
      sgst: 0,
      igst: 0,
      glId: '',
      remark: ''
    }]);
    setNewRow({ supplierName: '', itemName: '', rate: 0, qty: 0 });
  };

  const handleRowChange = (id, field, value) => {
    setRows(prevRows => prevRows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        // Recalculate total if rate, qty, or dis changes
        if (field === 'rate' || field === 'grnQty' || field === 'dis') {
          const rate = parseFloat(updatedRow.rate || 0);
          const qty = parseFloat(updatedRow.grnQty || 0);
          const dis = parseFloat(updatedRow.dis || 0);
          updatedRow.total = (rate * qty) - ((rate * qty) * (dis / 100));
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const calculateTotals = () => {
    let basicTotal = rows.reduce((acc, row) => acc + row.total, 0);
    let cgstTotal = rows.reduce((acc, row) => acc + (row.total * (row.cgst / 100)), 0);
    let sgstTotal = rows.reduce((acc, row) => acc + (row.total * (row.sgst / 100)), 0);
    let igstTotal = rows.reduce((acc, row) => acc + (row.total * (row.igst / 100)), 0);
    let taxTotal = cgstTotal + sgstTotal + igstTotal;
    
    // Sum of all TOC charges
    let totalOtherCharges = parseFloat(footerData.packCharges || 0) + 
                            parseFloat(footerData.transCharges || 0) + 
                            parseFloat(footerData.insCharges || 0) + 
                            parseFloat(footerData.instCharges || 0) + 
                            parseFloat(footerData.otherCharges || 0);

    let finalAmount = basicTotal + taxTotal + totalOtherCharges;

    if (footerData.roundOffType === "+") finalAmount += parseFloat(footerData.roundOffAmt || 0);
    else finalAmount -= parseFloat(footerData.roundOffAmt || 0);

    return {
      basicTotal: basicTotal.toFixed(2),
      cgstTotal: cgstTotal.toFixed(2),
      sgstTotal: sgstTotal.toFixed(2),
      igstTotal: igstTotal.toFixed(2),
      taxTotal: taxTotal.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    };
  };

  const totals = calculateTotals();

  return (
    <div className="direct-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="bill-register-container">
                  {/* Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="d-flex align-items-center gap-4 py-1">
                      <h5 className="header-title mb-0 text-nowrap">
                        Bill Register
                      </h5>

                      <div className="d-flex align-items-center gap-3 flex-grow-1">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Plant :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '28px' }}>
                            <option>SHARP</option>
                          </select>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Bill Type :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '28px' }}>
                            <option>Select</option>
                          </select>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Series No :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '28px' }}>
                            <option></option>
                          </select>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">No :</label>
                          <input type="text" className="form-control form-control-sm" value={footerData.billNo} readOnly style={{ width: '90px', height: '28px' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Search Section */}
                  <div className="search-section mb-3 p-2 border rounded bg-white shadow-sm">
                    <div className="row g-2 align-items-end justify-content-start">
                      <div className="col-md-2">
                        <label className="form-label small fw-bold mb-1 d-block text-center">Supplier Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="ENTER SUPPLIER NAME.."
                          value={newRow.supplierName}
                          onChange={(e) => setNewRow({ ...newRow, supplierName: e.target.value })}
                        />
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-sm btn-light border d-flex flex-column align-items-center justify-content-center px-3" style={{ height: '32px', minWidth: '60px' }}>
                          <FaSearch size={12} />
                          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>Search</span>
                        </button>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-bold mb-1 d-block text-center">Item Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Enter Item Code.."
                          value={newRow.itemName}
                          onChange={(e) => setNewRow({ ...newRow, itemName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-1">
                        <label className="form-label small fw-bold mb-1 d-block text-center">Rate :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.rate}
                          onChange={(e) => setNewRow({ ...newRow, rate: e.target.value })}
                        />
                      </div>
                      <div className="col-md-1">
                        <label className="form-label small fw-bold mb-1 d-block text-center">Qty :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.qty}
                          onChange={(e) => setNewRow({ ...newRow, qty: e.target.value })}
                        />
                      </div>
                      <div className="col-md-1">
                        <button className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1" onClick={handleAddRow} style={{ height: '32px' }}>
                          <FaPlus size={12} /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive border rounded bg-white mb-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-sm custom-bill-table mb-0">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>GrNo</th>
                          <th>ChalNo</th>
                          <th>PO No</th>
                          <th style={{ minWidth: '150px' }}>Item Code/Desc</th>
                          <th style={{ width: '100px' }}>HSN Code</th>
                          <th style={{ width: '80px' }}>Rate</th>
                          <th style={{ width: '80px' }}>GRN Qty</th>
                          <th style={{ width: '80px' }}>Dis (%)</th>
                          <th style={{ width: '100px' }}>Total</th>
                          <th style={{ width: '80px' }}>CGST (%)</th>
                          <th style={{ width: '80px' }}>SGST (%)</th>
                          <th style={{ width: '80px' }}>IGST (%)</th>
                          <th style={{ minWidth: '120px' }}>GLId</th>
                          <th style={{ minWidth: '150px' }}>Remark</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.grNo} onChange={(e) => handleRowChange(row.id, 'grNo', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.chalNo} onChange={(e) => handleRowChange(row.id, 'chalNo', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.poNo} onChange={(e) => handleRowChange(row.id, 'poNo', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 bg-transparent" value={row.itemCode} onChange={(e) => handleRowChange(row.id, 'itemCode', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm text-center" value={row.hsnCode} onChange={(e) => handleRowChange(row.id, 'hsnCode', e.target.value)} /></td>
                            <td><input type="number" className="form-control form-control-sm text-center" value={row.rate} onChange={(e) => handleRowChange(row.id, 'rate', e.target.value)} /></td>
                            <td><input type="number" className="form-control form-control-sm text-center" value={row.grnQty} onChange={(e) => handleRowChange(row.id, 'grnQty', e.target.value)} /></td>
                             <td>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.dis} 
                                     onChange={(e) => handleRowChange(row.id, 'dis', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={((row.rate * row.grnQty) * (row.dis / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                            <td><input type="number" className="form-control form-control-sm text-end border-0 bg-transparent fw-bold" readOnly value={row.total.toFixed(2)} /></td>
                            <td>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.cgst} 
                                     onChange={(e) => handleRowChange(row.id, 'cgst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.cgst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                             <td>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.sgst} 
                                     onChange={(e) => handleRowChange(row.id, 'sgst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.sgst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                             <td>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.igst} 
                                     onChange={(e) => handleRowChange(row.id, 'igst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.igst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                            <td>
                              <select className="form-select form-select-sm" value={row.glId} onChange={(e) => handleRowChange(row.id, 'glId', e.target.value)}>
                                <option value="">Select an ...</option>
                                <option value="GL001">GL Master 1</option>
                              </select>
                            </td>
                            <td><textarea className="form-control form-control-sm" rows="1" value={row.remark} onChange={(e) => handleRowChange(row.id, 'remark', e.target.value)}></textarea></td>
                            <td className="text-center">
                              <button className="btn btn-sm text-dark" onClick={() => handleDeleteRow(row.id)}><FaTrash /></button>
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Orange Totals Bar */}
                  <div className="totals-bar d-flex justify-content-around text-white p-2 mb-3 rounded shadow-sm" style={{ backgroundColor: '#ff9800', fontSize: '11px' }}>
                    <div className="text-center">
                      <div className="fw-bold">Total :</div>
                      <div style={{ height: '14px' }}>{totals.basicTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Dis Tot :</div>
                      <div style={{ height: '14px' }}>0.00</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Basic Tot :</div>
                      <div style={{ height: '14px' }}>{totals.basicTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">CGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.cgstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">SGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.sgstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">IGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.igstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Total Tax :</div>
                      <div style={{ height: '14px' }}>{totals.taxTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Other Charges :</div>
                      <div style={{ height: '14px' }}>
                        {(parseFloat(footerData.packCharges || 0) + 
                          parseFloat(footerData.transCharges || 0) + 
                          parseFloat(footerData.insCharges || 0) + 
                          parseFloat(footerData.instCharges || 0) + 
                          parseFloat(footerData.otherCharges || 0)).toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Final Amount :</div>
                      <div className="fw-bold" style={{ height: '14px' }}>{totals.finalAmount}</div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-section p-2 border rounded bg-white shadow-sm" style={{ fontSize: '11px' }}>
                    <div className="row g-2">
                      {/* TOC Column */}
                      <div className="col-md-3 border-end pe-2">
                        {[
                          { label: 'Pack. & Fwrd Charges :', key: 'packCharges' },
                          { label: 'Transport Charges :', key: 'transCharges' },
                          { label: 'Insurance :', key: 'insCharges' },
                          { label: 'Installation Charges :', key: 'instCharges' },
                          { label: 'Other Charges :', key: 'otherCharges' }
                        ].map((item, idx) => (
                          <div className="d-flex align-items-center mb-1" key={idx}>
                            <span className="me-1 text-muted" style={{ fontSize: '11px' }}>(TOC)</span>
                            <input type="checkbox" className="form-check-input me-1 mt-0" style={{ width: '12px', height: '12px' }} />
                            <label className="mb-0 flex-grow-1" style={{ fontSize: '11px' }}>{item.label}</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm py-0" 
                              style={{ width: '75px', height: '22px', fontSize: '11px' }} 
                              value={footerData[item.key]}
                              onChange={(e) => setFooterData({ ...footerData, [item.key]: e.target.value })}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Dates & Terms Column */}
                      <div className="col-md-3 border-end px-2">
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Inv./Challan Date :</label>
                          <input type="date" className="form-control form-control-sm py-0 ms-auto" value={footerData.invChallanDate} onChange={(e) => setFooterData({ ...footerData, invChallanDate: e.target.value })} style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Payment TermDays :</label>
                          <input type="text" className="form-control form-control-sm py-0 ms-auto" value={footerData.paymentTermDays} onChange={(e) => setFooterData({ ...footerData, paymentTermDays: e.target.value })} style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div className="d-flex align-items-center gap-1" style={{ width: '180px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ width: '12px', height: '12px' }} />
                            <label className="mb-0" style={{ fontSize: '10px' }}>TDS :</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm py-0" 
                              style={{ width: '35px', height: '20px', fontSize: '10px' }} 
                              value={footerData.tdsPer}
                              onChange={(e) => setFooterData({ ...footerData, tdsPer: e.target.value })}
                            />
                            <select className="form-select form-select-sm py-0" style={{ width: '70px', height: '20px', fontSize: '10px' }}>
                              <option>Select</option>
                            </select>
                          </div>
                          <input type="text" className="form-control form-control-sm py-0 ms-auto" style={{ width: '110px', height: '20px', fontSize: '10px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Sub Total :</label>
                          <input type="text" className="form-control form-control-sm py-0 ms-auto" style={{ width: '110px', height: '20px', fontSize: '10px' }} value={totals.basicTotal} readOnly />
                        </div>
                      </div>

                      {/* Invoice & Other Column */}
                      <div className="col-md-3 border-end px-2">
                          <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Inv./Challan No :</label>
                          <input type="text" className="form-control form-control-sm py-0" value={footerData.invChallanNo} onChange={(e) => setFooterData({ ...footerData, invChallanNo: e.target.value })} style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Payment Date :</label>
                          <input type="date" className="form-control form-control-sm py-0" value={footerData.paymentDate} onChange={(e) => setFooterData({ ...footerData, paymentDate: e.target.value })} style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Other Amount :</label>
                          <input type="text" className="form-control form-control-sm py-0" defaultValue="0" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Assable Value :</label>
                          <input type="text" className="form-control form-control-sm py-0" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                      </div>

                      {/* Posting & Total Column */}
                      <div className="col-md-3 ps-2">
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Posting Date :</label>
                          <input type="date" className="form-control form-control-sm py-0" defaultValue="2026-05-09" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div className="d-flex align-items-center" style={{ width: '100px' }}>
                            <label className="mb-0">Round Off Amt:</label>
                            <input type="checkbox" className="form-check-input mt-0 ms-1" style={{ width: '12px', height: '12px' }} />
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-1" style={{ fontSize: '10px' }}>+ / -</span>
                            <input type="text" className="form-control form-control-sm py-0" style={{ width: '90px', height: '20px', fontSize: '10px' }} defaultValue="0" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div style={{ width: '100px' }}></div>
                          <select className="form-select form-select-sm py-0" style={{ width: '110px', height: '20px', fontSize: '10px' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0" style={{ width: '100px' }}>Net TOTAL :</label>
                          <input type="text" className="form-control form-control-sm py-0 fw-bold" style={{ width: '110px', height: '20px', fontSize: '10px' }} value={totals.finalAmount} readOnly />
                        </div>
                         <div className="d-flex justify-content-end mt-2">
                          <button 
                            className="btn btn-sm btn-light border d-flex align-items-center gap-2 shadow-sm px-4 py-2" 
                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                            onClick={() => setShowConfirmModal(true)}
                          >
                            <span className="text-success fw-bold">✔</span> Confirm To Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Modal */}
                    {showConfirmModal && (
                      <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                          <div className="custom-modal-header d-flex justify-content-between align-items-center">
                            <span>Message</span>
                            <button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                          </div>
                          <div className="custom-modal-body p-3">
                            <div className="row mb-3 border-bottom pb-2">
                              <div className="col-md-5">
                                <div className="d-flex mb-1">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Supp Name :</span>
                                  <span>{newRow.supplierName}</span>
                                </div>
                                <div className="d-flex">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Bill No :</span>
                                  <span>{footerData.invChallanNo || "262700105"}</span>
                                </div>
                              </div>
                              <div className="col-md-7 text-end">
                                <div className="d-flex justify-content-end">
                                  <span className="fw-bold me-2">Bill Date :</span>
                                  <span>{new Date().toLocaleDateString('en-GB')}</span>
                                </div>
                              </div>
                            </div>

                            <div className="table-responsive mb-3">
                              <table className="table table-bordered table-sm modal-summary-table">
                                <thead className="bg-light">
                                  <tr>
                                    <th>No.</th>
                                    <th>ItemCode</th>
                                    <th>ItemDesc</th>
                                    <th>HSN Code</th>
                                    <th>Total</th>
                                    <th>CGSTAmt</th>
                                    <th>SGSTAmt</th>
                                    <th>IGSTAmt</th>
                                    <th>GLName</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map((row, idx) => (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{row.itemCode}</td>
                                      <td>{row.itemCode}</td>
                                      <td>{row.hsnCode}</td>
                                      <td>{row.total.toFixed(2)}</td>
                                      <td>{(row.total * (row.cgst / 100)).toFixed(2)}</td>
                                      <td>{(row.total * (row.sgst / 100)).toFixed(2)}</td>
                                      <td>{(row.total * (row.igst / 100)).toFixed(2)}</td>
                                      <td>{row.glId || "Purchase Rm"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="modal-summary-footer p-2 border rounded">
                              <div className="row g-2 text-center" style={{ fontSize: '11px' }}>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Basic Tot :</div>{totals.basicTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">CGST Amt :</div>{totals.cgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">SGST Amt :</div>{totals.sgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">IGST Amt :</div>{totals.igstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Bill Amt :</div>{totals.finalAmount}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">TDS :</div>0</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Other :</div>0</div>
                                <div className="col bg-primary text-white py-1 rounded">
                                  <div className="fw-bold mb-1">Final Total :</div>
                                  <div className="h6 mb-0">{totals.finalAmount}</div>
                                </div>
                                <div className="col-auto d-flex align-items-center gap-2">
                                  <button className="btn btn-sm btn-light border fw-bold" onClick={handleSaveBill}>Save BILL</button>
                                  <button className="btn btn-sm btn-light border fw-bold" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remark Row */}
                    <div className="row g-0 align-items-center mt-1 pt-2 border-top">
                      <div className="col-auto me-2">
                        <label className="fw-bold" style={{ fontSize: '11px' }}>Remark :</label>
                      </div>
                       <div className="col-md-6">
                        <textarea className="form-control form-control-sm" rows="2" style={{ resize: 'none', height: '40px', fontSize: '11px' }} placeholder="Enter any additional remarks..." value={footerData.remark} onChange={(e) => setFooterData({ ...footerData, remark: e.target.value })}></textarea>
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

export default DirectBill;
