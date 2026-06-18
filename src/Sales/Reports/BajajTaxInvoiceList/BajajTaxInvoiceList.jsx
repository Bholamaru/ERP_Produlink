
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./BajajTaxInvoiceList.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as XLSX from "xlsx";

const defaultInvoiceList = [
  {
    year: "24-25",
    check: "",
    inv_no: "INV24250001",
    inv_date: "24-12-02",
    cust_po_no: "PO-9921",
    type: "Domestic",
    cust_code: "CUST001",
    cust_name: "Ram kumawat",
    total: 18500,
    user: "Anupam",
    asn: "",
    bajaj: "",
    yashshree: "",
    pdi: ""
  },
  {
    year: "24-25",
    check: "",
    inv_no: "INV24250002",
    inv_date: "24-12-05",
    cust_po_no: "PO-8541",
    type: "Domestic",
    cust_code: "CUST002",
    cust_name: "Bajaj Auto Ltd",
    total: 45000,
    user: "Admin",
    asn: "",
    bajaj: "",
    yashshree: "",
    pdi: ""
  }
];


const BajajTaxInvoiceList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [invoiceList, setInvoiceList] = useState(defaultInvoiceList);
    const [loading, setLoading] = useState(false);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [plant, setPlant] = useState("");
    const [custName, setCustName] = useState("");
    const [invNo, setInvNo] = useState("");
    const [toNo, setToNo] = useState("");

      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/VendorFileBajaj'); 
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
      if (custName) params.customer_name = custName;
      if (invNo) params.invoice_no = invNo;

      const response = await axios.get("http://127.0.0.1:8000/Sales/invoice/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setInvoiceList(data);
    } catch (error) {
      console.error("Error fetching Bajaj invoices:", error);
      const filtered = defaultInvoiceList.filter(row => {
        if (custName && !row.cust_name.toLowerCase().includes(custName.toLowerCase())) return false;
        if (invNo && !row.inv_no.toLowerCase().includes(invNo.toLowerCase())) return false;
        return true;
      });
      setInvoiceList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (invoiceList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = invoiceList.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.year || row.Year || "",
      "Inv No": row.inv_no || row.invoice_no || "",
      "Inv Date": row.inv_date || row.invoice_date || "",
      "Cust PO No": row.cust_po_no || "",
      "Type": row.type || row.invoice_type || "",
      "Cust Code": row.cust_code || "",
      "Cust Name": row.cust_name || row.customer_name || "",
      "Total": row.total || row.grand_total || 0,
      "User": row.user || row.username || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tax Invoices");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Tax_Invoice_List_Bajaj.xlsx");
  };

  return (
    <div className="BajajTaxInvoiceListMaster">
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
              <div className="BajajTaxInvoiceList">
                <div className="BajajTaxInvoiceList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Tax Invoice List </h5>
                    </div>

                    <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" onClick={handleExportExcel} >
                            Export Excel
                        </button> 
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                            Vender File
                        </button> 
                    </div>

                  </div>
                </div>
               
                <div className="BajajTaxInvoiceList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                       <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                        <label htmlFor="">Plant:</label>
                        <select className="form-control mt-2" value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" value={custName} onChange={(e) => setCustName(e.target.value)} />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv No: </label>
                        </div>
                        <input type="text" placeholder="No" className="form-control" value={invNo} onChange={(e) => setInvNo(e.target.value)} />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">To: </label>
                        </div>
                        <input type="text" placeholder="No" className="form-control" value={toNo} onChange={(e) => setToNo(e.target.value)} />
                      </div>
                        
                       <div className="col-sm-6 col-md-3 col-lg-4 align-items-center" style={{marginTop:"45px"}}>
                          <button type="button" className=" vndrbtn" onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                          </button>
                          <button type="button" className=" vndrbtn">
                            Search Option
                          </button>
                          <button type="button" className=" vndrbtn">
                            Print Inv
                          </button>
                        </div>
                      
                       
                        </div>

                    </div>
                  </div>

             <div className="BajajTaxInvoiceList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">#</th>
                          <th scope="col">Inv No</th>
                          <th scope="col"> Inv Date</th>
                          <th scope="col">Cust PO No </th>
                          <th scope="col">Type</th>
                          <th scope="col">Cust Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Total </th>
                          <th scope="col">User </th>
                          <th scope="col">ASN </th>
                          <th scope="col">Bajaj </th>
                          <th scope="col"> YAshShree </th>
                          <th scope="col">PDI </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="15" className="text-center">Loading...</td>
                          </tr>
                        ) : invoiceList.length === 0 ? (
                          <tr>
                            <td colSpan="15" className="text-center">No records found</td>
                          </tr>
                        ) : (
                          invoiceList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.year || row.Year || ""}</td>
                              <td><input type="checkbox" /></td>
                              <td>{row.inv_no || row.invoice_no || ""}</td>
                              <td>{row.inv_date || row.invoice_date || ""}</td>
                              <td>{row.cust_po_no || ""}</td>
                              <td>{row.type || row.invoice_type || ""}</td>
                              <td>{row.cust_code || ""}</td>
                              <td>{row.cust_name || row.customer_name || ""}</td>
                              <td>{row.total || row.grand_total || 0}</td>
                              <td>{row.user || row.username || ""}</td>
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


export default BajajTaxInvoiceList