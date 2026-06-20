import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PurchaseOderList.css"
import { Link } from "react-router-dom";
import { fetchPurchaseOrders } from "../../../Service/PurchaseApi.jsx";

const PurchseOderList = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

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
      const getPurchaseOrders = async () => {
        try {
          const data = await fetchPurchaseOrders();
          setPurchaseOrders(data);
        } catch (error) {
          console.error("Error fetching purchase orders:", error);
        }
      };
      getPurchaseOrders();
    }, []);

  return (
    <div className="NewPurchseOrderList">
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
              <div className="PurchseOrderList-header  text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                      Purchase Order List
                    </h5>
                      </div>
                      <div className="col-md-8 text-end">
                    
                      <button className="btn">Recently PO Approval List</button>
                     
                     
                        <button className="btn">AMC Purchase Order List</button>
                    
                        <Link  to="/Purchase-Order-Summary" className="btn">Purchase Order - Query</Link>
                  
                      </div>
                    </div>
              </div>
              <div className="PurchaseorderList mt-5">
                <div className="container-fluid mt-4">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Plant</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>
                            <input type="checkbox" id="supplier" />
                            <label htmlFor="supplier" className="ml-2">
                              Supplier Name
                            </label>
                          </th>
                         
                          <th>PO Type</th>
                          <th>Series</th>
                          <th>Item Group</th>
                          <th>PO Status</th>
                          <th>User</th>
                          
                          
                         <th>Search</th>
                         <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>
                            <select className="form-control">
                              <option>Plant 1</option>
                              <option>Plant 2</option>
                              <option>Plant 3</option>
                            </select>
                          </td>
                          <td>
                            <input type="date" className="form-control" />
                          </td>
                          <td>
                            <input type="date" className="form-control" />
                          </td>
                          <td>
                            <input type="text" className="form-control" />
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Type 2</option>
                              <option>Type 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Status 2</option>
                              <option>Status 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Status 2</option>
                              <option>Status 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Approve 2</option>
                              <option>Approve 3</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>All</option>
                              <option>Approve 2</option>
                              <option>Approve 3</option>
                            </select>
                          </td>
                          
                         
                         
                          <td>
                            <button className="pobtn">Search</button>
                          </td>
                          <td>
                            <button className="pobtn">Search Option</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="Purchaseordertable">
                  <div className="container-fluid mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th>Year</th>
                            <th>Plant</th>
                            <th>PO No</th>
                            <th>PO Date</th>
                            <th>Type</th>
                            <th>Code No</th>
                            <th>Supplier/Vendor Name</th>
                            <th>User</th>
                            <th>Info</th>
                            <th>Auth Status</th>
                            <th>Po Status</th>
                            <th>Email</th>
                            <th>Docs</th>
                            <th>Disc (%)</th>
                            
                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseOrders.map((order, index) => (
                            <tr key={order.id || index}>
                              <td>{index + 1}</td>
                              <td>{order.PoDate ? new Date(order.PoDate).getFullYear() : "N/A"}</td>
                              <td>{order.Plant}</td>
                              <td>{order.PoNo}</td>
                              <td>{order.PoDate}</td>
                              <td>{order.Type}</td>
                              <td>{order.CodeNo}</td>
                              <td>{order.Supplier}</td>
                              <td>{order.User}</td>
                              <td>{order.Info || ""}</td>
                              <td>{order.AuthStatus || "Pending"}</td>
                              <td>{order.PoStatus || "Open"}</td>
                              <td>{order.Email || ""}</td>
                              <td>{order.Docs || ""}</td>
                              <td>{order.Disc || 0}</td>
                              <td>
                                <Link to={`/new-purchase-order/${order.id}`} className="btn btn-sm btn-primary">
                                  Edit
                                </Link>
                              </td>
                              <td>
                                <a
                                  href={`http://127.0.0.1:8000/${order.View}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-secondary"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
  )
}

export default PurchseOderList
