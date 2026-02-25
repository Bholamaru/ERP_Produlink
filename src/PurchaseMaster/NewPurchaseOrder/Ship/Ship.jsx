import React, { useState, useEffect } from "react";
import "./Ship.css";

const Ship = ({ updateFormData }) => {
  const [shipToAdd, setShipToAdd] = useState({
    Ship_To_Add: "",
    ShipToContactDetails: "",
    Reference: "",
  });

  // Update the parent form data whenever shipToAdd changes
  useEffect(() => {
    updateFormData("Ship_To_Add", [shipToAdd]);
  }, [shipToAdd, updateFormData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipToAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="shiptoadd">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-12">
            <div className="row mb-3">
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shipToAdd"
                    checked={!!shipToAdd.Ship_To_Add}
                    onChange={(e) =>
                      setShipToAdd((prevState) => ({
                        ...prevState,
                        Ship_To_Add: e.target.checked ? "XYZ Enterprises" : "",
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="shipToAdd">
                    Ship to Add
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ship To Add"
                    name="Ship_To_Add"
                    value={shipToAdd.Ship_To_Add}
                    onChange={handleInputChange}
                    disabled={!shipToAdd.Ship_To_Add}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="shipToContact">
                    Ship to Contact Details:
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <textarea
                    id="shipToContact"
                    className="form-control"
                    rows="3"
                    name="ShipToContactDetails"
                    value={shipToAdd.ShipToContactDetails}
                    onChange={handleInputChange}
                    placeholder="Enter contact details"
                    disabled={!shipToAdd.Ship_To_Add}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="reference">Reference:</label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <textarea
                    id="reference"
                    className="form-control"
                    rows="3"
                    name="Reference"
                    value={shipToAdd.Reference}
                    onChange={handleInputChange}
                    placeholder="Enter reference"
                    disabled={!shipToAdd.Ship_To_Add}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
