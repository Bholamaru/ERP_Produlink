import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GLMaster.css";
import { FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import axios from "axios";

const GLMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [glCode, setGlCode] = useState("");
  const [glName, setGlName] = useState("");
  const [glCategory, setGlCategory] = useState("General");
  const [editingId, setEditingId] = useState(null);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get("http://127.0.0.1:8000/Account/general-ledger/", { headers });
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching GL data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!glCode.trim() || !glName.trim()) {
      alert("Please enter GL Code and GL Name");
      return;
    }
    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const username = localStorage.getItem("username") || "Admin";

    const payload = {
      gl_code: glCode,
      gl_description: glName,
      gl_category: glCategory,
      user: username
    };

    try {
      if (editingId) {
        // Update
        const response = await axios.put(`http://127.0.0.1:8000/Account/general-ledger/${editingId}/`, payload, { headers });
        if (response.status === 200 || response.status === 201) {
          alert("General Ledger updated successfully");
          setEditingId(null);
        }
      } else {
        // Create
        const response = await axios.post("http://127.0.0.1:8000/Account/general-ledger/", payload, { headers });
        if (response.status === 200 || response.status === 201) {
          alert("General Ledger created successfully");
        }
      }
      setGlCode("");
      setGlName("");
      setGlCategory("General");
      fetchData();
    } catch (error) {
      console.error("Error saving General Ledger:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setGlCode(item.gl_code || "");
    setGlName(item.gl_description || "");
    setGlCategory(item.gl_category || "General");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this General Ledger?")) {
      return;
    }
    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/Account/general-ledger/${id}/`, { headers });
      if (response.status === 200 || response.status === 204) {
        alert("General Ledger deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting General Ledger:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleExportExcel = () => {
    if (dataList.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["Sr. No.", "GL Code", "GL Description", "GL Category", "User"];
    const rows = dataList.map((data, index) => [
      index + 1,
      data.gl_code || "",
      data.gl_description || "",
      data.gl_category || "",
      data.user || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "General_Ledger_Master.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gl-master">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="header-title text-start">
                          General Ledger Master
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2" onClick={handleExportExcel}>
                          <FaFileExcel /> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-end mt-2 mb-3">
                      <div className="col-md-3">
                        <label className="form-label mb-1">GL Code :</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Enter GL Code" 
                          value={glCode}
                          onChange={(e) => setGlCode(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label mb-1">GL Name :</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Enter GL Name" 
                          value={glName}
                          onChange={(e) => setGlName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1">GL Category :</label>
                        <select 
                          className="form-select"
                          value={glCategory}
                          onChange={(e) => setGlCategory(e.target.value)}
                        >
                          <option value="General">General</option>
                          <option value="Other">Other</option>
                          <option value="TCS">TCS</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                        <button className="btn w-100" onClick={handleSave}>
                          {editingId ? "Update" : "Save"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>GL Code</th>
                          <th>GL Description</th>
                          <th>GL Category</th>
                          <th>User</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataList.map((data, index) => (
                          <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.gl_code}</td>
                            <td>{data.gl_description}</td>
                            <td>{data.gl_category}</td>
                            <td>{data.user}</td>
                            <td>
                              <button className="btn btn-sm" onClick={() => handleEdit(data)}>
                                <FaEdit />
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-sm" onClick={() => handleDelete(data.id)}>
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {dataList.length === 0 && !loading && (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              No General Ledger records found.
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
  );
};

export default GLMaster;
