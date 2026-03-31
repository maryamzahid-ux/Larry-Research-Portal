"use client";

import { useAppStore } from "@/lib/store";
import { CheckCircle2, Circle, Search, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";

const ALL_SECTORS = [
  "Auto", "Technology", "Healthcare", "Energy", "Financials", 
  "Consumer Staples", "Utilities", "Real Estate", "Materials", "Industrials"
];

const FREQUENCIES = [
  { id: 'real-time', name: 'Real-time', desc: 'Instant alerts on critical signals.' },
  { id: 'daily', name: 'Daily Digest', desc: 'Customized signals every morning at 8 AM.' },
  { id: 'weekly', name: 'Weekly Summary', desc: 'Aggregated view every Friday at 5 PM.' },
  { id: 'monthly', name: 'Monthly Report', desc: 'High-level macro recap end of month.' }
];

export default function SubscriptionsPage() {
  const { subscriptions, updateSubscription, issuers } = useAppStore();
  const currentUserSub = subscriptions.find(s => s.userId === 'u1') || {
    userId: 'u1', email: 'client@example.com', name: 'Jane Doe',
    sectorSelections: ['Auto'], issuerSelections: [], frequency: 'daily' as 'daily' | 'weekly', lastDeliveredAt: null, status: 'active'
  };

  const [issuerSearch, setIssuerSearch] = useState('');

  const toggleSector = (sector: string) => {
    const isSubbed = currentUserSub.sectorSelections.includes(sector);
    const newSelections = isSubbed
      ? currentUserSub.sectorSelections.filter(s => s !== sector)
      : [...currentUserSub.sectorSelections, sector];
    
    updateSubscription({ ...currentUserSub, sectorSelections: newSelections });
  };

  const setFrequency = (freq: any) => {
    updateSubscription({ ...currentUserSub, frequency: freq });
  };

  const toggleIssuer = (ticker: string) => {
    const isSubbed = currentUserSub.issuerSelections.includes(ticker);
    const newSelections = isSubbed
      ? currentUserSub.issuerSelections.filter(t => t !== ticker)
      : [...currentUserSub.issuerSelections, ticker];
    
    updateSubscription({ ...currentUserSub, issuerSelections: newSelections });
  };

  // Group all available issuers to pick from
  const availableIssuers = issuers.filter(i => 
    i.issuerName.toLowerCase().includes(issuerSearch.toLowerCase()) || 
    (i.ticker && i.ticker.toLowerCase().includes(issuerSearch.toLowerCase()))
  ).sort((a,b) => a.issuerName.localeCompare(b.issuerName));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight dark:text-zinc-100 mb-2">Subscription & Alerts</h1>
        <p className="text-zinc-500 font-medium text-lg">Manage how and when you receive structured framework signals.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
         <h2 className="text-xl font-bold mb-1 dark:text-zinc-200">Delivery Frequency</h2>
         <p className="text-zinc-500 mb-6 text-sm font-medium">Select your delivery cadence (default is Daily).</p>
        
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FREQUENCIES.map(freq => (
            <button
               key={freq.id}
               onClick={() => setFrequency(freq.id)}
               className={`p-5 rounded-xl border-2 text-left transition-all flex flex-col items-start gap-4 ${currentUserSub.frequency === freq.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 dark:border-indigo-500 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-900/30 ring-offset-2 dark:ring-offset-zinc-900' : 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:bg-zinc-950/50 dark:hover:border-zinc-700'}`}
            >
               <div className="flex justify-between w-full">
                  <div className={`font-bold text-lg transition-colors ${currentUserSub.frequency === freq.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-zinc-900 dark:text-white'}`}>{freq.name}</div>
                  {currentUserSub.frequency === freq.id ? <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> : <Circle className="w-6 h-6 text-zinc-300 dark:text-zinc-700" />}
               </div>
               <div className="text-sm font-medium text-zinc-500 mt-auto leading-relaxed">{freq.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-1 dark:text-zinc-200">Global Sector Watchlist</h2>
        <p className="text-zinc-500 mb-6 font-medium text-sm">
          Select sectors to track (Auto is default). You will receive all deep-dive insights published for these groups.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ALL_SECTORS.map(sector => {
            const isSubbed = currentUserSub.sectorSelections.includes(sector);
            return (
              <button
                key={sector}
                onClick={() => toggleSector(sector)}
                className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-between ${isSubbed ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg scale-105 z-10' : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'} `}
              >
                {sector}
                {isSubbed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
           <div>
              <h2 className="text-xl font-bold mb-1 dark:text-zinc-200">Specific Issuer Alerts</h2>
              <p className="text-zinc-500 font-medium text-sm">
                 You are explicitly tracking <strong>{currentUserSub.issuerSelections.length}</strong> individual companies outside of broad sector coverage.
              </p>
           </div>
           
           <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                 value={issuerSearch}
                 onChange={e => setIssuerSearch(e.target.value)}
                 type="text" 
                 placeholder="Search to add issuers..." 
                 className="w-full pl-9 pr-3 py-2 border dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
           </div>
        </div>

        {/* Selected Issuers Pinned at Top */}
        {currentUserSub.issuerSelections.length > 0 && (
           <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-indigo-800 dark:text-indigo-400 w-full mb-1">Actively Tagged Options:</span>
              {currentUserSub.issuerSelections.map(ticker => {
                 const issuerData = issuers.find(i => i.ticker === ticker);
                 return (
                    <button key={ticker} onClick={() => toggleIssuer(ticker)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs tracking-wider flex items-center gap-1.5 transition-colors shadow-sm">
                       {ticker} <XCircle className="w-3.5 h-3.5 opacity-80" />
                    </button>
                 )
              })}
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
          {availableIssuers.map(issuer => {
             const ticker = issuer.ticker || issuer.issuerName;
             const isSubbed = currentUserSub.issuerSelections.includes(ticker);
             return (
               <button
                 key={issuer.id}
                 onClick={() => toggleIssuer(ticker)}
                 className={`p-4 rounded-xl text-left border transition-all flex justify-between items-center ${isSubbed ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-700 dark:bg-zinc-800' : 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-zinc-950'}`}
               >
                  <div>
                     <div className="font-bold">{issuer.issuerName}</div>
                     <div className={`text-xs mt-0.5 ${isSubbed ? 'text-zinc-400' : 'text-zinc-500'}`}>{issuer.sector} &bull; {ticker}</div>
                  </div>
                  {isSubbed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <PlusCircle className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />}
               </button>
             )
          })}
          {availableIssuers.length === 0 && (
             <div className="col-span-full p-8 text-center text-zinc-500 font-medium">No system issuers match your search.</div>
          )}
        </div>
      </div>

    </div>
  );
}
