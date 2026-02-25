import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveUnitCode,
  getUnitCodes,
  deleteUnitCode,
} from "../../../Service/Api.jsx";

const NewCardUnitCode = () => {
  const [formData, setFormData] = useState({ UnitName: "" });
  const [errors, setErrors] = useState({});
  const [unitCode, setUnitCode] = useState([]);

  useEffect(() => {
    fetchUnitCodes();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.UnitName) {
      newErrors.UnitName = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await saveUnitCode(formData);
      toast.success("Data saved successfully!");
      fetchUnitCodes(); // Refresh data
      setFormData({ UnitName: "" });
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchUnitCodes = async () => {
    try {
      const response = await getUnitCodes();
      setUnitCode(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUnitCode(id);
      toast.success("Data deleted successfully!");
      fetchUnitCodes(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="row mb-3">
            <label htmlFor="unitName" className="col-sm-4 col-form-label">
              Unit Name:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className={`form-control ${
                  errors.UnitName ? "is-invalid" : ""
                }`}
                id="unitName"
                name="UnitName"
                value={formData.UnitName}
                onChange={handleInputChange}
              />
              {errors.UnitName && (
                <div className="invalid-feedback">{errors.UnitName}</div>
              )}
            </div>
            <div className="col-sm-4">
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Unit</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {unitCode.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.UnitName}</td>
                <td>
                  <FaEdit
                    className="text-primary mx-2"
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <FaTrash
                    className="text-danger mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewCardUnitCode;
