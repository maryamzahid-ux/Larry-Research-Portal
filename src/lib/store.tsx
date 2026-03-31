"use client";

import React, { createContext, useContext, useState } from 'react';
import { 
  INITIAL_REPORTS, 
  INITIAL_ISSUERS, 
  INITIAL_SUBSCRIPTIONS,
  INITIAL_SECTOR_SIGNALS,
  INITIAL_NEW_SUPPLY,
  INITIAL_PERFORMANCE,
  ReportFile, 
  IssuerRecord, 
  Subscription, 
  DeliveryJob,
  SectorSignal,
  NewSupplyRecord,
  PerformanceRecord
} from '@/lib/types';

interface AppStoreContextValue {
  role: 'user' | 'admin';
  setRole: (r: 'user' | 'admin') => void;
  files: ReportFile[];
  addFile: (f: ReportFile) => void;
  issuers: IssuerRecord[];
  addIssuers: (items: IssuerRecord[]) => void;
  
  sectorSignals: SectorSignal[];
  newSupply: NewSupplyRecord[];
  performanceMetrics: PerformanceRecord[];
  
  subscriptions: Subscription[];
  updateSubscription: (s: Subscription) => void;
  jobs: DeliveryJob[];
  addJob: (j: DeliveryJob) => void;
}

const AppStoreContext = createContext<AppStoreContextValue | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [files, setFiles] = useState<ReportFile[]>(INITIAL_REPORTS);
  const [issuers, setIssuers] = useState<IssuerRecord[]>(INITIAL_ISSUERS);
  
  const [sectorSignals] = useState<SectorSignal[]>(INITIAL_SECTOR_SIGNALS);
  const [newSupply] = useState<NewSupplyRecord[]>(INITIAL_NEW_SUPPLY);
  const [performanceMetrics] = useState<PerformanceRecord[]>(INITIAL_PERFORMANCE);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [jobs, setJobs] = useState<DeliveryJob[]>([]);

  const addFile = (f: ReportFile) => setFiles((p) => [...p, f]);
  const addIssuers = (items: IssuerRecord[]) => setIssuers((p) => [...p, ...items]);
  const updateSubscription = (sub: Subscription) => {
    setSubscriptions((p) => {
      const existing = p.findIndex(s => s.userId === sub.userId);
      if (existing >= 0) {
        const next = [...p];
        next[existing] = sub;
        return next;
      }
      return [...p, sub];
    });
  };
  const addJob = (j: DeliveryJob) => setJobs(prev => [...prev, j]);

  return (
    <AppStoreContext.Provider value={{
      role, setRole,
      files, addFile,
      issuers, addIssuers,
      sectorSignals, newSupply, performanceMetrics,
      subscriptions, updateSubscription,
      jobs, addJob
    }}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
