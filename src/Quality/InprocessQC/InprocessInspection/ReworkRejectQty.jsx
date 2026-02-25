import React from "react";

const ReworkRejectQty = () => {
  return (
    <div className=" w-100 px-2 px-md-4">
      {/* ================= MAIN UNIFIED CARD ================= */}
      <div 
        className="card shadow-sm border-0 mx-auto" 
        style={{ borderRadius: "16px", overflow: "hidden", maxWidth: "1200px" }}
      >
        <div className="card-body p-4 p-md-5">

          {/* ================= MAIN CONTENT ROW ================= */}
          <div className="row g-4 justify-content-center">
            
            {/* ================= REWORK COLUMN ================= */}
            <div className="col-12 col-lg-6 d-flex flex-column">
              
              {/* Section Container */}
              <div 
                className="p-4 w-100 h-100 rounded-4" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  borderTop: "4px solid #ffc107" // Warning/Orange accent for Rework
                }}
              >
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#d39e00" }}>
                  <span style={{ fontSize: "1.2rem" }}>⟲</span> Rework Entry
                </h6>

                {/* Rework Select */}
                <div className="d-flex align-items-center gap-1 mb-2 w-100">
                  <select className="form-select form-select-sm shadow-none border-0 flex-grow-1 py-2">
                    <option>Select Rework Reason...</option>
                  </select>
                                  {/* User Field */}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none border-0 py-2"
                    placeholder="User"
                    style={{ maxWidth: "150px" }}
                  />
                  <button className="btn btn-primary btn-sm px-3 py-2 shadow-sm text-nowrap fw-medium" style={{ backgroundColor: "#007BFF", border: "none" }}>
                    + Add
                  </button>
                  <button className="btn btn-white btn-sm px-2 py-2 shadow-sm bg-white border-0 text-secondary" title="Refresh">
                    ⟳
                  </button>
                </div>

                {/* Rework Table Box */}
                <div className="w-100 bg-white rounded-3 shadow-sm overflow-hidden">
                  <div className="table-responsive">
                    <table className="table table-borderless table-hover table-sm mb-0 align-middle text-center" style={{ fontSize: "13px" }}>
                      <thead style={{ backgroundColor: "#f1f3f5", color: "#495057" }}>
                        <tr>
                          <th style={{ width: "40px" }} className="py-2">Sr</th>
                          <th className="py-2 text-start">Description</th>
                          <th style={{ width: "70px" }} className="py-2">Qty</th>
                          <th style={{ width: "40px" }} className="py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #f1f3f5" }}>
                          <td className="text-muted fw-medium">1</td>
                          <td>
                            <input 
                              className="form-control form-control-sm px-2 py-1 shadow-none border-light bg-light" 
                              placeholder="Details..." 
                              style={{ fontSize: "12px", transition: "all 0.2s" }} 
                            />
                          </td>
                          <td>
                            <input 
                              className="form-control form-control-sm text-center px-1 py-1 shadow-none border-light bg-light fw-medium text-primary" 
                              defaultValue="0" 
                              style={{ fontSize: "12px" }} 
                            />
                          </td>
                          <td>
                            <button className="btn btn-link text-danger p-0 text-decoration-none shadow-none opacity-75 hover-opacity-100" style={{ fontSize: "16px" }} title="Delete">
                              ✕
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= REJECT COLUMN ================= */}
            <div className="col-12 col-lg-6 d-flex flex-column">
              
              {/* Section Container */}
              <div 
                className="p-4 w-100 h-100 rounded-4" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  borderTop: "4px solid #dc3545" // Danger/Red accent for Reject
                }}
              >
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#bd2130" }}>
                  <span style={{ fontSize: "1.2rem" }}>⊘</span> Reject Entry
                </h6>

                {/* Reject Select */}
                <div className="d-flex align-items-center gap-2 mb-3 w-100">
                  <select className="form-select form-select-sm shadow-none border-0 flex-grow-1 py-2">
                    <option>Select Reject Reason...</option>
                  </select>
                   {/* User Field */}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none border-0 py-2"
                    placeholder="User"
                    style={{ maxWidth: "150px" }}
                  />
                  <button className="btn btn-primary btn-sm px-3 py-2 shadow-sm text-nowrap fw-medium" style={{ backgroundColor: "#007BFF", border: "none" }}>
                    + Add
                  </button>
                  <button className="btn btn-white btn-sm px-2 py-2 shadow-sm bg-white border-0 text-secondary" title="Refresh">
                    ⟳
                  </button>
                </div>

                {/* Reject Table Box */}
                <div className="w-100 bg-white rounded-3 shadow-sm overflow-hidden">
                  <div className="table-responsive">
                    <table className="table table-borderless table-hover table-sm mb-0 align-middle text-center" style={{ fontSize: "13px" }}>
                      <thead style={{ backgroundColor: "#f1f3f5", color: "#495057" }}>
                        <tr>
                          <th style={{ width: "40px" }} className="py-2">Sr</th>
                          <th className="py-2 text-start">Description</th>
                          <th style={{ width: "70px" }} className="py-2">Qty</th>
                          <th style={{ width: "40px" }} className="py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #f1f3f5" }}>
                          <td className="text-muted fw-medium">1</td>
                          <td>
                            <input 
                              className="form-control form-control-sm px-2 py-1 shadow-none border-light bg-light" 
                              placeholder="Details..." 
                              style={{ fontSize: "12px", transition: "all 0.2s" }} 
                            />
                          </td>
                          <td>
                            <input 
                              className="form-control form-control-sm text-center px-1 py-1 shadow-none border-light bg-light fw-medium text-primary" 
                              defaultValue="0" 
                              style={{ fontSize: "12px" }} 
                            />
                          </td>
                          <td>
                            <button className="btn btn-link text-danger p-0 text-decoration-none shadow-none opacity-75 hover-opacity-100" style={{ fontSize: "16px" }} title="Delete">
                              ✕
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= DASHBOARD STAT FOOTER ================= */}
        <div className="card-footer border-top-0 p-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="row g-3 justify-content-center text-center">
            
            {/* Stat Box: OK Qty */}
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(25, 135, 84, 0.08)", border: "1px solid rgba(25, 135, 84, 0.2)" }}>
                <div className="text-success fw-semibold mb-1" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>OK Qty</div>
                <div className="fs-5 fw-bold text-success">900.0</div>
              </div>
            </div>

            {/* Stat Box: Rework */}
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(255, 193, 7, 0.08)", border: "1px solid rgba(255, 193, 7, 0.3)" }}>
                <div className="text-warning fw-semibold mb-1" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Rework</div>
                <div className="fs-5 fw-bold text-warning" style={{ color: "#d39e00" }}>0.0</div>
              </div>
            </div>

            {/* Stat Box: Reject */}
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(220, 53, 69, 0.08)", border: "1px solid rgba(220, 53, 69, 0.2)" }}>
                <div className="text-danger fw-semibold mb-1" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Reject</div>
                <div className="fs-5 fw-bold text-danger">0.0</div>
              </div>
            </div>

            {/* Stat Box: Total Qty */}
            <div className="col-6 col-md-3">
              <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(13, 110, 253, 0.08)", border: "1px solid rgba(13, 110, 253, 0.2)" }}>
                <div className="text-primary fw-semibold mb-1" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Qty</div>
                <div className="fs-5 fw-bold text-primary">900.0</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ReworkRejectQty;