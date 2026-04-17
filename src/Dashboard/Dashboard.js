import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./DashboardNew.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
  PieChart,
  Pie,
} from "recharts";

import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";

/* ─── Mock Data ─── */
const areaDataDay = [
  { label: "8am", revenue: 20, sales: 30 },
  { label: "10am", revenue: 35, sales: 42 },
  { label: "12pm", revenue: 28, sales: 55 },
  { label: "2pm", revenue: 50, sales: 38 },
  { label: "4pm", revenue: 42, sales: 62 },
  { label: "6pm", revenue: 65, sales: 48 },
  { label: "8pm", revenue: 55, sales: 70 },
  { label: "10pm", revenue: 48, sales: 58 },
];

const areaDataWeek = [
  { label: "Mon", revenue: 25, sales: 40 },
  { label: "Tue", revenue: 55, sales: 30 },
  { label: "Wed", revenue: 38, sales: 60 },
  { label: "Thu", revenue: 70, sales: 50 },
  { label: "Fri", revenue: 45, sales: 75 },
  { label: "Sat", revenue: 60, sales: 55 },
  { label: "Sun", revenue: 30, sales: 45 },
];

const areaDataMonth = [
  { label: "Apr 1", revenue: 20, sales: 32 },
  { label: "Apr 5", revenue: 40, sales: 55 },
  { label: "Apr 10", revenue: 30, sales: 45 },
  { label: "Apr 15", revenue: 60, sales: 30 },
  { label: "Apr 20", revenue: 50, sales: 68 },
  { label: "Apr 25", revenue: 75, sales: 52 },
  { label: "Apr 30", revenue: 65, sales: 80 },
];

// const profitData = [
//   { label: "Mon", sales: 45, revenue: 60 },
//   { label: "Tue", sales: 55, revenue: 75 },
//   { label: "Wed", sales: 40, revenue: 55 },
//   { label: "Thu", sales: 65, revenue: 80 },
//   { label: "Fri", sales: 50, revenue: 65 },
//   { label: "Sat", sales: 70, revenue: 85 },
//   { label: "Sun", sales: 60, revenue: 78 },
// ];

const deptCards = [
  {
    id: "financial",
    label: "Financial",
    color: "#4f8ef7",
    bg: "linear-gradient(135deg, #e8f0fe 0%, #c7d9fd 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: "purchase",
    label: "Purchase",
    color: "#a855f7",
    bg: "linear-gradient(135deg, #f3e8ff 0%, #ddb6fd 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    id: "ppc",
    label: "PPC",
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde08a 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "oee",
    label: "OEE",
    color: "#10b981",
    bg: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    id: "quality",
    label: "Quality",
    color: "#ef4444",
    bg: "linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: "stores",
    label: "Stores",
    color: "#06b6d4",
    bg: "linear-gradient(135deg, #cffafe 0%, #67e8f9 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 1 0-4 0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 1 0-4 0M5 8V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>
      </svg>
    ),
  },
  {
    id: "subcon",
    label: "Subcon",
    color: "#f97316",
    bg: "linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
];

const alertItems = [
  { id: 1, label: "Pending PO Approval", count: 2, color: "#dbeafe" },
  { id: 2, label: "Pending Sales Return QC", count: 7, color: "#93c5fd" },
  { id: 3, label: "Bill Passing (Purchase)", count: 181, color: "#3b82f6" },
  { id: 4, label: "Bill Passing (Jobwork)", count: 442, color: "#1d4ed8" },
];

const recordItems = [
  { id: 1, name: "Purchase Order", total: 0 },
  { id: 2, name: "Tax Invoice", total: 0 },
  { id: 3, name: "Jobwork Invoice", total: 12 },
  { id: 4, name: "GST Sales Return", total: 0 },
  { id: 5, name: "Debit Note : Purchase Return", total: 5 },
  { id: 6, name: "Debit Note : Sale Rate Diff", total: 0 },
  { id: 7, name: "Proforma Invoice", total: 8 },
  { id: 8, name: "57F4 Outward", total: 0 },
  { id: 9, name: "57F4 Inward", total: 0 },
  { id: 10, name: "Credit Note : Sale Return", total: 3 },
];

