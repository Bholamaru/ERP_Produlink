
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkDCList.css";
import { useNavigate } from 'react-router-dom';
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


const JobworkDCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [dcList, setDcList] = useState(defaultDCList);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    navigate('/DChallan');
  };

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
      if (challanNo) params.challan_no = challanNo;
      if (customer) params.customer = customer;

      const response = await axios.get("http://127.0.0.1:8000/Sales/gstjobwork/invoice/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setDcList(data);
    } catch (error) {
      console.error("Error fetching Jobwork DCs:", error);
      const filtered = defaultDCList.filter(row => {
        if (customer && !row.cust_name.toLowerCase().includes(customer.toLowerCase())) return false;
        if (challanNo && !row.dc_no.toLowerCase().includes(challanNo.toLowerCase())) return false;
        return true;
      });
      setDcList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (dcList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = dcList.map((row, index) => ({
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork DCs");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_DC_List.xlsx");
  };

  return (
    <div className="JobworkDCListMaster">
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
                <div className="JobworkDCList">
                  <div className="JobworkDCList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Jobwork DC List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" onClick={handleExportExcel} >
                          Export Excel
                        </button>
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                          New Jobwork DC
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="JobworkDCList-Main">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-2">
                          <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">All : </label>
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">Challan No: </label>
                          </div>
                          <input type="text" placeholder="Name" className="form-control" value={challanNo} onChange={(e) => setChallanNo(e.target.value)} />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">Customer : </label>
                          </div>
                          <input type="text" placeholder="No" className="form-control" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                        </div>

                        <div className="col-6 col-md-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn" onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered table-striped">
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
                        ) : dcList.length > 0 ? (
                          dcList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.year || "24-25"}</td>
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default JobworkDCList