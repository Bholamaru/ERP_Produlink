import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./UserPermit.css";
import {
  fetchUsersDropdown,
  assignPermissions,
} from "../../../Service/Erpsetting.jsx";

const availablePermissions = {
  All_Masters: [
   "Masters", "Customer", "Business Partner Address", "Item Master", "Cross Reference", "Customer / Supplier Item Link", "Item Cross Reference", "GST Rate Master", 
                             "Commodity Master", "BOM Routing Master", "Work Center Master", "Cycle Time Master", 
                             "Operator and Supervisor Master", "Contractor Master", "Shift Master", "Work Center Schedule", 
                             "Unit Conversion", "Price List", "Price List Master", "Price List Entry", "Cost Center Master", "Project Management", 
                             "Document Management", "Master Report", "Customer State", "Master Customers", "Master State"
  ],
  Purchase: [
  "Purchase", "New Indent", "New Purchase Order", "New Jobwork Purchase Order", "Pending PO Release", 
                             "Pending Indent Release", "Purchase MRN Release", "Purchase Order Status", "Quote Comparison", "RFO", "Quoto Comparison Statement", "Quoto Comparison Pending", "Reports", "Purchase Order List", "Jobwork Purchase Order List", "Supplier Wise Item Purchase List", "Purchase Report (Cost Center Wise)", "Import"
  ],
  Store: [
  "Store", "Gate Inward Entry", "Pending ASN List", "New MRN", "Purchase GRN", "Subcon GRN", "57F4 Inward Challan", "JobWork Inward Challan", "Vendor Scrap Inward", 
                             "Material Issue Challan", "Material Issue Gernal", "Stock Transaction", "Opening Stock", "FG Movement", "RM Stock Transaction", "Stock Transfer", "Delivery Challan", 
                             "DC GRN", "Store Report", "GRN List", "MRN List", "Inward 57F4 Challan List", "Material Issue Challan List", "General Material Issue Challan List", "Deliver Challan List", "DC GRN List", "Indent List", "Indent Status", "Stock Report", "WIP Stock Report", "RM Stock Report", "Consumable Stock Report", "FG Stock Report"
  ],
  Production: [
   "Production", "Work Order Entry", "Work Order List", "Production Plan List", "Production Entry",
                              "Production Entry Ass.", "Production Report", "Rework Production", "Rework Production Entry2", "Rework Production Entry", "Rework Production Report", 
                                "Scrap Production", "Scrap/Rejection Entry", "Scrap/Rejection Report", "FG Scrap/Rejection Entry", "FG Scrap/Rejection Report", "Material Idle Time", "Breakdown Time Entry",
                                  "Breakdown Time Report", "Contractor Payment", "P Report", "Rejection Report", "Rework Report", "Default Ideal Time Report", "Breakdown Analysis Report", "Cycle Time Report", "Operator Performance Report"  ],
  ERPSetting: [
   "User Configuration", "ERP Configuration", "Change Password",
                              "Login History", "Dealer Management", "Dashboard Backup",
                                "Delete Record"
  ],
  Quality: [
    "Quality",
    "Quality Planning",
    "Purchase GRN QC",
    "Pending QC List",
    "Inward Test Certificate",
    "Subcon / JobWork GRN QC",
    "Pending QC Inward",
    "Inward Inspection List",
    "Inprocess QC",
    "Inprocess Inspection",
    "Inprocess Inspection List",
    "Sales Return QC",
    "Sales Return QC Pending List",
    "Sales Return QC List",
    "Gauges And Instruction Calibration",
    "Heat Code Register",
    "DTC - Dispatch Test Certificate",
    "PDI - Pre Dispatch Inspection",
    "First Piece Approval",
    "Set Up Approval",
    "Hot Inspection",
    "Sampling Plan",
    "Customer Complaint",
    "Customer Complaint Entry",
    "Customer Complaint Authorization",
    "Customer Complaint List",
    "Test Master",
    "Test Report",
    "Test Master",
    "Test Master List",
  ],
  Sales: [
    "Sales",
    "E-Invoicing",
    "GST Sales",
    "JobWork Sales",
    "Debit Note",
    "Credit Note",
    "Customer Sales Order",
    "Customer Sales Order Amendment",
    "Schedule Sales Order",
    "Customer Sales Order Status",
    "GST Invoice",
    "GST JobWork",
    "GST JobWork Invoice",
    "GST JobWork DC Return",
    "OutWard 57F4 Challan",
    "Credit / Debit Note",
    "Purchase Debit Note",
    "Sales Rate Diff Debit Note",
    "JobWork Rate Diff Debit Note",
    "Credit Note Entry",
    "GST Sales Return",
    "Material GatePass",
    "Material GatePass New",
    "Pending Material GatePass",
    "Material GatePass List",
    "Report",
    "Customer Sales Order List",
    "Tax Invoice List",
    "Tax Invoice List Bajaj",
    "JobWork Invoice List",
    "JobWork DC List",
    "OutWard 57F4 Challan List",
    "Debit Note List",
    "Credit Note List",
    "GST Sales Return List",
    "RG1 Register",
    "Transport List",
  ],
  VendorsUserManagement: ["VendorsUserManagement"],
};

