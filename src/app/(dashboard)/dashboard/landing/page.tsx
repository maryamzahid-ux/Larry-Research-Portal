"use client";

import { useAppStore } from "@/lib/store";
import { 
  ArrowUpRight, ArrowDownRight, Activity, Calculator,
  TrendingDown, TrendingUp, ChevronLeft, ChevronRight, DollarSign, Sparkles, BookOpen, Percent, Layers
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data explicitly built for Sarmaaya Homepage Clone
const MARKET_OVERVIEW = [
  { name: "S&P 500", val: "5,123.41", val2: "18.34", percent: "0.36%", up: true },
  { name: "NASDAQ", val: "16,274.94", val2: "155.60", percent: "0.97%", up: true },
  { name: "DOW JONES", val: "39,127.14", val2: "90.99", percent: "0.23%", up: true },
  { name: "VIX", val: "13.11", val2: "-0.28", percent: "-2.09%", up: false },
  { name: "RUSSELL 2000", val: "2,084.74", val2: "21.07", percent: "1.02%", up: true },
];

const TOOLS = [
  { name: "ROI Calculator", icon: <Calculator className="w-6 h-6 text-emerald-500" /> },
  { name: "CAGR", icon: <TrendingUp className="w-6 h-6 text-blue-500" /> },
  { name: "Deduction", icon: <Percent className="w-6 h-6 text-orange-500" /> },
  { name: "SIP", icon: <Layers className="w-6 h-6 text-indigo-500" /> },
  { name: "X-Rate", icon: <Activity className="w-6 h-6 text-cyan-500" /> },
  { name: "Compounding", icon: <Sparkles className="w-6 h-6 text-amber-500" /> },
];

const PAYOUTS = [
  { sym: "AAPL", name: "Apple Inc.", xd: "10-05-2026", payout: "$0.24" },
  { sym: "MSFT", name: "Microsoft Corp.", xd: "15-05-2026", payout: "$0.75" },
  { sym: "JNJ", name: "Johnson & Johnson", xd: "21-05-2026", payout: "$1.19" },
];

const FOREX = [
  { name: "EUR/USD", icon: "🇪🇺", val: "1.0845", change: "0.0012", percent: "0.11%", up: true },
  { name: "GBP/USD", icon: "🇬🇧", val: "1.2650", change: "-0.0021", percent: "-0.16%", up: false },
  { name: "USD/JPY", icon: "🇯🇵", val: "150.32", change: "0.45", percent: "0.30%", up: true },
  { name: "AUD/USD", icon: "🇦🇺", val: "0.6540", change: "0.0015", percent: "0.23%", up: true },
];

const COMMODITIES = [
  { name: "GOLD", icon: "🟨", val: "2,154.50", change: "15.20", percent: "0.71%" },
  { name: "SILVER", icon: "🪙", val: "24.55", change: "0.30", percent: "1.23%" },
  { name: "CRUDE OIL", icon: "🛢️", val: "78.40", change: "-0.85", percent: "-1.07%" },
];

export default function UserPortalLanding() {
  const { issuers } = useAppStore();
  const [stockTab, setStockTab] = useState<'Active'|'Gainers'|'Losers'>('Active');
  const [fundTab, setFundTab] = useState<'Gainers'|'Losers'>('Gainers');

  // Repurpose dummy issuers as local stock/fund data to match user request screenshot
  const activeStocks = issuers.slice(0, 4);
  const fundStocks = issuers.slice(4, 9); // mock mutual funds

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-16 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      
      {/* 1. Scrolling Ticker (Sarmaaya Style Top Banner) */}
      <div className="overflow-hidden whitespace-nowrap border-b border-zinc-200 dark:border-zinc-800 py-3 -mx-8 px-8 bg-white dark:bg-zinc-950 flex items-center text-xs font-bold font-mono">
         <div className="animate-marquee relative">
            {[...MARKET_OVERVIEW, ...MARKET_OVERVIEW, ...MARKET_OVERVIEW, ...MARKET_OVERVIEW].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 mr-12 min-w-max">
                 <span className="text-zinc-500">{item.name}</span>
                 <span className="text-zinc-900 dark:text-zinc-100">{item.val2}</span>
                 <span className={`${item.up ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {item.up ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                    {item.percent}
                 </span>
              </span>
            ))}
         </div>
      </div>

      {/* 2. Bloomberg-Style Intelligence Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Feature Story */}
         <div className="lg:col-span-2 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white rounded-[2rem] overflow-hidden flex flex-col relative shadow-xl border border-zinc-800">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-luminosity"></div>
            <div className="relative z-10 p-8 md:p-12 flex-1 flex flex-col justify-end min-h-[400px]">
               <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Systematic Insight</span>
                  <span className="text-zinc-400 font-mono text-sm">MAR 31, 2026</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Mega-Cap Yields Compress as Credit Markets Price Out Rate Cuts</h1>
               <p className="text-zinc-300 font-medium tracking-wide mb-8 text-lg max-w-2xl leading-relaxed">Exclusive analysis from the Larry Research Portal uncovers a tightening spread across AAA-rated manufacturing bonds, while algorithmic momentum sustains broader index levels globally amidst severe supply constraints.</p>
               <div className="flex gap-4">
                  <Link href="/dashboard" className="bg-white hover:bg-zinc-200 text-zinc-950 px-6 py-3 font-bold rounded-xl text-sm transition-colors flex items-center gap-2">Read Full Sector Report <ArrowUpRight className="w-4 h-4"/></Link>
               </div>
            </div>
         </div>

         {/* Right Sidebar - Latest Intel (Bloomberg style) */}
         <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col">
            <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-500"/> Latest Intelligence</h3>
            <div className="flex-1 flex flex-col gap-6">
               <div className="group cursor-pointer border-b border-zinc-100 dark:border-zinc-800 pb-5">
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-2">Auto Sector</div>
                  <div className="font-bold text-lg dark:text-zinc-100 group-hover:text-indigo-500 transition-colors leading-snug">Global Net Income Plummets -107% YoY Across Major Issuers</div>
                  <div className="text-sm text-zinc-500 mt-2">12 Mega-cap constituents downgraded.</div>
               </div>
               <div className="group cursor-pointer border-b border-zinc-100 dark:border-zinc-800 pb-5">
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-2">New Supply</div>
                  <div className="font-bold text-lg dark:text-zinc-100 group-hover:text-indigo-500 transition-colors leading-snug">Financial Pipeline Hits Record Structural Constraints</div>
                  <div className="text-sm text-zinc-500 mt-2">Spreads widen outside core banking.</div>
               </div>
               <div className="group cursor-pointer">
                  <div className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-2">Equities</div>
                  <div className="font-bold text-lg dark:text-zinc-100 group-hover:text-indigo-500 transition-colors leading-snug">Multiple Expansion in Tech Megacaps Raises Red Flags</div>
                  <div className="text-sm text-zinc-500 mt-2">Valuation stretch vs historical means.</div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Popular Tools Slider */}
      <div>
         <h2 className="text-xl font-bold dark:text-white mb-4">Popular Tools</h2>
         <div className="relative flex items-center group">
            <button className="absolute -left-4 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-5 h-5"/></button>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x px-2 py-4">
               {TOOLS.map((t, idx) => (
                  <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 min-w-[200px] flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer snap-center flex-shrink-0 group-hover:-translate-y-1">
                     <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-2xl">{t.icon}</div>
                     <div className="font-bold text-sm dark:text-zinc-200 text-center">{t.name}</div>
                  </div>
               ))}
            </div>
            <button className="absolute -right-4 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5"/></button>
         </div>
      </div>

      {/* 4. Market Overview Slider */}
      <div>
         <h2 className="text-xl font-bold dark:text-white mb-4">Market Overview</h2>
         <div className="relative flex items-center group">
            <button className="absolute -left-4 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-5 h-5"/></button>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2 px-2">
               {MARKET_OVERVIEW.map((m, idx) => (
                  <div key={idx} className="flex-shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 min-w-[240px] items-start hover:shadow-md transition-shadow cursor-pointer">
                     <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500 flex-shrink-0"><ArrowUpRight className="w-5 h-5"/></div>
                     <div>
                        <div className="flex justify-between items-baseline mb-1">
                           <div className="font-black text-sm dark:text-white">{m.name}</div>
                           <div className="font-bold text-sm dark:text-zinc-200">{m.val}</div>
                        </div>
                        <div className="flex gap-2 text-xs font-semibold text-zinc-500">
                           <span className="text-green-500">{m.val2} ({m.percent})</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="absolute -right-4 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5"/></button>
         </div>
      </div>

      {/* 5. 3-Column List Panels (Stocks, Mutual Funds, Payouts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
         {/* Stocks Panel */}
         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg dark:text-white">Stocks</h3>
               <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden text-xs font-bold">
                  <button onClick={() => setStockTab('Active')} className={`px-4 py-1.5 transition-colors ${stockTab === 'Active' ? 'bg-[#002f4b] text-white' : 'text-zinc-500 hover:text-zinc-700'}`}>Active</button>
                  <button onClick={() => setStockTab('Gainers')} className={`px-4 py-1.5 transition-colors ${stockTab === 'Gainers' ? 'bg-[#002f4b] text-white' : 'text-zinc-500 hover:text-zinc-700'}`}>Gainers</button>
                  <button onClick={() => setStockTab('Losers')} className={`px-4 py-1.5 transition-colors ${stockTab === 'Losers' ? 'bg-[#002f4b] text-white' : 'text-zinc-500 hover:text-zinc-700'}`}>Losers</button>
               </div>
            </div>
            <div className="space-y-4 flex-1">
               {activeStocks.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center group cursor-pointer border-b border-zinc-50 dark:border-zinc-800/50 pb-4 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 p-2 rounded-xl transition-all -mx-2">
                     <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center font-bold text-indigo-600 text-xs shrink-0 relative">
                           {s.ticker?.substring(0,3)}
                           <div className="hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 items-center justify-center"><ArrowUpRight className="w-2.5 h-2.5 text-white"/></div>
                        </div>
                        <div>
                           <div className="font-black text-sm dark:text-zinc-100 flex items-center gap-1">{s.ticker} <Activity className="w-3 h-3 text-amber-500"/></div>
                           <div className="text-[10px] text-zinc-500 truncate max-w-[120px]">{s.issuerName}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-zinc-400 font-medium">${s.price?.toFixed(2) || '24.73'}</div>
                        <div className="text-[10px] text-zinc-400 font-medium mb-0.5">Vol: {(s.marketCap * 1234).toLocaleString()}</div>
                        <div className="text-green-500 font-bold text-xs flex items-center justify-end gap-0.5"><ArrowUpRight className="w-3 h-3"/> {((s.peRatio || 5) * 0.1).toFixed(2)} ({((s.peRatio || 5) * 1.5).toFixed(2)}%)</div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 transition-colors uppercase tracking-widest">View All</button>
         </div>

         {/* Mutual Funds Panel */}
         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg dark:text-white">Mutual Funds</h3>
               <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden text-xs font-bold">
                  <button onClick={() => setFundTab('Gainers')} className={`px-4 py-1.5 transition-colors ${fundTab === 'Gainers' ? 'bg-[#002f4b] text-white' : 'text-zinc-500 hover:text-zinc-700'}`}>Gainers</button>
                  <button onClick={() => setFundTab('Losers')} className={`px-4 py-1.5 transition-colors ${fundTab === 'Losers' ? 'bg-[#002f4b] text-white' : 'text-zinc-500 hover:text-zinc-700'}`}>Losers</button>
               </div>
            </div>
            <div className="space-y-4 flex-1">
               {fundStocks.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center group cursor-pointer border-b border-zinc-50 dark:border-zinc-800/50 pb-4 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 p-2 rounded-xl transition-all -mx-2">
                     <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 text-xs shrink-0 relative bg-zinc-50 dark:bg-zinc-800">
                           {s.ticker?.charAt(0) || 'M'}
                        </div>
                        <div>
                           <div className="font-black text-sm dark:text-zinc-100 flex items-center gap-1">{s.ticker}F <Activity className="w-3 h-3 text-amber-500"/></div>
                           <div className="text-[10px] text-zinc-500 truncate max-w-[120px]">{s.issuerName} Fund</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-zinc-400 font-medium">${s.price?.toFixed(2) || '112.73'}</div>
                        <div className="text-[10px] text-zinc-400 font-medium mb-0.5">AUM: {(s.marketCap * 43).toLocaleString()}</div>
                        <div className="text-red-500 font-bold text-xs flex items-center justify-end gap-0.5"><ArrowDownRight className="w-3 h-3"/> {-0.01} (0.00%)</div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 transition-colors uppercase tracking-widest">View All</button>
         </div>

         {/* Upcoming Payouts Panel */}
         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
            <h3 className="font-bold text-lg dark:text-white mb-6">Upcoming Payouts</h3>
            <div className="space-y-4 flex-1">
               {PAYOUTS.map((p, idx) => (
                  <div key={idx} className="group cursor-pointer border border-zinc-100 dark:border-zinc-800 hover:border-green-200 dark:hover:border-green-900/50 p-4 rounded-2xl transition-all shadow-sm">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center font-bold text-green-500 text-sm border border-green-100 dark:border-green-900/40 shrink-0">
                           XD
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1 items-center">
                           <div className="col-span-2">
                             <div className="font-black text-sm dark:text-zinc-100">{p.sym}</div>
                             <div className="text-[10px] text-zinc-500 truncate max-w-[140px]">{p.name}</div>
                           </div>
                           <div>
                              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Ex Date</div>
                              <div className="font-bold text-xs dark:text-zinc-200">{p.xd}</div>
                           </div>
                           <div>
                              <div className="text-[10px] text-zinc-400 font-semibold uppercase">Payout %</div>
                              <div className="font-black text-xs text-zinc-900 dark:text-white">{p.payout}</div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 transition-colors uppercase tracking-widest">View All</button>
         </div>

      </div>

      {/* 6. Forex & Commodities Bottom Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Forex Slider Block */}
         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h3 className="font-bold text-lg dark:text-white mb-6">Forex</h3>
            <div className="relative group">
               <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-5 h-5"/></button>
               <div className="flex gap-4 overflow-x-auto hide-scrollbar px-2">
                  {FOREX.map((f, idx) => (
                     <div key={idx} className="flex-shrink-0 min-w-[180px] border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex gap-2 items-center mb-4">
                           <div className="text-xl shadow-sm rounded-full bg-zinc-50 overflow-hidden w-8 h-8 flex items-center justify-center">{f.icon}</div>
                           <div className="font-bold text-sm dark:text-zinc-200">{f.name}</div>
                        </div>
                        <div className="text-xs text-zinc-400 font-medium mb-1">${f.val}</div>
                        <div className={`font-bold text-xs flex items-center gap-1 ${f.up ? 'text-green-500' : 'text-red-500'}`}>
                           {f.up ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                           {f.change} ({f.percent})
                        </div>
                     </div>
                  ))}
               </div>
               <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5"/></button>
            </div>
         </div>

         {/* Commodities Slider Block */}
         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h3 className="font-bold text-lg dark:text-white mb-6">Commodities</h3>
            <div className="relative group">
               <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-5 h-5"/></button>
               <div className="flex gap-4 overflow-x-auto hide-scrollbar px-2">
                  {COMMODITIES.map((c, idx) => (
                     <div key={idx} className="flex-shrink-0 min-w-[180px] border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex gap-2 items-center mb-4">
                           <div className="text-xl w-8 h-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 rounded-lg">{c.icon}</div>
                           <div className="font-bold text-sm dark:text-zinc-200">{c.name}</div>
                        </div>
                        <div className="text-xs text-zinc-400 font-medium mb-1">${c.val}</div>
                        <div className={`font-bold text-xs flex items-center gap-1 ${parseFloat(c.percent) > 0 ? 'text-green-500' : 'text-zinc-500'}`}>
                           {parseFloat(c.percent) > 0 ? <ArrowUpRight className="w-3 h-3"/> : null}
                           {c.change} ({c.percent})
                        </div>
                     </div>
                  ))}
               </div>
               <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5"/></button>
            </div>
         </div>
      </div>

    </div>
  );
}
