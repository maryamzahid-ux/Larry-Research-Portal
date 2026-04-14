"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { LayoutDashboard, Settings, Users, UploadCloud, Send, Activity, Layout } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useAppStore();

  const userLinks = [
    { name: "Dashboard", href: "/dashboard/landing", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Market Overview", href: "/dashboard", icon: <Activity className="w-5 h-5" /> },
    { name: "Subscription Settings", href: "/dashboard/subscriptions", icon: <Settings className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Data Upload", href: "/admin/upload", icon: <UploadCloud className="w-5 h-5" /> },
    { name: "Subscribers", href: "/admin/subscribers", icon: <Users className="w-5 h-5" /> },
    { name: "Delivery Queue", href: "/admin/delivery", icon: <Send className="w-5 h-5" /> },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-zinc-950 text-zinc-100 flex-shrink-0 flex flex-col min-h-screen">
      <div className="p-6 border-b border-zinc-800">
        <Link href="/" className="flex flex-col gap-3">
          <img src="/images/logo.png" alt="Curve Logo" className="h-10 w-auto object-contain self-start" />
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Curve Asset Management
          </h2>
        </Link>
        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{role} Portal</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((item) => {
          const isActive = pathname === item.href || (item.name === 'Market Overview' && pathname === '/dashboard');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 shadow-md text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-800 text-xs text-zinc-600">
        &copy; 2026 Curve Asset Mgmt
      </div>
    </aside>
  );
}