const UserPermit = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [permissions, setPermissions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    fetchUsers();
    initializePermissions();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersDropdown();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const initializePermissions = () => {
    const initialPermissions = {};
    Object.keys(availablePermissions).forEach((module) => {
      initialPermissions[module] = {};
      availablePermissions[module].forEach((permission) => {
        initialPermissions[module][permission] = false;
      });
    });
    setPermissions(initialPermissions);
  };

  const handleSelectAll = () => {
    const updatedPermissions = { ...permissions };
    Object.keys(availablePermissions).forEach((module) => {
      availablePermissions[module].forEach((permission) => {
        updatedPermissions[module][permission] = !selectAll;
      });
    });
    setPermissions(updatedPermissions);
    setSelectAll(!selectAll);
  };

  const handleModuleSelect = (module) => {
    const modulePermissions = permissions[module];
    const allChecked = Object.values(modulePermissions).every(Boolean);
    const updatedPermissions = {
      ...permissions,
      [module]: Object.keys(modulePermissions).reduce((acc, permission) => {
        acc[permission] = !allChecked;
        return acc;
      }, {}),
    };
    setPermissions(updatedPermissions);
    setSelectedModule(module);
  };

  const handlePermissionToggle = (module, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission],
      },
    }));
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.warning("Please select a user");
      return;
    }

    const modulesToSubmit = {};
    Object.entries(permissions).forEach(([module, modulePermissions]) => {
      const selectedPermissions = Object.entries(modulePermissions)
        .filter(([_, isSelected]) => isSelected)
        .map(([permission]) => permission);

      if (selectedPermissions.length > 0) {
        modulesToSubmit[module] = selectedPermissions;
      }
    });

    try {
      const response = await assignPermissions(selectedUser, modulesToSubmit);
      console.log("Full response:", response);
      if (response.message === "Permissions assigned successfully") {
        toast.success("Permissions assigned successfully");
      } else {
        toast.info("Unexpected response format");
      }
    } catch (error) {
      console.error("Error assigning permissions:", error);
      toast.error("Error assigning permissions");
    }
  };

  const renderPermissions = (module) => {
    return (
      <div className="master-pages">
        <h3>{module} Permissions</h3>
        {availablePermissions[module]
          .filter((permission) =>
            permission.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((permission) => (
            <div key={permission} className="permission-item">
              <input
                type="checkbox"
                checked={permissions[module]?.[permission] || false}
                onChange={() => handlePermissionToggle(module, permission)}
                id={`${module}-${permission}`}
              />
              <label htmlFor={`${module}-${permission}`}>{permission}</label>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="UserPermit">
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen(!sideNavOpen)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen(!sideNavOpen)}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-permit">
                  <div className="permit-header mb-4 text-start mt-5">
                    <h5 className="header-title">User Permission</h5>
                  </div>
                  <div className="user-permit-header">
                    <div className="col-md-2">
                      <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="user-select"
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.FullName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-9">
                      <button type="button" className="btn">
                        Export User Permission
                      </button>
                      <button type="button" className="btn">
                        Export All User Permission
                      </button>
                      <button type="button" className="btn">
                        Export Modulewise Permission
                      </button>
                      <button type="button" className="btn">
                        Export Userwise Active Permission
                      </button>
                      <button type="button" className="btn">
                        Copy Permission
                      </button>
                    </div>
                    <div className="col-md-1">
                      <div className="select-all">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          id="select-all"
                        />
                        <label htmlFor="select-all">All</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Search permissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="permissions-container">
                    <div className="modules-list">
                      {Object.keys(availablePermissions).map((module) => (
                        <div key={module} className="module-item">
                          <div className="module-header">
                            <input
                              type="checkbox"
                              checked={Object.values(
                                permissions[module] || {}
                              ).every(Boolean)}
                              onChange={() => handleModuleSelect(module)}
                              id={`module-${module}`}
                            />
                            <label htmlFor={`module-${module}`}>{module}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedModule && renderPermissions(selectedModule)}
                  </div>
                  <button onClick={handleSubmit} className="submit-button">
                    Assign Permissions
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermit;
