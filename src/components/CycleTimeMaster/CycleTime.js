import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CycleTime.css";
import { useNavigate } from "react-router-dom";

const CycleTime = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  // 🔹 API CALL
  useEffect(() => {
    fetchCycleTimeList();
  }, []);

  const fetchCycleTimeList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/All_Masters/cycle/time/list"
      );
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching cycle time list:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(records.length / recordsPerPage);

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
                          <h5 className="header-title">Cycle Time Master</h5>
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
                    <div className="container-fluid">
                      <div className="row text-start centerselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="selectPlant"
                            className="col-form-label"
                          >
                            Item Search
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                        <div className="col-md-1 mt-1 text-md-start">
                          <button className="vndrbtn">Search</button>
                        </div>
                        <div className="col-md-1 mt-1  text-md-end">
                          <button className="vndrbtn">View All</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="CycletimeTable mt-2">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table table-striped mt-2">
                            <thead>
                              <tr>
                                <th scope="col">Sr</th>
                                <th scope="col">Item No.</th>
                                <th scope="col">Item Desc</th>
                                <th scope="col">Op No</th>
                                <th scope="col">PartCode</th>
                                <th scope="col">Machine Type</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Edit</th>
                                <th scope="col">View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td colSpan="9" className="text-center">
                                    Loading...
                                  </td>
                                </tr>
                              ) : records.length > 0 ? (
                                currentRecords.map((record, index) => (
                                  <tr key={index}>
                                    <td>{indexOfFirstRecord + index + 1}</td>
                                    <td>{record.item_no}</td>
                                    <td>{record.item_desc}</td>
                                    <td>{record.op_no}</td>
                                    <td>{record.part_code}</td>
                                    <td>{record.machine_type}</td>
                                    <td>
                                      <button className="btn">
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn">
                                        <i className="fas fa-edit"></i>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn">
                                        <i className="fas fa-eye"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="9" className="text-center">
                                    No Records Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {records.length > 10 && (
                          <nav className="mt-3">
                            <ul className="pagination justify-content-end">

                              {/* Previous */}
                              <li className={`vndrbtn page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                  className="vndrbtn page-link"
                                  onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                  Previous
                                </button>
                              </li>

                              {/* Page Numbers */}
                              {[...Array(totalPages)].map((_, index) => (
                                <li
                                  key={index}
                                  className={`vndrbtn page-item ${currentPage === index + 1 ? "active" : ""
                                    }`}
                                >
                                  <button
                                    className="vndrbtn page-link"
                                    onClick={() => setCurrentPage(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              ))}

                              {/* Next */}
                              <li
                                className={`vndrbtn page-item ${currentPage === totalPages ? "disabled" : ""
                                  }`}
                              >
                                <button
                                  className="vndrbtn page-link"
                                  onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                  Next
                                </button>
                              </li>

                            </ul>
                          </nav>
                        )}

                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="record-count text-start"
                    style={{ color: "blue", padding: "10px" }}
                  >
                    Total Records: {records.length}
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
