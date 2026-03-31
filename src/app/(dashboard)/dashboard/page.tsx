"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { IssuerRecord, ReportFile } from "@/lib/types";
import { Search, TrendingUp, TrendingDown, Minus, X, Activity, AlertCircle, BarChart as BarChartIcon, FileText } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, LineChart, Line, CartesianGrid, YAxis } from "recharts";

function IndicatorBadge({ type }: { type: string }) {
  if (type.includes('Long')) return <span className="px-2.5 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 w-max"><TrendingUp className="w-3 h-3"/> {type}</span>;
  if (type.includes('Short')) return <span className="px-2.5 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 w-max"><TrendingDown className="w-3 h-3"/> {type}</span>;
  if (type === 'Avoid') return <span className="px-2.5 py-1 bg-red-50 text-red-800 dark:bg-red-900/10 dark:text-red-400 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 w-max border border-red-200 dark:border-red-800/50"><X className="w-3 h-3"/> Avoid</span>;
  return <span className="px-2.5 py-1 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 w-max"><Minus className="w-3 h-3"/> {type}</span>;
}

const SECTOR_TABS = [
  'Fundamentals',
  'Companies',
  'Valuations',
  'Sector Highlights'
];

export default function MarketOverviewDashboard() {
  const store = useAppStore();
  const { issuers, files } = store;
  
  const [activeInnerTab, setActiveInnerTab] = useState<string>("Fundamentals");
  
  // Header sector filter
  const [selectedSectorFilter, setSelectedSectorFilter] = useState("Auto");

  const [search, setSearch] = useState("");
  const [filterIndicator, setFilterIndicator] = useState<string | null>(null);
  
  const [sortField, setSortField] = useState<keyof IssuerRecord | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerRecord | null>(null);

  const handleSort = (field: keyof IssuerRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  const renderSectorSarmaayaView = () => {
    // Generate dummy KPIs based on selected sector to make it interactive feeling
    const isAuto = selectedSectorFilter === 'Auto';
    const kpis = {
      revenueChange: isAuto ? -2.8 : 4.5,
      netIncomeChange: isAuto ? -107.9 : 12.4,
      totalRevenue: isAuto ? 1.32 : 3.45,
      netIncome: isAuto ? -5.1 : 89.2,
      debt: isAuto ? 1.08 : 0.45
    };
    
    // Filter issuers by the dropdown sector
    let reportIssuers = issuers.filter(i => i.sector === selectedSectorFilter || (isAuto && i.sector === 'Auto'));
    
    // If we picked a sector with no seeded issuers, dummy up empty state or show all
    if (reportIssuers.length === 0) {
       reportIssuers = [];
    }

    let filteredIssuers = reportIssuers.filter(i => 
      (search ? i.issuerName.toLowerCase().includes(search.toLowerCase()) || (i.ticker && i.ticker.toLowerCase().includes(search.toLowerCase())) : true) &&
      (filterIndicator ? i.indicator === filterIndicator || i.indicator.includes(filterIndicator) : true)
    );

    if (sortField) {
      filteredIssuers.sort((a, b) => {
        const aVal = a[sortField] ?? 0;
        const bVal = b[sortField] ?? 0;
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      });
    } else {
      filteredIssuers.sort((a, b) => b.marketCap - a.marketCap);
    }

    // Chart mock data
    const revenueLineData = isAuto ? [
      { year: '2022', rev: 1.15 }, { year: '2023', rev: 1.25 }, { year: '2024', rev: 1.35 }, { year: '2025', rev: 1.32 }
    ] : [
      { year: '2022', rev: 2.1 }, { year: '2023', rev: 2.5 }, { year: '2024', rev: 3.0 }, { year: '2025', rev: 3.45 }
    ];
    
    const debtBarData = isAuto ? [
      { year: '2022', debt: 0.85 }, { year: '2023', debt: 0.95 }, { year: '2024', debt: 1.02 }, { year: '2025', debt: 1.08 }
    ] : [
      { year: '2022', debt: 0.4 }, { year: '2023', debt: 0.42 }, { year: '2024', debt: 0.44 }, { year: '2025', debt: 0.45 }
    ];

    return (
      <div className="space-y-6">
        {/* Sarmaaya-style Top Summary Header Row */}
        <div className="bg-zinc-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col xl:flex-row justify-between xl:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
             <h1 className="text-3xl font-extrabold tracking-tight">Sector Overview</h1>
             <div className="h-6 w-px bg-zinc-800 hidden sm:block"></div>
             <select 
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-white text-lg font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-zinc-800 cursor-pointer transition-colors appearance-none min-w-[200px]"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                <option value="Auto">Auto Sector</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Financials">Financials</option>
                <option value="Energy">Energy</option>
             </select>
          </div>
          
          <div className="flex gap-4 md:gap-8 bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm self-start relative z-10 w-full xl:w-auto overflow-x-auto hide-scrollbar">
             <div>
               <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 whitespace-nowrap">Total Revenue</div>
               <div className="text-xl font-bold">${kpis.totalRevenue}T</div>
             </div>
             <div>
               <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 whitespace-nowrap">YoY Change</div>
               <div className={`text-xl font-bold ${kpis.revenueChange >= 0 ? "text-green-400" : "text-red-400"}`}>{kpis.revenueChange > 0 ? '+' : ''}{kpis.revenueChange}%</div>
             </div>
             <div>
               <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1 whitespace-nowrap">Net Income</div>
               <div className={`text-xl font-bold ${kpis.netIncome >= 0 ? 'text-green-400' : 'text-red-500'}`}>${Math.abs(kpis.netIncome)}B {kpis.netIncome < 0 ? 'Loss' : 'Profit'}</div>
             </div>
          </div>
        </div>

        {/* Sarmaaya Navigation Tabs */}
        <div className="flex gap-2 border-b-2 border-zinc-200 dark:border-zinc-800 overflow-x-auto hide-scrollbar pb-0">
          {SECTOR_TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveInnerTab(tab)} 
              className={`px-5 py-3 font-semibold text-sm transition-all whitespace-nowrap uppercase tracking-wider relative ${activeInnerTab === tab ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-500' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 border-b-2 border-transparent'}`}
              style={{ marginBottom: "-2px" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[500px] flex flex-col">
          
          {/* 1. Fundamentals Tab */}
          {activeInnerTab === 'Fundamentals' && (
             <div className="p-8 space-y-8 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Sector Revenue</div>
                    <div className="text-3xl font-extrabold dark:text-white">${kpis.totalRevenue}T</div>
                    <div className={`text-sm font-medium mt-1 ${kpis.revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{kpis.revenueChange > 0 ? '+' : ''}{kpis.revenueChange}% YoY</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Net Income</div>
                    <div className={`text-3xl font-extrabold ${kpis.netIncome >= 0 ? 'text-green-500' : 'text-red-500'}`}>${Math.abs(kpis.netIncome)}B</div>
                    <div className={`text-sm font-medium mt-1 ${kpis.netIncomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{kpis.netIncomeChange > 0 ? '+' : ''}{kpis.netIncomeChange}% YoY</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Total Debt</div>
                    <div className="text-3xl font-extrabold dark:text-white">${kpis.debt}T</div>
                    <div className="text-sm font-medium text-zinc-500 mt-1">{isAuto ? 'Record High' : 'Stable'}</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Cash Flow</div>
                    <div className={`text-3xl font-extrabold ${isAuto ? 'text-red-500' : 'text-green-500'}`}>{isAuto ? 'Declining' : 'Growing'}</div>
                    <div className="text-sm font-medium text-zinc-500 mt-1">{isAuto ? 'Widespread Drops' : 'Strong Cash Generation'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 dark:text-white flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-500"/> Revenue Trendline ($T)</h3>
                    <ResponsiveContainer width="100%" height={250} minHeight={250}>
                       <LineChart data={revenueLineData}>
                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                         <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false}/>
                         <YAxis domain={['auto', 'auto']} fontSize={12} tickLine={false} axisLine={false}/>
                         <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                         <Line type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} />
                       </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 dark:text-white flex items-center gap-2"><BarChartIcon className="w-5 h-5 text-indigo-500"/> Sector Debt ($T)</h3>
                    <ResponsiveContainer width="100%" height={250} minHeight={250}>
                       <BarChart data={debtBarData}>
                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                         <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false}/>
                         <YAxis fontSize={12} tickLine={false} axisLine={false}/>
                         <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: 'transparent'}} />
                         <Bar dataKey="debt" fill="#fb7185" radius={[4, 4, 0, 0]} barSize={40} />
                       </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
             </div>
          )}

          {/* 2. Sector Highlights Tab (Combines Points + Watch) */}
          {activeInnerTab === 'Sector Highlights' && (
             <div className="p-8 flex-1 space-y-8 h-full flex flex-col">
                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                   <h3 className="text-xl font-extrabold dark:text-white mb-6 flex items-center gap-2">
                     <AlertCircle className="w-6 h-6 text-indigo-500" /> Key Analyst Insights
                   </h3>
                   {isAuto ? (
                     <ul className="space-y-4 text-base text-zinc-700 dark:text-zinc-300">
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Broad weakening fundamentals highlighted across the global auto spectrum.</li>
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Generates exactly 5 Long Below signals vs 6 Short Above equity signals.</li>
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Heavy credit distress: 8 of the 11 mega-issuers flagged as short credit plays.</li>
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Yankee issuers significantly outperforming domestic US manufacturing margins.</li>
                     </ul>
                   ) : (
                     <ul className="space-y-4 text-base text-zinc-700 dark:text-zinc-300">
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Robust growth detected in {selectedSectorFilter} driven by massive capital inflows.</li>
                       <li className="flex gap-4 items-start"><div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" /> Strong upward revisions to forward earnings estimates.</li>
                     </ul>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                   <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                     <h4 className="font-bold text-green-800 dark:text-green-400 text-lg mb-4 flex items-center gap-2"><Activity className="w-5 h-5"/> Buy Alerts</h4>
                     <ul className="space-y-3 dark:text-zinc-300 font-medium">
                       <li className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">Most attractive: <strong className="text-green-600 dark:text-green-400">{isAuto ? 'Toyota (Long Below)' : 'Sector Leader'}</strong></li>
                       <li className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">Watch: {isAuto ? 'Highly robust hybrid momentum vs pure EV.' : 'Sustained margin expansion expected.'}</li>
                     </ul>
                   </div>
                   <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
                      <h4 className="font-bold text-red-800 dark:text-red-400 text-lg mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5"/> Sell Alerts</h4>
                     <ul className="space-y-3 dark:text-zinc-300 font-medium">
                       <li className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">Most short: <strong className="text-red-500">{isAuto ? 'GM, Ford (Short Above)' : 'Laggards'}</strong></li>
                       <li className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">Watch: {isAuto ? 'Immediate re-levering risk issuers.' : 'Vulnerable to demand destruction.'}</li>
                     </ul>
                   </div>
                </div>
             </div>
          )}

          {/* 3. Companies Tab */}
          {activeInnerTab === 'Companies' && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 flex gap-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                  <select 
                    value={filterIndicator || ''} 
                    onChange={e => setFilterIndicator(e.target.value || null)}
                    className="px-3 py-2 border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-sm dark:text-white focus:outline-none"
                  >
                     <option value="">All Indicators</option>
                     <option value="Long">Any Long</option>
                     <option value="Long Below">Long Below</option>
                     <option value="Short">Any Short</option>
                     <option value="Short Above">Short Above</option>
                     <option value="Avoid">Avoid</option>
                  </select>
                </div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md">{filteredIssuers.length} Sector Constituents</div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left bg-white dark:bg-zinc-900">
                  <thead className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-wider text-zinc-500 font-bold sticky top-0">
                    <tr>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('issuerName')}>Company {sortField === 'issuerName' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('marketCap')}>Mkt Cap {sortField === 'marketCap' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('peRatio')}>PE {sortField === 'peRatio' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('price')}>Price {sortField === 'price' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('indicator')}>Indicator {sortField === 'indicator' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('revenueGrowth')}>Revenue {sortField === 'revenueGrowth' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('earningsGrowth')}>Earnings {sortField === 'earningsGrowth' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredIssuers.map(issuer => (
                      <tr key={issuer.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors cursor-pointer group" onClick={() => setSelectedIssuer(issuer)}>
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">{issuer.issuerName}</div>
                          <div className="text-xs font-mono text-zinc-500 mt-0.5">{issuer.ticker || issuer.id.substring(0, 6)}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">{formatNumber(issuer.marketCap * 1e6)}</td>
                        <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">{issuer.peRatio?.toFixed(1) || '-'}</td>
                        <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">${issuer.price?.toFixed(2) || '-'}</td>
                        <td className="px-6 py-4"><IndicatorBadge type={issuer.indicator} /></td>
                        <td className={`px-6 py-4 font-bold ${issuer.revenueGrowth && issuer.revenueGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{issuer.revenueGrowth && issuer.revenueGrowth < 0 ? '-ve' : '+ve'}</td>
                        <td className={`px-6 py-4 font-bold ${issuer.earningsGrowth && issuer.earningsGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{issuer.earningsGrowth && issuer.earningsGrowth < 0 ? '-ve' : '+ve'}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase hover:underline">View Analysis</button>
                        </td>
                      </tr>
                    ))}
                    {filteredIssuers.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-zinc-500">No companies found for exactly {selectedSectorFilter} sector. Try clearing filters.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Valuations Tab */}
          {activeInnerTab === 'Valuations' && (
             <div className="overflow-x-auto flex-1 flex flex-col">
              <table className="w-full text-left bg-white dark:bg-zinc-900">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-wider text-zinc-500 font-bold sticky top-0">
                  <tr>
                    <th className="px-6 py-4">Issuer</th>
                    <th className="px-6 py-4">PE Ratio</th>
                    <th className="px-6 py-4">Price / Fair Value (Est)</th>
                    <th className="px-6 py-4">Current Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredIssuers.map(issuer => (
                    <tr key={issuer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">{issuer.issuerName}</td>
                      <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">{issuer.peRatio?.toFixed(1) || '-'}</td>
                      <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">{(issuer.peRatio ? issuer.peRatio * 0.12 : 1.5).toFixed(2)}x Ratio</td>
                      <td className="px-6 py-4"><IndicatorBadge type={issuer.indicator} /></td>
                    </tr>
                  ))}
                  {filteredIssuers.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-zinc-500">No companies found to value.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 flex flex-col relative pb-10">
      <div className="flex-1">
        {renderSectorSarmaayaView()}
      </div>

      {selectedIssuer && (
        <div className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 h-full shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
              <div>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{selectedIssuer.issuerName}</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-bold px-2 py-0.5 rounded text-sm">{selectedIssuer.ticker}</span>
                  <span className="text-zinc-500 text-sm">&bull;</span>
                  <span className="text-zinc-500 text-sm">{selectedIssuer.sector}</span>
                </div>
              </div>
              <button onClick={() => setSelectedIssuer(null)} className="p-2.5 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-800 focus:outline-none">
                <X className="w-5 h-5"/>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Mkt Cap</div>
                  <div className="text-xl font-bold dark:text-white">{formatNumber(selectedIssuer.marketCap * 1e6)}</div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">PE Ratio</div>
                  <div className="text-xl font-bold dark:text-white">{selectedIssuer.peRatio?.toFixed(1) || 'N/A'}</div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Price</div>
                  <div className="text-xl font-bold dark:text-white">${selectedIssuer.price?.toFixed(2) || 'N/A'}</div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Indicator</div>
                  <div className="mt-1"><IndicatorBadge type={selectedIssuer.indicator} /></div>
                </div>
              </div>

              {selectedIssuer.history && (
                <div>
                   <h3 className="text-lg font-bold mb-3 dark:text-zinc-100 flex items-center gap-2">Price Trend</h3>
                   <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm h-48">
                      <ResponsiveContainer width="100%" height={160} minHeight={160}>
                         <LineChart data={selectedIssuer.history}>
                           <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={false} />
                         </LineChart>
                      </ResponsiveContainer>
                   </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold mb-3 dark:text-zinc-100 flex items-center gap-2">Report Context PDF Excerpt</h3>
                <div className="text-zinc-700 dark:text-zinc-300 bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-[15px]">
                  {selectedIssuer.commentary || 'No specific commentary extracted for this issuer.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
