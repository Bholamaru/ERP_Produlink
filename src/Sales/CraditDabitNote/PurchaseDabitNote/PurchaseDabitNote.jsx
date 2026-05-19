import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css";
import "./PurchaseDabitNote.css";

const PurchaseDabitNote = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // First table data
  const [itemQuantities, setItemQuantities] = useState({}); // Track edited quantities
  const [transportCharge, setTransportCharge] = useState(0);
  const [tcsCharge, setTcsCharge] = useState(0);


  const [searchParams, setSearchParams] = useState({
    from_date: "",
    to_date: "",
    grn_no: "",
    item_name: "",
    supplier_code: "" // Second image code logic
  });

  const navigate = useNavigate();

  //  API structure state initialize
  const [formData, setFormData] = useState({
    items: [],
    type: "",
    notetype: "PurchaseReturn",
    debit_note_no: "",
    debit_note_date: null,
    party_name: "",
    mode_of_transport: "By Road",
    lr_gc_note_no: "",
    eway_bill_no: "",
    eway_bill_date: null,
    vehical_no: "",
    traspoter: "",
    po_no: "",
    po_date: null,
    invoice_no: "",
    invoice_date: null,
    remark: "",
    is_service_dn: false,
  });

  const handleSave = async () => {
    try {
      // Validate that items exist
      if (!formData.items || formData.items.length === 0) {
        toast.warn("Please add at least one item to the debit note.");
        return;
      }

      // Calculate totals for all items
      let totalSubtotal = 0;
      let totalCgst = 0;
      let totalSgst = 0;
      let totalIgst = 0;
      // eslint-disable-next-line no-unused-vars
      let totalUtgst = 0;

      // Rebuild items with backend-expected field names
      const updatedItems = formData.items.map((item, index) => {
        const editedQty = itemQuantities[index] !== undefined ? itemQuantities[index] : item.quantity;
        const amount = editedQty * (item.rate || 0);

        const itemCgst = (amount * (item.cgst || 0)) / 100;
        const itemSgst = (amount * (item.sgst || 0)) / 100;
        const itemIgst = (amount * (item.igst || 0)) / 100;
        const itemUtgst = (amount * (item.utgst || 0)) / 100;

        const itemSubtotal = amount + itemCgst + itemSgst + itemIgst + itemUtgst;
        const itemGrandTotal = itemSubtotal + (parseFloat(transportCharge) || 0) + (parseFloat(tcsCharge) || 0);

        totalSubtotal += amount;
        totalCgst += itemCgst;
        totalSgst += itemSgst;
        totalIgst += itemIgst;
        totalUtgst += itemUtgst;

        return {
          grn_no: item.grn_no || "",
          grn_date: item.grn_date || "",
          item_code: item.item_code || "",
          item_description: item.item_desc || null,
          hsn_code: item.hsn_code || "",
          grn_qty: parseFloat(item.qty) || null,
          stock: null,
          remark: item.remark || null,
          reason: item.reason || "",
          quantity: parseFloat(editedQty).toString(),
          unit: item.unit || "",
          Rate: parseFloat(item.rate) || null,
          amount: parseFloat(amount).toFixed(2),
          transport_charges: parseFloat(transportCharge).toFixed(2),
          subtotal: itemSubtotal.toFixed(2),
          cgst: itemCgst.toFixed(2),
          sgst: itemSgst.toFixed(2),
          igst: itemIgst.toFixed(2),
          utgst: itemUtgst.toFixed(2),
          tcs: parseFloat(tcsCharge).toFixed(2),
          tds_on_basic: true, // Can be made dynamic if needed
          tds_on_grand_total: false,
          grand_total: itemGrandTotal.toFixed(2),
        };
      });

      const dataToSave = {
        type: formData.type || "",
        notetype: formData.notetype || "PurchaseReturn",
        debit_note_no: formData.debit_note_no || "",
        debit_note_date: formData.debit_note_date || null,
        party_name: formData.party_name || "",
        mode_of_transport: formData.mode_of_transport || "By Road",
        lr_gc_note_no: formData.lr_gc_note_no || "",
        eway_bill_no: formData.eway_bill_no || "",
        eway_bill_date: formData.eway_bill_date || null,
        vehical_no: formData.vehical_no || "",
        traspoter: formData.traspoter || "",
        po_no: formData.po_no || "",
        po_date: formData.po_date || null,
        invoice_no: formData.invoice_no || "",
        invoice_date: formData.invoice_date || null,
        remark: formData.remark || "",
        is_service_dn: formData.is_service_dn || false,
        items: updatedItems,
      };

      console.log("📤 Data being sent to backend:", JSON.stringify(dataToSave, null, 2));
      console.log("📦 Items count:", updatedItems.length);
      console.log("💰 Totals - Subtotal:", totalSubtotal.toFixed(2), "CGST:", totalCgst.toFixed(2), "SGST:", totalSgst.toFixed(2), "IGST:", totalIgst.toFixed(2));

      const response = await axios.post(
        "http://127.0.0.1:8000/Sales/debitnote/",
        dataToSave,
      );

      if (response.status === 201 || response.status === 200) {
        console.log("✅ Data saved successfully:", response.data);
        toast.success("Debit Note saved successfully!");

        // Success New number fetch automatically
        fetchDebitNoteNo();
      }
    } catch (error) {
      console.error("❌ Full Error Object:", error);
      console.error("❌ Error Response Status:", error.response?.status);
      console.error("❌ Error Response Data:", error.response?.data);
      console.error("❌ Error Message:", error.message);

      // Extract detailed error message
      let errorMsg = error.message;
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (error.response.data.detail) {
          errorMsg = error.response.data.detail;
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        } else {
          // Show all field errors
          errorMsg = Object.entries(error.response.data)
            .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
            .join("\n");
        }
      }

      toast.error(`Failed to save Debit Note:\n${errorMsg}`);
    }
  };

  const handleButtonClick = () => navigate("/DabitNoteList");
  const handleBttnClick = () => navigate("/DN574Fout");
  const toggleSideNav = () => setSideNavOpen((prevState) => !prevState);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Function fetch New Debit Note Number
  const fetchDebitNoteNo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/Sales/debit/no");
      if (response.data && response.data.debit_note_no) {
        setFormData((prev) => ({
          ...prev,
          debit_note_no: response.data.debit_note_no,
        }));
        console.log(
          "New Debit Note No Generated:",
          response.data.debit_note_no,
        );
      }
    } catch (error) {
      console.error("Error fetching Debit Note Number:", error);
      toast.error("Failed to generate Debit Note Number");
    }
  };

  // Page load number generate
  useEffect(() => {
    fetchDebitNoteNo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };


  // Fetch GRN Data from API
  // const fetchGRNData = async () => {
  //   if (!formData.party_name || !searchParams.from_date || !searchParams.to_date) {
  //     toast.warn("Please select Party, From Date, and To Date");
  //     return;
  //   }

  //   try {
  //     const url = `http://127.0.0.1:8000/Sales/purchase-po/by-supplier/?supplier=${encodeURIComponent(formData.party_name)}&from_date=${searchParams.from_date}&to_date=${searchParams.to_date}`;
  //     const response = await axios.get(url);
  //     setSearchResults(response.data);
  //     toast.success("Data fetched successfully!");
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     toast.error("Failed to fetch GRN data");
  //   }
  // };


  const fetchGRNData = async () => {
    if (!formData.party_name || !searchParams.from_date || !searchParams.to_date) {
      toast.warn("Please select Party, From Date, and To Date");
      return;
    }

    try {
      const url = `http://127.0.0.1:8000/Sales/purchase-po/by-supplier/?supplier=${encodeURIComponent(
        formData.party_name
      )}&from_date=${searchParams.from_date}&to_date=${searchParams.to_date}`;

      const response = await axios.get(url);

      // 🔥 FLATTEN DATA (KEY PART)
      const flatData = [];

      response.data.forEach((po) => {
        po.item_details.forEach((item) => {
          const gst = po.gst_details?.find(
            (g) => g.item_code === item.item
          );

          flatData.push({
            grn_no: po.po_basic_details.PoNo,
            grn_date: po.po_basic_details.PoDate,
            invoice_no: "-", // API me nahi hai
            po_no: po.po_basic_details.PoNo,
            hsn_code: gst?.hsn || "",
            item_desc: item.description,
            qty: item.qty,
            rate: item.rate,
            unit: item.unit,
            item_code: item.item,
            cgst: gst?.cgst || 0,
            sgst: gst?.sgst || 0,
            igst: gst?.igst || 0,
            vat: gst?.vat || null,
            cess: gst?.cess || null,
          });
        });
      });

      setSearchResults(flatData);
      toast.success("GRN data fetched");

    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch GRN data");
    }
  };




  //  Add item from Search Results to Final Table
  const addToItems = (item) => {
    const newItem = {
      ...item,
      reason: "",
      quantity: item.qty || 0,
      unit: item.unit || "",
      rate: item.rate || 0,
      amt: (item.qty || 0) * (item.rate || 0),
      cgst: item.cgst || 0,
      sgst: item.sgst || 0,
      igst: item.igst || 0,
      vat: item.vat || null,
      cess: item.cess || null,
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
    toast.info("Item added to list");
  };


  const handleSearchParamChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (index, value) => {
    setItemQuantities({ ...itemQuantities, [index]: parseFloat(value) || 0 });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
    // Also remove the quantity entry for this index
    const updatedQuantities = { ...itemQuantities };
    delete updatedQuantities[index];
    setItemQuantities(updatedQuantities);
    toast.info("Item removed from list");
  };



  return (
    <div className="PurchaseDabitNoteMaster">
      <ToastContainer position="top-right" autoClose={3000} />
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
                <div className="PurchaseDabitNote">
                  <div className="PurchaseDabitNote-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">New DebitNote</h5>
                      </div>

                      <div className="col-md-2">
                        <div className="row">
                          <div className="col-md-4">
                            <label>Type</label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
                              name="type"
                              value={formData.type}
                              onChange={handleInputChange}
                            >
                              <option value="">Select</option>
                              <option value="Direct">Direct</option>
                              <option value="GRN">GRN</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="row">
                          <div className="col-md-4">
                            <label>NoteType</label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
                              name="notetype"
                              value={formData.notetype}
                              onChange={handleInputChange}
                            >
                              <option value="PurchaseReturn">
                                PurchaseReturn
                              </option>
                              <option value="PurchaseRateDiff">
                                PurchaseRateDiff
                              </option>
                              <option value="ShortQty">ShortQty</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 text-end">
                        <button className="vndrbtn" onClick={handleButtonClick}>
                          Dabit Note List
                        </button>
                        <button className="vndrbtn" onClick={handleBttnClick}>
                          DN-57F4out
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Top Form Fields */}
                  <div className="PurchaseDabitNote-main">
                    <div className="row text-start">
                      <div className="col-2">
                        <label>DebitNote NO:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="debit_note_no"
                          value={formData.debit_note_no} // State value
                          readOnly
                          placeholder="Generating..."
                        />
                      </div>
                      <div className="col-2">
                        <label>DebitNote Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="debit_note_date"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Party Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="party_name"
                          value={formData.party_name}
                          onChange={handleInputChange}
                          placeholder="Supplier Name"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Supplier Code:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="supplier_code"
                          value={searchParams.supplier_code}
                          onChange={handleSearchParamChange}
                          placeholder="CSJW002"
                        />
                      </div>
                      <div className="col-2">
                        <button
                          className="vndrbtn"
                          style={{ marginTop: "27px" }}
                        >
                          {" "}
                          Search{" "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="PurchaseDabitNote-main mt-2">
                    {formData.type === "GRN" && (
                      <div className="row text-start">
                        <div className="col-md-2">
                          <label>Date Range:</label>
                          <input type="date" className="form-control" name="from_date" onChange={handleSearchParamChange} />
                        </div>
                        <div className="col-md-2">
                          <label>TO Range:</label>
                          <input type="date" className="form-control" name="to_date" onChange={handleSearchParamChange} />
                        </div>
                        <div className="col-md-2">
                          <label>GRN NO:</label>
                          <input type="text" className="form-control" name="grn_no" onChange={handleSearchParamChange} placeholder="24250001" />
                        </div>
                        <div className="col-md-2">
                          <button className="vndrbtn mt-4" onClick={fetchGRNData}>Search GRN</button>
                        </div>
                      </div>
                    )}

                    {(formData.type === "Direct" || formData.type === "") && (
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Item Code</th>
                              <th>Stock</th>
                              <th>Item Desc</th>
                              <th>Remark</th>
                              <th>Reason</th>
                              <th>HSN Code</th>
                              <th>Rate</th>
                              <th>Qty</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Enter Name"
                                  className="form-control"
                                />
                                <br />
                                <button className="vndrbtn w-50">Search</button>
                              </td>
                              <td></td>
                              <td>
                                <textarea className="form-control"></textarea>
                              </td>
                              <td>
                                <textarea className="form-control"></textarea>
                              </td>
                              <td>
                                <select className="form-control">
                                  <option value="">Select</option>
                                </select>
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                                <select className="form-select mt-1">
                                  <option value="">Select Unit</option>
                                </select>
                              </td>
                              <td>
                                <button className="vndrbtn">Add</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="PurchaseDabitNote-main mt-2">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>GRN No </th>
                            <th>GRN Date</th>
                            <th>Invoice No</th>
                            <th>Po No</th>
                            <th>HSN Code</th>
                            <th>Item Desc.</th>
                            <th>Qty.</th>
                            <th>Debit Note No</th>
                            <th>Return Qty</th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.grn_no}</td>
                              <td>{item.grn_date}</td>
                              <td>{item.invoice_no}</td>
                              <td>{item.po_no}</td>
                              <td>{item.hsn_code}</td>
                              <td>{item.item_desc}</td>
                              <td>{item.qty}</td>
                              <td></td>
                              <td></td>
                              <td><button className="btn btn-sm btn-primary" onClick={() => addToItems(item)}>ADD</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>GRN No </th>
                            <th>GRN Date</th>
                            <th>Item Code</th>
                            <th>Item Desc</th>
                            <th>HSN Code</th>
                            <th>GRN Qty.</th>
                            <th>Stock.</th>
                            <th>Remark</th>
                            <th>Reason</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Rate</th>
                            <th>Amt</th>
                            <th>Del</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.items.map((item, index) => {
                            const editedQty = itemQuantities[index] !== undefined ? itemQuantities[index] : item.quantity;
                            const calculatedAmt = editedQty * (item.rate || 0);
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.grn_no}</td>
                                <td>{item.grn_date}</td>
                                <td>{item.item_code}</td>
                                <td>{item.item_desc}</td>
                                <td>{item.hsn_code}</td>
                                <td>{item.qty}</td>
                                <td></td>
                                <td><textarea className="form-control" rows="1"></textarea></td>
                                <td><select className="form-control"><option value="">Select</option></select></td>
                                <td><input type="number" className="form-control" value={editedQty} onChange={(e) => handleQuantityChange(index, e.target.value)} /></td>
                                <td>{item.unit}</td>
                                <td>{item.rate}</td>
                                <td>{calculatedAmt.toFixed(2)}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(index)}>X</button></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="PurchaseDabitNote-main mt-2">
                    <div>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <th>Transport Charge</th>
                            <th>SubTotal</th>
                            <th colSpan="2">CGST</th>
                            <th colSpan="2">SGST</th>
                            <th colSpan="2">IGST</th>
                            <th colSpan="2">UTGST</th>
                            <th>TCS</th>
                            <th className="d-flex align-items-center">
                              <input
                                type="radio"
                                id=""
                                name="fav_language"
                                value="FG"
                                className=""
                              />
                              <label for="" className="">
                                TDSOnBasic
                              </label>{" "}
                              <br />
                              <input
                                type="radio"
                                id=""
                                name="fav_language"
                                value="RM"
                                className=""
                              />
                              <label for="" className="">
                                TDSOnGrandTotal
                              </label>
                            </th>
                            <th>Grand Total</th>
                          </thead>

                          <tbody>
                            {(() => {
                              let subtotal = 0;
                              let cgstTotal = 0;
                              let sgstTotal = 0;
                              let igstTotal = 0;
                              let utgstTotal = 0;
                              let vatTotal = 0;
                              let cessTotal = 0;
                              let cgstPercent = 0;
                              let sgstPercent = 0;
                              let igstPercent = 0;
                              let utgstPercent = 0;

                              formData.items.forEach((item, idx) => {
                                const qty = itemQuantities[idx] !== undefined ? itemQuantities[idx] : item.quantity;
                                const amt = qty * (item.rate || 0);
                                subtotal += amt;
                                cgstTotal += (amt * (item.cgst || 0)) / 100;
                                sgstTotal += (amt * (item.sgst || 0)) / 100;
                                igstTotal += (amt * (item.igst || 0)) / 100;
                                utgstTotal += (amt * (item.utgst || 0)) / 100;
                                vatTotal += (amt * (item.vat || 0)) / 100;
                                cessTotal += (amt * (item.cess || 0)) / 100;
                              });

                              // Get average tax percentages if needed for display
                              if (formData.items.length > 0) {
                                cgstPercent = formData.items.reduce((sum, item) => sum + (item.cgst || 0), 0) / formData.items.length;
                                sgstPercent = formData.items.reduce((sum, item) => sum + (item.sgst || 0), 0) / formData.items.length;
                                igstPercent = formData.items.reduce((sum, item) => sum + (item.igst || 0), 0) / formData.items.length;
                                utgstPercent = formData.items.reduce((sum, item) => sum + (item.utgst || 0), 0) / formData.items.length;
                              }

                              const grandTotal = subtotal + cgstTotal + sgstTotal + igstTotal + utgstTotal + vatTotal + cessTotal + (parseFloat(transportCharge) || 0) + (parseFloat(tcsCharge) || 0);

                              return (
                                <>
                                  <tr>
                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={transportCharge}
                                        onChange={(e) => setTransportCharge(e.target.value)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={subtotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={cgstPercent.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={cgstTotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={sgstPercent.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={sgstTotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={igstPercent.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={igstTotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={utgstPercent.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={utgstTotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={tcsCharge}
                                        onChange={(e) => setTcsCharge(e.target.value)}
                                      />
                                    </td>
                                    <td>
                                      {/* Radio column - left empty in body; header contains radio inputs */}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={grandTotal.toFixed(2)}
                                        readOnly
                                      />
                                    </td>
                                  </tr>
                                </>
                              );
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    {/* Transport & Additional Info */}
                    <div className="mt-3">
                      <div className="row text-start">
                        <div className="col-md-2">
                          <label>Mode of Transport</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mode_of_transport"
                            value={formData.mode_of_transport}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>LR GC Note NO:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lr_gc_note_no"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Eway Bill No:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="eway_bill_no"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Eway Bill Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="eway_bill_date"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Vehicle No:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehical_no"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row text-start mt-2">
                        <div className="col-md-2">
                          <label>Transporter:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="traspoter"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>PO No:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="po_no"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>PO Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="po_date"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Invoice No:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="invoice_no"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Invoice Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="invoice_date"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row text-start mt-2">
                        <div className="col-md-2">
                          <label>Remark</label>
                          <textarea
                            className="form-control"
                            name="remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="col-md-2 d-flex align-items-start mt-4">
                          <input
                            type="checkbox"
                            name="is_service_dn"
                            checked={formData.is_service_dn}
                            onChange={handleInputChange}
                          />
                          <label className=""> IS Service DN</label>
                        </div>
                        <div className="col-md-4 mt-4">
                          <button className="vndrbtn" onClick={handleSave}>
                            Save Debit Note
                          </button>
                          <button
                            className="vndrbtn"
                            onClick={() => {
                              setFormData({});
                              fetchDebitNoteNo();
                            }}
                          >
                            Clear
                          </button>
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

export default PurchaseDabitNote;