"use client";

import { useAppStore } from "@/lib/store";
import { LogOut, Bell, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { role, setRole } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    setRole('user');
    router.push("/");
  };

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Placeholder for breadcrumbs or page title */}
      </div>
      <div className="flex items-center gap-6">
        <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm border border-indigo-200 dark:border-indigo-700">
            {role === 'admin' ? 'A' : 'S'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-none">
              {role === 'admin' ? 'Admin User' : 'Jane Doe'}
            </span>
            <span className="text-xs text-zinc-500 mt-1">
              {role === 'admin' ? 'admin@curve.com' : 'client@example.com'}
            </span>
          </div>
        </div>
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700"></div>
        <button 
          onClick={handleLogout}
          className="text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}
