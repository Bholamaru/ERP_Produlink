import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./RMStock.css";
import { FaEye } from "react-icons/fa";

const OurVendorStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Filter form fields
  const [filters, setFilters] = useState({
    plant: "Produlink",
    store: "Main Store",
    group: "All",
    itemGrade: "All",
    itemSection: "All",
    itemType: "All",
    itemSize: "",
    itemDesc: "",
  });

  // Data for the main table
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New state variables search  
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // State for Modal
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const handleItemSearchChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  // Search  useEffect
  useEffect(() => {
    if (filters.itemDesc.trim() === "") {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const resp = await axios.get(
            "https://erp-render.onrender.com/Store/api/grn/items/",
            { params: { q: filters.itemDesc } }
          );
          if (resp.data.success && resp.data.data) {
            setSearchResults(resp.data.data);
            setShowSuggestions(true);
          } else {
            setSearchResults([]);
          }
        } catch (err) {
          console.error("Error fetching item suggestions:", err);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };
      
      fetchItems();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters.itemDesc]);

  const handleSelectItem = (item) => {
    const isItemAlreadyAdded = rows.some(row => row.item_code === item.item_code);

    if (!isItemAlreadyAdded) {
      setRows(prevRows => [...prevRows, item]);
    } else {
      alert("This item is already in the table.");
    }
    
    setFilters(f => ({ ...f, itemDesc: '' }));
    setSearchResults([]);
    setShowSuggestions(false);
  };

  // ---  FUNCTION: 'VIEW ALL' BUTTON  ---
  const handleViewAll = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("https://erp-render.onrender.com/Store/api/grn/items/");
      if (resp.data.success && resp.data.data) {
        setRows(resp.data.data); // Table  all  data  update 
      } else {
        alert("Could not fetch all data.");
        setRows([]);
      }
    } catch (err) {
      console.error("Error fetching all items:", err);
      alert("An error occurred while fetching data.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStock = (variants) => {
    if (!variants || !Array.isArray(variants)) return 0;
    return variants.reduce((sum, v) => sum + (parseFloat(v.stock) || 0), 0);
  };

  const getHeatCount = (variants) => {
    if (!variants || !Array.isArray(variants)) return 0;
    const heatNos = variants
      .map(v => v.heat_no)
      .filter(h => h && h.trim() !== "");
    return heatNos.length;
  };

  const handleViewHeatDetails = (item) => {
    if (!item || !item.variants) {
      console.warn("No variants data available", item);
      return;
    }
    setSelectedItem(item);
    setModalData(item.variants || []);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setModalData([]);
    setSelectedItem(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="RMStock">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="RMStock-header">
                  {/* ... Header content ... */}
                   <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">RM Stock Report</h5>
                    </div>
                    <div className="col-md-9 text-end">
                      <Link className="vndrbtn me-2">Export To Excel</Link>
                      <Link className="vndrbtn">RM DataWise Stock</Link>
                    </div>
                  </div>
                </div>

                <div className="RMStock-main mt-3">
                  <div className="container-fluid">
                    <form className="row g-3 text-start">
                      {/* ... filter inputs ... */}
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Plant</label>
                        <select className="form-select" name="plant" value={filters.plant} onChange={handleChange}>
                          <option>Produlink</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Store</label>
                        <select className="form-select" name="store" value={filters.store} onChange={handleChange}>
                          <option>Main Store</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Group</label>
                        <select className="form-select" name="group" value={filters.group} onChange={handleChange}>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Grade</label>
                        <select className="form-select" name="itemGrade" value={filters.itemGrade} onChange={handleChange}>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Section</label>
                        <select className="form-select" name="itemSection" value={filters.itemSection} onChange={handleChange}>
                           <option>All</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Type</label>
                        <select className="form-select" name="itemType" value={filters.itemType} onChange={handleChange}>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Size</label>
                        <input type="text" className="form-control" name="itemSize" value={filters.itemSize} onChange={handleChange} />
                      </div>

                      <div className="col-md-3 col-sm-6" style={{ position: 'relative' }}>
                        <label className="form-label">Item/Description Search</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="itemDesc" 
                          value={filters.itemDesc} 
                          onChange={handleItemSearchChange}
                          autoComplete="off"
                          placeholder="Type to search..."
                        />
                        {showSuggestions && searchResults.length > 0 && (
                          <ul className="list-group" style={{ position: 'absolute', zIndex: 1000, width: '100%', maxHeight: '300px', overflowY: 'auto' }}>
                            {searchResults.map(item => (
                              <li
                                key={item.item_code}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleSelectItem(item)}
                                style={{ cursor: 'pointer' }}
                              >
                                <strong>{item.item_code}</strong> - {item.description}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <div className="col-md-1 col-sm-6 align-self-end mt-1">
                        <button type="button" className="vndrbtn w-100" onClick={() => setRows([])}>
                          Clear
                        </button>
                      </div>

                      {/* --- Changes--- */}
                      <div className="col-md-2 col-sm-6 align-self-end mt-1">
                        <button type="button" className="vndrbtn" onClick={handleViewAll}>
                          View All
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="StoreRMStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Code</th>
                              <th>Desc</th>
                              <th>Size</th>
                              <th>Group Name</th>
                              <th>UnitCode</th>
                              <th>Item Type</th>
                              <th>PO Rat. Qty</th>
                              <th>QC Stock</th>
                              <th>F4 Stock</th>
                              <th>ShopFloor</th>
                              <th>Stock</th>
                              <th>Heat No</th>
                              <th>Rate</th>
                              <th>Amt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r, index) => (
                              <tr key={r.item_code || index}>
                                <td>{index + 1}</td>
                                <td>{r.item_code}</td>
                                <td>{r.description}</td>
                                <td>{r.size}</td>
                                <td>{r.group_name}</td>
                                <td>{r.unit_code}</td>
                                <td>{r.item_type}</td>
                                <td>{r.po_rate_qty}</td>
                                <td>{r.qc_stock || "-"}</td>
                                <td>{r.f4_stock || "-"}</td>
                                <td>{r.shop_floor || "-"}</td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <span>{getTotalStock(r.variants)}</span>
                                    <FaEye
                                      onClick={() => handleViewHeatDetails(r)}
                                      style={{ cursor: "pointer", color: "#0d6efd", fontSize: "18px" }}
                                      title="View Stock Details"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <span>
                                      {getHeatCount(r.variants) > 0 
                                        ? `${getHeatCount(r.variants)} Heat No(s)` 
                                        : "N/A"
                                      }
                                    </span>
                                    {r.variants && r.variants.length > 0 && (
                                      <FaEye
                                        onClick={() => handleViewHeatDetails(r)}
                                        style={{ cursor: "pointer", color: "#0d6efd", fontSize: "18px" }}
                                        title="View Heat Details"
                                      />
                                    )}
                                  </div>
                                </td>
                                <td>{r.rate}</td>
                                <td>{r.amount}</td>
                              </tr>
                            ))}
                            {rows.length === 0 && !loading && (
                              <tr>
                                <td colSpan="15" className="text-center">
                                  No data to display. Use 'View All' or search for an item.
                                </td>
                              </tr>
                            )}
                            {loading && (
                                <tr>
                                    <td colSpan="15" className="text-center">Loading...</td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

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
                      className="modal-dialog modal-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <div>
                            <h5 className="modal-title mb-1">Stock & Heat Details</h5>
                            {selectedItem && (
                              <small className="text-muted">
                                Item Code: {selectedItem.item_code} - {selectedItem.description}
                              </small>
                            )}
                          </div>
                          <button 
                            type="button" 
                            className="btn-close" 
                            onClick={closeModal}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                           <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="table-light">
                                <tr>
                                  <th>Sr No.</th>
                                  <th>Heat No</th>
                                  <th>Stock (KG)</th>
                                  <th>GRN Qty (KG)</th>
                                  <th>Challan Qty (KG)</th>
                                  <th>Short/Excess Qty (KG)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {modalData.length > 0 ? (
                                  modalData.map((variant, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {variant.heat_no && variant.heat_no.trim() !== "" 
                                          ? variant.heat_no 
                                          : <span className="text-muted">-</span>
                                        }
                                      </td>
                                      <td className="text-end">{variant.stock ?? 0}</td>
                                      <td className="text-end">{variant.grn_qty ?? 0}</td>
                                      <td className="text-end">{variant.challan_qty ?? 0}</td>
                                      <td className="text-end">{variant.short_excess_qty ?? 0}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                      No variant details available
                                    </td>
                                  </tr>
                                )}
                                {modalData.total && (
                                  <tr className="table-secondary fw-bold">
                                    <td colSpan="2" className="text-end">Total:</td>
                                    <td className="text-end">{modalData.total.stock ?? 0}</td>
                                    <td className="text-end">{modalData.total.grn_qty ?? 0}</td>
                                    <td className="text-end">{modalData.total.challan_qty ?? 0}</td>
                                    <td className="text-end">{modalData.total.short_excess_qty ?? 0}</td>
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
    </div>
  );
};

export default OurVendorStock;