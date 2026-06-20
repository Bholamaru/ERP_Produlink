import React, { useState, useEffect } from 'react';
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

  const [poMonthSelectOpen, setPoMonthSelectOpen] = useState(false);

  useEffect(() => {
    if (poMonthSelectOpen) {
      const handleScroll = () => {
        setPoMonthSelectOpen(false);
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [poMonthSelectOpen]);

  const [monthlyPurchaseYear, setMonthlyPurchaseYear] = useState('2026-2027');
  const [monthlyPurchaseData, setMonthlyPurchaseData] = useState(() => {
    const startYear = 2026;
    const months = [
      { name: 'Apr', yr: startYear },
      { name: 'May', yr: startYear },
      { name: 'Jun', yr: startYear },
      { name: 'Jul', yr: startYear },
      { name: 'Aug', yr: startYear },
      { name: 'Sep', yr: startYear },
      { name: 'Oct', yr: startYear },
      { name: 'Nov', yr: startYear },
      { name: 'Dec', yr: startYear },
      { name: 'Jan', yr: startYear + 1 },
      { name: 'Feb', yr: startYear + 1 },
      { name: 'Mar', yr: startYear + 1 }
    ];
    return months.map(m => ({ month: `${m.name}-${m.yr}`, value: 0 }));
  });

  useEffect(() => {
    const getDefaultMonthlyData = (yearStr) => {
      const startYear = parseInt(yearStr.split('-')[0]) || 2026;
      const months = [
        { name: 'Apr', yr: startYear },
        { name: 'May', yr: startYear },
        { name: 'Jun', yr: startYear },
        { name: 'Jul', yr: startYear },
        { name: 'Aug', yr: startYear },
        { name: 'Sep', yr: startYear },
        { name: 'Oct', yr: startYear },
        { name: 'Nov', yr: startYear },
        { name: 'Dec', yr: startYear },
        { name: 'Jan', yr: startYear + 1 },
        { name: 'Feb', yr: startYear + 1 },
        { name: 'Mar', yr: startYear + 1 }
      ];
      return months.map(m => ({ month: `${m.name}-${m.yr}`, value: 0 }));
    };

    const fetchMonthlyPurchaseData = async () => {
      const apiYear = monthlyPurchaseYear.split('-')[0];
      try {
        const response = await fetch(`http://127.0.0.1:8000/Dashboard/financial-grn-total/?year=${apiYear}`);
        if (!response.ok) throw new Error("Failed to fetch monthly purchase data");
        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          const monthShortNames = {
            "January": "Jan", "February": "Feb", "March": "Mar", "April": "Apr",
            "May": "May", "June": "Jun", "July": "Jul", "August": "Aug",
            "September": "Sep", "October": "Oct", "November": "Nov", "December": "Dec"
          };
          const mapped = result.data.map((item) => {
            const shortMonth = monthShortNames[item.month] || item.month.slice(0, 3);
            return {
              month: `${shortMonth}-${item.year}`,
              value: Number((item.total / 100000).toFixed(2))
            };
          });
          setMonthlyPurchaseData(mapped);
        } else {
          setMonthlyPurchaseData(getDefaultMonthlyData(monthlyPurchaseYear));
        }
      } catch (error) {
        console.error("Error fetching monthly purchase data:", error);
        setMonthlyPurchaseData(getDefaultMonthlyData(monthlyPurchaseYear));
      }
    };
    fetchMonthlyPurchaseData();
  }, [monthlyPurchaseYear]);

  const [dailyPurchaseFilters, setDailyPurchaseFilters] = useState({
    month: 'april',
    year: 2026
  });

  const [dailyMonthSelectOpen, setDailyMonthSelectOpen] = useState(false);

  useEffect(() => {
    if (dailyMonthSelectOpen) {
      const handleScroll = () => {
        setDailyMonthSelectOpen(false);
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [dailyMonthSelectOpen]);

  const [dailyPurchaseData, setDailyPurchaseData] = useState(() => {
    const daysInMonth = new Date(2026, 4, 0).getDate(); // April has 30 days
    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: `${(i + 1).toString().padStart(2, '0')}-Apr`,
      value: 0
    }));
  });

  useEffect(() => {
    const financialYearStart = parseInt(monthlyPurchaseYear.split('-')[0]) || 2026;
    setDailyPurchaseFilters(prev => ({ ...prev, year: financialYearStart }));
  }, [monthlyPurchaseYear]);

  useEffect(() => {
    const getDefaultDailyData = (monthName, yearVal) => {
      const monthMapping = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };
      const monthNum = monthMapping[monthName.toLowerCase()] || 4;
      const daysInMonth = new Date(yearVal, monthNum, 0).getDate();
      const monthShort = monthName.charAt(0).toUpperCase() + monthName.slice(1, 3);
      return Array.from({ length: daysInMonth }, (_, i) => ({
        day: `${(i + 1).toString().padStart(2, '0')}-${monthShort}`,
        value: 0
      }));
    };

    const fetchDailyPurchaseData = async () => {
      const monthMapping = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };
      const monthNum = monthMapping[dailyPurchaseFilters.month.toLowerCase()] || 4;
      const targetYear = ['january', 'february', 'march'].includes(dailyPurchaseFilters.month.toLowerCase())
        ? dailyPurchaseFilters.year + 1
        : dailyPurchaseFilters.year;

      try {
        const response = await fetch(`http://127.0.0.1:8000/Dashboard/Purchase/grn-monthly-total/?month=${monthNum}&year=${targetYear}`);
        if (!response.ok) throw new Error("Failed to fetch daily purchase data");
        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          const monthShort = dailyPurchaseFilters.month.charAt(0).toUpperCase() + dailyPurchaseFilters.month.slice(1, 3);
          const mapped = result.data.map((item) => ({
            day: `${item.day.toString().padStart(2, '0')}-${monthShort}`,
            value: item.total || 0
          }));
          setDailyPurchaseData(mapped);
        } else {
          setDailyPurchaseData(getDefaultDailyData(dailyPurchaseFilters.month, targetYear));
        }
      } catch (error) {
        console.error("Error fetching daily purchase data:", error);
        setDailyPurchaseData(getDefaultDailyData(dailyPurchaseFilters.month, targetYear));
      }
    };
    fetchDailyPurchaseData();
  }, [dailyPurchaseFilters]);

  const [top5Filters, setTop5Filters] = useState({
    plant: 'sharp',
    month: 'april2026',
    top: 5,
    type: 'supplier'
  });

  const [poData, setPoData] = useState([
    { id: 1, name: 'Raw Material', count: 0, amount: 0, color: '#6366f1' },
    { id: 2, name: 'Consumable', count: 0, amount: 0, color: '#f59e0b' },
    { id: 3, name: 'Service', count: 0, amount: 0, color: '#10b981' },
    { id: 4, name: 'Asset/Equip', count: 0, amount: 0, color: '#06b6d4' },
    { id: 5, name: 'Import', count: 0, amount: 0, color: '#ef4444' },
    { id: 6, name: 'Jobwork', count: 0, amount: 0, color: '#8b5cf6' }
  ]);

  useEffect(() => {
    const monthMapping = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
    };

    const match = poFilters.month.match(/^([a-z]+)(\d{4})$/i);
    let month = 4;
    let year = 2026;
    if (match) {
      const monthName = match[1].toLowerCase();
      month = monthMapping[monthName] || 4;
      year = parseInt(match[2]) || 2026;
    }

    const fetchPoData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Dashboard/purchase/purchase-po-summary/?month=${month}&year=${year}`);
        if (!response.ok) throw new Error("Failed to fetch PO summary");
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          const seriesConfig = {
            'RM': { name: 'Raw Material', color: '#6366f1' },
            'CONSUMABLE': { name: 'Consumable', color: '#f59e0b' },
            'SERVICE': { name: 'Service', color: '#10b981' },
            'ASSET': { name: 'Asset/Equip', color: '#06b6d4' },
            'IMPORT': { name: 'Import', color: '#ef4444' },
            'JOBWORK': { name: 'Jobwork', color: '#8b5cf6' }
          };
          const mapped = result.data.map((item, idx) => {
            const config = seriesConfig[item.series] || { name: item.series, color: '#64748b' };
            return {
              id: idx + 1,
              name: config.name,
              count: item.count || 0,
              amount: item.assessable_value || 0,
              color: config.color
            };
          });
          setPoData(mapped);
        }
      } catch (error) {
        console.error("Error fetching PO data:", error);
      }
    };

    fetchPoData();
  }, [poFilters.month]);

  const [top5MonthSelectOpen, setTop5MonthSelectOpen] = useState(false);

  useEffect(() => {
    if (top5MonthSelectOpen) {
      const handleScroll = () => {
        setTop5MonthSelectOpen(false);
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [top5MonthSelectOpen]);

  const [top5Data, setTop5Data] = useState([
    { id: 1, name: 'Alpha Steel Forging Ltd.', qty: 15200, uom: 'KG', amount: 125000, color: '#6366f1' },
    { id: 2, name: 'Gamma Plastics', qty: 4500, uom: 'KG', amount: 65000, color: '#f59e0b' },
    { id: 3, name: 'Mega Electronics', qty: 850, uom: 'PCS', amount: 45000, color: '#10b981' },
    { id: 4, name: 'Delta Fasteners', qty: 22000, uom: 'PCS', amount: 35000, color: '#ef4444' },
    { id: 5, name: 'Omega Tools INC', qty: 120, uom: 'BX', amount: 22000, color: '#06b6d4' },
  ]);

  useEffect(() => {
    const fetchTop5Data = async () => {
      const monthMapping = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };

      const match = top5Filters.month.match(/^([a-z]+)(\d{4})$/i);
      let month = 4;
      let year = 2026;
      if (match) {
        const monthName = match[1].toLowerCase();
        month = monthMapping[monthName] || 4;
        year = parseInt(match[2]) || 2026;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/Dashboard/top-five-suppliers/?month=${month}&year=${year}`);
        if (!response.ok) throw new Error("Failed to fetch top 5 suppliers");
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];
          const mapped = result.data.map((item, idx) => ({
            id: idx + 1,
            name: item.supplier,
            qty: item.grn_qty || 0,
            uom: '-',
            amount: item.total || 0,
            color: colors[idx % colors.length]
          }));
          setTop5Data(mapped);
        }
      } catch (error) {
        console.error("Error fetching top 5 data:", error);
      }
    };

    fetchTop5Data();
  }, [top5Filters.month]);

  const [grnDetailsFilters, setGrnDetailsFilters] = useState({
    fromDate: '',
    toDate: '',
    partNo: ''
  });
  const [grnDetailsData, setGrnDetailsData] = useState([]);

  const fetchGrnDetails = async () => {
    if (!grnDetailsFilters.fromDate || !grnDetailsFilters.toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`http://127.0.0.1:8000/Dashboard/item-wise-grn-report/?from_date=${grnDetailsFilters.fromDate}&to_date=${grnDetailsFilters.toDate}&part_no=${grnDetailsFilters.partNo}`, {
        headers
      });
      if (!response.ok) throw new Error("Failed to fetch GRN details");
      const result = await response.json();
      if (result.status && Array.isArray(result.data)) {
        setGrnDetailsData(result.data);
      } else {
        setGrnDetailsData([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
      setGrnDetailsData([]);
    }
  };

  const totalGrnQty = grnDetailsData.reduce((sum, item) => sum + (item.total_grn_qty || 0), 0);
  const totalGrnAmount = grnDetailsData.reduce((sum, item) => sum + (item.total_ass_value || 0), 0);

  const [grnSummaryFilters, setGrnSummaryFilters] = useState({
    fromDate: '',
    toDate: ''
  });
  const [grnSummaryData, setGrnSummaryData] = useState([]);

  const fetchGrnSummary = async () => {
    if (!grnSummaryFilters.fromDate || !grnSummaryFilters.toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`http://127.0.0.1:8000/Dashboard/main-group-wise-grn-report/?from_date=${grnSummaryFilters.fromDate}&to_date=${grnSummaryFilters.toDate}`, {
        headers
      });
      if (!response.ok) throw new Error("Failed to fetch GRN summary");
      const result = await response.json();
      if (result.status && Array.isArray(result.data)) {
        const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];
        const mapped = result.data.map((item, idx) => ({
          id: idx + 1,
          name: item.main_group || '-',
          qty: item.total_grn_qty || 0,
          amount: item.total_ass_value || 0,
          color: colors[idx % colors.length]
        }));
        setGrnSummaryData(mapped);
      } else {
        setGrnSummaryData([]);
      }
    } catch (error) {
      console.error("Error fetching GRN summary:", error);
      setGrnSummaryData([]);
    }
  };

  const chartData = poData.map(item => ({
    ...item,
    value: poFilters.view === 'AMOUNT' ? item.amount : item.count
  })).filter(item => item.value > 0);

  const displayedTop5Data = (top5Filters.type === 'items' ? [
    { id: 1, name: 'Steel Sheet 5mm', qty: 12000, uom: 'KG', amount: 95000, color: '#6366f1' },
    { id: 2, name: 'Gear Oil Lubricant', qty: 350, uom: 'LTR', amount: 45000, color: '#f59e0b' },
    { id: 3, name: 'HEX Bolt M12', qty: 25000, uom: 'PCS', amount: 30000, color: '#10b981' },
    { id: 4, name: 'Copper Wire 2mm', qty: 800, uom: 'MTR', amount: 25000, color: '#ef4444' },
    { id: 5, name: 'Aluminium Bar 10mm', qty: 1200, uom: 'KG', amount: 18000, color: '#06b6d4' },
  ] : top5Data).slice(0, Number(top5Filters.top) || 5);

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
                <Select 
                  value={monthlyPurchaseYear} 
                  onChange={(e) => setMonthlyPurchaseYear(e.target.value)}
                  size="small" 
                  sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}
                >
                  <MenuItem value="2025-2026">2025-2026</MenuItem>
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
                  data={monthlyPurchaseData} 
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
                  {monthlyPurchaseData.map((d, idx) => (
                    <th key={idx} className="px-5 py-3 text-[10px] font-black text-[#64748b] border-r border-[#e2e8f0] last:border-r-0 uppercase tracking-tighter whitespace-nowrap">
                      {d.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#f8fafc] transition-colors">
                  {monthlyPurchaseData.map((d, idx) => (
                    <td key={idx} className="px-5 py-4 text-center border-r border-[#e2e8f0] last:border-r-0">
                      <Typography className="text-[13px] font-black text-[#1e293b]">{d.value.toFixed(1)}</Typography>
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
                <Select 
                  open={dailyMonthSelectOpen}
                  onOpen={() => setDailyMonthSelectOpen(true)}
                  onClose={() => setDailyMonthSelectOpen(false)}
                  value={dailyPurchaseFilters.month} 
                  onChange={(e) => setDailyPurchaseFilters(prev => ({ ...prev, month: e.target.value }))}
                  size="small" 
                  sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '110px', bgcolor: 'white' }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="april">April</MenuItem>
                  <MenuItem value="may">May</MenuItem>
                  <MenuItem value="june">June</MenuItem>
                  <MenuItem value="july">July</MenuItem>
                  <MenuItem value="august">August</MenuItem>
                  <MenuItem value="september">September</MenuItem>
                  <MenuItem value="october">October</MenuItem>
                  <MenuItem value="november">November</MenuItem>
                  <MenuItem value="december">December</MenuItem>
                  <MenuItem value="january">January</MenuItem>
                  <MenuItem value="february">February</MenuItem>
                  <MenuItem value="march">March</MenuItem>
                </Select>
              </div>
              <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                <TableIcon sx={{ fontSize: 18, color: 'white' }} />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-[#fff7ed] border border-[#ffedd5] px-6 py-1.5 rounded-full shadow-sm">
              <Typography className="text-[#9a3412] text-[13px] font-black tracking-tight">
                Daily Purchase: {dailyPurchaseFilters.month.charAt(0).toUpperCase() + dailyPurchaseFilters.month.slice(1)}-{['january', 'february', 'march'].includes(dailyPurchaseFilters.month.toLowerCase()) ? dailyPurchaseFilters.year + 1 : dailyPurchaseFilters.year}
              </Typography>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar pb-4">
            <div style={{ width: '230.77%', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={dailyPurchaseData} 
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
                open={poMonthSelectOpen}
                onOpen={() => setPoMonthSelectOpen(true)}
                onClose={() => setPoMonthSelectOpen(false)}
                value={poFilters.month} 
                onChange={(e) => setPoFilters(prev => ({ ...prev, month: e.target.value }))}
                size="small" 
                sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '130px', bgcolor: 'white' }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="april2026">April 2026</MenuItem>
                <MenuItem value="may2026">May 2026</MenuItem>
                <MenuItem value="june2026">June 2026</MenuItem>
                <MenuItem value="july2026">July 2026</MenuItem>
                <MenuItem value="august2026">August 2026</MenuItem>
                <MenuItem value="september2026">September 2026</MenuItem>
                <MenuItem value="october2026">October 2026</MenuItem>
                <MenuItem value="november2026">November 2026</MenuItem>
                <MenuItem value="december2026">December 2026</MenuItem>
                <MenuItem value="january2027">January 2027</MenuItem>
                <MenuItem value="february2027">February 2027</MenuItem>
                <MenuItem value="march2027">March 2027</MenuItem>
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
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center">{poData.reduce((acc, row) => acc + row.count, 0)}</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-right">₹{poData.reduce((acc, row) => acc + row.amount, 0).toLocaleString()}</td>
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
              <Select 
                open={top5MonthSelectOpen}
                onOpen={() => setTop5MonthSelectOpen(true)}
                onClose={() => setTop5MonthSelectOpen(false)}
                value={top5Filters.month} 
                onChange={(e) => setTop5Filters(prev => ({ ...prev, month: e.target.value }))} 
                size="small" 
                sx={{ height: '32px', fontSize: '13px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="april2026">April 2026</MenuItem>
                <MenuItem value="may2026">May 2026</MenuItem>
                <MenuItem value="june2026">June 2026</MenuItem>
                <MenuItem value="july2026">July 2026</MenuItem>
                <MenuItem value="august2026">August 2026</MenuItem>
                <MenuItem value="september2026">September 2026</MenuItem>
                <MenuItem value="october2026">October 2026</MenuItem>
                <MenuItem value="november2026">November 2026</MenuItem>
                <MenuItem value="december2026">December 2026</MenuItem>
                <MenuItem value="january2027">January 2027</MenuItem>
                <MenuItem value="february2027">February 2027</MenuItem>
                <MenuItem value="march2027">March 2027</MenuItem>
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
                    <Pie data={displayedTop5Data} cx="50%" cy="50%" innerRadius={0} outerRadius={110} paddingAngle={2} dataKey="amount" stroke="rgba(255,255,255,0.2)" strokeWidth={1} filter="url(#3dShadow)" label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, color }) => {
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
                      {displayedTop5Data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
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
                {displayedTop5Data.map((row) => (
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
                <input 
                  type="date" 
                  value={grnSummaryFilters.fromDate} 
                  onChange={(e) => setGrnSummaryFilters(prev => ({ ...prev, fromDate: e.target.value }))}
                  className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
                />
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
                <input 
                  type="date" 
                  value={grnSummaryFilters.toDate} 
                  onChange={(e) => setGrnSummaryFilters(prev => ({ ...prev, toDate: e.target.value }))}
                  className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
                />
              </div>
            </div>
            <Button 
              variant="contained" 
              onClick={fetchGrnSummary}
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
                {grnSummaryData.map((row) => (
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
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-center">{grnSummaryData.reduce((acc, row) => acc + row.qty, 0).toLocaleString()}</td>
                  <td className="px-6 py-6 text-[14px] font-black text-[#1e293b] text-right">₹{grnSummaryData.reduce((acc, row) => acc + row.amount, 0).toLocaleString()}</td>
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
                      data={grnSummaryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="amount"
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
                      {grnSummaryData.map((entry, index) => (
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
              <input 
                type="date" 
                value={grnDetailsFilters.fromDate} 
                onChange={(e) => setGrnDetailsFilters(prev => ({ ...prev, fromDate: e.target.value }))}
                className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
              />
              <Typography className="text-[13px] font-black text-[#64748b]">To</Typography>
              <input 
                type="date" 
                value={grnDetailsFilters.toDate} 
                onChange={(e) => setGrnDetailsFilters(prev => ({ ...prev, toDate: e.target.value }))}
                className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
              />
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
              <input 
                type="text" 
                placeholder="Enter Item No" 
                value={grnDetailsFilters.partNo} 
                onChange={(e) => setGrnDetailsFilters(prev => ({ ...prev, partNo: e.target.value }))}
                className="w-[140px] h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[13px] font-medium text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
              />
            </div>
            <Button 
              variant="contained" 
              onClick={fetchGrnDetails}
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
                  {grnDetailsData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-5 py-5 text-[13px] font-black text-[#475569]">{idx + 1}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.part_no || '-'}</td>
                      <td className="px-5 py-5 text-[13px] font-semibold text-[#1e293b]">{row.Part_Code || '-'}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.Name_Description || '-'}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] uppercase">{row.main_group || '-'}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.item_group || '-'}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{'-'}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">{row.total_grn_qty || 0}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b]">₹{(row.total_ass_value || 0).toLocaleString()}</td>
                      <td className="px-5 py-5 text-[13px] font-black text-[#1e293b] uppercase tracking-tighter">GRN</td>
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
            <Typography className="text-[16px] font-black text-[#1e293b]">{totalGrnQty.toLocaleString()}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[14px] font-black text-[#64748b]">Total Amount:</Typography>
            <Typography className="text-[18px] font-black text-[#2563eb]">₹{totalGrnAmount.toLocaleString()}</Typography>
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
