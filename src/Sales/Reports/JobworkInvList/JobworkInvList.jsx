
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInvList.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const JobworkInvList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://erp-render.onrender.com/Sales/gst-jobwork-invoice/");
      if (response.ok) {
        const data = await response.json();
        setInvoiceData(data);
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const totalRecords = invoiceData.length;
  const totalQty = invoiceData.reduce((sum, inv) => {
    const qty = inv.items && inv.items.length > 0 ? parseFloat(inv.items[0].invoice_qty_nos) : 0;
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0);
  const assessableValue = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.assessable_value ? parseFloat(inv.gst_details.assessable_value) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const cgstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.cgst_amt ? parseFloat(inv.gst_details.cgst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const sgstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.sgst_amt ? parseFloat(inv.gst_details.sgst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const igstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.igst_amt ? parseFloat(inv.gst_details.igst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const totalAmount = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.gr_total ? parseFloat(inv.gst_details.gr_total) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const formatCurrency = (val) => {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="JobworkInvListMaster">
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
                <div className="JobworkInvList">
                  <div className="JobworkInvList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Jobwork Invoice List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '3px' }}>
                          <button
                            style={{ padding: '5px' }}
                            className="BOMRouting vndrbtn"
                            onClick={toggleDropdown}
                          >
                            Job-Work Invoice : Report  ▼
                          </button>

                          {dropdownOpen && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                display: 'block',
                                minWidth: '10rem',
                                padding: '0.5rem 0',
                                margin: '0.125rem 0 0',
                                fontSize: '12px',
                                color: '#212529',
                                textAlign: 'left',
                                listStyle: 'none',
                                backgroundColor: '#fff',
                                backgroundClip: 'padding-box',
                              }}
                            >
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/"}>
                                  Export-Excel
                                </Link>
                              </li>
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/JobWorkSalesRegister"}>
                                  Job-Work Sales Register
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>

                        <button type="button" className=" vndrbtn">
                          Jobwork Inv Query
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="JobworkInvList-Main">
                    <div className="container-fluid">

                      <div className="d-flex align-items-end gap-2 flex-nowrap text-start" style={{ overflowX: 'auto', paddingBottom: '5px' }}>
                        
                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '105px' }}>
                          <div style={{ height: '22px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>FromDate :</label>
                          </div>
                          <input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }} />
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '105px' }}>
                          <div style={{ height: '22px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>To Date :</label>
                          </div>
                          <input type="date" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }} />
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '85px' }}>
                          <div style={{ height: '22px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>Plant :</label>
                          </div>
                          <select className="form-select form-select-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }}>
                            <option value="">Produlink</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '130px' }}>
                          <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: '22px', paddingLeft: '1.5em', paddingBottom: '2px' }}>
                            <input type="checkbox" className="form-check-input mt-0" id="chkCustomerName" style={{ width: '12px', height: '12px', margin: 0 }} />
                            <label htmlFor="chkCustomerName" className="form-check-label" style={{ fontSize: '11px', fontWeight: 'bold', margin: 0, marginTop: '1px' }}>Customer Name :</label>
                          </div>
                          <input type="text" placeholder="Cust Name..." className="form-control form-control-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }} />
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '100px' }}>
                          <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: '22px', paddingLeft: '1.5em', paddingBottom: '2px' }}>
                            <input type="checkbox" className="form-check-input mt-0" id="chkInvNo" style={{ width: '12px', height: '12px', margin: 0 }} />
                            <label htmlFor="chkInvNo" className="form-check-label" style={{ fontSize: '11px', fontWeight: 'bold', margin: 0, marginTop: '1px' }}>Invoice No :</label>
                          </div>
                          <input type="text" placeholder="Inv No..." className="form-control form-control-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }} />
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '100px' }}>
                          <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: '22px', paddingLeft: '1.5em', paddingBottom: '2px' }}>
                            <input type="checkbox" className="form-check-input mt-0" id="chkItemGrp" style={{ width: '12px', height: '12px', margin: 0 }} />
                            <label htmlFor="chkItemGrp" className="form-check-label" style={{ fontSize: '11px', fontWeight: 'bold', margin: 0, marginTop: '1px' }}>Item Group :</label>
                          </div>
                          <select className="form-select form-select-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }}>
                            <option value="">Select</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '140px' }}>
                          <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: '22px', paddingLeft: '1.5em', paddingBottom: '2px' }}>
                            <input type="checkbox" className="form-check-input mt-0" id="chkItemDesc" style={{ width: '12px', height: '12px', margin: 0 }} />
                            <label htmlFor="chkItemDesc" className="form-check-label" style={{ fontSize: '11px', fontWeight: 'bold', margin: 0, marginTop: '1px' }}>Item No / Desc :</label>
                          </div>
                          <input type="text" placeholder="" className="form-control form-control-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }} />
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '65px' }}>
                          <div style={{ height: '22px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>Cancel :</label>
                          </div>
                          <select className="form-select form-select-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }}>
                            <option value="">ALL</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ minWidth: '65px' }}>
                          <div style={{ height: '22px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>Ackn. :</label>
                          </div>
                          <select className="form-select form-select-sm" style={{ fontSize: '11px', padding: '2px 4px', height: '28px', margin: 0 }}>
                            <option value="">ALL</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column justify-content-end" style={{ paddingBottom: '0px' }}>
                          <button type="button" className="btn btn-light border btn-sm" style={{ fontSize: '11px', padding: '2px 8px', height: '28px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', margin: 0 }}>
                            <i className="fas fa-search" style={{ fontSize: '10px' }}></i> Search
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="JobworkInvList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Inv No</th>
                          <th scope="col"> Inv Date</th>
                          <th scope="col"> Order No </th>
                          <th scope="col">Order Date</th>
                          <th scope="col">Cust Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Item NO | Desc | Qty </th>
                          <th scope="col">Qty </th>
                          <th scope="col">Ass Amt </th>
                          <th scope="col">Total Amt </th>
                          <th scope="col">User </th>
                          <th scope="col"> IRN </th>
                          <th scope="col"> Ack </th>
                          <th scope="col"> EWB </th>
                          <th scope="col"> Email </th>
                          <th scope="col"> Cancel </th>
                          <th scope="col"> Edit </th>
                          <th scope="col"> View </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="21" className="text-center py-4">Loading data...</td>
                          </tr>
                        ) : invoiceData.length > 0 ? (
                          invoiceData.map((inv, index) => {
                            const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : null;
                            const itemDesc = firstItem 
                              ? `${firstItem.item_code} | ${firstItem.description} | Rate : ${firstItem.jobwork_rate} | Qty : ${firstItem.invoice_qty_nos} ${firstItem.rate_type || 'NOS'}` 
                              : '';
                              
                            return (
                              <tr key={inv.id || index}>
                                <td>{index + 1}</td>
                                <td>25-26</td>
                                <td>{inv.plant}</td>
                                <td>{inv.invoice_no}</td>
                                <td>{inv.invoice_date}</td>
                                <td>{firstItem?.po_no || ''}</td>
                                <td>{firstItem?.line_podt || ''}</td>
                                <td>{inv.addr_code || ''}</td>
                                <td>{inv.bill_to_cust}</td>
                                <td>{itemDesc}</td>
                                <td>{firstItem?.invoice_qty_nos || 0}</td>
                                <td>{inv.gst_details?.assessable_value || '0.00'}</td>
                                <td>{inv.gst_details?.gr_total || '0.00'}</td>
                                <td>prakash</td>
                                <td>True</td>
                                <td className="text-danger text-center"><i className="fas fa-times-circle"></i></td>
                                <td className="text-center"><span className="text-primary fw-bold" style={{ fontSize: '10px' }}>www</span></td>
                                <td className="text-center"><i className="fas fa-envelope text-secondary"></i> 0</td>
                                <td className="text-center"><span className="badge bg-primary rounded-1">N</span></td>
                                <td className="text-center"><i className="fas fa-edit text-dark" style={{ cursor: 'pointer' }}></i></td>
                                <td className="text-center"><i className="fas fa-eye text-dark" style={{ cursor: 'pointer' }}></i></td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="21" className="text-center py-4">No records found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Downside Footer section */}
                  <div className="JobworkInvList-footer d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f4f4f4', padding: '10px 15px', borderTop: '2px solid #ddd', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                    <div>
                      Total Record's : {totalRecords}
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <span>Total Qty : {totalQty}</span>
                      <span>Assessable Value : {formatCurrency(assessableValue)}</span>
                      <span>CGST : {formatCurrency(cgstTotal)}</span>
                      <span>SGST : {formatCurrency(sgstTotal)}</span>
                      <span>IGST : {formatCurrency(igstTotal)}</span>
                      <span>Total Amount : {formatCurrency(totalAmount)}</span>
                      <div className="d-flex align-items-center gap-2 text-primary" style={{ fontSize: '12px' }}>
                        <div className="form-check form-check-inline mb-0 me-2">
                          <input className="form-check-input" type="radio" name="footerOptions" id="reportOption" defaultChecked style={{ marginTop: '2px' }} />
                          <label className="form-check-label text-primary" htmlFor="reportOption" style={{ fontWeight: 'bold', fontSize: '12px' }}>Report</label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input className="form-check-input" type="radio" name="footerOptions" id="tagOption" style={{ marginTop: '2px' }} />
                          <label className="form-check-label text-primary" htmlFor="tagOption" style={{ fontWeight: 'bold', fontSize: '12px' }}>Tag</label>
                        </div>
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
  )
}


export default JobworkInvList