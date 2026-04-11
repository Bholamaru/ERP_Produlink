import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./NewInvoice.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewInvoice = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState([]);
  const [customerItems, setCustomerItems] = useState([]);
  const [selectedItemObj, setSelectedItemObj] = useState(null);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [itemSearchLoading, setItemSearchLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [poList, setPoList] = useState([]);
  const [selectedPO, setSelectedPO] = useState("");
  const [poSearchLoading, setPoSearchLoading] = useState(false);

  // --- FIX 1: formData keys renamed to match Django model (case-sensitive) ---
  const [formData, setFormData] = useState({
    invoice_no: "",
    series_type: "",
    invoice_type: "GST",
    invoice_Date: "",        // ✅ was: invoice_date
    invoice_time: "",
    payment_Date: "",        // ✅ was: payment_date
    note: "",
    date_of_removal: "",
    time: "",
    mode_of_trans: "By Road",
    freight: "",
    vehical_no: "",
    transporter: "",
    bill_to: "",
    ship_to: "",
    addr_code: "",
    l_r_gc_note: "",
    place_of_supply: "",
    Eway_bill_Date: "",      // ✅ was: eway_bill_date
    Eway_bill_no: "",        // ✅ was: eway_bill_no
    destenation_code: "",
    note_remark: "",
    pdi_no: "",
    bank: "",
    d_c_no: "",
    d_c_Date: "",            // ✅ was: d_c_date
    delivery_terms: "",
  });

  // Tax Data State
  const [taxData, setTaxData] = useState({
    base_value: "0",
    disc_amt: "0",
    assessable_value: "0",
    cgst: "6",          // ✅ Default 6% for domestic transactions
    sgst: "6",          // ✅ Default 6% for domestic transactions
    igst: "0",          // ✅ 0% by default, use if applicable
    utgst: "0",
    cgst_amt: "0.00",
    sgst_amt: "0.00",
    igst_amt: "0.00",
    utgst_amt: "0.00"
  });

  // 1. Fetch Items for Dropdown (on Mount)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/Sales/newsalesorder/");
        const data = await res.json();

        const flatItems = data.flatMap((order) =>
          (order.item || []).map((itm) => ({
            ...itm,
            customer: order.customer,
            cust_po: order.cust_po,
            plant: order.plant,
            ship_to: order.ship_to,
            item_code: itm.item_code || itm.part_no || itm.Item || itm.part_no,
            item_description:
              itm.item_description || itm.Name_Description || itm.ItemDescription || itm.description || "",
            rate: itm.rate || itm.Rate || itm.Rate_per || itm.price || itm.rate_value || 0,
            desc_percent: itm.desc_percent || itm.desc || itm.discount_percent || itm.default_discount || 0,
            HSN_SAC_Code: itm.HSN_SAC_Code || itm.hsn_code || itm.HSN || itm.hsn || "",
            pkg_trans: itm.pkg_trans || itm.pkg_charges || itm.Pkg_Charges || itm.pkg || "",
            trans_charges: itm.trans_charges || itm.Trans_Charges || itm.transport_charges || "",
            Finish_Weight: itm.Finish_Weight || itm.item_wt || itm.Gross_Weight || itm.weight || 0,
            Unit_Code: itm.Unit_Code || itm.uom || itm.unit || itm.Unit || "pcs",
            plan_date: itm.plan_date || itm.Plan_Date || itm.due_date || itm.Due_Date || null,
            po_qty: itm.po_qty || itm.qty || itm.order_qty || itm.Qty || itm.PO_Qty || 0,
          }))
        );

        setItems(flatItems);
      } catch (err) {
        toast.error("Item load failed");
      }
    };

    fetchItems();
  }, []);

  // Fetch and filter items by customer
  const filterItemsByCustomer = (customerName) => {
    if (!customerName || !items.length) {
      setCustomerItems([]);
      return;
    }
    const filtered = items.filter(item =>
      (item.customer || "").toLowerCase() === customerName.toLowerCase()
    );
    setCustomerItems(filtered);
    console.log(`Found ${filtered.length} items for customer: ${customerName}`);
  };

  // Auto-filter items when customer changes
  useEffect(() => {
    const customerName = formData.bill_to || customerSearchTerm;
    filterItemsByCustomer(customerName);
    setSelectedItemCode("");
  }, [formData.bill_to, customerSearchTerm, items]);

  // Fetch Tax Data from API
  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/Sales/newsalesorder/");
        const data = await res.json();

        if (data.length > 0 && data[0].item && data[0].item.length > 0) {
          const firstItem = data[0].item[0];
          setTaxData(prev => ({
            ...prev,
            assessable_value: firstItem.assessable_value || "0",
            cgst: firstItem.cgst || "0",
            sgst: firstItem.sgst || "0",
            igst: firstItem.igst || "0",
            utgst: firstItem.utgst || "0"
          }));
        }
      } catch (err) {
        console.error("Tax data load failed:", err);
      }
    };

    fetchTaxData();
  }, []);

  // Calculate GST amounts (12% total) based on assessable value
  useEffect(() => {
    const assessableVal = parseFloat(taxData.assessable_value) || 0;
    
    // Calculate 12% GST: Split as CGST 6% + SGST 6% OR IGST 12%
    const cgstPercent = parseFloat(taxData.cgst) || 6;
    const sgstPercent = parseFloat(taxData.sgst) || 6;
    const igstPercent = parseFloat(taxData.igst) || 0;
    const utgstPercent = parseFloat(taxData.utgst) || 0;

    const cgstAmount = (assessableVal * cgstPercent / 100).toFixed(2);
    const sgstAmount = (assessableVal * sgstPercent / 100).toFixed(2);
    const igstAmount = (assessableVal * igstPercent / 100).toFixed(2);
    const utgstAmount = (assessableVal * utgstPercent / 100).toFixed(2);

    setTaxData(prev => ({
      ...prev,
      cgst_amt: cgstAmount,
      sgst_amt: sgstAmount,
      igst_amt: igstAmount,
      utgst_amt: utgstAmount
    }));
  }, [taxData.assessable_value, taxData.cgst, taxData.sgst, taxData.igst, taxData.utgst]);

  // Auto-update assessable value from table items
  useEffect(() => {
    let baseValueSum = 0;
    let discAmtSum = 0;
    tableData.forEach((item) => {
      const qty = parseFloat(item.qty || item.po_qty || 0);
      const rate = parseFloat(item.rate || 0);
      const rowBase = qty * rate;
      baseValueSum += rowBase;

      const discPercent = parseFloat(item.desc || item.desc_percent || item.discount_percent || item.discount_amount || 0);
      discAmtSum += (rowBase * (discPercent / 100));
    });
    
    const calculatedAssessableValue = baseValueSum - discAmtSum;

    setTaxData(prev => ({
      ...prev,
      base_value: baseValueSum.toFixed(4),
      disc_amt: discAmtSum.toFixed(4),
      ...(calculatedAssessableValue > 0 || tableData.length > 0 ? { assessable_value: calculatedAssessableValue.toFixed(4) } : {})
    }));
  }, [tableData]);

  // Fetch Tax Details by HSN Code
  useEffect(() => {
    const fetchTaxDetailsByHSN = async () => {
      if (!selectedItemObj || !selectedItemObj.HSN_SAC_Code) {
        return;
      }

      try {
        const hsnCode = selectedItemObj.HSN_SAC_Code;

        const res = await fetch("http://127.0.0.1:8000/Sales/newsalesorder/");
        const data = await res.json();

        let foundItem = null;
        for (let order of data) {
          if (order.item && Array.isArray(order.item)) {
            foundItem = order.item.find(itm =>
              (itm.hsn_code === hsnCode || itm.HSN === hsnCode || itm.hsn === hsnCode || itm.HSN_SAC_Code === hsnCode)
            );
            if (foundItem) break;
          }
        }

        if (foundItem) {
          setTaxData(prev => ({
            ...prev,
            assessable_value: foundItem.assessable_value || "0",
            cgst: foundItem.cgst || "0",
            sgst: foundItem.sgst || "0",
            igst: foundItem.igst || "0",
            utgst: foundItem.utgst || "0"
          }));
          console.log("Tax details fetched for HSN:", hsnCode, foundItem);
        } else {
          console.log("No matching item found for HSN:", hsnCode);
        }
      } catch (err) {
        console.error("Error fetching tax details by HSN:", err);
      }
    };

    fetchTaxDetailsByHSN();
  }, [selectedItemObj?.HSN_SAC_Code]);

  // 2. Handle Item Selection and Fetch Stock
  const handleItemSelect = async (e) => {
    const itemCode = e.target.value;
    setSelectedItemCode(itemCode);

    const itemObj = customerItems.find(i => i.item_code === itemCode);
    if (!itemObj) return;

    try {
      setItemSearchLoading(true);

      const [stockRes, itemFieldsRes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/Sales/wip/stock/get/?q=${itemCode}`),
        fetch(`http://127.0.0.1:8000/All_Masters/Fetch_Item_fields/?q=${encodeURIComponent(itemCode)}`)
      ]);

      const stockData = await stockRes.json();
      let itemFieldsData = null;

      if (itemFieldsRes.ok) {
        const fieldsList = await itemFieldsRes.json();
        itemFieldsData = Array.isArray(fieldsList) ? fieldsList[0] : fieldsList;
      }

      console.log("Stock API Response:", stockData);
      console.log("Item Fields API Response:", itemFieldsData);

      const poQty = itemObj.po_qty || 0;
      const rate = itemFieldsData?.Rate || itemFieldsData?.rate || itemObj.rate || 0;
      const assessableValue = parseFloat(poQty) * parseFloat(rate);

      setSelectedItemObj({
        ...itemObj,
        last_operation: stockData?.last_operation || {
          part_code: itemFieldsData?.Part_Code || "",
          part_no: itemCode,
          Name_Description: itemFieldsData?.Name_Description || itemObj.item_description,
          OPNo: stockData?.last_operation?.OPNo || "",
          Operation: stockData?.last_operation?.Operation || "",
          prod_qty: stockData?.last_operation?.prod_qty || 0,
          lots: stockData?.last_operation?.lots || [],
        },
        stock: stockData?.last_operation?.prod_qty ?? 0,
        op_no: stockData?.last_operation?.OPNo ?? "",
        operation_name: stockData?.last_operation?.Operation ?? "",
        part_code: itemFieldsData?.Part_Code || stockData?.last_operation?.part_code || "",
        part_no: stockData?.last_operation?.part_no || itemCode,
        Name_Description: itemFieldsData?.Name_Description || itemObj.item_description,
        rate: rate,
        HSN_SAC_Code: itemFieldsData?.HSN_SAC_Code || itemFieldsData?.HSN || itemObj.HSN_SAC_Code || "",
        Finish_Weight: itemFieldsData?.Finish_Weight || itemFieldsData?.FinishWeight || itemObj.Finish_Weight || 0,
        Unit_Code: itemFieldsData?.Unit_Code || itemFieldsData?.unit_code || itemObj.Unit_Code || "pcs",
        pkg_trans: itemFieldsData?.pkg_trans || itemFieldsData?.Pkg_Charges || itemFieldsData?.Pkg_Charges_Amount || itemObj.pkg_trans || itemObj.pkg_charges || "",
        plan_date: itemFieldsData?.plan_date || itemFieldsData?.Plan_Date || itemObj.plan_date || null,
        due_date: itemFieldsData?.due_date || itemFieldsData?.Due_Date || itemObj.due_date || null,
        trans_charges: itemFieldsData?.trans_charges || itemFieldsData?.Trans_Charges || itemObj.trans_charges || "",
        qty: poQty,
        po_qty: poQty,
        assessable_value: assessableValue.toFixed(2),
      });

      toast.info(`Selected: ${itemCode}`);
    } catch (error) {
      console.error("Item fetch error:", error);

      const poQty = itemObj.po_qty || 0;
      const itemRate = itemObj.rate || 0;
      const assessableValue = parseFloat(poQty) * parseFloat(itemRate);

      setSelectedItemObj({
        ...itemObj,
        stock: 0,
        rate: itemRate,
        HSN_SAC_Code: itemObj.HSN_SAC_Code || "",
        Finish_Weight: itemObj.Finish_Weight || 0,
        Unit_Code: itemObj.Unit_Code || "pcs",
        qty: poQty,
        po_qty: poQty,
        assessable_value: assessableValue.toFixed(2),
        last_operation: {
          part_code: itemObj.Part_Code || "",
          part_no: itemCode,
          Name_Description: itemObj.item_description,
          OPNo: "",
          Operation: "",
          prod_qty: 0,
          lots: [],
        },
      });

      toast.warning("Some item details not available, using defaults");
    } finally {
      setItemSearchLoading(false);
    }

    console.log("Selected Item:", itemObj);
  };

  // 3. Add to Table
  const handleAddItem = () => {
    if (!selectedItemObj) {
      toast.error("Please select an item first");
      return;
    }
    console.log("Adding item to table:", selectedItemObj);
    setTableData((prev) => [...prev, selectedItemObj]);
    setSelectedItemCode("");
    setSelectedItemObj(null);
    toast.success("Item added to table!");
  };

  // --- 1. Fetch Invoice Number on Series Selection ---
  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
    setFormData((prev) => ({ ...prev, series_type: selectedSeries }));

    if (selectedSeries === "GST Invoice") {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/Sales/create/invoice_no"
        );
        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            invoice_no: data.Invoice_no,
          }));
          toast.success(`Invoice No: ${data.Invoice_no} generated`);
        } else {
          toast.error("Failed to generate invoice number");
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error("Error generating invoice number");
      }
    } else {
      setFormData((prev) => ({ ...prev, invoice_no: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    const fieldName = name || id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // --- FIX 4: cleanPayload with updated valid item fields ---
  const cleanPayload = (data) => {
    const validItemFields = [
      "plant", "series", "invoice_type", "invoice_no",
      "customer", "po_no", "date", "stock", "description",
      "rate", "dis", "po_qty", "bal_qty", "inv_qty",
      "pkg_qty", "type_of_packing", "hsn_code", "invoice"
    ];

    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined && value !== "") {
        if (key === "items" && Array.isArray(value)) {
          cleaned[key] = value.map((item) => {
            const cleanedItem = {};
            for (const [itemKey, itemValue] of Object.entries(item)) {
              if (validItemFields.includes(itemKey) &&
                itemValue !== null &&
                itemValue !== undefined &&
                itemValue !== "") {
                cleanedItem[itemKey] = itemValue;
              }
            }
            return cleanedItem;
          });
        } else if (key === "GSTdetails" && Array.isArray(value)) {
          // Clean GSTdetails array
          cleaned[key] = value.map((tax) => {
            const cleanedTax = {};
            for (const [taxKey, taxValue] of Object.entries(tax)) {
              if (taxValue !== null && taxValue !== undefined && taxValue !== "" && taxValue !== "0") {
                cleanedTax[taxKey] = taxValue;
              }
            }
            return cleanedTax;
          });
        } else {
          cleaned[key] = value;
        }
      }
    }
    return cleaned;
  };

  // --- 2. Save Invoice (POST) ---
  const handleGenerateInvoice = async () => {
    if (!formData.series_type || !formData.invoice_no) {
      toast.error("Please select series and generate invoice number first");
      return;
    }

    if (tableData.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return;
    }

    try {
      // --- FIX 2: Map frontend fields to backend fields ---
      const mappedItems = tableData.map((row) => ({
        plant: row.plant || "ProduLink",
        series: formData.series_type || "",           // ✅ from formData
        invoice_type: formData.invoice_type || "GST",
        invoice_no: formData.invoice_no || "",         // ✅ from formData
        customer: row.customer || formData.bill_to || "",
        po_no: row.cust_po || selectedPO || "",        // ✅ was missing
        date: row.plan_date || row.due_date || null,
        stock: String(row.stock ?? 0),
        description: row.item_description || row.Name_Description || "", // ✅ was null
        rate: String(row.rate || 0),
        dis: row.desc_percent || row.discount_percent || 0,
        po_qty: String(row.po_qty || row.qty || 0),
        assessable_value: String(row.assessable_value || 0),  // ✅ po_qty * rate
        bal_qty: null,
        inv_qty: null,
        pkg_qty: null,
        type_of_packing: "",
        hsn_code: row.HSN_SAC_Code || row.hsn_code || "", // ✅ was null
      }));

      // Calculate total assessable value from all items (po_qty * rate)
      const totalAssessableValue = tableData.reduce((sum, item) => {
        const value = parseFloat(item.assessable_value || 0);
        return sum + value;
      }, 0);

      // --- FIX 3: Use GSTdetails key (match Django related_name) ---
      let invoicePayload = {
        ...formData,
        items: mappedItems,           // ✅ use mapped items
        GSTdetails: [{                // ✅ was: taxes — renamed to match related_name
          assessble_value: totalAssessableValue.toFixed(2),  // ✅ auto-calculated from items (po_qty * rate)
          cgst: taxData.cgst || 0,
          sgst: taxData.sgst || 0,
          igst: taxData.igst || 0,
          utgst: taxData.utgst || 0,
          cgst_amt: taxData.cgst_amt || "0.00",         // ✅ GST amount
          sgst_amt: taxData.sgst_amt || "0.00",         // ✅ GST amount
          igst_amt: taxData.igst_amt || "0.00",         // ✅ GST amount
          utgst_amt: taxData.utgst_amt || "0.00",       // ✅ GST amount
        }],
      };

      // Clean the payload to remove null/empty values
      invoicePayload = cleanPayload(invoicePayload);

      console.log("🔍 CLEANED PAYLOAD BEFORE SEND:");
      console.log(JSON.stringify(invoicePayload, null, 2));

      const response = await fetch("http://127.0.0.1:8000/Sales/invoice/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoicePayload),
      });

      if (response.ok) {
        toast.success("Invoice Generated Successfully!");
        setFormData({
          ...formData,
          invoice_no: "",
          series_type: "",
        });
        setTableData([]);
        setTaxData({
          base_value: "0",
          disc_amt: "0",
          assessable_value: "0",
          cgst: "6",
          sgst: "6",
          igst: "0",
          utgst: "0",
          cgst_amt: "0.00",
          sgst_amt: "0.00",
          igst_amt: "0.00",
          utgst_amt: "0.00"
        });

        const seriesSelect = document.getElementById("seriesSelect");
        if (seriesSelect) seriesSelect.value = "Select";

        setTimeout(() => {
          navigate("/InvoiceList");
        }, 1500);
      } else {
        toast.error("Failed to generate invoice");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error generating invoice: " + error.message);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    navigate("/NewinvoiceGST");
  };

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
    const fetchCustomers = async () => {
      try {
        if (!customerSearchTerm) {
          setCustomers([]);
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/Sales/items/customers-list/?q=${customerSearchTerm}`
        );

        if (response.ok) {
          const result = await response.json();
          setCustomers(result.data || []);
        }
      } catch (error) {
        console.error("Customer fetch error:", error);
      }
    };

    const delayDebounce = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(delayDebounce);
  }, [customerSearchTerm]);

  // Fetch PO data from API
  const fetchPOList = async (customerName) => {
    if (!customerName) {
      setPoList([]);
      return;
    }

    try {
      setPoSearchLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/Sales/customer/po/?customer=${encodeURIComponent(customerName)}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("PO List:", data);
        const poArray = Array.isArray(data) ? data : data.data || data.po || [];
        setPoList(poArray);
        if (poArray.length > 0) {
          toast.success(`Found ${poArray.length} PO(s)`);
        }
      } else {
        setPoList([]);
      }
    } catch (error) {
      console.error("PO fetch error:", error);
      setPoList([]);
    } finally {
      setPoSearchLoading(false);
    }
  };

  // Auto-fetch POs when customer is selected
  useEffect(() => {
    const customerName = formData.bill_to || customerSearchTerm;
    if (customerName && customerName.trim()) {
      fetchPOList(customerName);
    }
  }, [formData.bill_to, customerSearchTerm]);

  // Handle Select PO button click
  const handleSelectPO = async () => {
    const customerName = formData.bill_to || customerSearchTerm;

    if (!customerName) {
      toast.error("Please select a customer first");
      return;
    }

    fetchPOList(customerName);
  };

  // Handle Clear button for PO
  const handleClearPO = () => {
    setSelectedPO("");
    setPoList([]);
    toast.info("PO selection cleared");
  };

  return (
    <div className="NewInvoice">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <div className="NewInvoice">
                  <div className="NewInvoice-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">New Invoice</h5>
                      </div>

                      <div className="col-md-1">Plant</div>
                      <div className="col-md-1">
                        <select>
                          <option>ProduLink</option>
                        </select>
                      </div>

                      <div className="col-md-1">Series</div>
                      <div className="col-md-1">
                        <select
                          className="form-control"
                          onChange={handleSeriesChange}
                        >
                          <option value="">Select</option>
                          <option value="GST Invoice">GST Invoice</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <input
                          type="text"
                          placeholder="InvoiceNo:"
                          className="w-100"
                          value={formData.invoice_no || ""}
                          readOnly
                        />
                      </div>

                      <div className="col-md-1">InvoiceType:</div>
                      <div className="col-md-1">
                        <select
                          name="invoice_type"
                          value={formData.invoice_type}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="GST">GST</option>
                          <option value="SCRAP">SCRAP</option>
                          <option value="Stock Transfer">Stock Transfer</option>
                          <option value="Direct Export">Direct Export</option>
                          <option value="Third Party EXP (In State)">Third Party EXP (In State)</option>
                          <option value="Third Party Export (Out State)">Third Party Export (Out State)</option>
                          <option value="Asset">Asset</option>
                          <option value="Tool">Tool</option>
                        </select>
                      </div>

                      <div className="col-md-3 text-end">
                        <button
                          type="button"
                          className="btn me-2"
                          onClick={() => navigate("/InvoiceList")}
                        >
                          Invoice List
                        </button>
                        <button
                          type="button"
                          className="btn"
                          onClick={handleButtonClick}
                        >
                          Invoice V2
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="NewInvoice-Main mt2">
                    <div className="NewInvoice-tabs">
                      <ul
                        className="nav nav-tabs"
                        id="AssembleEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="itemdetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#itemdetails"
                            type="button"
                            role="tab"
                          >
                            A. Item Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="taxes-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#taxes"
                            type="button"
                            role="tab"
                          >
                            B. Taxes
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content mt-2"
                        id="productionEntryTabsContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="itemdetails"
                          role="tabpanel"
                        >
                          <div className="row text-start">
                            <div className="col-2">
                              <label htmlFor="customer-select">
                                Select Cust:
                              </label>
                            </div>
                            <div className="col-3">
                              <select
                                id="customer-select"
                                className="form-select"
                                value={formData.bill_to}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    bill_to: e.target.value,
                                  }));
                                  setCustomerSearchTerm(e.target.value);
                                }}
                              >
                                <option value="">Select Customer</option>
                                {items
                                  .map((item) => item.customer)
                                  .filter((value, index, self) => value && self.indexOf(value) === index)
                                  .sort()
                                  .map((customer) => (
                                    <option key={customer} value={customer}>
                                      {customer}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-2">
                              <button
                                className="btn w-50"
                                onClick={() => {
                                  alert("Customer Selected: " + formData.bill_to);
                                }}
                              >
                                Search
                              </button>
                            </div>
                          </div>

                          <div className="row mt-2 text-start">
                            <div className="col-2">
                              <label htmlFor="prod-no">Select PO:</label>
                            </div>
                            <div className="col-3">
                              <select
                                name="po"
                                id="po-select"
                                className="form-control"
                                value={selectedPO}
                                onChange={(e) => setSelectedPO(e.target.value)}
                              >
                                <option value="">Select an Option</option>
                                {poList.map((po, index) => (
                                  <option
                                    key={index}
                                    value={po.cust_po || po.po_no || po.id || po}
                                  >
                                    {po.cust_po || po.po_no || po.id} - {po.cust_date || po.po_date || ""} - SO: {po.so_no || po.sales_order_no || po.order_no || ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-1 mt-2">
                              <button
                                type="button"
                                className="btn"
                                onClick={handleClearPO}
                              >
                                Clear
                              </button>
                            </div>
                            <div className="col-2 mt-2">
                              <button
                                type="button"
                                className="btn w-50"
                                onClick={handleSelectPO}
                                disabled={poSearchLoading}
                              >
                                {poSearchLoading ? "Loading..." : "View SO"}
                              </button>
                            </div>
                          </div>

                          {/* SEARCH SECTION */}
                          <div className="row text-start mb-3">
                            <div className="col-2">
                              <label htmlFor="prod-no">Select Item :</label>
                            </div>
                            <div className="col-3">
                              <select
                                name="item"
                                id="item-select"
                                className="form-control"
                                value={selectedItemCode}
                                onChange={handleItemSelect}
                                disabled={itemSearchLoading || customerItems.length === 0}
                              >
                                <option value="">
                                  {customerItems.length === 0 ? 'Select customer first' : 'Select Item'}
                                </option>
                                {customerItems.map((item, index) => (
                                  <option
                                    key={index}
                                    value={item.item_code}
                                  >
                                    {item.item_code} - {item.item_description}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-2">
                              <button
                                type="button"
                                className="btn btn-primary w-50"
                                onClick={handleAddItem}
                                disabled={itemSearchLoading || !selectedItemObj}
                              >
                                {itemSearchLoading ? "Loading..." : "Add"}
                              </button>
                            </div>
                          </div>

                          <div className="table-responsive mt-2">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Sr.</th>
                                  <th>Item Code | Description</th>
                                  <th>PO No | Date</th>
                                  <th>Stock</th>
                                  <th>Description</th>
                                  <th>Rate</th>
                                  <th>PO Qty</th>
                                  <th>Bal.Qty</th>
                                  <th>Inv.Qty</th>
                                  <th>Pkg Qty</th>
                                  <th>Type Of Packing</th>
                                  <th>Del</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tableData.length > 0 ? (
                                  tableData.map((row, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <strong>Code:</strong> {row.item_code} <br />
                                        <strong>Desc:</strong> {row.item_description}
                                      </td>
                                      <td>
                                        {row.part_no} <br /> Pr No. :{" "}
                                        {row.Part_Code}
                                      </td>
                                      <td>
                                        <small>
                                          <div><strong>Part No:</strong> {row.last_operation?.part_no}</div>
                                          <div><strong>Part Code:</strong> {row.last_operation?.part_code}</div>
                                          <div><strong>Name:</strong> {row.last_operation?.Name_Description}</div>
                                          <div><strong>OP No:</strong> {row.last_operation?.OPNo}</div>
                                          <div style={{ fontSize: "11px", color: "gray" }}><strong>Operation:</strong> {row.last_operation?.Operation}</div>
                                          <div><strong>Prod Qty:</strong> <span style={{ backgroundColor: "#ffeb3b", padding: "2px 5px", borderRadius: "3px" }}>{row.last_operation?.prod_qty ?? 0}</span></div>
                                          {row.last_operation?.lots && row.last_operation.lots.length > 0 && (
                                            <div><strong>Lots:</strong> {row.last_operation.lots.join(", ")}</div>
                                          )}
                                        </small>
                                      </td>
                                      <td>
                                        <textarea
                                          defaultValue={row.Name_Description}
                                          className="form-control-sm w-100"
                                        ></textarea>
                                        <br />{" "}
                                        <span>
                                          HSN Code : {row.HSN_SAC_Code}
                                        </span>
                                        <br />
                                        <span>
                                          Plan/Due: {row.due_date ? new Date(row.due_date).toLocaleDateString() : (row.plan_date ? new Date(row.plan_date).toLocaleDateString() : "-")}
                                        </span>
                                      </td>
                                      <td className="text-start">
                                        Rate : {row.rate}
                                        <br />
                                        Disc: {row.desc || row.desc_percent || row.discount_percent || row.discount_amount || "-"}% <br />
                                        Pkg Charges: {row.pkg_trans || "-"} <br />
                                        Trans Charges: {row.trans_charges || "-"} <br />
                                        <span style={{ color: "blue" }}>
                                          Rate Type:
                                        </span>
                                        <br /> Amort Rate :
                                      </td>
                                      <td>{row.po_qty || row.qty || 0}</td>
                                      <td>{/* Bal Qty */}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="w-100"
                                          placeholder="Qty"
                                          defaultValue={row.qty || row.po_qty || 0}
                                          onChange={(e) => {
                                            const newQty = e.target.value;
                                            const updatedData = tableData.map((item, i) => {
                                              if (i === index) {
                                                const rate = parseFloat(item.rate || 0);
                                                const itemTotal = parseFloat(newQty || 0) * rate;
                                                return { 
                                                  ...item, 
                                                  qty: newQty, 
                                                  assessable_value: itemTotal.toFixed(2) 
                                                };
                                              }
                                              return item;
                                            });
                                            setTableData(updatedData);
                                          }}
                                        />
                                        <br />
                                        Per Pcs Wt: <br />
                                        <input
                                          type="text"
                                          className="w-100"
                                          placeholder="Weight"
                                          defaultValue={row.Finish_Weight}
                                        />
                                        <br />
                                        <span style={{ color: "blue" }}>
                                          Per Unit: {row.Unit_Code}
                                        </span>
                                      </td>
                                      <td>
                                        <input type="text" className="w-100" />
                                      </td>
                                      <td>
                                        <textarea className="w-100"></textarea>
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() =>
                                            setTableData(
                                              tableData.filter(
                                                (_, i) => i !== index
                                              )
                                            )
                                          }
                                        >
                                          X
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="11" className="text-center">
                                      No items added
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="taxes"
                          role="tabpanel"
                        >
                          <div className="row text-start">
                            {/* Column 1 */}
                            <div className="col-md-4">
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Invoice No:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    name="series_display"
                                    value={formData.series_type || ""}
                                    className="form-control"
                                    readOnly
                                    placeholder="Series"
                                  />
                                  <input
                                    name="invoice_no"
                                    value={formData.invoice_no || ""}
                                    className="form-control"
                                    placeholder="No."
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Payment Date:</label>
                                </div>
                                <div className="col-8">
                                  {/* FIX 1: name updated to payment_Date */}
                                  <input
                                    type="date"
                                    name="payment_Date"
                                    value={formData.payment_Date}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Mode of Trans:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    type="text"
                                    name="mode_of_trans"
                                    value={formData.mode_of_trans}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <select
                                    name="freight"
                                    value={formData.freight}
                                    onChange={handleChange}
                                    className="form-control"
                                  >
                                    <option value="">Freight</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Bill TO:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    name="bill_to"
                                    value={formData.bill_to}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Ship TO:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    name="ship_to"
                                    value={formData.ship_to}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Eway Bill Date:</label>
                                </div>
                                <div className="col-8">
                                  {/* FIX 1: name updated to Eway_bill_Date */}
                                  <input
                                    type="date"
                                    name="Eway_bill_Date"
                                    value={formData.Eway_bill_Date}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Note/Remark:</label>
                                </div>
                                <div className="col-8">
                                  <textarea
                                    name="note_remark"
                                    value={formData.note_remark}
                                    onChange={handleChange}
                                    className="form-control"
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            {/* Column 2 */}
                            <div className="col-md-4">
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Invoice Date:</label>
                                </div>
                                <div className="col-8">
                                  {/* FIX 1: name updated to invoice_Date */}
                                  <input
                                    type="date"
                                    name="invoice_Date"
                                    value={formData.invoice_Date}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Removal Date:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    type="date"
                                    name="date_of_removal"
                                    value={formData.date_of_removal}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Vehicle No:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    name="vehical_no"
                                    value={formData.vehical_no}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Addr Code:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <select
                                    name="addr_code"
                                    value={formData.addr_code}
                                    onChange={handleChange}
                                    className="form-control"
                                  >
                                    <option value=""></option>
                                  </select>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    <FaRegCircleQuestion />
                                  </button>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Eway Bill No:</label>
                                </div>
                                <div className="col-8">
                                  {/* FIX 1: name updated to Eway_bill_no */}
                                  <input
                                    name="Eway_bill_no"
                                    value={formData.Eway_bill_no}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Delivery Terms:</label>
                                </div>
                                <div className="col-8">
                                  <textarea
                                    name="delivery_terms"
                                    value={formData.delivery_terms}
                                    onChange={handleChange}
                                    className="form-control"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>D.C. Date:</label>
                                </div>
                                <div className="col-8">
                                  {/* FIX 1: name updated to d_c_Date */}
                                  <input
                                    type="date"
                                    name="d_c_Date"
                                    value={formData.d_c_Date}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Column 3 */}
                            <div className="col-md-4">
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Invoice Time:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    type="time"
                                    name="invoice_time"
                                    value={formData.invoice_time}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Time:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Transporter:</label>
                                </div>
                                <div className="col-8 d-flex gap-1">
                                  <input
                                    name="transporter"
                                    value={formData.transporter}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>L/R GC Note:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    name="l_r_gc_note"
                                    value={formData.l_r_gc_note}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Place Supply:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    name="place_of_supply"
                                    value={formData.place_of_supply}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>Dest. Code:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    name="destenation_code"
                                    value={formData.destenation_code}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label>D.C. NO:</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    name="d_c_no"
                                    value={formData.d_c_no}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="table-container border p-2">
                            {/* Row 1 */}
                            <div className="row align-items-center mb-2">
                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Base Value</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                  value={taxData.base_value || "0"}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Assessable Value</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                  value={taxData.assessable_value}
                                  onChange={(e) => setTaxData({ ...taxData, assessable_value: e.target.value })}
                                />
                              </div>

                              <div className="col-md-3">
                                <div className="d-flex align-items-center gap-1">
                                  <label className="me-auto">Pack & Fwrd</label>
                                  <input
                                    className="form-control form-control-sm w-25"
                                    placeholder="%"
                                  />
                                  <input
                                    className="form-control form-control-sm w-50"
                                    placeholder="0"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <strong>Total Amortisation : 0</strong>
                              </div>
                            </div>

                            {/* Row 2 */}
                            <div className="row align-items-center mb-2">
                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Disc Amt</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                  value={taxData.disc_amt || "0"}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>CGST {taxData.cgst || 0}%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0.00"
                                  value={taxData.cgst_amt}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3">
                                <div className="d-flex align-items-center gap-1">
                                  <label className="me-auto">
                                    Transport Crg
                                  </label>
                                  <input
                                    className="form-control form-control-sm w-25"
                                    placeholder="%"
                                  />
                                  <input
                                    className="form-control form-control-sm w-50"
                                    placeholder="0"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>CGST Amt: ₹{taxData.cgst_amt || "0.00"}</label>
                              </div>
                            </div>

                            {/* Row 3 */}
                            <div className="row align-items-center mb-2">
                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Rev. Base Crg</label>
                                <select className="form-select form-select-sm w-50">
                                  <option>NO</option>
                                  <option>YES</option>
                                </select>
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>SGST {taxData.sgst || 0}%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0.00"
                                  value={taxData.sgst_amt}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3">
                                <div className="d-flex align-items-center gap-1">
                                  <label className="me-auto">Freight Crg</label>
                                  <input
                                    className="form-control form-control-sm w-25"
                                    placeholder="%"
                                  />
                                  <input
                                    className="form-control form-control-sm w-50"
                                    placeholder="0"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>SGST Amt: ₹{taxData.sgst_amt || "0.00"}</label>
                              </div>
                            </div>

                            {/* Row 4 */}
                            <div className="row align-items-center mb-2">
                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Rev Crg Amt</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>IGST {taxData.igst || 0}%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0.00"
                                  value={taxData.igst_amt}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3">
                                <div className="d-flex align-items-center gap-1">
                                  <label className="me-auto">Other Crg</label>
                                  <input
                                    className="form-control form-control-sm w-25"
                                    placeholder="%"
                                  />
                                  <input
                                    className="form-control form-control-sm w-50"
                                    placeholder="0"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>IGST Amt: ₹{taxData.igst_amt || "0.00"}</label>
                              </div>
                            </div>

                            {/* Row 5 */}
                            <div className="row align-items-center">
                              <div className="col-md-3 d-flex justify-content-between">
                                <label>TCS</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>UTGST {taxData.utgst || 0}%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0.00"
                                  value={taxData.utgst_amt}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Grand Total</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
                                />
                              </div>

                              <div className="col-md-3">
                                <label>UTGST Amt: ₹{taxData.utgst_amt || "0.00"}</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-md-2">
                            <button
                              className="btn btn-primary w-100"
                              onClick={handleGenerateInvoice}
                            >
                              Generate Invoice
                            </button>
                          </div>
                          <div className="col-md-3 d-flex align-items-center">
                            <input
                              type="checkbox"
                              id="printRate"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="printRate" className="ms-2">
                              PrintRate
                            </label>
                          </div>
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
    </div>
  );
};

export default NewInvoice;