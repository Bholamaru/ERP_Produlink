import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CycleTime.css";
import { useNavigate } from "react-router-dom";
import { fetchCycleTimeList, deleteCycleTimeData } from "../../Service/Api.jsx";

const CycleTime = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const fetchCycleTimeListItems = async () => {
    setLoading(true);
    try {
      const data = await fetchCycleTimeList();
      const recordsData = Array.isArray(data) ? data.reverse() : [];
      setRecords(recordsData);
      setFilteredRecords(recordsData);
    } catch (error) {
      console.error("Error fetching cycle time list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycleTimeListItems();
  }, []);

  const handleSearch = () => {
    const filtered = records.filter(record =>
      (record.part_no && record.part_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.part_desc && record.part_desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.PartCode && record.PartCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRecords(filtered);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    setFilteredRecords(records);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteCycleTimeData(id);
        fetchCycleTimeListItems();
      } catch (error) {
        console.log("Failed to delete record");
      }
    }
  };

  const handleEdit = (record) => {
    navigate("/add-cycle-time", { state: { editRecord: record } });
  };

  const handleAddNewCycleTime = () => {
    navigate("/add-cycle-time");
  };

  return (
    <div className="Cycletimecenter">
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
                <div className="Cycletimermaster">
                  <div className="Cycletime">
                    <div className="Cycletime-header mb-2 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="header-title" style={{ color: "blue", fontWeight: "bold" }}>Cycle Time Master</h5>
                        </div>
                        <div className="col-md-6 text-md-end text-start mt-2 mt-md-0">
                          <button
                            className="vndrbtn me-2"
                            onClick={handleAddNewCycleTime}
                          >
                            Add New Cycle Time
                          </button>
                          <button className="vndrbtn me-2">Report</button>
                          <button className="vndrbtn">Export Report</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="CycletimeMain mt-2">
                    <div className="container-fluid border py-3 bg-light rounded">
                      <div className="row text-start align-items-center">
                        <div className="col-md-2 col-sm-3">
                          <label className="col-form-label fw-bold">Item Search</label>
                        </div>
                        <div className="col-md-4 col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Part No or Desc"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="col-md-1 mt-1">
                          <button className="vndrbtn btn-sm w-100" onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-1 mt-1">
                          <button className="vndrbtn btn-sm w-100" onClick={handleViewAll}>View All</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="CycletimeTable mt-2">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table table-bordered mt-2 text-center">
                            <thead style={{ backgroundColor: "#00BFFF", color: "white" }}>
                              <tr>
                                <th scope="col">Sr</th>
                                <th scope="col">Part No</th>
                                <th scope="col">Part Description</th>
                                <th scope="col">Part Code</th>
                                <th scope="col">Machine Type</th>
                                <th scope="col">Machine</th>
                                <th scope="col">Total Time</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Edit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td colSpan="9" className="text-center">Loading...</td>
                                </tr>
                              ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((record, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record.part_no}</td>
                                    <td>{record.part_desc}</td>
                                    <td>
                                      {record.PartCode && record.PartCode.includes(" | ")
                                        ? record.PartCode
                                        : `${record.op_no || record.OPNo || ""} | ${record.PartCode || record.part_code || ""} | ${record.operation || ""}`}
                                    </td>
                                    <td>{record.MachineType}</td>
                                    <td>{record.Machine}</td>
                                    <td>{record.Total_Time}</td>
                                    <td>
                                      <button className="Cycletimetableww" onClick={() => handleDelete(record.id)}>
                                        <i className="fas fa-trash-alt text-danger"></i>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="Cycletimetableww" onClick={() => handleEdit(record)}>
                                        <i className="fas fa-edit text-primary"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="9" className="text-center fw-bold text-muted">No Records Found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="record-count text-start mt-2" style={{ color: "blue", fontWeight: "bold" }}>
                    Total Records: {filteredRecords.length}
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

export default CycleTime;
