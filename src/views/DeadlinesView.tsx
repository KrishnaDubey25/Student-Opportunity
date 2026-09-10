import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Flame,
  Calendar
} from 'lucide-react';

export const DeadlinesView: React.FC = () => {
  const { opportunities, openIntelligence, updateOpportunityStatus } = useApp();

  const activeOpps = opportunities.filter(o => !o.isMissed);

  const urgent48h = activeOpps.filter(o => o.daysLeft > 0 && o.daysLeft <= 2);
  const closingThisWeek = activeOpps.filter(o => o.daysLeft > 2 && o.daysLeft <= 7);
  const next30Days = activeOpps.filter(o => o.daysLeft > 7 && o.daysLeft <= 30);
  const later = activeOpps.filter(o => o.daysLeft > 30);

  const renderOpportunityRow = (opp: any, urgencyClass: string) => (
    <motion.div
      key={opp.id}
      whileHover={{ y: -2 }}
      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-400 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl font-black text-xs flex flex-col items-center justify-center min-w-[46px] font-mono ${urgencyClass}`}>
          <span className="text-sm leading-tight">{opp.daysLeft}</span>
          <span className="text-[9px] uppercase font-bold tracking-tight">Days</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-900 uppercase font-mono">
              {opp.type}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Due: {opp.deadline}
            </span>
          </div>
          <h3
            onClick={() => openIntelligence(opp.id)}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-black cursor-pointer font-['Outfit',sans-serif] mt-0.5"
          >
            {opp.title}
          </h3>
          <p className="text-[11px] text-slate-500">{opp.organization} • {opp.stipendOrPrize}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openIntelligence(opp.id)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-2xs font-['Outfit',sans-serif]"
        >
          View Fit
        </motion.button>
        <button
          onClick={() => updateOpportunityStatus(opp.id, 'Applied')}
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors font-['Outfit',sans-serif]"
        >
          Mark Applied
        </button>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-4xl mx-auto bg-white"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100 text-[11px] font-bold mb-2 font-mono">
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          <span>Deadline Radar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Urgency Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Opportunities sorted by closing dates to ensure timely submissions.
        </p>
      </div>

      {/* Section 1: Urgent < 48h */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <h2 className="text-xs font-black uppercase tracking-wider text-rose-600 font-mono">
            Critical (&lt;48 Hours) • {urgent48h.length}
          </h2>
        </div>
        {urgent48h.length > 0 ? (
          urgent48h.map(o => renderOpportunityRow(o, 'bg-rose-50 text-rose-700 border border-rose-200/60'))
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-400 font-medium">
            No deadlines in the next 48 hours.
          </div>
        )}
      </div>

      {/* Section 2: This Week */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 font-mono">
            This Week (3-7 Days) • {closingThisWeek.length}
          </h2>
        </div>
        {closingThisWeek.map(o => renderOpportunityRow(o, 'bg-amber-50 text-amber-700 border border-amber-200/60'))}
      </div>

      {/* Section 3: Next 30 Days */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-700" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
            Next 30 Days • {next30Days.length}
          </h2>
        </div>
        {next30Days.map(o => renderOpportunityRow(o, 'bg-slate-100 text-slate-900 border border-slate-200'))}
      </div>

      {/* Section 4: Later */}
      {later.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
            Later & Rolling Deadlines • {later.length}
          </h2>
          {later.map(o => renderOpportunityRow(o, 'bg-slate-50 text-slate-700 border border-slate-200/60'))}
        </div>
      )}
    </motion.div>
  );
};
