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

            {/* Right: Bar Chart (Commented)
            <div className="dn-chart-card dn-chart-side">
              ... (hidden for brevity) ...
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;