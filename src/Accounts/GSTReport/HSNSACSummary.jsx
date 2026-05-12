import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";

const HSNSACSummary = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  return (
    <div className="accounts-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="header-section mb-4">
                  <h5 className="header-title text-start">Accounts: <span className="text-primary">HSN/SAC Summary</span></h5>
                </div>
                <div className="content-area text-center py-5">
                  <h3>HSN/SAC Summary Page</h3>
                  <p className="text-muted">Module content is being initialized.</p>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSNSACSummary;
