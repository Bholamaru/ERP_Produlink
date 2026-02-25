import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./Companysetup.css";

const Companysetup = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    companyName: "SHARP ENGINEERS",
    shortName: "SE",
    msmeNo: "MH04P0022406",
    address1: "A-31 MIDC WALUJ 431136",
    address2: "A-31 MIDC WALUJ 431136",
    website: "sharp-engineers.com",
    pinCode: "431136",
    emailId: "contact@sharp-engineers.com",
    city: "AURANGABAD",
    contactNo: "8888826579",
    state: "MAHARASHTRA",
    footerMessage: "Property of Sharp Engineers",
    stateNumeric: "27",
    stateCodeAlpha: "MH",
    directorName: "Umesh Khandelwal",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="CompanySetup">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Company mt-5">
                  <div className="company-header mb-4 text-start">
                    <div className="row align-items-start mt-2">
                      <div className="col-md-2">
                        <h1 className="header-title">Company Setup</h1>
                      </div>
                      <div className="col-md-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Last Updated By Admin On 21-07-2022 2:47 PM
                        </p>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn">
                          General Setting
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === "general" ? "active" : ""}`}
                    onClick={() => setActiveTab("general")}
                  >
                    General
                  </button>
                  <button
                    className={`tab ${activeTab === "data2" ? "active" : ""}`}
                    onClick={() => setActiveTab("data2")}
                  >
                    Data-2
                  </button>
                  <button
                    className={`tab ${activeTab === "logo" ? "active" : ""}`}
                    onClick={() => setActiveTab("logo")}
                  >
                    Logo/Images
                  </button>
                  <button
                    className={`tab ${activeTab === "einvoice" ? "active" : ""}`}
                    onClick={() => setActiveTab("einvoice")}
                  >
                    E-Invoice
                  </button>
                </div>

                {activeTab === "general" && (
                <div className="form-container">
                <div className="form-row">
                  <div className="form-column">
                    <div className="form-group">
                      <label>Company Name:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="shortName"
                          value={formData.shortName}
                          placeholder="Short Name"
                          className="short-name"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
        
                    <div className="form-group">
                      <label>Address:</label>
                      <textarea
                        name="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                      />
                      <small className="helper-text">* Print on Invoice / Rs./ Delivery Challan</small>
                    </div>
        
                    <div className="form-group">
                      <label>Website:</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>Email Id:</label>
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>Contact No:</label>
                      <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>Footer Message:</label>
                      <textarea
                        name="footerMessage"
                        value={formData.footerMessage}
                        onChange={handleInputChange}
                      />
                      <small className="helper-text">* Print Document Footer Message</small>
                    </div>
        
                    <div className="form-group">
                      <label>Director Name:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="directorName"
                          value={formData.directorName}
                          onChange={handleInputChange}
                        />
                        <div className="signature-placeholder">Director Sign</div>
                      </div>
                    </div>
                  </div>
        
                  <div className="form-column">
                    <div className="form-group">
                      <label>MSME No:</label>
                      <input
                        type="text"
                        name="msmeNo"
                        value={formData.msmeNo}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>Address:</label>
                      <textarea
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                      />
                      <small className="helper-text">* Print on Purchase Order</small>
                    </div>
        
                    <div className="form-group">
                      <label>Pin Code:</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>City:</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>State:</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
        
                    <div className="form-group">
                      <label>State No Numeric:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="stateNumeric"
                          value={formData.stateNumeric}
                          onChange={handleInputChange}
                        />
                        <span className="helper-text">eg : 27</span>
                      </div>
                    </div>
        
                    <div className="form-group">
                      <label>State Code Alpha:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="stateCodeAlpha"
                          value={formData.stateCodeAlpha}
                          onChange={handleInputChange}
                        />
                        <span className="helper-text">eg : MH</span>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                )}

                {activeTab === "data2" && (
                   <div className="company-setup-data2">
                   <div className="form-container">
                     <div className="form-row">
                       <div className="form-column">
                         <div className="form-group">
                           <label>VAT TIN:</label>
                           <input
                             type="text"
                             name="vatTin"
                             value={formData.vatTin}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>CST TIN:</label>
                           <input
                             type="text"
                             name="cstTin"
                             value={formData.cstTin}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>C. Excise Range:</label>
                           <textarea
                             name="exciseRange"
                             value={formData.exciseRange}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Commissionerate:</label>
                           <input
                             type="text"
                             name="commissionerate"
                             value={formData.commissionerate}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>C Excise Reg No:</label>
                           <input
                             type="text"
                             name="exciseRegNo"
                             value={formData.exciseRegNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>P.L.A No:</label>
                           <input
                             type="text"
                             name="plaNo"
                             value={formData.plaNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Service Tax No:</label>
                           <input
                             type="text"
                             name="serviceTaxNo"
                             value={formData.serviceTaxNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Import/Export Code:</label>
                           <input
                             type="text"
                             name="importExportCode"
                             value={formData.importExportCode}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>ARN No:</label>
                           <input
                             type="text"
                             name="arnNo"
                             value={formData.arnNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Export House No:</label>
                           <input
                             type="text"
                             name="exportHouseNo"
                             value={formData.exportHouseNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Udyog Aadhar No:</label>
                           <input
                             type="text"
                             name="udyogAadharNo"
                             value={formData.udyogAadharNo}
                             onChange={handleInputChange}
                           />
                         </div>
                       </div>
             
                       <div className="form-column">
                         <div className="form-group">
                           <label>Vat Tin Date:</label>
                           <input
                             type="text"
                             name="vatTinDate"
                             value={formData.vatTinDate}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Cst Tin Date:</label>
                           <input
                             type="text"
                             name="cstTinDate"
                             value={formData.cstTinDate}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Subject to:</label>
                           <input
                             type="text"
                             name="subjectTo"
                             value={formData.subjectTo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Division:</label>
                           <input
                             type="text"
                             name="division"
                             value={formData.division}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>GST No:</label>
                           <input
                             type="text"
                             name="gstNo"
                             value={formData.gstNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>ECC No:</label>
                           <input
                             type="text"
                             name="eccNo"
                             value={formData.eccNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>PAN No:</label>
                           <input
                             type="text"
                             name="panNo"
                             value={formData.panNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>CIN NO:</label>
                           <input
                             type="text"
                             name="cinNo"
                             value={formData.cinNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>Import/Export Date:</label>
                           <input
                             type="text"
                             name="importExportDate"
                             value={formData.importExportDate}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>ARN Date:</label>
                           <input
                             type="text"
                             name="arnDate"
                             value={formData.arnDate}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>LUT No:</label>
                           <input
                             type="text"
                             name="lutNo"
                             value={formData.lutNo}
                             onChange={handleInputChange}
                           />
                         </div>
             
                         <div className="form-group">
                           <label>LUT Date:</label>
                           <input
                             type="text"
                             name="lutDate"
                             value={formData.lutDate}
                             onChange={handleInputChange}
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                )}
                {activeTab === "logo" && <p>Logo/Images content here...</p>}
                {activeTab === "einvoice" && <p>E-Invoice content here...</p>}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companysetup;
