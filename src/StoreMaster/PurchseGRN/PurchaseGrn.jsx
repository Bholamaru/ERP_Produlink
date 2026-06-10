import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link, useParams } from "react-router-dom";
import "./PurchaseGrn.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getNextGrnNo,
  getGeneralDetails,
  postPurchaseGRN,
  getPoDetailsByPoNo,
  fetchItemDetailsByPoAndItem,
  getGrnById,
  updatePurchaseGRN,
} from "../../Service/StoreApi.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const PurchaseGrn = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const year = new Date().getFullYear();
    const shortYear = `${String(year).slice(2)}${String(year + 1).slice(2)}`;
    localStorage.setItem("Shortyear", shortYear);
  }, []);

  const [grnNo, setGrnNo] = useState("");

  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      Series: selectedSeries,
    }));

    // Don't auto-generate GRN number in edit mode
    if (isEditMode) {
      return;
    }

    if (selectedSeries === "Purchase GRN") {
      const shortYear = localStorage.getItem("Shortyear");
      if (shortYear) {
        try {
          const nextGrnNo = await getNextGrnNo(shortYear);
          if (nextGrnNo) {
            setGrnNo(nextGrnNo);
            setFormData((prevData) => ({
              ...prevData,
              GrnNo: nextGrnNo,
            }));
          }
        } catch (error) {
          console.error("Error fetching next GRN number:", error);
        }
      }
    } else {
      setGrnNo("");
      setFormData((prevData) => ({
        ...prevData,
        GrnNo: "",
      }));
    }
  };

  const [geList, setGeList] = useState([]);
  const [formData, setFormData] = useState({
    GrnNo: "",
    Series: "",
    GE_No: "",
    Supp_Cust: "",
    Select: "",
    ChallanNo: "",
    ChallanDate: "",
    InvoiceNo: "",
    InvoiceDate: "",
    EWayBillNo: "",
    EWayBillDate: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    Plant: "Produlink",
    GrnDate: "",
    GrnTime: "",
    PreparedBy: "",
    CheckedBy: "",
    TcNo: "",
    TcDate: "",
    Remark: "",
    PaymentTermDay: "30",
  });

  useEffect(() => {
    getGeneralDetails()
      .then((data) => setGeList(data))
      .catch((err) => console.error("Error loading GE list:", err));
  }, []);

  // Fetch GRN data for editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setLoading(true);
      getGrnById(id)
        .then((data) => {
          // Populate form data
          if (data) {
            setFormData((prev) => ({
              ...prev,
              GrnNo: data.GrnNo || "",
              Series: data.Series || "",
              GE_No: data.GateEntryNo || "",
              Supp_Cust: data.SelectSupplier || "",
              Select: data.SelectPO || "",
              ChallanNo: data.ChallanNo || "",
              ChallanDate: data.ChallanDate || "",
              InvoiceNo: data.InvoiceNo || "",
              InvoiceDate: data.InvoiceDate || "",
              EWayBillNo: data.EWayBillNo || "",
              EWayBillDate: data.EWayBillDate || "",
              VehicleNo: data.VehicleNo || "",
              LrNo: data.LrNo || "",
              Transporter: data.Transporter || "",
              Plant: data.Plant || "Produlink",
              GrnDate: data.GrnDate || "",
              GrnTime: data.GrnTime || "",
              PreparedBy: data.PreparedBy || "",
              CheckedBy: data.CheckedBy || "",
              TcNo: data.TcNo || "",
              TcDate: data.TcDate || "",
              Remark: data.Remark || "",
              PaymentTermDay: data.PaymentTermDay || "30",
            }));
            setGrnNo(data.GrnNo || "");

            // Populate item details if available
            if (data.NewGrnList && data.NewGrnList.length > 0) {
              setItemDetails(data.NewGrnList);
            }

            // Populate GST details if available
            if (data.GrnGst && data.GrnGst.length > 0) {
              const mergedGst = data.GrnGst.map((gst) => ({
                ...gst,
                Rate: gst.Rate !== undefined ? gst.Rate : gst.PoRate,
                Packing: gst.Packing !== undefined ? gst.Packing : gst.PackAmt,
                Transport: gst.Transport !== undefined ? gst.Transport : gst.TransAmt,
                Vat: gst.Vat !== undefined ? gst.Vat : gst.VAT,
                Cess: gst.Cess !== undefined ? gst.Cess : gst.CESS,
              }));
              if (data.GrnGstTDC && data.GrnGstTDC.length > 0) {
                mergedGst[0] = {
                  ...mergedGst[0],
                  TOC_AssableValue: data.GrnGstTDC[0].assessable_value,
                  TOC_PackCharges: data.GrnGstTDC[0].packing_forwarding_charges,
                  TOC_TransportCost: data.GrnGstTDC[0].transport_charges,
                  TOC_Insurance: data.GrnGstTDC[0].insurance,
                  TOC_InstallationCharges: data.GrnGstTDC[0].installation_charges,
                  TOC_OtherCharges: data.GrnGstTDC[0].other_charges,
                  TOC_TDS: data.GrnGstTDC[0].Tds,
                  TOC_CGST: data.GrnGstTDC[0].cgst,
                  TOC_SGST: data.GrnGstTDC[0].sgst,
                  TOC_IGST: data.GrnGstTDC[0].igst,
                  TOC_VAT: data.GrnGstTDC[0].vat,
                  TOC_CESS: data.GrnGstTDC[0].cess_amount,
                  GR_Total: data.GrnGstTDC[0].grand_total,
                };
              }
              setGstDetails(mergedGst);
              setOriginalGstDetails(JSON.parse(JSON.stringify(mergedGst)));
            }

            // Populate RefTC details if available
            if (data.RefTC && data.RefTC.length > 0) {
              setRefTcDetails(data.RefTC);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading GRN data:", err);
          toast.error("Failed to load GRN data for editing");
          setLoading(false);
        });
    }
  }, [id]);

  const handleGEChange = (e) => {
    const selectedGE = e.target.value;
    const selectedData = geList.find((item) => item.GE_No === selectedGE);

    if (selectedData) {
      setFormData({
        ...formData,
        GE_No: selectedData.GE_No,
        Supp_Cust: selectedData.Supp_Cust,
        Select: selectedData.Select,
        ChallanNo: selectedData.ChallanNo,
        InvoiceNo: selectedData.InVoiceNo,
        EWayBillNo: selectedData.EWayBillNo,
        VehicleNo: selectedData.VehicleNo,
        Transporter: selectedData.Transporter,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [itemDetails, setItemDetails] = useState([]);
  const [gstDetails, setGstDetails] = useState([]);
  // State to store the original, unmodified GST details from the PO
  const [originalGstDetails, setOriginalGstDetails] = useState([]);

  const [refTcDetails, setRefTcDetails] = useState([
    {
      ItemCode: "",
      ItemDesc: "",
      MillTcName: "",
      MillTcNo: "",
      MillTcDate: "",
      Location: "",
    },
  ]);
  const handleRefTcChange = (index, field, value) => {
    const updatedDetails = [...refTcDetails];
    updatedDetails[index][field] = value;
    setRefTcDetails(updatedDetails);
  };
  const addRefTcRow = () => {
    setRefTcDetails([
      ...refTcDetails,
      {
        ItemCode: "",
        ItemDesc: "",
        MillTcName: "",
        MillTcNo: "",
        MillTcDate: "",
        Location: "",
      },
    ]);
  };

  const handleAddAllItem = async () => {
    if (!formData.Select) return;
    const data = await getPoDetailsByPoNo(formData.Select);
    if (data) {
      const items = data.Item_Detail_Enter || [];
      const gsts = data.Gst_Details || [];

      // Initialize GrnQty with the PO Qty by default
      const initializedItems = items.map((item) => ({
        ...item,
        GrnQty: item.Qty, // Default GrnQty to PO Qty
      }));

      setItemDetails(initializedItems);
      setGstDetails(gsts);
      // Store a deep copy of the original GST details
      setOriginalGstDetails(JSON.parse(JSON.stringify(gsts)));
    }
  };

  const handleCancel = () => {
    setItemDetails([]);
    setGstDetails([]);
    setOriginalGstDetails([]); // Reset original GST details too
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const selectedPoNo = formData.Select;

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2 && selectedPoNo) {
      try {
        const data = await fetchItemDetailsByPoAndItem(selectedPoNo, value);
        setSuggestions(data.Item_Detail_Enter);
      } catch (err) {
        console.error("Error fetching suggestions", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleAddItem = async (itemName) => {
    if (!selectedPoNo) return alert("Please select a PO number first.");
    try {
      const data = await fetchItemDetailsByPoAndItem(selectedPoNo, itemName);

      const newItem = data.Item_Detail_Enter?.[0];
      const newGst = data.Gst_Details?.[0];

      if (!newItem) {
        alert("Item not found.");
        return;
      }

      const isAlreadyAdded = itemDetails.some(
        (item) => item.Item === newItem.Item
      );
      if (isAlreadyAdded) {
        alert("Item already added");
        return;
      }

      // Initialize GrnQty with the PO Qty by default
      const initializedNewItem = {
        ...newItem,
        GrnQty: newItem.Qty, // Default GrnQty to PO Qty
      };

      setItemDetails((prev) => [...prev, initializedNewItem]);
      setGstDetails((prev) => [...prev, newGst]);
      // Add to originalGstDetails as well
      setOriginalGstDetails((prev) => [
        ...prev,
        JSON.parse(JSON.stringify(newGst)),
      ]);
      setSearchTerm("");
      setSuggestions([]);
    } catch (err) {
      console.error("Error fetching item", err);
    }
  };

  const getGstTotals = () => {
    if (!gstDetails || gstDetails.length === 0) {
      return {
        assessableValue: "0.00",
        packCharges: "0.00",
        transportCost: "0.00",
        insurance: "0.00",
        installationCharges: "0.00",
        otherCharges: "0.00",
        tds: "0.00",
        cgst: "0.00",
        sgst: "0.00",
        igst: "0.00",
        vat: "0.00",
        cess: "0.00",
        grandTotal: "0.00"
      };
    }

    let assessableValue = 0;
    let packCharges = 0;
    let transportCost = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    let vat = 0;
    let cess = 0;
    let itemTotalSum = 0;

    gstDetails.forEach((item) => {
      assessableValue += parseFloat(item.AssValue || 0);
      packCharges += parseFloat(item.Packing || 0);
      transportCost += parseFloat(item.Transport || 0);
      cgst += parseFloat(item.CGST || 0);
      sgst += parseFloat(item.SGST || 0);
      igst += parseFloat(item.IGST || 0);
      vat += parseFloat(item.Vat || 0);
      cess += parseFloat(item.Cess || 0);
      itemTotalSum += parseFloat(item.Total || 0);
    });

    const firstItem = gstDetails[0] || {};
    const insurance = parseFloat(firstItem.TOC_Insurance || 0);
    const installationCharges = parseFloat(firstItem.TOC_InstallationCharges || 0);
    const otherCharges = parseFloat(firstItem.TOC_OtherCharges || 0);
    const tds = parseFloat(firstItem.TOC_TDS || 0);

    const grandTotal = itemTotalSum + insurance + installationCharges + otherCharges - tds;

    return {
      assessableValue: assessableValue.toFixed(2),
      packCharges: packCharges.toFixed(2),
      transportCost: transportCost.toFixed(2),
      insurance: insurance.toFixed(2),
      installationCharges: installationCharges.toFixed(2),
      otherCharges: otherCharges.toFixed(2),
      tds: tds.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      igst: igst.toFixed(2),
      vat: vat.toFixed(2),
      cess: cess.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const gstTotals = getGstTotals();

  const handleSubmitGRN = async () => {
    try {
      const payload = {
        NewGrnList: itemDetails.map((item) => ({
          PoNo: item.PoNo,
          Date: item.PoDate,
          ItemNoCode: item.Item,
          Description: item.ItemDescription,
          Rate: item.Rate,
          PoQty: item.Qty,
          BalQty: item.BalQty || "0",
          ChalQty: item.ChallanQty || "0",
          GrnQty: item.GrnQty || "0",
          ShortExcessQty: item.ShortExcessQty || "0",
          UnitCode: item.Unit || "Unit",
          // Calculate Total based on GrnQty, not PO Qty
          Total: (
            parseFloat(item.Rate) * parseFloat(item.GrnQty || 0)
          ).toFixed(2),
          HeatNo: item.HeatNo || "",
          MfgDate: item.DeliveryDt,
        })),

        // gstDetails state is already updated with recalculated values,
        // so this map will use the correct data.
        GrnGst: gstDetails.map((gst) => ({
          ItemCode: gst.ItemCode,
          HSN: gst.HSN,
          PoRate: gst.Rate,
          DiscRate: gst.DiscRate || "0.00",
          Qty: gst.Qty, // This will be the new GrnQty
          Discount: gst.Discount || "0.00", // Recalculated
          PackAmt: gst.Packing, // Recalculated
          TransAmt: gst.Transport, // Recalculated
          AssValue: gst.AssValue, // Recalculated
          CGST: gst.CGST, // Recalculated
          SGST: gst.SGST, // Recalculated
          IGST: gst.IGST, // Recalculated
          VAT: gst.Vat, // Recalculated
          CESS: gst.Cess, // Recalculated
          total: gst.Total, // Table's item total value
        })),

        GrnGstTDC: [
          {
            assessable_value: gstTotals.assessableValue,
            packing_forwarding_charges: gstTotals.packCharges,
            transport_charges: gstTotals.transportCost,
            insurance: gstTotals.insurance,
            installation_charges: gstTotals.installationCharges,
            other_charges: gstTotals.otherCharges,
            Tds: gstTotals.tds,
            cgst: gstTotals.cgst,
            sgst: gstTotals.sgst,
            igst: gstTotals.igst,
            vat: gstTotals.vat,
            cess_amount: gstTotals.cess,
            tcs_amount: "0.00",
            grand_total: gstTotals.grandTotal,
          },
        ],

        RefTC: refTcDetails || [],

        Plant: "Produlink",
        Series: formData.Series,
        GateEntryNo: formData.GE_No,
        SelectSupplier: formData.Supp_Cust,
        SelectPO: formData.Select,
        AddChallanGrnQty: false,
        SelectItem: "Item XYZ",
        ItemDropdown: "Dropdown Option 1",
        HeatNo: "",
        GrnNo: formData.GrnNo,
        GrnDate: formData.GrnDate || new Date().toISOString().split("T")[0],
        GrnTime: formData.GrnTime || new Date().toTimeString().split(" ")[0],
        ChallanNo: formData.ChallanNo,
        ChallanDate: formData.ChallanDate || "",
        InvoiceNo: formData.InvoiceNo,
        InvoiceDate: formData.InvoiceDate || "",
        EWayBillNo: formData.EWayBillNo,
        EWayBillDate: formData.EWayBillDate || "",
        VehicleNo: formData.VehicleNo,
        LrNo: formData.LrNo || "",
        Transporter: formData.Transporter,
        PreparedBy: formData.PreparedBy || "User",
        CheckedBy: formData.CheckedBy || "User",
        TcNo: formData.TcNo || "",
        TcDate: formData.TcDate || "",
        QcCheck: false,
        Delivery: false,
        Remark: formData.Remark || "",
        PaymentTermDay: formData.PaymentTermDay || "30",
      };

      console.log("Payload to Submit:", payload); // Debug
      
      if (isEditMode && id) {
        // Update existing GRN
        const response = await updatePurchaseGRN(id, payload);
        console.log("Update Response:", response);
        toast.success("GRN updated successfully!");
      } else {
        // Create new GRN
        const response = await postPurchaseGRN(payload);
        console.log("Success Response:", response);
        toast.success("GRN submitted successfully!");
      }
    } catch (error) {
      console.error("GRN submission error:", error);
      toast.error(isEditMode ? "Failed to update GRN. Check the console." : "Something went wrong. Check the console.");
    }
  };

  if (loading) {
    return (
      <div className="NewStorePurchasegrn">
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
                  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading GRN data...</p>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="NewStorePurchasegrn">
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
                <div className="Purchasegrn-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-1">
                      <h5 className="header-title text-start">{isEditMode ? "Edit GRN" : "New GRN"}</h5>
                    </div>
                    <div className="col-md-9 mt-4">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <select
                            id="sharpSelect"
                            className="form-select"
                            value={formData.Plant}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                Plant: e.target.value,
                              })
                            }
                          >
                            <option value="Produlink">Produlink</option>
                          </select>
                        </div>

                        {/* Label: Series and Series Select Option */}
                        <div className="col-md-1">
                          <label htmlFor="seriesSelect" className="form-label">
                            Series:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <select
                            id="seriesSelect"
                            className="form-select"
                            onChange={handleSeriesChange}
                          >
                            <option value="">Select</option>
                            <option value="Purchase GRN">Purchase GRN</option>
                          </select>
                        </div>

                        {/* GRN Number Input - readonly */}
                        <div className="col-md-2">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control"
                            placeholder="Enter value"
                            value={grnNo}
                            readOnly
                          />
                        </div>

                        <div className="col-md-2 d-flex align-items-center">
                          <input type="checkbox" id="poGrnCheckbox" />
                          <label htmlFor="poGrnCheckbox" className="ms-1">
                            PO GRN
                          </label>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <input type="checkbox" id="directGrnCheckbox" />
                          <label htmlFor="directGrnCheckbox" className="ms-1">
                            Direct GRN
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <Link className="btn" to="/Grn-List">
                        GRN List
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="Purchasegrn-main mt-5">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">Gate Entry No:</div>
                          <div className="col-md-6">
                            <select
                              className="form-select"
                              onChange={handleGEChange}
                            >
                              <option value="">Select GE No</option>
                              {geList.map((item, idx) => (
                                <option key={idx} value={item.GE_No}>
                                  {item.GE_No} - {item.Supp_Cust}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">Select Supplier:</div>
                          <div className="col-md-6">
                            <input
                              className="form-control"
                              value={formData.Supp_Cust}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row text-start">
                          <div className="col-md-4">Select Po:</div>
                          <div className="col-md-3">
                            <select
                              id="routingSelect"
                              className="form-select"
                              value={formData.Select}
                              readOnly
                            >
                              <option value="">Select</option>
                              {formData.Select && (
                                <option>{formData.Select}</option>
                              )}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <button
                              type="button"
                              className="btn"
                              onClick={handleAddAllItem}
                            >
                              Add All Item
                            </button>
                          </div>
                          <div className="col-md-1">
                            <button
                              type="button"
                              className="btn"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4 ">
                      <div className="col-md-6">
                        <div className="row ">
                          <div className="col-md-4">Search Item:</div>
                          <div className="col-md-6">
                            <input
                              className="form-control"
                              value={searchTerm}
                              onChange={handleSearch}
                              placeholder="Type item name..."
                            />
                            {suggestions.length > 0 && (
                              <ul className="list-group position-absolute z-1 w-100">
                                {suggestions.map((item) => (
                                  <li
                                    key={item.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleAddItem(item.Item)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {item.Item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="col-md-2">
                            <button
                              type="button"
                              className="btn"
                              onClick={() => handleAddItem(searchTerm)}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="row ">
                          <div className="col-md-8">
                            <button
                              type="button"
                              className="btn"
                              onClick={handleButtonClick}
                            >
                              Pending Release PO item
                            </button>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="Purchasegrntable">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        {itemDetails.length > 0 && (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr no.</th>
                                <th>PO No</th>
                                <th>Date</th>
                                <th>Item No | Code</th>
                                <th>Description</th>
                                <th>Rate</th>
                                <th>PO Qty</th>
                                <th>Bal. Qty</th>
                                <th>Challan Qty</th>
                                <th>GRN Qty</th>
                                <th>Short/Excess Qty</th>
                                <th>Unit Code</th>
                                <th>Total</th>
                                <th>Heat No.</th>
                                <th>MFg Date</th>
                                <th>Hc</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemDetails.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.PoNo}</td>
                                  <td>{item.PoDate}</td>
                                  <td>{item.Item}</td>
                                  <td>{item.ItemDescription}</td>
                                  <td>{item.Rate}</td>
                                  <td>{item.Qty}</td>
                                  <td>{/* Placeholder for Bal. Qty */}</td>
                                  <td>{/* Placeholder for Challan Qty */}</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-input"
                                      value={item.GrnQty || ""}
                                      onChange={(e) => {
                                        const newGrnQtyValue = e.target.value;
                                        const newGrnQty =
                                          parseFloat(newGrnQtyValue) || 0;

                                        // 1. Update itemDetails state
                                        setItemDetails((prevItemDetails) =>
                                          prevItemDetails.map((item, idx) =>
                                            idx === index
                                              ? {
                                                  ...item,
                                                  GrnQty: newGrnQtyValue,
                                                }
                                              : item
                                          )
                                        );

                                        // 2. Get original GST data for calculation
                                        const originalGstItem =
                                          originalGstDetails[index];
                                        if (!originalGstItem) return;

                                        // Find the original PO Qty from the *original* GST item
                                        const originalPoQty =
                                          parseFloat(originalGstItem.Qty || 0);

                                        let newCalculatedGstItem;

                                        if (originalPoQty === 0) {
                                          // Avoid division by zero.
                                          newCalculatedGstItem = {
                                            ...originalGstItem,
                                            Qty: newGrnQtyValue,
                                            Discount: originalGstItem.Discount || "0.00",
                                            Packing: "0.00",
                                            Transport: "0.00",
                                            AssValue: "0.00",
                                            CGST: originalGstItem.CGST || "0.00",
                                            SGST: originalGstItem.SGST || "0.00",
                                            IGST: originalGstItem.IGST || "0.00",
                                            Vat: originalGstItem.Vat || "0.00",
                                            Cess: originalGstItem.Cess || "0.00",
                                            Total: "0.00",
                                            SubTotal: "0.00",
                                          };
                                        } else {
                                          // Calculate ratio
                                          const ratio =
                                            newGrnQty / originalPoQty;

                                          // Helper function
                                          const calc = (val) =>
                                            (
                                              parseFloat(val || 0) * ratio
                                            ).toFixed(2);

                                          newCalculatedGstItem = {
                                            ...originalGstItem,
                                            Qty: newGrnQtyValue,
                                            Discount: originalGstItem.Discount || "0.00",
                                            Packing: calc(
                                              originalGstItem.Packing
                                            ),
                                            Transport: calc(
                                              originalGstItem.Transport
                                            ),
                                            AssValue: calc(
                                              originalGstItem.AssValue
                                            ),
                                            CGST: originalGstItem.CGST || "0.00",
                                            SGST: originalGstItem.SGST || "0.00",
                                            IGST: originalGstItem.IGST || "0.00",
                                            Vat: originalGstItem.Vat || "0.00",
                                            Cess: originalGstItem.Cess || "0.00",
                                            Total: calc(originalGstItem.Total),
                                            SubTotal: calc(
                                              originalGstItem.SubTotal
                                            ),
                                          };
                                        }

                                        // 3. Update the *live* gstDetails state
                                        setGstDetails((prevGstDetails) =>
                                          prevGstDetails.map((gst, idx) =>
                                            idx === index
                                              ? newCalculatedGstItem
                                              : gst
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    {/* Placeholder for Short/Excess Qty */}
                                  </td>
                                  <td>{item.Unit}</td>
                                  <td>
                                    {(
                                      parseFloat(item.Rate) *
                                      parseFloat(item.GrnQty || 0)
                                    ).toFixed(2)}
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-input"
                                      onChange={(e) => {
                                        const newHeat = e.target.value;
                                        setItemDetails((prev) =>
                                          prev.map((row, idx) =>
                                            idx === index
                                              ? { ...row, HeatNo: newHeat }
                                              : row
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>{item.DeliveryDt}</td>
                                  <td>{/* Placeholder for Hc */}</td>
                                  <td>
                                    <button className="btn">
                                      <FaEdit />
                                    </button>
                                  </td>
                                  <td>
                                    <button className="btn">
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Purchasegrn122Footer">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-Gernal-Detail-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Gernal-Detail"
                        type="button"
                        role="tab"
                        aria-controls="pills-Gernal-Detail"
                        aria-selected="true"
                      >
                        General Detail
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-GST-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-GST-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-GST-Details"
                        aria-selected="false"
                      >
                        GST Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-Ref-Doc/Tc-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Ref-Doc/Tc-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-Ref-Doc/Tc-Details"
                        aria-selected="false"
                      >
                        Ref Doc/TC Details
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-Gernal-Detail"
                      role="tabpanel"
                      aria-labelledby="pills-Gernal-Detail-tab"
                      tabindex="0"
                    >
                      <div className="StorePurchasegrn1 text-start">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-4 text-start">
                              <div className="container mt-4">
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <tbody>
                                      {/* First Column Group */}
                                      <tr>
                                        <th className="col-md-4">GRN No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="GrnNo"
                                            value={grnNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>GRN Date:</th>
                                        <td>
                                          <input
                                            type="date"
                                            name="GrnDate"
                                            value={formData.GrnDate}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>GRN Time:</th>
                                        <td>
                                          <input
                                            type="time"
                                            name="GrnTime"
                                            value={formData.GrnTime}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Challan No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="ChallanNo"
                                            value={formData.ChallanNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Challan Date:</th>
                                        <td>
                                          <input
                                            type="date"
                                            name="ChallanDate"
                                            value={formData.ChallanDate}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Invoice No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="InvoiceNo"
                                            value={formData.InvoiceNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="col-md-4">
                                          Invoice Date:
                                        </th>
                                        <td>
                                          <input
                                            type="date"
                                            name="InvoiceDate"
                                            value={formData.InvoiceDate}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-start">
                              {/* Second Column Group */}
                              <div className="container mt-4">
                                <div className="table-responsive text-start">
                                  <table className="table table-bordered">
                                    <tbody>
                                      <tr>
                                        <th>E Way Bill No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="EWayBillNo"
                                            value={formData.EWayBillNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>E Way Bill Date:</th>
                                        <td>
                                          <input
                                            type="date"
                                            name="EWayBillDate"
                                            value={formData.EWayBillDate}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Vehical No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="VehicleNo"
                                            value={formData.VehicleNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>LR No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="LrNo"
                                            value={formData.LrNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Transporter:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="Transporter"
                                            value={formData.Transporter}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Prepared By:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="PreparedBy"
                                            value={formData.PreparedBy}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Checked By:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="CheckedBy"
                                            value={formData.CheckedBy}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-start">
                              {/* Third Column Group */}
                              <div className="container mt-4">
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <tbody>
                                      <tr>
                                        <th>TC No:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="TcNo"
                                            value={formData.TcNo}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>TC Date:</th>
                                        <td>
                                          <input
                                            type="date"
                                            name="TcDate"
                                            value={formData.TcDate}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>QC Check:</th>
                                        <td>
                                          <div className="row">
                                            <div className="col-md-4 d-flex align-items-center">
                                              <input
                                                type="checkbox"
                                                id="QuantityCheckbox"
                                                name="QCCheck"
                                                value="Quantity"
                                                checked={
                                                  formData.QCCheck?.includes(
                                                    "Quantity"
                                                  ) || false
                                                }
                                                onChange={handleChange}
                                              />
                                              <label
                                                htmlFor="QuantityCheckbox"
                                                className="ms-1"
                                              >
                                                Quantity
                                              </label>
                                            </div>
                                            <div className="col-md-3 d-flex align-items-center">
                                              <input
                                                type="checkbox"
                                                id="QualityCheckbox"
                                                name="QCCheck"
                                                value="Quality"
                                                checked={
                                                  formData.QCCheck?.includes(
                                                    "Quality"
                                                  ) || false
                                                }
                                                onChange={handleChange}
                                              />
                                              <label
                                                htmlFor="QualityCheckbox"
                                                className="ms-1"
                                              >
                                                Quality
                                              </label>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="col-md-4">
                                          Delivery in Time:
                                        </th>
                                        <td>
                                          <div className="row">
                                            <div className="col-md-2 d-flex align-items-center">
                                              <input
                                                type="checkbox"
                                                id="YesCheckbox"
                                                name="DeliveryInTime"
                                                value="Yes"
                                                checked={
                                                  formData.DeliveryInTime ===
                                                  "Yes"
                                                }
                                                onChange={handleChange}
                                              />
                                              <label
                                                htmlFor="YesCheckbox"
                                                className="ms-1"
                                              >
                                                Yes
                                              </label>
                                            </div>
                                            <div className="col-md-2 d-flex align-items-center">
                                              <input
                                                type="checkbox"
                                                id="NoCheckbox"
                                                name="DeliveryInTime"
                                                value="No"
                                                checked={
                                                  formData.DeliveryInTime ===
                                                  "No"
                                                }
                                                onChange={handleChange}
                                              />
                                              <label
                                                htmlFor="NoCheckbox"
                                                className="ms-1"
                                              >
                                                No
                                              </label>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Remark:</th>
                                        <td>
                                          <textarea
                                            name="Remark"
                                            value={formData.Remark}
                                            onChange={handleChange}
                                            className="form-control"
                                          ></textarea>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Payment Term Days:</th>
                                        <td>
                                          <input
                                            type="text"
                                            name="PaymentTermDay"
                                            value={formData.PaymentTermDay}
                                            onChange={handleChange}
                                            className="form-control"
                                          />
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
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-GST-Details"
                      role="tabpanel"
                      aria-labelledby="pills-GST-Details-tab"
                      tabindex="0"
                    >
                      <div className="StorePurchasegrn2">
                        <div className="row ">
                          <div className="col-md-7">
                            <div className="table-responsive">
                              {/*
                                This table now reads from the *updated* gstDetails state.
                                All values (Qty, AssValue, CGST, etc.)
                                will reflect the calculations from the GrnQty.
                              */}
                              {gstDetails.length > 0 && (
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Sr</th>
                                      <th>Item Code</th>
                                      <th>HSN</th>
                                      <th>PO Rate</th>
                                      <th>Disc Rate</th>
                                      <th>Qty</th>
                                      <th>Discount</th>
                                      <th>Pack Amt</th>
                                      <th>TransAmt</th>
                                      <th>Tool Amort</th>
                                      <th>Ass Value</th>
                                      <th>CGST</th>
                                      <th>SGST</th>
                                      <th>IGST</th>
                                      <th>VAT</th>
                                      <th>CESS</th>
                                      <th>Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {gstDetails.map((item, index) => (
                                      <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.ItemCode}</td>
                                        <td>{item.HSN}</td>
                                        <td>{item.Rate}</td>
                                        <td>
                                          {(
                                            parseFloat(item.SubTotal || 0) /
                                            (parseFloat(item.Qty) || 1)
                                          ).toFixed(2)}
                                        </td>
                                        <td>{item.Qty}</td>
                                        <td>{item.Discount}</td>
                                        <td>{item.Packing}</td>
                                        <td>{item.Transport}</td>
                                        <td>{item.ToolAmort}</td>
                                        <td>{item.AssValue}</td>
                                        <td>{item.CGST}</td>
                                        <td>{item.SGST}</td>
                                        <td>{item.IGST}</td>
                                        <td>{item.Vat}</td>
                                        <td>{item.Cess}</td>
                                        <td>{item.Total}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="row">
                              <div className="col-md-7 text-start">
                                {/* Second Column Group */}
                                <div className="container">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>TDC Assessable Value:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.assessableValue}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            (TDC) Pack & Fwrd Charge:
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.packCharges}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>TransPort Charges:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.transportCost}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Insurance:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.insurance}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Installation Charges:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.installationCharges}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Other Charges:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.otherCharges}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>TDS:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.tds}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 text-start">
                                {/* Third Column Group */}
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>CGST: 00.00%</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.cgst}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            SGST: 00.00%
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.sgst}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>IGST: 00.00%</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.igst}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>VAT Amt:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.vat}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Cess Amt:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.cess}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>TCS:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value="0.00"
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>GR. Total:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={gstTotals.grandTotal}
                                              readOnly
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            colSpan="2"
                                            className="text-start"
                                          >
                                            <button className="btn btn-primary">
                                              DocTCUpload
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
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-Ref-Doc/Tc-Details"
                      role="tabpanel"
                      aria-labelledby="pills-Ref-Doc/Tc-Details-tab"
                      tabindex="0"
                    >
                      <div className="StorePurchasegrn3">
                        <div className="row ">
                          <div className="col-md-8 mt-4">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>
                                    <th>Item Code</th>
                                    <th>Item Desc</th>
                                    <th>Mill/TC Name</th>
                                    <th>Mill/TC No</th>
                                    <th>Mill/TC Date</th>
                                    <th>Location</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {refTcDetails.map((tc, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <input
                                          className="form-control"
                                          value={tc.ItemCode}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "ItemCode",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          value={tc.ItemDesc}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "ItemDesc",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          value={tc.MillTcName}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "MillTcName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          value={tc.MillTcNo}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "MillTcNo",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="date"
                                          className="form-control"
                                          value={tc.MillTcDate}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "MillTcDate",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          className="form-control"
                                          value={tc.Location}
                                          onChange={(e) =>
                                            handleRefTcChange(
                                              index,
                                              "Location",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <button
                                type="button"
                                className="btn mt-2"
                                onClick={addRefTcRow}
                              >
                                + Add Row
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 text-end">
                            <button className="pobtn" type="button">
                              Doc/Tc Upload
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row text-end">
                    <div className="col-md-2">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmitGRN}
                      >
                        Submit GRN
                      </button>
                    </div>
                  </div>
                </div>
              </main>

              {/* {isCardVisible && (
                <div className="storenewmrn-overlay">
                  <div className="costtype2-overlay">
                    <div className="new-card">
                      <div className="row">
                        <div className="col-md-10 text-start">
                          <h5 className="card-title">
                            Pending for Release PO Item List
                          </h5>
                        </div>
                        <div className="col-md-2 text-end">
                          <button className="btn" onClick={handleClose}>
                            X
              D         </div>
                      </div>
                      <div className="card-body">
                        <table>
                          <thead>
                            <tr>
                              <th>No Data Found !!</th>
                            </tr>
                D       </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseGrn;