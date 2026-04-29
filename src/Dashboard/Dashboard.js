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
  LineChart,
  Line,
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
  Label,
} from "recharts";

import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";

/*     Mock Data     */
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
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
        <path d="M5 8h14M5 8a2 2 0 1 0-4 0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 1 0-4 0M5 8V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
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
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
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
  { id: 3, name: "Jobwork Invoice", total: 0 },
  { id: 4, name: "GST Sales Return", total: 0 },
  { id: 5, name: "Debit Note : Purchase Return", total: 0 },
  { id: 6, name: "Debit Note : Sale Rate Diff", total: 0 },
  { id: 7, name: "Proforma Invoice", total: 0 },
  { id: 8, name: "57F4 Outward", total: 0 },
  { id: 9, name: "57F4 Inward", total: 0 },
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
  "Sales & Purchase",
  "Daily Sales",
  "Monthly Sales",
  "Top 5 (Sales) Customer / Item",
  "Item wise Dispatch",
  "Business Plan",
  "State Wise Sales",
];

const storeTabs = [
  "Financial",
  "Purchase",
  "PPC",
  "OEE",
  "Quality",
  "Stores",
  "Subcon",
];

const storeMenuItems = [];

const ppcAccordionList = [
  "Monthly Production Chart",
  "Delivery Performance",
  "Monthly Schedule Vs. Dispatch",
  "Monthly Sales Order Vs. Dispatch",
  "Daily Production",
  "Today's Dispatch Plan",
  "Upcoming Dispatch",
];

  // Daily Sales will be handled in state inside the component


const oeeAccordionList = [
  "Machine Utilization (Groupwise)",
  "Operator Efficiency",
  "Shiftwise OEE",
  "OEE Graph",
];

const oeePieData = [
  { name: "PRODUCTION", value: 100, color: "#16a34a" },
];

const oeeMachineGroups = [
  "DRILLING", "MANUAL", "MILLING", "SECOND OPERATION",
  "SPM", "TAPPING", "TROUB", "VMC"
];

const shiftwiseOeeRowLabels = [
  "EFFICIENCY LOSS", "SETTING CHANGE", "NO TOOL", "NO POWER", "JIGS AND FIX",
  "NO OPERATOR", "SPEED LOSS", "STARTUP LOSS", "BREAK DOWN LOSS", "MAINTENANCE LOSS",
  "QC LOSS", "MEASUR AND AJ", "MINOR STOPPAGE", "LINE ORG LOSS", "TOOL CHANGE",
  "LOGISTIC LOSS", "TOTAL SHIFT HRS", "TOTAL LOSS IN HRS", "NO OF SETTING", "LOSS %",
  "M/C UTILIZATION %"
];

const shiftwiseOeeMachines = [
  "02 SPINDLE (Srimathi Machine)", "TROUB 25 1", "TROUB 25 2", "TROUB 25 3", "TROUB 25 4", "TROUB 25 5",
  "TROUB 25 6", "TROUB 25 7", "TROUB 25 8", "TROUB 25 9", "TROUB 25 10", "TROUB 32 1", "TROUB 32 2",
  "TROUB 32 3", "TROUB 32 4", "TROUB 32 5", "TROUB 32 6", "TROUB 32 7", "TROUB 32 8", "TROUB 25 19",
  "TROUB 25 20", "GRINDING 1", "GRINDING 2", "CENTERLESS GRINDING 1", "MILLING 1", "MILLING 2", "MILLING 3",
  "THREAD ROLLING 1", "THREAD ROLLING 2", "CENTERLESS GRINDING 2", "DRILLING 1", "DRILLING 2", "DRILLING 3",
  "DRILLING 4", "DRILLING 5", "DRILLING 6", "DRILLING 7", "DRILLING 8", "SECOND OPRATION 1",
  "SECOND OPRATION 2", "SECOND OPRATION 3", "SECOND OPRATION 4", "SECOND OPRATION 5", "SECOND OPRATION 6",
  "SECOND OPRATION 7", "SECOND OPRATION 8", "SECOND OPRATION 9", "SECOND OPRATION 10",
  "SPM DRILLING 1", "SPM DRILLING 2", "SPM PCD 1", "SPM MILLING 1", "SPM TROUB 1", "SPM TROUB 2",
  "SPM TAPPING 1", "LATHE 1", "LATHE 2", "LATHE 3", "LATHE 4", "LATHE 5", "TAPPING1",
  "SPM FACING AND CHAMPRING", "INDUCTION1", "CENTERLESS GRINDING 3", "CENTERLESS GRINDING 4",
  "MANAUL", "SECOND OPERATION M/C", "PRES MACHINE", "VMC", "COLT", "COLT1", "SPM DEBBRING", "BG1",
  "PCD DEBURRING 1", "PCD DEBURRING-2", "CNC (Srimathi Machine)", "CNC (Srimathi Machine)1",
  "FINAL INSPECTION", "Visual", "1.5 PCD SPM MACHINE", "SPM DRILLING MB", "TROUB 25 14",
  "TROUB 25 21", "TROUB 25 33", "TROUB 25 41", "TROUB 25 51", "TROUB 25 61", "TROUB 25 71",
  "TROUB 25 81", "TROUB 25 91", "TROUB 25 101", "SECOND OPERATION AY 1", "SECOND OPERATION AY 2",
  "SECOND OPERATION AY 3", "CNC (Srimathi Machine)2", "CNC (Srimathi Machine)3", "TROUB 25 11",
  "TROUB 25 12", "TROUB 25 13", "CNC (Srimathi Machine)4", "SPM M7", "SPM M8 BLEEDER DRILING",
  "SPM M8 BLEEDER DRILLING", "TROUB 25 21", "TROUB 25 22", "TROUB 25 23", "TROUB 25 24", "TROUB 25 25",
  "CENTER LESS GRINDING 5", "SURFACE GRINDING", "TROUB 25 26", "TROUB 25 27", "TROUB 25 28",
  "TROUB 32 29", "TROUB 32 30", "TROUB 25 32", "TROUB894", "TROUB 25 31",
  "CNC (Srimathi Machine)5", "CNC (Srimathi Machine)6", "CNC (Srimathi Machine)7",
  "CNC (Srimathi Machine)8", "Total", "Total LOSS"
];

const purchaseAccordionList = [];

const purchaseOrdersData = [
  { sr: 1, series: "RM", total: 8, amount: 21845 },
  { sr: 2, series: "CONSUMABLE", total: 3, amount: 47289 },
  { sr: 3, series: "SERVICE", total: 4, amount: 29840 },
  { sr: 4, series: "ASSET", total: 0, amount: 0 },
  { sr: 5, series: "JOBWORK", total: 41, amount: 5118 },
  { sr: 6, series: "IMPORT", total: 0, amount: 0 },
];

const purchasePieData = [
  { name: "CONSUMABLE", value: 45.43, color: "#f59e0b" },
  { name: "SERVICE", value: 28.67, color: "#dc2626" },
  { name: "RM", value: 20.99, color: "#3b82f6" },
  { name: "JOBWORK", value: 4.92, color: "#6366f1" },
  { name: "ASSET", value: 0, color: "#10b981" },
  { name: "IMPORT", value: 0, color: "#ec4899" },
];

const monthlyPurchaseChartData = [
  { month: "Apr-2026", value: 237.61 },
  { month: "May-2026", value: 0 },
  { month: "Jun-2026", value: 0 },
  { month: "Jul-2026", value: 0 },
  { month: "Aug-2026", value: 0 },
  { month: "Sep-2026", value: 0 },
  { month: "Oct-2026", value: 0 },
  { month: "Nov-2026", value: 0 },
  { month: "Dec-2026", value: 0 },
  { month: "Jan-2027", value: 0 },
  { month: "Feb-2027", value: 0 },
  { month: "Mar-2027", value: 0 },
];

const dailyPurchaseChartData = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  let value = 0;
  if (day === 2) value = 800000;
  if (day === 3) value = 3200000;
  if (day === 4) value = 5000000;
  if (day === 5) value = 250000;
  if (day === 6) value = 3150000;
  if (day === 7) value = 2400000;
  if (day === 8) value = 2500000;
  if (day === 9) value = 3000000;
  if (day === 10) value = 2800000;
  if (day === 11) value = 80000;
  return { day: day.toString(), value };
});

const dailyActiveDispatchesData = [
  { day: "1", count: 12 }, { day: "2", count: 18 }, { day: "3", count: 24 }, { day: "4", count: 22 },
  { day: "5", count: 30 }, { day: "6", count: 22 }, { day: "7", count: 28 }, { day: "8", count: 35 },
  { day: "9", count: 32 }, { day: "10", count: 42 }, { day: "11", count: 38 }, { day: "12", count: 15 },
  { day: "13", count: 20 }, { day: "14", count: 27 }, { day: "15", count: 33 },
];

const purchaseCostDetailedData = [
  { month: "Jan-26", value: 110 }, { month: "Feb-26", value: 135 }, { month: "Mar-26", value: 182 },
  { month: "Apr-26", value: 245 }, { month: "May-26", value: 145 }, { month: "Jun-26", value: 205 },
  { month: "Jul-26", value: 228 }, { month: "Aug-26", value: 202 },
];

const top5DetailedSuppliers = [
  { sr: 1, name: "S0053 | VISHWA SAMRUDHI INDUSTRIES", qty: 120410, amount: 9388097.5, per: "39.75%" },
  { sr: 2, name: "54 | SHAKAMBHARI ENTERPRISES", qty: 390997, amount: 7525697.1, per: "31.87%" },
  { sr: 3, name: "S0052 | TUBE INVESTMENT OF INDIA LTD", qty: 32576.64, amount: 5038059.7955, per: "21.33%" },
  { sr: 4, name: "000161 | Ayush Enterprises (C-242)", qty: 335564, amount: 1540067.17, per: "6.52%" },
  { sr: 5, name: "S0051 | S K FASTENERS", qty: 252700, amount: 124093, per: "0.53%" },
];



const grnValueSummaryData = [
  { name: "FG", value: 9318357.27, color: "#f59e0b" },
  { name: "RM", value: 14426157.3, color: "#ef4444" },
  { name: "Consumable", value: 16854.24, color: "#3b82f6" },
  { name: "Others", value: 450200, color: "#06b6d4" },
  { name: "Spare", value: 120500.5, color: "#6366f1" },
];

const poCategoriesTableData = [
  { id: "CAT-10", name: "Raw Material", count: 27, load: "$22,025" },
  { id: "CAT-11", name: "Job Work", count: 18, load: "$98,396" },
  { id: "CAT-12", name: "Job Work", count: 50, load: "$32,260" },
  { id: "CAT-13", name: "Asset Logistics", count: 40, load: "$82,722" },
  { id: "CAT-14", name: "Job Work", count: 8, load: "$127,266" },
  { id: "CAT-15", name: "Consumable", count: 31, load: "$66,353" },
];

const detailedGrnValuesData = [
  { id: "GRN-88103", itemNo: "ITM-X1237", desc: "GEAR LUBRICANT", group: "CONSUMABLE", qty: 238, rate: 47.11, amount: 11200.00, badge: 'blue' },
  { id: "GRN-88104", itemNo: "ITM-X7491", desc: "STEEL SHAFT A2", group: "RAW MATERIAL", qty: 388, rate: 56.16, amount: 20876.00, badge: 'red' },
  { id: "GRN-88105", itemNo: "ITM-X4727", desc: "WRA HOUSING", group: "CONSUMABLE", qty: 460, rate: 81.70, amount: 38884.00, badge: 'blue' },
  { id: "GRN-88106", itemNo: "ITM-X7822", desc: "GEAR LUBRICANT", group: "SPARE PARTS", qty: 175, rate: 58.27, amount: 11196.00, badge: 'yellow' },
  { id: "GRN-88107", itemNo: "ITM-X5769", desc: "STEEL SHAFT A2", group: "RAW MATERIAL", qty: 464, rate: 24.46, amount: 50399.00, badge: 'red' },
  { id: "GRN-88108", itemNo: "ITM-X1520", desc: "HDPE PLASTIC RESIN", group: "RAW MATERIAL", qty: 331, rate: 76.97, amount: 25858.00, badge: 'red' },
  { id: "GRN-88109", itemNo: "ITM-X1117", desc: "BEARING SET X", group: "CONSUMABLE", qty: 453, rate: 85.26, amount: 6832.00, badge: 'blue' },
  { id: "GRN-88110", itemNo: "ITM-X9129", desc: "STEEL SHAFT A2", group: "HARDWARE", qty: 445, rate: 39.63, amount: 5051.00, badge: 'yellow' },
  { id: "GRN-88117", itemNo: "ITM-X8907", desc: "BEARING SET X", group: "SPARE PARTS", qty: 467, rate: 11.61, amount: 12431.00, badge: 'yellow' },
  { id: "GRN-88118", itemNo: "ITM-X5567", desc: "BUTTON SCREW M-5 X 12", group: "RAW MATERIAL", qty: 469, rate: 37.29, amount: 11604.00, badge: 'red' },
  { id: "GRN-88119", itemNo: "ITM-X5986", desc: "BEARING SET X", group: "CONSUMABLE", qty: 199, rate: 14.44, amount: 29602.00, badge: 'blue' },
  { id: "GRN-88120", itemNo: "ITM-X4698", desc: "WRA HOUSING", group: "CONSUMABLE", qty: 384, rate: 98.77, amount: 1340.00, badge: 'blue' },
  { id: "GRN-88121", itemNo: "ITM-X5920", desc: "HDPE PLASTIC RESIN", group: "SPARE PARTS", qty: 231, rate: 48.24, amount: 50501.00, badge: 'yellow' },
  { id: "GRN-88122", itemNo: "ITM-X2829", desc: "BEARING SET X", group: "RAW MATERIAL", qty: 488, rate: 9.82, amount: 35617.00, badge: 'red' },
  { id: "GRN-88123", itemNo: "ITM-X4083", desc: "WRA HOUSING", group: "SPARE PARTS", qty: 494, rate: 63.79, amount: 33673.00, badge: 'yellow' },
  { id: "GRN-88124", itemNo: "ITM-X5369", desc: "BUTTON SCREW M-5 X 12", group: "HARDWARE", qty: 74, rate: 15.13, amount: 45277.00, badge: 'yellow' },
];

const grnValueDetailsData = [
  { sr: 1, itemNo: "CONGN1261", desc: "PLAIN WASHER M-12(1/2\")", mgroup: "Consumable", group: "GENRAL", qty: 20, amt: 24 },
  { sr: 2, itemNo: "CONGN12497", desc: "BUTTON SCREW M-5 X 12", mgroup: "Consumable", group: "GENRAL", qty: 20, amt: 49.6 },
  { sr: 3, itemNo: "CONGN1312", desc: "M-5 X 20 ALLEN BOLT", mgroup: "Consumable", group: "GENRAL", qty: 30, amt: 57.84 },
  { sr: 4, itemNo: "CONMC1292", desc: "M-5 X 25 ALLEN BOLT", mgroup: "Consumable", group: "MACHINE SPARE", qty: 30, amt: 61.92 },
  { sr: 5, itemNo: "CONGN12735", desc: "W.P. PAPER 400 JAWAN CUMI", mgroup: "Consumable", group: "GENRAL", qty: 5, amt: 71.4 },
  { sr: 6, itemNo: "CONGN12543", desc: "ALLEN KEY M-4 UNBRAKO", mgroup: "Consumable", group: "GENRAL", qty: 10, amt: 82.96 },
  { sr: 7, itemNo: "CONGN1077", desc: "M-5 X 16 ALLEN BOLT", mgroup: "Consumable", group: "GENRAL", qty: 50, amt: 89.8 },
  { sr: 8, itemNo: "CONGN1244", desc: "ALLEN KEY 5.00 MM", mgroup: "Consumable", group: "GENRAL", qty: 10, amt: 101.2 }
];


const operatorEfficiencyData = [
  { name: "JADHAV VINOD [1]", efficiency: 265 },
  { name: "BAPU GAYKE [2]", efficiency: 238 },
  { name: "AMIT MAGRE [3]", efficiency: 235 },
  { name: "TULSHIRAM [4]", efficiency: 228 },
  { name: "SHYAM [5]", efficiency: 210 },
  { name: "SHYAM DEGALWADE [6]", efficiency: 185 },
  { name: "RAVINDRA GAJABE [7]", efficiency: 165 },
  { name: "ASHISH MORE [8]", efficiency: 162 },
  { name: "RAVI [9]", efficiency: 155 },
  { name: "JAY SHAH [10]", efficiency: 152 },
  { name: "RAMESH NIKALJE [11]", efficiency: 148 },
  { name: "GUDIYA PCD SPM [12]", efficiency: 142 },
  { name: "SHARQ CNC [13]", efficiency: 135 },
  { name: "SANTOSH H [14]", efficiency: 130 },
  { name: "JITENDRA [15]", efficiency: 125 },
  { name: "SAMEIR I [16]", efficiency: 120 },
  { name: "SIDDIQUI E [17]", efficiency: 115 },
  { name: "RAEES [18]", efficiency: 110 },
  { name: "ALTAB [19]", efficiency: 105 },
  { name: "MUNNA DEBRING [20]", efficiency: 100 },
  { name: "MORE [21]", efficiency: 95 },
  { name: "AY [22]", efficiency: 140 },
  { name: "MAHIPAL [23]", efficiency: 138 },
  { name: "POONAM TAPPING [24]", efficiency: 135 },
  { name: "SHAHID CNC [25]", efficiency: 132 },
  { name: "SACHIN [26]", efficiency: 130 },
  { name: "OM PRAKASH [27]", efficiency: 128 },
  { name: "MANGESH H MANKAR [28]", efficiency: 125 },
  { name: "NANDU BAHURIYA [29]", efficiency: 122 },
  { name: "RAJU [30]", efficiency: 120 },
  { name: "UMESH SPM [31]", efficiency: 118 },
  { name: "NEW (L) [32]", efficiency: 115 },
  { name: "SHIVA [33]", efficiency: 112 },
  { name: "NEW [34]", efficiency: 110 },
  { name: "MUNAJIR CNC [35]", efficiency: 108 },
  { name: "ANITA BAI [36]", efficiency: 105 },
  { name: "DHARMENDRA YADAV [37]", efficiency: 102 },
  { name: "ASHOK THILLARE [38]", efficiency: 98 },
  { name: "KAILU CNC [39]", efficiency: 95 },
  { name: "SALMAN PATHAN [40]", efficiency: 92 },
  { name: "GAUTAM [41]", efficiency: 88 },
  { name: "IMRAN [42]", efficiency: 85 },
  { name: "ANKET [43]", efficiency: 82 },
  { name: "DONGRE [44]", efficiency: 80 },
];

const inwardStockData = [
  { name: "Adjustment", value: 45, color: "#f59e0b" },
  { name: "Opening", value: 85, color: "#64748b" },
  { name: "Production", value: 120, color: "#f97316" },
  { name: "Purchase GRN", value: 340, color: "#3b82f6" },
  { name: "Return Inward", value: 65, color: "#0ea5e9" },
  { name: "Transfer In", value: 40, color: "#ef4444" },
];

const outwardStockData = [
  { name: "Damage", value: 15, color: "#f59e0b" },
  { name: "Issue", value: 55, color: "#8b5cf6" },
  { name: "Return", value: 25, color: "#3b82f6" },
  { name: "Sales", value: 180, color: "#ef4444" },
  { name: "Sample", value: 10, color: "#64748b" },
  { name: "Transfer Out", value: 35, color: "#0ea5e9" },
];

const minMaxAlertsData = [
  { location: "RM", itemCode: "ITEM-1000", desc: "Industrial Specification Compo...", min: "144 KG", reorder: "164 KG", max: "576 KG", stock: "771 KG", wo: 4, variance: 627, status: "OVERSTOCK" },
  { location: "RM", itemCode: "ITEM-1001", desc: "Industrial Specification Compo...", min: "149 LTR", reorder: "169 LTR", max: "596 LTR", stock: "206 LTR", wo: 7, variance: 57, status: "HEALTHY" },
  { location: "Spares", itemCode: "ITEM-1002", desc: "Industrial Specification Compo...", min: "34 LTR", reorder: "54 LTR", max: "136 LTR", stock: "323 LTR", wo: 24, variance: 289, status: "OVERSTOCK" },
  { location: "Hardware", itemCode: "ITEM-1003", desc: "Industrial Specification Compo...", min: "33 LTR", reorder: "53 LTR", max: "132 LTR", stock: "66 LTR", wo: 71, variance: 33, status: "HEALTHY" },
  { location: "RM", itemCode: "ITEM-1004", desc: "Industrial Specification Compo...", min: "187 LTR", reorder: "207 LTR", max: "748 LTR", stock: "84 LTR", wo: 44, variance: -123, status: "CRITICAL" },
  { location: "Consumable", itemCode: "ITEM-1005", desc: "Industrial Specification Compo...", min: "35 BX", reorder: "55 BX", max: "140 BX", stock: "643 BX", wo: 54, variance: 608, status: "OVERSTOCK" },
];

const materialChallanLogs = [
  { no: "CHL-88200", itemNo: "IT001", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "308 PCS", rate: "$236", value: "$72,688" },
  { no: "CHL-88201", itemNo: "IT002", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "101 PCS", rate: "$80", value: "$8,080" },
  { no: "CHL-88202", itemNo: "IT003", target: "Detailed Issue log for engineer...", grp: "HARDWARE", qty: "44 PCS", rate: "$231", value: "$10,164" },
  { no: "CHL-88203", itemNo: "IT004", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "73 PCS", rate: "$158", value: "$11,534" },
  { no: "CHL-88204", itemNo: "IT005", target: "Detailed Issue log for engineer...", grp: "SPARE", qty: "299 PCS", rate: "$162", value: "$48,438" },
];

const machineOeeData = [
  { name: "PCD DRILL 4.5", avail: 45, quality: 5, perf: 45, oee: 2 },
  { name: "SPM PRO J15", avail: 25, quality: 3, perf: 65, oee: 1 },
  { name: "DRILLING-01", avail: 44, quality: 1, perf: 85, oee: 1 },
  { name: "DRILLING-02", avail: 28, quality: 9, perf: 135, oee: 3 },
  { name: "DRILLING-03", avail: 30, quality: 8, perf: 185, oee: 2 },
  { name: "DRILLING-04", avail: 15, quality: 7, perf: 110, oee: 1 },
  { name: "DRILLING-05", avail: 14, quality: 6, perf: 155, oee: 1 },
  { name: "DRILLING-06", avail: 16, quality: 5, perf: 235, oee: 2 },
  { name: "DRILLING-07", avail: 12, quality: 4, perf: 105, oee: 1 },
  { name: "DRILLING-08", avail: 13, quality: 3, perf: 95, oee: 1 },
  { name: "DRILLING-09", avail: 11, quality: 2, perf: 125, oee: 1 },
  { name: "DRILLING-10", avail: 18, quality: 1, perf: 145, oee: 1 },
  { name: "MILLING-01", avail: 15, quality: 8, perf: 115, oee: 1 },
  { name: "MILLING-02", avail: 14, quality: 7, perf: 95, oee: 1 },
  { name: "MILLING-03", avail: 16, quality: 6, perf: 135, oee: 1 },
  { name: "MILLING-04", avail: 12, quality: 5, perf: 85, oee: 1 },
  { name: "MILLING-05", avail: 13, quality: 4, perf: 105, oee: 1 },
  { name: "SPM-01", avail: 24, quality: 3, perf: 265, oee: 2 },
  { name: "SPM-02", avail: 22, quality: 2, perf: 235, oee: 2 },
  { name: "SPM-03", avail: 20, quality: 1, perf: 215, oee: 2 },
  { name: "SPM-04", avail: 40, quality: 8, perf: 115, oee: 4 },
  { name: "TAPPING-01", avail: 15, quality: 5, perf: 135, oee: 1 },
  { name: "TAPPING-02", avail: 14, quality: 6, perf: 115, oee: 1 },
  { name: "TAPPING-03", avail: 18, quality: 4, perf: 95, oee: 1 },
  { name: "VMC-01", avail: 85, quality: 90, perf: 385, oee: 30 },
  { name: "VMC-02", avail: 15, quality: 5, perf: 215, oee: 1 },
  { name: "TROUB-01", avail: 14, quality: 4, perf: 195, oee: 1 },
  { name: "TROUB-02", avail: 18, quality: 3, perf: 175, oee: 1 },
  { name: "MANUAL-01", avail: 12, quality: 12, perf: 105, oee: 2 },
  { name: "MANUAL-02", avail: 16, quality: 10, perf: 135, oee: 2 },
];

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          dy={12}
          textAnchor="middle"
          fill="#1e293b"
          style={{ fontSize: 9, fontWeight: 700 }}
        >
          {word}
        </text>
      ))}
    </g>
  );
};

const subconAccordionList = [
  "57F4 Challan Ageing",
];

const subconAgeingTableData = [
  { sr: 1, outNo: "OC/26-27/001", outDate: "10/04/2026", series: "OC", suppCode: "V001", supplierName: "PRIME INDUSTRIES", status: "Open", out: 100, inn: 0, bal: 100, unit: "NOS", ageDays: 1, view: "View" },
];

const monthlySalesData = [
  { month: "Apr-2026", sales: 271.73 },
  { month: "May-2026", sales: 0 },
  { month: "Jun-2026", sales: 0 },
  { month: "Jul-2026", sales: 0 },
  { month: "Aug-2026", sales: 0 },
  { month: "Sep-2026", sales: 0 },
  { month: "Oct-2026", sales: 0 },
  { month: "Nov-2026", sales: 0 },
  { month: "Dec-2026", sales: 0 },
  { month: "Jan-2027", sales: 0 },
  { month: "Feb-2027", sales: 0 },
  { month: "Mar-2027", sales: 0 },
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
  { sr: 1, custPo: "1100042376", itemNo: "FG1696", itemCode: "F2PH04202B", desc: "VALVE RETAINER K301  33 THK 2.5", poQty: 200, dispatch: 200, bal: 0, per: 100 },
  { sr: 2, custPo: "1100042224", itemNo: "FG1711", itemCode: "52H569143B", desc: "OUTER TUBE-2WH REAR", poQty: 20, dispatch: 0, bal: 20, per: 0 },
  { sr: 3, custPo: "1100042106", itemNo: "FG1702", itemCode: "F2HL05902B", desc: "OIL LOCK COLLAR K 406 -  33", poQty: 50, dispatch: 0, bal: 50, per: 0 },
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

/*     Quality Mock Data     */
const qcAccordionList = [
  "Trend of Rejection % at Operation Level",
  "Itemwise Reject",
  "Itemwise Rework",
  "Scrap Value Report",
  "Sales Return (Customer)",
  "Customer Complaint CAPA",
];

const qcRejectionTrendData = [
  { date: "1", percentage: 0, ppm: 0 },
  { date: "2", percentage: 0.2, ppm: 2000 },
  { date: "3", percentage: 0.15, ppm: 1500 },
  { date: "4", percentage: 0.2, ppm: 2000 },
  { date: "5", percentage: 0.1, ppm: 1000 },
  { date: "6", percentage: 0.3, ppm: 3000 },
  { date: "7", percentage: 0.35, ppm: 3500 },
  { date: "8", percentage: 0.6, ppm: 6000 },
  { date: "9", percentage: 0.7, ppm: 7000 },
  { date: "10", percentage: 0.5, ppm: 5000 },
  { date: "11", percentage: 0, ppm: 0 },
  { date: "12", percentage: 0, ppm: 0 },
  { date: "13", percentage: 0, ppm: 0 },
  { date: "14", percentage: 0, ppm: 0 },
  { date: "15", percentage: 0, ppm: 0 },
  { date: "16", percentage: 0, ppm: 0 },
  { date: "17", percentage: 0, ppm: 0 },
  { date: "18", percentage: 0, ppm: 0 },
  { date: "19", percentage: 0, ppm: 0 },
  { date: "20", percentage: 0, ppm: 0 },
  { date: "21", percentage: 0, ppm: 0 },
  { date: "22", percentage: 0, ppm: 0 },
  { date: "23", percentage: 0, ppm: 0 },
  { date: "24", percentage: 0, ppm: 0 },
  { date: "25", percentage: 0, ppm: 0 },
  { date: "26", percentage: 0, ppm: 0 },
  { date: "27", percentage: 0, ppm: 0 },
  { date: "28", percentage: 0, ppm: 0 },
  { date: "29", percentage: 0, ppm: 0 },
  { date: "30", percentage: 0, ppm: 0 },
];

const qcSalesReturnData = [
  { month: "Apr-2026", qty: 973 },
  { month: "May-2026", qty: 0 },
  { month: "Jun-2026", qty: 0 },
  { month: "Jul-2026", qty: 0 },
  { month: "Aug-2026", qty: 0 },
  { month: "Sep-2026", qty: 0 },
  { month: "Oct-2026", qty: 0 },
  { month: "Nov-2026", qty: 0 },
  { month: "Dec-2026", qty: 0 },
  { month: "Jan-2027", qty: 0 },
  { month: "Feb-2027", qty: 0 },
  { month: "Mar-2027", qty: 0 },
];

const qcSalesReturnTableData = [
  { sr: 1, month: "Apr-2026", custCount: 7, itemCount: 7, itemQty: 973, itemValue: 16747.76 },
  { sr: 2, month: "May-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 3, month: "Jun-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 4, month: "Jul-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 5, month: "Aug-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 6, month: "Sep-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
];

const qcItemWiseRejectData = [
  { sr: 1, itemNo: "FG1106", itemCode: "550BZ05B02", partNo: "GR1FG1106", desc: "CAP OIL LOCK -PRFH006 (H)", opNo: 30, prodQty: 1639, rejQty: 120, per: "7.322%", ppm: 73220 },
  { sr: 2, itemNo: "FG1084", itemCode: "520BZ00102", partNo: "GR1FG1084", desc: "CAP OIL LOCK-LML", opNo: 30, prodQty: 8573, rejQty: 290, per: "3.383%", ppm: 33830 },
  { sr: 3, itemNo: "FG1083", itemCode: "550BZ01402", partNo: "GR1FG1083", desc: "CAP OIL LOCK-DF01 (F)", opNo: 30, prodQty: 7947, rejQty: 200, per: "2.517%", ppm: 25170 },
  { sr: 4, itemNo: "FG1084", itemCode: "520BZ00102", partNo: "PDFG1084", desc: "CAP OIL LOCK-LML", opNo: 10, prodQty: 1524, rejQty: 18, per: "1.181%", ppm: 11810 },
  { sr: 5, itemNo: "FG1083", itemCode: "550BZ01402", partNo: "PDFG1083", desc: "CAP OIL LOCK-DF01 (F)", opNo: 10, prodQty: 4275, rejQty: 28, per: "0.655%", ppm: 6550 },
  { sr: 6, itemNo: "FG1263", itemCode: "F2BZ05712B", partNo: "PDFG1263", desc: "CAP OIL LOCK J1D FF (10 mm taper)", opNo: 10, prodQty: 2801, rejQty: 18, per: "0.643%", ppm: 6430 },
];

const qcReasonWiseRejectData = [
  { sr: 1, reason: "LENGTH U/S", prodQty: 26759, rejQty: 674, per: "2.519%", ppm: 25190 },
  { sr: 2, reason: "END PIECE", prodQty: 10629, rejQty: 41, per: "0.386%", ppm: 3860 },
  { sr: 3, reason: "End Pieces", prodQty: 1810, rejQty: 8, per: "0.442%", ppm: 4420 },
];

const qcRejectPieData = [
  { name: "LENGTH U/S", value: 674, percent: 93.22, qty: 674, color: "#4285f4" },
  { name: "END PIECE", value: 41, percent: 5.67, qty: 41, color: "#fb8c00" },
  { name: "End Pieces", value: 8, percent: 1.11, qty: 8, color: "#10b981" },
];

const qcReworkPieData = [
  { name: "LENGTH", value: 737, percent: 75.13, qty: 737, color: "#1e3a8a" },
  { name: "ANGALOUT", value: 78, percent: 7.95, qty: 78, color: "#60a5fa" },
  { name: "ANGAL STEP", value: 37, percent: 3.77, qty: 37, color: "#f97316" },
  { name: "FLAT CHAMFER", value: 80, percent: 8.15, qty: 80, color: "#fbbf24" },
  { name: "INSERT MARK", value: 46, percent: 4.69, qty: 46, color: "#94a3b8" },
  { name: "face unclean", value: 3, percent: 0.31, qty: 3, color: "#22d3ee" },
];

const qcItemWiseReworkData = [
  { sr: 1, itemNo: "ITM001", itemCode: "C-101", partNo: "P-505", desc: "ROD END BEARING", opNo: "OP-10", prodQty: 3562, rewQty: 37, per: "1.039 %", ppm: 10390 },
  { sr: 2, itemNo: "ITM002", itemCode: "C-102", partNo: "P-506", desc: "FLANGE PLATE", opNo: "OP-20", prodQty: 9060, rewQty: 78, per: "0.861 %", ppm: 8610 },
  { sr: 3, itemNo: "ITM003", itemCode: "C-103", partNo: "P-507", desc: "SPACER RING", opNo: "OP-10", prodQty: 1150, rewQty: 3, per: "0.261 %", ppm: 2610 },
  { sr: 4, itemNo: "ITM004", itemCode: "C-104", partNo: "P-508", desc: "BEARING HOUSING", opNo: "OP-30", prodQty: 17595, rewQty: 80, per: "0.455 %", ppm: 4550 },
  { sr: 5, itemNo: "ITM005", itemCode: "C-105", partNo: "P-509", desc: "SHAFT COLLAR", opNo: "OP-10", prodQty: 14994, rewQty: 46, per: "0.307 %", ppm: 3070 },
];

const qcReasonWiseReworkData = [
  { sr: 1, reason: "ANGAL STEP", prodQty: 3562, rewQty: 37, per: "1.039 %", ppm: 10390 },
  { sr: 2, reason: "ANGALOUT", prodQty: 9060, rewQty: 78, per: "0.861 %", ppm: 8610 },
  { sr: 3, reason: "face unclean", prodQty: 1150, rewQty: 3, per: "0.261 %", ppm: 2610 },
  { sr: 4, reason: "FLAT CHAMFER", prodQty: 17595, rewQty: 80, per: "0.455 %", ppm: 4550 },
  { sr: 5, reason: "INSERT MARK", prodQty: 14994, rewQty: 46, per: "0.307 %", ppm: 3070 },
  { sr: 6, reason: "LENGTH O/S", prodQty: 27805, rewQty: 737, per: "2.651 %", ppm: 26510 },
];

const qcScrapValueData = [
  { sr: 1, itemCode: "ITM201", desc: "END PLATE (MACHINED)", qty: 450, value: 125000 },
  { sr: 2, itemCode: "ITM202", desc: "HOUSING COVER (CASTING)", qty: 320, value: 89600 },
  { sr: 3, itemCode: "ITM203", desc: "GEAR HUB (FORGED)", qty: 180, value: 50400 },
  { sr: 4, itemCode: "ITM204", desc: "ADAPTER RING", qty: 95, value: 26600 },
  { sr: 5, itemCode: "ITM205", desc: "FLANGE COUPLING", qty: 60, value: 16800 },
];

const qcComplaintCapaData = [
  { month: "APR-2026", total: 0, completed: 0 },
  { month: "MAY-2026", total: 0, completed: 0 },
];

const qcComplaintTableData = [
  { sr: 1, type: "Total Complaints", apr: 0, may: 0 },
  { sr: 2, type: "Completed Complaints", apr: 0, may: 0 },
];

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, qty, data, payload }) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // Defensive checks to prevent "Cannot read properties of undefined (reading '0')"
  const strokeColor = (data && data[index] && data[index].color) || (payload && (payload.color || payload.fill)) || "#8884d8";
  const displayQty = qty !== undefined ? qty : (payload && payload.qty !== undefined ? payload.qty : payload?.value || 0);

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={strokeColor} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={strokeColor} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" style={{ fontSize: '10px', fontWeight: 700 }}>
        {`${(percent * 100).toFixed(2)}% (Qty : ${displayQty}) - ${name}`}
      </text>
    </g>
  );
};

