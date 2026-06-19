import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InprocessInspectionList.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdMarkEmailRead, MdDeleteForever } from "react-icons/md";



import axios from "axios";
import * as XLSX from "xlsx";

const defaultQCList = [
  {
    Year: "24-25",
    QcNo: "PRCOQC142523914",
    QcDate: "02/12/24",
    ProdNo: "242536340",
    ProdDate: "02/12/24",
    ItemNo: "FG1018",
    ItemCode: "520HFD0202",
    ItemDesc: "SECONDARY PISTON FOR TMC",
    OpNo: "20",
    OpName: "CNC-1",
    PartCode: "CNC1FG1018",
    Ok: 1297,
    Rej: 0,
    Rew: 3,
    Total: 1300,
    Hk: "F26497",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523913",
    QcDate: "02/12/24",
    ProdNo: "242536534",
    ProdDate: "02/12/24",
    ItemNo: "FG1263",
    ItemCode: "F2BZ057128",
    ItemDesc: "CAP OIL LOCK J1D FF",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1263",
    Ok: 694,
    Rej: 0,
    Rew: 6,
    Total: 700,
    Hk: "A58430",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523912",
    QcDate: "02/12/24",
    ProdNo: "242536567",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 854,
    Rej: 0,
    Rew: 6,
    Total: 860,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523911",
    QcDate: "02/12/24",
    ProdNo: "242536566",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 550,
    Rej: 4,
    Rew: 6,
    Total: 560,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523910",
    QcDate: "02/12/24",
    ProdNo: "242536565",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 702,
    Rej: 0,
    Rew: 5,
    Total: 707,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523909",
    QcDate: "02/12/24",
    ProdNo: "242536564",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 809,
    Rej: 4,
    Rew: 5,
    Total: 818,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523908",
    QcDate: "02/12/24",
    ProdNo: "242536563",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 769,
    Rej: 0,
    Rew: 4,
    Total: 773,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523907",
    QcDate: "02/12/24",
    ProdNo: "242536562",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 599,
    Rej: 3,
    Rew: 11,
    Total: 613,
    Hk: "E244209",
    User: "Anupam"
  },
  {
    Year: "24-25",
    QcNo: "PRCOQC142523906",
    QcDate: "02/12/24",
    ProdNo: "242536561",
    ProdDate: "02/12/24",
    ItemNo: "FG1106",
    ItemCode: "550BZ05802",
    ItemDesc: "CAP OIL LOCK -PRFH006",
    OpNo: "10",
    OpName: "PARTING & DRILLING",
    PartCode: "PDFG1106",
    Ok: 707,
    Rej: 5,
    Rew: 3,
    Total: 715,
    Hk: "E244209",
    User: "Anupam"
  }
];

