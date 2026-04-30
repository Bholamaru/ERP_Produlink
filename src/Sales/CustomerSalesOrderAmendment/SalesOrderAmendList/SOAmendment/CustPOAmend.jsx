import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./CustPOAmend.css";
import { 
  PlusCircle, 
  RefreshCcw, 
  RotateCcw, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  MoreVertical
} from "lucide-react";

const CustPOAmend = () => {
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
    <div className="CustPOAmendMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`} style={{ paddingTop: '60px' }}>
                
                {/* Header Section */}
                <div className="CustPOAmend-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h5 className="header-title">Customer Po Amendment</h5>
                    <div className="header-series-section">
                      <label>Series :</label>
                      <select>
                        <option>Select</option>
                        <option>SO Amendment</option>
                      </select>
                    </div>
                  </div>

                  <Link to="/SalesOrderAmendList" className="btn-list-view">
                    <ArrowLeft size={14} />
                    SO Amendment List
                  </Link>
                </div>

                <div className="CustPOAmend-Main">
                  {/* Compact Form Container */}
                  <div className="compact-form-container">
                    <div className="form-row-header">
                      <div className="form-group-compact w-amd-no">
                        <label>Amd No :</label>
                        <div className="d-flex gap-1">
                          <input type="text" className="form-control" placeholder="" />
                          <button className="btn p-0 border-0"><RefreshCcw size={14} color="#64748b" /></button>
                        </div>
                      </div>

                      <div className="form-group-compact w-date">
                        <label>Amd Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-04-30" />
                      </div>

                      <div className="form-group-compact w-customer">
                        <label>Customer :</label>
                        <input type="text" className="form-control" placeholder="Enter Name.." />
                      </div>

                      <div className="form-group-compact w-po-no">
                        <label>PO No :</label>
                        <select className="form-control">
                          <option>Select an Option</option>
                        </select>
                      </div>

                      <div className="amend-type-container">
                        <label className="form-label mb-0" style={{ fontSize: '11px', fontWeight: '600', color: '#475569' }}>Amend Type :</label>
                        <div className="radio-group">
                          <div><input type="radio" name="amdType" id="rate" defaultChecked /><label htmlFor="rate">Rate</label></div>
                          <div><input type="radio" name="amdType" id="qty" /><label htmlFor="qty">Qty</label></div>
                          <div><input type="radio" name="amdType" id="close" /><label htmlFor="close">Close</label></div>
                          <div><input type="radio" name="amdType" id="poDate" /><label htmlFor="poDate">PO Date</label></div>
                          <button className="btn-add-row">
                            <PlusCircle size={14} /> Add {">>"}
                          </button>
                        </div>
                      </div>

                      <div className="form-group-compact w-rev-no">
                        <label>Rev No :</label>
                        <div className="d-flex align-items-center">
                          <span className="rev-indicator"></span>
                        </div>
                      </div>

                      <div className="form-group-compact w-ref">
                        <label>Ref :</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="form-group-compact w-date">
                        <label>Ref Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-04-30" />
                      </div>

                      <div className="form-group-compact w-narration">
                        <label>Narration :</label>
                        <textarea className="form-control remark-input" style={{ height: '26px' }}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="blue-gradient-header">
                          <tr>
                            <th>Sr.</th>
                            <th>Cust Po No</th>
                            <th>PO Date</th>
                            <th>Item No</th>
                            <th>Item Code</th>
                            <th style={{ width: '30%' }}>Item Description</th>
                            <th>Old Rate</th>
                            <th>New Rate</th>
                            <th>Eff Date</th>
                            <th>Remark / Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">1</td>
                            <td>
                              <div style={{ fontWeight: '500' }}>1900008542</div>
                              <div className="line-no-cell">PO Line No : 10</div>
                            </td>
                            <td className="text-center">11/12/2023</td>
                            <td className="text-center">FG1469</td>
                            <td className="text-center">B2EH149020</td>
                            <td>END CONNECTOR FRONT-KTM E2</td>
                            <td className="old-rate-cell">21.79</td>
                            <td><input type="text" className="new-rate-input" defaultValue="0" /></td>
                            <td>
                              <div className="d-flex align-items-center gap-1">
                                <input type="text" className="eff-date-input" />
                                <Calendar size={14} color="#64748b" />
                              </div>
                            </td>
                            <td><textarea className="remark-input"></textarea></td>
                          </tr>
                          <tr>
                            <td className="text-center">2</td>
                            <td>
                              <div style={{ fontWeight: '500' }}>1900008542</div>
                              <div className="line-no-cell">PO Line No : 20</div>
                            </td>
                            <td className="text-center">11/12/2023</td>
                            <td className="text-center">FG1468</td>
                            <td className="text-center">B2EH149020</td>
                            <td>END CONNECTOR REAR-KTM E2</td>
                            <td className="old-rate-cell">21.79</td>
                            <td><input type="text" className="new-rate-input" defaultValue="0" /></td>
                            <td>
                              <div className="d-flex align-items-center gap-1">
                                <input type="text" className="eff-date-input" />
                                <Calendar size={14} color="#64748b" />
                              </div>
                            </td>
                            <td><textarea className="remark-input"></textarea></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer Buttons */}
                <div className="CustPOAmend-footer">
                  <button className="btn-footer btn-clear">
                    <RotateCcw size={16} />
                    Clear
                  </button>
                  <button className="btn-footer btn-submit">
                    <CheckCircle2 size={16} color="#10b981" />
                    Create Po Amendment
                  </button>
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustPOAmend;