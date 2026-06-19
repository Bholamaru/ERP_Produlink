import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./SubcontractStock.css";
import { FaEye } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import axios from "axios";
import * as XLSX from "xlsx";

const SubcontractStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [stockData, setStockData] = useState([]); // <-- array
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // ✅ Fetch API (SubcornStock)
  const fetchStock = async (q = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:8000/Store/api/SubcornStock/?q=${q}`
      );
      setStockData(res.data || []); // <-- array
    } catch (error) {
      console.error("Error fetching stock:", error);
      setStockData([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data initially
  useEffect(() => {
    fetchStock();
  }, []);

  // ✅ Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchStock(query);
  };

  // ✅ Merge inward + outward challans
  const allChallans = stockData.flatMap((challan) => {
    if (challan.type === "inward") {
      return challan.InwardChallanTable.map((item) => ({
        challanType: "inward",
        challanNo: challan.ChallanNo,
        supplier: challan.SupplierName,
        itemDescription: item.ItemDescription,
        qty: item.ChallanQty,
        itemCode: "-", // inward me item_code nahi hai
      }));
    } else if (challan.type === "outward") {
      return challan.items.map((item) => ({
        challanType: "outward",
        challanNo: challan.challan_no,
        supplier: challan.vendor,
        itemDescription: item.description,
        qty: item.qtyNo,
        itemCode: item.item_code || "-",
      }));
    }
    return [];
  });

  // ✅ Supplier list (unique)
  const supplierList = [...new Set(allChallans.map((c) => c.supplier))];

  // ✅ Filtered challans
  const filteredChallans = selectedSupplier
    ? allChallans.filter((c) => c.supplier === selectedSupplier)
    : allChallans;

  const handleExportExcel = () => {
    if (filteredChallans.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = filteredChallans.map((row, index) => ({
      "Sr.no": index + 1,
      "Item type": row.challanType || "",
      "Challan No": row.challanNo || "",
      "Item Code": row.itemCode || "",
      "Supplier": row.supplier || "",
      "Item Description": row.itemDescription || "",
      "Stock(NOS)": row.qty || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subcontract Stock");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Subcontract_Stock.xlsx");
  };

  return (
    <div className="SubcontractStock">
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
                <div className="SubcontractStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Subcontract Stock
                      </h5>
                    </div>
                    <div className="col-md-1">
                      <label htmlFor=""> Plant </label>
                    </div>
                    <div className="col-md-1">
                      <select
                        id="series"
                        name="series"
                        className="form-control"
                      >
                        <option value=""> ProduLink </option>
                      </select>
                    </div>
                    <div className="col-md-7 text-end">
                      <Link className="vndrbtn" to="/OurVendorStock">
                        Data Wise Stock
                      </Link>
                      <button className="vndrbtn me-2" onClick={handleExportExcel}>Export To Excel</button>
                    </div>
                  </div>
                </div>

                <div className="SubcontractStock-main mt-3">
                  <div className="container-fluid">
                    <form
                      className="row g-3 mt-3 text-start"
                      onSubmit={handleSearch}
                    >
                      {/* Radio Button */}
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
                            <input type="radio" name="stockLevel" value="" />
                            All Vendor
                          </label>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <input type="radio" name="stockLevel" value="" />
                            Select Vendor
                          </label>
                        </div>
                        <input
                          type="text"
                          className="form-control mt-1"
                          name="itemSize"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Enter Name .. "
                        />
                      </div>

                      <div className="col-md-1 col-sm-6 ">
                        <button
                          type="submit"
                          className="vndrbtn  w-100"
                          style={{ marginTop: "30px" }}
                        >
                          Search
                        </button>
                      </div>

                      {/* Item Code */}
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="itemSize"
                        />
                      </div>

                      {/* Supplier Dropdown */}
                      <div className="col-md-3 col-sm-6">
                        <label className="form-label">Supplier</label>
                        <select
                          className="form-control"
                          value={selectedSupplier}
                          onChange={(e) => setSelectedSupplier(e.target.value)}
                        >
                          <option value="">All Suppliers</option>
                          {supplierList.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>

                  <div className="StoreSubcontractStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        {loading ? (
                          <p className="text-center">Loading data...</p>
                        ) : (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.no</th>
                                <th>Item type</th>
                                <th>Challan No</th>
                                <th>Item Code</th>
                                <th>Supplier</th>
                                <th>Item Description</th>
                                <th>Stock(NOS)</th>
                                <th>View3</th>
                                <th>View2</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredChallans.length > 0 ? (
                                filteredChallans.map((row, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.challanType}</td>
                                    <td>{row.challanNo}</td>
                                    <td>{row.itemCode}</td>
                                    <td>{row.supplier}</td>
                                    <td>{row.itemDescription}</td>
                                    <td>{row.qty}</td>
                                    <td>
                                      <IoDocument />
                                    </td>
                                    <td>
                                      <IoDocument />
                                    </td>
                                    <td>
                                      <FaEye />
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="10" className="text-center">
                                    No data found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        )}
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

export default SubcontractStock;