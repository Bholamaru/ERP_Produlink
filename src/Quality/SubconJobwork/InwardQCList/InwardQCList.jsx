import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardQCList.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { MdMarkEmailRead, MdDeleteForever } from "react-icons/md";
import axios from "axios";

const InwardQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [data, setData] = useState([]);

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
    const fetchInwardQcList = async () => {
      try {
        const response = await axios.get("https://erp-render.onrender.com/Quality/inward-qc-list/");
        if (response.data && response.data.value) {
          setData(response.data.value);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Quality/inward-qc-list:", error);
      }
    };
    fetchInwardQcList();
  }, []);

  return (
    <div className="InwardQCListMaster">
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
                <div className="InwardQCList">
                  <div className="InwardQCList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Inward 57F4 QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          Jobwork QC Query
                        </button>
                        <button
                          type="button"
                          className="btn"
                          to="/PaddingQCInward"
                        >
                          Padding QC List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="InwardQCList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Plant :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>SHARP</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Type :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>All</option>
                            <option>Our_F4</option>
                            <option>Vendor_F4</option>
                            <option>Non Returnable</option>
                            <option>Vendor_Scrap</option>
                            <option>Cust_Rework_In</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Status :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>All</option>
                            <option>Accpet</option>
                            <option>Reject</option>
                            <option>Hold</option>
                            <option>AUD</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>Item Group :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>Select</option>
                            <option>FG</option>
                            <option>RM</option>
                            <option>Tools</option>
                            <option>Instrument</option>
                            <option>Machine</option>
                            <option>Consumable</option>
                            <option>Safety Equ</option>
                            <option>Service</option>
                            <option>Asset</option>
                            <option>F4</option>
                            <option>Scrap</option>
                            <option>SF</option>
                            <option>BO</option>
                            <option>DI</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox"> Vendor Name:</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                          />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox">Item :</label>
                          <input
                            type="text"
                            placeholder="Enter Code"
                            className="form-control"
                          />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label type="checkbox">Lot No :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                          />
                        </div>

                        <div className="col-6 col-md-2 mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                      </div>

                      <div className="row mt-2 text-start">
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <select
                            className="form-select"
                            style={{ marginTop: "-1px" }}
                          >
                            <option>57F4 GRN No :</option>
                            <option>IIR (QC) No</option>
                            <option>Vendor Challan NO</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <input
                            type="text"
                            placeholder="No."
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: "1px" }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-2">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Type</th>
                          <th scope="col">Plant</th>
                          <th scope="col">QC No</th>
                          <th scope="col">QC Date</th>
                          <th scope="col">Entry Date</th>
                          <th scope="col">Vendor Name</th>
                          <th scope="col">In/Ch No</th>
                          <th scope="col">In/Ch Date</th>
                          <th scope="col">Item | Part Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">QC Qty</th>
                          <th scope="col">OK Qty</th>
                          <th scope="col">Rew.</th>
                          <th scope="col">Rej.</th>
                          <th scope="col">Lot Status .</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit </th>
                          <th scope="col">Doc </th>
                          <th scope="col">View </th>
                          <th scope="col">Email </th>
                          <th scope="col">Del</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data && data.length > 0 ? (
                          data.map((item, index) => {
                            const inwardChallan = item.InwardChallanTable && item.InwardChallanTable.length > 0 ? item.InwardChallanTable[0] : {};

                            const formattedInwardDate = item.InwardDate
                              ? new Date(item.InwardDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                              : "-";

                            const formattedChallanDate = item.ChallanDate
                              ? new Date(item.ChallanDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                              : "-";

                            const year = item.InwardDate
                              ? `${new Date(item.InwardDate).getFullYear().toString().slice(-2)}-${(new Date(item.InwardDate).getFullYear() + 1).toString().slice(-2)}`
                              : "24-25";

                            // Extract item code and desc from ItemDescription pattern: "Part: FGFG1001 - 1 - CAP OIL LOCK DF | ..."
                            let itemCode = "-";
                            let itemDesc = inwardChallan.ItemDescription || "-";
                            if (inwardChallan.ItemDescription && inwardChallan.ItemDescription.includes("Part:")) {
                              const parts = inwardChallan.ItemDescription.split("|");
                              const partInfo = parts[0].replace("Part:", "").trim();
                              const firstDash = partInfo.indexOf("-");
                              if (firstDash > -1) {
                                itemCode = partInfo.substring(0, firstDash).trim();
                                itemDesc = partInfo.substring(firstDash + 1).trim();
                              } else {
                                itemCode = partInfo;
                                itemDesc = partInfo;
                              }
                            }

                            return (
                              <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{year}</td>
                                <td>
                                  <span className="ourf4"> Our_F4 </span>
                                </td>
                                <td>SHARP</td>
                                <td>{item.id}</td>
                                <td>{formattedInwardDate}</td>
                                <td>
                                  {formattedInwardDate} <br /> {item.InwardTime || "00:00"}
                                </td>
                                <td>
                                  {item.SupplierName || "-"}
                                </td>
                                <td>
                                  {" "}
                                  <span className="nummmr">
                                    {item.InwardF4No || "-"}
                                  </span> <br /> {item.ChallanNo || "-"}
                                </td>
                                <td>
                                  {formattedInwardDate} <br /> {formattedChallanDate}
                                </td>
                                <td>
                                  {itemCode}
                                </td>
                                <td>{itemDesc} </td>
                                <td>{inwardChallan.InQtyNOS || inwardChallan.OutQty || "0"}</td>
                                <td>{inwardChallan.InQtyNOS || inwardChallan.OutQty || "0"}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>Accept</td>
                                <td>{item.PreparedBy || "mobin"}</td>
                                <td>
                                  <FaEdit />
                                </td>
                                <td>
                                  <HiDocumentArrowDown />
                                </td>
                                <td>
                                  {" "}
                                  <FaEye />
                                </td>
                                <td>
                                  <MdMarkEmailRead />
                                </td>
                                <td>
                                  {" "}
                                  <MdDeleteForever />{" "}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="23" className="text-center">No records found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default InwardQCList;
