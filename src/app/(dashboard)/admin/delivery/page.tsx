"use client";

import { useAppStore } from "@/lib/store";
import { Send, CheckCircle2, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { DeliveryJob } from "@/lib/types";

export default function DeliverySimulationPage() {
  const { subscriptions, jobs, addJob } = useAppStore();
  const [processing, setProcessing] = useState(false);

  const handleSimulateDelivery = async (type: 'daily' | 'weekly') => {
    setProcessing(true);
    
    // Simulate some backend queue time
    await new Promise(res => setTimeout(res, 1500));
    
    // Find matching subs
    const matchingSubs = subscriptions.filter(s => s.frequency === type);
    
    for (const sub of matchingSubs) {
      const newJob: DeliveryJob = {
        id: "job_" + Math.random().toString(36).substr(2, 9),
        userId: sub.userId,
        dateStr: new Date().toISOString(),
        type: type,
        status: 'delivered'
      };
      addJob(newJob);
    }
    
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-zinc-100">Delivery Simulation</h1>
          <p className="text-zinc-500">Trigger and manage scheduled report distributions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold mb-2 dark:text-zinc-100">Daily Digest Campaign</h2>
          <p className="text-zinc-500 text-sm mb-6">
            Pushes today's parsed signals and updates to <strong>{subscriptions.filter(s => s.frequency === 'daily').length}</strong> daily subscribers based on their specific sector and issuer preferences.
          </p>
          <button 
            onClick={() => handleSimulateDelivery('daily')}
            disabled={processing}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-medium py-3 rounded-xl disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {processing ? <Clock className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5"/>}
            Trigger Daily Delivery
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold mb-2 dark:text-zinc-100">Weekly Summary Campaign</h2>
          <p className="text-zinc-500 text-sm mb-6">
            Pushes aggregated market trends over the week to <strong>{subscriptions.filter(s => s.frequency === 'weekly').length}</strong> weekly subscribers. Normally runs on Fridays at 5PM.
          </p>
          <button 
            onClick={() => handleSimulateDelivery('weekly')}
            disabled={processing}
            className="w-full border-2 border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium py-3 rounded-xl disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {processing ? <Clock className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5"/>}
            Simulate Weekly Run
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col mt-8 min-h-[300px]">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Delivery Job History</span>
          </div>
        </div>
        <div className="overflow-x-auto flex-1 h-full block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 py-3 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                <th className="px-6 py-4">Job ID</th>
                <th className="px-6 py-4">Campaign Type</th>
                <th className="px-6 py-4">Subscriber</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {jobs.slice().reverse().map(job => {
                const sub = subscriptions.find(s => s.userId === job.userId);
                return (
                  <tr key={job.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-zinc-500 dark:text-zinc-400">{job.id}</td>
                    <td className="px-6 py-4 text-sm capitalize font-medium text-zinc-900 dark:text-zinc-100">{job.type} Run</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{sub?.email || job.userId}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{job.dateStr.replace('T', ' ').substring(0, 16)}</td>
                    <td className="px-6 py-4 text-right">
                      {job.status === 'delivered' ? (
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-full text-xs font-semibold inline-flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full text-xs font-semibold inline-flex w-max">
                          Queued
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-500">No delivery jobs recorded yet. Trigger a run above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
