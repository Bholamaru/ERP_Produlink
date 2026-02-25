import React, { useState, useEffect } from "react";
import "./ItemOther.css";

const ItemOther = ({ updateFormData, itemDetails = [] }) => {
  const [itemOtherDetails, setItemOtherDetails] = useState([{ ItemNo: "", CPC_Code: "" }]);

  // ✅ Debug: Check if `itemDetails` is received
  useEffect(() => {
    console.log("Received itemDetails:", itemDetails);

    if (itemDetails.length > 0) {
      const updatedItems = itemDetails.map((item) => ({
        ItemNo: item.Item || "", // ✅ Fetch `ItemCode` from `ItemDetails`
        CPC_Code: "", // Allow manual selection
      }));

      setItemOtherDetails(updatedItems);
      updateFormData("Item_Details_Other", updatedItems);
    }
  }, [updateFormData,itemDetails]); // ✅ Runs only when `itemDetails` updates

  // ✅ Handle manual input changes
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...itemOtherDetails];
    updatedItems[index][field] = value;
    setItemOtherDetails(updatedItems);
    updateFormData("Item_Details_Other", updatedItems);
  };

  return (
    <div className="ItemDetailsOther">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h3>Item Other Details</h3>
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Item No.</th>
                  <th>CPC Code</th>
                </tr>
              </thead>
              <tbody>
                {itemOtherDetails.length > 0 ? (
                  itemOtherDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Item No"
                          value={item.ItemNo} // ✅ Auto-fetched from `ItemDetails`
                          onChange={(e) => handleInputChange(index, "ItemNo", e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-control"
                          value={item.CPC_Code}
                          onChange={(e) => handleInputChange(index, "CPC_Code", e.target.value)}
                        >
                          <option value="">Select CPC Code</option>
                          <option value="001">001 - Code 1</option>
                          <option value="002">002 - Code 2</option>
                          <option value="003">003 - Code 3</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No item details available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOther;
