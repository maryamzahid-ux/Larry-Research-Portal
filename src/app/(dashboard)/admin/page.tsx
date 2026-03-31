"use client";

import { useAppStore } from "@/lib/store";
import { FileText, Users, Send, UploadCloud, CheckCircle2, AlertCircle, BarChart as BarChartIcon, TrendingUp, Layers, Clock } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const dummyStats = {
    files: 142,
    issuers: 3104,
    subscriptions: 890,
    jobs: 84
  };

  const dummyFiles = [
    { id: 'f1', title: 'Global Auto Sector Q2 Review.pdf', date: '2026-03-31T08:30:00Z', type: 'sector' },
    { id: 'f2', title: 'Credit Monitor: European Banks.pdf', date: '2026-03-30T14:15:00Z', type: 'credit' },
    { id: 'f3', title: 'Tech Hardware Margin Analysis.pdf', date: '2026-03-29T11:45:00Z', type: 'sector' },
    { id: 'f4', title: 'US Manufacturing Index Report.xlsx', date: '2026-03-28T09:20:00Z', type: 'credit' },
    { id: 'f5', title: 'Healthcare Payout Projections.pdf', date: '2026-03-27T16:50:00Z', type: 'sector' },
  ];
  
  // Create mock pipeline data
  const pipelineData = [
    { day: "Mon", uploaded: 2, extracted: 80, success: 98 },
    { day: "Tue", uploaded: 1, extracted: 45, success: 100 },
    { day: "Wed", uploaded: 4, extracted: 210, success: 95 },
    { day: "Thu", uploaded: 2, extracted: 90, success: 99 },
    { day: "Fri", uploaded: 5, extracted: 310, success: 94 },
    { day: "Sat", uploaded: 0, extracted: 0, success: 100 },
    { day: "Sun", uploaded: 1, extracted: 32, success: 100 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold dark:text-zinc-100 flex items-center gap-3">
             <Layers className="w-8 h-8 text-indigo-500" />
             Admin Command Center
          </h1>
          <p className="text-zinc-500 mt-1">Manage pipeline ingestion, PDF structural extractions, and subscriber deliveries.</p>
        </div>
        <Link href="/admin/upload" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all">
          <UploadCloud className="w-5 h-5"/> Ingest PDF
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden relative group cursor-default">
           <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-indigo-50 dark:text-indigo-900/10 transition-transform group-hover:scale-110">
              <FileText className="w-32 h-32"/>
           </div>
           <div className="relative z-10">
             <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1 mb-2"><FileText className="w-3 h-3 text-indigo-500"/> Docs Parsed</div>
             <div className="text-4xl font-extrabold dark:text-white">{dummyStats.files}</div>
             <div className="text-xs font-medium text-emerald-500 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Up to date</div>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden relative group cursor-default">
           <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-emerald-50 dark:text-emerald-900/10 transition-transform group-hover:scale-110">
              <BarChartIcon className="w-32 h-32"/>
           </div>
           <div className="relative z-10">
             <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1 mb-2"><CheckCircle2 className="w-3 h-3 text-emerald-500"/> Data Nodes</div>
             <div className="text-4xl font-extrabold dark:text-white">{dummyStats.issuers.toLocaleString()}</div>
             <div className="text-xs font-medium text-emerald-500 mt-2 flex items-center gap-1">Extracted & Linked</div>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden relative group cursor-default">
           <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-blue-50 dark:text-blue-900/10 transition-transform group-hover:scale-110">
              <Users className="w-32 h-32"/>
           </div>
           <div className="relative z-10">
             <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1 mb-2"><Users className="w-3 h-3 text-blue-500"/> Subscribers</div>
             <div className="text-4xl font-extrabold dark:text-white">{dummyStats.subscriptions}</div>
             <div className="text-xs font-medium text-blue-500 mt-2 flex items-center gap-1 transition-colors hover:text-blue-400"><Link href="/admin/subscribers">Manage Access &rarr;</Link></div>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden relative group cursor-default">
           <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-amber-50 dark:text-amber-900/10 transition-transform group-hover:scale-110">
              <Send className="w-32 h-32"/>
           </div>
           <div className="relative z-10">
             <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1 mb-2"><Send className="w-3 h-3 text-amber-500"/> Delivery Runs</div>
             <div className="text-4xl font-extrabold dark:text-white">{dummyStats.jobs}</div>
             <div className="text-xs font-medium text-amber-500 mt-2 flex items-center gap-1 transition-colors hover:text-amber-400"><Link href="/admin/delivery">View Job Queue &rarr;</Link></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-bold mb-6 dark:text-zinc-100 flex items-center gap-2"><UploadCloud className="w-5 h-5 text-indigo-500"/> Ingestion Pipeline Volume</h3>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={pipelineData}>
                   <defs>
                     <linearGradient id="colorExtract" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                   <YAxis axisLine={false} tickLine={false} fontSize={12} />
                   <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                   <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                   <Area type="monotone" dataKey="extracted" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorExtract)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col">
           <h3 className="text-lg font-bold mb-6 dark:text-zinc-100 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Ingestion Accuracy</h3>
           <div className="flex-1 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={pipelineData} layout="vertical" margin={{ left: 0 }}>
                   <XAxis type="number" domain={[80, 100]} axisLine={false} tickLine={false} fontSize={12} />
                   <YAxis dataKey="day" type="category" axisLine={false} tickLine={false} fontSize={12} />
                   <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: 'transparent'}}/>
                   <Bar dataKey="success" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16}>
                   </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col min-h-[300px] rounded-2xl">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Recent Sandbox Parses</span>
          </div>
        </div>
        <div className="overflow-x-auto flex-1 h-full block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 py-3 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                <th className="px-6 py-4">Document Title</th>
                <th className="px-6 py-4">Ingestion Date</th>
                <th className="px-6 py-4">Identified Model</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {dummyFiles.map(f => (
                <tr key={f.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[300px]">{f.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-500">{f.date.replace('T', ' ').substring(0, 16) || 'Unknown'}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${f.type === 'credit' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{f.type} Pipeline</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 w-max">
                       <CheckCircle2 className="w-3 h-3"/> Processed
                    </span>
                  </td>
                </tr>
              ))}
              {dummyFiles.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-zinc-500">No reports uploaded yet. <Link href="/admin/upload" className="text-indigo-500 hover:underline">Upload your first PDF.</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
