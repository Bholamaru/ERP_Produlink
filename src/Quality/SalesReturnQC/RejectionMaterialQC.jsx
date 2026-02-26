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
        <div className="col-lg-9">
          <FormRow label="Rejection Series">
            <Select className="bg-light text-secondary" style={{ width: '200px' }} disabled>
              <option>{data.rejection_series || "Sales Return"}</option>
            </Select>
          </FormRow>

          <FormRow label="QC No">
            <Input value={data.qc_no || ""} className="bg-light" style={{ width: '130px' }} readOnly />
            <span className="ms-2 text-secondary fw-medium">QC Date :</span>
            <Input type="date" value={data.qc_date || ""} style={{ width: '145px' }} readOnly />
          </FormRow>

          <FormRow label="Cust / Vendor Name">
            <Input value={data.cust_vender_name || ""} className="bg-light w-100" style={{ maxWidth: '450px' }} readOnly />
          </FormRow>

          <FormRow label="Select Item">
            <Input value={data.select_item || ""} className="bg-light w-100" style={{ maxWidth: '450px' }} readOnly />
            <button className="btn btn-light border d-flex align-items-center gap-1 py-1 px-2" style={{ fontSize: '12px' }}>
              <Search size={14} /> Select
            </button>
          </FormRow>

          <FormRow label="Part Code">
            <Select style={{ width: '130px' }} value={data.part_code || ""}>
              <option>{data.part_code}</option>
            </Select>
            <span className="ms-2 text-secondary fw-medium">Heat No</span>
            <Select style={{ width: '130px' }} value={data.heat_no || ""}>
              <option>{data.heat_no}</option>
            </Select>
            <label className="d-flex align-items-center gap-1 ms-3 text-secondary" style={{ cursor: 'pointer' }}>
              <input type="checkbox" className="mt-1" checked={!!data.New_heat_no} readOnly /> New Heat No :
            </label>
            <Input style={{ width: '100px' }} value={data.New_heat_no || ""} readOnly />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-3">
            <FormRow label="Return Qty">
              <Input value={data.return_qty || ""} className="bg-light" style={{ width: '100px' }} readOnly />
            </FormRow>
            <FormRow label="Ok Qty">
              <Input value={data.ok_qty || ""} style={{ width: '100px' }} readOnly />
            </FormRow>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <FormRow label="Rework Qty (PD)">
              <Input value={data.rework_qty || ""} style={{ width: '100px' }} readOnly />
            </FormRow>
            <FormRow label="Reject Qty (MD)">
              <Input value={data.reject_qty || ""} style={{ width: '100px' }} readOnly />
            </FormRow>
          </div>

          <FormRow label="Rework Reason">
            <Select style={{ width: '200px' }} value={data.rework_reason || ""}>
              <option>{data.rework_reason || "Select"}</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2"><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Reject Reason">
            <Select style={{ width: '200px' }} value={data.reject_reason || ""}>
              <option>{data.reject_reason || "Select"}</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2"><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Action Plan">
            <Input className="w-100" style={{ maxWidth: '250px' }} value={data.action_plan || ""} readOnly />
            <span className="ms-2 text-secondary fw-medium">Action</span>
            <Select style={{ width: '80px' }} value={data.action || ""}>
              <option>{data.action}</option>
            </Select>
            <span className="ms-2 text-secondary fw-medium">Action Date</span>
            <Input type="date" value={data.action_date || ""} style={{ width: '140px' }} readOnly />
          </FormRow>

          <FormRow label="Remark">
            <Input className="w-100" style={{ maxWidth: '450px' }} value={data.remark || ""} readOnly />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-2">
            <FormRow label="Inspected By">
              <Input style={{ width: '200px' }} value={data.inspected_by || ""} readOnly />
            </FormRow>
            <FormRow label="Approved By">
              <Input style={{ width: '200px' }} value={data.approved_by || ""} readOnly />
            </FormRow>
          </div>
        </div>

        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="text-danger small fw-bold lh-lg p-3 bg-white border border-danger-subtle rounded">
            Sales Return NO : {data.rejection_series} <br />
            Date : {data.qc_date}<br />
            Remark: {data.remark}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tab B: Dimensional ---
