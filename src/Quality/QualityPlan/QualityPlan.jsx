import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./QualityPlan.css";
import axios from "axios";
import * as XLSX from "xlsx";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const QualityPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainGroup, setMainGroup] = useState("Select");
  const [itemName, setItemName] = useState("");

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
      if (mainGroup && mainGroup !== "Select") params.main_group = mainGroup;
      if (itemName) params.item_name = itemName;

      const resp = await axios.get("http://127.0.0.1:8000/Quality/quality-plan/", { params });
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setPlanList(data);
    } catch (error) {
      console.error("Error fetching quality plan:", error);
      setPlanList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMainGroup("Select");
    setItemName("");
    setPlanList([]);
  };

  const handleViewAll = async () => {
    setLoading(true);
    setMainGroup("Select");
    setItemName("");
    try {
      const resp = await axios.get("http://127.0.0.1:8000/Quality/quality-plan/");
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setPlanList(data);
    } catch (error) {
      console.error("Error viewing all quality plans:", error);
      setPlanList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (planList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = planList.map((row, index) => ({
      "Sr.": index + 1,
      "Item No": row.item_no || row.ItemNo || "",
      "Item Code": row.item_code || row.ItemCode || "",
      "Item Description": row.item_description || row.ItemDescription || row.description || "",
      "Operation": row.operation || row.Operation || "",
      "User": row.user || row.User || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quality Control Plan List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Quality_Control_Plan_List.xlsx");
  };

  return (
    <div className="QualityPlanMaster">
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
              <div className="QualityPlanList mt-5">
                <div className="QualityPlanList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Quality Control Plan List </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <button type="button" className="btn" to="/">
                        New Plan
                      </button>
                      <button type="button" className="btn" onClick={handleExportExcel}>
                        Export Report
                      </button>
                     </div>
                  </div>
                </div>

                <div className="ProQualityPlan-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Main Group :</label>
                        <select className="form-control" style={{marginTop:"1px"}} value={mainGroup} onChange={(e) => setMainGroup(e.target.value)}>
                          <option value="Select">Select</option>
                          <option value="FG">FG</option>
                          <option value="RM">RM</option>
                          <option value="Tools">Tools</option>
                          <option value="Instrument">Instrument</option>
                          <option value="Machine">Machine</option>
                          <option value="Consumable">Consumable</option>
                          <option value="Safety Equ">Safety Equ</option>
                          <option value="Service">Service</option>
                          <option value="Asset">Asset</option>
                          <option value="F4">F4</option>
                          <option value="Scrap">Scrap</option>
                          <option value="SF">SF</option>
                          <option value="BO">BO</option>
                          <option value="DI">DI</option>
                        </select>
                      </div>

                      {/* Item Name */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Item Name:</label>
                        <input type="text" className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                      </div>

                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" onClick={handleSearch}>
                          Search
                      </button> 
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" onClick={handleClear}>
                          Clear
                      </button> 
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-1 mt-5">
                      <button type="button" className="btn btn-primary w-100" onClick={handleViewAll}>
                          View All
                      </button> 
                      </div>
                
                    </div>
                  </div>
                </div>

             <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Description</th>
                          <th scope="col">Operation</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Del</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="9" className="text-center">Loading...</td>
                          </tr>
                        ) : planList.length === 0 ? (
                          <tr>
                            <td colSpan="9" className="text-center">No records found</td>
                          </tr>
                        ) : (
                          planList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.item_no || row.ItemNo || ""}</td>
                              <td>{row.item_code || row.ItemCode || ""}</td>
                              <td>{row.item_description || row.ItemDescription || row.description || ""}</td>
                              <td>{row.operation || row.Operation || ""}</td>
                              <td>{row.user || row.User || ""}</td>
                              <td className="text-center" style={{ cursor: "pointer" }}><FaEdit className="text-warning" /></td>
                              <td className="text-center" style={{ cursor: "pointer" }}><FaTrash className="text-danger" /></td>
                              <td className="text-center" style={{ cursor: "pointer" }}><FaEye className="text-primary" /></td>
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

export default QualityPlan