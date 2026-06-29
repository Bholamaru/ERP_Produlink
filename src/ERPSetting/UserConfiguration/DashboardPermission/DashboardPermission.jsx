import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './DashboardPermision.css'

const dashboardPermissionsData = {
  Financial: [
    { name: "Alerts", module: "Financial" },
    { name: "Total Records", module: "Financial" },
    { name: "sales and purchase", module: "Financial" },
    { name: "Daily sales", module: "Financial" },
    { name: "Monthly sales", module: "Financial" },
    { name: "Top 5 (sales) customer / item", module: "Financial" },
    { name: "Item wise dispatch", module: "Financial" },
    { name: "Business plan", module: "Financial" },
    { name: "State wise sales", module: "Financial" }
  ],
  Purchase: [
    { name: "Monthly purchase", module: "Purchase" },
    { name: "Daily purchase", module: "Purchase" },
    { name: "Purchase orders", module: "Purchase" },
    { name: "Top 5 suppliers/top 5 items", module: "Purchase" },
    { name: "GRN Value Summary", module: "Purchase" },
    { name: "GRN Value Details", module: "Purchase" },
    { name: "Supplier Rating Summary", module: "Purchase" }
  ],
  PPC: [
    { name: "Schedule Quantity Month Wise", module: "PPC" },
    { name: "Monthly Production Chart", module: "PPC" },
    { name: "delivery Performance", module: "PPC" },
    { name: "Monthly Schedules vs Dispatch", module: "PPC" },
    { name: "Monthly Sales Order vs Dispatch", module: "PPC" },
    { name: "Daily Production", module: "PPC" },
    { name: "Today's Dispatch Plan", module: "PPC" },
    { name: "Upcoming Dispatch", module: "PPC" }
  ],
  OEE: [
    { name: "MACHINE UTILIZATION", module: "OEE" },
    { name: "OPERATOR EFFICIENCY", module: "OEE" },
    { name: "SHIFTWISE OEE", module: "OEE" },
    { name: "OEE GRAPHS", module: "OEE" }
  ],
  Quality: [
    { name: "TREND OF REJECTION % AT OPERATION LEVEL", module: "Quality" },
    { name: "ITEMWISE REJECT", module: "Quality" },
    { name: "ITEMWISE REWORK", module: "Quality" },
    { name: "SCRAP VALUE REPORT", module: "Quality" },
    { name: "SALES RETURN CUSTOMER", module: "Quality" },
    { name: "CUSTOMER COMPLAINTS (CAPA)", module: "Quality" }
  ],
  Stores: [
    { name: "FAVORITE ITEM STOCK", module: "Stores" },
    { name: "MIN/MAX LEVELS", module: "Stores" },
    { name: "INWARD STOCK DIST.", module: "Stores" },
    { name: "OUTWARD STOCK DIST.", module: "Stores" },
    { name: "MATERIAL ISSUE CHALLAN", module: "Stores" },
    { name: "ITEM WISE STOCK REPORT", module: "Stores" }
  ],
  Subcon: [
    { name: "57F4 CHALLAN AGEING", module: "Subcon" }
  ]
};

const DashboardPermission = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [selectedDept, setSelectedDept] = useState("Financial");
    const [permissions, setPermissions] = useState({});

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

    // Initialize permission state
    useEffect(() => {
        const initial = {};
        Object.keys(dashboardPermissionsData).forEach(dept => {
            dashboardPermissionsData[dept].forEach(perm => {
                initial[perm.name] = false;
            });
        });
        setPermissions(initial);
    }, []);

    const handleToggle = (name) => {
        setPermissions(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleSelectAll = (checked) => {
        const currentDeptPerms = dashboardPermissionsData[selectedDept] || [];
        setPermissions(prev => {
            const updated = { ...prev };
            currentDeptPerms.forEach(perm => {
                updated[perm.name] = checked;
            });
            return updated;
        });
    };

    const handleSave = () => {
        toast.success("Dashboard permissions saved successfully!");
    };

    const handleCancel = () => {
        const initial = {};
        Object.keys(dashboardPermissionsData).forEach(dept => {
            dashboardPermissionsData[dept].forEach(perm => {
                initial[perm.name] = false;
            });
        });
        setPermissions(initial);
        toast.info("Changes discarded.");
    };

    const currentDeptPerms = dashboardPermissionsData[selectedDept] || [];
    const isAllChecked = currentDeptPerms.length > 0 && currentDeptPerms.every(perm => permissions[perm.name]);

  return (
    <div className="DashboardPermission">
    <ToastContainer />
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
                        <div className="dashboardp mt-5">
                            <div className="dash-header mb-4 text-start">
                                <h5 className="header-title">Dashboard Permission</h5>
                            </div>

                            <div className="dash-main text-start">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-1 col-sm-3">
                                        <label htmlFor="dept-select">Select Dept:</label>
                                    </div>
                                    <div className="col-md-3 col-sm-9">
                                        <select 
                                            id="dept-select"
                                            className="form-select"
                                            value={selectedDept}
                                            onChange={(e) => setSelectedDept(e.target.value)}
                                        >
                                            <option value='Financial'>Financial</option>
                                            <option value='Purchase'>Purchase</option>
                                            <option value='PPC'>PPC</option>
                                            <option value='OEE'>OEE</option>
                                            <option value='Quality'>Quality</option>
                                            <option value='Stores'>Stores</option>
                                            <option value='Subcon'>Subcon</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            id="enable-all"
                                            className="form-check-input me-2" 
                                            checked={isAllChecked}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                        <label htmlFor="enable-all">Enable All Permissions</label>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-end">
                                        <button onClick={handleSave} className="btn btn-success me-2">Save</button>
                                        <button onClick={handleCancel} className="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>

                            <div className="dash-main text-start">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Sr</th>
                                                <th>Permission Name</th>
                                                <th>Module Name</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentDeptPerms.map((perm, index) => (
                                                <tr key={perm.name}>
                                                    <td>{index + 1}</td>
                                                    <td>{perm.name}</td>
                                                    <td>{perm.module}</td>
                                                    <td>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={permissions[perm.name] || false}
                                                            onChange={() => handleToggle(perm.name)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            {currentDeptPerms.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No permissions found for this department.</td>
                                                </tr>
                                            )}
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

export default DashboardPermission
