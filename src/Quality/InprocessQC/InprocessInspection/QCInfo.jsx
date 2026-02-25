import React from "react";

const QCInfo = () => {
  return (
    <div className="container-fluid mt-4 px-2 px-md-4">
      {/* ================= MAIN UNIFIED CARD ================= */}
      <div 
        className="card shadow-sm border-0 mx-auto" 
        style={{ borderRadius: "10px", maxWidth: "1200px", backgroundColor: "#ffffff" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">

            {/* ================= LEFT SIDE COLUMN ================= */}
            <div className="col-12 col-lg-6">
              
              {/* Top Inputs */}
              {[
                "QC No",
                "Sample Qty",
                "Prod Qty",
                "QC Qty",
                "OK Qty",
                "A U D Qty"
              ].map((label, index) => (
                <div className="row mb-3 align-items-center" key={`left-input-${index}`}>
                  <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                    <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>{label} :</label>
                  </div>
                  <div className="col-12 col-sm-8">
                    <input className="form-control form-control-sm shadow-none" />
                  </div>
                </div>
              ))}

              {/* Textareas */}
              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Accepted / Rejected :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2"></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px", lineHeight: "1.2" }}>Accepted Under Deviation :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2"></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Suggestions :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2"></textarea>
                </div>
              </div>

              {/* Bottom Input */}
              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Inspected By :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input className="form-control form-control-sm shadow-none" />
                </div>
              </div>

            </div>


            {/* ================= RIGHT SIDE COLUMN ================= */}
            <div className="col-12 col-lg-6">

              {/* Date & Time */}
              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Date :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="date" className="form-control form-control-sm shadow-none" />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>QC Time :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="time" className="form-control form-control-sm shadow-none" />
                </div>
              </div>

              {/* ISO Inputs */}
              {[
                "(Item) Drawing Rev No",
                "(ISO) Format No",
                "(ISO) Rev No"
              ].map((label, index) => (
                <div className="row mb-3 align-items-center" key={`right-input-${index}`}>
                  <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                    <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>{label} :</label>
                  </div>
                  <div className="col-12 col-sm-8">
                    <input className="form-control form-control-sm shadow-none" />
                  </div>
                </div>
              ))}

              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>(ISO) Rev Date :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input type="date" className="form-control form-control-sm shadow-none" />
                </div>
              </div>

              {/* Textareas */}
              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Remark :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2"></textarea>
                </div>
              </div>

              <div className="row mb-3 align-items-start">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0 pt-sm-1">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Non Conformance :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <textarea className="form-control form-control-sm shadow-none" rows="2"></textarea>
                </div>
              </div>

              {/* Bottom Input */}
              <div className="row mb-3 align-items-center">
                <div className="col-12 col-sm-4 text-start pe-sm-3 mb-1 mb-sm-0">
                  <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Approved By :</label>
                </div>
                <div className="col-12 col-sm-8">
                  <input className="form-control form-control-sm shadow-none" />
                </div>
              </div>

            </div>

          </div>

          {/* ================= SAVE BUTTON ================= */}
          <div className="mt-4 pt-3 border-top d-flex justify-content-start">
            <button 
              className="btn btn-primary btn-sm px-4 shadow-sm fw-medium text-nowrap w-auto"
              style={{ width: "fit-content" }}
            >
              Save Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QCInfo;