const InprocessInspectionList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState(defaultQCList);
  const [loading, setLoading] = useState(false);

  const [plant, setPlant] = useState("SHARP");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [prodNo, setProdNo] = useState("");
  const [lotNo, setLotNo] = useState("");

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (plant) params.plant = plant;
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (itemCode) params.item_code = itemCode;
      if (prodNo) params.prod_no = prodNo;
      if (lotNo) params.lot_no = lotNo;

      const resp = await axios.get("http://127.0.0.1:8000/Quality/inprocess-qc-list/", { params });
      const data = Array.isArray(resp.data) ? resp.data : (resp.data.data || []);
      setQcList(data);
    } catch (error) {
      console.error("Error searching inprocess QC:", error);
      const filtered = defaultQCList.filter(row => {
        if (itemCode && !row.ItemCode.toLowerCase().includes(itemCode.toLowerCase())) return false;
        if (prodNo && !row.ProdNo.toLowerCase().includes(prodNo.toLowerCase())) return false;
        return true;
      });
      setQcList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (qcList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = qcList.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.Year || row.year || "",
      "QC No": row.QcNo || row.qc_no || "",
      "QC Date": row.QcDate || row.qc_date || "",
      "Prod No": row.ProdNo || row.prod_no || "",
      "ItemNo": row.ItemNo || row.item_no || "",
      "Item Desc": row.ItemDesc || row.item_desc || "",
      "Op No": row.OpNo || row.op_no || "",
      "Op.Name": row.OpName || row.op_name || "",
      "Part Code": row.PartCode || row.part_code || "",
      "Ok": row.Ok || row.ok_qty || 0,
      "Rej.": row.Rej || row.reject_qty || 0,
      "Rew.": row.Rew || row.rework_qty || 0,
      "Total": row.Total || row.total_qty || 0,
      "Hk": row.Hk || row.hk || "",
      "User": row.User || row.username || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inprocess Inspection List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Inprocess_Inspection_List.xlsx");
  };

  return (
    <div className="InprocessInspectionListMaster">
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
                <div className="InprocessInspectionList">
                  <div className="InprocessInspectionList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Inprocess Inspection List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleExportExcel}>
                          Export Excel
                        </button>
                        <button type="button" className="btn" to="#/">
                          Inprocess QC - Query
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="InprocessInspectionList-Main mt-5">
                    <div className="container-fluid">
                      <div className="row g-3 text-start mt-3">

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant :</label>
                          <select className="form-select" style={{ marginTop: "-1px" }} value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="SHARP">SHARP</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="CheckboxItem" />
                            <label htmlFor="CheckboxItem" className="form-check-label"> Item Code: </label>
                          </div>
                          <input type="text" placeholder="Item Code" className="form-control" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="CheckboxProd" />
                            <label htmlFor="CheckboxProd" className="form-check-label">Prod No: </label>
                          </div>
                          <input type="text" placeholder="Production " className="form-control" value={prodNo} onChange={(e) => setProdNo(e.target.value)} />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="CheckboxLot" />
                            <label htmlFor="CheckboxLot" className="form-check-label"> Lot/Heat-No: </label>
                          </div>
                          <input type="text" placeholder="" className="form-control" value={lotNo} onChange={(e) => setLotNo(e.target.value)} />
                        </div>


                        <div className="col-6 col-md-1">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="machineUtilizeCheckbox" />
                            <label htmlFor="machineUtilizeCheckbox" className="form-check-label"> LastOption: </label>
                          </div>
                          <button type="button" className="btn btn-primary" onClick={handleSearch}>
                            Search
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="table-responsive mt-5">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">QC No</th>
                          <th scope="col">QC Date</th>
                          <th scope="col">Prod No</th>
                          <th scope="col">ItemNo</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Op No</th>
                          <th scope="col">Op.Name</th>
                          <th scope="col">Part Code</th>
                          <th scope="col">Ok</th>
                          <th scope="col">Rej.</th>
                          <th scope="col">Rew.</th>
                          <th scope="col">Total</th>
                          <th scope="col">Hk</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit </th>
                          <th scope="col">Del</th>
                          <th scope="col">View </th>
                          <th scope="col">Doc </th>

                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="20" className="text-center">Loading...</td>
                          </tr>
                        ) : qcList.length === 0 ? (
                          <tr>
                            <td colSpan="20" className="text-center">No records found</td>
                          </tr>
                        ) : (
                          qcList.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.Year || row.year || ""}</td>
                              <td>{row.QcNo || row.qc_no || ""}</td>
                              <td>{row.QcDate || row.qc_date || ""}</td>
                              <td>
                                {row.ProdNo || row.prod_no || ""} <br /> {row.ProdDate || row.prod_date || ""}
                              </td>
                              <td>
                                {row.ItemNo || row.item_no || ""} <br /> {row.ItemCode || row.item_code || ""}
                              </td>
                              <td>{row.ItemDesc || row.item_desc || ""}</td>
                              <td>{row.OpNo || row.op_no || ""}</td>
                              <td>{row.OpName || row.op_name || ""}</td>
                              <td>{row.PartCode || row.part_code || ""}</td>
                              <td>{row.Ok || row.ok_qty || 0}</td>
                              <td>{row.Rej || row.reject_qty || 0}</td>
                              <td>{row.Rew || row.rework_qty || 0}</td>
                              <td>{row.Total || row.total_qty || 0}</td>
                              <td>{row.Hk || row.hk || ""}</td>
                              <td>{row.User || row.username || ""}</td>
                              <td><FaEdit /></td>
                              <td><MdDeleteForever /></td>
                              <td><FaEye /></td>
                              <td><MdMarkEmailRead /></td>
                            </tr>
                          ))
                        )}
                      </tbody>

                    </table>
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
export default InprocessInspectionList