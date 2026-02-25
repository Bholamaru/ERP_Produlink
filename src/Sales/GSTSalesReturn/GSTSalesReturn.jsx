import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./GSTSalesReturn.css";
import Cached from "@mui/icons-material/Cached.js";
import Search from "@mui/icons-material/Search.js";



const GSTSalesReturn = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [plant, setPlant] = useState("");
  const [series, setSeries] = useState("");
  const [type, setType] = useState("");
  const [salesReturnNo, setSalesReturnNo] = useState("");
  const [salesReturnDate, setSalesReturnDate] = useState("");
  const [custName, setCustName] = useState("");
  const [returnNumbers, setReturnNumbers] = useState([]);
  const [loadingReturnNo, setLoadingReturnNo] = useState(false);
  const [errorReturnNo, setErrorReturnNo] = useState(null);
  const [gateEntryNo, setGateEntryNo] = useState("");
  const [invoiceChallanNo, setInvoiceChallanNo] = useState("");
  const [invoiceChallanDate, setInvoiceChallanDate] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [transportName, setTransportName] = useState("");
  const [lrNo, setLrNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [remark, setRemark] = useState("");
  const [eInvoice, setEInvoice] = useState("");
  const [isService, setIsService] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Gate Entry Data States
  const [gateEntryList, setGateEntryList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [loadingGateEntry, setLoadingGateEntry] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedSalesInvNo, setSelectedSalesInvNo] = useState("");
  
  const navigate = useNavigate();  
  
  const handleButtonClick = () => {
    navigate('/GSTSalesReturnList'); 
  };

  // Fetch return numbers from API
  const fetchReturnNumbers = async () => {
    try {
      setLoadingReturnNo(true);
      setErrorReturnNo(null);
      const response = await fetch("http://127.0.0.1:8000/Sales/sales/return-no/");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      
      // Handle different response formats
      let returnNoList = [];
      if (Array.isArray(data)) {
        returnNoList = data;
      } else if (data.data && Array.isArray(data.data)) {
        returnNoList = data.data;
      } else if (data.returnNumbers && Array.isArray(data.returnNumbers)) {
        returnNoList = data.returnNumbers;
      } else if (typeof data === 'object') {
        returnNoList = Object.values(data).filter(val => typeof val === 'string' || typeof val === 'object');
      }
      
      setReturnNumbers(returnNoList);
      console.log("Processed Return Numbers:", returnNoList);
      
      // Auto-prefill with first return number if available
      if (returnNoList && returnNoList.length > 0) {
        const firstReturnNo = typeof returnNoList[0] === 'string' 
          ? returnNoList[0] 
          : returnNoList[0].returnNo || returnNoList[0].id || returnNoList[0];
        setSalesReturnNo(firstReturnNo);
      }
    } catch (err) {
      setErrorReturnNo(err.message);
      console.error("Error fetching return numbers:", err);
    } finally {
      setLoadingReturnNo(false);
    }
  };

  // Fetch return numbers on component mount
  useEffect(() => {
    fetchReturnNumbers();
  }, []);

  // Fetch Gate Entry Data from API
  useEffect(() => {
    const fetchGateEntryData = async () => {
      try {
        setLoadingGateEntry(true);
        const response = await fetch("http://127.0.0.1:8000/Sales/salesreturn/gate-entry");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Gate Entry API Response:", data);

        // Extract gate entry numbers, series, and types
        let geList = [];
        let serList = [];
        let typeList = [];

        if (Array.isArray(data)) {
          geList = data;
          // Extract unique series and types
          serList = [...new Set(data.map(item => item.series || item.Series).filter(Boolean))];
          typeList = [...new Set(data.map(item => item.type || item.Type || item.doc_type).filter(Boolean))];
        } else if (data.data && Array.isArray(data.data)) {
          geList = data.data;
          serList = [...new Set(data.data.map(item => item.series || item.Series).filter(Boolean))];
          typeList = [...new Set(data.data.map(item => item.type || item.Type || item.doc_type).filter(Boolean))];
        }

        setGateEntryList(geList);
        setSeriesList(serList);
        setTypeList(typeList);
        console.log("Processed Gate Entry List:", geList);
        console.log("Processed Series List:", serList);
        console.log("Processed Type List:", typeList);
      } catch (err) {
        console.error("Error fetching gate entry data:", err);
      } finally {
        setLoadingGateEntry(false);
      }
    };

    fetchGateEntryData();
  }, []);

  // Fetch Invoice Data from API
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoadingInvoices(true);
        const response = await fetch("http://127.0.0.1:8000/Sales/invoice/");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Invoice API Response:", data);

        let invList = [];
        let custList = [];
        if (Array.isArray(data)) {
          invList = data;
          custList = [
            ...new Set(
              data
                .map(item => {
                  if (item.items && Array.isArray(item.items) && item.items.length > 0) {
                    return item.items[0].customer;
                  }
                  return item.bill_to || item.customer || item.custName || item.customer_name || item.name || item.cust_name;
                })
                .filter(Boolean)
            )
          ];
        }

        setInvoiceList(invList);
        setCustomerList(custList);
        console.log("Processed Invoice List:", invList);
        console.log("Processed Customer List:", custList);
      } catch (err) {
        console.error("Error fetching invoice data:", err);
      } finally {
        setLoadingInvoices(false);
      }
    };

    fetchInvoiceData();
  }, []);

  // Filter invoices by selected customer
  useEffect(() => {
    if (custName && invoiceList.length > 0) {
      const filtered = invoiceList.filter(invoice => {
        // Check if customer matches in items array
        if (invoice.items && Array.isArray(invoice.items) && invoice.items.length > 0) {
          return invoice.items[0].customer === custName;
        }
        // Check if customer matches in bill_to field
        return invoice.bill_to === custName || invoice.customer === custName;
      });
      setFilteredInvoiceList(filtered);
      console.log("Filtered invoices for customer:", custName, filtered);
    } else {
      setFilteredInvoiceList([]);
    }
  }, [custName, invoiceList]);

  // Handle invoice selection
  const handleInvoiceSelect = (invoiceNo) => {
    setSelectedSalesInvNo(invoiceNo);
    
    // Find the selected invoice in the list
    const selected = invoiceList.find(item => item.invoice_no === invoiceNo);
    if (selected) {
      console.log("Selected Invoice:", selected);
      setSelectedInvoiceData(selected);
      
      // Extract customer name
      let customer = "";
      if (selected.items && Array.isArray(selected.items) && selected.items.length > 0) {
        customer = selected.items[0].customer;
      } else {
        customer = selected.bill_to || selected.customer || "";
      }
      setCustName(customer);
      
      // Set invoice items from the items array
      if (selected.items && Array.isArray(selected.items)) {
        setInvoiceItems(selected.items);
      }
      
      // Set other fields
      if (selected.invoice_Date) {
        setSalesReturnDate(selected.invoice_Date);
      }
    }
  };

  // Handle save/submit
  const handleSaveGSTSalesReturn = async () => {
    try {
      setSavingData(true);
      setSaveError(null);
      setSaveSuccess(false);

      const payload = {
        plant: plant || "",
        gateEntryNo: gateEntryNo || "",
        series: series || "",
        type: type || "",
        salesReturnNo: salesReturnNo || "",
        salesReturnDate: salesReturnDate || "",
        custName: custName || "",
        invoiceChallanNo: invoiceChallanNo || "",
        invoiceChallanDate: invoiceChallanDate || "",
        transportMode: transportMode || "",
        transportName: transportName || "",
        lrNo: lrNo || "",
        vehicleNo: vehicleNo || "",
        remark: remark || "",
        eInvoice: eInvoice || "",
        isService: isService || false
      };

      console.log("Sending payload:", payload);

      const response = await fetch("http://127.0.0.1:8000/Sales/Gstsalesretun/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Save successful:", result);
      setSaveSuccess(true);
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (err) {
      setSaveError(err.message);
      console.error("Error saving GST Sales Return:", err);
    } finally {
      setSavingData(false);
    }
  };

  // Handle clear form
  const handleClearForm = () => {
    setPlant("");
    setGateEntryNo("");
    setSeries("");
    setType("");
    setSalesReturnNo("");
    setSalesReturnDate("");
    setCustName("");
    setInvoiceChallanNo("");
    setInvoiceChallanDate("");
    setTransportMode("");
    setTransportName("");
    setLrNo("");
    setVehicleNo("");
    setRemark("");
    setEInvoice("");
    setIsService(false);
    setSaveError(null);
    setSaveSuccess(false);
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

  return (
    <div className="GSTSalesReturnMaster">
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
                <div className="GSTSalesReturn mt-5">
                  <div className="GSTSalesReturn-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">New GST Sales Return</h5>
                      </div>
                    
                    
                        <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                        GST Sales Return List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="GSTSalesReturn-main">
                    <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Plant:</th>
                                        <th>Gate Entry No: </th>
                                       <th>Series:</th>
                                        <th>Type:</th>
                                       
                                        <th>Sales Return No: </th>
                                        <th>Sales Return Date:</th>
                                        <th>Cust Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                           <select 
                                             name="plant"
                                             className="form-control" 
                                             value={plant}
                                             onChange={(e) => setPlant(e.target.value)}
                                           >
                                                <option value="">ProduLink</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                              <select 
                                                name="gateEntry"
                                                className="form-control" 
                                                value={gateEntryNo}
                                                onChange={(e) => setGateEntryNo(e.target.value)}
                                                style={{paddingRight: '35px'}}
                                              >
                                                  <option value="">Select</option>
                                                  {gateEntryList.map((ge, index) => (
                                                    <option key={index} value={ge.ge_no || ge.GE_No || ge.id || ge}>
                                                      {ge.ge_no || ge.GE_No || ge.id}
                                                    </option>
                                                  ))}
                                              </select>
                                              <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                                  <Cached />
                                              </span>
                                            </div>
                                        </td>
                                        <td>
                                          <select 
                                            name="series"
                                            className="form-control" 
                                            value={series}
                                            onChange={(e) => setSeries(e.target.value)}
                                          >
                                                <option value="">Select</option>
                                                {typeList.map((typ, index) => (
                                                  <option key={index} value={typ}>
                                                    {typ}
                                                  </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                          <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                            <select 
                                              name="type"
                                              className="form-control" 
                                              value={type}
                                              onChange={(e) => setType(e.target.value)}
                                              style={{paddingRight: '35px'}}
                                            >
                                                <option value="">Select</option>
                                                <option value="Direct">Direct</option>
                                                 <option value="Invoice">Invoice</option>
                                                {/* {typeList.map((typ, index) => (
                                                  <option key={index} value={typ}>
                                                    {typ}
                                                  </option>
                                                ))} */}
                                            </select>
                                            <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                                <Cached />
                                            </span>
                                          </div>
                                        </td>
                                        <td>
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          value={salesReturnNo}
                                          onChange={(e) => setSalesReturnNo(e.target.value)}
                                          placeholder="Auto-filled"
                                        />
                                        {loadingReturnNo && <small className="text-muted">Loading...</small>}
                                        {errorReturnNo && <small className="text-danger">Error: {errorReturnNo}</small>}
                                        </td>
                                        <td>
                                            <input 
                                              type="date" 
                                              className="form-control"
                                              value={salesReturnDate}
                                              onChange={(e) => setSalesReturnDate(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                              <select 
                                                className="form-control" 
                                                placeholder="Select Customer..."
                                                value={custName}
                                                onChange={(e) => setCustName(e.target.value)}
                                                style={{paddingRight: '35px'}}
                                              >
                                                <option value="">Select Customer</option>
                                                {customerList.map((cust, index) => (
                                                  <option key={index} value={cust}>
                                                    {cust}
                                                  </option>
                                                ))}
                                              </select>
                                              <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                                <Search />
                                              </span>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                          </div>
                    </div>


                  <div className="GSTSalesReturn-main mt-5">
                    <div className="GSTSalesReturn-tabs">
                   
                      <div className="tab-content mt-4" id="" >

                          {type === "Invoice" && (                            <div className="table-responsive mb-4">
                              {/* <h6 className="mb-3">Select Invoice</h6> */}
                              <table className="table table-striped table-hover table-bordered">
                                <thead className="table-primary">
                                  <tr>
                                    <th>Invoice No</th>
                                    <th>Invoice Date</th>
                                    <th>Item Code</th>
                                    <th>Item Desc</th>
                                    <th>HSN Code</th>
                                    <th>Qty</th>
                                    <th>Sales Return No</th>
                                    <th>Return Qty</th>
                                    <th>Select</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredInvoiceList.length > 0 ? (
                                    filteredInvoiceList.map((invoice, invIndex) => 
                                      invoice.items && Array.isArray(invoice.items) ? (
                                        invoice.items.map((item, itemIndex) => (
                                          <tr key={`${invIndex}-${itemIndex}`}>
                                            <td>{invoice.invoice_no}</td>
                                            <td>{invoice.invoice_Date || "N/A"}</td>
                                            <td>{item.id || "N/A"}</td>
                                            <td>{item.description || "N/A"}</td>
                                            <td>{item.hsn_code || "N/A"}</td>
                                            <td>{item.inv_qty || item.po_qty || "N/A"}</td>
                                            <td>{salesReturnNo}</td>
                                            <td><input type="text" className="form-control form-control-sm" placeholder="Qty" /></td>
                                            <td>
                                              <button 
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleInvoiceSelect(invoice.invoice_no)}
                                              >
                                                Select
                                              </button>
                                            </td>
                                          </tr>
                                        ))
                                      ) : null
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan="9" className="text-center text-muted">
                                        {custName ? "No invoices found for selected customer" : "Please select a customer first"}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {type === "Direct" && (                          <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Sales Inv.No</th>
                                        <th>Sales Inv.Date </th>
                                        <th>Item Code</th>
                                        <th>Item Desc</th>
                                        <th>Remark</th>
                                        <th>HSN Code</th>
                                        <th>Rate</th>
                                        <th>Disc%</th>
                                        <th>Inv.Qty</th>
                                        <th>Return.Qty</th>
                                        <th> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                          <select 
                                            className="form-control" 
                                            value={selectedSalesInvNo}
                                            onChange={(e) => handleInvoiceSelect(e.target.value)}
                                          >
                                            <option value="">Select Invoice</option>
                                            {filteredInvoiceList.map((inv, index) => (
                                              <option key={index} value={inv.invoice_no}>
                                                {inv.invoice_no}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td> 
                                          <input 
                                            type="date" 
                                            placeholder="" 
                                            className="form-control"
                                            value={selectedInvoiceData?.invoice_Date || ""}
                                            readOnly
                                          />
                                        </td>
                                        <td>
                                            <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                              <input type="text" placeholder="Enter Code" className="form-control" style={{paddingRight: '35px'}}
                                              />
                                              <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                                <Search />
                                              </span>
                                            </div>
                                        </td>
                                        <td><textarea className="form-control"></textarea></td>
                                        <td><textarea className="form-control"></textarea></td>
                                        <td>
                                        <input type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" />
                                            <select name="" id="">
                                                <option value="">Select</option>
                                            </select>
                                        </td>
                                        <td><button className="btn">Add</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                          </div>
                          )}

                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>No.</th>
                                            <th>Inv No </th>
                                            <th>Inv Date</th>
                                            <th>Item Code</th>
                                            <th>Item Desc</th>
                                            <th>HSNCode</th>
                                            <th>Rate.</th>
                                            <th>Disc%.</th>
                                            <th>TotalAmt</th>
                                            <th>Inv.Qty</th>
                                            <th>Edit</th>
                                            <th>Return Qty</th>
                                            <th>Lot/HC</th>
                                            <th>Reason</th>
                                            <th>GRIR No.</th>
                                            <th>GRIR Date.</th>
                                            <th>Del.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {selectedInvoiceData && invoiceItems.length > 0 ? (
                                            invoiceItems.map((item, index) => (
                                              <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{selectedInvoiceData.invoice_no}</td>
                                                <td>{selectedInvoiceData.invoice_Date || "N/A"}</td>
                                                <td>{item.id || "N/A"}</td>
                                                <td>{item.description || "N/A"}</td>
                                                <td>{item.hsn_code || "N/A"}</td>
                                                <td>{item.rate || "N/A"}</td>
                                                <td>0%</td>
                                                <td>{(item.rate * item.inv_qty) || "N/A"}</td>
                                                <td>{item.inv_qty || item.po_qty || "N/A"}</td>
                                                <td>Edit</td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td><textarea name="" id=""></textarea></td>
                                                <td><input type="text" className="form-control" /></td>
                                                <td><input type="date" className="form-control" /></td>
                                                <td><button className="btn"> X </button></td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr>
                                              <td colSpan="17" className="text-center text-muted">
                                                Select an invoice to display items
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                        </table>
                            </div>

                      </div>

                       <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <th>Basic</th>
                                            <th>Disc</th>
                                            <th>SubTotal</th>
                                            <th>TotalAmt</th>
                                            <th colSpan="2">CGST</th>
                                            <th colSpan="2">SGST</th>
                                            <th colSpan="2">IGST</th>
                                            <th colSpan="2">UTGST</th>
                                            <th>TOC(Other)</th>
                                            <th colSpan="2">TSC </th>
                                            <th>Grand Total</th>
                                        </thead>

                                        <tbody>
                                        <td> <input type="text" className="form-control" placeholder="" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="" /> </td>
                                        <td> <input type="text" className="form-control" /></td>
                                        <td> <input type="text" className="form-control" /></td>
                                        {/* <td> <input type="text" className="form-control" placeholder="00.00" /> %</td> */}
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        {/* <td> <input type="text" className="form-control" placeholder="00.00" /> %</td> */}
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        {/* <td> <input type="text" className="form-control" placeholder="00.00" /> %</td> */}
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td> 
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        {/* <td> <input type="text" className="form-control" placeholder="00.00" /> %</td> */}
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                       </div>


                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Invoice Challan No</label>
                             <input 
                               type="text" 
                               className="form-control" 
                               placeholder="" 
                               value={invoiceChallanNo}
                               onChange={(e) => setInvoiceChallanNo(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Invoice Challan Date:</label>
                             <input 
                               type="date" 
                               className="form-control" 
                               placeholder="" 
                               value={invoiceChallanDate}
                               onChange={(e) => setInvoiceChallanDate(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Transport Mode:</label>
                             <input 
                               type="text" 
                               className="form-control" 
                               placeholder="" 
                               value={transportMode}
                               onChange={(e) => setTransportMode(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Transport Name:</label>
                             <input 
                               type="text" 
                               className="form-control" 
                               placeholder="" 
                               value={transportName}
                               onChange={(e) => setTransportName(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">LR No:</label>
                             <input 
                               type="text" 
                               className="form-control" 
                               placeholder="" 
                               value={lrNo}
                               onChange={(e) => setLrNo(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Vehicle No:</label>
                             <input 
                               type="text" 
                               className="form-control" 
                               placeholder="" 
                               value={vehicleNo}
                               onChange={(e) => setVehicleNo(e.target.value)}
                             />
                          </div>
                      </div>
                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">Remark</label>
                             <textarea 
                               name="" 
                               className="form-control" 
                               id=""
                               value={remark}
                               onChange={(e) => setRemark(e.target.value)}
                             ></textarea>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="">For E-Invoice :</label>
                             <select 
                               name="eInvoice" 
                               className="form-control" 
                               id=""
                               value={eInvoice}
                               onChange={(e) => setEInvoice(e.target.value)}
                             >
                                <option value="">Bussiness To Bussiness</option>
                             </select>
                          </div>
                          <div className="col-md-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <input 
                              type="checkbox" 
                              placeholder="" 
                              checked={isService}
                              onChange={(e) => setIsService(e.target.checked)}
                            />
                            <label htmlFor=""> ISService</label>
                            </div>

                            <div className="col-2 mt-4">
                                <input type="file" id="file-upload" style={{ display: 'none' }} />
                                <label htmlFor="file-upload" style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                    DooTC Upload 
                                </label>
                            </div>
                          <div className="col-md-2 mt-4">
                            <button 
                              type="button"
                              className="btn btn-success"
                              onClick={handleSaveGSTSalesReturn}
                              disabled={savingData}
                            >
                              {savingData ? "Saving..." : "Save Debit Note"}
                            </button>
                            <button 
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleClearForm}
                            >
                              Clear
                            </button>
                            {saveSuccess && <div className="alert alert-success mt-2">Data saved successfully!</div>}
                            {saveError && <div className="alert alert-danger mt-2">Error: {saveError}</div>}
                          </div>

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


export default GSTSalesReturn