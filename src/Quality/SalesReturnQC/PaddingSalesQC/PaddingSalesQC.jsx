import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PaddingSalesQC.css";
import { useNavigate } from "react-router-dom";
import { fetchSalesReturns } from "../../../Service/Api.jsx";

const PaddingSalesQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    plant: "SHARP",
    fromDate: "2025-01-01",
    toDate: "2026-03-03",
    custName: "Ram kumawat",
    itemCode: "",
    returnNo: ""
  });
  const [loading, setLoading] = useState(false);

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

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const data = await fetchSalesReturns(filters.fromDate, filters.toDate, filters.custName);
      const flattenedData = data.flatMap(mainItem => {
        if (!mainItem.items || mainItem.items.length === 0) {
          return [{
            year: "-",
            plant: mainItem.plant || "SHARP",
            returnNo: mainItem.sales_return_no,
            returnDate: mainItem.sales_return_date,
            customerName: mainItem.cust_name,
            itemCode: "-",
            itemDesc: "-",
            returnQty: "-",
            user: "Admin",
            rawItem: mainItem
          }];
        }
        return mainItem.items.map(subItem => ({
          year: "-", // If needed, can be derived
          plant: mainItem.plant || "SHARP",
          returnNo: mainItem.sales_return_no,
          returnDate: mainItem.sales_return_date,
          customerName: mainItem.cust_name,
          itemCode: subItem.item_code,
          itemDesc: subItem.item_desc || "-",
          returnQty: subItem.return_qty,
          user: "Admin",
          rawItem: { ...mainItem, ...subItem }
        }));
      });
      setQcList(flattenedData);
    } catch (error) {
      console.error("Failed to fetch sales returns", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleSearch = () => {
    fetchReturns();
  };
  const handleQCClick = (item) => {
    navigate("/RejectionMaterialQC", { state: item });
  };
  return (
    <div className="PaddingSalesQCMaster">
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
                <div className="PaddingSalesQC mt-5">
                  <div className="PaddingSalesQC-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Pending Sales Return QC List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="PaddingSalesQC-filter mb-4 mt-5">
                    <div className="row text-start">

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Plant :</label>
                        <select className="form-select" style={{ marginTop: "-1px" }} value={filters.plant} onChange={(e) => setFilters({ ...filters, plant: e.target.value })}>
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1" >
                        <label>From:</label>
                        <input type="date" className="form-control" value={filters.fromDate} onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>To Date:</label>
                        <input type="date" className="form-control" value={filters.toDate} onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text" placeholder="Cust Name" className="form-control" value={filters.custName} onChange={(e) => setFilters({ ...filters, custName: e.target.value })} />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label">Item Code: </label>
                        </div>
                        <input type="text" placeholder="Item Code " className="form-control" value={filters.itemCode} onChange={(e) => setFilters({ ...filters, itemCode: e.target.value })} />
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="Checkbox" />
                          <label htmlFor="Checkbox" className="form-check-label"> Sales-Return-No: </label>
                        </div>
                        <input type="text" placeholder="" className="form-control" value={filters.returnNo} onChange={(e) => setFilters({ ...filters, returnNo: e.target.value })} />
                      </div>


                      <div className="col-6 col-md-1 mt-4">

                        <button type="button" className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                          {loading ? "Searching..." : "Search"}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-4">
                  <table className="table table-bordered table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Sr no</th>
                        <th>Year</th>
                        <th>Plant</th>
                        <th>Return No</th>
                        <th>Return Date</th>
                        <th>Customer Name</th>
                        <th>Item Code</th>
                        <th>Item Desc</th>
                        <th>Return Qty</th>
                        <th>User</th>
                        <th>QC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qcList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>   {/* Sr No */}
                          <td>{item.year}</td>
                          <td>{item.plant}</td>
                          <td>{item.returnNo}</td>
                          <td>{item.returnDate}</td>
                          <td>{item.customerName}</td>
                          <td>{item.itemCode}</td>
                          <td>{item.itemDesc}</td>
                          <td>{item.returnQty}</td>
                          <td>{item.user || "Togre"}</td>
                          <td
                            className="text-center text-danger fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleQCClick(item)}
                          >
                            !
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaddingSalesQC;