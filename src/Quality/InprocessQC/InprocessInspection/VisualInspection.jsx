import React from "react";

const VisualInspection = () => {
  return (
    <div className="mt-3">

      {/* ================= UPPER ENTRY TABLE ================= */}
      <div className="table-responsive mb-3">
        <table className="table table-bordered text-center">
          <thead className="table-secondary">
            <tr>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Specification</th>
              <th>Method of Check</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>Merge</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input className="form-control" /></td>
              <td><input className="form-control" placeholder="Enter"/></td>
              <td><input className="form-control" /></td>
              <td><input className="form-control" /></td>

              {/* 1 to 5 inputs */}
              <td><input className="form-control" /></td>
              <td><input className="form-control" /></td>
              <td><input className="form-control" /></td>
              <td><input className="form-control" /></td>
              <td><input className="form-control" /></td>

              {/* Merge checkbox */}
              <td><input type="checkbox" /></td>

              <td><input className="form-control" /></td>

              <td>
                <button className="btn btn-primary btn-sm">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* ================= LOWER GRID TABLE ================= */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-info">
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Check Points</th>
              <th>Method of Check</th>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>M4</th>
              <th>M5</th>
              <th>Merge</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
        <tr>
          <td>1</td>

          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>

              {/* M1 to M5 → small blank boxes */}
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>
          <td><input className="form-control form-control-sm" /></td>

               {/* ONLY Merge has checkbox */}
    <td className="text-center">
      <input type="checkbox" />
    </td>

    <td><input className="form-control form-control-sm" /></td>

    {/* Delete */}
    <td>
      <button className="btn btn-link text-danger">
        🗑
      </button>
    </td>
  </tr>
</tbody>
</table>
{/* Enable Fields */}
<div className="enable-field-wrapper text-start ">
  <div className="form-check m-0">
    <input
      className="form-check-input"
      type="checkbox"
      id="enableFieldsVisual"
    />
    <label
      className="form-check-label"
      htmlFor="enableFieldsVisual"
    >
      Enable Fields
    </label>
  </div>
</div>
      </div>

    </div>
  );
};

export default VisualInspection;