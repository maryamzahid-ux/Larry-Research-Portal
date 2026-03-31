export type IndicatorType = 'Long Below' | 'Short Above' | 'Avoid' | 'Neutral' | 'Strong Long' | 'Strong Short' | 'Long' | 'Short';

export interface SectorSignal {
  id: string;
  name: string;
  rating: string;
  longCount: number;
  shortCount: number;
  marketCapB: number;
}

export interface NewSupplyRecord {
  id: string;
  issuer: string;
  security: string;
  rating: string;
  amount: string;
  spread: number;
  attractiveTo: number;
}

export interface PerformanceRecord {
  period: string;
  longEquity: string;
  shortEquity: string;
  longCredit: string;
  igSpreads: string;
}

export interface IssuerRecord {
  id: string;
  reportId: string;
  issuerName: string;
  ticker?: string;
  sector: string;
  indicator: IndicatorType;
  price?: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
  marketCap: number; // in millions
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  payoutDate?: string;
  reportDate: string;
  revenueGrowth?: number;
  earningsGrowth?: number;
  commentary?: string;
  history?: { date: string; value: number }[];
}

export interface ReportFile {
  id: string;
  type: 'sector' | 'credit';
  title: string;
  date: string;
  fileUrl: string; // Object URL
  summaryKPIs: any;
  isDummy?: boolean;
}

export interface Subscription {
  userId: string;
  email: string;
  name: string;
  sectorSelections: string[];
  issuerSelections: string[];
  frequency: 'daily' | 'weekly';
  lastDeliveredAt: string | null;
  status: 'active' | 'paused';
}

export interface DeliveryJob {
  id: string;
  dateStr: string;
  userId: string;
  type: 'daily' | 'weekly';
  status: 'queued' | 'delivered';
}

export const DUMMY_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const INITIAL_REPORTS: ReportFile[] = [
  {
    id: 'r_auto',
    type: 'sector',
    title: 'Auto Sector Analysis',
    date: '2026-03-05',
    fileUrl: DUMMY_PDF_URL,
    summaryKPIs: {
      longCount: 5,
      shortCount: 6,
      revenueChange: -2.8,
      netIncomeChange: -107.9,
      totalRevenue: 1.32, // Trillion
      netIncome: -5.1, // Billion
      debt: 1.08 // Trillion
    },
    isDummy: true
  }
];

export const INITIAL_SECTOR_SIGNALS: SectorSignal[] = [];
export const INITIAL_NEW_SUPPLY: NewSupplyRecord[] = [];
export const INITIAL_PERFORMANCE: PerformanceRecord[] = [];

// Base dummy history to attach to modal charts
const mockHistory = [
  { date: "Jan", value: 100 }, { date: "Feb", value: 105 }, { date: "Mar", value: 102 }
];

export const INITIAL_ISSUERS: IssuerRecord[] = [
  { id: 'i_auto1', reportId: 'r_auto', issuerName: 'Toyota Motor', ticker: 'TM', sector: 'Auto', indicator: 'Long Below', price: 3702, marketCap: 370400, peRatio: 13.1, revenueGrowth: -1.2, earningsGrowth: -3.4, history: mockHistory, reportDate: '2026-03-05', commentary: 'Top Long Below candidate. Strong hybrid strategy offsets EV delays.' },
  { id: 'i_auto2', reportId: 'r_auto', issuerName: 'General Motors', ticker: 'GM', sector: 'Auto', indicator: 'Short Above', price: 77.76, marketCap: 70300, peRatio: 6.6, revenueGrowth: -4.5, earningsGrowth: -10.2, history: mockHistory, reportDate: '2026-03-05', commentary: 'Short relative to Toyota. Domestic margin pressure.' },
  { id: 'i_auto3', reportId: 'r_auto', issuerName: 'Hyundai Motor', ticker: 'HYMTF', sector: 'Auto', indicator: 'Long Below', price: 55.70, marketCap: 77000, peRatio: 14.9, revenueGrowth: -0.5, earningsGrowth: -1.2, history: mockHistory, reportDate: '2026-03-05', commentary: 'Solid EV pipeline and ICE margins.' },
  { id: 'i_auto4', reportId: 'r_auto', issuerName: 'Ford Motor', ticker: 'F', sector: 'Auto', indicator: 'Short Above', price: 12.50, marketCap: 48000, peRatio: 8.2, revenueGrowth: -5.0, earningsGrowth: -15.4, history: mockHistory, reportDate: '2026-03-05', commentary: 'Avoid. Structural EV losses mount.' },
  { id: 'i_auto5', reportId: 'r_auto', issuerName: 'Stellantis', ticker: 'STLA', sector: 'Auto', indicator: 'Long Below', price: 24.50, marketCap: 75000, peRatio: 4.1, revenueGrowth: -2.1, earningsGrowth: -4.5, history: mockHistory, reportDate: '2026-03-05', commentary: 'Deep value. High free cash flow generation persists.' },
  { id: 'i_auto6', reportId: 'r_auto', issuerName: 'Volkswagen', ticker: 'VWAGY', sector: 'Auto', indicator: 'Avoid', price: 14.20, marketCap: 65000, peRatio: 5.5, revenueGrowth: -3.5, earningsGrowth: -8.8, history: mockHistory, reportDate: '2026-03-05', commentary: 'European sluggishness.' },
  { id: 'i_auto7', reportId: 'r_auto', issuerName: 'Honda Motor', ticker: 'HMC', sector: 'Auto', indicator: 'Long Below', price: 34.20, marketCap: 58000, peRatio: 9.8, revenueGrowth: 1.2, earningsGrowth: -0.5, history: mockHistory, reportDate: '2026-03-05', commentary: 'Resilient volume in key crossover segments.' },
  { id: 'i_auto8', reportId: 'r_auto', issuerName: 'Nissan', ticker: 'NSANY', sector: 'Auto', indicator: 'Short Above', price: 6.80, marketCap: 15000, peRatio: 18.5, revenueGrowth: -6.0, earningsGrowth: -25.0, history: mockHistory, reportDate: '2026-03-05', commentary: 'Missing critical model update cycles.' },
  { id: 'i_auto9', reportId: 'r_auto', issuerName: 'BMW', ticker: 'BMWYY', sector: 'Auto', indicator: 'Long Below', price: 38.50, marketCap: 68000, peRatio: 6.2, revenueGrowth: -1.0, earningsGrowth: -2.0, history: mockHistory, reportDate: '2026-03-05', commentary: 'Premium pricing power intact.' },
  { id: 'i_auto10', reportId: 'r_auto', issuerName: 'Mercedes-Benz', ticker: 'MBGAF', sector: 'Auto', indicator: 'Neutral', price: 77.20, marketCap: 80000, peRatio: 6.5, revenueGrowth: -2.5, earningsGrowth: -4.0, history: mockHistory, reportDate: '2026-03-05', commentary: 'Solid luxury margin.' },
  { id: 'i_auto11', reportId: 'r_auto', issuerName: 'Tesla', ticker: 'TSLA', sector: 'Auto', indicator: 'Avoid', price: 175.40, marketCap: 550000, peRatio: 45.4, revenueGrowth: 4.5, earningsGrowth: -12.0, history: mockHistory, reportDate: '2026-03-05', commentary: 'High multiple masks contracting auto margins.' }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    userId: 'u1', email: 'client@example.com', name: 'Jane Doe',
    sectorSelections: ['Auto', 'Banks'], issuerSelections: ['TM', 'AMZN'],
    frequency: 'daily', lastDeliveredAt: '2026-03-30', status: 'active'
  }
];