/*     Component     */
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

  // Add Favorite Item Modal State
  const [showAddFavoriteModal, setShowAddFavoriteModal] = useState(false);
  const [stockTab, setStockTab] = useState("Consumable Stock");
  const [salesGranularity, setSalesGranularity] = useState("M");
  const [dailySalesData, setDailySalesData] = useState(
    Array.from({ length: 31 }, (_, i) => ({ day: i + 1, sales: 0 }))
  );

  const [top5SalesData, setTop5SalesData] = useState([]);
  const [itemWiseDispatchData, setItemWiseDispatchData] = useState([]);

  const fetchDailySalesReport = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Dashboard/monthly/daily/report/?month=4&year=2026");
      if (!response.ok) throw new Error("Failed to fetch daily sales report");
      const data = await response.json();

      const updated = data.map((item, index) => ({
        day: index + 1,
        sales: parseFloat(item.total_assessable || 0) / 100000 // Convert to Lacs to match chart scale
      }));

      setDailySalesData(updated);
    } catch (err) {
      console.error("Error fetching daily report:", err);
    }
  };

  const fetchTop5SalesData = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Dashboard/Top/5/Customer/");
      if (!response.ok) throw new Error("Failed to fetch top 5 sales data");
      const data = await response.json();

      const colors = ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7"];
      const updated = data.map((item, index) => ({
        name: item.customer,
        value: parseFloat(item.total_assessable || 0),
        qty: item.total_po_qty,
        fill: colors[index % colors.length]
      }));

      setTop5SalesData(updated);
    } catch (err) {
      console.error("Error fetching top 5 report:", err);
    }
  };

  const fetchItemWiseDispatchData = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Dashboard/itemwise/data/");
      if (!response.ok) throw new Error("Failed to fetch itemwise dispatch data");
      const data = await response.json();

      const updated = data.map((item, index) => ({
        sr: index + 1,
        customer: item.customer,
        itemNo: "-",
        itemCode: "-",
        itemDesc: item.description || "N/A",
        qty: item.total_po_qty || 0,
        amount: parseFloat(item.total_assessable_value || 0)
      }));

      setItemWiseDispatchData(updated);
    } catch (err) {
      console.error("Error fetching itemwise report:", err);
    }
  };


  const [salesPurchaseTableData, setSalesPurchaseTableData] = useState([
    { sr: 1, type: "Domestic Sales", assessable: "0.00", total: "0.00" },
    { sr: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
    { sr: 3, type: "Export Sales", assessable: "0.00", total: "0.00" },
    { sr: 4, type: "Rate Diff", assessable: "0.00", total: "0.00" },
    { sr: 5, type: "Scrap Sales", assessable: "0.00", total: "0.00" },
    { sr: 6, type: "Total Sales", assessable: "0.00", total: "0.00" },
    { sr: 7, type: "Sales Return", assessable: "0.00", total: "0.00" },
    { sr: 8, type: "Purchase", assessable: "0.00", total: "0.00" }
  ]);

  const [salesPurchaseChartData, setSalesPurchaseChartData] = useState([
    { name: "Domestic Sales", value: 0 },
    { name: "Jobwork Sales", value: 0 },
    { name: "Export Sales", value: 0 },
    { name: "Rate Diff", value: 0 },
    { name: "Scrap Sales", value: 0 },
    { name: "Total Sales", value: 0 },
    { name: "Sales Return", value: 0 },
    { name: "Purchase", value: 0 }
  ]);

  const fetchAssessableReport = async () => {
    try {
      const response = await fetch("https://erp-render.onrender.com/Dashboard/assessable-report/?month=4&year=2026");
      if (!response.ok) throw new Error("Failed to fetch assessable report");
      const data = await response.json();

      const gst = parseFloat(data.GST_total_assessable_value || 0);
      const scrap = parseFloat(data.SCRAP_total_assessable_value || 0);
      const rateDiff = parseFloat(data.RATE_DIFF_total_assessable_value || 0);
      const total = parseFloat(data.GRAND_TOTAL || 0);

      // Map to table data
      const updatedTable = [
        { sr: 1, type: "Domestic Sales", assessable: gst.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (gst * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
        { sr: 3, type: "Export Sales", assessable: "0.00", total: "0.00" },
        { sr: 4, type: "Rate Diff", assessable: rateDiff.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (rateDiff * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 5, type: "Scrap Sales", assessable: scrap.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (scrap * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 6, type: "Total Sales", assessable: total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (total * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 7, type: "Sales Return", assessable: "0.00", total: "0.00" },
        { sr: 8, type: "Purchase", assessable: "0.00", total: "0.00" }
      ];

      // Map to chart data
      const updatedChart = [
        { name: "Domestic Sales", value: gst },
        { name: "Jobwork Sales", value: 0 },
        { name: "Export Sales", value: 0 },
        { name: "Rate Diff", value: rateDiff },
        { name: "Scrap Sales", value: scrap },
        { name: "Total Sales", value: total },
        { name: "Sales Return", value: 0 },
        { name: "Purchase", value: 0 }
      ];

      setSalesPurchaseTableData(updatedTable);
      setSalesPurchaseChartData(updatedChart);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };


  const toggleSection = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    fetchAssessableReport();
    fetchDailySalesReport();
    fetchTop5SalesData();
    fetchItemWiseDispatchData();
  }, []);



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
          {/*    Department Cards    */}
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
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
                      <button className="dn-icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg></button>
                      <button className="dn-icon-btn excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                        <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                      </button>
                    </div>
                  </div>

                  <div className="dn-records-table-container scrollable">
                    <table className="dn-records-table">
                      <thead>
                        <tr style={{ background: '#007bff', color: '#fff' }}>
                          <th style={{ background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Doc. Name</th>
                          <th style={{ textAlign: "right", background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Total</th>
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
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38c5c5" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#38c5c5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                            </svg>
                            {label}
                          </div>
                          <div className="dn-acc-right">
                            <span>{isOpen ? "Hide" : "Show"}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>

                        {/* Financial Specific Section Bodies */}
                        {isOpen && label === "Sales & Purchase" && (
                          <div className="dn-card-body dn-daily-sales-body">
                            {/* Inner Filter Bar */}
                            <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap' }}>
                              <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                                <div className="dn-f-item sm">Month : <select className="dn-mini-select" style={{ width: 100 }}><option>Apr-2026</option></select></div>
                                <button className="dn-icon-btn small" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: 4, borderRadius: 4, cursor: 'pointer' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
                                </button>
                                <div className="dn-f-item note red" style={{ fontSize: '10px', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>* Values are Assessable</div>
                                <div className="dn-radio-group" style={{ marginLeft: 15 }}>
                                  <label className="dn-radio-item" style={{ color: '#1e293b' }}><input type="radio" name="currencyUnit" defaultChecked /> In RS.</label>
                                  <label className="dn-radio-item" style={{ color: '#1e293b' }}><input type="radio" name="currencyUnit" /> In Lakh</label>
                                </div>
                              </div>
                              <div className="dn-f-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" className="dn-link-sm" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff' }}>Yearly</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            {/* Chart with Sidebar */}
                            <div className="dn-chart-with-sidebar" style={{ position: 'relative' }}>
                              <div className="dn-chart-sidebar">
                                {["M", "Q", "Y"].map(mode => (
                                  <button
                                    key={mode}
                                    className={`dn-sidebar-btn ${salesGranularity === mode ? 'active' : ''}`}
                                    onClick={() => setSalesGranularity(mode)}
                                  >
                                    {mode}
                                  </button>
                                ))}
                              </div>
                              <div className="dn-y-axis-label">Amount In Rs</div>
                              <div style={{ flex: 1, padding: '15px 10px 0 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={salesPurchaseChartData} margin={{ top: 30, right: 20, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} interval={0} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={45}>
                                      {salesPurchaseChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 || index === 7 ? '#3b82f6' : '#1e293b'} />
                                      ))}
                                      <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Detail Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none' }}>
                              <table className="dn-erp-table high-density">
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ width: 40, textAlign: 'center', background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>#</th>
                                    <th style={{ width: 30, textAlign: 'center', background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}><input type="checkbox" /></th>
                                    <th style={{ textAlign: 'left', background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Type</th>
                                    <th style={{ textAlign: 'right', background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Assessable Value</th>
                                    <th style={{ textAlign: 'right', background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Total Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {salesPurchaseTableData.map(row => (
                                    <tr key={row.sr}>
                                      <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                      <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                                      <td style={{ fontWeight: 700, color: '#1e293b' }}>{row.type}</td>
                                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{row.assessable}</td>
                                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{row.total}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Daily Sales" && (
                          <div className="dn-card-body dn-daily-sales-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: "flex", alignItems: "center", gap: '8px', padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>SHARP</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Sales Month : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>Apr-2026</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Type : <select className="dn-mini-select" style={{ width: 60, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700, color: '#ef4444', marginLeft: '10px' }}>* Values are in Lacs</div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
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
                          <div className="dn-card-body dn-daily-sales-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: "flex", alignItems: "center", gap: '8px', padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 60, border: 'none', background: 'transparent', fontWeight: 700 }}><option>SHARP</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              
                              <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="monValQty" defaultChecked /> Value</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="monValQty" /> Qty</label>
                              </div>

                              <div className="dn-checkbox-group mini" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '15px' }}>
                                <span style={{ color: '#64748b' }}>Type :</span>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> GST</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> Export</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> Jobwork</label>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            {/* Monthly Sales Chart */}
                            <div className="dn-chart-content" style={{ padding: '20px 20px 0 20px' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                                  <XAxis dataKey="month" axisLine={{ stroke: '#333', strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 9, fill: "#333", fontWeight: 700 }} />
                                  <YAxis axisLine={{ stroke: '#333', strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} domain={[0, 300]} ticks={[0, 50, 100, 150, 200, 250, 300]} />
                                  <Tooltip cursor={{ fill: "transparent" }} />
                                  <Bar dataKey="sales" fill="rgba(37, 99, 235, 0.8)" radius={[2, 2, 0, 0]} barSize={35} stroke="#2563eb" strokeWidth={1} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Legend Badge */}
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '-10px 0 15px 0' }}>
                              <div style={{ background: '#0ea5e9', color: '#fff', padding: '4px 15px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                Type : Monthly Sales : GST + Export + Jobwork + Scrap
                              </div>
                            </div>

                            {/* Horizontal High-Density Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none', padding: '0 10px 15px 10px', overflowX: 'auto' }}>
                              <table className="dn-erp-table high-density horizontal-sales" style={{ borderCollapse: 'collapse', width: '100%', minWidth: '800px' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff' }}>
                                    {monthlySalesData.map(d => (
                                      <th key={d.month} style={{ background: '#007bff', color: '#fff', padding: '10px 4px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        {d.month}
                                      </th>
                                    ))}
                                    <th style={{ background: '#007bff', color: '#fff', padding: '10px 4px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', whiteSpace: 'nowrap' }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {monthlySalesData.map(d => (
                                      <td key={d.month} style={{ textAlign: 'center', padding: '10px 4px', fontSize: '11px', fontWeight: 700, background: '#fff', border: '1px solid #e2e8f0' }}>
                                        {d.sales || "0"}
                                      </td>
                                    ))}
                                    <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: '11px', fontWeight: 800, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1d4ed8' }}>
                                      {monthlySalesData.reduce((acc, d) => acc + d.sales, 0).toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Footer Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', fontSize: '10px', fontWeight: 700 }}>
                              <div style={{ color: '#0369a1' }}>
                                Values Include : <span style={{ color: '#0369a1' }}>GST Sales, Export Sales, Jobwork Sales, Scrap Sales</span>
                              </div>
                              <div style={{ color: '#ef4444' }}>* Values are in Lacs</div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Top 5 (Sales) Customer / Item" && (
                          <div className="dn-card-body dn-top5-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>SHARP</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Month : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '10px' }}>
                                Top : <input type="number" defaultValue="5" style={{ width: '35px', padding: '0 2px', fontSize: '11px', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 700 }} />
                                <select className="dn-mini-select" style={{ width: 90, border: 'none', background: 'transparent', fontWeight: 700 }}><option>Customer</option><option>Item</option></select>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '15px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Type :</span>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" /> ALL</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" defaultChecked /> GST</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" /> Export</label>
                                </div>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            <div className="dn-top5-chart-wrapper" style={{ padding: '20px 0' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                  <Pie
                                     data={top5SalesData} // Use dynamic data
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, percent }) => {
                                      const RADIAN = Math.PI / 180;
                                      const radius = 25 + outerRadius;
                                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                      return (
                                        <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                          {`( ${(percent * 100).toFixed(2)}% ) ${name}`}
                                        </text>
                                      );
                                    }}
                                    labelLine={{ stroke: '#38bdf8', strokeWidth: 1 }}
                                  >
                                    {top5SalesData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 10px 15px 10px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 30, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Sr.</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'left', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Customer / Item</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Value</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>%</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {top5SalesData.map((row, idx) => (
                                    <tr key={idx}>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 600 }}>{row.name}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#007bff' }}>{top5SalesData.reduce((acc,curr)=>acc+curr.value,0) > 0 ? ( (row.value / top5SalesData.reduce((acc,curr)=>acc+curr.value,0)) * 100 ).toFixed(2) : "0.00"}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>
                                Values Include : GST Sales, Export Sales
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Item wise Dispatch" && (
                          <div className="dn-card-body dn-dispatch-body" style={{ padding: 0 }}>
                            {/* Compact Filter Bar - Optimized for Screen Fit */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap', overflowX: 'auto', width: '100%', boxSizing: 'border-box' }}>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Plant : <select className="dn-mini-select" style={{ width: 70 }}><option>SHARP</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                From : <input type="text" className="dn-mini-select" defaultValue="10/04/2026" style={{ width: 75 }} />
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                To : <input type="text" className="dn-mini-select" defaultValue="11/04/2026" style={{ width: 75 }} />
                                <button className="dn-icon-btn small" style={{ margin: 0, padding: '1px 3px', borderRight: '1px solid #cbd5e1', borderRadius: 0, marginRight: '4px' }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                </button>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Cust grp : <select className="dn-mini-select" style={{ width: 70 }}><option>Select</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                <input type="checkbox" style={{ margin: 0 }} /> Item
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                <input type="checkbox" style={{ margin: 0 }} /> Cust
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Type <select className="dn-mini-select" style={{ width: 55 }}><option>ALL</option></select>
                              </div>
                              <button className="dn-btn-search" style={{ height: '22px', padding: '0 10px', fontSize: '10.5px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700, marginLeft: 'auto', flexShrink: 0 }}>Search</button>
                            </div>

                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none', padding: '0 10px 0 10px' }}>
                              <table className="dn-erp-table high-density dispatch-table" style={{ width: '100%' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff' }}>
                                    <th style={{ width: 40, background: '#007bff', color: '#fff', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>Sr.</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Customer</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item No</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item Code</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item Desc</th>
                                    <th style={{ background: '#007bff', color: '#fff', textAlign: "right", border: '1px solid rgba(255,255,255,0.2)' }}>Qty</th>
                                    <th style={{ background: '#007bff', color: '#fff', textAlign: "right", border: '1px solid rgba(255,255,255,0.2)' }}>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                   {itemWiseDispatchData.map((item, idx) => (
                                    <tr key={idx}>
                                      <td style={{ textAlign: "center", border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.sr}</td>
                                      <td style={{ fontSize: 10, fontWeight: 600, border: '1px solid #e2e8f0', padding: '1px 4px' }}>{item.customer}</td>
                                      <td style={{ border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.itemNo}</td>
                                      <td style={{ fontWeight: 600, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.itemCode}</td>
                                      <td style={{ fontSize: 10, border: '1px solid #e2e8f0', padding: '1px 4px' }}>{item.itemDesc}</td>
                                      <td style={{ textAlign: "right", fontWeight: 700, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.qty.toLocaleString()}</td>
                                      <td style={{ textAlign: "right", fontWeight: 700, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                  ))}

                                </tbody>
                              </table>
                            </div>

                            {/* Screenshot-matched Summary Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', gap: '2px' }}>
                                <div style={{ background: '#007bff', color: '#fff', padding: '4px 12px', fontSize: '10px', fontWeight: 800, borderRadius: '2px' }}>Total Qty: 433217</div>
                                <div style={{ background: '#007bff', color: '#fff', padding: '4px 12px', fontSize: '10px', fontWeight: 800, borderRadius: '2px' }}>Total Amt: 3874287.44 | Other Charges: 0 | Total: 3874287.44</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Business Plan" && (
                          <div className="dn-card-body dn-bp-body" style={{ padding: 0 }}>
                            {/* Multi-Row Filter Bar matched to screenshot */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              {/* Row 1: Toggles and Search Label */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '10px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bpt" checked={bpTimeMode === "Yearly"} onChange={() => setBpTimeMode("Yearly")} /> Yearly</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bpt" checked={bpTimeMode === "Monthly"} onChange={() => setBpTimeMode("Monthly")} /> Monthly</label>
                                </div>
                                <label style={{ fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', color: '#1e293b' }}>
                                  <input type="checkbox" /> Customer Wise
                                </label>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginLeft: '20px' }}>Search By</div>
                              </div>

                              {/* Row 2: Selectors, Search Controls and Excel Icons */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <select className="dn-mini-select" style={{ width: 100 }}><option>2026-2027</option></select>
                                <select className="dn-mini-select" style={{ width: 100 }}><option>APR-2026</option></select>
                                <input type="text" className="dn-mini-select" placeholder="Enter Customer Name..." style={{ width: 180, background: '#fff' }} />
                                
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '10px' }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bps" checked={bpSearchBy === "Quantity"} onChange={() => setBpSearchBy("Quantity")} /> Quantity</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bps" checked={bpSearchBy === "Value"} onChange={() => setBpSearchBy("Value")} /> Value</label>
                                </div>
                                <button className="dn-btn-search" style={{ height: '24px', display: 'flex', alignItems: 'center', gap: '5px', padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', fontWeight: 800, color: '#334155' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                  Search
                                </button>
                                
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                  <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                    <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                  </button>
                                  <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                    <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="dn-bp-chart-wrapper" style={{ padding: '20px 10px' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={businessPlanData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={45}>
                                    {businessPlanData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={index < 3 ? "#0ea5e9" : "#3b82f6"} />
                                    ))}
                                    <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#1e293b' }} />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Screenshot-matched Detail Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 10px 15px 10px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 30, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>#</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Bus. plan (Qty)</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Schedule (Qty)</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Invoice (Qty)</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Schedule (Qty) Actual</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Invoice (Qty) Actual</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>1</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>0.00</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>0.00</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>0.00</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#fff7ed', fontWeight: 700 }}>13,124,665.00</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#fff7ed', fontWeight: 700 }}>2,992,500.00</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#007bff' }}>
                                Item Rate : <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sales Order or Item Master</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "State Wise Sales" && (
                          <div className="dn-card-body dn-state-body" style={{ padding: 0 }}>
                            {/* Standardized Filter Strip matched to image */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>SHARP</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Month : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '15px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Select Type :</span>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="stateType" checked={stateWiseType === "Top 5 State"} onChange={() => setStateWiseType("Top 5 State")} /> Top 5 State</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="stateType" checked={stateWiseType === "Other State"} onChange={() => setStateWiseType("Other State")} /> ALL States</label>
                                </div>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
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
                                          {`( ${(percent * 100).toFixed(2)}% ) ${name}`}
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

                            {/* State Wise Detail Table matched to image */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 10px 15px 10px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 30, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Sr.</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'left', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Customer</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Assessable Value</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Total Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {stateWiseSalesData.map((row, idx) => (
                                    <tr key={idx}>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 600 }}>{row.name}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#007bff' }}>
                                Values Include : <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>GST Sales</span>, <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Export Sales</span>
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
          )}


          {activeDept === "purchase" && (
            <div className="dn-purchase-view fade-in">
              {/* --- NEW PURCHASE DASHBOARD HEADER SECTION --- */}
              <div className="dn-purchase-hero-section">
                <div className="dn-hero-card">
                  <div className="dn-hero-left">
                    <h2 className="dn-hero-title">Purchase Operations & Procurement</h2>
                    <p className="dn-hero-subtitle">Global view of active Purchase Orders, Goods Receipt (GRN) metrics, and Vendor expenditures.</p>
                  </div>
                  <div className="dn-hero-right">
                    <button className="dn-master-export-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Export Master List
                    </button>
                  </div>
                </div>

                <div className="dn-purchase-top-charts">
                  <div className="dn-top-chart-card">
                    <div className="dn-chart-header-row">
                      <h3 className="dn-chart-title-sm">MONTHLY PURCHASE COST (IN LACS)</h3>
                      <select className="dn-chart-select-sm">
                        <option>2026 Fiscal</option>
                      </select>
                    </div>
                    <div className="dn-chart-body-sm">
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={purchaseCostDetailedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 240]} ticks={[0, 60, 120, 180, 240]} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={28} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="dn-top-chart-card">
                    <div className="dn-chart-header-row">
                      <h3 className="dn-chart-title-sm">DAILY ACTIVE DISPATCHES (COUNT)</h3>
                    </div>
                    <div className="dn-chart-body-sm">
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={dailyActiveDispatchesData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={18} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="dn-purchase-top-charts" style={{ marginTop: '20px' }}>
                  <div className="dn-top-chart-card" style={{ padding: 0 }}>
                    <div className="dn-chart-header-row" style={{ padding: '20px 20px 10px' }}>
                      <h3 className="dn-chart-title-sm">
                        <span className="dn-title-accent">|</span> PO CATEGORIES FOCUS
                      </h3>
                    </div>
                    <div className="dn-table-scroll-container" style={{ margin: 0, padding: '0 20px 20px' }}>
                      <table className="dn-erp-table high-density">
                        <thead>
                          <tr style={{ background: '#f1f5ff', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ color: '#1e40af', fontSize: '11px' }}>CATEGORY ID</th>
                            <th style={{ color: '#1e40af', fontSize: '11px' }}>CATEGORY NAME</th>
                            <th style={{ color: '#1e40af', fontSize: '11px', textAlign: 'center' }}>TOTAL PO COUNT</th>
                            <th style={{ color: '#1e40af', fontSize: '11px', textAlign: 'right' }}>FINANCIAL LOAD</th>
                          </tr>
                        </thead>
                        <tbody>
                          {poCategoriesTableData.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ fontWeight: 700 }}>{row.id}</td>
                              <td>{row.name}</td>
                              <td style={{ textAlign: 'center' }}>{row.count}</td>
                              <td style={{ textAlign: 'right', fontWeight: 700 }}>{row.load}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="dn-top-chart-card">
                    <div className="dn-chart-header-row">
                      <h3 className="dn-chart-title-sm">
                        <span className="dn-title-accent">|</span> GLOBAL GRN VALUE BREAKDOWN
                      </h3>
                    </div>
                    <div className="dn-chart-body-sm" style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={grnValueSummaryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={80}
                            dataKey="value"
                            labelLine={true}
                            minAngle={15}
                            label={({ value, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                              const RADIAN = Math.PI / 180;
                              const radius = outerRadius + 20;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill={grnValueSummaryData[index].color}
                                  textAnchor={x > cx ? 'start' : 'end'}
                                  dominantBaseline="central"
                                  style={{ fontSize: '11px', fontWeight: 700 }}
                                >
                                  {value.toLocaleString()}
                                </text>
                              );
                            }}
                          >
                            {grnValueSummaryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* --- DETAILED SYSTEM GRN VALUES SECTION --- */}
                <div className="dn-top-chart-card" style={{ marginTop: '20px', padding: 0 }}>
                  <div className="dn-chart-header-row" style={{ padding: '20px 20px 10px', alignItems: 'center' }}>
                    <h3 className="dn-chart-title-sm" style={{ margin: 0 }}>
                      <span className="dn-title-accent">|</span> DETAILED SYSTEM GRN VALUES (MATERIAL LEVEL)
                    </h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div className="dn-search-pill" style={{ position: 'relative' }}>
                        <input type="text" placeholder="Search Master item..." style={{ padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', width: '220px', background: '#f8fafc' }} />
                        <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      </div>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                        Date Filters
                      </button>
                    </div>
                  </div>
                  <div className="dn-table-scroll-container" style={{ margin: 0, padding: '0 0 10px' }}>
                    <table className="dn-erp-table high-density">
                      <thead style={{ background: '#f1f5ff' }}>
                        <tr>
                          <th style={{ width: 40, textAlign: 'center' }}><input type="checkbox" /></th>
                          <th style={{ color: '#1e40af' }}>TRANSACTION ID</th>
                          <th style={{ color: '#1e40af' }}>SYSTEM ITEM NO.</th>
                          <th style={{ color: '#1e40af' }}>ITEM DESCRIPTION</th>
                          <th style={{ color: '#1e40af' }}>CATEGORY GROUP</th>
                          <th style={{ textAlign: 'center', color: '#1e40af' }}>GRN QTY</th>
                          <th style={{ textAlign: 'right', color: '#1e40af' }}>ITEM RATE</th>
                          <th style={{ textAlign: 'right', color: '#1e40af' }}>CALCULATED AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedGrnValuesData.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                            <td style={{ fontWeight: 700 }}>{row.id}</td>
                            <td>{row.itemNo}</td>
                            <td>{row.desc}</td>
                            <td>
                              <span className={`dn-tag-pill ${row.badge}`} style={{ fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                                {row.group}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.qty}</td>
                            <td style={{ textAlign: 'right' }}>${row.rate.toFixed(2)}</td>
                            <td style={{ textAlign: 'right', fontWeight: 700 }}>${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="dn-accordion-container">
                {purchaseAccordionList.map((label) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                      <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                        <div className="dn-acc-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <div className="dn-acc-right-wrapper">
                            <span style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginRight: 8 }}>{isOpen ? "Hide" : "Show"}</span>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {isOpen && label === "Purchase Orders" && (
                        <div className="dn-card-body dn-purchase-body" style={{ background: '#fff', padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: '1px solid #cbd5e1' }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Select Month : <select className="dn-mini-select" style={{ width: 100, border: '1px solid #cbd5e1' }}><option>Apr-2026</option></select></div>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel-btn" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', padding: '15px', gap: '20px' }}>
                            {/* Left: Summary Table */}
                            <div style={{ flex: '0 0 50%' }}>
                              <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none' }}>
                                <table className="dn-erp-table high-density">
                                  <thead>
                                    <tr style={{ background: '#007bff', color: '#fff' }}>
                                      <th style={{ width: 40, textAlign: 'center', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Sr</th>
                                      <th style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Series Name</th>
                                      <th style={{ textAlign: 'right', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Total PO</th>
                                      <th style={{ textAlign: 'right', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Amount (Basic)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {purchaseOrdersData.map(item => (
                                      <tr key={item.sr}>
                                        <td style={{ textAlign: 'center' }}>{item.sr}</td>
                                        <td style={{ color: '#007bff', fontWeight: 700 }}>{item.series}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{item.total}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{item.amount.toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot style={{ background: '#f8fafc' }}>
                                    <tr style={{ fontWeight: 800 }}>
                                      <td colSpan={2} style={{ color: '#0369a1', fontSize: '11px' }}>Total :</td>
                                      <td style={{ textAlign: 'right', fontSize: '11px' }}>56</td>
                                      <td style={{ textAlign: 'right', fontSize: '11px' }}>1,04,092</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>

                            {/* Right: Pie Chart */}
                            <div style={{ flex: 1, position: 'relative' }}>
                              <div style={{ height: 260 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={purchasePieData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={40}
                                      outerRadius={80}
                                      paddingAngle={2}
                                      dataKey="value"
                                      labelLine={true}
                                      label={(props) => <CustomPieLabel {...props} data={purchasePieData} />}
                                    >
                                      {purchasePieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 10, fontSize: 11, fontWeight: 700 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}><input type="radio" name="ptype" /> Total PO</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}><input type="radio" name="ptype" defaultChecked /> PO Amount</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Monthly Purchase" && (
                        <div className="dn-card-body dn-purchase-body" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: '1px solid #cbd5e1' }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>
                                Year : <select className="dn-mini-select" style={{ width: 100, border: '1px solid #cbd5e1' }}>
                                  <option>2026-2027</option>
                                  <option>2025-2026</option>
                                </select>
                              </div>
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', fontStyle: 'italic' }}>* Values are in Lacs (GRN)</span>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel-btn" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                              </button>
                            </div>
                          </div>

                          <div style={{ padding: '20px 15px' }}>
                            <ResponsiveContainer width="100%" height={260}>
                              <BarChart data={monthlyPurchaseChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="value" fill="#007bff" barSize={35} radius={[4, 4, 0, 0]}>
                                  <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#007bff' }} />
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="dn-table-scroll-container MonthlyTable" style={{ margin: '0 15px 15px', border: 'none' }}>
                            <table className="dn-erp-table high-density narrow-cols">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  {monthlyPurchaseChartData.map(d => <th key={d.month} style={{ textAlign: 'center', fontSize: '10px', backgroundColor: '#007bff', color: '#fff', padding: '6px 2px', border: '1px solid rgba(255,255,255,0.1)' }}>{d.month}</th>)}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {monthlyPurchaseChartData.map(d => <td key={d.month} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 800, color: '#334155' }}>{d.value === 0 ? "0" : d.value}</td>)}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Daily Purchase" && (
                        <div className="dn-card-body dn-purchase-body" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: '1px solid #cbd5e1' }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Select Month : <select className="dn-mini-select" style={{ width: 100, border: '1px solid #cbd5e1' }}><option>Apr-2026</option></select></div>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel-btn" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                              </button>
                            </div>
                          </div>

                          <div style={{ padding: '20px 15px 10px' }}>
                            <ResponsiveContainer width="100%" height={280}>
                              <BarChart data={dailyPurchaseChartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#1e293b' }} />
                                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="value" fill="#3b82f6" barSize={12} radius={[2, 2, 0, 0]}>
                                  <LabelList dataKey="value" position="top" style={{ fontSize: 8, fontWeight: 800, fill: '#3b82f6' }} />
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                            <span style={{ background: 'linear-gradient(to right, #4b92db, #1d6ed1)', color: '#fff', padding: '4px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Daily Purchase Analysis - Apr-2026
                            </span>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Top 5 Suppliers / Top 5 Items" && (
                        <div className="dn-card-body dn-purchase-body" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: '1px solid #cbd5e1' }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Month : <select className="dn-mini-select" style={{ width: 100, border: '1px solid #cbd5e1' }}><option>ALL</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Top : <input type="text" className="dn-mini-select" defaultValue="5" style={{ width: 40, border: '1px solid #cbd5e1', textAlign: 'center' }} /></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Type : <select className="dn-mini-select" style={{ width: 100, border: '1px solid #cbd5e1' }}><option>Supplier</option></select></div>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel-btn" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
                            <div style={{ width: '100%', height: 280, display: 'flex', justifyContent: 'center' }}>
                              <ResponsiveContainer width="70%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={top5DetailedSuppliers}
                                    dataKey="amount"
                                    outerRadius={90}
                                    labelLine={true}
                                    label={({ per, name }) => `${per} ${name}`}
                                    isAnimationActive={false}
                                  >
                                    {top5DetailedSuppliers.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#38bdf8"][index % 5]} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 8, border: "none" }} formatter={(value) => value.toLocaleString()} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="dn-table-scroll-container" style={{ margin: '0', border: 'none' }}>
                              <table className="dn-erp-table high-density">
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff' }}>
                                    <th style={{ width: 40, textAlign: 'center', backgroundColor: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Sr.</th>
                                    <th style={{ backgroundColor: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Supplier / Item</th>
                                    <th style={{ textAlign: 'center', backgroundColor: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Qty</th>
                                    <th style={{ textAlign: 'center', backgroundColor: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>UOM</th>
                                    <th style={{ textAlign: 'right', backgroundColor: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {top5DetailedSuppliers.map(row => (
                                    <tr key={row.sr}>
                                      <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                      <td style={{ fontWeight: 800, color: '#334155' }}>{row.name}</td>
                                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.qty}</td>
                                      <td style={{ textAlign: 'center' }}>Nos</td>
                                      <td style={{ textAlign: 'right', fontWeight: 800, color: '#1d6ed1' }}>{row.amount.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div style={{ marginTop: '10px', fontSize: '9px', fontWeight: 700, color: '#64748b', fontStyle: 'italic' }}>
                              * Analysis based on PO GRN & Direct GRN Values.
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "GRN Value Summary" && (
                        <div className="dn-card-body dn-purchase-body" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: '1px solid #cbd5e1' }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>From : <input type="text" className="dn-mini-select" defaultValue="12/03/2026" style={{ width: 80, border: '1px solid #cbd5e1' }} /></div>
                              <div className="dn-f-item sm" style={{ fontSize: '11px', fontWeight: 700 }}>To : <input type="text" className="dn-mini-select" defaultValue="11/04/2026" style={{ width: 80, border: '1px solid #cbd5e1' }} /></div>
                              <button className="dn-btn-search" style={{ height: 24, padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                Search
                              </button>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel-btn" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', padding: '20px', gap: '30px' }}>
                            <div style={{ flex: '0 0 45%' }}>
                              <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none' }}>
                                <table className="dn-erp-table high-density">
                                  <thead>
                                    <tr style={{ background: '#007bff', color: '#fff' }}>
                                      <th style={{ width: 40, textAlign: 'center', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Sr.</th>
                                      <th style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>Main Group</th>
                                      <th style={{ textAlign: 'right', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>GRN Qty</th>
                                      <th style={{ textAlign: 'right', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>GRN Amt</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {grnValueSummaryData.map(row => (
                                      <tr key={row.sr}>
                                        <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                        <td style={{ fontWeight: 800, color: '#334155' }}>{row.type}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{row.qty.toLocaleString()}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 800, color: '#1d6ed1' }}>{row.amount.toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot style={{ background: '#f8fafc' }}>
                                    <tr style={{ fontWeight: 900 }}>
                                      <td colSpan={2} style={{ textAlign: 'right', fontSize: '11px', color: '#0369a1' }}>Total :</td>
                                      <td style={{ textAlign: 'right', fontSize: '11px' }}>1,140,066.64</td>
                                      <td style={{ textAlign: 'right', fontSize: '11px', color: '#1d6ed1' }}>23,761,368.81</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                  <Pie
                                    data={grnValueSummaryData}
                                    dataKey="amount"
                                    outerRadius={90}
                                    labelLine={true}
                                    label={({ per, type }) => `${type}( ${per} )`}
                                    isAnimationActive={false}
                                  >
                                    {grnValueSummaryData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={["#3b82f6", "#f59e0b", "#10b981"][index % 3]} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 8, border: "none" }} formatter={(value) => value.toLocaleString()} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "GRN Value Details" && (
                        <div className="dn-card-body dn-purchase-body" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm">Plant
                                <select className="dn-mini-select" style={{ width: 70, marginLeft: 5 }}><option>SHARP</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                <span style={{ fontSize: 9 }}>From Date</span>
                                <input type="text" className="dn-mini-input" defaultValue="12/03/2026" style={{ width: 80 }} />
                              </div>
                              <div className="dn-f-item sm" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                <span style={{ fontSize: 9 }}>From Date</span>
                                <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} />
                              </div>
                              <div className="dn-f-item sm" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                <span style={{ fontSize: 9 }}>Main Group</span>
                                <select className="dn-mini-select" style={{ width: 70 }}><option>ALL</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                <span style={{ fontSize: 9 }}>Item Group</span>
                                <select className="dn-mini-select" style={{ width: 70 }}><option>ALL</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 15 }}>
                                <input type="checkbox" /> Item : <input type="text" className="dn-mini-input" placeholder="Enter Item.." style={{ width: 140 }} />
                              </div>
                              <button className="dn-btn-search" style={{ height: 26, padding: '0 8px', display: 'flex', alignItems: 'center', gap: 4, marginTop: 15 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Search
                              </button>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></button>
                            </div>
                          </div>
                          <div className="dn-table-scroll-container" style={{ margin: 0 }}>
                            <table className="dn-erp-table high-density">
                              <thead className="erp-th-gradient">
                                <tr>
                                  <th style={{ width: 40, textAlign: 'center' }}>Sr.</th>
                                  <th>Item No</th>
                                  <th>Item Code</th>
                                  <th>Item Desc</th>
                                  <th>Main Group</th>
                                  <th>Group</th>
                                  <th>Item Size</th>
                                  <th style={{ textAlign: 'right' }}>Grn Qty</th>
                                  <th style={{ textAlign: 'right' }}>Amt</th>
                                  <th style={{ width: 40, textAlign: 'center' }}>Act</th>
                                </tr>
                              </thead>
                              <tbody>
                                {grnValueDetailsData.map(row => (
                                  <tr key={row.sr}>
                                    <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                    <td style={{ fontSize: 10 }}>{row.itemNo}</td>
                                    <td style={{ fontSize: 10 }}></td>
                                    <td style={{ fontSize: 10 }}>{row.desc}</td>
                                    <td style={{ fontSize: 10 }}>{row.mgroup}</td>
                                    <td style={{ fontSize: 10 }}>{row.group}</td>
                                    <td style={{ fontSize: 10 }}></td>
                                    <td style={{ textAlign: 'right' }}>{row.qty}</td>
                                    <td style={{ textAlign: 'right' }}>{row.amt}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <button className="dn-icon-btn small" style={{ padding: '2px 4px' }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="3"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot style={{ background: '#f1f5f9' }}>
                                <tr>
                                  <td colSpan={6}></td>
                                  <td colSpan={2} style={{ textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#1a2340', paddingRight: 10 }}>Total Qty : 1140066.64</td>
                                  <td colSpan={2} style={{ textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#1a2340', paddingRight: 10 }}>Total Amt : 23761368.81</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      )}



                      {isOpen && !purchaseAccordionList.includes(label) && (
                        <div className="dn-card-body" style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                          No data available for {label} at this moment.
                        </div>
                      )}
                    </div>
                  );
                })}
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
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <span>{isOpen ? "Hide" : "Show"}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <polyline points="6 9 12 15 18 9" />
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
                              <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></button>
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
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                Search Option
                              </button>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></button>
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
                                <button className="dn-icon-btn small excel"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></button>
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
                                    data={[{ name: 'Dis', value: 2948140, fill: '#007bff' }, { name: 'Bal', value: 10176525, fill: '#f59e0b' }]}
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
                                  clsData = [{ name: "Empty", value: 100, fill: "#f1f5f9" }];
                                  legendText = "(Sch : 4992850)";
                                } else if (cls === "B") {
                                  clsData = [{ name: 'Dis', value: 358156, fill: '#007bff' }, { name: 'Bal', value: 1029493, fill: '#f59e0b' }];
                                  legendText = "(Sch : 1387649)";
                                } else if (cls === "C") {
                                  clsData = [{ name: 'Dis', value: 256520, fill: '#007bff' }, { name: 'Bal', value: 1109529, fill: '#f59e0b' }];
                                  legendText = "(Sch : 1365049)";
                                } else {
                                  clsData = [{ name: 'Dis', value: 1193200, fill: '#007bff' }, { name: 'Bal', value: 4185917, fill: '#f59e0b' }];
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
                          <div className="dn-inner-filter-bar complex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: '#f8fafc' }}>
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
                                <button className="dn-icon-btn small excel" style={{ flexShrink: 0 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></button>
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
                                    data={[{ name: 'Dis', value: 2100, fill: '#007bff' }, { name: 'Bal', value: 2090, fill: '#f59e0b' }]}
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
                                          data={[{ name: "Empty", value: 100, fill: "#f1f5f9" }]}
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
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Export to Excel
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


          {activeDept === "oee" && (
            <div className="dn-oee-view fade-in">
              <div className="dn-accordion-container">
                {oeeAccordionList.map((label) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                      <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                        <div className="dn-acc-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <span>{isOpen ? "Hide" : "Show"}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>

                      {isOpen && label === "Machine Utilization (Groupwise)" && (
                        <div className="dn-card-body dn-oee-body" style={{ background: '#fff' }}>
                          {/* Filter Bar */}
                          <div className="dn-inner-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div className="dn-f-item">Plant : <select className="dn-mini-select" defaultValue="SHARP"><option>SHARP</option></select></div>
                              <span className="dn-badge-orange" style={{ background: '#d35400', color: '#fff', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>April-2026</span>
                            </div>
                            <div className="dn-f-right" style={{ display: 'flex', gap: 15, fontSize: 11, fontWeight: 700 }}>
                              <a href="#" style={{ color: '#007bff' }}>OEE Report V2</a>
                              <a href="#" style={{ color: '#007bff' }}>View More...</a>
                            </div>
                          </div>

                          {/* Charts Visualization Area (Scrollable Grid) */}
                          <div className="dn-oee-scroll-area" style={{ maxHeight: 600, overflowY: 'auto', padding: '10px 0' }}>
                            <div className="dn-oee-charts-grid" style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                              {oeeMachineGroups.map((group, idx) => (
                                <div key={group} className="dn-oee-chart-box" style={{
                                  width: '50%',
                                  textAlign: 'center',
                                  padding: '30px 0',
                                  borderBottom: '1px solid #f1f5f9',
                                  borderRight: idx % 2 === 0 ? '1px solid #f1f5f9' : 'none'
                                }}>
                                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#1a2340' }}>{group}</h3>
                                  <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                      <Pie
                                        data={oeePieData}
                                        cx="50%"
                                        cy="45%"
                                        innerRadius={0}
                                        outerRadius={80}
                                        dataKey="value"
                                        stroke="none"
                                      >
                                        {oeePieData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                        <Label
                                          value="100.00 %"
                                          position="outside"
                                          offset={20}
                                          style={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                        />
                                      </Pie>
                                      <Tooltip />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="dn-oee-legend-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="dn-oee-legend" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: -10 }}>
                                      <span style={{ width: 14, height: 8, background: '#16a34a', borderRadius: 2 }}></span>
                                      <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>PRODUCTION - (100.00 %)</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Operator Efficiency" && (
                        <div className="dn-card-body dn-oee-body" style={{ background: '#fff', padding: 0 }}>
                          {/* Filter Bar */}
                          <div className="dn-inner-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 15, height: 15, background: '#d35400', borderRadius: 2 }}></div>
                              <div className="dn-f-item">Plant : <select className="dn-mini-select" defaultValue="SHARP"><option>SHARP</option></select></div>
                              <div className="dn-f-item">&nbsp; Select Month : <select className="dn-mini-select" defaultValue="Apr-2026"><option>Apr-2026</option></select></div>
                            </div>
                            <div className="dn-f-right">
                              <a href="#" style={{ color: '#007bff', fontSize: 11, fontWeight: 700 }}>View More...</a>
                            </div>
                          </div>

                          <div className="dn-oee-scroll-x" style={{ overflowX: 'auto', padding: '20px 16px' }}>
                            <div style={{ minWidth: 2600 }}>
                              <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={operatorEfficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 90 }} barCategoryGap={10}>
                                  <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#7db4ff" />
                                      <stop offset="100%" stopColor="#007bff" />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                  <XAxis
                                    dataKey="name"
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={false}
                                    tick={<CustomXAxisTick />}
                                    interval={0}
                                    height={90}
                                    label={{ value: 'Operator Name', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                  />
                                  <YAxis
                                    domain={[0, 300]}
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                    label={{ value: 'OP. Eff %', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                  />
                                  <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                  <Bar dataKey="efficiency" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={28}>
                                    <LabelList dataKey="efficiency" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#0369a1' }} />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          {/* Average Efficiency Footer */}
                          <div className="dn-oee-footer" style={{ padding: '10px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #f1f5f9' }}>
                            <div className="dn-average-badge" style={{ background: '#007bff', color: '#fff', padding: '4px 20px', borderRadius: '4px', fontSize: 11, fontWeight: 700, boxShadow: '0 2px 4px rgba(0,123,255,0.2)' }}>
                              Average Efficiency : 110.35
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "OEE Graph" && (
                        <div className="dn-card-body dn-oee-body" style={{ background: '#fff', padding: 0 }}>
                          {/* OEE Graph Filter Bar */}
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0', gap: '15px' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">From Date : <input type="date" className="dn-mini-select" defaultValue="2026-04-01" style={{ width: 130 }} /></div>
                              <div className="dn-f-item sm">To Date : <input type="date" className="dn-mini-select" defaultValue="2026-04-11" style={{ width: 130 }} /></div>
                              <button className="dn-btn-search" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '2px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                <span style={{ fontSize: '11px', fontWeight: 700 }}>Search</span>
                              </button>
                            </div>
                          </div>

                          {/* 2x2 Grid of Charts */}
                          <div className="dn-oee-graph-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: 'none' }}>
                            {/* Availability Graph */}
                            <div className="dn-graph-quadrant" style={{ borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                              <div className="dn-quadrant-header" style={{ background: '#f1f5f9', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Machine Availability Graph :</div>
                              <div style={{ padding: '20px 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={machineOeeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" interval={0} angle={-65} textAnchor="end" height={80} tick={{ fontSize: 8, fill: '#166534', fontWeight: 600 }} />
                                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#ef4444', fontWeight: 700 }} label={{ value: 'Availab. in %', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="avail" fill="url(#barGradient)" />
                                  </BarChart>
                                </ResponsiveContainer>
                                <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#475569', marginTop: -15 }}>Machine Name</div>
                              </div>
                            </div>

                            {/* Quality Graph */}
                            <div className="dn-graph-quadrant" style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <div className="dn-quadrant-header" style={{ background: '#f1f5f9', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Production Quality Graph :</div>
                              <div style={{ padding: '20px 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={machineOeeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" interval={0} angle={-65} textAnchor="end" height={80} tick={{ fontSize: 8, fill: '#166534', fontWeight: 600 }} />
                                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#ef4444', fontWeight: 700 }} label={{ value: 'Quality in %', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="quality" fill="url(#barGradient)" />
                                  </BarChart>
                                </ResponsiveContainer>
                                <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#475569', marginTop: -15 }}>Machine Name</div>
                              </div>
                            </div>

                            {/* Performance Graph */}
                            <div className="dn-graph-quadrant" style={{ borderRight: '1px solid #e2e8f0' }}>
                              <div className="dn-quadrant-header" style={{ background: '#f1f5f9', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Machine Performance Report :</div>
                              <div style={{ padding: '20px 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={machineOeeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" interval={0} angle={-65} textAnchor="end" height={80} tick={{ fontSize: 8, fill: '#166534', fontWeight: 600 }} />
                                    <YAxis domain={[0, 400]} tick={{ fontSize: 10, fill: '#ef4444', fontWeight: 700 }} label={{ value: 'Performance in %', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="perf" fill="url(#barGradient)" />
                                  </BarChart>
                                </ResponsiveContainer>
                                <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#475569', marginTop: -15 }}>Machine Name</div>
                              </div>
                            </div>

                            {/* Summary Graph */}
                            <div className="dn-graph-quadrant">
                              <div className="dn-quadrant-header" style={{ background: '#f1f5f9', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>OEE Summary Graph :</div>
                              <div style={{ padding: '20px 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={machineOeeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" interval={0} angle={-65} textAnchor="end" height={80} tick={{ fontSize: 8, fill: '#166534', fontWeight: 600 }} />
                                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#ef4444', fontWeight: 700 }} label={{ value: 'Availab. in %', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="oee" fill="url(#barGradient)" />
                                  </BarChart>
                                </ResponsiveContainer>
                                <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#475569', marginTop: -15 }}>Machine Name</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Shiftwise OEE" && (
                        <div className="dn-card-body dn-oee-body" style={{ padding: 0 }}>
                          {/* Standardized Filter Bar Strip */}
                          <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                              Plant : <select className="dn-mini-select" defaultValue="SHARP" style={{ width: 80, border: '1px solid #cbd5e1', fontSize: '10.5px', fontWeight: 700 }}><option>SHARP</option></select>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '5px' }}>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>From Date :</div>
                              <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 85, border: '1px solid #cbd5e1', padding: '1px 4px', fontSize: '10.5px' }} />
                              <button style={{ background: 'transparent', border: 'none', padding: 0 }}><svg width="14" height="14" fill="#64748b" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg></button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '5px' }}>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>To Date :</div>
                              <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 85, border: '1px solid #cbd5e1', padding: '1px 4px', fontSize: '10.5px' }} />
                              <button style={{ background: 'transparent', border: 'none', padding: 0 }}><svg width="14" height="14" fill="#64748b" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg></button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>
                              Group : <select className="dn-mini-select" defaultValue="Select" style={{ width: 80, border: '1px solid #cbd5e1', fontSize: '10.5px' }}><option>Select</option></select>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>
                              Shift : <select className="dn-mini-select" defaultValue="ALL" style={{ width: 60, border: '1px solid #cbd5e1', fontSize: '10.5px' }}><option>ALL</option></select>
                            </div>

                            <button className="dn-btn-search" style={{ height: '24px', padding: '0 12px', fontSize: '10.5px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700, marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                              Search
                            </button>

                            <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginLeft: '10px', textDecoration: 'none' }}>OEE Report V2</a>
                          </div>

                          {/* Horizontal Scrollable High-Density Table */}
                          <div className="dn-table-scroll-container oee-shift-scroll" style={{ overflowX: 'auto', maxHeight: '500px', border: '1px solid #e2e8f0' }}>
                            <table className="dn-erp-table high-density" style={{ width: 'max-content', borderCollapse: 'separate', borderSpacing: 0 }}>
                              <thead>
                                <tr>
                                  <th style={{ width: '45px', minWidth: '45px', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)', position: 'sticky', left: 0, zIndex: 12, transform: 'translateZ(0)' }}>Sr.No</th>
                                  <th style={{ width: '145px', minWidth: '145px', backgroundColor: '#007bff', color: '#fff', fontSize: '10px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.3)', position: 'sticky', left: 45, zIndex: 12, borderRight: '2px solid #0056b3', transform: 'translateZ(0)' }}>LOSSES</th>
                                  {shiftwiseOeeMachines.map((machine, mIdx) => (
                                    <th key={mIdx} style={{ 
                                      minWidth: '85px', 
                                      background: 'linear-gradient(to bottom, #4b92db, #1d6ed1)', 
                                      color: '#fff', 
                                      fontSize: '9px', 
                                      textAlign: 'center', 
                                      padding: '4px 2px',
                                      border: '1px solid rgba(255,255,255,0.2)',
                                      lineHeight: '1.2'
                                    }}>
                                      {machine}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {shiftwiseOeeRowLabels.map((label, rIdx) => {
                                  const rowBg = rIdx % 2 === 1 ? '#f8fafc' : '#ffffff';
                                  return (
                                    <tr key={rIdx} style={{ background: rowBg }}>
                                      <td style={{ 
                                        textAlign: 'center', 
                                        fontSize: '10.5px', 
                                        fontWeight: 600, 
                                        border: '1px solid #e2e8f0', 
                                        position: 'sticky', 
                                        left: 0,
                                        backgroundColor: rowBg, 
                                        zIndex: 7,
                                        transform: 'translateZ(0)'
                                      }}>
                                        {rIdx + 1}
                                      </td>
                                      <td style={{ 
                                        textAlign: 'left', 
                                        fontSize: '9px', 
                                        fontWeight: 800, 
                                        color: '#334155', 
                                        border: '1px solid #e2e8f0', 
                                        borderRight: '2px solid #cbd5e1',
                                        position: 'sticky', 
                                        left: 45, 
                                        backgroundColor: rowBg, 
                                        zIndex: 7, 
                                        padding: '4px 8px',
                                        transform: 'translateZ(0)'
                                      }}>
                                        {label}
                                      </td>
                                      {shiftwiseOeeMachines.map((_, cIdx) => (
                                        <td key={cIdx} style={{ textAlign: 'center', fontSize: '10.5px', border: '1px solid #e2e8f0', color: '#64748b' }}>0</td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeDept === "stores" && (
            <div className="dn-stores-view fade-in">
              {/* --- STORES DASHBOARD HEADER SECTION --- */}
              <div className="dn-purchase-hero-section" style={{ marginBottom: '10px' }}>
                <div className="dn-hero-card" style={{ padding: '8px 20px', minHeight: 'auto' }}>
                  <div className="dn-hero-left">
                    <h2 className="dn-hero-title" style={{ fontSize: '16px', marginBottom: '0' }}>Stores & WMS Dynamics</h2>
                    <p className="dn-hero-subtitle" style={{ fontSize: '11px', margin: 0, opacity: 0.7 }}>Enterprise Warehouse Management System tracking Live Inventory limits & Material Logs.</p>
                  </div>
                  <div className="dn-hero-right">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select className="dn-chart-select-sm" style={{ 
                          width: '180px', 
                          height: '28px', 
                          fontSize: '12px', 
                          fontWeight: 600, 
                          borderRadius: '6px', 
                          border: '1px solid #cbd5e1',
                          padding: '0 10px',
                          cursor: 'pointer',
                          backgroundColor: '#fff',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 8px center',
                          backgroundSize: '12px'
                        }}>
                           <option>All Warehouses</option>
                        </select>
                        <button className="dn-master-export-btn" style={{ 
                          background: '#10b981', 
                          borderColor: '#10b981',
                          height: '28px',
                          padding: '0 10px',
                          fontSize: '10px',
                          fontWeight: 700,
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Export
                        </button>
                    </div>
                  </div>
                </div>

                <div className="dn-purchase-top-charts">
                  <div className="dn-top-chart-card">
                    <div className="dn-chart-header-row" style={{ padding: '15px 20px 0' }}>
                      <h3 className="dn-chart-title-sm" style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center' }}>
                        <span className="dn-title-accent" style={{ background: '#f59e0b', height: '14px', width: '3px', marginRight: '8px' }}>|</span>
                        INWARD STOCK DIST.
                      </h3>
                    </div>
                    <div className="dn-chart-body-sm" style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={inwardStockData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            paddingAngle={2}
                          >
                            {inwardStockData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="dn-pie-legend-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '-20px' }}>
                         {inwardStockData.map((d, i) => (
                           <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 600 }}>
                              <div style={{ width: 8, height: 8, background: d.color }}></div>
                              {d.name}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="dn-top-chart-card">
                    <div className="dn-chart-header-row" style={{ padding: '15px 20px 0' }}>
                      <h3 className="dn-chart-title-sm" style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center' }}>
                        <span className="dn-title-accent" style={{ background: '#8b5cf6', height: '14px', width: '3px', marginRight: '8px' }}>|</span>
                        OUTWARD STOCK DIST.
                      </h3>
                    </div>
                    <div className="dn-chart-body-sm" style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={outwardStockData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            paddingAngle={2}
                          >
                            {outwardStockData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="dn-pie-legend-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '-20px' }}>
                         {outwardStockData.map((d, i) => (
                           <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 600 }}>
                              <div style={{ width: 8, height: 8, background: d.color }}></div>
                              {d.name}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dn-top-chart-card" style={{ marginTop: '20px', padding: 0 }}>
                    <div className="dn-chart-header-row" style={{ padding: '20px 20px 10px', alignItems: 'center' }}>
                        <h3 className="dn-chart-title-sm" style={{ margin: 0, color: '#1e293b' }}>
                        <span className="dn-title-accent" style={{ background: '#0ea5e9' }}>|</span> MIN / MAX AUTO-REORDER ALERTS
                        </h3>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: 'auto' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input type="checkbox" /> Show Critical Only
                            </label>
                            <div className="dn-search-pill" style={{ position: 'relative' }}>
                                <input type="text" placeholder="Locate Code..." style={{ padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', width: '180px', background: '#f8fafc' }} />
                                <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </div>
                            <button className="dn-icon-btn" style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '12px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', width: 'auto' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
                                Filters
                            </button>
                        </div>
                    </div>
                    <div className="dn-table-scroll-container" style={{ margin: 0 }}>
                        <table className="dn-erp-table high-density">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ width: 40, textAlign: 'center' }}><input type="checkbox" /></th>
                                    <th style={{ color: '#1e293b', fontSize: '11px' }}>LOCATION GRP</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px' }}>ITEM CODE</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px' }}>DESCRIPTION DETAILS</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>MIN LVL</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>REORDER LVL</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>MAX LVL</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>CURR STOCK</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>WO QTY</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>VARIANCE</th>
                                    <th style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center' }}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {minMaxAlertsData.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                                        <td style={{ fontWeight: 700 }}>{row.location}</td>
                                        <td style={{ fontWeight: 700 }}>{row.itemCode}</td>
                                        <td style={{ fontSize: '10.5px', color: '#64748b' }}>{row.desc}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{row.min}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 600, background: '#f8fafc' }}>{row.reorder}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{row.max}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.stock}</td>
                                        <td style={{ textAlign: 'center' }}>{row.wo}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 700, color: row.variance < 0 ? '#ef4444' : '#1e293b' }}>{row.variance}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={`dn-status-badge-${row.status === 'OVERSTOCK' ? 'yellow' : row.status === 'HEALTHY' ? 'green' : 'red'}`} style={{ padding: '4px 10px', fontSize: '9px', fontWeight: 800, borderRadius: '8px' }}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dn-top-chart-card" style={{ marginTop: '20px', padding: 0 }}>
                    <div className="dn-chart-header-row" style={{ padding: '15px 20px 10px', alignItems: 'center' }}>
                        <h3 className="dn-chart-title-sm" style={{ margin: 0, color: '#1e293b', display: 'flex', alignItems: 'center' }}>
                            <span className="dn-title-accent" style={{ background: '#0ea5e9', height: '18px', width: '3px', marginRight: '10px' }}>|</span> 
                            LIVE MATERIAL ISSUE CHALLAN LOGS
                        </h3>
                        <button className="dn-icon-btn" style={{ padding: '6px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '12px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', width: 'auto', marginLeft: 'auto' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            New Issue
                        </button>
                    </div>
                    <div className="dn-table-scroll-container" style={{ margin: 0 }}>
                        <table className="dn-erp-table high-density">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ width: 40, textAlign: 'center' }}><input type="checkbox" /></th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800 }}>CHALLAN / LOG NO.</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800 }}>ITEM SYSTEM NO.</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800 }}>DISPATCH TARGET DESC</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800, textAlign: 'center' }}>GRP</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800, textAlign: 'center' }}>QTY</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800, textAlign: 'center' }}>BASE RATE</th>
                                    <th style={{ color: '#64748b', fontSize: '10px', fontWeight: 800, textAlign: 'center' }}>TOTAL EXPORT VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialChallanLogs.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                                        <td style={{ fontWeight: 700, fontSize: '11px', color: '#1a2340' }}>{row.no}</td>
                                        <td style={{ fontWeight: 700, fontSize: '11px' }}>{row.itemNo}</td>
                                        <td style={{ fontSize: '10.5px', color: '#64748b' }}>{row.target}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ 
                                                padding: '2px 8px', 
                                                fontSize: '9px', 
                                                fontWeight: 800, 
                                                borderRadius: '6px', 
                                                background: row.grp === 'CONSUMABLE' ? '#e0f2fe' : row.grp === 'HARDWARE' ? '#f1f5f9' : '#fff7ed', 
                                                color: row.grp === 'CONSUMABLE' ? '#0369a1' : row.grp === 'HARDWARE' ? '#475569' : '#c2410c' 
                                            }}>
                                                {row.grp}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '11px' }}>{row.qty}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '11px' }}>{row.rate}</td>
                                        <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '11px', color: '#1a2340' }}>{row.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="dn-table-footer" style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Showing 1 to 5 of 422 delivery challans</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '11px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Previous</button>
                            <button style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '11px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Next</button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          )}
          {activeDept === "subcon" && (
            <div className="dn-subcon-view fade-in">
              <div className="dn-accordion-container">
                {subconAccordionList.map((label) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                      <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                        <div className="dn-acc-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <span>{isOpen ? "Hide" : "Show"}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>

                      {isOpen && label === "57F4 Challan Ageing" && (
                        <div className="dn-card-body dn-subcon-body" style={{ padding: 0 }}>
                          {/* Inner Filter Bar */}
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap' }}>
                            <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <input type="checkbox" id="subconSupp" />
                                <label htmlFor="subconSupp" style={{ fontSize: 11, fontWeight: 700 }}>Supplier:</label>
                                <input type="text" className="dn-mini-input" placeholder="Vendor / Supplier Name.." style={{ width: 180 }} />
                              </div>
                              <button className="dn-btn-search">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: 5 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                Search
                              </button>
                            </div>
                          </div>

                          {/* Ageing Buckets row */}
                          <div className="dn-ageing-buckets-row" style={{ display: 'flex', gap: '8px', padding: '12px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                            <div className="dn-ageing-box"><span>[Under 0-30]:</span> <div className="count-badge blue">224</div></div>
                            <div className="dn-ageing-box"><span>[Under 31-60]:</span> <div className="count-badge dark-blue">0</div></div>
                            <div className="dn-ageing-box"><span>[Under 61-90]:</span> <div className="count-badge blue">0</div></div>
                            <div className="dn-ageing-box"><span>[Under 91-120]:</span> <div className="count-badge blue">0</div></div>
                            <div className="dn-ageing-box"><span>[Under 121-150]:</span> <div className="count-badge blue">0</div></div>
                            <div className="dn-ageing-box"><span>[Under 151-180]:</span> <div className="count-badge blue">0</div></div>
                            <div className="dn-ageing-box"><span>[Above &gt; 180]:</span> <div className="count-badge red">0</div></div>
                            <div className="dn-ageing-box all"><span>View ALL</span> <div className="count-badge light-blue">224</div></div>
                          </div>

                          <div className="dn-table-scroll-container" style={{ margin: 0, padding: 0, border: 'none' }}>
                            <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 40, textAlign: 'center', color: '#fff' }}>Sr.</th>
                                  <th style={{ color: '#fff' }}>Out No</th>
                                  <th style={{ color: '#fff' }}>Out Date</th>
                                  <th style={{ color: '#fff' }}>Series</th>
                                  <th style={{ color: '#fff' }}>Supp Code</th>
                                  <th style={{ color: '#fff' }}>Supplier Name</th>
                                  <th style={{ color: '#fff' }}>Status</th>
                                  <th style={{ color: '#fff', textAlign: 'right' }}>Out</th>
                                  <th style={{ color: '#fff', textAlign: 'right' }}>Inn</th>
                                  <th style={{ color: '#fff', textAlign: 'right' }}>Bal.</th>
                                  <th style={{ color: '#fff' }}>Unit</th>
                                  <th style={{ color: '#fff', textAlign: 'center' }}>Age Days</th>
                                  <th style={{ color: '#fff', textAlign: 'center' }}>View</th>
                                </tr>
                              </thead>
                              <tbody>
                                {subconAgeingTableData.map((item, idx) => (
                                  <tr key={idx}>
                                    <td style={{ textAlign: "center" }}>{item.sr}</td>
                                    <td style={{ color: '#007bff', fontWeight: 700 }}>{item.outNo}</td>
                                    <td>{item.outDate}</td>
                                    <td>{item.series}</td>
                                    <td>{item.suppCode}</td>
                                    <td style={{ fontWeight: 700, fontSize: 11 }}>{item.supplierName}</td>
                                    <td>{item.status}</td>
                                    <td style={{ textAlign: "right", fontWeight: 700 }}>{item.out}</td>
                                    <td style={{ textAlign: "right", fontWeight: 700 }}>{item.inn}</td>
                                    <td style={{ textAlign: "right", fontWeight: 700, color: '#ef4444' }}>{item.bal}</td>
                                    <td>{item.unit}</td>
                                    <td style={{ textAlign: "center", fontWeight: 700 }}>{item.ageDays}</td>
                                    <td style={{ textAlign: "center" }}>
                                      <button style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>{item.view}</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="dn-subcon-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: '#334155' }}>Total Records : 01</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <button className="dn-icon-btn small excel" style={{ border: '1px solid #cbd5e1', color: '#16a34a', background: '#fff', width: 'auto', padding: '4px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                                Export (ItemWise)
                              </button>
                              <button className="dn-icon-btn small excel" style={{ border: '1px solid #cbd5e1', color: '#16a34a', background: '#fff', width: 'auto', padding: '4px 12px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                                Export
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}



          {activeDept === "quality" && (
            <div className="dn-ppc-view fade-in">
              <div className="dn-accordion-container">
                {qcAccordionList.map((label) => {
                  const isOpen = expandedSections[label];
                  return (
                    <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                      <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                        <div className="dn-acc-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                          {label}
                        </div>
                        <div className="dn-acc-right">
                          <span>{isOpen ? "Hide" : "Show"}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>


                      {isOpen && label === "Trend of Rejection % at Operation Level" && (
                        <div className="dn-card-body dn-ppc-body">
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc" }}>
                            <div className="dn-f-left">
                              <div className="dn-f-item sm">Plant : <select className="dn-mini-select"><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">Month : <select className="dn-mini-select"><option>Apr-2026</option></select></div>
                              <button className="dn-icon-btn small excel" style={{ flexShrink: 0 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Excel
                              </button>
                              <div className="dn-f-item sm" style={{ marginLeft: 8 }}>
                                <input type="radio" name="qcChartType" defaultChecked style={{ margin: 0 }} /> Production
                              </div>
                            </div>
                            <div className="dn-f-right">
                              <div style={{ display: 'flex', gap: 12, fontSize: 11, fontWeight: 600 }}>
                                <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Item Wise Rejection..</a>
                                <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>View Operatorwise Rejection...</a>
                                <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>View More...</a>
                              </div>
                            </div>
                          </div>

                          <div style={{ padding: '10px 15px' }}>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={qcRejectionTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { fontSize: 11, fontWeight: 600 } }} />
                                <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: 'Percentage', angle: -90, position: 'insideLeft', style: { fontSize: 11, fontWeight: 600 } }} domain={[0, 0.8]} />
                                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} label={{ value: 'PPM', angle: 90, position: 'insideRight', style: { fontSize: 11, fontWeight: 600 } }} domain={[0, 8000]} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                                <Line yAxisId="left" type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Rejection %" />
                                <Line yAxisId="right" type="monotone" dataKey="ppm" stroke="#000000" strokeWidth={2} dot={{ r: 3 }} name="PPM" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, padding: '8px 15px', fontSize: 10, borderTop: '1px solid #e2e8f0' }}>
                            <span style={{ fontWeight: 600 }}>* Reject / Rework Qty as per Prod Entry and Inprocess QC</span>
                            <span style={{ background: '#334155', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700 }}>Reject / Material Defect (MD)</span>
                            <span style={{ background: '#10b981', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700 }}>Rework / Process Defect (PD)</span>
                          </div>
                          <div style={{ textAlign: 'center', fontSize: 10, padding: '4px 0 10px', color: '#ef4444', fontWeight: 700 }}>
                            * PPM=(Prod Qty / (MDQty OR PDQty))*100
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Itemwise Reject" && (
                        <div className="dn-card-body dn-ppc-body">
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: '6px 16px', background: '#f1f5f9' }}>
                            <div className="dn-f-left" style={{ gap: 15, flexWrap: 'wrap', alignItems: 'center' }}>
                              <div className="dn-f-item sm">Type: <label style={{ display: 'inline-flex', alignItems: 'center', gap: 4, margin: 0, fontWeight: 700 }}><input type="radio" name="itRType" defaultChecked style={{ margin: 0 }} /> Production</label></div>
                              <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">From Date : <input type="text" className="dn-mini-input" defaultValue="09/04/2026" style={{ width: 80 }} /></div>
                              <div className="dn-f-item sm">To Date : <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} /></div>
                              <div className="dn-f-item sm">Reason : <select className="dn-mini-select" style={{ width: 80 }}><option>ALL</option></select></div>
                              <button className="dn-btn-search" style={{ height: 24, padding: '0 12px' }}>Search</button>
                              <div style={{ display: 'flex', gap: 6 }}>
                                <button className="dn-icon-btn small excel" style={{ gap: 4, padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 10, fontWeight: 700, width: 'auto' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Item-Wise
                                </button>
                                <button className="dn-icon-btn small excel" style={{ gap: 4, padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 10, fontWeight: 700, width: 'auto' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Reason-Wise
                                </button>
                              </div>
                              <div style={{ fontSize: 10, fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                                <span>Reason : <span style={{ color: '#ef4444' }}>* Rejection Qty as per Prod Entry and Inprocess QC</span> <a href="#" style={{ color: '#007bff', marginLeft: 4 }}>View More</a></span>
                                <a href="#" style={{ color: '#007bff', borderLeft: '1px solid #cbd5e1', paddingLeft: 10, fontWeight: 700 }}>Rejection Pareto Chart</a>
                              </div>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 30, background: '#007bff', color: '#fff', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Item No</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Item Code</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Part No</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Item Desc</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'center' }}>OP.No</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Prod. Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Rej. Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>%</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>PPM (10000 %)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {qcItemWiseRejectData.map(item => (
                                  <tr key={item.sr}>
                                    <td style={{ textAlign: 'center' }}>{item.sr}</td>
                                    <td>{item.itemNo}</td>
                                    <td>{item.itemCode}</td>
                                    <td>{item.partNo}</td>
                                    <td style={{ fontSize: 9 }}>{item.desc}</td>
                                    <td style={{ textAlign: 'center' }}>{item.opNo}</td>
                                    <td style={{ textAlign: 'right' }}>{item.prodQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.rejQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.per}</td>
                                    <td style={{ textAlign: 'right' }}>{item.ppm}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div style={{ background: '#fff', padding: '15px 0' }}>
                            <ResponsiveContainer width="100%" height={260}>
                              <PieChart>
                                <Pie
                                  data={qcRejectPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={0}
                                  outerRadius={65}
                                  paddingAngle={0}
                                  dataKey="value"
                                  labelLine={false}
                                  label={(props) => <CustomPieLabel {...props} data={qcRejectPieData} />}
                                >
                                  {qcRejectPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15, padding: '10px 0', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                              <div style={{ fontSize: 10, fontWeight: 700 }}>View Top : <input type="text" className="dn-mini-input" defaultValue="100" style={{ width: 40, height: 20 }} /></div>
                              <div style={{ display: 'flex', gap: 10, fontSize: 10, fontWeight: 700 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 3, margin: 0 }}><input type="radio" name="qcChartW" defaultChecked style={{ margin: 0 }} /> Qty Wise</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 3, margin: 0 }}><input type="radio" name="qcChartW" style={{ margin: 0 }} /> % Wise</label>
                              </div>
                              <div className="dn-status-badge-green" style={{ padding: '3px 12px', fontSize: 10, fontWeight: 700, borderRadius: 12 }}>Total Qty : 723</div>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 30, background: '#007bff', color: '#fff', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Reject Reason</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Prod Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Rej Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>%</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>PPM (* 10000)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {qcReasonWiseRejectData.map(item => (
                                  <tr key={item.sr}>
                                    <td style={{ textAlign: 'center' }}>{item.sr}</td>
                                    <td style={{ fontWeight: 600 }}>{item.reason}</td>
                                    <td style={{ textAlign: 'right' }}>{item.prodQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.rejQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.per}</td>
                                    <td style={{ textAlign: 'right' }}>{item.ppm}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Itemwise Rework" && (
                        <div className="dn-card-body dn-ppc-body">
                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 16px', background: '#f1f5f9' }}>
                            <div className="dn-f-left" style={{ gap: 15, flexWrap: 'nowrap', alignItems: 'center' }}>
                              <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>SHARP</option></select></div>
                              <div className="dn-f-item sm">From Date : <input type="text" className="dn-mini-input" defaultValue="09/04/2026" style={{ width: 80 }} /></div>
                              <div className="dn-f-item sm">To Date : <input type="text" className="dn-mini-input" defaultValue="11/04/2026" style={{ width: 80 }} /></div>
                              <div className="dn-f-item sm"><label style={{ display: 'inline-flex', alignItems: 'center', gap: 4, margin: 0, fontWeight: 700 }}><input type="radio" name="itRWType" defaultChecked style={{ margin: 0 }} /> Production</label></div>
                              <button className="dn-btn-search" style={{ height: 24, padding: '0 12px' }}>Search</button>
                              <div style={{ display: 'flex', gap: 6 }}>
                                <button className="dn-icon-btn small excel" style={{ gap: 4, padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 10, fontWeight: 700, width: 'auto' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Item-Wise
                                </button>
                                <button className="dn-icon-btn small excel" style={{ gap: 4, padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 10, fontWeight: 700, width: 'auto' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Reason-Wise
                                </button>
                              </div>
                              <div style={{ fontSize: 10, fontWeight: 600, color: '#334155', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ color: '#007bff' }}>* Rework Qty as per Prod Entry and Inprocess QC</span>
                                <a href="#" style={{ color: '#007bff', borderLeft: '1px solid #cbd5e1', paddingLeft: 10, fontWeight: 700 }}>Rework Pareto Chart</a>
                              </div>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 30, background: '#007bff', color: '#fff', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Item No</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Part No</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Item Desc</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'center' }}>OP.No</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Prod. Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Rew. Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>%</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>PPM (% * 10000)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr><td colSpan="9" style={{ textAlign: 'center', color: '#94a3b8', padding: 20 }}>No Data Found !!</td></tr>
                              </tbody>
                            </table>
                          </div>

                          <div style={{ background: '#fff', padding: '15px 0' }}>
                            <ResponsiveContainer width="100%" height={260}>
                              <PieChart>
                                <Pie
                                  data={qcReworkPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={0}
                                  outerRadius={65}
                                  paddingAngle={0}
                                  dataKey="value"
                                  labelLine={false}
                                  label={(props) => <CustomPieLabel {...props} data={qcReworkPieData} />}
                                >
                                  {qcReworkPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15, padding: '10px 0', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', gap: 10, fontSize: 10, fontWeight: 700 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 3, margin: 0 }}><input type="radio" name="qcRWChartW" defaultChecked style={{ margin: 0 }} /> Qty Wise</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 3, margin: 0 }}><input type="radio" name="qcRWChartW" style={{ margin: 0 }} /> % Wise</label>
                              </div>
                              <div className="dn-status-badge-green" style={{ padding: '3px 12px', fontSize: 10, fontWeight: 700, borderRadius: 12 }}>Total Qty : 981</div>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 30, background: '#007bff', color: '#fff', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Rework Reason</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Prod Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>Rew Qty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>%</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>PPM (% * 10000)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {qcReasonWiseReworkData.map(item => (
                                  <tr key={item.sr}>
                                    <td style={{ textAlign: 'center' }}>{item.sr}</td>
                                    <td style={{ fontWeight: 600 }}>{item.reason}</td>
                                    <td style={{ textAlign: 'right' }}>{item.prodQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.rewQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.per}</td>
                                    <td style={{ textAlign: 'right' }}>{item.ppm}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Scrap Value Report" && (
                        <div className="dn-card-body dn-ppc-body erp-style-content" style={{ padding: 0 }}>
                          <div className="dn-inner-filter-bar erp-filters" style={{ padding: '8px 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderBottom: '1px solid #e2e8f0', gap: 20 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Plant :
                              <select className="dn-mini-select" style={{ border: 'none', borderBottom: '2px solid #000', borderRadius: 0, paddingLeft: 0, minWidth: 60, fontWeight: 700, marginLeft: 5 }}>
                                <option>SHARP</option>
                              </select>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Month :
                              <select className="dn-mini-select" style={{ border: '1px solid #000', borderRadius: 4, height: 26, minWidth: 100, fontWeight: 700, marginLeft: 5 }}>
                                <option>Apr-2026</option>
                              </select>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                              <a href="#" style={{ fontSize: 12, color: '#007bff', fontWeight: 600 }}>View More...</a>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container erp-report-area" style={{ height: 350, background: '#fff', display: 'flex', alignItems: 'flex-end' }}>
                            {/* Empty area as per screenshot, using height to match visual space */}
                            <div style={{ width: '100%', height: 20, background: '#f8fafc', borderTop: '1px solid #e2e8f0', position: 'relative' }}>
                              <div style={{ position: 'absolute', left: 0, top: -1, width: 20, height: '100%', background: '#fff', borderRight: '1px solid #e2e8f0' }}></div>
                            </div>
                          </div>

                          <div style={{ padding: '6px 16px', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#007bff', display: 'flex', alignItems: 'center', gap: 5 }}>
                              <span style={{ color: '#000' }}>&laquo;</span>
                              Values &rarr; Production &rarr; Scrap/Rejection &rarr; FG Scrap Rejection Entry : Note Type = 'Scrap', Rate=Sales Order
                              <span style={{ color: '#000', marginLeft: 'auto' }}>&raquo;</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Sales Return (Customer)" && (
                        <div className="dn-card-body dn-ppc-body">
                          <div style={{ padding: '15px', background: '#fff' }}>
                            <ResponsiveContainer width="100%" height={280}>
                              <LineChart data={qcSalesReturnData} margin={{ top: 10, right: 30, left: 20, bottom: 45 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c0c0c0" />
                                <XAxis dataKey="month" tick={{ fontSize: 9, angle: -45, textAnchor: 'end' }} label={{ value: '- M o n t h -', position: 'insideBottom', offset: -35, style: { fontSize: 11, fontWeight: 600 } }} />
                                <YAxis tick={{ fontSize: 10 }} label={{ value: 'ItemQty', angle: -90, position: 'insideLeft', offset: -5, style: { fontSize: 11, fontWeight: 600 } }} domain={[0, 1000]} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                                <Line type="monotone" dataKey="qty" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} name="Item Qty" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: '#f1f5f9', padding: '6px 16px', flexWrap: 'wrap' }}>
                            <div className="dn-f-left" style={{ gap: 8, flexWrap: 'wrap' }}>
                              <div className="dn-f-item sm">Year : <select className="dn-mini-select"><option>2026-2027</option></select></div>
                              <div className="dn-f-item sm">plant : <select className="dn-mini-select"><option>SHARP</option></select></div>
                              <span style={{ fontSize: 10, fontWeight: 600, color: '#334155' }}>Search Option :</span>
                              <label style={{ fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}><input type="radio" name="qcSearchOption" style={{ margin: 0 }} /> Customer Count</label>
                              <label style={{ fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}><input type="radio" name="qcSearchOption" style={{ margin: 0 }} /> Item Count</label>
                              <label style={{ fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}><input type="radio" name="qcSearchOption" defaultChecked style={{ margin: 0 }} /> Item Qty</label>
                              <label style={{ fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}><input type="radio" name="qcSearchOption" style={{ margin: 0 }} /> Item Value</label>
                            </div>
                            <div className="dn-f-right">
                              <button className="dn-icon-btn small excel" style={{ gap: 4, padding: '4px 10px', borderRadius: 4, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 11, fontWeight: 600, width: 'auto' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> Export To Excel
                              </button>
                            </div>
                          </div>

                          <div style={{ padding: '4px 16px 0', fontSize: 10, fontWeight: 700, color: '#ef4444' }}>** Values GST Sales Return</div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr style={{ background: '#007bff', color: '#fff' }}>
                                  <th style={{ width: 40, background: '#007bff', color: '#fff', textAlign: 'center' }}>Sr.</th>
                                  <th style={{ background: '#007bff', color: '#fff' }}>Month</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>CustCount</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>ItemCount</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>ItemQty</th>
                                  <th style={{ background: '#007bff', color: '#fff', textAlign: 'right' }}>ItemValue</th>
                                </tr>
                              </thead>
                              <tbody>
                                {qcSalesReturnTableData.map(item => (
                                  <tr key={item.sr}>
                                    <td style={{ textAlign: 'center' }}>{item.sr}</td>
                                    <td>{item.month}</td>
                                    <td style={{ textAlign: 'right' }}>{item.custCount}</td>
                                    <td style={{ textAlign: 'right' }}>{item.itemCount}</td>
                                    <td style={{ textAlign: 'right' }}>{item.itemQty}</td>
                                    <td style={{ textAlign: 'right' }}>{item.itemValue}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {isOpen && label === "Customer Complaint CAPA" && (
                        <div className="dn-card-body dn-ppc-body">
                          <div className="dn-inner-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <div className="dn-f-left">
                              <div className="dn-f-item sm">Year :
                                <select className="dn-mini-select" style={{ marginLeft: 5 }}>
                                  <option>2026-2027</option>
                                </select>
                              </div>
                              <button className="dn-btn-search" style={{ height: 28, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 5, backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                Search
                              </button>
                            </div>
                            <div className="dn-f-right">
                              <button
                                className="dn-icon-btn small excel"
                                style={{ width: 32, height: 32, border: '1px solid #cbd5e1', backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="dn-chart-content" style={{ padding: '20px 0' }}>
                            <ResponsiveContainer width="100%" height={320}>
                              <BarChart data={qcComplaintCapaData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                                <XAxis
                                  dataKey="month"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fontSize: 10, fontWeight: 700, fill: '#334155' }}
                                  angle={-45}
                                  textAnchor="end"
                                  interval={0}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={40} />
                                <Bar dataKey="completed" fill="#f59e0b" radius={[2, 2, 0, 0]} barSize={40} />
                              </BarChart>
                            </ResponsiveContainer>

                            <div className="dn-chart-custom-legend" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: -30, marginBottom: 20 }}>
                              <div style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Total complaint</div>
                              <div style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Completed complaint</div>
                            </div>
                          </div>

                          <div className="dn-table-scroll-container">
                            <table className="dn-erp-table high-density">
                              <thead>
                                <tr className="erp-th-gradient">
                                  <th style={{ width: 40, textAlign: 'center' }}>Sr.</th>
                                  <th>Type</th>
                                  <th style={{ textAlign: 'right' }}>APR-2026</th>
                                  <th style={{ textAlign: 'right' }}>MAY-2026</th>
                                </tr>
                              </thead>
                              <tbody>
                                {qcComplaintTableData.map((row) => (
                                  <tr key={row.sr}>
                                    <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                    <td>{row.type}</td>
                                    <td style={{ textAlign: 'right' }}>{row.apr}</td>
                                    <td style={{ textAlign: 'right' }}>{row.may}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
      {/* --- Add Favorite Item Modal --- */}
      {showAddFavoriteModal && (
        <div className="dn-modal-overlay">
          <div className="dn-modal-container scale-in" style={{ maxWidth: '700px' }}>
            <div className="dn-modal-header">
              <span>Add Favourite Item</span>
              <button
                className="dn-modal-close-x"
                onClick={() => setShowAddFavoriteModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="dn-modal-body">
              <div className="dn-modal-section-title" style={{ color: '#007bff', fontWeight: 700, marginBottom: '15px' }}>
                Favourite Items Master
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Item Code / No :</span>
                <input
                  type="text"
                  placeholder="Enter Item Code.."
                  style={{
                    width: '180px',
                    height: '28px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '0 10px',
                    fontSize: '12px'
                  }}
                />
                <button style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  padding: '4px 15px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  Save
                </button>
              </div>

              <div style={{
                border: '1px solid #00cfd5',
                padding: '12px',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '12px',
                marginBottom: '10px',
                minHeight: '200px'
              }}>
                No Data Found !!!
              </div>

              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>
                Total Record : 0
              </div>
            </div>

            <div className="dn-modal-footer">
              <button
                className="dn-modal-btn-close"
                onClick={() => setShowAddFavoriteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
