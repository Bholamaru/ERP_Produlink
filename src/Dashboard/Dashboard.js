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

const statCards = [
  {
    id: "views",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    value: "$3.456K",
    label: "Total views",
    change: "0.43%",
    up: true,
  },
  {
    id: "profit",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    value: "$45,2K",
    label: "Total Profit",
    change: "4.35%",
    up: true,
  },
  {
    id: "product",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    value: "2.450",
    label: "Total Product",
    change: "2.59%",
    up: true,
  },
  {
    id: "users",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    value: "3.456",
    label: "Total Users",
    change: "0.95%",
    up: false,
  },
];

/* ─── Component ─── */
const Dashboard = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeRange, setActiveRange] = useState("Week");

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
          {/* ── Stat Cards ── */}
          <div className="dn-cards-row">
            {statCards.map((card) => (
              <div key={card.id} className="dn-stat-card">
                <div className="dn-stat-icon">{card.icon}</div>
                <div className="dn-stat-value">{card.value}</div>
                <div className="dn-stat-meta">
                  <span className="dn-stat-label">{card.label}</span>
                  <span className={`dn-stat-change ${card.up ? "up" : "down"}`}>
                    {card.change}
                    {card.up ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="dn-charts-row">
            {/* Left: Area Chart */}
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

            {/* Right: Bar Chart */}
            <div className="dn-chart-card dn-chart-side">
              <div className="dn-chart-header">
                <div>
                  <div className="dn-profit-title">Profit this<br />week</div>
                </div>
                <div className="dn-week-select">
                  This Week
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginLeft:4}}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="dn-bar-legends">
                <span className="dn-legend-dot blue-dot" /> <span className="dn-bar-legend-label">Sales</span>
                <span className="dn-legend-dot teal-dot" style={{ marginLeft: 14 }} /> <span className="dn-bar-legend-label">Revenue</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={profitData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={3}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e8edf3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#8fa3c0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#8fa3c0" }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0,20,40,60,80,100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: 12 }}
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                  />
                  <Bar dataKey="sales" fill="#4f8ef7" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="revenue" fill="#38c5c5" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;