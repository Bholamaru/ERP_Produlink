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

const profitData = [
  { label: "Mon", sales: 45, revenue: 60 },
  { label: "Tue", sales: 55, revenue: 75 },
  { label: "Wed", sales: 40, revenue: 55 },
  { label: "Thu", sales: 65, revenue: 80 },
  { label: "Fri", sales: 50, revenue: 65 },
  { label: "Sat", sales: 70, revenue: 85 },
  { label: "Sun", sales: 60, revenue: 78 },
];

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
  { id: 1, label: "Pending PO Approval", count: 2, color: "#7c3aed" },
  { id: 2, label: "Pending Sales Return QC", count: 7, color: "#6d28d9" },
  { id: 3, label: "Bill Passing (Purchase)", count: 181, color: "#5b21b6" },
  { id: 4, label: "Bill Passing (Jobwork)", count: 442, color: "#4c1d95" },
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

/* ─── Component ─── */
const Dashboard = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeRange, setActiveRange] = useState("Week");
  const [isSPVisible, setIsSPVisible] = useState(true);
  
  // Track visibility for each accordion section independently
  const [expandedSections, setExpandedSections] = useState({
    "Daily Sales": true, // Default open as per user request
  });

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
              <div key={card.id} className="dn-dept-card">
                <div className="dn-dept-icon" style={{ background: card.bg }}>
                  {card.icon}
                </div>
                <div className="dn-dept-label">
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Dashboard Content Body ── */}
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
                    {["Day", "Week", "Month"].map((r) => (
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
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f8ef7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38c5c5" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#38c5c5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e8edf3" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#8fa3c0" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#8fa3c0" }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0,20,40,60,80,100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: 13 }}
                      cursor={{ stroke: "#e8edf3", strokeWidth: 1 }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#4f8ef7" strokeWidth={2.5} fill="url(#gRevenue)" dot={{ r: 4, fill: "#4f8ef7", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                    <Area type="monotone" dataKey="sales" stroke="#38c5c5" strokeWidth={2.5} fill="url(#gSales)" dot={{ r: 4, fill: "#38c5c5", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Middle: Sales & Purchase Section */}
              <div className="dn-side-card dn-sales-purchase-card" style={{ marginTop: 24 }}>
                <div className="dn-side-header">
                  <div className="dn-side-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 8, color: "#94a3b8"}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                    Sales & Purchase
                  </div>
                  <div className="dn-header-actions">
                    <span className="dn-header-toggle" onClick={() => setIsSPVisible(!isSPVisible)} style={{ cursor: "pointer" }}>
                      {isSPVisible ? "Hide" : "Show"} <span>{isSPVisible ? "▲" : "▼"}</span>
                    </span>
                  </div>
                </div>

                {isSPVisible && (
                  <>
                    <div className="dn-filter-bar-complex">
                      <div className="dn-f-left">
                        <div className="dn-f-item">Plant: <select className="dn-mini-select"><option>SHARP</option></select></div>
                        <div className="dn-f-item">Month: <select className="dn-mini-select"><option>Apr-2026</option></select></div>
                        <div className="dn-f-item note">* Values are Assessable</div>
                        <div className="dn-radio-group">
                          <label><input type="radio" name="valunit" defaultChecked /> In RS.</label>
                          <label><input type="radio" name="valunit" /> In Lakh</label>
                        </div>
                      </div>
                      <div className="dn-f-right">
                        <div className="dn-f-item link">Yearly</div>
                        <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                      </div>
                    </div>

                    <div className="dn-sp-content">
                      <div className="dn-sp-chart-area">
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={spChartData} margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="dn-sp-table-area">
                        <table className="dn-erp-table">
                          <thead>
                            <tr>
                              <th style={{ width: 40 }}>#</th>
                              <th>Type</th>
                              <th style={{ textAlign: "right" }}>Assessable Value</th>
                              <th style={{ textAlign: "right" }}>Total Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {salesPurchaseRows.map(row => (
                              <tr key={row.id}>
                                <td>{row.id}</td>
                                <td className="type-cell">{row.type}</td>
                                <td className="val-cell">₹{row.assessable}</td>
                                <td className="val-cell">₹{row.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom: Accordion Data Sections styled as Cards */}
              <div className="dn-accordion-container" style={{ marginTop: 16 }}>
                {accordionList.map((label, idx) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={idx} className="dn-side-card" style={{ marginBottom: 12 }}>
                      <div className="dn-side-header">
                        <div className="dn-side-title">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: 8, color: "#94a3b8"}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                          {label}
                        </div>
                        <div className="dn-header-actions">
                          <span className="dn-header-toggle" onClick={() => toggleSection(label)} style={{ cursor: "pointer" }}>
                            {isOpen ? "Hide" : "Show"} <span>{isOpen ? "▲" : "▼"}</span>
                          </span>
                        </div>
                      </div>

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
                        <div className="dn-card-body dn-monthly-sales-body">
                          {/* Inner Filter Bar with Checkboxes/Radios */}
                          <div className="dn-inner-filter-bar complex">
                            <div className="dn-f-left">
                              <div className="dn-f-item sm">Plant <select className="dn-mini-select" style={{ minWidth: 70 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">Year <select className="dn-mini-select" style={{ minWidth: 90 }}><option>2026-2027</option></select></div>
                              
                              <div className="dn-radio-group mini">
                                <label><input type="radio" name="monval" defaultChecked /> Value</label>
                                <label><input type="radio" name="monval" /> Qty</label>
                              </div>

                              <div className="dn-checkbox-group mini">
                                <span className="dn-f-item sm">Type :</span>
                                <label><input type="checkbox" defaultChecked /> GST</label>
                                <label><input type="checkbox" defaultChecked /> Export</label>
                                <label><input type="checkbox" defaultChecked /> Jobwork</label>
                                <label><input type="checkbox" defaultChecked /> Scrap</label>
                              </div>
                            </div>
                            <div className="dn-f-right">
                              <a href="#" className="dn-link-sm">View More</a>
                              <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></button>
                            </div>
                          </div>

                          {/* Monthly Sales Bar Chart */}
                          <div className="dn-chart-content">
                            <ResponsiveContainer width="100%" height={260}>
                              <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <defs>
                                  <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#eee" />
                                <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} />
                                <YAxis axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} domain={[0, 300]} ticks={[0, 50, 100, 150, 200, 250, 300]} />
                                <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="sales" fill="url(#barGradientBlue)" radius={[2, 2, 0, 0]} barSize={24} stroke="#2563eb" strokeWidth={1} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Status Badge Blue */}
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                            <div className="dn-status-badge-blue">
                              Type : Monthly Sales : GST + Export + Jobwork + Scrap
                            </div>
                          </div>

                          {/* Monthly Summary Table */}
                          <div className="dn-monthly-table-wrapper">
                            <table className="dn-monthly-grid">
                              <thead>
                                <tr>
                                  {monthlySalesData.map(d => <th key={d.month}>{d.month.split("-")[0]}<br/>{d.month.split("-")[1]}</th>)}
                                  <th className="total-col">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {monthlySalesData.map((d, i) => <td key={i}>{d.sales || 0}</td>)}
                                  <td className="total-col">271.73</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Footer Info */}
                          <div className="dn-card-footer-info">
                            <div className="dn-footer-notes">
                              Values Include : <span className="blue-link">GST Sales</span>, <span className="blue-link">Export Sales</span>, <span className="blue-link">Job-work Sales</span>, <span className="blue-link">Scrap Sales</span>
                            </div>
                            <div className="dn-status-badge-red-text">
                              * Values are in Lacs
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;