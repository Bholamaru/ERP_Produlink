
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustSalesOrderList.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as XLSX from "xlsx";

const defaultOrderList = [
  {
    year: "24-25",
    plant: "Produlink",
    so_no: "SO24250001",
    so_date: "24-12-02",
    cust_po_no: "PO-9921",
    cust_po_date: "24-11-28",
    so_type: "Domestic",
    cust_code: "CUST001",
    cust_name: "Ram kumawat",
    amount: 15000,
    po_status: "Open",
    auth: "Yes",
    user: "Anupam"
  },
  {
    year: "24-25",
    plant: "Produlink",
    so_no: "SO24250002",
    so_date: "24-12-05",
    cust_po_no: "PO-8541",
    cust_po_date: "24-12-01",
    so_type: "Export",
    cust_code: "CUST002",
    cust_name: "Bajaj Auto Ltd",
    amount: 45000,
    po_status: "Completed",
    auth: "Yes",
    user: "Admin"
  }
];


const CustSalesOrderList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [orderList, setOrderList] = useState(defaultOrderList);
    const [loading, setLoading] = useState(false);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [plant, setPlant] = useState("");
    const [soSeries, setSoSeries] = useState("All");
    const [soType, setSoType] = useState("All");
    const [otherType, setOtherType] = useState("All");
    const [openClose, setOpenClose] = useState("All");
    const [custName, setCustName] = useState("");
    const [userSelect, setUserSelect] = useState("All User");
    const [crName, setCrName] = useState("All");

      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/QuerySales'); 
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
      if (plant) params.plant = plant;
      if (soSeries !== "All") params.so_series = soSeries;
      if (soType !== "All") params.so_type = soType;
      if (otherType !== "All") params.other_type = otherType;
      if (openClose !== "All") params.open_close = openClose;
      if (custName) params.customer_name = custName;
      if (userSelect !== "All User") params.username = userSelect;

      const response = await axios.get("http://127.0.0.1:8000/Sales/newsalesorder/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setOrderList(data);
    } catch (error) {
      console.error("Error fetching customer sales orders:", error);
      const filtered = defaultOrderList.filter(row => {
        if (custName && !row.cust_name.toLowerCase().includes(custName.toLowerCase())) return false;
        if (soType !== "All" && row.so_type !== soType) return false;
        return true;
      });
      setOrderList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (orderList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = orderList.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.year || row.Year || "",
      "Plant": row.plant || row.Plant || "",
      "SO No": row.so_no || row.so_number || "",
      "SO Date": row.so_date || "",
      "Cust PO No": row.cust_po_no || "",
      "Cust PO Dt": row.cust_po_date || "",
      "Type": row.so_type || "",
      "Code": row.cust_code || "",
      "Cust Name": row.cust_name || row.customer_name || "",
      "Amount": row.amount || row.grand_total || 0,
      "PO Status": row.po_status || "",
      "Auth": row.auth || "",
      "User": row.user || row.username || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cust Sales Orders");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Customer_Sales_Order_List.xlsx");
  };

  return (
    <div className="CustSalesOrderListMaster">
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
              <div className="CustSalesOrderList">
                <div className="CustSalesOrderList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title"> Customer Sales Order List </h5>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className=" vndrbtn" onClick={handleExportExcel} >
                         Export Excel
                        </button>
                        <button type="button" className=" vndrbtn" to="#/" >
                         CustPO - Report
                        </button>
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick} >
                             Sales Return - Query
                        </button>             
                    </div>

                  </div>
                </div>
               
                <div className="CustSalesOrderList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                     <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Plant:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">So Series:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={soSeries} onChange={(e) => setSoSeries(e.target.value)}>
                            <option value="All">All</option>
                            <option value="New">New</option>
                            <option value="Partial">Partial</option>
                            <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">So Type:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={soType} onChange={(e) => setSoType(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Domestic">Domestic</option>
                            <option value="Export">Export</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Other Type:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={otherType} onChange={(e) => setOtherType(e.target.value)}>
                            <option value="All">All</option>
                            <option value="GST">GST</option>
                            <option value="JobWork">JobWork</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Open/Close:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={openClose} onChange={(e) => setOpenClose(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" value={custName} onChange={(e) => setCustName(e.target.value)} />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">User:</label>
                        <select className="form-control" value={userSelect} onChange={(e) => setUserSelect(e.target.value)}>
                            <option value="All User">All User</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">CR Name:</label>
                        <select className="form-control" value={crName} onChange={(e) => setCrName(e.target.value)}>
                            <option value="All">All</option>
                        </select>
                      </div>  
                       <div className="col-sm-6 col-md-3 col-lg-4" style={{marginTop:"38px"}}>
                          <button type="button" className=" vndrbtn" onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                          </button>
                          <button type="button" className=" vndrbtn">
                            Search Option
                          </button>
                          <button type="button" className=" vndrbtn">
                            ValidityDate
                          </button>
                        </div>
                       
                        </div>

                    </div>
                  </div>

             <div className="CustSalesOrderList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Year</th>
                            <th scope="col">Plant</th>
                            <th scope="col">SO No</th>
                            <th scope="col">SO Date</th>
                            <th scope="col">Cust PO No </th>
                            <th scope="col">Cust PO Dt</th>
                            <th scope="col">Type</th>
                            <th scope="col">Code</th>
                            <th scope="col">Cust Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">PO Status </th>
                            <th scope="col">Auth </th>
                            <th scope="col">User </th>
                            <th scope="col">Info </th>
                            <th scope="col">Doc </th>
                            <th scope="col"> Email </th>
                            <th scope="col">Edit </th>
                            <th scope="col">View </th>
                            <th scope="col">All </th>

                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="20" className="text-center">Loading...</td>
                            </tr>
                          ) : orderList.length === 0 ? (
                            <tr>
                              <td colSpan="20" className="text-center">No records found</td>
                            </tr>
                          ) : (
                            orderList.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.year || row.Year || ""}</td>
                                <td>{row.plant || row.Plant || ""}</td>
                                <td>{row.so_no || row.so_number || ""}</td>
                                <td>{row.so_date || ""}</td>
                                <td>{row.cust_po_no || ""}</td>
                                <td>{row.cust_po_date || ""}</td>
                                <td>{row.so_type || ""}</td>
                                <td>{row.cust_code || ""}</td>
                                <td>{row.cust_name || row.customer_name || ""}</td>
                                <td>{row.amount || row.grand_total || 0}</td>
                                <td>{row.po_status || ""}</td>
                                <td>{row.auth || ""}</td>
                                <td>{row.user || row.username || ""}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))
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



export default CustSalesOrderList