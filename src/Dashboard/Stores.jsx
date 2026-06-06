import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TableIcon from '@mui/icons-material/TableChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Stores = () => {
  const [deptView, setDeptView] = useState('dept');
  const [valueView, setValueView] = useState('qty');

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favoriteStockData = [
    { id: 1, itemNo: 'IT001', desc: 'MS Pipe', group: 'RM', size: '10MM', unit: 'PCS', stock: 120, shopfloor: 40, f4qty: 10, total: 170 },
    { id: 2, itemNo: 'IT002', desc: 'Nut Bolt', group: 'Hardware', size: 'M12', unit: 'PCS', stock: 450, shopfloor: 100, f4qty: 50, total: 600 },
    { id: 3, itemNo: 'IT003', desc: 'Cutting Oil', group: 'Consumable', size: '5LTR', unit: 'CAN', stock: 32, shopfloor: 8, f4qty: 4, total: 44 },
  ];

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Top Info Card */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between mb-8">
        <Box>
          <Typography className="text-[28px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Inventory & Stores Management
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-semibold">
            Enterprise module for tracking stock levels, warehouse movements, and inventory valuation.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <FormControl size="small" className="min-w-[180px]">
            <Select
              value="2026-2027"
              className="bg-[#f8fafc] rounded-[12px]"
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                fontSize: '14px',
                height: '44px',
                fontWeight: 800,
                color: '#475569'
              }}
            >
              <MenuItem value="2026-2027">FY 2026-2027</MenuItem>
              <MenuItem value="2025-2026">FY 2025-2026</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon sx={{ fontSize: 20 }} />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[44px] rounded-[12px] font-black shadow-lg shadow-blue-500/20 normal-case text-[14px] transition-all"
            disableElevation
          >
            Export Sheet
          </Button>
        </Box>
      </Box>

      {/* Favorite Item Stock Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>FAVORITE ITEM STOCK</Typography>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="contained" 
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[36px] rounded-[10px] font-black normal-case text-[13px] shadow-sm transition-all"
            >
              Add Favorite
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon sx={{ fontSize: 18 }} />}
              className="border-[#e2e8f0] text-[#64748b] hover:bg-gray-50 px-5 h-[36px] rounded-[10px] font-black normal-case text-[13px] transition-all"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR.', 'ITEM NO.', 'ITEM DESC', 'ITEM GROUP', 'SIZE', 'UNIT', 'STOCK', 'SHOPFLOOR', 'F4QTY', 'TOTAL', 'VIEW'].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left last:text-center">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {favoriteStockData.map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                  <td className="px-5 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.itemNo}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#2563eb] text-center">{row.desc}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center uppercase">{row.group}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.size}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#64748b] text-center">{row.unit}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.stock}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.shopfloor}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.f4qty}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.total}</td>
                  <td className="px-5 py-5 text-center">
                    <VisibilityIcon sx={{ fontSize: 18, color: '#3b82f6', cursor: 'pointer', '&:hover': { color: '#1d4ed8' } }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-[#f8fafc] px-6 py-4 border-t border-[#eef2f6]">
          <Typography className="text-[#1e293b] text-[13px] font-black uppercase tracking-tight">
            Total Records: {favoriteStockData.length}
          </Typography>
        </div>
      </Box>

      {/* MIN/MAX Levels Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>MIN/MAX LEVELS</Typography>
          </div>
          <Typography className="text-[#2563eb] text-[14px] font-black cursor-pointer hover:underline">View More</Typography>
        </div>

        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[12px] p-3 mb-8 flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
            <Select value="sharp" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="sharp">Sharp</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b]">Item Class:</Typography>
            <Select value="select" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="select">Select</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b]">Master Store:</Typography>
            <Select value="all" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b]">Main Group:</Typography>
            <Select value="all" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b]">Item Group:</Typography>
            <Select value="all" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <Button 
            variant="contained" 
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white h-[32px] px-6 rounded-[6px] font-black normal-case text-[12px] ml-auto"
            startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
          >
            Search
          </Button>
        </div>

        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  {['SR.', 'MAIN GROUP', 'ITEM NO/CODE', 'ITEM DESC.', 'MIN LEVEL', 'RE-ORDER LEVEL', 'MAX LEVEL', 'STOCK', 'WO QTY', 'DIFF.', 'UNIT', 'RATE', 'AMOUNT'].map(h => (
                    <th key={h} className="px-5 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {[
                  { id: 1, main: 'RM', code: 'ITEM-1000', desc: 'Industrial Component 0', min: 50, reorder: 70, max: 150, stock: 12, wo: 2, diff: -38, unit: 'PCS', rate: 147, amt: 1764 },
                  { id: 2, main: 'Hardware', code: 'ITEM-1001', desc: 'Industrial Component 1', min: 50, reorder: 70, max: 150, stock: 114, wo: 7, diff: 64, unit: 'PCS', rate: 99, amt: 11286 },
                  { id: 3, main: 'Consumable', code: 'ITEM-1002', desc: 'Industrial Component 2', min: 50, reorder: 70, max: 150, stock: 16, wo: 4, diff: -34, unit: 'PCS', rate: 50, amt: 800 },
                  { id: 4, main: 'RM', code: 'ITEM-1003', desc: 'Industrial Component 3', min: 50, reorder: 70, max: 150, stock: 120, wo: 7, diff: 70, unit: 'PCS', rate: 64, amt: 7680 },
                  { id: 5, main: 'Hardware', code: 'ITEM-1004', desc: 'Industrial Component 4', min: 50, reorder: 70, max: 150, stock: 125, wo: 9, diff: 75, unit: 'PCS', rate: 119, amt: 14875 },
                  { id: 6, main: 'Consumable', code: 'ITEM-1005', desc: 'Industrial Component 5', min: 50, reorder: 70, max: 150, stock: 167, wo: 4, diff: 117, unit: 'PCS', rate: 58, amt: 9686 },
                  { id: 7, main: 'RM', code: 'ITEM-1006', desc: 'Industrial Component 6', min: 50, reorder: 70, max: 150, stock: 129, wo: 4, diff: 79, unit: 'PCS', rate: 57, amt: 7353 },
                  { id: 8, main: 'Hardware', code: 'ITEM-1007', desc: 'Industrial Component 7', min: 50, reorder: 70, max: 150, stock: 99, wo: 8, diff: 49, unit: 'PCS', rate: 48, amt: 4752 },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                    <td className="px-5 py-5 text-[12px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b]">{row.main}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b]">{row.code}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b]">{row.desc}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.min}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.reorder}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.max}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.stock}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.wo}</td>
                    <td className={`px-5 py-5 text-[12px] font-black text-center ${row.diff < 0 ? 'text-[#ef4444]' : 'text-[#1e293b]'}`}>{row.diff}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#64748b] text-center">{row.unit}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-center">₹{row.rate}</td>
                    <td className="px-5 py-5 text-[12px] font-black text-[#1e293b] text-right">₹{row.amt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Legend */}
        <div className="mt-6 flex items-center justify-between bg-[#f8fafc] px-6 py-4 border-t border-[#eef2f6]">
          <div className="flex items-center gap-6">
            <Typography className="text-[13px] font-black text-[#1e293b] uppercase tracking-tight">TOTAL RECORDS: 8</Typography>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-[#fee2e2] text-[#991b1b] text-[11px] font-black rounded-md border border-[#fecaca]">Min Level</div>
              <div className="px-3 py-1 bg-[#ffedd5] text-[#9a3412] text-[11px] font-black rounded-md border border-[#fed7aa]">Min Level To Re-Order Level</div>
              <div className="px-3 py-1 bg-[#dcfce7] text-[#166534] text-[11px] font-black rounded-md border border-[#bbf7d0]">Re-Order To Max Level</div>
              <div className="px-3 py-1 bg-[#dbeafe] text-[#1e40af] text-[11px] font-black rounded-md border border-[#bfdbfe]">Above Max Level</div>
            </div>
          </div>
          <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>
      </Box>

      {/* Inward Stock Dist Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#00a36c] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>INWARD STOCK DIST.</Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
              <Select value="sharp" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">Month:</Typography>
              <Select value="april2026" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}>
                <MenuItem value="april2026">April 2026</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
          {/* Left Side: Donut Chart */}
          <Box className="p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden border-r border-[#eef2f6]">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Purchase GRN', value: 1204, color: '#6366f1' },
                      { name: 'Return Inward', value: 450, color: '#f59e0b' },
                      { name: 'Production', value: 890, color: '#10b981' },
                      { name: 'Transfer In', value: 210, color: '#ef4444' },
                      { name: 'Opening stock', value: 600, color: '#06b6d4' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, color }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 30;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[14px] font-black">
                          {value}
                        </text>
                      );
                    }}
                  >
                    {[
                      { color: '#6366f1' },
                      { color: '#f59e0b' },
                      { color: '#10b981' },
                      { color: '#ef4444' },
                      { color: '#06b6d4' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Box>

          {/* Right Side: Table */}
          <Box className="bg-[#fcfcfc] p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[80px]">SR.</th>
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider">INWARD TYPE</th>
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {[
                  { id: 1, name: 'Purchase GRN', value: 1204, color: '#6366f1' },
                  { id: 2, name: 'Return Inward', value: 450, color: '#f59e0b' },
                  { id: 3, name: 'Production', value: 890, color: '#10b981' },
                  { id: 4, name: 'Transfer In', value: 210, color: '#ef4444' },
                  { id: 5, name: 'Opening stock', value: 600, color: '#06b6d4' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                    <td className="px-8 py-6 text-[14px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <Typography className="text-[15px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[15px] font-black text-[#1e293b] text-right">{row.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>
      </Box>

      {/* Outward Stock Dist Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#ef4444] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>OUTWARD STOCK DIST.</Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
              <Select value="sharp" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">Month:</Typography>
              <Select value="april2026" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}>
                <MenuItem value="april2026">April 2026</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
          {/* Left Side: Donut Chart */}
          <Box className="p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden border-r border-[#eef2f6]">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Sales', value: 1100, color: '#6366f1' },
                      { name: 'Issue', value: 750, color: '#f59e0b' },
                      { name: 'Transfer Out', value: 320, color: '#10b981' },
                      { name: 'Damage', value: 45, color: '#ef4444' },
                      { name: 'Return', value: 88, color: '#06b6d4' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, color }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 30;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[14px] font-black">
                          {value}
                        </text>
                      );
                    }}
                  >
                    {[
                      { color: '#6366f1' },
                      { color: '#f59e0b' },
                      { color: '#10b981' },
                      { color: '#ef4444' },
                      { color: '#06b6d4' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Box>

          {/* Right Side: Table */}
          <Box className="bg-[#fcfcfc] p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[80px]">SR.</th>
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider">OUTWARD TYPE</th>
                  <th className="px-8 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {[
                  { id: 1, name: 'Sales', value: 1100, color: '#6366f1' },
                  { id: 2, name: 'Issue', value: 750, color: '#f59e0b' },
                  { id: 3, name: 'Transfer Out', value: 320, color: '#10b981' },
                  { id: 4, name: 'Damage', value: 45, color: '#ef4444' },
                  { id: 5, name: 'Return', value: 88, color: '#06b6d4' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                    <td className="px-8 py-6 text-[14px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <Typography className="text-[15px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[15px] font-black text-[#1e293b] text-right">{row.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>
      </Box>

      {/* Material Issue Challan Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>MATERIAL ISSUE CHALLAN</Typography>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[12px] p-4 mb-8 flex items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
            <Select value="sharp" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="sharp">Sharp</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Item SubGroup:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">From</Typography>
            <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
            <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0]" />
            <Typography className="text-[13px] font-black text-[#64748b]">Items:</Typography>
            <input type="text" placeholder="Search Item..." className="w-[180px] h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-medium text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
          </div>
          <Button 
            variant="contained" 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[36px] rounded-[8px] font-black normal-case text-[13px] shadow-lg shadow-blue-500/20"
            startIcon={<SearchIcon sx={{ fontSize: 18 }} />}
          >
            Search
          </Button>
          <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm ml-auto">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR.NO.', 'ITEM NO.', 'DESC.', 'MAIN GROUP', 'ITEM GROUP', 'QTY', 'UNIT', 'RATE', 'VALUE'].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, no: 'IT001', desc: 'Issue log - Line 1', main: 'RM', group: 'Metals', qty: 471, unit: 'PCS', rate: 120, value: 5000 },
                { id: 2, no: 'IT002', desc: 'Issue log - Line 2', main: 'RM', group: 'Metals', qty: 379, unit: 'PCS', rate: 120, value: 5000 },
                { id: 3, no: 'IT003', desc: 'Issue log - Line 3', main: 'RM', group: 'Metals', qty: 315, unit: 'PCS', rate: 120, value: 5000 },
                { id: 4, no: 'IT004', desc: 'Issue log - Line 1', main: 'RM', group: 'Metals', qty: 497, unit: 'PCS', rate: 120, value: 5000 },
                { id: 5, no: 'IT005', desc: 'Issue log - Line 2', main: 'RM', group: 'Metals', qty: 342, unit: 'PCS', rate: 120, value: 5000 },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                  <td className="px-5 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.no}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#6366f1]">{row.desc}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] uppercase">{row.main}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.group}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-right">{row.qty}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.unit}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-right">₹{row.rate}</td>
                  <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] text-right">₹{row.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sophisticated Footer Controls */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDeptView('dept')}>
                <input type="radio" name="deptView" checked={deptView === 'dept'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                <Typography className={`text-[13px] font-black ${deptView === 'dept' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Dept. Wise</Typography>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDeptView('category')}>
                <input type="radio" name="deptView" checked={deptView === 'category'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                <Typography className={`text-[13px] font-black ${deptView === 'category' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Dept. Category Wise</Typography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-6 py-2 border border-[#eef2f6] rounded-[10px] shadow-sm">
                <Typography className="text-[13px] font-black text-[#1e293b]">
                  <span className="text-[#64748b] mr-2">Total Records:</span> 10
                </Typography>
              </div>
              <div className="bg-white px-6 py-2 border border-[#eef2f6] rounded-[10px] shadow-sm">
                <Typography className="text-[13px] font-black text-[#1e293b]">
                  <span className="text-[#64748b] mr-2">Total Qty:</span> 3,402
                </Typography>
              </div>
              <div className="bg-white px-6 py-2 border border-[#eef2f6] rounded-[10px] shadow-sm">
                <Typography className="text-[13px] font-black text-[#1e293b]">
                  <span className="text-[#64748b] mr-2">Total Value:</span> ₹120,500
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setValueView('qty')}>
                <input type="radio" name="valueView" checked={valueView === 'qty'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                <Typography className={`text-[13px] font-black ${valueView === 'qty' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Quantity</Typography>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setValueView('value')}>
                <input type="radio" name="valueView" checked={valueView === 'value'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                <Typography className={`text-[13px] font-black ${valueView === 'value' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Value</Typography>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Typography className="text-[12px] font-black text-[#64748b] italic">
                **Item rate from last GRM/Item master**
              </Typography>
              <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                <TableIcon sx={{ fontSize: 18, color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      </Box>

      {/* Item Wise Stock Report Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>ITEM WISE STOCK REPORT</Typography>
          </div>
        </div>

        {/* Filter Controls Row 1 */}
        <div className="flex items-center flex-wrap gap-4 mb-6 bg-[#f8fafc] p-4 rounded-[12px] border border-[#eef2f6]">
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
            <Select value="sharp" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '120px', bgcolor: 'white' }}>
              <MenuItem value="sharp">Sharp</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Store:</Typography>
            <Select value="minstore" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '120px', bgcolor: 'white' }}>
              <MenuItem value="minstore">MinStore</MenuItem>
            </Select>
          </div>
          <div className="flex items-center bg-white border border-[#e2e8f0] rounded-[8px] h-[36px] px-3 w-[280px]">
            <input type="text" placeholder="Search Item..." className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-[#1e293b]" />
            <SearchIcon sx={{ fontSize: 18, color: '#2563eb', cursor: 'pointer' }} />
          </div>
          <Button 
            variant="outlined" 
            className="border-[#e2e8f0] text-[#64748b] hover:bg-gray-50 px-4 h-[36px] rounded-[8px] font-black normal-case text-[13px]"
            startIcon={<Typography sx={{ fontSize: '16px', fontWeight: 900 }}>✕</Typography>}
          >
            Clear
          </Button>
          <Typography className="text-[#2563eb] text-[13px] font-black cursor-pointer hover:underline ml-2">-View Schedules</Typography>
        </div>

        {/* Filter Controls Row 2: Category Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#1e293b', 
              color: 'white', 
              px: 4, 
              height: '40px', 
              borderRadius: '10px', 
              fontWeight: 900, 
              fontSize: '13px', 
              textTransform: 'none', 
              boxShadow: 'none',
              '&:hover': { bgcolor: '#0f172a', boxShadow: 'none' }
            }}
          >
            FG/FSG/WIP Stock
          </Button>
          <Button 
            variant="outlined"
            sx={{ 
              bgcolor: '#f8fafc', 
              color: '#1e293b', 
              borderColor: '#e2e8f0', 
              px: 4, 
              height: '40px', 
              borderRadius: '10px', 
              fontWeight: 900, 
              fontSize: '13px', 
              textTransform: 'none', 
              boxShadow: 'none',
              '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
            }}
          >
            RM Stock
          </Button>
          <Button 
            variant="outlined"
            sx={{ 
              bgcolor: '#f8fafc', 
              color: '#1e293b', 
              borderColor: '#e2e8f0', 
              px: 4, 
              height: '40px', 
              borderRadius: '10px', 
              fontWeight: 900, 
              fontSize: '13px', 
              textTransform: 'none', 
              boxShadow: 'none',
              '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
            }}
          >
            Consumable Stock
          </Button>
        </div>

        {/* Stock Report Table */}
        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR.', 'ITEM NO', 'ITEM DESCRIPTION', 'ITEM SIZE', 'GROUP NAME', 'UNITS', 'REJECT QTY', 'SHOP FLOOR', 'STOCKS'].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, no: 'FG001', desc: 'Finished Product A', size: 'Large', group: 'FG', unit: 'PCS', rej: 4, floor: 22, stock: 180 },
                { id: 2, no: 'RM010', desc: 'Steel Rod', size: '10MM', group: 'RM', unit: 'KG', rej: 1, floor: 10, stock: 520 },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.id}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.no}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.desc}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.size}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.group}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.unit}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-center">{row.rej}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-center">{row.floor}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right font-black">{row.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
};

export default Stores;
