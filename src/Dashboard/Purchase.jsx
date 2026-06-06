import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableIcon from '@mui/icons-material/TableChart';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts';

const Purchase = () => {
  const [fiscalYear, setFiscalYear] = useState('2026-2027');
  const [poFilters, setPoFilters] = useState({
    plant: 'sharp',
    month: 'april2026',
    view: 'AMOUNT'
  });

  const [top5Filters, setTop5Filters] = useState({
    plant: 'sharp',
    month: 'april2026',
    top: 5,
    type: 'supplier'
  });

  const poData = [
    { id: 1, name: 'Raw Material', count: 25, amount: 45000, color: '#6366f1' },
    { id: 2, name: 'Consumable', count: 42, amount: 12000, color: '#f59e0b' },
    { id: 3, name: 'Hardware', count: 15, amount: 8500, color: '#10b981' },
    { id: 4, name: 'Packaging', count: 10, amount: 2500, color: '#ef4444' },
    { id: 5, name: 'Asset/Equip', count: 4, amount: 32000, color: '#06b6d4' },
  ];

  const top5Data = [
    { id: 1, name: 'Alpha Steel Forging Ltd.', qty: 15200, uom: 'KG', amount: 125000, color: '#6366f1' },
    { id: 2, name: 'Gamma Plastics', qty: 4500, uom: 'KG', amount: 65000, color: '#f59e0b' },
    { id: 3, name: 'Mega Electronics', qty: 850, uom: 'PCS', amount: 45000, color: '#10b981' },
    { id: 4, name: 'Delta Fasteners', qty: 22000, uom: 'PCS', amount: 35000, color: '#ef4444' },
    { id: 5, name: 'Omega Tools INC', qty: 120, uom: 'BX', amount: 22000, color: '#06b6d4' },
  ];

  const chartData = poData.map(item => ({
    ...item,
    value: poFilters.view === 'AMOUNT' ? item.amount : item.count
  }));

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Top Info Card */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between mb-8">
        <Box>
          <Typography className="text-[28px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Procurement & Purchase Operations
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-semibold">
            Enterprise module for tracking purchase orders, vendor performance, and procurement trends.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <FormControl size="small" className="min-w-[180px]">
            <Select
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
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

      {/* Dashboard Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Monthly Purchase Section */}
        <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
              <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>MONTHLY PURCHASE</Typography>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
                <Select value="sharp" size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="sharp">Sharp</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">Year:</Typography>
                <Select value="2026-2027" size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}>
                  <MenuItem value="2026-2027">2026-2027</MenuItem>
                </Select>
              </div>
              <Typography className="text-[#ef4444] text-[11px] font-black italic ml-2">*Values are in Lacs(GRN)</Typography>
            </div>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar pb-4">
            <div style={{ width: '200%', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[
                    { month: 'Apr-2026', value: 110.2 },
                    { month: 'May-2026', value: 135.5 },
                    { month: 'Jun-2026', value: 180.1 },
                    { month: 'Jul-2026', value: 237.6 },
                    { month: 'Aug-2026', value: 145.0 },
                    { month: 'Sep-2026', value: 201.2 },
                    { month: 'Oct-2026', value: 220.4 },
                    { month: 'Nov-2026', value: 195.8 },
                    { month: 'Dec-2026', value: 175.2 },
                    { month: 'Jan-2027', value: 205.5 },
                    { month: 'Feb-2027', value: 190.3 },
                    { month: 'Mar-2027', value: 250.0 }
                  ]} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 800 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 800 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 shadow-xl border border-[#eef2f6] rounded-xl">
                            <Typography className="text-[11px] font-black text-[#64748b] uppercase mb-1">{payload[0].payload.month}</Typography>
                            <Typography className="text-[16px] font-black text-[#2563eb]">₹{payload[0].value} LACS</Typography>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto custom-scrollbar border border-[#e2e8f0] rounded-[14px] bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  {['APR-2026', 'MAY-2026', 'JUN-2026', 'JUL-2026', 'AUG-2026', 'SEP-2026', 'OCT-2026', 'NOV-2026', 'DEC-2026', 'JAN-2027', 'FEB-2027', 'MAR-2027'].map(m => (
                    <th key={m} className="px-5 py-3 text-[10px] font-black text-[#64748b] border-r border-[#e2e8f0] last:border-r-0 uppercase tracking-tighter whitespace-nowrap">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#f8fafc] transition-colors">
                  {[110.2, 135.5, 180.1, 237.6, 145.0, 201.2, 220.4, 195.8, 175.2, 205.5, 190.3, 250.0].map((v, i) => (
                    <td key={i} className="px-5 py-4 text-center border-r border-[#e2e8f0] last:border-r-0">
                      <Typography className="text-[13px] font-black text-[#1e293b]">{v.toFixed(1)}</Typography>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Box>

        {/* Daily Purchase Section */}
        <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
              <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>DAILY PURCHASE</Typography>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
                <Select value="sharp" size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="sharp">Sharp</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2 pr-2 border-r border-[#cbd5e1]">
                <Typography className="text-[13px] font-black text-[#64748b]">Month:</Typography>
                <Select value="april" size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
                  <MenuItem value="april">April</MenuItem>
                </Select>
              </div>
              <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                <TableIcon sx={{ fontSize: 18, color: 'white' }} />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-[#fff7ed] border border-[#ffedd5] px-6 py-1.5 rounded-full shadow-sm">
              <Typography className="text-[#9a3412] text-[13px] font-black tracking-tight">Daily Purchase: April-2026</Typography>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar pb-4">
            <div style={{ width: '230.77%', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={Array.from({ length: 30 }, (_, i) => ({
                    day: `${(i + 1).toString().padStart(2, '0')}-Apr`,
                    value: [580000, 520000, 180000, 390000, 120000, 560000, 350000, 300000, 310000, 190000, 360000, 600000, 300000, 430000][i % 14] || Math.floor(Math.random() * 400000) + 100000
                  }))} 
                  margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} 
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 shadow-xl border border-[#eef2f6] rounded-xl">
                            <Typography className="text-[11px] font-black text-[#64748b] uppercase mb-1">{payload[0].payload.day}</Typography>
                            <Typography className="text-[16px] font-black text-[#6366f1]">₹{payload[0].value.toLocaleString()}</Typography>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Box>
      </Box>

      {/* Purchase Orders Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>PURCHASE ORDERS</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select 
                value={poFilters.plant} 
                onChange={(e) => setPoFilters(prev => ({ ...prev, plant: e.target.value }))}
                size="small" 
                sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}
              >
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2 pr-2 border-r border-[#cbd5e1]">
              <Typography className="text-[13px] font-black text-[#64748b]">Month:</Typography>
              <Select 
                value={poFilters.month} 
                onChange={(e) => setPoFilters(prev => ({ ...prev, month: e.target.value }))}
                size="small" 
                sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '130px', bgcolor: 'white' }}
              >
                <MenuItem value="april2026">April 2026</MenuItem>
              </Select>
            </div>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
          <Box className="border-r border-[#eef2f6] bg-[#fcfcfc] p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[60px]">SR.</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider">SERIES NAME</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center">TOTAL PO</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">AMOUNT (BASIC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {poData.map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                    <td className="px-6 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <Typography className="text-[14px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                      </div>
                    </td>
                    <td className={`px-6 py-5 text-[14px] font-black transition-colors ${poFilters.view === 'COUNT' ? 'text-[#2563eb]' : 'text-[#1e293b]'} text-center`}>{row.count}</td>
                    <td className={`px-6 py-5 text-[14px] font-black transition-colors ${poFilters.view === 'AMOUNT' ? 'text-[#2563eb]' : 'text-[#1e293b]'} text-right`}>₹{row.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-[#f8fafc] font-black">
                  <td colSpan={2} className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center uppercase tracking-widest">TOTAL</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center">96</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-right">₹1,00,000</td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box className="p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden">
            <div className="w-full h-[380px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div style={{ transform: 'rotateX(35deg) translateY(20px)', width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <filter id="3dShadow" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                        <feOffset dx="0" dy="15" result="offsetblur" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={1}
                      filter="url(#3dShadow)"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, color }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 1.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[12px] font-black" style={{ transform: 'rotateX(-35deg)' }}>
                            {poFilters.view === 'AMOUNT' ? `₹${value.toLocaleString()}` : `${value} POs`}
                            <tspan x={x} dy="1.2em" fill="#94a3b8" className="text-[10px] uppercase font-bold">{name}</tspan>
                          </text>
                        );
                      }}
                    >
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center gap-8 mt-4">
              <div onClick={() => setPoFilters(prev => ({ ...prev, view: 'COUNT' }))} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 ${poFilters.view === 'COUNT' ? 'border-[#2563eb]' : 'border-[#cbd5e1]'} flex items-center justify-center transition-all`}>
                  {poFilters.view === 'COUNT' && <div className="w-2 h-2 rounded-full bg-[#2563eb]" />}
                </div>
                <Typography className={`text-[12px] font-black transition-colors ${poFilters.view === 'COUNT' ? 'text-[#1e293b]' : 'text-[#94a3b8]'} uppercase`}>Total PO</Typography>
              </div>
              <div onClick={() => setPoFilters(prev => ({ ...prev, view: 'AMOUNT' }))} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 ${poFilters.view === 'AMOUNT' ? 'border-[#2563eb]' : 'border-[#cbd5e1]'} flex items-center justify-center transition-all`}>
                  {poFilters.view === 'AMOUNT' && <div className="w-2 h-2 rounded-full bg-[#2563eb]" />}
                </div>
                <Typography className={`text-[12px] font-black transition-colors ${poFilters.view === 'AMOUNT' ? 'text-[#1e293b]' : 'text-[#94a3b8]'} uppercase`}>PO Amount</Typography>
              </div>
            </div>
          </Box>
        </div>
      </Box>

      {/* Top 5 Suppliers / Top 5 Items Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>TOP 5 SUPPLIERS / TOP 5 ITEMS</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select value={top5Filters.plant} onChange={(e) => setTop5Filters(prev => ({ ...prev, plant: e.target.value }))} size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Select Months:</Typography>
              <Select value={top5Filters.month} onChange={(e) => setTop5Filters(prev => ({ ...prev, month: e.target.value }))} size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}>
                <MenuItem value="april2026">April 2026</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Top:</Typography>
              <input type="number" value={top5Filters.top} onChange={(e) => setTop5Filters(prev => ({ ...prev, top: e.target.value }))} className="w-12 h-8 border border-[#e2e8f0] rounded-[6px] text-center text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
            <div className="flex items-center gap-2 pr-2 border-r border-[#cbd5e1]">
              <Typography className="text-[13px] font-black text-[#64748b]">Select Type:</Typography>
              <Select value={top5Filters.type} onChange={(e) => setTop5Filters(prev => ({ ...prev, type: e.target.value }))} size="small" sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '110px', bgcolor: 'white' }}>
                <MenuItem value="supplier">Supplier</MenuItem>
                <MenuItem value="items">Items</MenuItem>
              </Select>
            </div>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
          <Box className="lg:col-span-5 p-4 flex flex-col items-center justify-center bg-white relative overflow-hidden border-r border-[#eef2f6]">
            <div className="w-full h-[380px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div style={{ transform: 'rotateX(35deg) translateY(20px)', width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={top5Data} cx="50%" cy="50%" innerRadius={0} outerRadius={110} paddingAngle={2} dataKey="amount" stroke="rgba(255,255,255,0.2)" strokeWidth={1} filter="url(#3dShadow)" label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, color }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[12px] font-black" style={{ transform: 'rotateX(-35deg)' }}>
                          {`₹${value.toLocaleString()}`}
                          <tspan x={x} dy="1.2em" fill="#94a3b8" className="text-[9px] uppercase font-bold">{name}</tspan>
                        </text>
                      );
                    }}>
                      {top5Data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Box>

          <Box className="lg:col-span-7 bg-[#fcfcfc] p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[60px]">SR.</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider">SUPPLIER / ITEMS</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">QTY</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center">UOM</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {top5Data.map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                    <td className="px-6 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <Typography className="text-[14px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#1e293b] text-right">{row.qty.toLocaleString()}</td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#475569] text-center">{row.uom}</td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#1e293b] text-right">₹{row.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>

        <div className="mt-6 bg-[#f8fafc] px-6 py-4 border-t border-[#eef2f6]">
          <Typography className="text-[#2563eb] text-[13px] font-extrabold uppercase tracking-tight">
            *Top 5 Supplier / Items: Based On PO GRN & Direct GRN Values
          </Typography>
        </div>
      </Box>

      {/* GRN Value Summary Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>GRN VALUE SUMMARY</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select 
                value={poFilters.plant} 
                onChange={(e) => setPoFilters(prev => ({ ...prev, plant: e.target.value }))}
                size="small" 
                sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}
              >
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">From</Typography>
                <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
                <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              </div>
            </div>
            <Button 
              variant="contained" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[36px] rounded-[8px] font-black normal-case text-[13px] shadow-lg shadow-blue-500/20"
              startIcon={<TableIcon sx={{ fontSize: 16 }} />}
            >
              Search
            </Button>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm ml-2">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
          {/* Left Side: Table */}
          <Box className="border-r border-[#eef2f6] bg-[#fcfcfc] p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[60px]">SR.</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider">MAIN GROUP</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">GRN QTY</th>
                  <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">GRN AMT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {[
                  { id: 1, name: 'Raw Material', qty: 45020, amount: 2150000, color: '#6366f1' },
                  { id: 2, name: 'Consumable', qty: 12500, amount: 45000, color: '#f59e0b' },
                  { id: 3, name: 'Hardware', qty: 85000, amount: 35000, color: '#10b981' },
                  { id: 4, name: 'Spares', qty: 520, amount: 155000, color: '#ef4444' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                    <td className="px-6 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                        <Typography className="text-[14px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#1e293b] text-right">{row.qty.toLocaleString()}</td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#1e293b] text-right">₹{row.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-[#f8fafc] font-black">
                  <td colSpan={2} className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center uppercase tracking-widest">TOTAL</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center">143,040</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-right">₹2,385,000</td>
                </tr>
              </tbody>
            </table>
          </Box>

          {/* Right Side: Visual */}
          <Box className="p-4 flex flex-col items-center justify-center bg-white relative overflow-hidden">
            <div className="w-full h-[320px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div style={{ transform: 'rotateX(35deg) translateY(10px)', width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Raw Material', value: 2150000, color: '#6366f1' },
                        { name: 'Consumable', value: 45000, color: '#f59e0b' },
                        { name: 'Hardware', value: 35000, color: '#10b981' },
                        { name: 'Spares', value: 155000, color: '#ef4444' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={1}
                      filter="url(#3dShadow)"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, color }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 1.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[11px] font-black" style={{ transform: 'rotateX(-35deg)' }}>
                            {`₹${value.toLocaleString()}`}
                            <tspan x={x} dy="1.2em" fill="#94a3b8" className="text-[9px] uppercase font-bold">{name}</tspan>
                          </text>
                        );
                      }}
                    >
                      {[
                        { color: '#6366f1' },
                        { color: '#f59e0b' },
                        { color: '#10b981' },
                        { color: '#ef4444' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Box>
        </div>
      </Box>
      {/* GRN Value Details Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>GRN VALUE DETAILS</Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="sharp" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">From</Typography>
              <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
              <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Main Group:</Typography>
              <Select value="all" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Item Group:</Typography>
              <Select value="all" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0]" />
              <Typography className="text-[13px] font-black text-[#64748b]">Item:</Typography>
              <input type="text" placeholder="Enter Item" className="w-[140px] h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-medium text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
            <Button 
              variant="contained" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[36px] rounded-[8px] font-black normal-case text-[13px] shadow-lg shadow-blue-500/20"
            >
              Search
            </Button>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        {/* Vertical Scrollable Table */}
        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  {['SR.', 'ITEM NO.', 'ITEM CODE', 'ITEM DESC', 'MAIN GROUP', 'GROUP', 'ITEM SIZE', 'GRN QTY', 'AMT', 'ACT'].map(h => (
                    <th key={h} className="px-5 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '420px' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <tbody className="divide-y divide-[#f1f5f9]">
                  {[
                    { id: 1, no: 'IT001', code: 'CD-1000', desc: 'Industrial Material Type A', main: 'RM', group: 'Metals', size: '10MM', qty: 82, amt: 22731, act: 'GRN' },
                    { id: 2, no: 'IT002', code: 'CD-1001', desc: 'Industrial Material Type B', main: 'RM', group: 'Metals', size: '10MM', qty: 190, amt: 2945, act: 'GRN' },
                    { id: 3, no: 'IT003', code: 'CD-1002', desc: 'Industrial Material Type C', main: 'RM', group: 'Metals', size: '10MM', qty: 202, amt: 27639, act: 'GRN' },
                    { id: 4, no: 'IT004', code: 'CD-1003', desc: 'Industrial Material Type D', main: 'RM', group: 'Metals', size: '10MM', qty: 130, amt: 42501, act: 'GRN' },
                    { id: 5, no: 'IT005', code: 'CD-1004', desc: 'Industrial Material Type E', main: 'RM', group: 'Metals', size: '10MM', qty: 501, amt: 46194, act: 'GRN' },
                    { id: 6, no: 'IT006', code: 'CD-1005', desc: 'Industrial Material Type F', main: 'RM', group: 'Metals', size: '10MM', qty: 220, amt: 31475, act: 'GRN' },
                    { id: 7, no: 'IT007', code: 'CD-1006', desc: 'Industrial Material Type G', main: 'RM', group: 'Metals', size: '10MM', qty: 450, amt: 12500, act: 'GRN' },
                    { id: 8, no: 'IT008', code: 'CD-1007', desc: 'Industrial Material Type H', main: 'RM', group: 'Metals', size: '10MM', qty: 112, amt: 8900, act: 'GRN' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-5 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.no}</td>
                      <td className="px-5 py-5 text-[13px] font-semibold text-[#1e293b]">{row.code}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.desc}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] uppercase">{row.main}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.group}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.size}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.qty}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">₹{row.amt.toLocaleString()}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] uppercase tracking-tighter">{row.act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Aggregation */}
        <div className="mt-4 flex items-center justify-end gap-10 bg-[#f8fafc] px-8 py-4 border border-[#eef2f6] rounded-[12px]">
          <div className="flex items-center gap-2">
            <Typography className="text-[14px] font-black text-[#64748b]">Total Qty:</Typography>
            <Typography className="text-[16px] font-black text-[#1e293b]">2,214</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[14px] font-black text-[#64748b]">Total Amount:</Typography>
            <Typography className="text-[18px] font-black text-[#2563eb]">₹211,073</Typography>
          </div>
        </div>
      </Box>
      {/* Supplier Rating Summary Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>SUPPLIER RATING SUMMARY</Typography>
          </div>
          <div className="flex items-center gap-3">
            <Select value="purchase" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '110px', bgcolor: 'white' }}>
              <MenuItem value="purchase">Purchase</MenuItem>
            </Select>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="sharp" size="small" sx={{ height: '36px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white' }}>
                <MenuItem value="sharp">Sharp</MenuItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">From</Typography>
              <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
              <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0]" />
              <Typography className="text-[13px] font-black text-[#64748b]">Vendor:</Typography>
              <input type="text" placeholder="Enter Vendor Name" className="w-[160px] h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-medium text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
            <Button 
              variant="contained" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[36px] rounded-[8px] font-black normal-case text-[13px] shadow-lg shadow-blue-500/20"
            >
              Search
            </Button>
            <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR.', 'VENDOR / SUPPLIER', 'GRN QTY', 'OK QTY', 'REJ QTY', '%'].map(h => (
                  <th key={h} className="px-6 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, vendor: 'Alpha Inc', grn: 4888.70, ok: 4888.70, rej: 0.00, perc: '100%' },
                { id: 2, vendor: 'Beta Corp', grn: 2060.75, ok: 2060.75, rej: 0.00, perc: '100%' },
                { id: 3, vendor: 'Gamma LLC', grn: 5009.92, ok: 5009.92, rej: 0.00, perc: '100%' },
                { id: 4, vendor: 'Delta Partners', grn: 2892.81, ok: 2892.81, rej: 0.00, perc: '100%' },
                { id: 5, vendor: 'Sigma Forging', grn: 1537.50, ok: 1537.50, rej: 0.00, perc: '100%' },
                { id: 6, vendor: 'Omega Manufacturing', grn: 3002.81, ok: 3002.81, rej: 0.00, perc: '100%' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                  <td className="px-6 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#1e293b]">{row.vendor}</td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#1e293b]">{row.grn.toFixed(2)}</td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#1e293b]">{row.ok.toFixed(2)}</td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#1e293b]">{row.rej.toFixed(2)}</td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#1e293b]">{row.perc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="mt-4 flex items-center justify-end gap-10 bg-[#f8fafc] px-8 py-4 border border-[#eef2f6] rounded-[12px]">
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Total GRN Qty:</Typography>
            <Typography className="text-[15px] font-black text-[#1e293b]">19392.49</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Total OK Qty:</Typography>
            <Typography className="text-[15px] font-black text-[#2563eb]">19392.49</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[13px] font-black text-[#64748b]">Total Rej Qty:</Typography>
            <Typography className="text-[15px] font-black text-[#ef4444]">0.00</Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Purchase;
