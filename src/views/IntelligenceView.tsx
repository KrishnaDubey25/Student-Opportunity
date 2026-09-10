import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Milestone,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const IntelligenceView: React.FC = () => {
  const { 
    selectedOpportunityId, 
    opportunities, 
    openIntelligence, 
    toggleSaveOpportunity,
    updateOpportunityStatus,
    setActiveTab 
  } = useApp();

  const opp = opportunities.find(o => o.id === selectedOpportunityId) || opportunities[0];

  if (!opp) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm text-slate-500">No opportunity selected.</p>
        <button
          onClick={() => setActiveTab('discover')}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold font-['Outfit',sans-serif]"
        >
          Browse Opportunities
        </button>
      </div>
    );
  }

  const isSaved = opp.status === 'Saved';
  const isApplied = ['Applied', 'Shortlisted', 'Interview', 'Selected'].includes(opp.status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-5 pb-20 max-w-5xl mx-auto bg-white"
    >
      {/* Top Back & Actions Navigation */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -2 }}
          onClick={() => setActiveTab('discover')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors font-['Outfit',sans-serif]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </motion.button>

        {/* Switch opportunity selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Switch Target:</span>
          <select
            value={opp.id}
            onChange={(e) => openIntelligence(e.target.value)}
            className="py-1 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 font-['Outfit',sans-serif] focus:outline-none focus:border-slate-900"
          >
            {opportunities.filter(o => !o.isMissed).map(o => (
              <option key={o.id} value={o.id}>{o.organization} - {o.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Header Card */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs relative"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-lg text-slate-900 flex-shrink-0 font-mono">
              {opp.organization.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wide font-mono">
                  {opp.type}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  {opp.domain}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
                {opp.title}
              </h1>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {opp.organization}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3.5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.location} ({opp.mode})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold text-slate-800 font-mono">
                    {opp.daysLeft}d left
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const next = isApplied ? 'Preparing' : 'Applied';
                updateOpportunityStatus(opp.id, next);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors shadow-xs font-['Outfit',sans-serif] ${
                isApplied
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-900 hover:bg-black text-white'
              }`}
            >
              {isApplied ? 'Applied ✓' : 'Submit Application'}
            </motion.button>

            <button
              onClick={() => toggleSaveOpportunity(opp.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center justify-center gap-1 text-xs font-bold ${
                isSaved
                  ? 'border-slate-900 bg-slate-100 text-slate-900'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* OVERALL MATCH BREAKDOWN METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Overall Match
          </div>
          <div className="text-xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {opp.matchScore}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${opp.matchScore}%` }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Eligibility
          </div>
          <div className="text-xl font-black text-emerald-600 mt-1 font-['Outfit',sans-serif]">
            {opp.eligibilityScore}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${opp.eligibilityScore}%` }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Readiness
          </div>
          <div className="text-xl font-black text-amber-600 mt-1 font-['Outfit',sans-serif]">
            {opp.readinessScore}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${opp.readinessScore}%` }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Career Impact
          </div>
          <div className="text-xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {opp.careerImpact}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${opp.careerImpact}%` }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Urgency
          </div>
          <div className="text-xl font-black text-rose-600 mt-1 font-['Outfit',sans-serif]">
            {opp.priority}
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full w-4/5" />
          </div>
        </motion.div>
      </div>

      {/* WHY THIS MATCHES YOU & MISSING SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Why this matches you */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
              Why This Matches You
            </h2>
          </div>

          <div className="space-y-2">
            {opp.whyMatch.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills & Gap Diagnostic */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
              Identified Skill Gaps
            </h2>
          </div>

          <div className="space-y-2">
            {opp.missingSkills.length > 0 ? (
              opp.missingSkills.map((gap, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    !
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {gap}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium">
                No major blocking skill gaps detected. You exceed the primary threshold!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECOMMENDED ACTIONS & PREPARATION CTA */}
      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 font-mono">
              Action Plan
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
            Recommended Steps To Maximize Selection
          </h2>

          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {opp.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
              >
                <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 font-mono">
                  {idx + 1}
                </span>
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  {action}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                Launch 14-Day Preparation Plan
              </div>
              <p className="text-[11px] text-slate-400">
                Daily milestones for project building, DSA prep, and mock reviews.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('roadmap')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 font-['Outfit',sans-serif]"
            >
              <Milestone className="w-3.5 h-3.5" />
              <span>Open Roadmap →</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
