"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Building2, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="bg-zinc-900 text-white p-10 text-center flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-zinc-700/50">
            <img src="/images/logo.png" alt="Curve Logo" className="h-16 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Curve Asset Management</h1>
            <p className="text-zinc-400 text-sm mt-1">Institutional Data & Reporting Portal</p>
          </div>
        </div>

        <div className="p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <fieldset className="flex gap-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="role" value="user" checked={selectedRole === 'user'} onChange={() => setSelectedRole('user')} className="sr-only" />
                <div className={`text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${selectedRole === 'user' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
                  Subscriber
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="role" value="admin" checked={selectedRole === 'admin'} onChange={() => setSelectedRole('admin')} className="sr-only" />
                <div className={`text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${selectedRole === 'admin' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
                  Admin
                </div>
              </label>
            </fieldset>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:outline-none transition-all dark:text-white"
                    placeholder={selectedRole === 'admin' ? 'admin@curve.com' : 'client@fund.com'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    required
                    defaultValue="password123"
                    className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 border rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:outline-none transition-all dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
