import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Plus, RefreshCw, Trash2, List, Save, CheckCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./RejectionMaterialQC.css";

// --- Sub-components for Form Layout ---
const FormRow = ({ label, children }) => (
  <div className="d-flex align-items-center mb-2">
    <div className="form-label text-secondary mb-0 text-end pe-2" style={{ width: '160px', flexShrink: 0 }}>{label}</div>
    <div className="d-flex align-items-center gap-2 flex-grow-1">{children}</div>
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`form-control border border-secondary-subtle rounded px-2 py-1 text-sm ${className}`}
    {...props}
  />
);

const Select = ({ className = "", children, ...props }) => (
  <select
    className={`form-select border border-secondary-subtle rounded px-2 py-1 text-sm bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

// --- Tab A: QC Info ---
const TabQcInfo = ({ data }) => {
  return (
    <div className="PaddingSalesQC-filter">
      <div className="row">
        {/* Left Side Form Elements */}
        <div className="col-lg-9">
          <FormRow label="Rejection Series">
            <Select className="bg-light text-secondary" style={{ width: '200px' }} disabled>
              <option>Sales Return</option>
            </Select>
          </FormRow>

          <FormRow label="QC No">
            <Input value="252600030" className="bg-light" style={{ width: '130px' }} readOnly />
            <span className="ms-2 text-secondary fw-medium">QC Date :</span>
            <Input type="date" defaultValue="2026-02-11" style={{ width: '145px' }} />
          </FormRow>

          <FormRow label="Cust / Vendor Name">
            <Input value="ENDURANCE TECHNOLOGIES LTD (H)" className="bg-light w-100" style={{ maxWidth: '450px' }} readOnly />
          </FormRow>

          <FormRow label="Select Item">
            <Input value="FG1157 | 550D705702 | FORK BOLT PRF" className="bg-light w-100" style={{ maxWidth: '450px' }} readOnly />
            <button className="btn btn-light border d-flex align-items-center gap-1 py-1 px-2" style={{ fontSize: '12px' }}>
              <Search size={14} /> Select
            </button>
          </FormRow>

          <FormRow label="Part Code">
            <Select style={{ width: '130px' }}>
              <option>90 | PLFG11</option>
            </Select>
            <span className="ms-2 text-secondary fw-medium">Heat No</span>
            <Select style={{ width: '130px' }}>
              <option>Select</option>
            </Select>
            <label className="d-flex align-items-center gap-1 ms-3 text-secondary" style={{ cursor: 'pointer' }}>
              <input type="checkbox" className="mt-1" /> New Heat No :
            </label>
            <Input style={{ width: '100px' }} />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-3">
            <FormRow label="Return Qty">
              <Input value="148" className="bg-light" style={{ width: '100px' }} readOnly />
            </FormRow>
            <FormRow label="Ok Qty">
              <Input style={{ width: '100px' }} />
            </FormRow>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <FormRow label="Rework Qty (PD)">
              <Input value="0" style={{ width: '100px' }} />
            </FormRow>
            <FormRow label="Reject Qty (MD)">
              <Input value="0" style={{ width: '100px' }} />
            </FormRow>
          </div>

          <FormRow label="Rework Reason">
            <Select style={{ width: '200px' }}>
              <option>Select</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2"><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Reject Reason">
            <Select style={{ width: '200px' }}>
              <option>Select</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2"><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Action Plan">
            <Input className="w-100" style={{ maxWidth: '250px' }} />
            <span className="ms-2 text-secondary fw-medium">Action</span>
            <Select style={{ width: '80px' }}>
              <option>Yes</option>
              <option>No</option>
            </Select>
            <span className="ms-2 text-secondary fw-medium">Action Date</span>
            <Input type="date" defaultValue="2026-02-17" style={{ width: '140px' }} />
          </FormRow>

          <FormRow label="Remark">
            <Input className="w-100" style={{ maxWidth: '450px' }} />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-2">
            <FormRow label="Inspected By">
              <Input style={{ width: '200px' }} />
            </FormRow>
            <FormRow label="Approved By">
              <Input style={{ width: '200px' }} />
            </FormRow>
          </div>
        </div>

        {/* Right Side Info Box */}
        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="text-danger small fw-bold lh-lg p-3 bg-white border border-danger-subtle rounded">
            Sales Return NO : 252600153 <br />
            Date : 11/02/2026<br />
            Remark
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tab B: Dimensional ---
const TabDimensional = () => {
  const [rows, setRows] = useState([{ id: 1 }]);

  return (
    <div className="PaddingSalesQC-Main bg-white border">
      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Sr</th>
              <th>Test No</th>
              <th style={{ minWidth: '150px' }}>Test Description</th>
              <th>Dimensions</th>
              <th>Tol (-)</th>
              <th>Tol (+)</th>
              <th style={{ minWidth: '120px' }}>Method & Equipments</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th style={{ minWidth: '120px' }}>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><Input placeholder="Enter.." /></td>
              <td><textarea placeholder="Enter . ." className="form-control text-sm px-1 py-1" style={{ height: '30px', resize: 'none' }} /></td>
              <td><Input placeholder="Enter.." /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td>
                <button className="btn btn-light border fw-bold w-100 py-1" style={{ fontSize: '12px' }}>Add</button>
              </td>
            </tr>
          </tbody>

          <thead className="text-white" style={{ background: 'linear-gradient(to bottom, #6b95c4, #406ba1)' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Dimensions</th>
              <th>Tol (-)</th>
              <th>Tol (+)</th>
              <th>Method & Equipments</th>
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
              <th>S4</th>
              <th>S5</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="14" className="text-muted p-4">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

// --- Tab C: Visual Inspection ---
const TabVisualInspection = () => {
  const [rows, setRows] = useState([{ id: 1 }]);

  return (
    <div className="PaddingSalesQC-Main bg-white border">
      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th style={{ minWidth: '150px' }}>Test Description</th>
              <th>Check Points</th>
              <th style={{ minWidth: '150px' }}>Actual Observation</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th style={{ minWidth: '120px' }}>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><Input placeholder="Enter.." /></td>
              <td><textarea placeholder="Enter . ." className="form-control text-sm px-1 py-1" style={{ height: '30px', resize: 'none' }} /></td>
              <td><Input placeholder="Enter Checkpoint.." /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td><Input /></td>
              <td>
                <button className="btn btn-light border fw-bold w-100 py-1" style={{ fontSize: '12px' }}>Add</button>
              </td>
            </tr>
          </tbody>

          <thead className="text-white" style={{ background: 'linear-gradient(to bottom, #6b95c4, #406ba1)' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Check Points</th>
              <th>Actual Observation</th>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>M4</th>
              <th>M5</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Application Component ---
const RejectionMaterialQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('A');
  const location = useLocation();
  const data = location?.state || {};

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

  // Handle active tab styling logically without needing tailwind
  const getTabStyle = (tabName) => {
    const isActive = activeTab === tabName;
    return {
      padding: '8px 20px',
      border: '1px solid #dee2e6',
      borderBottom: 'none',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      backgroundColor: isActive ? '#007bff' : '#f8f9fa',
      color: isActive ? '#fff' : '#495057',
      fontWeight: 'bold',
      marginRight: '5px',
      cursor: 'pointer'
    };
  };

  return (
    <div className="PaddingSalesQCMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main
                style={{
                  transition: 'margin-left 0.3s',
                  marginLeft: sideNavOpen ? '250px' : '0',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f4f6',
                  minHeight: '100vh'
                }}
              >
                <div className="p-4">
                  {/* Header Area styled via your CSS */}
                  <div className="PaddingSalesQC-header d-flex justify-content-between align-items-center mb-4">
                    <h5 className="header-title m-0 text-primary" style={{ color: '#3b679e' }}>
                      Rejection Material QC
                    </h5>
                    <button className="btn btn-light border fw-bold d-flex align-items-center gap-2">
                      <List size={16} /> QC List
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="d-flex border-bottom">
                    <button onClick={() => setActiveTab('A')} style={getTabStyle('A')}>A. Qc Info</button>
                    <button onClick={() => setActiveTab('B')} style={getTabStyle('B')}>B. Dimensional</button>
                    <button onClick={() => setActiveTab('C')} style={getTabStyle('C')}>C. Visual Inspection</button>
                  </div>

                  {/* Tab Contents wrapper */}
                  <div className="shadow-sm">
                    {activeTab === 'A' && <TabQcInfo data={data} />}
                    {activeTab === 'B' && <TabDimensional />}
                    {activeTab === 'C' && <TabVisualInspection />}
                  </div>

                  <div className="d-flex justify-content-start mt-4">
                    <button className="btn btn-light border d-flex align-items-center gap-2 fw-bold">
                      <CheckCircle size={16} /> Save Report
                    </button>
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

export default RejectionMaterialQC;