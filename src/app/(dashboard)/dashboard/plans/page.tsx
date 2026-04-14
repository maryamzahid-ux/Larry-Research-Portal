"use client";

import { CheckCircle2, CreditCard, ShieldCheck, Zap, Globe, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const PLANS = [
  { id: 'standard', name: 'Standard Insight', price: '49', features: ['Daily Digest', '3 Sectors Tracking', '10 Issuer Alerts', 'Email Support'], icon: <Globe className="w-6 h-6 text-blue-500" /> },
  { id: 'pro', name: 'Professional Terminal', price: '149', features: ['Real-time Signals', 'All Sectors Access', 'Unlimited Issuer Alerts', 'Priority Support', 'API Access'], icon: <Zap className="w-6 h-6 text-amber-500" />, popular: true },
  { id: 'enterprise', name: 'Enterprise Intelligence', price: '899', features: ['Multi-User Access', 'Custom Data Parsing', 'Dedicated Analyst', 'White-label Reports'], icon: <ShieldCheck className="w-6 h-6 text-indigo-500" /> },
];

export default function SubscriptionPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });

  const handleConfirm = () => {
    if (!cardData.number || !cardData.expiry || !cardData.cvc) {
      alert("Please enter valid card details.");
      return;
    }
    setProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-black tracking-tight dark:text-zinc-100 mb-4">Select Your Intelligence Tier</h1>
        <p className="text-zinc-500 font-medium text-lg leading-relaxed">Institutional access to the Curve Framework starting at just $49/mo. Upgrade or downgrade anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id}
            className={`bg-white dark:bg-zinc-900 border-2 rounded-[2.5rem] p-10 flex flex-col relative transition-all duration-300 hover:shadow-2xl ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10 dark:bg-zinc-950' : 'border-zinc-100 dark:border-zinc-800'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">Best Value</div>
            )}
            <div className="mb-8 w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-inner">{plan.icon}</div>
            <h3 className="text-2xl font-black dark:text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-10">
              <span className="text-5xl font-black dark:text-white">${plan.price}</span>
              <span className="text-zinc-500 font-bold">/mo</span>
            </div>
            
            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-zinc-600 dark:text-zinc-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => { setSelectedPlan(plan.name); setShowPayment(true); }}
              className={`w-full py-5 rounded-[1.5rem] font-black tracking-wide transition-all ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none shadow-lg' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-md animate-in fade-in duration-300">
           {!success ? (
             <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-10 md:p-12">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <h2 className="text-3xl font-black dark:text-white">Checkout</h2>
                         <p className="text-zinc-500 font-medium mt-1">Plan: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedPlan}</span></p>
                      </div>
                      <button onClick={() => setShowPayment(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><XCircle className="w-7 h-7 text-zinc-300" /></button>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                         <CreditCard className="w-10 h-10 text-zinc-400" />
                         <div className="flex-1">
                            <label className="block text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">Card Number</label>
                            <input 
                               value={cardData.number}
                               onChange={e => setCardData({...cardData, number: e.target.value})}
                               type="text" 
                               placeholder="4242 4242 4242 4242" 
                               className="bg-transparent border-none p-0 w-full focus:ring-0 text-zinc-900 dark:text-white font-mono text-lg" 
                            />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                           <label className="block text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">Expiry</label>
                           <input 
                              value={cardData.expiry}
                              onChange={e => setCardData({...cardData, expiry: e.target.value})}
                              type="text" 
                              placeholder="MM/YY" 
                              className="bg-transparent border-none p-0 w-full focus:ring-0 text-zinc-900 dark:text-white font-mono text-lg" 
                           />
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                           <label className="block text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">CVC</label>
                           <input 
                              value={cardData.cvc}
                              onChange={e => setCardData({...cardData, cvc: e.target.value})}
                              type="text" 
                              placeholder="***" 
                              className="bg-transparent border-none p-0 w-full focus:ring-0 text-zinc-900 dark:text-white font-mono text-lg" 
                           />
                        </div>
                      </div>

                      <button 
                        onClick={handleConfirm}
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all flex items-center justify-center gap-2 mt-6"
                      >
                        {processing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><CreditCard className="w-6 h-6" /> Confirm Subscription</>}
                      </button>
                      
                      <p className="text-center text-[10px] text-zinc-500 font-bold px-8 leading-relaxed">
                         Secured by Stripe Tier-1 Encryption. Zero-latency processing.
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black dark:text-white mb-4">You're All Set!</h2>
                <p className="text-zinc-500 font-medium mb-10 text-lg leading-relaxed">
                  Welcome to the <span className="text-indigo-600 font-bold">{selectedPlan}</span>. 
                  Your premium terminal is now active and your real-time data feeds are live. Happy investing!
                </p>
                <button 
                   onClick={() => { setShowPayment(false); setSuccess(false); }}
                   className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-black py-5 rounded-[1.5rem] hover:opacity-90 transition-all"
                >
                   Enter Terminal
                </button>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
