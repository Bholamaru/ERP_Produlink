import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./ConsumableStock.css";
import axios from "axios";
import * as XLSX from "xlsx";

const ConsumableStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("All"); // All, In Stock, Out Of Stock, Negative Stock
  const [searchQuery, setSearchQuery] = useState("");

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("http://127.0.0.1:8000/Store/api/grn/items/");
      if (resp.data.success && resp.data.data) {
        const consumableItems = resp.data.data.filter(item => 
          item.item_type?.toLowerCase() === "consumable" || 
          item.group_name?.toLowerCase() === "consumable" ||
          item.item_type?.toLowerCase() === "consumables" ||
          item.group_name?.toLowerCase() === "consumables"
        );
        setRows(consumableItems.length > 0 ? consumableItems : resp.data.data);
      }
    } catch (err) {
      console.error("Error fetching consumable stock:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotalStock = (variants) => {
    if (!variants || !Array.isArray(variants)) return 0;
    return variants.reduce((sum, v) => sum + (parseFloat(v.stock) || 0), 0);
  };

  const filteredRows = rows.filter(r => {
    const stock = getTotalStock(r.variants);
    
    if (filterType === "In Stock" && stock <= 0) return false;
    if (filterType === "Out Of Stock" && stock !== 0) return false;
    if (filterType === "Negative Stock" && stock >= 0) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchCode = r.item_code?.toLowerCase().includes(query);
      const matchDesc = r.description?.toLowerCase().includes(query);
      if (!matchCode && !matchDesc) return false;
    }

    return true;
  });

  const handleExportExcel = () => {
    if (filteredRows.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = filteredRows.map((r, index) => ({
      "Sr no.": index + 1,
      "Item No": r.item_code || "",
      "Item Desc": r.description || "",
      "Item Size": r.size || "",
      "Group Name": r.group_name || "",
      "UnitCode": r.unit_code || "",
      "PO Bal. Qty": r.po_rate_qty || 0,
      "ShopFloor": r.shop_floor || "-",
      "Stock": getTotalStock(r.variants),
      "Rate": r.rate || 0,
      "Value": r.amount || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consumable Stock");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Consumable_Stock_Report.xlsx");
  };

  return (
    <div className="ConsumableStock">
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
                <div className="ConsumableStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Consumable Stock Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <div className="row justify-content-end">
                        <div className="">
                        
                        <div className="text-end">
                               <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
                                    Filter By : 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="All" checked={filterType === "All"} onChange={() => setFilterType("All")} />
                                    All 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="In Stock" checked={filterType === "In Stock"} onChange={() => setFilterType("In Stock")} />
                                    In Stock  
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="Out Of Stock" checked={filterType === "Out Of Stock"} onChange={() => setFilterType("Out Of Stock")} />
                                    Out Of Stock 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="Negative Stock" checked={filterType === "Negative Stock"} onChange={() => setFilterType("Negative Stock")} />
                                    Negative Stock 
                                </label>
                                 </div>
                        </div>

                           <button className="vndrbtn" onClick={handleExportExcel}>
                              Export To Excel
                           </button>

                           <Link type="button" className="vndrbtn" to="">
                              CON DataWise Stock
                           </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ConsumableStock-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start" onSubmit={(e) => e.preventDefault()}>
                         
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select className="form-select">
                              <option value="">Main Store</option>
                            </select>
                          </div>    

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Main Group</label>
                            <select className="form-select">
                              <option value="">Select</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                            </select>
                          </div>


                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Sub Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                            </select>
                          </div> 

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Item </label>
                            <input type="text" className="form-control" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search item..." />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="button" className="vndrbtn w-100" onClick={fetchData}>
                              Search
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreConsumableStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item No</th>
                              <th>Item Desc </th>
                              <th>Item  Size </th>
                              <th> Group Name </th>
                              <th> UnitCode </th>
                              <th> PO Bal. Qty</th>
                              <th>ShopFloor</th>
                              <th> Stock</th>
                              <th>Rate</th>
                              <th>Value</th>
                            </tr>
                          </thead>

                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="11" className="text-center py-4">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : filteredRows.length === 0 ? (
                              <tr>
                                <td colSpan="11" className="text-center py-3 text-muted fw-bold">No Records Found</td>
                              </tr>
                            ) : (
                              filteredRows.map((r, index) => {
                                const stock = getTotalStock(r.variants);
                                return (
                                  <tr key={r.item_code || index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{r.item_code}</td>
                                    <td>{r.description}</td>
                                    <td>{r.size || "-"}</td>
                                    <td>{r.group_name || "-"}</td>
                                    <td className="text-center">{r.unit_code || "-"}</td>
                                    <td className="text-right">{r.po_rate_qty || 0}</td>
                                    <td className="text-right">{r.shop_floor || "-"}</td>
                                    <td className="text-right">{stock}</td>
                                    <td className="text-right">{r.rate || 0}</td>
                                    <td className="text-right">{r.amount || 0}</td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>

                        </table>
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

export default ConsumableStock;
