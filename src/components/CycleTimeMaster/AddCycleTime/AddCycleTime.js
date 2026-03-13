"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import NavBar from "../../../NavBar/NavBar"
import SideNav from "../../../SideNav/SideNav"
import "./AddCycleTime.css"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { saveCycleTimeData, updateCycleTimeData, deleteCycleTimeData, fetchCycleTimeList } from "../../../Service/Api.jsx"

const AddCycleTime = () => {

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen)
  }
  const navigate = useNavigate()
  const handleAddNewCycleTime = () => {
    navigate("/cycle-time-master")
  }

  const [formData, setFormData] = useState({
    Plant: "",
    PartCode: "",
    MachineType: "",
    Machine: "",
    OPTime: "",
    Load_Unload_Time: "",
    MO_Time: "",
    Total_Time: "",
    Time_in_Minutes: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.OPTime) {
      newErrors.OPTime = "This field is required"
    }

    if (!formData.Load_Unload_Time) {
      newErrors.Load_Unload_Time = "This field is required"
    }

    if (!formData.MO_Time) {
      newErrors.MO_Time = "This field is required"
    }

    if (!formData.Total_Time) {
      newErrors.Total_Time = "This field is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      try {
        setIsSubmitting(true);

        if (editId) {
          await updateCycleTimeData(editId, formData);
          toast.success("Data updated successfully!");
        } else {
          await saveCycleTimeData(formData);
          toast.success("Data saved successfully!");
        }

        console.log("formData", formData);
        handleClear(); // Reset form and editId
        loadCycleTime(); // Refresh table data
      } catch (error) {
        toast.error("Error saving data. Please try again.");
        console.log("error", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  const handleClear = () => {
    setFormData({
      Plant: "",
      PartCode: "",
      MachineType: "",
      Machine: "",
      OPTime: "",
      Load_Unload_Time: "",
      MO_Time: "",
      Total_Time: "",
      Time_in_Minutes: "",
    })
    setErrors({})
    setEditId(null); // Exit edit mode
  }

  const [cycleTimeList, setCycleTimeList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadCycleTime();
  }, []);

  const loadCycleTime = async () => {
    try {
      const data = await fetchCycleTimeList();
      setCycleTimeList(data.reverse());
    } catch (err) {
      console.error("Failed to fetch cycle time", err);
    }
  };
  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {

    await deleteCycleTimeData(id);
    toast.success("Deleted successfully");
    loadCycleTime();

  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cycleTimeList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cycleTimeList.length / itemsPerPage);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);


  let searchTimeout = null;

  const fetchItemByPartNo = (value) => {
    clearTimeout(searchTimeout);

    if (!value || value.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    searchTimeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/All_Masters/cycle/master/item/?part_no=${value}`
        );

        if (!response.ok) {
          setSearchResults([]);
          setShowDropdown(true);
          return;
        }

        const data = await response.json();
       
        if (data && Array.isArray(data.operations)) {
          setSearchResults(data.operations);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(true);
        }

      } catch (error) {
        console.error("Search API error", error);
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);
  };






  return (
    <div className="AddCycletime">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="AddCycletimermaster">
                  <div className="">
                    <div className="AddCycletime-header text-start">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <h5 className="header-title">Cycle Time Master</h5>
                        </div>
                        <div className="col-md-4 text-md-end text-start mt-3 mt-md-0">
                          <p style={{ color: "green" }}>**Note: Please Enter Time in Seconds</p>
                        </div>
                        <div className="col-md-3 text-md-end text-start mt-2 mt-md-0">
                          <button className="vndrbtn me-2" onClick={handleAddNewCycleTime}>
                            Cycle Time Master List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="AddCycletime-Main mt-2">
                    <div className="container-fluid">
                      <div className="row text-start centerselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label htmlFor="selectPlant" className="col-form-label">
                            Item Search
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSearchTerm(value);
                              fetchItemByPartNo(value);
                            }}
                            placeholder="Search Item No"
                          />

                          {showDropdown && (
                            <ul className="list-group position-absolute z-3">
                              {searchResults.length > 0 ? (
                                searchResults.map((op, index) => (
                                  <li
                                    key={index}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        PartCode: op.part_code,
                                        MachineType: op.operation,
                                      }));
                                      setShowDropdown(false);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <strong>OP {op.op_no}</strong> | {op.part_code} <br />
                                    <small className="text-muted">{op.operation}</small>
                                  </li>
                                ))
                              ) : (
                                <li className="list-group-item text-muted">
                                  No operations found
                                </li>
                              )}
                            </ul>
                          )}

                        </div>

                        <div className="col-md-1 col-sm-12 text-sm-start text-md-start">
                          <button className="vndrbtn mt-1">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="AddCycletime-Main mt-2">
                    <div className="container-fluid">
                      <form onSubmit={handleSubmit}>
                        <div className="row text-start">
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="Plant" className="form-label">
                                Plant
                              </label>
                              <select
                                className="form-select"
                                style={{ marginTop: "-1px" }}
                                id="Plant"
                                name="Plant"
                                value={formData.Plant}
                                onChange={handleChange}
                              >
                                <option value="">Select Plant</option>
                                <option value="Produlink">Produlink</option>

                              </select>
                              {/* {errors.Plant && (
                                <div className="text-danger">
                                  {errors.Plant}
                                </div>
                              )} */}
                            </div>
                          </div>

                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="PartCode" className="form-label">
                                Part Code
                              </label>
                              <select
                                className="form-select"
                                style={{ marginTop: "-1px" }}
                                id="PartCode"
                                name="PartCode"
                                value={formData.PartCode}
                                onChange={handleChange}
                              >
                                <option value="">Select Part Code</option>
                                {Array.isArray(searchResults) &&
                                  searchResults.map((item, index) => (
                                    <option key={index} value={item.part_code}>
                                      OP {item.op_no} - {item.part_code}
                                    </option>
                                  ))}


                              </select>
                              {/* {errors.PartCode && (
                                <div className="text-danger">
                                  {errors.PartCode}
                                </div>
                              )} */}
                            </div>
                          </div>

                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="MachineType" className="form-label">
                                Machine Type
                              </label>
                              <select
                                className="form-select"
                                style={{ marginTop: "-1px" }}
                                id="MachineType"
                                name="MachineType"
                                value={formData.MachineType}
                                onChange={handleChange}
                              >
                                <option value="">Select Machine Type</option>
                                {Array.isArray(searchResults) &&
                                  searchResults.map((item, index) => (
                                    <option key={index} value={item.operation}>
                                      {item.operation}
                                    </option>
                                  ))}

                              </select>
                              {/* {errors.MachineType && (
                                <div className="text-danger">
                                  {errors.MachineType}
                                </div>
                              )} */}
                            </div>
                          </div>

                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="Machine" className="form-label">
                                Machine
                              </label>
                              <select
                                className="form-select"
                                style={{ marginTop: "-1px" }}
                                id="Machine"
                                name="Machine"
                                value={formData.Machine}
                                onChange={handleChange}
                              >
                                <option value="">Select Machine</option>
                                <option value="Machine1">Machine 1</option>
                                <option value="Machine2">Machine 2</option>
                              </select>
                              {errors.Machine && <div className="text-danger">{errors.Machine}</div>}
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="OPTime" className="form-label">
                                Op Time<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="OPTime"
                                name="OPTime"
                                value={formData.OPTime}
                                onChange={handleChange}
                              />
                              {errors.OPTime && <div className="text-danger">{errors.OPTime}</div>}
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="Load_Unload_Time" className="form-label">
                                Load/Unload Time<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Load_Unload_Time"
                                name="Load_Unload_Time"
                                value={formData.Load_Unload_Time}
                                onChange={handleChange}
                              />
                              {errors.Load_Unload_Time && <div className="text-danger">{errors.Load_Unload_Time}</div>}
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="MO_Time" className="form-label">
                                Mo Time<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="MO_Time"
                                name="MO_Time"
                                value={formData.MO_Time}
                                onChange={handleChange}
                              />
                              {errors.MO_Time && <div className="text-danger">{errors.MO_Time}</div>}
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3">
                              <label htmlFor="Total_Time" className="form-label">
                                Total Time<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Total_Time"
                                name="Total_Time"
                                value={formData.Total_Time}
                                onChange={handleChange}
                              />
                              {errors.Total_Time && <div className="text-danger">{errors.Total_Time}</div>}
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <div className="mb-3 form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="Time_in_Minutes"
                                name="Time_in_Minutes"
                              />
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="Time_in_Minutes"
                                name="Time_in_Minutes"
                              // checked={formData.Time_in_Minutes}
                              // onChange={handleChange}
                              />
                              <label className="form-label" htmlFor="Time_in_Minutes">
                                Time in Minutes
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Time_in_Minutes"
                                name="Time_in_Minutes"
                                value={formData.Time_in_Minutes}
                                onChange={handleChange}
                              />
                              {/* {errors.Time_in_Minutes && (
                                <div className="text-danger">
                                  {errors.Time_in_Minutes}
                                </div>
                              )} */}
                            </div>
                          </div>

                          <div className="col-md-2 col-sm-6 mt-4">
                            <button type="submit" className="vndrbtn me-2" disabled={isSubmitting}>
                              {isSubmitting ? "Saving..." : "Add"}
                            </button>
                            <button type="button" className="vndrbtn" onClick={handleClear}>
                              Clear
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="AddCycletime-table mt-2">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-12">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Plant</th>
                                <th>Part Code</th>
                                <th>Machine Type</th>
                                <th>Machine</th>
                                <th>Op Time</th>
                                <th>Load/Unload</th>
                                <th>MO Time</th>
                                <th>Total</th>
                                <th>Time in Min</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.length > 0 ? currentItems.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{indexOfFirstItem + index + 1}</td>
                                  <td>{item.Plant}</td>
                                  <td>{item.PartCode}</td>
                                  <td>{item.MachineType}</td>
                                  <td>{item.Machine}</td>
                                  <td>{item.OPTime}</td>
                                  <td>{item.Load_Unload_Time}</td>
                                  <td>{item.MO_Time}</td>
                                  <td>{item.Total_Time}</td>
                                  <td>{item.Time_in_Minutes}</td>
                                  <td><button type="btn" style={{ "border": "none" }} onClick={() => handleEdit(item)}><i className="fas fa-edit"></i></button></td>
                                  <td><button type="btn" style={{ "border": "none" }} onClick={() => handleDelete(item.id)}><i className="fas fa-trash"></i></button></td>
                                </tr>
                              )) : (
                                <tr>
                                  <td colSpan="12" className="text-center">No Data Found!</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pagination mt-5 text-end">

                    <button
                      className="vndrbtn btn-light me-2"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`vndrbtn me-1 ${currentPage === i + 1 ? "btn-dark" : "btn-light"}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      className="vndrbtn btn-light ms-2"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>

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

export default AddCycleTime
