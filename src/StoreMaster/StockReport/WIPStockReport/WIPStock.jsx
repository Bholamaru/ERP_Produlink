"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./WIPStock.css";
import axios from "axios";
import { FaEye } from "react-icons/fa";

const WIPStock = () => {
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

  // Search API Table

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/Store/api/WIPstockreport/?q=${value}`
      );
      setSearchResults(res.data.data || []);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchResults([]);
    }
  };

  const handleSelectItem = async (item) => {
    const fullItemDisplay = `${item.part_code} | ${item.part_no} | ${item.Name_Description}`;
    setSearchTerm(fullItemDisplay);
    setSearchResults([]);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/Store/api/WIPstockreport/?q=${item.part_no}`
      );

      const allItems = res.data.data || [];

      const exactItems = allItems.filter(
        (dataItem) => dataItem.part_no === item.part_no
      );
      setItems(exactItems);

      setTotals(res.data.totals || {});
    } catch (error) {
      console.error("Error fetching item details", error);
    }
  };

  const handleViewHeatDetails = async (item) => {
    if (!item) return;

    setSelectedItem(item);
    setModalData([]);
    setShowModal(true);

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/Production/item/op/heatqty/?item=${item.part_code}`
      );

      const data = res.data;

      let finalDisplayData = [];

      const currentOp = parseInt(item.OPNo) || 0;

      const targetPrefix = `${currentOp}|`;

      const foundKey = Object.keys(data).find(key => key.startsWith(targetPrefix));

      if (foundKey) {

        const heatDataObj = data[foundKey] || {};

        finalDisplayData = Object.entries(heatDataObj).map(([heatNo, qty]) => ({
          display_heat: heatNo,  // Key ban gayi Heat No
          display_qty: qty
        }));
      }

      setModalData(finalDisplayData);

    } catch (error) {
      console.error("Error fetching heat details", error);
      setModalData([]);
    }
  };


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setModalData([]);
    setSelectedItem(null);
  };

  return (
    <div className="WIPStock">
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
                <div className="WIPStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        WIP Stock Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      {/* <div className="row justify-content-end">
                        <div className="col-md-3 d-flex align-items-end"> */}
                      <Link type="button" className="vndrbtn">
                        Export To Excel
                      </Link>
                      <Link type="button" className="vndrbtn">
                        WIP-Under Decaration Stock
                      </Link>
                      <Link type="button" className="vndrbtn">
                        WIP Delewise Stock
                      </Link>
                      {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="WIPStock-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="g-3 text-start">
                          <div className="row">
                            {/* Plant */}
                            <div className="col-md-2 col-sm-6">
                              <label className="form-label">Store</label>
                              <select className="form-select">
                                <option value="Produlink">Main Store</option>
                                {/* Add more options here */}
                              </select>
                            </div>

                            {/* Search PartName  */}
                            <div className="col-md-3 col-sm-6 position-relative">
                              <label className="form-label">
                                Search Item No Code Desc
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by Part Code | No | Description"
                              />
                              {searchResults.length > 0 && (
                                <ul
                                  className="list-group position-absolute w-100"
                                  style={{
                                    zIndex: 1000,
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {searchResults.map((item, index) => (
                                    <li
                                      key={index}
                                      className="list-group-item list-group-item-action"
                                      style={{
                                        cursor: "pointer",
                                        padding: "8px 12px",
                                      }}
                                      onClick={() => handleSelectItem(item)}
                                    >
                                      {item.Part_Code} | {item.part_no} |{" "}
                                      {item.Name_Description}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button
                                type="button"
                                className="vndrbtn w-100"
                                style={{ marginTop: "35px" }}
                              // onClick={handleSearch}
                              >
                                Search
                              </button>
                            </div>

                            {/* End First */}

                            <div className="col-md-3 col-sm-6">
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  alignItems: "center",
                                }}
                              >
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  Heat No
                                </label>
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="stockLevel"
                                    value=""
                                  />
                                  All
                                </label>
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="stockLevel"
                                    value=""
                                  />
                                  In Stock
                                </label>
                              </div>
                              <select className="form-select">
                                <option value="Produlink"> </option>
                                {/* Add more options here */}
                              </select>
                            </div>

                            <div className="col-md-1 col-sm-6 ">
                              <button
                                type="submit"
                                className="vndrbtn  w-100"
                                style={{ marginTop: "30px" }}
                              >
                                Clear
                              </button>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-md-3 col-sm-6">
                              <label className="form-label">Stock Level</label>
                              <br />
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  alignItems: "center",
                                }}
                              >
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="stockLevel"
                                    value=""
                                  />
                                  All Part Code
                                </label>
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="stockLevel"
                                    value=""
                                  />
                                  In Stock Part Code
                                </label>
                              </div>
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button
                                type="submit"
                                className="vndrbtn  w-100"
                                style={{ marginTop: "35px" }}
                              >
                                View
                              </button>
                            </div>

                            <div className="col-md-2 col-sm-6">
                              <label className="form-label">
                                Part Code Like
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value=""
                              />
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button
                                type="submit"
                                className="vndrbtn w-100"
                                style={{ marginTop: "35px" }}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="WIPStock-main mt-3">
                  <div className="table table-responsive table-striped mt-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Item No</th>
                          <th>Item Code</th>
                          <th>Item Description</th>
                          <th>OP No</th>
                          <th>Operation</th>
                          <th>Part Code</th>
                          <th>OK Qty</th>
                          <th>Rework Qty</th>
                          <th>Reject Qty</th>
                          <th>Pending QC</th>
                          <th>Subcon</th>
                          <th>Total</th>
                          <th>Rate</th>
                          <th>WipWt</th>
                          <th>TotalWt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.length > 0 ? (
                          <>
                            {items.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.part_no}</td>
                                <td>{item.part_code}</td>
                                <td>{item.Name_Description}</td>
                                <td>{item.OPNo}</td>
                                <td>{item.Operation || "-"}</td>
                                <td>{item.PartCode}</td>
                                <td>
                                  {item.prod_qty || 0}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <FaEye
                                      onClick={() => handleViewHeatDetails(item)}
                                      style={{ cursor: "pointer", color: "#0d6efd", fontSize: "18px" }}
                                      title="View Details"
                                    />
                                  </div>
                                </td>
                                <td>{item.rework_qty || 0}</td>
                                <td>{item.reject_qty || 0}</td>
                                <td>{item.pending_qc || 0}</td>
                                <td>{item.subcon}</td>
                                <td>{item.Total}</td>
                                <td>{item.WipRate || 0}</td>
                                <td>{item.WipWt || 0}</td>
                                <td>{item.totalwt}</td>
                              </tr>
                            ))}
                            {/* ✅ Totals Row from API */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                background: "#f1f1f1",
                              }}
                            >
                              <td colSpan="7" className="text-end">
                                Totals
                              </td>
                              <td>{totals.total_prod || 0}</td>
                              <td>{totals.total_rework || 0}</td>
                              <td>{totals.total_reject || 0}</td>
                              <td>{totals.total_pending_qc || 0}</td>
                              <td>{totals.total_subcon || 0}</td>
                              <td>{totals.total_total || 0}</td>
                              <td colSpan="3"></td>
                            </tr>
                          </>
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>

            {/* Modal for Heat Details */}
            {showModal && (
              <>
                <div
                  className="modal-backdrop fade show"
                  onClick={handleBackdropClick}
                  style={{ zIndex: 1040 }}
                ></div>
                <div
                  className="modal fade show"
                  style={{ display: "block", zIndex: 1050 }}
                  tabIndex="-1"
                  onClick={handleBackdropClick}
                >
                  <div
                    className="modal-dialog modal-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <div>
                          <h5 className="header-title text-start md-1">Stock & Heat Details</h5>
                          {selectedItem && (
                            <small className="text-muted">
                              Item: {selectedItem.part_no} | OP: {selectedItem.OPNo}
                            </small>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeModal}
                          aria-label="Close"
                        > X </button>
                      </div>
                      <div className="modal-body">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="table-light">
                              <tr>
                                <th>Sr No.</th>
                                <th>Heat No / Lot No</th>
                                <th>Qty / Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modalData.length > 0 ? (
                                modalData.map((row, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.display_heat ? row.display_heat : "-"}</td>
                                    <td>{row.display_qty !== undefined && row.display_qty !== null ? row.display_qty : "0"}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center p-3 text-muted">
                                    No Data Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WIPStock;