const salesPurchaseRows = [
  { id: 1, type: "Domestic Sales", assessable: "2,66,34,732.06", total: "3,14,28,984.09" },
  { id: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
  { id: 3, type: "Export Sales", assessable: "15,40,200.00", total: "18,20,000.00" },
  { id: 4, type: "Rate Diff", assessable: "0.00", total: "0.00" },
  { id: 5, type: "Scrap Sales", assessable: "5,38,160.00", total: "6,40,410.40" },
  { id: 6, type: "Total Sales", assessable: "2,87,13,092.06", total: "3,38,89,394.49" },
  { id: 7, type: "Sales Return", assessable: "16,664.02", total: "19,663.54" },
  { id: 8, type: "Purchase", assessable: "2,37,61,388.81", total: "2,80,38,415.23" },
];

const spChartData = [
  { name: "Domestic Sales", amount: 26634732 },
  { name: "Jobwork Sales", amount: 0 },
  { name: "Export Sales", amount: 1540200 },
  { name: "Rate Diff", amount: 0 },
  { name: "Scrap Sales", amount: 538160 },
  { name: "Total Sales", amount: 28713092 },
  { name: "Sales Return", amount: 16664 },
  { name: "Purchase", amount: 23761388 },
];

const accordionList = [
  "Daily Sales",
  "Monthly Sales",
  "Top 5 (Sales) Customer / Item",
  "Item wise Dispatch",
  "Business Plan",
  "State Wise Sales",
];

const ppcAccordionList = [
  "Monthly Production Chart",
  "Delivery Performance",
  "Monthly Schedule Vs. Dispatch",
  "Monthly Sales Order Vs. Dispatch",
  "Daily Production",
  "Today's Dispatch Plan",
  "Upcoming Dispatch",
];

const dailySalesData = [
  { day: 1, sales: 0 }, { day: 2, sales: 30 }, { day: 3, sales: 33 }, { day: 4, sales: 31 },
  { day: 5, sales: 9 }, { day: 6, sales: 42 }, { day: 7, sales: 32 }, { day: 8, sales: 28 },
  { day: 9, sales: 30 }, { day: 10, sales: 33 }, { day: 11, sales: 4 }, { day: 12, sales: 0 },
  { day: 13, sales: 0 }, { day: 14, sales: 0 }, { day: 15, sales: 0 }, { day: 16, sales: 0 },
  { day: 17, sales: 0 }, { day: 18, sales: 0 }, { day: 19, sales: 0 }, { day: 20, sales: 0 },
  { day: 21, sales: 0 }, { day: 22, sales: 0 }, { day: 23, sales: 0 }, { day: 24, sales: 0 },
  { day: 25, sales: 0 }, { day: 26, sales: 0 }, { day: 27, sales: 0 }, { day: 28, sales: 0 },
  { day: 29, sales: 0 }, { day: 30, sales: 0 }, { day: 31, sales: 0 },
];

const monthlySalesData = [
  { month: "Apr-2026", sales: 271.73 }, { month: "May-2026", sales: 0 }, { month: "Jun-2026", sales: 0 },
  { month: "Jul-2026", sales: 0 }, { month: "Aug-2026", sales: 0 }, { month: "Sep-2026", sales: 0 },
  { month: "Oct-2026", sales: 0 }, { month: "Nov-2026", sales: 0 }, { month: "Dec-2026", sales: 0 },
  { month: "Jan-2027", sales: 0 }, { month: "Feb-2027", sales: 0 }, { month: "Mar-2027", sales: 0 },
];

const top5SalesData = [
  { name: "SHARP LTD", value: 125.5 }, { name: "TECHNO CORP", value: 98.2 },
  { name: "GLOBAL MFG", value: 75.8 }, { name: "PRECISION INC", value: 45.0 },
  { name: "ALPHA IND", value: 32.1 },
];

const itemWiseDispatchData = [
  { sr: 1, customer: "AURANGABAD PRES SING GST", itemNo: "FG1001", itemCode: "520MC00712", itemDesc: "PINION (N)", qty: 6000, amount: 22920 },
  { sr: 2, customer: "SRI CHANIKYA TECH COMPONENTS GST", itemNo: "FG1001", itemCode: "520MC00712", itemDesc: "PINION (N)", qty: 5000, amount: 19000 },
  { sr: 3, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BRAKE) GST", itemNo: "FG1003", itemCode: "B2AW002260", itemDesc: "BLEEDER SCREW - REML", qty: 11000, amount: 48290 },
  { sr: 4, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-7 1) GST", itemNo: "FG1003", itemCode: "B2AW002260", itemDesc: "BLEEDER SCREW - REML", qty: 5000, amount: 21950 },
  { sr: 5, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-7", itemNo: "FG1005", itemCode: "520AW00212", itemDesc: "BLEEDER SCREW(M7)", qty: 7000, amount: 27020 },
];

const businessPlanData = [
  { name: "Bus. plan Qty", value: 0 },
  { name: "Schedule Qty", value: 0 },
  { name: "Invoice Qty", value: 0 },
  { name: "Sch Qty Actual", value: 13124665 },
  { name: "Inv Qty Actual", value: 2992500 },
];

const stateWiseSalesData = [
  { name: "MAHARASHTRA", value: 19877002.64, total: 23460244.98, percent: 73.15, fill: "#007bff" },
  { name: "GUJRAT", value: 5248981.78, total: 6193798.51, percent: 19.32, fill: "#f59e0b" },
  { name: "KARNATAKA", value: 1029637.16, total: 1214971.82, percent: 3.79, fill: "#0ea5e9" },
  { name: "UTTARAKHAND", value: 1017270.48, total: 1200379.18, percent: 3.74, fill: "#ef4444" },
];

const ppcDeliveryData = [
  { month: "APR-2026", schedule: 13124665, dispatch: 2948140 },
  { month: "MAY-2026", schedule: 0, dispatch: 0 },
  { month: "JUN-2026", schedule: 0, dispatch: 0 },
];

const ppcMonthlySchData = [
  { sr: 1, itemNo: "FG1023", itemCode: "S2DP01702B", desc: "EXTENSION 17 RH", planQty: 1000, dispatchQty: 0, balQty: 1000, per: 0 },
  { sr: 2, itemNo: "FG1029", itemCode: "S2CW00712B", desc: "D-NUT-YAMAHA(2GS)", planQty: 3000, dispatchQty: 0, balQty: 3000, per: 0 },
  { sr: 3, itemNo: "FG1032", itemCode: "530CW00207", desc: "D-NUT P/C MATT BLACK", planQty: 25000, dispatchQty: 0, balQty: 25000, per: 0 },
  { sr: 4, itemNo: "FG1033", itemCode: "52CW00412B", desc: "D-NUT(5.35MM)POWDER COATING", planQty: 1000, dispatchQty: 0, balQty: 1000, per: 0 },
  { sr: 5, itemNo: "FG1035", itemCode: "520DP00502", desc: "EXTENSION (14X18.5)", planQty: 4000, dispatchQty: 0, balQty: 4000, per: 0 },
];

const ppcSalesOrderData = [
  { sr: 1, custPo: "1100042376", itemNo: "FG1696", itemCode: "F2PH04202B", desc: "VALVE RETAINER K301 Ø33 THK 2.5", poQty: 200, dispatch: 200, bal: 0, per: 100 },
  { sr: 2, custPo: "1100042224", itemNo: "FG1711", itemCode: "52H569143B", desc: "OUTER TUBE-2WH REAR", poQty: 20, dispatch: 0, bal: 20, per: 0 },
  { sr: 3, custPo: "1100042106", itemNo: "FG1702", itemCode: "F2HL05902B", desc: "OIL LOCK COLLAR K 406 - Ø33", poQty: 50, dispatch: 0, bal: 50, per: 0 },
  { sr: 4, custPo: "SEPL 25-26/307", itemNo: "FG1074", itemCode: "S2PA01902B", desc: "TUBE RING J1A OPTION", poQty: 100, dispatch: 0, bal: 100, per: 0 },
  { sr: 5, custPo: "1100042376", itemNo: "FG1697", itemCode: "F2HL05802B", desc: "OIL LOCK COLLAR K301", poQty: 120, dispatch: 0, bal: 120, per: 0 },
];

const ppcDailyProdData = [
  { sr: 1, date: "10/04/2026", machine: "TR1 TROUB 25 1", shift: "SECOND 10HRS", item: "FG1014 PRIMARY PISTON FOR TMC", prodQty: 2796, rework: 0, reject: 0 },
  { sr: 2, date: "10/04/2026", machine: "TR4 TROUB 25 4", shift: "SECOND 10HRS", item: "FG1263 CAP OIL LOCK J1D FF (10 mm taper)", prodQty: 1588, rework: 0, reject: 0 },
  { sr: 3, date: "10/04/2026", machine: "TR7 TROUB 25 7", shift: "SECOND 10HRS", item: "FG1018 SECONDARY PISTON FOR TMC", prodQty: 1315, rework: 0, reject: 0 },
  { sr: 4, date: "10/04/2026", machine: "TR11 TROUB 32 1", shift: "SECOND 10HRS", item: "FG1145 WHEEL CYLINDER PISTON (Dia 25.4), ATUL", prodQty: 1040, rework: 0, reject: 0 },
  { sr: 5, date: "10/04/2026", machine: "TR19 TROUB 25 19", shift: "SECOND 10HRS", item: "FG1083 CAP OIL LOCK-DF01 (F)", prodQty: 850, rework: 0, reject: 0 },
];

const ppcTodayDispatchData = [
  { sr: 1, docNo: "SCH/25-26/001", docDate: "11/04/2026", itemCode: "520MC00712", desc: "PINION (N)", qty: 2000, customer: "AURANGABAD PRES" },
  { sr: 2, docNo: "SCH/25-26/002", docDate: "11/04/2026", itemCode: "B2AW002260", desc: "BLEEDER SCREW", qty: 5000, customer: "ENDURANCE TECH" },
];

const ppcUpcomingDispatchData = [
  { sr: 1, docNo: "SCH/25-26/005", docDate: "15/04/2026", itemCode: "S2PA01902B", desc: "TUBE RING J1A", qty: 1500, customer: "SEPL" },
  { sr: 2, docNo: "SCH/25-26/008", docDate: "18/04/2026", itemCode: "F2HL05802B", desc: "OIL LOCK COLLAR", qty: 3000, customer: "TECHNO CORP" },
];

const ppcMonthlyProdData = [
  { sr: 1, machineGroup: "MACHINING", qty: 1707810, mt: 96.78 },
];

const ppcMonthlyProdChartData = [
  { name: "MACHINING", mt: 96.78 },
];

/* ─── Component ─── */
const Dashboard = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeDept, setActiveDept] = useState("financial");
  const [activeRange, setActiveRange] = useState("Week");
  const [isSPVisible, setIsSPVisible] = useState(false);
  
  // Track visibility for each accordion section independently
  const [expandedSections, setExpandedSections] = useState({});

  // Business Plan Filters State
  const [bpTimeMode, setBpTimeMode] = useState("Monthly");
  const [bpCustomerWise, setBpCustomerWise] = useState(false);
  const [bpSearchBy, setBpSearchBy] = useState("Quantity");

  // State Wise Sales Filters State
  const [stateWiseType, setStateWiseType] = useState("Top 5 State");

  const toggleSection = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    return () => document.body.classList.remove("side-nav-open");
  }, [sideNavOpen]);

  const areaData =
    activeRange === "Day"
      ? areaDataDay
      : activeRange === "Month"
      ? areaDataMonth
      : areaDataWeek;

  return (
    <div className="dashboard">
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="mainContainer">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

        <main className={`mainContent dn-main ${sideNavOpen ? "shifted" : ""}`}>
          {/* ── Department Cards ── */}
          <div className="dn-dept-cards-row">
            {deptCards.map((card) => (
              <div 
                key={card.id} 
                className={`dn-dept-card ${activeDept === card.id ? "active" : ""}`}
                onClick={() => setActiveDept(card.id)}
              >
                <div className="dn-dept-icon" style={{ background: card.bg }}>
                  {card.icon}
                </div>
                <div className="dn-dept-label">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
          {activeDept === "financial" && (
          <div className="dn-content-grid">
            
            {/* Left Column: Side Tables */}
            <div className="dn-side-column">
              
              {/* Alerts Card */}
              <div className="dn-side-card dn-alerts-card">
                <div className="dn-side-header">
                  <div className="dn-side-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 8}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                    Alerts
                  </div>
                  <a href="#" className="dn-side-link">Add New Alert</a>
                </div>
                
                <div className="dn-filter-strip">
                  <label>Plant</label>
                  <select className="dn-mini-select">
                    <option>SHARP</option>
                  </select>
                </div>

                <div className="dn-alert-list">
                  {alertItems.map(item => (
                    <div key={item.id} className="dn-alert-item">
                      <span className="dn-alert-label">{item.label}</span>
                      <span className="dn-alert-badge" style={{ background: item.color }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Records Card (Full/Scrollable) */}
              <div className="dn-side-card dn-records-card full-list">
                <div className="dn-side-header">
                  <div className="dn-side-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 8}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                    Total Record's
                  </div>
                  <a href="#" className="dn-side-link">View More</a>
                </div>

                <div className="dn-filter-strip row-gap">
                  <div className="dn-filter-group">
                    <select className="dn-mini-select"><option>SHARP</option></select>
                    <label>Month</label>
                    <select className="dn-mini-select"><option>Apr-2026</option></select>
                  </div>
                  <div className="dn-action-group">
                    <button className="dn-icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
                    <button className="dn-icon-btn excel"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></button>
                  </div>
                </div>

                <div className="dn-records-table-container scrollable">
                  <table className="dn-records-table">
                    <thead>
                      <tr>
                        <th>Doc. Name</th>
                        <th style={{ textAlign: "right" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recordItems.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td style={{ textAlign: "right" }}>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column: Main Content Area */}
            <div className="dn-main-column">
              
              {/* Top: Total Revenue Chart */}
              <div className="dn-chart-card dn-chart-main">
                <div className="dn-chart-header">
                  <div className="dn-chart-legends">
                    <span className="dn-legend-dot blue-dot" />
                    <div>
                      <div className="dn-legend-title blue-text">Total Revenue</div>
                      <div className="dn-legend-sub">12.04.2022 - 12.05.2022</div>
                    </div>
                    <span className="dn-legend-dot teal-dot" style={{ marginLeft: 20 }} />
                    <div>
                      <div className="dn-legend-title teal-text">Total Sales</div>
                      <div className="dn-legend-sub">12.04.2022 - 12.05.2022</div>
                    </div>
                  </div>

                  <div className="dn-range-btns">
                    {["Day", "Week", "Month"].map(r => (
                      <button 
                        key={r} 
                        className={`dn-range-btn ${activeRange === r ? "active" : ""}`}
                        onClick={() => setActiveRange(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="dn-chart-wrapper main">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={areaData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38c5c5" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#38c5c5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="sales" stroke="#38c5c5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Accordion Sections Dashboard Area */}
              <div className="dn-accordion-container">
                {accordionList.map((label) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                      <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                        <div className="dn-acc-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{marginRight: 10}}>
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <span>{isOpen ? "Hide" : "Show"}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}>
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </div>
                      </div>

                      {/* Financial Specific Section Bodies */}
                      {isOpen && label === "Sales & Purchase" && (
                        null
                      )}

                      {isOpen && label === "Daily Sales" && (
                        <div className="dn-card-body dn-daily-sales-body">
                          {/* Inner Filter Bar */}
                          <div className="dn-inner-filter-bar">
                            <div className="dn-f-left">
                              <div className="dn-f-item sm">Plant <select className="dn-mini-select"><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">Sales Month <select className="dn-mini-select"><option>Apr-2026</option></select></div>
                              <select className="dn-mini-select"><option>ALL</option></select>
                              <div className="dn-f-item note red">* Values are in Lacs</div>
                            </div>
                            <div className="dn-f-right">
                              <a href="#" className="dn-link-sm">View More</a>
                              <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                            </div>
                          </div>

                          {/* Daily Sales Bar Chart */}
                          <div className="dn-chart-content">
                            <ResponsiveContainer width="100%" height={260}>
                              <BarChart data={dailySalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <defs>
                                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4f8ef7" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#eee" />
                                <XAxis dataKey="day" axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} interval={0} />
                                <YAxis axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} domain={[0, 50]} ticks={[0, 10, 20, 30, 40, 50]} />
                                <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="sales" fill="url(#barGradient)" radius={[2, 2, 0, 0]} barSize={12} />
                                <Legend verticalAlign="bottom" height={36} content={() => (
                                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: 11, color: "#333", gap: 8, marginTop: 10 }}>
                                    <span style={{ width: 14, height: 14, background: "#4f8ef7", display: "inline-block" }}></span>
                                    Sales
                                  </div>
                                )} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Footer Info */}
                          <div className="dn-card-footer-info">
                            <div className="dn-footer-notes">
                              Values Include : <span className="blue-link">GST Sales</span>, <span className="blue-link">Export Sales</span>, <span className="blue-link">Job-work Sales</span>
                            </div>
                            <div className="dn-status-badge-orange">
                              Daily Sales : Apr-2026
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Monthly Sales" && (
                        <div className="dn-card-body dn-daily-sales-body">
                          {/* Inner Filter Bar */}
                          <div className="dn-inner-filter-bar">
                            <div className="dn-f-left">
                              <div className="dn-f-item sm">Plant <select className="dn-mini-select"><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">Sales Month <select className="dn-mini-select"><option>Apr-2026</option></select></div>
                              <select className="dn-mini-select"><option>ALL</option></select>
                              <div className="dn-checkbox-group mini">
                                <span className="dn-f-item sm">Type :</span>
                                <label><input type="checkbox" defaultChecked /> GST</label>
                                <label><input type="checkbox" defaultChecked /> Export</label>
                                <label><input type="checkbox" defaultChecked /> Jobwork</label>
                              </div>
                            </div>
                            <div className="dn-f-right">
                               <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density monthly-table">
                              <thead>
                                <tr>
                                  <th style={{ width: 40 }}>Sr.</th>
                                  <th>Month</th>
                                  <th style={{ textAlign: "right" }}>Assessable Value</th>
                                  <th style={{ textAlign: "right" }}>Total Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {monthlySalesData.map((item, idx) => (
                                  <tr key={idx}>
                                    <td style={{ textAlign: "center" }}>{idx+1}</td>
                                    <td>{item.month}</td>
                                    <td style={{ textAlign: "right" }}>{item.sales.toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>{(item.sales * 1.18).toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Top 5 (Sales) Customer / Item" && (
                         <div className="dn-card-body dn-top5-body">
                           <div className="dn-inner-filter-bar">
                             <div className="dn-f-left">
                               <div className="dn-f-item sm">Plant <select className="dn-mini-select"><option>SHARP</option></select></div>
                               <div className="dn-f-item sm">Year <select className="dn-mini-select"><option>2026-2027</option></select></div>
                               <div className="dn-radio-group mini">
                                 <label><input type="radio" name="top5t" defaultChecked /> Customer</label>
                                 <label><input type="radio" name="top5t" /> Item</label>
                               </div>
                             </div>
                           </div>
                           <div className="dn-chart-content">
                             <ResponsiveContainer width="100%" height={260}>
                               <BarChart layout="vertical" data={top5SalesData} margin={{ left: 40, right: 30 }}>
                                 <XAxis type="number" hide />
                                 <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                 <Tooltip cursor={{ fill: '#f8fafc' }} />
                                 <Bar dataKey="value" fill="#007bff" radius={[0, 4, 4, 0]} barSize={20}>
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 10, fontWeight: 800, fill: '#1a2340' }} />
                                 </Bar>
                               </BarChart>
                             </ResponsiveContainer>
                           </div>
                         </div>
                      )}

                      {isOpen && label === "Item wise Dispatch" && (
                        <div className="dn-card-body dn-dispatch-body">
                          <div className="dispatch-filters-scroll">
                            <div className="dispatch-filters">
                              <table className="dn-filter-grid">
                                <tbody>
                                  <tr>
                                    <td>Plant <select className="dn-mini-select full"><option>SHARP</option></select></td>
                                    <td>From Date <input type="text" className="dn-mini-input" defaultValue="12/03/2026" /></td>
                                    <td>To Date <input type="text" className="dn-mini-input" defaultValue="11/04/2026" /></td>
                                    <td>Item Code/Desc <input type="text" className="dn-mini-input" style={{ width: '100px' }} /></td>
                                    <td><button className="dn-btn-search">Search</button></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density dispatch-table">
                              <thead>
                                <tr>
                                  <th style={{ width: 40 }}>Sr.</th>
                                  <th>Customer Name</th>
                                  <th>Item No</th>
                                  <th>Item Code</th>
                                  <th>Item Description</th>
                                  <th style={{ textAlign: "right" }}>Qty</th>
                                  <th style={{ textAlign: "right" }}>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {itemWiseDispatchData.map((item) => (
                                  <tr key={item.sr}>
                                    <td style={{ textAlign: "center" }}>{item.sr}</td>
                                    <td style={{ fontSize: 10 }}>{item.customer}</td>
                                    <td>{item.itemNo}</td>
                                    <td>{item.itemCode}</td>
                                    <td style={{ fontSize: 10 }}>{item.itemDesc}</td>
                                    <td style={{ textAlign: "right" }}>{item.qty.toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="dn-dispatch-summary-footer">
                             <div className="dn-summary-row">
                               <span className="dn-f-item sm">Total Qty: <span className="blue-link">34,000</span></span>
                               <span className="dn-f-item sm">Total Amount: <span className="blue-link">1,39,180.00</span></span>
                             </div>
                             <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Business Plan" && (
                        <div className="dn-card-body dn-bp-body">
                          <div className="dn-inner-filter-bar complex bp-filters">
                            <div className="dn-bp-left">
                              <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select>
                              <div className="dn-radio-group mini">
                                <label><input type="radio" name="bpt" checked={bpTimeMode === "Yearly"} onChange={() => setBpTimeMode("Yearly")} /> Yearly</label>
                                <label><input type="radio" name="bpt" checked={bpTimeMode === "Monthly"} onChange={() => setBpTimeMode("Monthly")} /> Monthly</label>
                              </div>
                              <select className="dn-mini-select" style={{ width: 100 }}><option>2026-2027</option></select>
                              {bpTimeMode === "Monthly" && <select className="dn-mini-select" style={{ width: 100 }}><option>ALL</option></select>}
                            </div>
                            <div className="dn-bp-center">
                              <div className="dn-bp-search-by">
                                <span className="dn-f-item sm">Search By : </span>
                                <div className="dn-radio-group mini">
                                  <label><input type="radio" name="bps" checked={bpSearchBy === "Quantity"} onChange={() => setBpSearchBy("Quantity")} /> Quantity</label>
                                  <label><input type="radio" name="bps" checked={bpSearchBy === "Value"} onChange={() => setBpSearchBy("Value")} /> Value</label>
                                </div>
                              </div>
                              <label className="dn-f-item sm" style={{ cursor: "pointer" }}>
                                <input type="checkbox" checked={bpCustomerWise} onChange={(e) => setBpCustomerWise(e.target.checked)} /> Customer Wise
                              </label>
                            </div>
                            <div className="dn-bp-right">
                              <div className="dn-bp-actions">
                                <button className="dn-btn-search">Search</button>
                                <button className="dn-btn-search primary">Summary (Month Wise)</button>
                                <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                              </div>
                            </div>
                          </div>

                          <div className="dn-bp-chart-wrapper">
                            <ResponsiveContainer width="100%" height={280}>
                              <BarChart data={businessPlanData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                  {businessPlanData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index < 3 ? "url(#bpGradient)" : "#10b981"} />
                                  ))}
                                  <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#1a2340' }} />
                                </Bar>
                                <defs>
                                  <linearGradient id="bpGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7db4ff" />
                                    <stop offset="100%" stopColor="#007bff" />
                                  </linearGradient>
                                </defs>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "State Wise Sales" && (
                        <div className="dn-card-body dn-state-body">
                          <div className="dn-inner-filter-bar">
                            <div className="dn-f-left">
                              <div className="dn-f-item">Plant: <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item">Year: <select className="dn-mini-select" style={{ width: 100 }}><option>2026-2027</option></select></div>
                              <div className="dn-f-item">Month: <select className="dn-mini-select" style={{ width: 100 }}><option>ALL</option></select></div>
                              <div className="dn-f-item" style={{ marginLeft: 8 }}>Select Type: </div>
                              <div className="dn-radio-group mini">
                                <label><input type="radio" name="stateType" checked={stateWiseType === "Top 5 State"} onChange={() => setStateWiseType("Top 5 State")} /> Top 5 State</label>
                                <label><input type="radio" name="stateType" checked={stateWiseType === "Other State"} onChange={() => setStateWiseType("Other State")} /> Other State</label>
                              </div>
                            </div>
                            <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                          </div>

                          <div className="dn-state-chart-wrapper">
                            <ResponsiveContainer width="100%" height={320}>
                              <PieChart>
                                <Pie
                                  data={stateWiseSalesData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, percent }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = 25 + outerRadius;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                      <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                        {`(${(percent * 100).toFixed(2)}% ) ${name}`}
                                      </text>
                                    );
                                  }}
                                  labelLine={{ stroke: '#38bdf8', strokeWidth: 1 }}
                                >
                                  {stateWiseSalesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
          )}

          {activeDept === "ppc" && (
            <div className="dn-ppc-view fade-in">
               <div className="dn-accordion-container">
                 {ppcAccordionList.map((label) => {
                   const isOpen = expandedSections[label];
                   return (
                     <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                       <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                         <div className="dn-acc-left">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{marginRight: 10}}>
                             <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>
                           </svg>
                           {label}
                         </div>
                         <div className="dn-acc-right">
                           <span>{isOpen ? "Hide" : "Show"}</span>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}>
                             <polyline points="6 9 12 15 18 9"/>
                           </svg>
                         </div>
                       </div>

                       {isOpen && label === "Monthly Production Chart" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar complex">
                             <div className="dn-f-left">
                               <div className="dn-f-item sm">Plant : <select className="dn-mini-select"><option>SHARP</option></select></div>
                               <div className="dn-f-item sm">
                                  <input type="checkbox" defaultChecked /> Select Month : 
                                  <select className="dn-mini-select" style={{ marginLeft: 5 }}><option>Apr-2026</option></select>
                               </div>
                               <div className="dn-f-item sm">
                                  Select Date : <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} />
                                  <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80, marginLeft: 5 }} />
                               </div>
                               <div className="dn-f-item sm">
                                  Search : 
                                  <label style={{ marginLeft: 5, fontSize: 11 }}><input type="radio" name="prodSearch" defaultChecked /> Prod: Mt.</label>
                                  <label style={{ marginLeft: 5, fontSize: 11 }}><input type="radio" name="prodSearch" /> Qty.</label>
                               </div>
                             </div>
                             <div className="dn-f-right">
                               <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                             </div>
                           </div>

                           <div className="dn-side-by-side-layout">
                             <div className="dn-chart-half">
                               <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 10 }}>Production in Mt.</div>
                               <ResponsiveContainer width="100%" height={260}>
                                 <BarChart data={ppcMonthlyProdChartData} margin={{ left: 20 }}>
                                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                   <Tooltip />
                                   <Bar dataKey="mt" fill="#007bff" barSize={35}>
                                      <LabelList dataKey="mt" position="top" style={{ fontSize: 11, fontWeight: 800, fill: '#1a2340' }} />
                                   </Bar>
                                 </BarChart>
                               </ResponsiveContainer>
                             </div>

                             <div className="dn-table-half">
                               <table className="dn-erp-table high-density">
                                 <thead>
                                   <tr>
                                     <th style={{ width: 40 }}>#</th>
                                     <th>Machine Group</th>
                                     <th style={{ textAlign: "right" }}>Qty.</th>
                                     <th style={{ textAlign: "right" }}>Mt.</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                   {ppcMonthlyProdData.map(item => (
                                     <tr key={item.sr}>
                                       <td style={{ textAlign: "center" }}>{item.sr}</td>
                                       <td>{item.machineGroup}</td>
                                       <td style={{ textAlign: "right" }}>{item.qty.toLocaleString()}</td>
                                       <td style={{ textAlign: "right" }}>{item.mt.toFixed(2)}</td>
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                             </div>
                           </div>

                           <div className="dn-footer-filter-bar" style={{ marginTop: 16, borderTop: '1px solid #e2e8f0', paddingTop: 12, display: 'flex', justifyContent: 'center', gap: 20 }}>
                              <label style={{ fontSize: 12, fontWeight: 600 }}><input type="radio" name="grpBy" defaultChecked /> Machine Group</label>
                              <div className="dn-f-item sm">
                                <select className="dn-mini-select"><option>ALL</option></select>
                              </div>
                              <label style={{ fontSize: 12, fontWeight: 600 }}><input type="radio" name="grpBy" /> User Group</label>
                           </div>
                         </div>
                       )}

                       {isOpen && label === "Delivery Performance" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar">
                             <div className="dn-f-left">
                               <div className="dn-f-item sm">Year: <select className="dn-mini-select"><option>2026-2027</option></select></div>
                               <div className="dn-radio-group mini">
                                 <label><input type="radio" name="ppct" defaultChecked /> Schedule</label>
                                 <label><input type="radio" name="ppct" /> Sales Order</label>
                               </div>
                               <div className="dn-f-item sm">Type: <select className="dn-mini-select"><option>Quantity</option></select></div>
                               <button className="dn-btn-search" style={{ height: 28, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 5, backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                 Search Option
                                </button>
                             </div>
                             <div className="dn-f-right">
                               <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                             </div>
                           </div>

                           <div className="dn-chart-content">
                              <ResponsiveContainer width="100%" height={280}>
                                 <BarChart data={ppcDeliveryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                                    <Bar dataKey="schedule" fill="#007bff" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="dispatch" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                                 </BarChart>
                              </ResponsiveContainer>
                              <div className="dn-chart-custom-legend" style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: -10, marginBottom: 15 }}>
                                 <div className="dn-legend-item" style={{ backgroundColor: '#007bff', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Schedule / Sales Order</div>
                                 <div className="dn-legend-item" style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Dispatch / Sales</div>
                              </div>
                           </div>

                           <div className="dn-table-scroll-container">
                             <table className="dn-erp-table high-density">
                               <thead>
                                 <tr>
                                   <th style={{ width: 40 }}>Sr.</th>
                                   <th>Type</th>
                                   <th style={{ textAlign: "right" }}>APR-2026</th>
                                   <th style={{ textAlign: "right" }}>MAY-2026</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 <tr><td style={{ textAlign: "center" }}>1</td><td>Schedule</td><td style={{ textAlign: "right" }}>13124665</td><td style={{ textAlign: "right" }}>0</td></tr>
                                 <tr><td style={{ textAlign: "center" }}>2</td><td>Invoice</td><td style={{ textAlign: "right" }}>2948140</td><td style={{ textAlign: "right" }}>0</td></tr>
                                 <tr><td style={{ textAlign: "center" }}>3</td><td>Per</td><td style={{ textAlign: "right" }}>22.46</td><td style={{ textAlign: "right" }}>0</td></tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       )}

                       {isOpen && label === "Monthly Schedule Vs. Dispatch" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar complex">
                             <div className="dn-f-left">
                               <div className="dn-f-item sm">Month <select className="dn-mini-select"><option>APR-2026</option></select></div>
                               <div className="dn-f-item sm">Customer <select className="dn-mini-select"><option>ALL Customer</option></select></div>
                               <div className="dn-f-item sm">Item Group <select className="dn-mini-select"><option>ALL</option></select></div>
                               <div className="dn-f-item sm">Type <select className="dn-mini-select"><option>Qty</option></select></div>
                             </div>
                             <div className="dn-f-right">
                               <div className="dn-bp-actions">
                                 <span className="dn-summary-badge blue">Sch : 13124665</span>
                                 <span className="dn-summary-badge green">Dis : 2948140</span>
                                 <span className="dn-status-badge-red" style={{ padding: '4px 8px', borderRadius: 4 }}>Bal : 10176525</span>
                                 <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                               </div>
                             </div>
                           </div>
                           
                           <div className="dn-table-scroll-container">
                             <table className="dn-erp-table high-density">
                               <thead>
                                 <tr>
                                   <th style={{ width: 40 }}>Sr.</th>
                                   <th>Item No</th>
                                   <th>Item Code</th>
                                   <th>Item Desc</th>
                                   <th style={{ textAlign: "right" }}>Plan Qty</th>
                                   <th style={{ textAlign: "right" }}>Dispatch Qty</th>
                                   <th style={{ textAlign: "right" }}>Bal Qty</th>
                                   <th style={{ textAlign: "right" }}>(%)</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {ppcMonthlySchData.map(item => (
                                   <tr key={item.sr}>
                                     <td style={{ textAlign: "center" }}>{item.sr}</td>
                                     <td>{item.itemNo}</td>
                                     <td>{item.itemCode}</td>
                                     <td style={{ fontSize: 10 }}>{item.desc}</td>
                                     <td style={{ textAlign: "right" }}>{item.planQty.toLocaleString()}</td>
                                     <td style={{ textAlign: "right" }}>{item.dispatchQty.toLocaleString()}</td>
                                     <td style={{ textAlign: "right" }}>{item.balQty.toLocaleString()}</td>
                                     <td style={{ textAlign: "right" }}>{item.per}%</td>
                                   </tr>
                                 ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="dn-ppc-charts-row">
                               <div className="dn-ppc-main-pie">
                                 <ResponsiveContainer width="100%" height={240}>
                                   <PieChart>
                                     <Pie 
                                        data={[{name: 'Dis', value: 2948140, fill: '#007bff'}, {name: 'Bal', value: 10176525, fill: '#f59e0b'}]} 
                                        dataKey="value" innerRadius={0} outerRadius={90} paddingAngle={0} stroke="none"
                                        labelLine={false}
                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                          const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                          const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                          return (
                                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                              {`${(percent * 100).toFixed(2)}%`}
                                            </text>
                                          );
                                        }}
                                     />
                                     <Tooltip />
                                   </PieChart>
                                 </ResponsiveContainer>
                                 <div className="dn-chart-custom-legend" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 15 }}>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                      <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 12, height: 12, backgroundColor: '#007bff' }}></div> Dis 2948140
                                      </div>
                                      <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 12, height: 12, backgroundColor: '#f59e0b' }}></div> Bal 10176525
                                      </div>
                                    </div>
                                 </div>
                                 <div className="dn-status-badge-green" style={{ margin: '0 auto', width: 'fit-content' }}>Schedule Completed : 22.46 %</div>
                               </div>
                               <div className="dn-ppc-class-pies">
                                  {["A", "B", "C", "D"].map(cls => {
                                    let clsData = [];
                                    let legendText = "";
                                    if (cls === "A") {
                                      clsData = [{name: "Empty", value: 100, fill: "#f1f5f9"}];
                                      legendText = "(Sch : 4992850)";
                                    } else if (cls === "B") {
                                      clsData = [{name: 'Dis', value: 358156, fill: '#007bff'}, {name: 'Bal', value: 1029493, fill: '#f59e0b'}];
                                      legendText = "(Sch : 1387649)";
                                    } else if (cls === "C") {
                                      clsData = [{name: 'Dis', value: 256520, fill: '#007bff'}, {name: 'Bal', value: 1109529, fill: '#f59e0b'}];
                                      legendText = "(Sch : 1365049)";
                                    } else {
                                      clsData = [{name: 'Dis', value: 1193200, fill: '#007bff'}, {name: 'Bal', value: 4185917, fill: '#f59e0b'}];
                                      legendText = "(Sch : 5379117)";
                                    }

                                    return (
                                      <div key={cls} className="dn-class-pie-box" style={{ padding: '8px 4px' }}>
                                        <div className="dn-f-item sm" style={{ justifyContent: 'center', marginBottom: 5, fontSize: 10, fontWeight: 700 }}>Item Class {cls} {legendText}</div>
                                        <ResponsiveContainer width={150} height={150}>
                                          <PieChart>
                                            <Pie 
                                                data={clsData} 
                                                dataKey="value" 
                                                outerRadius={cls === "A" ? 45 : 60} 
                                                innerRadius={cls === "A" ? 35 : 0}
                                                stroke="none"
                                                labelLine={false}
                                                label={cls === "A" ? null : ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                                  return (
                                                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 9, fontWeight: 700 }}>
                                                      {`${(percent * 100).toFixed(1)}%`}
                                                    </text>
                                                  );
                                                }}
                                            />
                                          </PieChart>
                                        </ResponsiveContainer>
                                        {cls !== "A" && (
                                          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <div style={{ fontSize: 9, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 4 }}>
                                              <div style={{ width: 8, height: 8, backgroundColor: '#007bff' }}></div> Dis {clsData[0].value}
                                            </div>
                                            <div style={{ fontSize: 9, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 4 }}>
                                              <div style={{ width: 8, height: 8, backgroundColor: '#f59e0b' }}></div> Bal {clsData[1].value}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                               </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Monthly Sales Order Vs. Dispatch" && (
                          <div className="dn-card-body dn-ppc-body">
                            <div className="dn-inner-filter-bar complex">
                              <div className="dn-f-left">
                                <div className="dn-f-item sm">From Date <input type="text" className="dn-mini-input" defaultValue="12/03/2026" style={{ width: 80 }} /></div>
                                <div className="dn-f-item sm">To Date <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} /></div>
                                <button className="dn-btn-search" style={{ height: 28, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 4, marginRight: 8, whiteSpace: 'nowrap' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Search
                                </button>
                                <div className="dn-f-item sm">Customer <select className="dn-mini-select"><option>ALL Customer</option></select></div>
                                <div className="dn-f-item sm">Type <select className="dn-mini-select"><option>Quantity</option></select></div>
                                <div className="dn-f-item sm">Item Group <select className="dn-mini-select"><option>ALL</option></select></div>
                              </div>
                              <div className="dn-f-right">
                                <div className="dn-bp-actions" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
                                  <span className="dn-summary-badge blue">Sch : 4190</span>
                                  <span className="dn-summary-badge green">Dis : 2100</span>
                                  <span className="dn-status-badge-red" style={{ padding: '4px 8px', borderRadius: 4, display: 'inline-block', lineHeight: 1 }}>Bal : 2090</span>
                                  <button className="dn-icon-btn small excel" style={{ flexShrink: 0 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                                </div>
                              </div>


                            </div>


                            <div className="dn-table-scroll-container">
                              <table className="dn-erp-table high-density">
                                <thead>
                                  <tr>
                                    <th style={{ width: 40 }}>#</th>
                                    <th>Cust PoNo</th>
                                    <th>Item No</th>
                                    <th>Item Code</th>
                                    <th>Description</th>
                                    <th style={{ textAlign: "right" }}>Po. Qty</th>
                                    <th style={{ textAlign: "right" }}>Dispatch</th>
                                    <th style={{ textAlign: "right" }}>Balance</th>
                                    <th style={{ textAlign: "right" }}>(%)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ppcSalesOrderData.map(item => (
                                    <tr key={item.sr}>
                                      <td style={{ textAlign: "center" }}>{item.sr}</td>
                                      <td>{item.custPo}</td>
                                      <td>{item.itemNo}</td>
                                      <td>{item.itemCode}</td>
                                      <td style={{ fontSize: 10 }}>{item.desc}</td>
                                      <td style={{ textAlign: "right" }}>{item.poQty}</td>
                                      <td style={{ textAlign: "right" }}>{item.dispatch}</td>
                                      <td style={{ textAlign: "right" }}>{item.bal}</td>
                                      <td style={{ textAlign: "right" }}>{item.per}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="dn-ppc-charts-row">
                               <div className="dn-ppc-main-pie">
                                 <ResponsiveContainer width="100%" height={240}>
                                   <PieChart>
                                     <Pie 
                                        data={[{name: 'Dis', value: 2100, fill: '#007bff'}, {name: 'Bal', value: 2090, fill: '#f59e0b'}]} 
                                        dataKey="value" innerRadius={0} outerRadius={90} paddingAngle={0} stroke="none"
                                        labelLine={false}
                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                          const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                          const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                          return (
                                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                              {`${(percent * 100).toFixed(2)}%`}
                                            </text>
                                          );
                                        }}
                                     />
                                     <Tooltip />
                                   </PieChart>
                                 </ResponsiveContainer>
                                 <div className="dn-chart-custom-legend" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 15 }}>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                      <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 12, height: 12, backgroundColor: '#007bff' }}></div> Dispatch 2100
                                      </div>
                                      <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 12, height: 12, backgroundColor: '#f59e0b' }}></div> Balance 2090
                                      </div>
                                    </div>
                                 </div>
                                 <div className="dn-status-badge-green" style={{ margin: '0 auto', width: 'fit-content' }}>Schedule Completed : 50.12 %</div>
                               </div>
                               <div className="dn-ppc-class-pies">
                                  {["A", "B", "C", "D"].map(cls => {
                                    const soQty = cls === "A" ? 4190 : 0;
                                    return (
                                      <div key={cls} className="dn-class-pie-box" style={{ padding: '8px 4px' }}>
                                        <div className="dn-f-item sm" style={{ justifyContent: 'center', marginBottom: 5, fontSize: 10, fontWeight: 700 }}>Item Class {cls} (SO Qty : {soQty})</div>
                                        <ResponsiveContainer width={150} height={150}>
                                          <PieChart>
                                            <Pie 
                                                data={[{name: "Empty", value: 100, fill: "#f1f5f9"}]} 
                                                dataKey="value" 
                                                outerRadius={45} 
                                                innerRadius={35}
                                                stroke="none"
                                            />
                                          </PieChart>
                                        </ResponsiveContainer>
                                        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 10 }}>
                                          <div style={{ fontSize: 9, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 8, height: 8, backgroundColor: '#007bff' }}></div> Dis 0
                                          </div>
                                          <div style={{ fontSize: 9, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 8, height: 8, backgroundColor: '#f59e0b' }}></div> Bal 0
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                               </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Daily Production" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar complex">
                              <div className="dn-f-left">
                                <div className="dn-f-item sm">Plant: <select className="dn-mini-select"><option>SHARP</option></select></div>
                                <div className="dn-f-item sm">From Date <input type="text" className="dn-mini-input" defaultValue="10/04/2026" style={{ width: 80 }} /></div>
                                <div className="dn-f-item sm">to Date <select className="dn-mini-select"><option>11/04/2026</option></select></div>
                                <select className="dn-mini-select"><option>ALL</option></select>
                                <span className="dn-f-item sm" style={{ marginLeft: 8 }}>Item Code / Desc : <input type="text" className="dn-mini-input" style={{ width: 100 }} /></span>
                                <button className="dn-btn-search">Search</button>
                              </div>
                              <div className="dn-f-right">
                              </div>
                            </div>

                           <div className="dn-table-scroll-container">
                             <table className="dn-erp-table high-density">
                               <thead>
                                 <tr>
                                   <th style={{ width: 40 }}>Sr.</th>
                                   <th>Date</th>
                                   <th>Machine</th>
                                   <th>Shift</th>
                                   <th>Item</th>
                                   <th style={{ textAlign: "right" }}>Prod Qty</th>
                                   <th style={{ textAlign: "right" }}>Rework Qty</th>
                                   <th style={{ textAlign: "right" }}>Reject Qty</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {ppcDailyProdData.map(item => (
                                   <tr key={item.sr}>
                                     <td style={{ textAlign: "center" }}>{item.sr}</td>
                                     <td style={{ fontSize: 10 }}>{item.date}</td>
                                     <td style={{ fontSize: 10 }}>{item.machine}</td>
                                     <td style={{ fontSize: 10 }}>{item.shift}</td>
                                     <td style={{ fontSize: 10 }}>{item.item}</td>
                                     <td style={{ textAlign: "right" }}>{item.prodQty.toLocaleString()}</td>
                                     <td style={{ textAlign: "right" }}>{item.rework}</td>
                                     <td style={{ textAlign: "right" }}>{item.reject}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </table>
                           </div>
                         </div>
                       )}
                       {isOpen && label === "Today's Dispatch Plan" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar">
                              <div className="dn-f-left">
                                <span className="dn-f-item sm">Date: <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} /></span>
                                <button className="dn-btn-search">Search</button>
                              </div>
                              <div className="dn-f-right">
                                <div className="dn-bp-actions" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span className="dn-summary-badge blue">Sch : 0</span>
                                  <span className="dn-summary-badge green">Dis : 0</span>
                                  <span className="dn-status-badge-red" style={{ padding: '4px 8px', borderRadius: 4, display: 'inline-block', lineHeight: 1 }}>Bal : 0</span>
                                </div>
                              </div>
                           </div>
                           
                           <div style={{ padding: '10px 15px', color: '#94a3b8', fontSize: 11, borderBottom: '1px solid #e2e8f0' }}>
                             No Data Found !!
                           </div>
                           
                           <div style={{ height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 8 }}>
                                <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                  <div style={{ width: 12, height: 12, backgroundColor: '#007bff' }}></div> Dispatch Qty 0
                                </div>
                                <div className="dn-legend-item" style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 5 }}>
                                  <div style={{ width: 12, height: 12, backgroundColor: '#f59e0b' }}></div> Bal Qty 0
                                </div>
                              </div>
                              <div className="dn-status-badge-green" style={{ margin: '0 auto', width: 'fit-content', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>00</div>
                           </div>
                         </div>
                       )}

                       {isOpen && label === "Upcoming Dispatch" && (
                         <div className="dn-card-body dn-ppc-body">
                           <div className="dn-inner-filter-bar complex" style={{ paddingBottom: 10 }}>
                              <div className="dn-f-left" style={{ alignItems: 'flex-end', gap: 15 }}>
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 600 }}>
                                         <input type="radio" name="dateType" defaultChecked style={{ margin: 0 }} /> Plan Date
                                         <input type="radio" name="dateType" style={{ margin: 0, marginLeft: 4 }} /> Due Date
                                      </div>
                                      <div style={{ display: 'flex', gap: 4 }}>
                                         <input type="text" className="dn-mini-input" defaultValue="10/04/2026" style={{ width: 80 }} />
                                         <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} />
                                      </div>
                                 </div>
                                 
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <div style={{ fontSize: 10, fontWeight: 600, color: '#334155' }}>Type</div>
                                      <select className="dn-mini-select" style={{ width: 60 }}><option>ALL</option></select>
                                 </div>
                                 
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <div style={{ fontSize: 10, fontWeight: 600, color: '#334155' }}>Filter By</div>
                                      <select className="dn-mini-select" style={{ width: 60 }}><option>ALL</option></select>
                                 </div>
                                 
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: '#334155' }}>
                                         <input type="checkbox" style={{ margin: 0 }} /> Customer :
                                      </div>
                                      <input type="text" className="dn-mini-input" placeholder="Name..." style={{ width: 140 }} />
                                 </div>

                                 <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: '#334155' }}>
                                         <input type="checkbox" style={{ margin: 0 }} /> Item
                                      </div>
                                      <div style={{ display: 'flex', gap: 4 }}>
                                         <input type="text" className="dn-mini-input" placeholder="Enter Item Code..." style={{ width: 140 }} />
                                         <button className="dn-btn-search" style={{ height: 24, padding: '0 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Search
                                         </button>
                                      </div>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="dn-table-scroll-container" style={{ minHeight: 250 }}>
                             <table className="dn-erp-table high-density" style={{ width: '100%' }}>
                               <thead>
                                 <tr>
                                   <th style={{ width: 40, textAlign: 'center', whiteSpace: 'nowrap' }}>Sr.</th>
                                   <th>Type</th>
                                   <th>Item No</th>
                                   <th>Item Desc</th>
                                   <th>Customer</th>
                                   <th>PO No</th>
                                   <th style={{ textAlign: "right" }}>Plan Qty</th>
                                   <th style={{ textAlign: "right" }}>Dis Qty</th>
                                   <th style={{ textAlign: "right" }}>Bal Qty</th>
                                   <th style={{ textAlign: "center" }}>Plan Date</th>
                                   <th style={{ textAlign: "center" }}>Due Date</th>
                                   <th style={{ textAlign: "center" }}>Delay Days</th>
                                 </tr>
                               </thead>
                               <tbody>
                                  {/* Empty Data Placeholder from screenshot */}
                               </tbody>
                             </table>
                           </div>
                           
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8' }}>Total Records :0</div>
                              <button className="dn-icon-btn small excel" style={{ gap: 6, padding: '4px 10px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 11, fontWeight: 600, width: 'auto' }}>
                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Export to Excel
                              </button>
                           </div>
                         </div>
                       )}
                     </div>
                   );
                 })}
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;