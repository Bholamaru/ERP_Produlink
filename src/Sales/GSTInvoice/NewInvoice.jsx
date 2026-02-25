import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
// import Cached from "@mui/icons-material/Cached.js";
import { useNavigate } from "react-router-dom";
import "./NewInvoice.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewInvoice = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState([]); // All items list
  const [customerItems, setCustomerItems] = useState([]); // Items filtered by customer
  const [selectedItemObj, setSelectedItemObj] = useState(null); // Full object store
  const [selectedItemCode, setSelectedItemCode] = useState(""); // Selected item code
  const [tableData, setTableData] = useState([]); // Table rows
  const [itemSearchLoading, setItemSearchLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [poList, setPoList] = useState([]);
  const [selectedPO, setSelectedPO] = useState("");
  const [poSearchLoading, setPoSearchLoading] = useState(false);

  // --- NEW: Form State ---
  const [formData, setFormData] = useState({
    invoice_no: "",
    series_type: "",
    invoice_date: "",
    invoice_time: "",
    payment_date: "",
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
    eway_bill_date: "",
    eway_bill_no: "",
    destenation_code: "",
    note_remark: "",
    pdi_no: "",
    bank: "",
    d_c_no: "",
    d_c_date: "",
    delivery_terms: "",
  });

  // 1. Fetch Items for Dropdown (on Mount)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/Sales/newsalesorder/");
        const data = await res.json();

        // 🔥 FLATTEN sales order -> items
        const flatItems = data.flatMap(order =>
          order.item.map(itm => ({
            ...itm,
            customer: order.customer,
            cust_po: order.cust_po,
            plant: order.plant,
            ship_to: order.ship_to,
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
    setSelectedItemCode(""); // Reset item selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.bill_to, customerSearchTerm, items]);


  // 2. Handle Item Selection and Fetch Stock
  const handleItemSelect = async (e) => {
    const itemCode = e.target.value;
    setSelectedItemCode(itemCode);

    // Find item from filtered customer items
    const itemObj = customerItems.find(i => i.item_code === itemCode);
    if (!itemObj) return;

    try {
      setItemSearchLoading(true);
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
      });

      toast.info(`Selected: ${itemCode}`);
    } catch (error) {
      console.error("Stock fetch error:", error);

      // 🔁 fallback (agar stock API fail ho)
      setSelectedItemObj({
        ...itemObj,
        stock: 0,
      });

      toast.warning("Stock data not available");
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

  // --- 2. Save Invoice (POST) ---
  const handleGenerateInvoice = async () => {
    if (!formData.series_type || !formData.invoice_no) {
      toast.error("Please select series and generate invoice number first");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/Sales/invoice/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Invoice Generated Successfully!");
        setFormData({
          ...formData,
          invoice_no: "",
          series_type: "",
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
        // Handle both array and object responses
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
                              <label htmlFor="customer-search">
                                Select Cust:
                              </label>
                            </div>
                            <div className="col-3">
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
                            </div>
                            <div className="col-2">
                              <button
                                className="btn w-50"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    bill_to: customerSearchTerm,
                                  }));
                                  alert("Customer Selected: " + customerSearchTerm);
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
                                    {po.cust_po || po.po_no || po.id} - {po.cust_date || po.po_date || ""}
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
                                      </td>
                                      <td className="text-start">
                                        Rate :  {row.rate}

                                        <br />
                                        Disc: <br /> Pkg Charges: <br />
                                        Trans Charges: <br />
                                        <span style={{ color: "blue" }}>
                                          Rate Type:
                                        </span>
                                        <br /> Amort Rate :
                                      </td>
                                      <td>{/* PO Qty */}</td>
                                      <td>{/* Bal Qty */}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="w-100"
                                          placeholder="Qty"
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
                                  <input
                                    type="date"
                                    name="payment_date"
                                    value={formData.payment_date}
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
                                  <input
                                    type="date"
                                    name="eway_bill_date"
                                    value={formData.eway_bill_date}
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
                                  <input
                                    type="datetime-local"
                                    name="invoice_date"
                                    value={formData.invoice_date}
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
                                  <input
                                    name="eway_bill_no"
                                    value={formData.eway_bill_no}
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
                                  <input
                                    type="date"
                                    name="d_c_date"
                                    value={formData.d_c_date}
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
                                <label>CGST : 0</label>
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
                                <label>SGST : 0</label>
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
                                <label>IGST : 0</label>
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