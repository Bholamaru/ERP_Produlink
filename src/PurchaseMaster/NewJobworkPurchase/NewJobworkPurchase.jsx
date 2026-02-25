"use client";

import "./NewJobworkPurchase.css";
import { useState, useEffect, useRef } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import JobWorkPoinfo from "./JobWorkPoinfo/JobWorkPoinfo.jsx";
import JobWorkitemdetail from "./JobWorkitemdetail/JobWorkitemdetail.jsx";
import JobWorkgstdetail from "./JobWorkgstdetail/JobWorkgstdetail.jsx";
import JobWorkschedule from "./JobWorkschedule/JobWorkschedule.jsx";
import JobWorkShiptoadd from "./JobWorkShiptoadd/JobWorkShiptoadd.jsx";
import {
  fetchNextJobWorkNumber,
  fetchSupplierjobWorkData,
  saveJwPoInfo,
  updateJobWorkPO,
  fetchJobWorkPOById,
} from "../../Service/PurchaseApi.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewJobworkPurchase = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const mountedRef = useRef(true);

  // Add activeTab state for navigation
  const [activeTab, setActiveTab] = useState(0);

  const toggleSideNav = () => setSideNavOpen((prev) => !prev);

  // Fix: Remove Bootstrap dynamic imports and handle side nav with pure React
  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }

    return () => {
      document.body.classList.remove("side-nav-open");
    };
  }, [sideNavOpen]);

  const [selectedSeries, setSelectedSeries] = useState("");
  const [indentNo, setIndentNo] = useState("");
  const [poType, setPoType] = useState("Standard PO");
  const [plant] = useState("Plant A");

  const [allTabsData, setAllTabsData] = useState({
    poInfo: {},
    itemDetails: [],
    gstDetails: [],
    scheduleLines: [],
    shipToAdd: [],
  });

  const year = localStorage.getItem("Shortyear");

  useEffect(() => {
    mountedRef.current = true;

    if (isEditMode && id) {
      loadExistingData(id);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [isEditMode, id]);

  const loadExistingData = async (poId) => {
    setLoading(true);
    try {
      const response = await fetchJobWorkPOById(poId);
      console.log("Fetched existing data:", response);

      if (response && mountedRef.current) {
        setSelectedSeries(response.Series || "");
        setIndentNo(response.PoNo || "");
        setPoType(response.PoType || "Standard PO");
        setSupplierName(response.Supplier || "");
        setSupplierCode(response.SupplierCode || "");

        const poInfoData = {
          PoNo: response.PoNo || "",
          PaymentTerm: response.PaymentTerm || "",
          QuotNo: response.QuotNo || "",
          Delivery: response.Delivery || "",
          PoValidityDate: response.PoValidityDate || "",
          PoNote: response.PoNote || "",
          GST: response.GST || "",
          PoDate: response.PoDate || "",
          PaymentRemark: response.PaymentRemark || "",
          QuotationDate: response.QuotationDate || "",
          freight: response.freight || "",
          ContactPersion: response.ContactPersion || "",
          PF_Charges: response.PF_Charges || "",
          PoRateType: response.PoRateType || "",
        };

        const itemDetailsData = response.Item_Detail_Enter || [];
        const gstDetailsData = response.Gst_Details || [];
        const scheduleLinesData = response.Schedule_Line || [];
        const shipToAddData = response.Ship_To_Add || [];

        setAllTabsData({
          poInfo: poInfoData,
          itemDetails: itemDetailsData,
          gstDetails: gstDetailsData,
          scheduleLines: scheduleLinesData,
          shipToAdd: shipToAddData,
        });

        toast.success("Data loaded successfully for editing!");
      }
    } catch (error) {
      console.error("Error loading existing data:", error);
      if (mountedRef.current) {
        toast.error("Failed to load existing data");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleSeriesChange = async (e) => {
    const seriesValue = e.target.value;
    setSelectedSeries(seriesValue);

    if (isEditMode) return;

    if (seriesValue.trim() === "" || seriesValue === "select") {
      setIndentNo("");
      return;
    }

    if (!year) {
      console.error("Year is not available in localStorage.");
      setIndentNo("");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchNextJobWorkNumber(year);
      if (response && response.next_PoNo && mountedRef.current) {
        setIndentNo(response.next_PoNo);
      } else {
        setIndentNo("");
      }
    } catch (error) {
      console.error("Error fetching next job work number:", error);
      if (mountedRef.current) {
        setIndentNo("");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const [supplierName, setSupplierName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (supplierName.trim() === "") {
      setDropdownData([]);
      setShowDropdown(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await fetchSupplierjobWorkData(supplierName);
        if (mountedRef.current) {
          setDropdownData(result);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Failed to fetch supplier data:", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [supplierName]);

  const handleSelectSupplier = (item) => {
    setSupplierName(item.Name);
    setSupplierCode(item.number);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSupplierName("");
    setSupplierCode("");
    setDropdownData([]);
    setShowDropdown(false);
  };

  const updateTabData = (tabName, data) => {
    setAllTabsData((prev) => ({
      ...prev,
      [tabName]: data,
    }));
  };

  const updateGstData = (data) => {
    console.log("Received GST data in parent:", data);
    setAllTabsData((prev) => ({
      ...prev,
      gstDetails: data,
    }));
  };

  const updateScheduleData = (data) => {
    console.log("Received Schedule data in parent:", data);
    setAllTabsData((prev) => ({
      ...prev,
      scheduleLines: data,
    }));
  };

  // Validation function
  const validateCurrentTab = () => {
    return true;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateCurrentTab()) {
      setActiveTab((prevTab) => prevTab + 1);
    } else {
      toast.error("Please fill all required fields in the current tab.");
    }
  };

  const handlePrevious = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      console.log("Current allTabsData:", allTabsData);
      console.log("Selected Series:", selectedSeries);
      console.log("Supplier Name:", supplierName);
      console.log("PO Number:", indentNo);
      console.log("Is Edit Mode:", isEditMode);
      console.log("Edit ID:", id);

      if (!selectedSeries || selectedSeries === "select" || !supplierName || !indentNo) {
        toast.error("Please fill in Series, Supplier, and PO Number");
        setSaving(false);
        return;
      }

      const completeData = {
        PoType: poType || "Standard PO",
        Plant: plant || "Plant A",
        Series: selectedSeries,
        Supplier: supplierName,
        SupplierCode: supplierCode,
        PoNo: indentNo,
        PaymentTerm: allTabsData.poInfo?.PaymentTerm || "",
        QuotNo: allTabsData.poInfo?.QuotNo || "",
        Delivery: allTabsData.poInfo?.Delivery || "",
        PoValidityDate: allTabsData.poInfo?.PoValidityDate || "",
        PoNote: allTabsData.poInfo?.PoNote || "",
        GST: allTabsData.poInfo?.GST || "",
        PoDate: allTabsData.poInfo?.PoDate || "",
        PaymentRemark: allTabsData.poInfo?.PaymentRemark || "",
        QuotationDate: allTabsData.poInfo?.QuotationDate || "",
        freight: allTabsData.poInfo?.freight || "",
        ContactPersion: allTabsData.poInfo?.ContactPersion || "",
        PF_Charges: allTabsData.poInfo?.PF_Charges || "",
        PoRateType: allTabsData.poInfo?.PoRateType || "",

        TOC_AssableValue:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.AssValue) || 0),
                  0
                )
                .toString()
            : "0",
        PackCharges:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.Packing) || 0),
                  0
                )
                .toString()
            : "0",
        TransportCharges:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.Transport) || 0),
                  0
                )
                .toString()
            : "0",
        Insurance: allTabsData.gstDetails?.[0]?.Insurance || "0",
        InstallationCharges:
          allTabsData.gstDetails?.[0]?.InstallationCharges || "0",
        OtherCharges: "0",
        CGST:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.CGSTAmt) || 0),
                  0
                )
                .toString()
            : "0",
        SGST:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.SGSTAmt) || 0),
                  0
                )
                .toString()
            : "0",
        IGST:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.IGSTAmt) || 0),
                  0
                )
                .toString()
            : "0",
        TCS: "0",
        GR_Total:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails
                .reduce(
                  (sum, item) => sum + (Number.parseFloat(item.Total) || 0),
                  0
                )
                .toString()
            : "0",

        Item_Detail_Enter:
          allTabsData.itemDetails && allTabsData.itemDetails.length > 0
            ? allTabsData.itemDetails.map((item) => ({
                ItemName: item.ItemName || item.SelectedItemName || "",
                item_type: item.ItemType || item.SelectItem || "",
                OutAndInPart: item.OutAndInPart || "-",
                ItemDescription: item.ItemDescription || "",
                Rate: item.Rate || "0",
                Disc: item.Disc || "0",
                Qty: item.Qty || item.PoQty || "0",
                Unit: item.Unit || "",
                Particular: item.Particular || item.Particular_Process || "",
                Version: item.Version || "v1.0",
                ItemStatus: item.ItemStatus || "Active",
                CSCode: item.CSCode || "",
                Note: item.Note || "",
                SAC: item.SAC || "",
              }))
            : [],

        Gst_Details:
          allTabsData.gstDetails && allTabsData.gstDetails.length > 0
            ? allTabsData.gstDetails.map((item) => ({
                ItemCode: item.ItemCode || "",
                SacCode: item.SAC || "",
                Rate: item.Rate || "0",
                Qty: item.Qty || "0",
                SubTotal: item.SubTotal || "0",
                Discount: item.Discount || "0",
                DiscountAmt: item.DiscountAmt || "0",
                Packing: item.Packing || "0",
                Transport: item.Transport || "0",
                AssValue: item.AssValue || "0",
                CGST: item.CGST || "0",
                CGSTAmt: item.CGSTAmt || "0",
                SGST: item.SGST || "0",
                SGSTAmt: item.SGSTAmt || "0",
                IGST: item.IGST || "0",
                IGSTAmt: item.IGSTAmt || "0",
                UTGST: item.UTGST || "0",
                UTGSTAmt: item.UTGSTAmt || "0",
                Total: item.Total || "0",
              }))
            : [],

        Schedule_Line:
          allTabsData.scheduleLines && allTabsData.scheduleLines.length > 0
            ? allTabsData.scheduleLines.map((item) => ({
                ItemCode: item.ItemCode || "",
                Description: item.Description || "",
                TotalQty: item.TotalQty || "0",
                Date1: item.Date1 || "",
                Qty1: item.Qty1 || "0",
                Date2: item.Date2 || "",
                Qty2: item.Qty2 || "0",
                Date3: item.Date3 || "",
                Qty3: item.Qty3 || "0",
                Date4: item.Date4 || "",
                Qty4: item.Qty4 || "0",
                Date5: item.Date5 || "",
                Qty5: item.Qty5 || "0",
                Date6: item.Date6 || "",
                Qty6: item.Qty6 || "0",
              }))
            : [],

        Ship_To_Add:
          allTabsData.shipToAdd && allTabsData.shipToAdd.length > 0
            ? allTabsData.shipToAdd.map((item) => ({
                ShipToAdd: item.ShiptoAdd || "",
                ShipToContactDetails: item.ContactDetail || "",
                ProjectName: item.ProjectName || "",
                CRName: item.CRName || "",
                SoNo: item.SoNo || "",
              }))
            : [],
      };

      console.log(
        "Complete data being sent to API:",
        JSON.stringify(completeData, null, 2)
      );

      let response;
      if (isEditMode && id) {
        console.log("Updating existing record with ID:", id);
        response = await updateJobWorkPO(id, completeData);
        if (mountedRef.current) {
          toast.success("Job Work PO updated successfully!");
        }
      } else {
        console.log("Creating new record");
        response = await saveJwPoInfo(completeData);
        if (mountedRef.current) {
          toast.success("Job Work PO saved successfully!");
        }
      }

      if (response && mountedRef.current) {
        console.log("Operation completed successfully:", response);
        setTimeout(() => {
          navigate("/JobworkList");
        }, 2000);
      } else if (mountedRef.current) {
        toast.error(`Failed to ${isEditMode ? "update" : "save"} Job Work PO`);
      }
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "saving"} complete data:`,
        error
      );

      if (mountedRef.current) {
        let errorMessage = `An error occurred while ${
          isEditMode ? "updating" : "saving"
        }.`;
        if (error.message.includes("500")) {
          errorMessage +=
            " Server error - please check the data format and try again.";
        } else if (error.message.includes("401")) {
          errorMessage += " Authentication failed - please log in again.";
        } else if (error.message.includes("403")) {
          errorMessage += " You don't have permission to perform this action.";
        } else {
          errorMessage += " Please try again.";
        }

        toast.error(errorMessage);
      }
    } finally {
      if (mountedRef.current) {
        setSaving(false);
      }
    }
  };

  const resetAllForms = () => {
    setAllTabsData({
      poInfo: {},
      itemDetails: [],
      gstDetails: [],
      scheduleLines: [],
      shipToAdd: [],
    });
    setSelectedSeries("");
    setIndentNo("");
    setSupplierName("");
    setSupplierCode("");
    setActiveTab(0);
  };

  return (
    <div className="NewJobworkMaster">
      <ToastContainer />
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
                <div className="NewJobwork">
                  <div className="container-fluid">
                    <div className="NewJobwork-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <h5 className="header-title">
                            {isEditMode ? "Edit JW-PO" : "New JW-PO"}
                          </h5>
                        </div>
                        <div className="col-md-1">
                          <label>PO Type:</label>
                          <select
                            className="form-control"
                            value={poType}
                            onChange={(e) => setPoType(e.target.value)}
                          >
                            <option value="CLOSE">CLOSE</option>
                            <option value="OPEN">OPEN</option>
                          </select>
                        </div>

                        <div className="col-md-1">
                          <label>Series:</label>
                          <select
                            className="form-control"
                            value={selectedSeries}
                            onChange={handleSeriesChange}
                          >
                            <option value="select">Select</option>
                            <option value="JOBWORK">JOBWORK</option>
                          </select>
                        </div>
                        <div className="col-md-1" style={{ marginTop: "20px" }}>
                          <input
                            type="text"
                            className="form-control"
                            value={indentNo}
                            readOnly
                          />
                        </div>
                        <div className="col-md-1 position-relative">
                          <label>Supplier:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                          />
                          {showDropdown && dropdownData.length > 0 && (
                            <ul
                              className="list-group position-absolute w-100"
                              style={{
                                zIndex: 1000,
                                maxHeight: "150px",
                                overflowY: "auto",
                              }}
                            >
                              {dropdownData.map((item) => (
                                <li
                                  key={item.id}
                                  className="list-group-item list-group-item-action"
                                  onClick={() => handleSelectSupplier(item)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {item.Name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="col-md-1">
                          <label>Code:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={supplierCode}
                            disabled
                          />
                        </div>

                        <div className="col-md-1 mt-4">
                          <button
                            className="vndrbtn btn-primary"
                            onClick={handleClear}
                          >
                            Clear
                          </button>
                        </div>
                        <div className="col-md-2 mt-4 text-end">
                          <Link
                            to="/JobworkList"
                            className="vndrbtn newpurchase-btn"
                          >
                            PO List
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="newjobwork-main">
                      <ul
                        className="nav nav-pills mb-3"
                        role="tablist"
                      >
                        {[
                          "PO Info",
                          "Item Details",
                          "GST Details",
                          "Schedule Line",
                          "Ship To Add",
                        ].map((tabName, index) => (
                          <li className="nav-item" role="presentation" key={index}>
                            <button
                              className={`nav-link ${
                                activeTab === index ? "active" : ""
                              }`}
                              type="button"
                              onClick={() => setActiveTab(index)}
                            >
                              {tabName}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="tab-content">
                        {activeTab === 0 && (
                          <div
                            className="tab-pane fade show active"
                            role="tabpanel"
                          >
                            <JobWorkPoinfo
                              data={allTabsData.poInfo}
                              updateData={(data) => updateTabData("poInfo", data)}
                              poNo={indentNo}
                            />
                          </div>
                        )}
                        {activeTab === 1 && (
                          <div
                            className="tab-pane fade show active"
                            role="tabpanel"
                          >
                            <JobWorkitemdetail
                              data={allTabsData.itemDetails}
                              updateData={(data) =>
                                updateTabData("itemDetails", data)
                              }
                              supplierCode={supplierCode}
                              updateGstData={updateGstData}
                              updateScheduleData={updateScheduleData}
                            />
                          </div>
                        )}
                        {activeTab === 2 && (
                          <div
                            className="tab-pane fade show active"
                            role="tabpanel"
                          >
                            <JobWorkgstdetail
                              data={allTabsData.gstDetails}
                              updateData={updateGstData}
                            />
                          </div>
                        )}
                        {activeTab === 3 && (
                          <div
                            className="tab-pane fade show active"
                            role="tabpanel"
                          >
                            <JobWorkschedule
                              data={allTabsData.scheduleLines}
                              updateData={updateScheduleData}
                            />
                          </div>
                        )}
                        {activeTab === 4 && (
                          <div
                            className="tab-pane fade show active"
                            role="tabpanel"
                          >
                            <JobWorkShiptoadd
                              data={allTabsData.shipToAdd}
                              updateData={(data) =>
                                updateTabData("shipToAdd", data)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    {activeTab > 0 && (
                      <button
                        type="button"
                        className="vndrbtn btn-secondary me-2"
                        onClick={handlePrevious}
                        style={{ flexGrow: 0, width: "auto" }}
                      >
                        Previous
                      </button>
                    )}
                    {activeTab < 4 ? (
                      <button
                        type="button"
                        className="vndrbtn btn-primary ms-2"
                        onClick={handleNext}
                        style={{ flexGrow: 0, width: "auto" }}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="vndrbtn btn-success"
                        onClick={handleSaveAll}
                        disabled={saving}
                        style={{ flexGrow: 0, width: "auto" }}
                      >
                        {saving
                          ? "Saving..."
                          : isEditMode
                          ? "Update Job Work PO"
                          : "Save Job Work PO"}
                      </button>
                    )}
                    <button
                      type="button"
                      className="vndrbtn btn-secondary ms-2"
                      onClick={resetAllForms}
                      style={{ flexGrow: 0, width: "auto" }}
                    >
                      Clear
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

export default NewJobworkPurchase;