import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./DirectBill.css";
import { FaPlus, FaTrash, FaSearch, FaCheck, FaFileExcel } from "react-icons/fa";

const DirectBill = () => {
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
  });

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
    let finalAmount = basicTotal + taxTotal + parseFloat(footerData.otherAmount || 0);

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
                          <input type="text" className="form-control form-control-sm" style={{ width: '90px', height: '28px' }} />
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
                              <div className="d-flex align-items-center justify-content-center">
                                <input type="number" className="form-control form-control-sm text-center" style={{ width: '60px' }} value={row.dis} onChange={(e) => handleRowChange(row.id, 'dis', e.target.value)} />
                                <span className="ms-1 small">%</span>
                              </div>
                            </td>
                            <td><input type="number" className="form-control form-control-sm text-end border-0 bg-transparent fw-bold" readOnly value={row.total.toFixed(2)} /></td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                <input type="number" className="form-control form-control-sm text-center" style={{ width: '60px' }} value={row.cgst} onChange={(e) => handleRowChange(row.id, 'cgst', e.target.value)} />
                                <span className="ms-1 small">%</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                <input type="number" className="form-control form-control-sm text-center" style={{ width: '60px' }} value={row.sgst} onChange={(e) => handleRowChange(row.id, 'sgst', e.target.value)} />
                                <span className="ms-1 small">%</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                <input type="number" className="form-control form-control-sm text-center" style={{ width: '60px' }} value={row.igst} onChange={(e) => handleRowChange(row.id, 'igst', e.target.value)} />
                                <span className="ms-1 small">%</span>
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
                      <div style={{ height: '14px' }}>{footerData.otherAmount}</div>
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
                          { label: 'Pack. & Fwrd Charges :', key: 'pack' },
                          { label: 'Transport Charges :', key: 'trans' },
                          { label: 'Insurance :', key: 'ins' },
                          { label: 'Installation Charges :', key: 'inst' },
                          { label: 'Other Charges :', key: 'oth' }
                        ].map((item, idx) => (
                          <div className="d-flex align-items-center mb-1" key={idx}>
                            <span className="me-1 text-muted" style={{ fontSize: '11px' }}>(TOC)</span>
                            <input type="checkbox" className="form-check-input me-1 mt-0" style={{ width: '12px', height: '12px' }} />
                            <label className="mb-0 flex-grow-1" style={{ fontSize: '11px' }}>{item.label}</label>
                            <input type="text" className="form-control form-control-sm py-0" style={{ width: '75px', height: '22px', fontSize: '11px' }} />
                          </div>
                        ))}
                      </div>

                      {/* Dates & Terms Column */}
                      <div className="col-md-3 border-end px-2">
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Inv./Challan Date :</label>
                          <input type="date" className="form-control form-control-sm py-0 ms-auto" defaultValue="2026-05-09" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Payment TermDays :</label>
                          <input type="text" className="form-control form-control-sm py-0 ms-auto" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div className="d-flex align-items-center gap-1" style={{ width: '180px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ width: '12px', height: '12px' }} />
                            <label className="mb-0" style={{ fontSize: '10px' }}>TDS :</label>
                            <input type="text" className="form-control form-control-sm py-0" style={{ width: '35px', height: '20px', fontSize: '10px' }} defaultValue="0" />
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
                          <input type="text" className="form-control form-control-sm py-0" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Payment Date :</label>
                          <input type="date" className="form-control form-control-sm py-0" defaultValue="2026-05-09" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
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
                          <button className="btn btn-sm btn-light border d-flex align-items-center gap-2 shadow-sm px-4 py-2" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            <span className="text-success fw-bold">✔</span> Confirm To Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remark Row */}
                    <div className="row g-0 align-items-center mt-1 pt-2 border-top">
                      <div className="col-auto me-2">
                        <label className="fw-bold" style={{ fontSize: '11px' }}>Remark :</label>
                      </div>
                      <div className="col-md-6">
                        <textarea className="form-control form-control-sm" rows="2" style={{ resize: 'none', height: '40px', fontSize: '11px' }} placeholder="Enter any additional remarks..."></textarea>
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
