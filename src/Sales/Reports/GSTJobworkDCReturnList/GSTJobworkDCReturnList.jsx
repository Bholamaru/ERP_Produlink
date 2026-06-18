import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTJobworkDCReturnList.css";
import axios from "axios";
import * as XLSX from "xlsx";

const defaultDCList = [
  {
    year: "24-25",
    dc_no: "JWDC24250001",
    dc_date: "24-12-02",
    cust_code: "CUST001",
    cust_name: "Ram kumawat",
    qty_item_no: "100 | FG1018",
    user: "Anupam"
  },
  {
    year: "24-25",
    dc_no: "JWDC24250002",
    dc_date: "24-12-05",
    cust_code: "CUST002",
    cust_name: "Bajaj Auto Ltd",
    qty_item_no: "250 | FG1263",
    user: "Admin"
  }
];

const GSTJobworkDCReturnList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [filterCustomer, setFilterCustomer] = useState(false);
  const [filterItem, setFilterItem] = useState(false);
  const [filterChallan, setFilterChallan] = useState(false);
  const [tableData, setTableData] = useState(defaultDCList);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (filterCustomer && customerName) params.customer = customerName;
      if (filterItem && itemName) params.item = itemName;
      if (filterChallan && challanNo) params.challan_no = challanNo;

      const response = await axios.get("http://127.0.0.1:8000/Sales/gstjobwork/invoice/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setTableData(data);
    } catch (error) {
      console.error("Error fetching Jobwork DC returns:", error);
      const filtered = defaultDCList.filter(row => {
        if (filterCustomer && customerName && !row.cust_name.toLowerCase().includes(customerName.toLowerCase())) return false;
        if (filterChallan && challanNo && !row.dc_no.toLowerCase().includes(challanNo.toLowerCase())) return false;
        return true;
      });
      setTableData(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (tableData.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = tableData.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.year || "24-25",
      "DC No": row.dc_no || "",
      "DC Date": row.dc_date || "",
      "Cust Code": row.cust_code || "",
      "Cust Name": row.cust_name || "",
      "Qty | ItemNo": row.qty_item_no || "",
      "User": row.user || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork DC Return List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_DC_Return_List.xlsx");
  };

  return (
    <div className="GSTJobworkDCReturnListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

                {/* Header Section */}
                <div className="GSTJobworkDCReturnList-header mb-2">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title">Jobwork DC Return List</h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} >
                        Export To Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="GSTJobworkDCReturnList-Main">
                  <div className="d-flex align-items-end gap-2 flex-wrap" style={{ paddingBottom: "8px" }}>

                    {/* From Date */}
                    <div className="d-flex flex-column justify-content-end" style={{ minWidth: "100px" }}>
                      <div style={{ height: "22px", display: "flex", alignItems: "flex-end", paddingBottom: "2px" }}>
                        <label style={{ fontSize: "11px", fontWeight: "bold", margin: 0 }}>From :</label>
                      </div>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ fontSize: "11px", padding: "2px 4px", height: "28px", margin: 0 }}
                      />
                    </div>

                    {/* To Date */}
                    <div className="d-flex flex-column justify-content-end" style={{ minWidth: "100px" }}>
                      <div style={{ height: "22px", display: "flex", alignItems: "flex-end", paddingBottom: "2px" }}>
                        <label style={{ fontSize: "11px", fontWeight: "bold", margin: 0 }}>To Date :</label>
                      </div>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ fontSize: "11px", padding: "2px 4px", height: "28px", margin: 0 }}
                      />
                    </div>

                    {/* Customer Filter */}
                    <div className="d-flex flex-column justify-content-end" style={{ minWidth: "130px" }}>
                      <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: "22px", paddingLeft: "1.5em", paddingBottom: "2px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input mt-0"
                          id="chkCustomer"
                          checked={filterCustomer}
                          onChange={(e) => setFilterCustomer(e.target.checked)}
                          style={{ width: "12px", height: "12px", margin: 0 }}
                        />
                        <label htmlFor="chkCustomer" className="form-check-label" style={{ fontSize: "11px", fontWeight: "bold", margin: 0, marginTop: "1px" }}>
                          Customer :
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Name..."
                        className="form-control form-control-sm"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        disabled={!filterCustomer}
                        style={{ fontSize: "11px", padding: "2px 4px", height: "28px", margin: 0 }}
                      />
                    </div>

                    {/* Item Filter */}
                    <div className="d-flex flex-column justify-content-end" style={{ minWidth: "130px" }}>
                      <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: "22px", paddingLeft: "1.5em", paddingBottom: "2px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input mt-0"
                          id="chkItem"
                          checked={filterItem}
                          onChange={(e) => setFilterItem(e.target.checked)}
                          style={{ width: "12px", height: "12px", margin: 0 }}
                        />
                        <label htmlFor="chkItem" className="form-check-label" style={{ fontSize: "11px", fontWeight: "bold", margin: 0, marginTop: "1px" }}>
                          Item :
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder=""
                        className="form-control form-control-sm"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        disabled={!filterItem}
                        style={{ fontSize: "11px", padding: "2px 4px", height: "28px", margin: 0 }}
                      />
                    </div>

                    {/* Challan No Filter */}
                    <div className="d-flex flex-column justify-content-end" style={{ minWidth: "120px" }}>
                      <div className="form-check mb-0 d-flex align-items-center gap-1" style={{ height: "22px", paddingLeft: "1.5em", paddingBottom: "2px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input mt-0"
                          id="chkChallan"
                          checked={filterChallan}
                          onChange={(e) => setFilterChallan(e.target.checked)}
                          style={{ width: "12px", height: "12px", margin: 0 }}
                        />
                        <label htmlFor="chkChallan" className="form-check-label" style={{ fontSize: "11px", fontWeight: "bold", margin: 0, marginTop: "1px" }}>
                          Challan No :
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="DC No."
                        className="form-control form-control-sm"
                        value={challanNo}
                        onChange={(e) => setChallanNo(e.target.value)}
                        disabled={!filterChallan}
                        style={{ fontSize: "11px", padding: "2px 4px", height: "28px", margin: 0 }}
                      />
                    </div>

                    {/* Search Button */}
                    <div className="d-flex flex-column justify-content-end" style={{ paddingBottom: "0px" }}>
                      <button
                        type="button"
                        className="btn btn-light border btn-sm"
                        onClick={handleSearch}
                        disabled={loading}
                        style={{ fontSize: "11px", padding: "2px 10px", height: "28px", display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold", margin: 0 }}
                      >
                        <i className="fas fa-search" style={{ fontSize: "10px" }}></i>
                        {loading ? "Searching..." : "Search"}
                      </button>
                    </div>

                  </div>

                  {/* Table Section */}
                  <div className="table-responsive mt-2">
                    <table className="custom-table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>DC No</th>
                          <th>DC Date</th>
                          <th>Cust Code</th>
                          <th>Cust Name</th>
                          <th>Qty | ItemNo</th>
                          <th>User</th>
                          <th>Edit</th>
                          <th>Del.</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="11" className="text-center py-4">Loading data...</td>
                          </tr>
                        ) : tableData.length > 0 ? (
                          tableData.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.year}</td>
                              <td>{row.dc_no}</td>
                              <td>{row.dc_date}</td>
                              <td>{row.cust_code}</td>
                              <td className="text-start">{row.cust_name}</td>
                              <td>{row.qty_item_no}</td>
                              <td>{row.user}</td>
                              <td><i className="fas fa-edit text-dark" style={{ cursor: "pointer" }}></i></td>
                              <td><i className="fas fa-trash text-dark" style={{ cursor: "pointer" }}></i></td>
                              <td><i className="fas fa-eye text-dark" style={{ cursor: "pointer" }}></i></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="11" className="text-center py-4 text-muted">
                              No records found for the selected criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Footer */}
                <div className="GSTJobworkDCReturnList-footer">
                  Total Record's : {tableData.length}
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTJobworkDCReturnList;
