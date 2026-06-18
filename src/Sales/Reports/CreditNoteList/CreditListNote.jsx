
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CreditListNote.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as XLSX from "xlsx";

const defaultNoteList = [
  {
    year: "24-25",
    plant: "Produlink",
    note_no: "CN24250001",
    note_date: "24-12-02",
    code: "CUST001",
    party_name: "Ram kumawat",
    amount: 1500,
    user: "Anupam",
    irn: "Yes",
    cancel: "No"
  },
  {
    year: "24-25",
    plant: "Produlink",
    note_no: "CN24250002",
    note_date: "24-12-05",
    code: "CUST002",
    party_name: "Bajaj Auto Ltd",
    amount: 5000,
    user: "Admin",
    irn: "Yes",
    cancel: "No"
  }
];


const CreditListNote  = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [plant, setPlant] = useState("");
    const [partyName, setPartyName] = useState("");
    const [noteList, setNoteList] = useState(defaultNoteList);
    const [loading, setLoading] = useState(false);

      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/'); 
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
      if (partyName) params.party_name = partyName;

      const response = await axios.get("http://127.0.0.1:8000/Sales/creditnote/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setNoteList(data);
    } catch (error) {
      console.error("Error fetching credit notes:", error);
      const filtered = defaultNoteList.filter(row => {
        if (partyName && !row.party_name.toLowerCase().includes(partyName.toLowerCase())) return false;
        return true;
      });
      setNoteList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (noteList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = noteList.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.year || "24-25",
      "Plant": row.plant || "",
      "Note No": row.note_no || "",
      "Note Date": row.note_date || "",
      "Code": row.code || "",
      "Cust/Supp. Name": row.party_name || "",
      "Amount": row.amount || 0,
      "User": row.user || "",
      "IRN": row.irn || "",
      "Cancel": row.cancel || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Credit Notes");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Credit_Note_List.xlsx");
  };

  return (
    <div className="CreditListNoteMaster">
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
              <div className="CreditListNote">
                <div className="CreditListNote-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Credit Note List </h5>
                    </div>

                    <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" onClick={handleExportExcel} >
                            Export Excel
                        </button> 
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                            Credit Note - Query
                        </button> 
                    </div>

                  </div>
                </div>
               
                <div className="CreditListNote-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                       <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To:</label>
                          <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label htmlFor="">Plant:</label>
                        <select className="form-control" style={{marginTop:"-0px"}} value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="">Produlink</option>
                        </select>
                      </div>
                  
                      <div className="col-sm-6 col-md-2 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Party Name: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" value={partyName} onChange={(e) => setPartyName(e.target.value)} />
                      </div>
                        
                       <div className="col-6 col-md-2 align-items-center mt-3">
                          <button type="button" className=" vndrbtn" onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                          </button>
                        </div>

                        </div>

                    </div>
                  </div>

                  <div className="table-responsive mt-5">
                                  <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>Sr.</th>
                                            <th>Year </th>
                                            <th>Plant</th>
                                            <th>Note No</th>
                                            <th>Note Date </th>
                                            <th>Code </th>
                                            <th>Cust/Supp. Name</th>
                                            <th>Amount</th>
                                            <th>User</th>
                                            <th>IRN</th>
                                            <th>Cancel</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Del</th>
                                            <th>All</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {loading ? (
                                            <tr>
                                              <td colSpan="15" className="text-center">Loading...</td>
                                            </tr>
                                          ) : noteList.length === 0 ? (
                                            <tr>
                                              <td colSpan="15" className="text-center">No records found</td>
                                            </tr>
                                          ) : (
                                            noteList.map((row, index) => (
                                              <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.year || "24-25"}</td>
                                                <td>{row.plant || ""}</td>
                                                <td>{row.note_no || ""}</td>
                                                <td>{row.note_date || ""}</td>
                                                <td>{row.code || ""}</td>
                                                <td>{row.party_name || ""}</td>
                                                <td>{row.amount || 0}</td>
                                                <td>{row.user || ""}</td>
                                                <td>{row.irn || ""}</td>
                                                <td>{row.cancel || ""}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                              </tr>
                                            ))
                                          )}
                                        </tbody>
                                 </table>
                                            
                                  <div className="row">
                                        <div className="col-4 text-start">Total Record : 00</div>
                                        <div className="col-2"></div>                                             <div className="col-6 text-end">Total Amount : 00.00 
                                            <button className=" vndrbtn">Bulk Print</button>
                                            <button className=" vndrbtn">Delete Selected</button>
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
  )
}


export default CreditListNote