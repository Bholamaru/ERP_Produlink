import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CustomerSupplierLink.css";
import { postSupplierItem } from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CustomerSupplierLink = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [formData, setFormData] = useState({
    Cust_Supp_Name: "",
    Main_Group: "",
    ItemName: "",
    Rate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {};
    if (!formData.Cust_Supp_Name)
      newErrors.Cust_Supp_Name = "This field is required.";
    if (!formData.Main_Group) newErrors.Main_Group = "This field is required.";
    if (!formData.ItemName) newErrors.ItemName = "This field is required.";
    if (!formData.Rate) newErrors.Rate = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Log form data
    console.log("Form Data:", formData);

    try {
      // Post data
      await postSupplierItem(formData);
      toast.success("Data successfully saved.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save data.");
    }
  };

  const handleClear = () => {
    setFormData({
      Cust_Supp_Name: "",
      Main_Group: "",
      ItemName: "",
      Rate: "",
    });
    setErrors({});
  };

  return (
    <div className="Supplier mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Supplierwise1">
                 
                   <div className="Sipplier1-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                        <h5 className="header-title">
                            Customer / Supplier Items Link
                          </h5>
                        </div>
                        <div className="col-md-6 text-end">
                          <button className="btn">
                            CustomerMaster Item Upload
                          </button>
                          <button className="btn">
                            Export to Excel
                          </button>
                        </div>
                      </div>
                    </div>
              
                  <div className="supplier-wise">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <ul
                            className="nav nav-pills mb-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                Add Item
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Filter
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent" style={{border:"none"}}>
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabIndex="0"
                            >
                              <div className="sea-wise">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <form onSubmit={handleSubmit}>
                                        <div className="row mb-3 text-start">
                                          <label
                                            htmlFor="Cust_Supp_Name"
                                            className="col-sm-3 col-form-label"
                                          >
                                            Cust / Supp Name:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="Cust_Supp_Name"
                                              name="Cust_Supp_Name"
                                              placeholder="Please Enter Cust/Supp Name"
                                              value={formData.Cust_Supp_Name}
                                              onChange={handleChange}
                                            />
                                            {errors.Cust_Supp_Name && (
                                              <div className="text-danger">
                                                {errors.Cust_Supp_Name}
                                              </div>
                                            )}
                                          </div>
                                          <div className="col-sm-2">
                                            <button
                                              type="button"
                                              className="btn"
                                            >
                                              Search
                                            </button>
                                          </div>
                                        </div>
                                        <div className="row mb-3 text-start">
                                          <label
                                            htmlFor="Main_Group"
                                            className="col-sm-3 col-form-label"
                                          >
                                            Main Group:
                                          </label>
                                          <div className="col-sm-7">
                                            <select
                                              className="form-select"
                                              id="Main_Group"
                                              name="Main_Group"
                                              value={formData.Main_Group}
                                              onChange={handleChange}
                                            >
                                              <option value="">Select</option>
                                              <option value="1">One</option>
                                              <option value="2">Two</option>
                                              <option value="3">Three</option>
                                            </select>
                                            {errors.Main_Group && (
                                              <div className="text-danger">
                                                {errors.Main_Group}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="row mb-3 text-start">
                                          <label
                                            htmlFor="ItemName"
                                            className="col-sm-3 col-form-label"
                                          >
                                            Item Name:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="ItemName"
                                              name="ItemName"
                                              placeholder="Please Enter Item Name"
                                              value={formData.ItemName}
                                              onChange={handleChange}
                                            />
                                            {errors.ItemName && (
                                              <div className="text-danger">
                                                {errors.ItemName}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="row mb-3 text-start">
                                          <label
                                            htmlFor="Rate"
                                            className="col-sm-3 col-form-label"
                                          >
                                            Rate:
                                          </label>
                                          <div className="col-sm-7">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="Rate"
                                              name="Rate"
                                              placeholder="Rate"
                                              value={formData.Rate}
                                              onChange={handleChange}
                                            />
                                            {errors.Rate && (
                                              <div className="text-danger">
                                                {errors.Rate}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="row mb-3 text-end">
                                          <div className="col-sm-1">
                                            <button
                                              type="submit"
                                              className="btn"
                                            >
                                              Save
                                            </button>
                                          </div>
                                          <div className="col-sm-1">
                                            <button
                                              type="button"
                                              className="btn"
                                              onClick={handleClear}
                                            >
                                              Clear
                                            </button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="table-container">
                                <table className="wise-table">
                                  <thead>
                                    <tr>
                                      <th>SR</th>
                                      <th>Cust Code</th>
                                      <th>Cust Name</th>
                                      <th>Item No</th>
                                      <th>Item Code</th>
                                      <th>Item Desc</th>
                                      <th>Item Rate</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td data-label="SR">1</td>
                                      <td data-label="Cust Code">001</td>
                                      <td data-label="Cust Name">John Doe</td>
                                      <td data-label="Item Code">1234</td>
                                      <td data-label="Item Desc">
                                        Sample Item
                                      </td>
                                      <td data-label="VA1">Value 1</td>
                                      <td data-label="VA2">Value 2</td>
                                      <td data-label="Delete">
                                        <button className="customerStateicon1">
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabIndex="0"
                            >
                              {" "}
                              <div className="container-fluid mt-4">
                                <form>
                                  <div className="row mb-3 text-start">
                                    <div className="col-md-2">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="customerSupplierCheck"
                                          name="isCustomerSupplierChecked"
                                          checked={
                                            formData.isCustomerSupplierChecked
                                          }
                                          onChange={handleChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="customerSupplierCheck"
                                        >
                                          Customer/Supplier Name
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3" style={{marginTop:"-7px"}}>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        name="customerSupplierName"
                                        placeholder="Enter Customer/Supplier Name"
                                        value={formData.customerSupplierName}
                                        onChange={handleChange}
                                      />

                                      {errors.customerSupplierName && (
                                        <div className="text-danger">
                                          {errors.customerSupplierName}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row mb-3 text-start">
                                    <div className="col-md-2">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="itemNameCheck"
                                          name="isItemNameChecked"
                                          checked={formData.isItemNameChecked}
                                          onChange={handleChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="itemNameCheck"
                                        >
                                          Item Name
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3" style={{marginTop:"-7px"}}>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        name="itemName"
                                        placeholder="Enter Item Name"
                                        value={formData.itemName}
                                        onChange={handleChange}
                                      />

                                      {errors.itemName && (
                                        <div className="text-danger">
                                          {errors.itemName}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row mb-3 text-end">
                                    <div className="col-md-5">
                                      <button type="submit" className="btn">
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </form>
                                <div className="table-container">
                                  <table className="wise-table">
                                    <thead>
                                      <tr>
                                        <th>SR</th>
                                        <th>Cust Code</th>
                                        <th>Cust Name</th>
                                        <th>Item No</th>
                                        <th>Item Code</th>
                                        <th>Item Desc</th>
                                        <th>Item Rate</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td data-label="SR">1</td>
                                        <td data-label="Cust Code">001</td>
                                        <td data-label="Cust Name">John Doe</td>
                                        <td data-label="Item Code">1234</td>
                                        <td data-label="Item Desc">
                                          Sample Item
                                        </td>
                                        <td data-label="VA1">Value 1</td>
                                        <td data-label="VA2">Value 2</td>
                                        <td data-label="Delete">
                                          <button className="customerStateicon1">
                                            <i className="fas fa-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                      {/* Add more rows as needed */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wise-bottom">
                    <div className="row">
                      <div className="col-md-12 text-start">
                        <div className="row mb-3">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-2 col-form-label"
                          >
                            Total Records: 00
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomerSupplierLink;
