import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DisableUserList.css";
import { Link } from "react-router-dom";

const DisableUserList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Simulated API call to get the list of disabled users
    setUsers([
      {
        id: 1,
        department: "Quality",
        fullName: "Bharat Chavan",
        userName: "bharat",
        password: "DisAbc*",
        disableDate: "02/10/2024 13:40:05",
        action: "Enable User",
      },
      {
        id: 2,
        department: "Planning",
        fullName: "Sangram Gutte",
        userName: "sangram",
        password: "DisAbc*",
        disableDate: "",
        action: "Enable User",
      },
      // Add more users
    ]);
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="DisableUserList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="DisableUser mt-5">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <h5 className="header-title text-start">Disable User List</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link to="/ErpSetting" className="btn btn-primary">
                          User Management
                        </Link>
                      </div>
                 
                  </div>

                  <div className="DisableMain mt-5">
                    <div className="table-responsive">
                    <table className="table table-bordered table-responsive-md">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Department</th>
                          <th>Department</th>
                          <th>Full Name</th>
                          <th>User Name</th>
                          <th>Password</th>
                          <th>Disable Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.department}</td>
                            <td>
                              <select className="form-select">
                                <option value={user.department}>
                                  {user.department}
                                </option>
                                <option value="HR">HR</option>
                                <option value="Accounts">Accounts</option>
                              </select>
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.userName}</td>
                            <td>{user.password}</td>
                            <td>{user.disableDate || "N/A"}</td>
                            <td>
                              <button className="btn btn-success">
                                {user.action}
                              </button>
                            </td>
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
  );
};

export default DisableUserList;
