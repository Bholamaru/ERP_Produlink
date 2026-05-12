import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseRegister.css";
import { FaFileExcel, FaSearch, FaEye, FaEdit, FaTrash, FaFileAlt, FaExclamationTriangle, FaCheck } from "react-icons/fa";

const PurchaseRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [data, setData] = useState([
    { sr: 1, year: "26-27", billNo: "PUR262700104", billDate: "06/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "262700361", challanDate: "04/05/2026", poNo: "262700002", grnNo: "GRN 262700697", code: "54", supplier: "SHAKAMBHARI ENTERPRISES", assAmt: "1,942,725.72", totalAmt: "2,292,416.34", user: "more" },
    { sr: 2, year: "26-27", billNo: "PUR262700103", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "262700354", challanDate: "03/05/2026", poNo: "262700002", grnNo: "GRN 262700641", code: "54", supplier: "SHAKAMBHARI ENTERPRISES", assAmt: "529,926.26", totalAmt: "625,313.00", user: "more" },
    { sr: 3, year: "26-27", billNo: "PUR262700102", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "278", challanDate: "02/05/2026", poNo: "262700001", grnNo: "GRN 262700623", code: "S0053", supplier: "VISHWA SAMRUDHI INDUSTRIES", assAmt: "124,815.00", totalAmt: "147,871.70", user: "more" },
    { sr: 4, year: "26-27", billNo: "PUR262700101", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "3048010010490", challanDate: "25/04/2026", poNo: "262700004", grnNo: "GRN 262700452", code: "S0052", supplier: "TUBE INVESTMENT OF INDIA LTD", assAmt: "185,802.79", totalAmt: "219,247.29", user: "more" },
    { sr: 5, year: "26-27", billNo: "PUR262700100", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "3048010010423", challanDate: "21/04/2026", poNo: "262700004", grnNo: "GRN 262700356", code: "S0052", supplier: "TUBE INVESTMENT OF INDIA LTD", assAmt: "433,529.19", totalAmt: "511,564.45", user: "more" },
    { sr: 6, year: "26-27", billNo: "PUR262700099", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "skf/26-27/00122", challanDate: "03/05/2026", poNo: "262700006", grnNo: "GRN 262700635", code: "S0051", supplier: "S K FASTENERS", assAmt: "29,300.00", totalAmt: "34,574.00", user: "more" },
    { sr: 7, year: "26-27", billNo: "PUR262700098", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "26-27/0229", challanDate: "03/05/2026", poNo: "262700001", grnNo: "GRN 262700627", code: "S0053", supplier: "VISHWA SAMRUDHI INDUSTRIES", assAmt: "731,185.00", totalAmt: "866,102.30", user: "more" },
    { sr: 8, year: "26-27", billNo: "PUR262700097", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "3048010010208", challanDate: "09/04/2026", poNo: "262700004", grnNo: "GRN 262700150", code: "S0052", supplier: "TUBE INVESTMENT OF INDIA LTD", assAmt: "382,132.42", totalAmt: "450,916.26", user: "more" },
    { sr: 9, year: "26-27", billNo: "PUR262700096", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "26-27/0212", challanDate: "30/03/2026", poNo: "262700001", grnNo: "GRN 262700540", code: "S0053", supplier: "VISHWA SAMRUDHI INDUSTRIES", assAmt: "20,430.00", totalAmt: "24,107.40", user: "more" },
    { sr: 10, year: "26-27", billNo: "PUR262700095", billDate: "04/05/2026", type: "Purchase", billType: "PO-GRN-BILL", challanNo: "26-27/0198", challanDate: "28/03/2026", poNo: "262700001", grnNo: "GRN 262700420", code: "S0053", supplier: "VISHWA SAMRUDHI INDUSTRIES", assAmt: "15,200.00", totalAmt: "17,936.00", user: "more" },
  ]);

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
    <div className="purchase-register">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="register-container">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title text-start mb-0">
                          Purchase Register
                        </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1">
                          <i className="fa fa-search-plus"></i> Purchase Register Query
                        </button>
                        <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1">
                          <i className="fa fa-list"></i> Purchase Register Details
                        </button>
                        <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1">
                          <FaFileExcel /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="d-flex align-items-end gap-3 flex-wrap text-start">
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">From Date:</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-04-08" />
                      </div>
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">To Date:</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                      </div>
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">Bill Type :</label>
                        <select className="form-select form-select-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">Type :</label>
                        <select className="form-select form-select-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">Item Type :</label>
                        <select className="form-select form-select-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div style={{ minWidth: '120px' }}>
                        <label className="form-label mb-1 small fw-bold">Item Group :</label>
                        <select className="form-select form-select-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div style={{ minWidth: '100px' }}>
                        <label className="form-label mb-1 small fw-bold">GST :</label>
                        <select className="form-select form-select-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="d-flex gap-1 align-items-end">
                        <button className="btn btn-info btn-sm text-white d-flex align-items-center gap-1 px-3" style={{ height: '32px', backgroundColor: '#0dcaf0', borderColor: '#0dcaf0' }}>
                          <FaSearch size={10} /> Search
                        </button>
                        <button className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-3 text-nowrap" style={{ height: '32px' }}>
                          <FaSearch size={10} /> Search Option
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive shadow-sm border rounded bg-white table-scroll-container">
                    <table className="table table-bordered table-hover mb-0 custom-register-table">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Year</th>
                          <th>Bill (P) No.</th>
                          <th>Bill (P) Date</th>
                          <th>Type</th>
                          <th>Bill Type</th>
                          <th>Challan No</th>
                          <th>Challan Date</th>
                          <th>PO No</th>
                          <th>GRN No</th>
                          <th>Code</th>
                          <th>Supplier/Vendor Name</th>
                          <th>Ass Amt.</th>
                          <th>Total Amt.</th>
                          <th>User</th>
                          <th>Auth</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Del</th>
                          <th>Doc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((row, index) => (
                            <tr key={index}>
                              <td>{row.sr}</td>
                              <td>{row.year}</td>
                              <td>{row.billNo}</td>
                              <td>{row.billDate}</td>
                              <td>{row.type}</td>
                              <td>{row.billType}</td>
                              <td>{row.challanNo}</td>
                              <td>{row.challanDate}</td>
                              <td>{row.poNo}</td>
                              <td>{row.grnNo}</td>
                              <td>{row.code}</td>
                              <td className="text-start">{row.supplier}</td>
                              <td className="text-end">{row.assAmt}</td>
                              <td className="text-end">{row.totalAmt}</td>
                              <td>{row.user}</td>
                              <td className="text-center">
                                {index % 3 === 0 ? (
                                  <div className="badge bg-success p-1"><FaCheck /></div>
                                ) : (
                                  <div className="badge bg-warning p-1"><FaExclamationTriangle /></div>
                                )}
                              </td>
                              <td className="text-center">
                                <FaEye className="text-primary cursor-pointer" />
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaEdit />
                                </button>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaTrash />
                                </button>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm">
                                  <FaFileAlt />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="20" className="text-center py-5 text-muted">
                              No records found for the selected criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="register-footer mt-2 p-2 bg-light border d-flex justify-content-between align-items-center small fw-bold">
                    <div>Total Record's : {data.length}</div>
                    <div>Total Amt : 6,53,48,404.87</div>
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

export default PurchaseRegister;
