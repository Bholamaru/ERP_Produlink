import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./OutwardChallan.css";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modals/Modal.jsx";
import VehicleModal from "../../components/modals/VehicleModal.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const initialItem = {
  item_code: "",
  type: "",
  description: "",
  store: "",
  stock: 0,
  suppRefNo: "",
  qtyNo: "",
  qtyKg: "",
  process: "",
  pkg: "",
  wRate: "",
  wValue: "",
};

const initialFooter = {
  item_code: "",
  Transport_name: "",
  EWay_bill_no: "",
  Eway_bill_Qty: "",
  challan_date: "",
  vehical_no: "",
  eway_bill_date: "",
  remarks: "",
  challan_time: "",
  Estimated_value: "",
  rev_ch_amt: "",
  DC_no: "",
  DC_date: "",
  rev_charges: "N",
  plant: "",
  series: "",
  vender: "",
};

const OutwardChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanNumber, setChallanNumber] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [showTrasportDataModel, setShowTrasportDataModel] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [venders, setVenders] = useState([]);
  const [showVenderList, setShowVenderList] = useState(false);
  const [heatNoData, setHeatNoData] = useState([]);
  const [showHeatNoDropdown, setShowHeatNoDropdown] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("FG");
  const [currentItem, setCurrentItem] = useState({ ...initialItem });
  const [items, setItems] = useState([]);
  const [footerData, setFooterData] = useState({ ...initialFooter });
  const [venderItems, setVenderItems] = useState({
    all_details: [],
  });

  // --- STATE VARIABLES ---
  const [selectedSeries, setSelectedSeries] = useState("Select");
  const [seriesInputValue, setSeriesInputValue] = useState("");
  const [fgFullResponse, setFgFullResponse] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [fgOperations, setFgOperations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showOperationDropdown, setShowOperationDropdown] = useState(false);

  const handleResetAll = () => {
    setCurrentItem(initialItem);
    setItems([]);
    setFooterData(initialFooter);
    setVenderItems({ all_details: [] });
    setSelectedItemType("FG");
    setHeatNoData([]);
    setShowHeatNoDropdown(false);
    setFgOperations([]);
    setShowOperationDropdown(false);
    setSelectedSeries("Select");
    setSeriesInputValue("");
    setChallanNumber("");
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  function filterItemsByKeyword(itemsToFilter = [], keyword) {
    if (!Array.isArray(itemsToFilter) || !keyword) {
      return [];
    }
    const lowercasedKeyword = keyword.toLowerCase();
    return itemsToFilter.filter(
      (item) =>
        (item.ItemName &&
          item.ItemName.toLowerCase().includes(lowercasedKeyword)) ||
        (item.ItemDescription &&
          item.ItemDescription.toLowerCase().includes(lowercasedKeyword)) ||
        (item.item_code &&
          item.item_code.toLowerCase().includes(lowercasedKeyword)) ||
        (item.description &&
          item.description.toLowerCase().includes(lowercasedKeyword)) ||
        (item.OutAndInPart &&
          item.OutAndInPart.toLowerCase().includes(lowercasedKeyword))
    );
  }

  const fetchVenders = async (e) => {
    const query = e.target.value;
    setFooterData((prev) => ({ ...prev, vender: query }));
    if (query.trim().length === 0) {
      setShowVenderList(false);
      setVenders([]);
      return;
    }
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/Purchase/Fetch_Supplier_Code/?search=${query}`
      );
      const json = await res.json();
      setVenders(json);
      setShowVenderList(json.length > 0);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setShowVenderList(false);
    }
  };

  const handleSeriesChange = async (e) => {
    const series = e.target.value;
    setSelectedSeries(series);
    setSeriesInputValue("");
    setChallanNumber("");

    let url = "";
    let numberKey = "";

    const keyMapping = {
      Rework: {
        url: "http://127.0.0.1:8000/Sales/genrate-rework-no",
        key: "Rework_no",
      },
      "57F5": {
        url: "http://127.0.0.1:8000/Sales/generate-challan-no/",
        key: "Challan_no",
      },
      Maintenance: {
        url: "http://127.0.0.1:8000/Sales/generate-challan-no/",
        key: "Challan_no",
      },
    };

    if (keyMapping[series]) {
      url = keyMapping[series].url;
      numberKey = keyMapping[series].key;
    }

    if (url) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`API call failed with status ${res.status}`);
        }
        const data = await res.json();
        const generatedNo = data[numberKey];

        if (generatedNo) {
          setSeriesInputValue(`57(F4) No : ${generatedNo}`);
          setChallanNumber(generatedNo);
          toast.success(`${series} number generated: ${generatedNo}`);
        } else {
          toast.error(`API '${numberKey}' key No number.`);
          console.error("API response missing key:", data);
        }
      } catch (error) {
        console.error("Error fetching series number:", error);
        toast.error("Number generate error.");
      }
    }
  };

  const fetchTransportData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/transportdetails/");
      const resData = await res.json();
      setTransportData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVehicleDetails = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/vehicaldetails/");
      const resData = await res.json();
      setVehicleData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItemsForVendor = async (vendorName) => {
    if (!vendorName) return;

    try {
      let url = "";
      if (selectedItemType === "FG") {
        url = `http://127.0.0.1:8000/Purchase/jobworkpo/FG/items/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      } else if (selectedItemType === "RM") {
        url = `http://127.0.0.1:8000/Sales/inwardchallanview/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      } else {
        url = `http://127.0.0.1:8000/Sales/inwardchallanview/?supplier=${encodeURIComponent(
          vendorName
        )}`;
      }

      console.log("Fetching items from URL:", url);
      const res = await fetch(url);

      // ✅ FIX: Agar 404 ya koi error aaye to yahi rook jao
      if (!res.ok) {
        console.warn(`Vendor data not found or API error. Status: ${res.status}`);
        setVenderItems({ all_details: [] });
        return;
      }

      const resData = await res.json();
      console.log("API Response for vendor:", resData);

      let finalData = [];
      if (selectedItemType === "FG" && Array.isArray(resData)) {
        finalData = resData.map((item) => ({
          ...item,
          ItemName: item.ItemName,
          ItemDescription: item.OutAndInPart,
          type: "FG",
          item_type: "FG",
          Qty: item.Qty,
        }));
      } else if (resData && Array.isArray(resData.all_details)) {
        finalData = resData.all_details;
      } else if (Array.isArray(resData)) {
        finalData = resData;
      }

      setVenderItems({ all_details: finalData });
    } catch (err) {
      console.error("Error fetching items from vendor:", err);
      setVenderItems({ all_details: [] });
    }
  };

  // ✅ FIX: RM API Call (Uses Store Endpoint)
  const fetchHeatNoDataRM = async (itemCode) => {
    if (!itemCode) return;
    try {
      console.log("Fetching RM HeatNo for:", itemCode);

      // ✅ URL Change: Sales hatakar Store kiya hai
      const res = await fetch(
        `http://127.0.0.1:8000/Store/heat-no/?item_code=${encodeURIComponent(itemCode)}`
      );

      if (!res.ok) {
        console.warn("RM API Error or 404");
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        return;
      }

      const resData = await res.json();
      console.log("RM Heat No API Response:", resData);

      // Backend response structure check (kabhi data me hota hai, kabhi direct array)
      const finalData = resData.data || resData;

      if (Array.isArray(finalData) && finalData.length > 0) {
        setHeatNoData(finalData);
        setShowHeatNoDropdown(true);
      } else {
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        toast.warning("No Heat No found for this RM item");
      }
    } catch (err) {
      console.error("Error fetching RM heat no data:", err);
      setHeatNoData([]);
      setShowHeatNoDropdown(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    fetchTransportData();
    fetchVehicleDetails();
  }, [sideNavOpen]);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemSearchChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const searchText = currentItem.type;
    if (!searchText || searchText.trim() === "") {
      setShowFilterDropDown(false);
      return;
    }

    const baseItems =
      venderItems && Array.isArray(venderItems.all_details)
        ? venderItems.all_details
        : [];

    let itemsByType = [];
    if (selectedItemType === "RM") {
      itemsByType = baseItems.filter(
        (item) =>
          item.item_type === "RM" ||
          (item.item_type === null && item.ItemName === "RM")
      );
    } else if (selectedItemType === "FG") {
      itemsByType = baseItems.filter(
        (item) =>
          item.item_type === "FG" ||
          item.ItemType === "FG" ||
          item.type === "FG"
      );
    } else if (selectedItemType === "ITEMMASTER") {
      itemsByType = baseItems;
    }

    const filtered = filterItemsByKeyword(itemsByType, searchText);
    setFilteredItemData(filtered);
    setShowFilterDropDown(filtered.length > 0);
  }, [currentItem.type, selectedItemType, venderItems]);

  const handleAddItem = () => {
    if (
      !currentItem.description ||
      !currentItem.pkg ||
      !currentItem.process ||
      !currentItem.qtyKg ||
      !currentItem.qtyNo ||
      !currentItem.store ||
      !currentItem.stock ||
      !currentItem.suppRefNo ||
      !currentItem.type ||
      !currentItem.wRate ||
      !currentItem.wValue
    ) {
      return toast.error("Please fill all the values to add the item.");
    }
    setItems((prev) => [...prev, currentItem]);
    setCurrentItem({ ...initialItem });
    setHeatNoData([]);
    setShowHeatNoDropdown(false);
    setFgOperations([]);
    setShowOperationDropdown(false);
  };

  const handleDeleteItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleFooterChange = (e) => {
    let { name, value } = e.target;
    if (name === "rev_charges") {
      value = e.target.value === "true" ? "Y" : "N";
    }
    setFooterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChallan = async () => {
    if (items.length <= 0) {
      return toast.error("Add at least one item to create a challan!");
    }
    const payload = {
      challan_no: challanNumber,
      items: items,
      ...footerData,
    };
    console.log("Payload to save:", payload);
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/onward-challans/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      console.log("Saved Challan:", data);
      toast.success("Challan saved successfully!");
      handleResetAll();
    } catch (err) {
      toast.error("Failed to save challan.");
      console.error("Save failed:", err);
    }
  };

  // --- FIX: Complete fetchAndMapFGData Function ---
  const fetchAndMapFGData = async (itemCode, currentOpNo) => {
    if (!itemCode) return;

    try {
      // API Call
      const url = `http://127.0.0.1:8000/Sales/heatno/fg/?item=${encodeURIComponent(
        itemCode
      )}`;
      console.log("Fetching URL:", url);

      const res = await fetch(url);
      const resData = await res.json();
      setFgFullResponse(resData); // Data save 

      let finalStockData = [];

      // --- LOGIC START ---
      if (currentOpNo === 10) {

        if (resData.heat_qty_summary && Array.isArray(resData.heat_qty_summary)) {
          finalStockData = resData.heat_qty_summary.map((d) => ({
            heat_no: d.HeatNo,
            stock: d.Qty,
          }));
        }
      } else {

        const requiredPrevOp = currentOpNo - 10;

        if (resData.production_summary) {
          const keys = Object.keys(resData.production_summary);

          const matchingKey = keys.find((k) => k.startsWith(`${requiredPrevOp}|`));

          if (matchingKey) {
            const dataList = resData.production_summary[matchingKey];
            finalStockData = dataList.map((d) => ({
              heat_no: d.lot_no,
              stock: d.prod_qty,
            }));
          }
        }
      }
      // --- LOGIC END ---

      // Dropdown Update
      if (finalStockData.length > 0) {
        setHeatNoData(finalStockData);
        setShowHeatNoDropdown(true);


        if (finalStockData.length === 1) {
          setCurrentItem((prev) => ({
            ...prev,
            store: finalStockData[0].heat_no,
            stock: finalStockData[0].stock,
          }));
        }

        toast.success(`Data Loaded: ${finalStockData.length} Records`);
      } else {
        setHeatNoData([]);
        setShowHeatNoDropdown(false);
        toast.warning("No stock found for this Operation");
      }
    } catch (err) {
      console.error("Error fetching FG data:", err);
      setHeatNoData([]);
    }
  };

  const handleSelectItemFromDropdown = async (item) => {
    if (item) {
      console.log("Raw Item Selected:", item);
      console.log("Selected Item Type:", selectedItemType);

      let cleanCode = "";
      let currentOpNo = 10;

      // --- RM LOGIC ---
      if (selectedItemType === "RM") {

        cleanCode = item.item_code || item.ItemName || "";
        console.log("RM Clean Code:", cleanCode);

        // State Update
        setCurrentItem((prev) => ({
          ...prev,
          type: `${item.ItemDescription || item.description} (${item.ItemName || item.item_code})`,
          description: item.ItemDescription || item.description,
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || item.rate || "",
          process: "",
          store: "",
          stock: ""
        }));

        setShowFilterDropDown(false);


        if (cleanCode) {
          console.log("Calling fetchHeatNoDataRM for:", cleanCode);
          await fetchHeatNoDataRM(cleanCode);
        }
      }
      // --- FG LOGIC ---
      else if (selectedItemType === "FG") {
        cleanCode = item.ItemName;

        if (item.ItemName && item.ItemName.includes("|")) {
          const pipeParts = item.ItemName.split("|");
          const firstSection = pipeParts[0];

          if (firstSection.includes("-")) {
            const dashParts = firstSection.split("-");
            if (dashParts.length >= 2) {
              cleanCode = dashParts[1].trim();
            } else {
              cleanCode = dashParts[0].trim();
            }
          } else {
            cleanCode = pipeParts.length > 1 ? pipeParts[1].trim() : pipeParts[0].trim();
          }

          const opPart = pipeParts.find((part) =>
            part.trim().toUpperCase().startsWith("OP:")
          );
          if (opPart) {
            const opNumberStr = opPart.split(":")[1];
            currentOpNo = parseInt(opNumberStr);
          }
        }

        console.log("FG Clean Code:", cleanCode, "Operation:", currentOpNo);

        // State Update
        setCurrentItem((prev) => ({
          ...prev,
          type: `${item.ItemDescription} (${item.ItemName})`,
          description: item.ItemDescription,
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || "",
          process: `OP ${currentOpNo}`,
          store: "",
          stock: ""
        }));

        setShowFilterDropDown(false);


        await fetchAndMapFGData(cleanCode, currentOpNo);
      }
      // --- ITEM MASTER LOGIC ---
      else {
        cleanCode = item.item_code || item.ItemName || "";

        setCurrentItem((prev) => ({
          ...prev,
          type: `${item.ItemDescription || item.description} (${item.ItemName || item.item_code})`,
          description: item.ItemDescription || item.description,
          item_code: cleanCode,
          qtyNo: item.Qty || "",
          wRate: item.Rate || item.rate || "",
        }));

        setShowFilterDropDown(false);
      }
    }
  };

  const handleSelectVendor = (vendor) => {
    setFooterData((prev) => ({ ...prev, vender: vendor.Name }));
    setShowVenderList(false);
    setVenderItems({ all_details: [] });
    setCurrentItem(initialItem);
    fetchItemsForVendor(vendor.Name);
  };

  const handleSelectHeatNo = (item) => {
    setCurrentItem({
      ...currentItem,
      store: item.heat_no,
      stock: item.stock,
      qcStock: item.qc_stock,
    });
    setShowHeatNoDropdown(false);
  };

  const handleStoreFieldClick = async () => {
    if (selectedItemType === "FG") {
      if (heatNoData.length > 0) setShowHeatNoDropdown(true);
      return;
    }

    if (!currentItem.store || currentItem.store.trim() === "") {
      console.warn("Store input is empty, skipping API call");
      return;
    }

    try {
      const query = encodeURIComponent(currentItem.store);
      const response = await axios.get(
        `http://127.0.0.1:8000/Store/heat-no/?selected_value=${query}`
      );
      setHeatNoData(response.data.data || []);
      setShowHeatNoDropdown(true);
    } catch (error) {
      console.error("Error fetching Heat No:", error);
    }
  };

  const handleSelectTransportName = (item) => {
    if (item) {
      setFooterData((prev) => ({
        ...prev,
        Transport_name: item.transport_name,
      }));
      setShowTrasportDataModel(false);
    }
  };

  const handleSelectVehicle = (item) => {
    setFooterData((prev) => ({ ...prev, vehical_no: item.vehical_no }));
    setShowVehicleModal(false);
  };

  const handleTransportSaveButtonClick = (transport_name, eway_bill_no) => {
    if (transport_name && eway_bill_no) {
      setFooterData((prev) => ({
        ...prev,
        Transport_name: transport_name,
        EWay_bill_no: eway_bill_no,
      }));
    }
    setShowTrasportDataModel(false);
  };

  const handleVehicleSave = (data) => {
    if (data) {
      setFooterData((prev) => ({ ...prev, vehical_no: data }));
    }
    setShowVehicleModal(false);
  };

  const handleQtyChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setCurrentItem((prev) => ({ ...prev, qtyNo: "" }));
      return;
    }

    const enteredQty = Number(value);
    const availableStock = Number(currentItem.stock || 0);

    if (availableStock <= 0) {
      toast.warning("Stock is not available or the Heat Number has not been selected.");
      return;
    }

    if (enteredQty > availableStock) {
      toast.error(`Quantity available stock (${availableStock}) It cannot be more than that !!`);
      return;
    }
    setCurrentItem((prev) => ({ ...prev, qtyNo: value }));
  };

  // Updated function to handle operation selection and map data correctly
  // eslint-disable-next-line no-unused-vars
  const handleSelectOperation = (selectedOp) => {
    console.log("User Selected:", selectedOp);

    let finalStockData = [];

    if (!fgFullResponse) return;

    if (selectedOp.source === "heat_qty_summary") {
      // Case: OP 10 selected
      finalStockData = fgFullResponse.heat_qty_summary.map((item) => ({
        heat_no: item.HeatNo,
        stock: item.Qty,
        qc_stock: 0,
      }));
    } else if (selectedOp.sourceKey) {
      // Case: OP 20, 30, 45, etc. selected
      // Use the key we stored earlier (e.g., "10|...")
      const dataList = fgFullResponse.production_summary[selectedOp.sourceKey];

      if (dataList && Array.isArray(dataList)) {
        finalStockData = dataList.map((item) => ({
          heat_no: item.lot_no || item.HeatNo || "N/A",
          stock: item.prod_qty || item.Qty || 0,
          qc_stock: 0,
        }));
      }
    }

    // Update State to show Heat No Dropdown
    if (finalStockData.length > 0) {
      setHeatNoData(finalStockData);
      setShowHeatNoDropdown(true);

      // Auto-fill input with the selected Operation Name
      setCurrentItem((prev) => ({
        ...prev,
        process: selectedOp.label, // e.g., "OP 20"
        store: "", // Clear old values
        stock: "",
      }));

      toast.success(`${selectedOp.label} Stock Loaded`);
    } else {
      setHeatNoData([]);
      setShowHeatNoDropdown(false);
      toast.warning(`No stock data in ${selectedOp.label}`);
    }

    setShowOperationDropdown(false);
  };

  // --- NEW CODE START ---
  useEffect(() => {
    if (footerData.vender) {
      console.log("Type changed to:", selectedItemType, "- Refetching items...");
      setVenderItems({ all_details: [] });
      setCurrentItem((prev) => ({ ...prev, type: "", description: "" }));
      fetchItemsForVendor(footerData.vender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemType]);

  return (
    <div className="OutwardChallanMaster">
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
                <ToastContainer position="top-right" />
                <div className="OutwardChallan">
                  <div className="OutwardChallan-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">Outward Challan</h5>
                      </div>

                      <div className="col-md-10 d-flex align-items-end gap-2 flex-wrap">
                        <div className="d-flex flex-column">
                          <label className="mb-1 small">Plant</label>
                          <select
                            className="form-control form-control-sm"
                            style={{ width: "120px" }}
                          >
                            <option>ProduLink</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column">
                          <label htmlFor="series-select" className="mb-1 small">
                            Series
                          </label>
                          <select
                            id="series-select"
                            className="form-control form-control-sm"
                            value={selectedSeries}
                            onChange={handleSeriesChange}
                            style={{ width: "130px" }}
                          >
                            <option value="Select">Select</option>
                            <option value="57F5">57F5</option>
                            <option value="Rework">Rework</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="OPEN">OPEN</option>
                            <option value="Not For Bill">Not For Bill</option>
                            <option value="Tool And Die">Tool And Die</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column">
                          <label className="mb-1 small">&nbsp;</label>
                          <input
                            type="text"
                            placeholder="##"
                            className="form-control form-control-sm"
                            value={seriesInputValue}
                            readOnly
                            style={{ width: "150px" }}
                          />
                        </div>

                        <div className="d-flex flex-column position-relative">
                          <label className="mb-1 small">Vendor</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control form-control-sm"
                            onChange={fetchVenders}
                            value={footerData.vender}
                            autoComplete="off"
                            style={{ width: "180px" }}
                          />
                          {showVenderList && venders && venders.length > 0 && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                width: "100%",
                                maxHeight: "180px",
                                overflowY: "auto",
                                border: "1px solid #ccc",
                                zIndex: 1000,
                              }}
                            >
                              {venders.map((item) => (
                                <li
                                  key={item.id}
                                  className="dropdown-item"
                                  onClick={() => handleSelectVendor(item)}
                                  style={{
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.Name} ({item.Number})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div>
                          <label className="mb-1 small">&nbsp;</label>
                          <button
                            type="button"
                            className="vndrbtn btn-sm btn-outline-primary"
                          >
                            Select
                          </button>
                        </div>

                        <div>
                          <label className="mb-1 small">&nbsp;</label>
                          <button
                            type="button"
                            className="vndrbtn btn-sm btn-outline-secondary"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="text-end">
                          <label className="mb-1 small">&nbsp;</label>
                          <Link
                            type="button"
                            className="vndrbtn btn-sm btn-outline-dark"
                            to="/OutwardChallanList"
                          >
                            OutwardChallanList
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="OutwardChallan-main">
                    <div className="OutwardChallan-tabs">
                      <div
                        className="tab-content"
                        id="productionEntryTabsContent"
                      >
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="align-middle text-center">
                                  <div className="d-flex justify-content-center align-items-center gap-3">
                                    <span>Type</span>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="fg"
                                        name="itemTypeSelection"
                                        value="FG"
                                        checked={selectedItemType === "FG"}
                                        onChange={(e) =>
                                          setSelectedItemType(e.target.value)
                                        }
                                      />
                                      <label htmlFor="fg">FG</label>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="rm"
                                        name="itemTypeSelection"
                                        value="RM"
                                        checked={selectedItemType === "RM"}
                                        onChange={(e) =>
                                          setSelectedItemType(e.target.value)
                                        }
                                      />
                                      <label htmlFor="rm">RM</label>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="itemmaster"
                                        name="itemTypeSelection"
                                        value="ITEMMASTER"
                                        checked={
                                          selectedItemType === "ITEMMASTER"
                                        }
                                        onChange={(e) =>
                                          setSelectedItemType(e.target.value)
                                        }
                                      />
                                      <label htmlFor="itemmaster">
                                        ITEM MASTER
                                      </label>
                                    </div>
                                  </div>
                                </th>
                                <th className="align-middle text-center">
                                  Item Desc.
                                </th>
                                <th className="align-middle text-center">
                                  Store
                                </th>
                                <th className="align-middle text-center">
                                  Quantity
                                </th>
                                <th className="align-middle text-center">
                                  Process/Operation
                                </th>
                                <th className="align-middle text-center">
                                  Package
                                </th>
                                <th className="align-middle text-center">
                                  Value
                                </th>
                                <th className="align-middle text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    name="type"
                                    className="form-control"
                                    placeholder="Enter Item Name | Code"
                                    value={currentItem.type}
                                    onChange={handleItemSearchChange}
                                    autoComplete="off"
                                  />
                                  {showFilterDropDown &&
                                    filteredItemData.length > 0 && (
                                      <ul
                                        className="dropdown-menu show"
                                        style={{
                                          width: "30%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          border: "1px solid #ccc",
                                          zIndex: 1000,
                                          position: "absolute",
                                        }}
                                      >
                                        {filteredItemData.map((item, index) => (
                                          <li
                                            key={
                                              item.id || item.ItemName || index
                                            }
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleSelectItemFromDropdown(item)
                                            }
                                            style={{
                                              padding: "8px",
                                              cursor: "pointer",
                                              borderBottom: "1px solid #f0f0f0",
                                            }}
                                          >
                                            <strong>
                                              {item.ItemDescription ||
                                                item.description}
                                            </strong>
                                            <br />
                                            <small>
                                              Code:{" "}
                                              {item.ItemName || item.item_code}
                                            </small>
                                            <br />
                                            <small>
                                              Rate:{" "}
                                              {item.Rate || item.rate || "N/A"}
                                            </small>
                                            {item.Qty && (
                                              <>
                                                <br />
                                                <small>Qty: {item.Qty}</small>
                                              </>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </td>
                                <td>
                                  <textarea
                                    name="description"
                                    className="form-control"
                                    value={currentItem.description}
                                    onChange={handleItemChange}
                                    readOnly
                                  />
                                </td>

                                <td className="position-relative">
                                  {selectedItemType === "RM" ? (
                                    <div>
                                      <input
                                        type="text"
                                        name="store"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Heat No | Stock"
                                        value={currentItem.store}
                                        onChange={handleItemChange}
                                        onClick={handleStoreFieldClick}
                                        autoComplete="off"
                                      />
                                      <input
                                        type="text"
                                        name="stock"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Stock"
                                        value={currentItem.stock}
                                        readOnly
                                      />
                                      {showHeatNoDropdown &&
                                        heatNoData.length > 0 && (
                                          <ul
                                            className="dropdown-menu show position-absolute"
                                            style={{
                                              maxHeight: "200px",
                                              overflowY: "auto",
                                              zIndex: 1000,
                                            }}
                                          >
                                            {heatNoData.map((item, index) => (
                                              <li
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleSelectHeatNo(item)
                                                }
                                              >
                                                <strong>Heat No:</strong>{" "}
                                                {item.heat_no} |{" "}
                                                <strong>Stock:</strong>{" "}
                                                {item.stock}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                    </div>
                                  ) : selectedItemType === "FG" ? (
                                    // --- NEW FIXED FG BLOCK ---
                                    <div className="position-relative">
                                      <input
                                        type="text"
                                        name="store"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Heat No"
                                        value={currentItem.store}
                                        onChange={handleItemChange}
                                        onClick={() => {
                                          if (heatNoData.length > 0)
                                            setShowHeatNoDropdown(true);
                                        }}
                                        autoComplete="off"
                                      />
                                      <input
                                        type="text"
                                        name="stock"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Stock"
                                        value={currentItem.stock}
                                        readOnly
                                      />

                                      {showHeatNoDropdown &&
                                        heatNoData.length > 0 && (
                                          <ul
                                            className="dropdown-menu show position-absolute"
                                            style={{
                                              maxHeight: "200px",
                                              overflowY: "auto",
                                              zIndex: 1000,
                                              width: "100%",
                                              top: "100%",
                                              border: "1px solid #ccc",
                                              boxShadow:
                                                "0 4px 8px rgba(0,0,0,0.1)",
                                            }}
                                          >
                                            {heatNoData.map((item, index) => (
                                              <li
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleSelectHeatNo(item)
                                                }
                                                style={{
                                                  padding: "8px",
                                                  cursor: "pointer",
                                                  borderBottom:
                                                    "1px solid #f0f0f0",
                                                }}
                                              >
                                                <div className="d-flex justify-content-between">
                                                  <span>
                                                    <strong>Heat:</strong>{" "}
                                                    {item.heat_no}
                                                  </span>
                                                  <span>
                                                    <strong>Qty:</strong>{" "}
                                                    {item.stock}
                                                  </span>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                    </div>
                                  ) : (
                                    <div>
                                      <input
                                        type="text"
                                        name="store"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Store/Code"
                                        value={currentItem.store}
                                        onChange={handleItemChange}
                                      />
                                      <input
                                        type="text"
                                        name="stock"
                                        className="form-control form-control-sm mb-1"
                                        placeholder="Stock"
                                        value={currentItem.stock}
                                        onChange={handleItemChange}
                                      />
                                    </div>
                                  )}

                                  <div>
                                    <label>Supp. Ref. No:</label>
                                    <input
                                      type="text"
                                      name="suppRefNo"
                                      className="form-control"
                                      value={currentItem.suppRefNo}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <div className="mb-2">
                                    <label>No:</label>
                                    <input
                                      type="text"
                                      name="qtyNo"
                                      className="form-control"
                                      value={currentItem.qtyNo}
                                      onChange={handleQtyChange}
                                    />
                                  </div>
                                  <div>
                                    <label>Kg:</label>
                                    <input
                                      type="text"
                                      name="qtyKg"
                                      className="form-control"
                                      value={currentItem.qtyKg}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <textarea
                                    name="process"
                                    className="form-control"
                                    value={currentItem.process}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name="pkg"
                                    className="form-control"
                                    value={currentItem.pkg}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <div className="mb-2">
                                    <label>W. Rate:</label>
                                    <input
                                      type="text"
                                      name="wRate"
                                      className="form-control"
                                      value={currentItem.wRate}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                  <div>
                                    <label>W. Value:</label>
                                    <input
                                      type="text"
                                      name="wValue"
                                      className="form-control"
                                      value={currentItem.wValue}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="vndrbtn"
                                    onClick={handleAddItem}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Heat Code</th>
                                <th>Qty</th>
                                <th>WIP Wt.</th>
                                <th>Total Wt.</th>
                                <th>Process Name</th>
                                <th>Pkg</th>
                                <th>Value</th>
                                <th>Del</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((it, idx) => (
                                <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>{it.type}</td>
                                  <td>
                                    <br />
                                    {it.description}
                                  </td>
                                  <td className="text-start">
                                    Heat-Code : {it.store} <br />
                                    Supp. Ref. NO : {it.suppRefNo}
                                  </td>
                                  <td>{it.qtyNo}</td>
                                  <td>{it.qtyKg}</td>
                                  <td></td>
                                  <td>{it.process}</td>
                                  <td>{it.pkg}</td>
                                  <td>
                                    Rate: {it.wRate}
                                    <br />
                                    Value: {it.wValue}
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        border: "1px solid black",
                                        padding: "2px 6px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleDeleteItem(idx)}
                                    >
                                      X
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              {items.length === 0 && (
                                <tr>
                                  <td>1</td>
                                  <td></td>
                                  <td>
                                    <span>HSN Code :</span>{" "}
                                  </td>
                                  <td className="text-start">
                                    Supp. Ref. NO :
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span
                                      style={{
                                        border: "1px solid black",
                                        padding: "2px 6px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      X
                                    </span>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <td>Challan No:</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={challanNumber}
                                      readOnly
                                    />
                                  </td>
                                  <td>Transport Name:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="Transport_name"
                                        type="text"
                                        className="form-control"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.Transport_name}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowTrasportDataModel(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill No:</td>
                                  <td>
                                    <input
                                      name="EWay_bill_no"
                                      type="text"
                                      className="form-control"
                                      value={footerData.EWay_bill_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>EWay Bill Qty:</td>
                                  <td>
                                    <input
                                      name="Eway_bill_Qty"
                                      type="text"
                                      className="form-control"
                                      value={footerData.Eway_bill_Qty}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Challan Due Date :</td>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="challan_due_date"
                                      value={footerData.challan_due_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>Challan Date:</td>
                                  <td>
                                    <input
                                      name="challan_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.challan_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Vehicle No:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="vehical_no"
                                        type="text"
                                        className="form-control"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.vehical_no}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowVehicleModal(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill Date:</td>
                                  <td>
                                    <input
                                      name="eway_bill_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.eway_bill_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td rowSpan="2">Remarks / Note:</td>
                                  <td rowSpan="2">
                                    <textarea
                                      name="remarks"
                                      className="form-control"
                                      value={footerData.remarks}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td rowSpan="2">Select Work Order:</td>
                                  <td rowSpan="2">
                                    <select className="form-control">
                                      <option> Select Work Order </option>
                                    </select>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Challan Time:</td>
                                  <td>
                                    <input
                                      name="challan_time"
                                      type="time"
                                      className="form-control"
                                      value={footerData.challan_time}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Estimated Value:</td>
                                  <td>
                                    <input
                                      name="Estimated_value"
                                      type="text"
                                      className="form-control"
                                      value={footerData.Estimated_value}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev. Charges:</td>
                                  <td>
                                    <select
                                      name="rev_charges"
                                      className="form-control"
                                      value={
                                        footerData.rev_charges === "Y"
                                          ? "true"
                                          : "false"
                                      }
                                      onChange={handleFooterChange}
                                    >
                                      <option value="false">No</option>
                                      <option value="true">Yes</option>
                                    </select>
                                  </td>
                                </tr>

                                <tr>
                                  <td> D.C No:</td>
                                  <td>
                                    <input
                                      name="DC_no"
                                      type="text"
                                      className="form-control"
                                      value={footerData.DC_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>DC Date:</td>
                                  <td>
                                    <input
                                      name="DC_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.DC_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev.Ch.Amt:</td>
                                  <td>
                                    <input
                                      name="rev_ch_amt"
                                      type="text"
                                      className="form-control"
                                      value={footerData.rev_ch_amt}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Ship To Add Code :</td>
                                  <td>
                                    <select className="form-select">
                                      <option> </option>
                                    </select>
                                  </td>
                                  <td colSpan={2}>
                                    <button
                                      className="vndrbtn btn btn-primary"
                                      onClick={handleSaveChallan}
                                    >
                                      Save Challan
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-5 text-start">
                        <div className="col-md-3">
                          <label htmlFor=" "> Assessable Value : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.assessable_value}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> CGST :</label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.cgst}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> SGST :</label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.sgst}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> IGST : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.igst}
                            onChange={handleFooterChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-2 text-start">
                        <div className="col-md-3">
                          <label htmlFor=" "> Grand Total : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.grand_total}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> LR No. : </label>
                          <input
                            type="text"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.lr_no}
                            onChange={handleFooterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor=" "> LR Date : </label>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-control"
                            name="Vendor"
                            value={footerData.lr_date}
                            onChange={handleFooterChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <Modal
            isOpen={showTrasportDataModel}
            items={transportData}
            onClose={() => setShowTrasportDataModel(false)}
            handleSelect={handleSelectTransportName}
            handleButtonClick={handleTransportSaveButtonClick}
          ></Modal>

          <VehicleModal
            isOpen={showVehicleModal}
            items={vehicleData}
            onClose={() => setShowVehicleModal(false)}
            handleSelect={handleSelectVehicle}
            handleButtonClick={handleVehicleSave}
          ></VehicleModal>
        </div>
      </div>
    </div>
  );
};

export default OutwardChallan;
