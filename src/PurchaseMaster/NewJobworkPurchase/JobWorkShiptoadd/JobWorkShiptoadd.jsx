"use client"

import { useState, useEffect } from "react"
import "./JobWorkShiptoadd.css"
import { ToastContainer } from "react-toastify"

const JobWorkShiptoadd = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    ShiptoAdd: "",
    ContactDetail: "",
    ProjectName: "",
    CRName: "",
    SoNo: "",
  })

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setFormData(data[0] || formData)
    }
  }, [data, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    updateData([newFormData]) // Update parent state as array
    console.log("Ship to add data updated:", [newFormData]) // Debug log
  }

  const handleClear = () => {
    const clearedData = {
      ShiptoAdd: "",
      ContactDetail: "",
      ProjectName: "",
      CRName: "",
      SoNo: "",
    }
    setFormData(clearedData)
    updateData([clearedData])
  }

  return (
    <div className="jobworkshiptoadd">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-12">
            <div className="row mb-2 gx-4 gy-2 align-items-center">
              <div className="col-auto">
                <div className="form-check me-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shipToAdd"
                    name="ShiptoAdd"
                    checked={formData.ShiptoAdd !== ""}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-check-label small" htmlFor="shipToAdd">
                    Ship to Add
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Input Field"
                  name="ShiptoAdd"
                  value={formData.ShiptoAdd}
                  onChange={handleChange}
                />
              </div>

              <div className="col-auto">
                <label className="small mb-0 me-2" htmlFor="shipToContact">Ship to Contact Details:</label>
              </div>
              <div className="col-md-1">
                <textarea
                  id="shipToContact"
                  className="form-control form-control-sm no-resize"
                  rows="1"
                  name="ContactDetail"
                  value={formData.ContactDetail}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-auto">
                <label className="small mb-0 me-2" htmlFor="reference">Project Name:</label>
              </div>
              <div className="col-md-1">
                <textarea
                  id="reference"
                  className="form-control form-control-sm no-resize"
                  rows="1"
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-auto">
                <label className="small mb-0 me-2" htmlFor="CRName">CRName:</label>
              </div>
              <div className="col-md-1">
                <textarea
                  id="CRName"
                  className="form-control form-control-sm no-resize"
                  rows="1"
                  name="CRName"
                  value={formData.CRName}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-auto">
                <label className="small mb-0 me-2" htmlFor="SoNo">SoNo:</label>
              </div>
              <div className="col-md-1">
                <textarea
                  id="SoNo"
                  className="form-control form-control-sm no-resize"
                  rows="1"
                  name="SoNo"
                  value={formData.SoNo}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12 text-end">
                <button
                  className="btn btn-sm btn-light border"
                  onClick={handleClear}
                  style={{ fontSize: '12px', padding: '2px 10px' }}
                >
                  Clear
                </button>
              </div>
            </div>
            {/* Removed internal Clear button to maintain consistency with main navigation */}
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add this to display toast messages */}
    </div>
  )
}

export default JobWorkShiptoadd
