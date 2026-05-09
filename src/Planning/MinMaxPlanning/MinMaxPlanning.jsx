import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel, FaFilter, FaArrowLeft, FaPlus } from "react-icons/fa";
import "./MinMaxPlanning.css";

const MinMaxPlanning = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("planning"); // 'planning' or 'warehouse'
  const [planningData, setPlanningData] = useState([
    {
      id: 1,
      itemCode: "RM-STL-001",
      itemName: "Steel Sheet 2mm",
      unit: "KG",
      minLevel: 500,
      maxLevel: 2000,
      currentStock: 350,
      reorderQty: 1650,
      status: "Low"
    },
    {
      id: 2,
      itemCode: "COMP-BRG-12",
      itemName: "Ball Bearing 12mm",
      unit: "PCS",
      minLevel: 100,
      maxLevel: 500,
      currentStock: 450,
      reorderQty: 0,
      status: "Normal"
    },
    {
      id: 3,
      itemCode: "CHM-OIL-VG46",
      itemName: "Hydraulic Oil VG46",
      unit: "LTR",
      minLevel: 200,
      maxLevel: 1000,
      currentStock: 150,
      reorderQty: 850,
      status: "Low"
    }
  ]);

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (currentView !== "planning") {
        setCurrentView("planning");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentView]);

  useEffect(() => {
    if (currentView !== "planning") {
      window.history.pushState({ view: currentView }, "");
    }
  }, [currentView]);

  return (
    <div className="MinMaxPlanningMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* --- VIEW 1: MIN-MAX PLANNING --- */}
                {currentView === "planning" && (
                  <div className="MinMaxPlanning mt-2">
                    {/* Header */}
                    <div className="MinMaxPlanning-header d-flex justify-content-between align-items-center mb-0 p-2 bg-white border-bottom">
                      <h6 className="header-title mb-0">Update Itemwise Min-Max</h6>
                      <div className="header-actions d-flex gap-2">
                          <button className="erp-btn-cyan d-flex align-items-center gap-1" onClick={() => setCurrentView("warehouse")}>
                             Warehouse Item
                          </button>
                          <button className="erp-btn-cyan d-flex align-items-center gap-1" onClick={() => setCurrentView("movingDays")}>
                             Update Moving Non Moving Days
                          </button>
                          <button className="erp-btn-cyan d-flex align-items-center gap-1">
                             Export Report
                          </button>
                      </div>
                    </div>

                    {/* Filter Bar - Single Line Compact */}
                    <div className="MinMaxPlanning-Filters p-2 border-bottom bg-light">
                      <div className="d-flex align-items-center gap-4 flex-wrap" style={{ fontSize: '12px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0 text-nowrap">Main Group :</label>
                          <select className="form-select form-select-sm" style={{ width: '130px', height: '28px', fontSize: '11px' }}>
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0 text-nowrap">Item Group :</label>
                          <select className="form-select form-select-sm" style={{ width: '130px', height: '28px', fontSize: '11px' }}>
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                           <input type="checkbox" className="form-check-input mt-0" defaultChecked />
                           <label className="mb-0">ItemCode</label>
                           <input type="text" className="form-control form-control-sm" style={{ width: '180px', height: '28px' }} />
                        </div>
                        <div className="d-flex align-items-center gap-1">
                           <input type="checkbox" className="form-check-input mt-0" />
                           <label className="mb-0">GRN% Tol. {'>'} 0</label>
                        </div>
                        <button className="btn btn-sm btn-light border d-flex align-items-center gap-1" style={{ height: '28px', fontSize: '11px', fontWeight: '600' }}>
                           <FaSearch /> Search
                        </button>
                      </div>
                    </div>

                    {/* Table Area - Kept empty as per screenshot */}
                    <div className="MinMaxPlanning-Content border" style={{ minHeight: '400px', backgroundColor: '#fff' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm text-center">
                          <thead style={{ backgroundColor: '#f8f9fa', fontSize: '11px' }}>
                            {/* Headers will appear here after search */}
                          </thead>
                          <tbody style={{ fontSize: '12px' }}>
                            {/* Data rows will appear here after search */}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="MinMaxPlanning-Footer p-2 mt-0">
                      Total Record : 00
                    </div>
                  </div>
                )}

                {/* --- VIEW 2: WAREHOUSE MASTER --- */}
                {currentView === "warehouse" && (
                  <div className="WarehouseMaster mt-2 border rounded">
                    {/* Header - Left Aligned */}
                    <div className="WarehouseMaster-header p-2 border-bottom text-start">
                      <h5 className="header-title mb-0" style={{ color: '#007bff', fontSize: '16px', fontWeight: '600' }}>
                        Warehouse Master
                      </h5>
                    </div>

                    {/* Form Bar */}
                    <div className="WarehouseMaster-Form p-3 border-bottom bg-light">
                      <div className="d-flex align-items-end gap-3 flex-wrap" style={{ fontSize: '12px' }}>
                        <div className="d-flex flex-column gap-1">
                          <label className="mb-0 fw-bold text-start">Warehouse :</label>
                          <select className="form-select form-select-sm" style={{ width: '150px' }}>
                            <option>MainStore</option>
                          </select>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <label className="mb-0 fw-bold text-start">Item :</label>
                          <input type="text" className="form-control form-control-sm" style={{ width: '200px' }} />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <label className="mb-0 fw-bold text-start">Min Level :</label>
                          <input type="text" className="form-control form-control-sm" style={{ width: '60px' }} />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <label className="mb-0 fw-bold text-start">Max Level :</label>
                          <input type="text" className="form-control form-control-sm" style={{ width: '60px' }} />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <label className="mb-0 fw-bold text-start">Action :</label>
                          <select className="form-select form-select-sm" style={{ width: '100px' }}>
                            <option>Ignore</option>
                          </select>
                        </div>
                        <div className="d-flex gap-2">
                           <button className="btn btn-sm btn-primary d-flex align-items-center gap-1" style={{ height: '31px' }}>
                             <FaPlus /> Save
                           </button>
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Left Aligned */}
                    <div className="WarehouseMaster-Content p-2 border-bottom" style={{ minHeight: '300px', backgroundColor: '#fff' }}>
                       <div className="p-2 border rounded text-info fw-bold text-start" style={{ backgroundColor: '#f0ffff' }}>
                          No Data Found !!!
                       </div>
                    </div>

                    {/* Footer - Left Aligned */}
                    <div className="WarehouseMaster-Footer p-2 bg-light text-start" style={{ fontSize: '12px', color: '#007bff', fontWeight: '600' }}>
                      Total records : 0
                    </div>
                  </div>
                )}

                {/* --- VIEW 3: MOVING NON-MOVING DAYS --- */}
                {currentView === "movingDays" && (
                  <div className="MovingDays mt-2">
                    {/* Header */}
                    <div className="MinMaxPlanning-header d-flex justify-content-between align-items-center mb-0 p-2 border-bottom">
                      <h5 className="header-title mb-0" style={{ color: '#007bff', fontSize: '16px', fontWeight: '600' }}>
                        Update Itemwise Moving Non-Moving Days
                      </h5>
                      <div className="header-actions">
                          <button className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1" style={{ fontSize: '11px' }} onClick={() => setCurrentView("planning")}>
                             <span style={{ width: '4px', height: '12px', background: 'red', display: 'inline-block' }}></span> Update Itemwise Min-Max
                          </button>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="MinMaxPlanning-Filters p-2 border-bottom bg-light">
                      <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '12px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0 text-nowrap">Main Group :</label>
                          <select className="form-select form-select-sm" style={{ width: '130px', height: '28px', fontSize: '11px' }}>
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0 text-nowrap">Item Group :</label>
                          <select className="form-select form-select-sm" style={{ width: '130px', height: '28px', fontSize: '11px' }}>
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                           <input type="checkbox" className="form-check-input mt-0" defaultChecked />
                           <input type="text" className="form-control form-control-sm" style={{ width: '180px', height: '28px' }} />
                        </div>
                        <button className="btn btn-sm btn-light border d-flex align-items-center gap-1" style={{ height: '28px', fontSize: '11px', fontWeight: '600' }}>
                           <FaSearch /> Search
                        </button>
                      </div>
                    </div>

                    {/* Empty Content Area */}
                    <div className="MinMaxPlanning-Content border" style={{ minHeight: '400px', backgroundColor: '#fff' }}></div>

                    {/* Footer */}
                    <div className="MinMaxPlanning-Footer p-2 border bg-light mt-0" style={{ fontSize: '12px', fontWeight: '600' }}>
                      Total Record : 00
                    </div>
                  </div>
                )}

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinMaxPlanning;
