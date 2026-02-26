import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
<<<<<<< HEAD
=======
// import Cached from "@mui/icons-material/Cached.js";
>>>>>>> archita
import { useNavigate } from "react-router-dom";
import "./NewInvoice.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewInvoice = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
<<<<<<< HEAD
  const [items, setItems] = useState([]);
  const [customerItems, setCustomerItems] = useState([]);
  const [selectedItemObj, setSelectedItemObj] = useState(null);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
=======
  const [items, setItems] = useState([]); // All items list
  const [customerItems, setCustomerItems] = useState([]); // Items filtered by customer
  const [selectedItemObj, setSelectedItemObj] = useState(null); // Full object store
  const [selectedItemCode, setSelectedItemCode] = useState(""); // Selected item code
  const [tableData, setTableData] = useState([]); // Table rows
>>>>>>> archita
  const [itemSearchLoading, setItemSearchLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [poList, setPoList] = useState([]);
  const [selectedPO, setSelectedPO] = useState("");
  const [poSearchLoading, setPoSearchLoading] = useState(false);

<<<<<<< HEAD
  // --- FIX 1: formData keys renamed to match Django model (case-sensitive) ---
  const [formData, setFormData] = useState({
    invoice_no: "",
    series_type: "",
    invoice_Date: "",        // ✅ was: invoice_date
    invoice_time: "",
    payment_Date: "",        // ✅ was: payment_date
=======
  // --- NEW: Form State ---
  const [formData, setFormData] = useState({
    invoice_no: "",
    series_type: "",
    invoice_date: "",
    invoice_time: "",
    payment_date: "",
>>>>>>> archita
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
<<<<<<< HEAD
    Eway_bill_Date: "",      // ✅ was: eway_bill_date
    Eway_bill_no: "",        // ✅ was: eway_bill_no
=======
    eway_bill_date: "",
    eway_bill_no: "",
>>>>>>> archita
    destenation_code: "",
    note_remark: "",
    pdi_no: "",
    bank: "",
    d_c_no: "",
<<<<<<< HEAD
    d_c_Date: "",            // ✅ was: d_c_date
    delivery_terms: "",
  });

  // Tax Data State
  const [taxData, setTaxData] = useState({
    assessable_value: "0",
    cgst: "0",
    sgst: "0",
    igst: "0",
    utgst: "0"
  });

=======
    d_c_date: "",
    delivery_terms: "",
  });

>>>>>>> archita
  // 1. Fetch Items for Dropdown (on Mount)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/Sales/newsalesorder/");
        const data = await res.json();

<<<<<<< HEAD
        const flatItems = data.flatMap((order) =>
          (order.item || []).map((itm) => ({
=======
        // 🔥 FLATTEN sales order -> items
        const flatItems = data.flatMap(order =>
          order.item.map(itm => ({
>>>>>>> archita
            ...itm,
            customer: order.customer,
            cust_po: order.cust_po,
            plant: order.plant,
            ship_to: order.ship_to,
<<<<<<< HEAD
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
=======
>>>>>>> archita
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
<<<<<<< HEAD
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
          setTaxData({
            assessable_value: firstItem.assessable_value || "0",
            cgst: firstItem.cgst || "0",
            sgst: firstItem.sgst || "0",
            igst: firstItem.igst || "0",
            utgst: firstItem.utgst || "0"
          });
        }
      } catch (err) {
        console.error("Tax data load failed:", err);
      }
    };

    fetchTaxData();
  }, []);

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
          setTaxData({
            assessable_value: foundItem.assessable_value || "0",
            cgst: foundItem.cgst || "0",
            sgst: foundItem.sgst || "0",
            igst: foundItem.igst || "0",
            utgst: foundItem.utgst || "0"
          });
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
=======
    setSelectedItemCode(""); // Reset item selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.bill_to, customerSearchTerm, items]);

>>>>>>> archita

  // 2. Handle Item Selection and Fetch Stock
  const handleItemSelect = async (e) => {
    const itemCode = e.target.value;
    setSelectedItemCode(itemCode);

<<<<<<< HEAD
=======
    // Find item from filtered customer items
>>>>>>> archita
    const itemObj = customerItems.find(i => i.item_code === itemCode);
    if (!itemObj) return;

    try {
      setItemSearchLoading(true);
<<<<<<< HEAD

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
        rate: itemFieldsData?.Rate || itemFieldsData?.rate || itemObj.rate || 0,
        HSN_SAC_Code: itemFieldsData?.HSN_SAC_Code || itemFieldsData?.HSN || itemObj.HSN_SAC_Code || "",
        Finish_Weight: itemFieldsData?.Finish_Weight || itemFieldsData?.FinishWeight || itemObj.Finish_Weight || 0,
        Unit_Code: itemFieldsData?.Unit_Code || itemFieldsData?.unit_code || itemObj.Unit_Code || "pcs",
        pkg_trans: itemFieldsData?.pkg_trans || itemFieldsData?.Pkg_Charges || itemFieldsData?.Pkg_Charges_Amount || itemObj.pkg_trans || itemObj.pkg_charges || "",
        plan_date: itemFieldsData?.plan_date || itemFieldsData?.Plan_Date || itemObj.plan_date || null,
        due_date: itemFieldsData?.due_date || itemFieldsData?.Due_Date || itemObj.due_date || null,
        trans_charges: itemFieldsData?.trans_charges || itemFieldsData?.Trans_Charges || itemObj.trans_charges || "",
        qty: itemObj.po_qty || 0,
        po_qty: itemObj.po_qty || 0,
=======
      // 🔥 stock API same rahegi
      const res = await fetch(
        `http://127.0.0.1:8000/Sales/wip/stock/get/?q=${itemCode}`
      );
      const data = await res.json();

      setSelectedItemObj({
        ...itemObj,

        // stock related (optional – table me chahe to use karo)
        stock: data?.last_operation?.prod_qty ?? 0,
        op_no: data?.last_operation?.OPNo ?? "",
        operation_name: data?.last_operation?.Operation ?? "",

        // safety mapping (agar backend se aaye)
        part_code: data?.last_operation?.part_code ?? "",
        part_no: data?.last_operation?.part_no ?? itemCode,
        Name_Description:
          data?.last_operation?.Name_Description ??
          itemObj.item_description,
>>>>>>> archita
      });

      toast.info(`Selected: ${itemCode}`);
    } catch (error) {
<<<<<<< HEAD
      console.error("Item fetch error:", error);

      setSelectedItemObj({
        ...itemObj,
        stock: 0,
        rate: itemObj.rate || 0,
        HSN_SAC_Code: itemObj.HSN_SAC_Code || "",
        Finish_Weight: itemObj.Finish_Weight || 0,
        Unit_Code: itemObj.Unit_Code || "pcs",
        qty: itemObj.po_qty || 0,
        po_qty: itemObj.po_qty || 0,
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
=======
      console.error("Stock fetch error:", error);

      // 🔁 fallback (agar stock API fail ho)
      setSelectedItemObj({
        ...itemObj,
        stock: 0,
      });

      toast.warning("Stock data not available");
>>>>>>> archita
    } finally {
      setItemSearchLoading(false);
    }

<<<<<<< HEAD
    console.log("Selected Item:", itemObj);
  };

=======

    console.log("Selected Item:", itemObj);

  };



>>>>>>> archita
  // 3. Add to Table
  const handleAddItem = () => {
    if (!selectedItemObj) {
      toast.error("Please select an item first");
      return;
    }
<<<<<<< HEAD
    console.log("Adding item to table:", selectedItemObj);
=======
>>>>>>> archita
    setTableData((prev) => [...prev, selectedItemObj]);
    setSelectedItemCode("");
    setSelectedItemObj(null);
    toast.success("Item added to table!");
  };

<<<<<<< HEAD
=======

>>>>>>> archita
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

<<<<<<< HEAD
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

=======
>>>>>>> archita
  // --- 2. Save Invoice (POST) ---
  const handleGenerateInvoice = async () => {
    if (!formData.series_type || !formData.invoice_no) {
      toast.error("Please select series and generate invoice number first");
      return;
    }

<<<<<<< HEAD
    if (tableData.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return;
    }

    try {
      // --- FIX 2: Map frontend fields to backend fields ---
      const mappedItems = tableData.map((row) => ({
        plant: row.plant || "ProduLink",
        series: formData.series_type || "",           // ✅ from formData
        invoice_type: "",
        invoice_no: formData.invoice_no || "",         // ✅ from formData
        customer: row.customer || formData.bill_to || "",
        po_no: row.cust_po || selectedPO || "",        // ✅ was missing
        date: row.plan_date || row.due_date || null,
        stock: String(row.stock ?? 0),
        description: row.item_description || row.Name_Description || "", // ✅ was null
        rate: String(row.rate || 0),
        dis: row.desc_percent || row.discount_percent || 0,
        po_qty: String(row.po_qty || row.qty || 0),
        bal_qty: null,
        inv_qty: null,
        pkg_qty: null,
        type_of_packing: "",
        hsn_code: row.HSN_SAC_Code || row.hsn_code || "", // ✅ was null
      }));

      // --- FIX 3: Use GSTdetails key (match Django related_name) ---
      let invoicePayload = {
        ...formData,
        items: mappedItems,           // ✅ use mapped items
        GSTdetails: [{                // ✅ was: taxes — renamed to match related_name
          assessble_value: taxData.assessable_value || 0,  // note: "assessble" matches model typo
          cgst: taxData.cgst || 0,
          sgst: taxData.sgst || 0,
          igst: taxData.igst || 0,
          utgst: taxData.utgst || 0,
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
=======
    try {
      const response = await fetch("http://127.0.0.1:8000/Sales/invoice/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
>>>>>>> archita
      });

      if (response.ok) {
        toast.success("Invoice Generated Successfully!");
        setFormData({
          ...formData,
          invoice_no: "",
          series_type: "",
        });
<<<<<<< HEAD
        setTableData([]);
        setTaxData({
          assessable_value: "0",
          cgst: "0",
          sgst: "0",
          igst: "0",
          utgst: "0"
        });
=======
>>>>>>> archita

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
<<<<<<< HEAD

=======
>>>>>>> archita
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
<<<<<<< HEAD
=======
        // Handle both array and object responses
>>>>>>> archita
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

<<<<<<< HEAD
=======

>>>>>>> archita
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
                        <select>
                          <option>GST</option>
                          <option>SCRAP</option>
                          <option>Stock Transfer</option>
                          <option>Direct Export</option>
                          <option>Third Party EXP (In State)</option>
                          <option>Third Party Export (Out State)</option>
                          <option>Asset</option>
                          <option>Tool</option>
                        </select>
                      </div>

                      <div className="col-md-3 text-end">
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
<<<<<<< HEAD
                              <label htmlFor="customer-select">
=======
                              <label htmlFor="customer-search">
>>>>>>> archita
                                Select Cust:
                              </label>
                            </div>
                            <div className="col-3">
<<<<<<< HEAD
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
=======
                              <input
                                type="text"
                                list="customer-options"
                                className="form-control"
                                placeholder="Enter Customer Name"
                                value={customerSearchTerm}
                                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                              />
                              <datalist id="customer-options">
                                {customers.map((cust) => (
                                  <option
                                    key={cust.id}
                                    value={cust.Name}
                                  />
                                ))}
                              </datalist>
>>>>>>> archita
                            </div>
                            <div className="col-2">
                              <button
                                className="btn w-50"
                                onClick={() => {
<<<<<<< HEAD
                                  alert("Customer Selected: " + formData.bill_to);
=======
                                  setFormData((prev) => ({
                                    ...prev,
                                    bill_to: customerSearchTerm,
                                  }));
                                  alert("Customer Selected: " + customerSearchTerm);
>>>>>>> archita
                                }}
                              >
                                Search
                              </button>
<<<<<<< HEAD
=======

>>>>>>> archita
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
<<<<<<< HEAD
                                    {po.cust_po || po.po_no || po.id} - {po.cust_date || po.po_date || ""} - SO: {po.so_no || po.sales_order_no || po.order_no || ""}
=======
                                    {po.cust_po || po.po_no || po.id} - {po.cust_date || po.po_date || ""}
>>>>>>> archita
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
<<<<<<< HEAD
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
=======
                                        Part No : {row.last_operation?.part_no}
                                        <br />
                                        Part Code : {row.last_operation?.part_code}
                                        <br />
                                        Name Description : {row.last_operation?.Name_Description}
                                        <br />
                                        OP No. : {row.last_operation?.OPNo}
                                        <br />
                                        <span style={{ fontSize: "12px", color: "gray" }}>
                                          Operation : {row.last_operation?.Operation}
                                        </span>
                                        <br />
                                        Prod Qty :<strong>{row.last_operation?.prod_qty ?? 0}</strong>
                                        <br />
>>>>>>> archita
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
<<<<<<< HEAD
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
=======
                                      </td>
                                      <td className="text-start">
                                        Rate :  {row.rate}

                                        <br />
                                        Disc: <br /> Pkg Charges: <br />
                                        Trans Charges: <br />
>>>>>>> archita
                                        <span style={{ color: "blue" }}>
                                          Rate Type:
                                        </span>
                                        <br /> Amort Rate :
                                      </td>
<<<<<<< HEAD
                                      <td>{row.po_qty || row.qty || 0}</td>
=======
                                      <td>{/* PO Qty */}</td>
>>>>>>> archita
                                      <td>{/* Bal Qty */}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="w-100"
                                          placeholder="Qty"
<<<<<<< HEAD
                                          defaultValue={row.qty || row.po_qty || 0}
                                          onChange={(e) => {
                                            const updatedData = tableData.map((item, i) =>
                                              i === index ? { ...item, qty: e.target.value } : item
                                            );
                                            setTableData(updatedData);
                                          }}
=======
>>>>>>> archita
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
<<<<<<< HEAD
                                  {/* FIX 1: name updated to payment_Date */}
                                  <input
                                    type="date"
                                    name="payment_Date"
                                    value={formData.payment_Date}
=======
                                  <input
                                    type="date"
                                    name="payment_date"
                                    value={formData.payment_date}
>>>>>>> archita
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
<<<<<<< HEAD
                                  {/* FIX 1: name updated to Eway_bill_Date */}
                                  <input
                                    type="date"
                                    name="Eway_bill_Date"
                                    value={formData.Eway_bill_Date}
=======
                                  <input
                                    type="date"
                                    name="eway_bill_date"
                                    value={formData.eway_bill_date}
>>>>>>> archita
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
<<<<<<< HEAD
                                  {/* FIX 1: name updated to invoice_Date */}
                                  <input
                                    type="date"
                                    name="invoice_Date"
                                    value={formData.invoice_Date}
=======
                                  <input
                                    type="datetime-local"
                                    name="invoice_date"
                                    value={formData.invoice_date}
>>>>>>> archita
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
<<<<<<< HEAD
                                  {/* FIX 1: name updated to Eway_bill_no */}
                                  <input
                                    name="Eway_bill_no"
                                    value={formData.Eway_bill_no}
=======
                                  <input
                                    name="eway_bill_no"
                                    value={formData.eway_bill_no}
>>>>>>> archita
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
<<<<<<< HEAD
                                  {/* FIX 1: name updated to d_c_Date */}
                                  <input
                                    type="date"
                                    name="d_c_Date"
                                    value={formData.d_c_Date}
=======
                                  <input
                                    type="date"
                                    name="d_c_date"
                                    value={formData.d_c_date}
>>>>>>> archita
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
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>Assessable Value</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
<<<<<<< HEAD
                                  value={taxData.assessable_value}
                                  onChange={(e) => setTaxData({ ...taxData, assessable_value: e.target.value })}
=======
>>>>>>> archita
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
                                />
                              </div>

                              <div className="col-md-3 d-flex justify-content-between">
                                <label>CGST 00%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
<<<<<<< HEAD
                                  value={taxData.cgst}
                                  onChange={(e) => setTaxData({ ...taxData, cgst: e.target.value })}
=======
>>>>>>> archita
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
<<<<<<< HEAD
                                <label>CGST : {taxData.cgst}</label>
=======
                                <label>CGST : 0</label>
>>>>>>> archita
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
                                <label>SGST 00%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
<<<<<<< HEAD
                                  value={taxData.sgst}
                                  onChange={(e) => setTaxData({ ...taxData, sgst: e.target.value })}
=======
>>>>>>> archita
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
<<<<<<< HEAD
                                <label>SGST : {taxData.sgst}</label>
=======
                                <label>SGST : 0</label>
>>>>>>> archita
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
                                <label>IGST 00%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
<<<<<<< HEAD
                                  value={taxData.igst}
                                  onChange={(e) => setTaxData({ ...taxData, igst: e.target.value })}
=======
>>>>>>> archita
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
<<<<<<< HEAD
                                <label>IGST : {taxData.igst}</label>
=======
                                <label>IGST : 0</label>
>>>>>>> archita
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
                                <label>UTGST 00%</label>
                                <input
                                  className="form-control form-control-sm w-50"
                                  placeholder="0"
<<<<<<< HEAD
                                  value={taxData.utgst}
                                  onChange={(e) => setTaxData({ ...taxData, utgst: e.target.value })}
=======
>>>>>>> archita
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
                                <label>For E-Inv: Ser.Inv. / Inv.Type</label>
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