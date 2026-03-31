"use client";

import { useAppStore } from "@/lib/store";
import { Users, Filter, CheckCircle2 } from "lucide-react";

export default function SubscribersPage() {
  const { subscriptions } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-zinc-100">Subscribers & Access</h1>
          <p className="text-zinc-500">Manage portal users and their communication preferences.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">All Active Subscriptions</span>
          </div>
        </div>

        <div className="overflow-x-auto flex-1 h-full block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 py-3 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                <th className="px-6 py-4">Subscriber Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Tracking Sectors</th>
                <th className="px-6 py-4">Tracking Issuers</th>
                <th className="px-6 py-4">Last Delivered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {subscriptions.map(sub => (
                <tr key={sub.userId} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{sub.name}</div>
                    <div className="text-sm text-zinc-500">{sub.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-full text-xs font-semibold flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md text-sm">
                      {sub.frequency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {sub.sectorSelections.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {sub.sectorSelections.map(s => <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs rounded font-medium border border-indigo-100 dark:border-indigo-800">{s}</span>)}
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-sm">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                     {sub.issuerSelections.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {sub.issuerSelections.map(i => <span key={i} className="px-2 py-0.5 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 text-xs rounded font-medium border border-zinc-200 dark:border-zinc-700">{i}</span>)}
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-sm">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    {sub.lastDeliveredAt ? sub.lastDeliveredAt.split('T')[0] : 'Never'}
                  </td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-500">No active subscribers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
