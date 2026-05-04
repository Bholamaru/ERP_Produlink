import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './ScheduleMonth.css';
import { Link } from "react-router-dom";


const ScheduleMonth = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [monthData, setMonthData] = useState([]);
  const [formData, setFormData] = useState({
    month_name: "",
    from_date: "",
    to_date: "",
    month_no: "",
    year_no: "",
    w_days: ""
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchScheduleMonths = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Settings/schedule-month/");
      if (response.ok) {
        const data = await response.json();
        // Handle direct arrays, DRF paginated 'results', and nested 'data' wrappers
        let processedData = [];
        if (Array.isArray(data)) {
          processedData = data;
        } else if (data && Array.isArray(data.results)) {
          processedData = data.results;
        } else if (data && Array.isArray(data.data)) {
          processedData = data.data;
        }
        setMonthData(processedData);
      }
    } catch (error) {
      console.error("Error fetching schedule months:", error);
    }
  };

  useEffect(() => {
    fetchScheduleMonths();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      monthName: "month_name",
      fromDate: "from_date",
      toDate: "to_date",
      monthNo: "month_no",
      yearNo: "year_no",
      wDays: "w_days"
    };
    
    setFormData(prev => {
      const updated = { ...prev, [fieldMap[id]]: value };
      
      // Auto-fill Month No and Year No from From Date
      if (id === "fromDate" && value) {
        const [year, month] = value.split("-");
        updated.month_no = parseInt(month).toString();
        updated.year_no = year;
        
        // Optional: Auto-fill Month Name as well (e.g., MAY 2026)
        const dateObj = new Date(value);
        const monthName = dateObj.toLocaleString('default', { month: 'long' }).toUpperCase();
        updated.month_name = `${monthName} ${year}`;
      }
      
      return updated;
    });
  };

  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule month?")) return;
    try {
      const response = await fetch(`https://erp-render.onrender.com/Settings/schedule-month/${id}/`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Schedule Month deleted successfully!");
        setMonthData(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete schedule month.");
      }
    } catch (error) {
      console.error("Error deleting schedule month:", error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      month_name: item.month_name || "",
      from_date: item.from_date || "",
      to_date: item.to_date || "",
      month_no: item.month_no?.toString() || "",
      year_no: item.year_no?.toString() || "",
      w_days: item.w_days?.toString() || item.w_day?.toString() || ""
    });
    window.scrollTo(0, 0); // Scroll to top to see form
  };

  const handleSubmit = async () => {
    const loggedInUser = localStorage.getItem("username") || "Admin";
    const payload = {
      month_name: formData.month_name,
      from_date: formData.from_date,
      to_date: formData.to_date,
      month_no: formData.month_no,
      year_no: formData.year_no,
      w_days: formData.w_days,
      user: loggedInUser
    };

    const url = editingId 
      ? `https://erp-render.onrender.com/Settings/schedule-month/${editingId}/`
      : "https://erp-render.onrender.com/Settings/schedule-month/";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json().catch(() => ({}));
        const savedItem = responseData.data || responseData;
        alert(editingId ? "Schedule Month updated successfully!" : "Schedule Month added successfully!");
        
        if (editingId) {
          setMonthData(prev => prev.map(item => item.id === editingId ? savedItem : item));
          setEditingId(null);
        } else {
          setMonthData(prev => [...prev, savedItem]);
        }

        setFormData({
          month_name: "",
          from_date: "",
          to_date: "",
          month_no: "",
          year_no: "",
          w_days: ""
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error saving schedule month:", error);
    }
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="ScheduleMonthMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ScheduleMonth mt-5">
                  <div className="Schedule-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Schedule Month Master</h5>
                      </div>
                      <div className="col-md-8 text-end">

<Link type="button" className="btn" to='/WeekMaster'>Week Master</Link>




</div>
                    </div>
                  </div>
                  <div className="Schedule-Main">
  <div className="container-fluid">
    <div className="schedule-compact-row">
      <div className="form-item">
        <label>Month Name</label>
        <input type="text" id="monthName" className="form-control" placeholder="Enter month name" value={formData.month_name} onChange={handleInputChange} />
      </div>
      <div className="form-item">
        <label>From Date</label>
        <input type="date" id="fromDate" className="form-control" value={formData.from_date} onChange={handleInputChange} />
      </div>
      <div className="form-item">
        <label>To Date</label>
        <input type="date" id="toDate" className="form-control" value={formData.to_date} onChange={handleInputChange} />
      </div>
      <div className="form-item">
        <label>Month No</label>
        <input type="text" id="monthNo" className="form-control" placeholder="MM" style={{ width: '50px' }} value={formData.month_no} onChange={handleInputChange} />
      </div>
      <div className="form-item">
        <label>Year No</label>
        <input type="text" id="yearNo" className="form-control" placeholder="YYYY" style={{ width: '70px' }} value={formData.year_no} onChange={handleInputChange} />
      </div>
      <div className="form-item">
        <label>W Days</label>
        <input type="text" id="wDays" className="form-control" placeholder="Days" style={{ width: '60px' }} value={formData.w_days} onChange={handleInputChange} />
      </div>
      <div className="form-item-btn">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  </div>
</div>


                  <div className="Schedule-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Month Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Month No</th>
                            <th>Year No</th>
                            <th>W Days</th>
                            <th>User</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(monthData) && monthData.map((item, index) => (
                            <tr key={item.id || index}>
                              <td>{index + 1}</td>
                              <td>{item.month_name}</td>
                              <td>{item.from_date}</td>
                              <td>{item.to_date}</td>
                              <td>{item.month_no}</td>
                              <td>{item.year_no}</td>
                              <td>{item.w_days || item.w_day}</td>
                              <td>{item.user || "Admin"}</td>
                              <td><button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(item)}>Edit</button></td>
                              <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default ScheduleMonth
