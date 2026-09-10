import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  RotateCcw,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  Calendar,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const { opportunities, setActiveTab } = useApp();

  const missedOpps = opportunities.filter(o => o.isMissed && o.recoveryPlan);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-5xl mx-auto bg-white"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold mb-2 font-mono">
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span>Contingency Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Missed Opportunity Recovery
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xl">
          Automatic redirection to active alternatives and early preparation pipelines for next cycle.
        </p>
      </div>

      {/* Recovery Opportunity Cards */}
      <div className="space-y-4">
        {missedOpps.map((opp) => {
          const plan = opp.recoveryPlan!;
          return (
            <motion.div
              key={opp.id}
              whileHover={{ y: -1 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
            >
              {/* Missed Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-extrabold flex-shrink-0">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-rose-600 uppercase font-mono">
                        Deadline Passed
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-400">
                        {opp.organization}
                      </span>
                    </div>
                    <h2 className="text-base font-black text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
                      {opp.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-900" />
                  <span>Next Cycle: <strong>{plan.nextCycleDate}</strong></span>
                </div>
              </div>

              {/* 2-Column Recovery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Immediate Active Alternatives */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                      Open Active Alternatives
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Parallel programs sharing matching tech stack and prestige:
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {plan.alternativeOpportunities.map((alt, aIdx) => (
                      <motion.div
                        key={aIdx}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setActiveTab('discover')}
                        className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-slate-400 transition-all group"
                      >
                        <span className="text-xs font-bold text-slate-800 group-hover:text-black font-['Outfit',sans-serif]">
                          {alt}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 font-mono">
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Preparation Steps for Next Round */}
                <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                      Next Cycle Action Strategy
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Recommended preparation steps prior to application reopening:
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {plan.prepStepsForNextCycle.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="pt-1 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('discover')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 font-['Outfit',sans-serif] shadow-2xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Browse Similar Programs</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