const TabDimensional = ({ tests = [] }) => {
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
            {tests.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.test_no}</td>
                <td>{row.test_description}</td>
                <td>{row.dimensions}</td>
                <td>{row.tol_sub}</td>
                <td>{row.tol_add}</td>
                <td>{row.methods_of_check}</td>
                <td>{row.one}</td>
                <td>{row.two}</td>
                <td>{row.three}</td>
                <td>{row.four}</td>
                <td>{row.five}</td>
                <td>{row.remark}</td>
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
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
const TabVisualInspection = ({ tests = [] }) => {
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
            {tests.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.test_no}</td>
                <td>{row.test_description}</td>
                <td>{row.check_points}</td>
                <td>{row.actual_observation}</td>
                <td>{row.one}</td>
                <td>{row.two}</td>
                <td>{row.three}</td>
                <td>{row.four}</td>
                <td>{row.five}</td>
                <td>{row.remark}</td>
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td colSpan="14" className="text-muted p-4">No records found.</td>
              </tr>
            )}
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
  const [qcData, setQcData] = useState({});

  useEffect(() => {
    // Integrating the provided API data
    const apiData = [
      {
        "id": 1,
        "dimension_tests": [
          {
            "id": 1,
            "test_no": "DT-001",
            "test_description": "Length Check",
            "specification": "50 mm",
            "dimensions": "49.8 mm",
            "tol_sub": "-0.5",
            "tol_add": "+0.5",
            "methods_of_check": "Vernier Caliper",
            "one": "49.8",
            "two": "49.9",
            "three": "50.0",
            "four": "49.7",
            "five": "49.8",
            "remark": "Within tolerance",
            "qc": 1
          },
          {
            "id": 2,
            "test_no": "DT-002",
            "test_description": "Width Check",
            "specification": "20 mm",
            "dimensions": "20.1 mm",
            "tol_sub": "-0.2",
            "tol_add": "+0.2",
            "methods_of_check": "Micrometer",
            "one": "20.1",
            "two": "20.0",
            "three": "19.9",
            "four": "20.1",
            "five": "20.0",
            "remark": "OK",
            "qc": 1
          }
        ],
        "visual_tests": [
          {
            "id": 1,
            "test_no": "VT-001",
            "test_description": "Surface Inspection",
            "check_points": "Check scratches",
            "actual_observation": "Minor scratches",
            "one": "OK",
            "two": "OK",
            "three": "OK",
            "four": "OK",
            "five": "OK",
            "merge": true,
            "remark": "Acceptable",
            "qc": 1
          },
          {
            "id": 2,
            "test_no": "VT-002",
            "test_description": "Crack Inspection",
            "check_points": "Check cracks",
            "actual_observation": "No cracks",
            "one": "OK",
            "two": "OK",
            "three": "OK",
            "four": "OK",
            "five": "OK",
            "merge": true,
            "remark": "Passed",
            "qc": 1
          }
        ],
        "rejection_series": "SRQ-2026",
        "qc_no": "QC-26270001",
        "qc_date": "2026-02-26",
        "cust_vender_name": "Ram Industries",
        "select_item": "Brake Shoe",
        "part_code": "BS-1001",
        "heat_no": "H123",
        "New_heat_no": "NH123",
        "return_qty": "100",
        "ok_qty": "80",
        "rework_qty": "10",
        "reject_qty": "10",
        "rework_reason": "Minor scratch",
        "reject_reason": "Crack found",
        "action_plan": "Rework and polish",
        "action": "Rework initiated",
        "action_date": "2026-02-26",
        "remark": "Inspection completed",
        "inspected_by": "Inspector A",
        "approved_by": "Manager B"
      }
    ];
    setQcData(apiData[0]);
  }, []);

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
                    {activeTab === 'A' && <TabQcInfo data={qcData} />}
                    {activeTab === 'B' && <TabDimensional tests={qcData.dimension_tests} />}
                    {activeTab === 'C' && <TabVisualInspection tests={qcData.visual_tests} />}
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