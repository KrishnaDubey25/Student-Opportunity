import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  X,
  Plus
} from 'lucide-react';

export const CompareView: React.FC = () => {
  const { 
    compareList, 
    opportunities, 
    toggleCompareOpportunity, 
    openIntelligence, 
    updateOpportunityStatus, 
    clearCompareList,
    setActiveTab 
  } = useApp();

  const comparedOpps = opportunities.filter(o => compareList.includes(o.id));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-6xl mx-auto bg-white"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
            <Scale className="w-3.5 h-3.5 text-slate-900" />
            <span>Benchmark Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Opportunity Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare compensation, career trajectory, readiness, and skill overlap side-by-side.
          </p>
        </div>

        {comparedOpps.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompareList}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors font-['Outfit',sans-serif]"
            >
              Clear All
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('discover')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-2xs font-['Outfit',sans-serif]"
            >
              + Add (Max 3)
            </motion.button>
          </div>
        )}
      </div>

      {comparedOpps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
          <Scale className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
            No roles in comparison
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse the discovery engine and tap the scale icon on cards to compare up to 3 options.
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold transition-colors font-['Outfit',sans-serif]"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparedOpps.map((opp) => (
            <motion.div
              key={opp.id}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between relative space-y-4"
            >
              {/* Close / Remove button */}
              <button
                onClick={() => toggleCompareOpportunity(opp.id)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Remove from comparison"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-3.5">
                {/* Header info */}
                <div>
                  <span className="text-[10px] font-black text-slate-900 uppercase font-mono">
                    {opp.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5 line-clamp-1 font-['Outfit',sans-serif]">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">{opp.organization}</p>
                </div>

                {/* Match Scores Matrix */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block font-mono">MATCH</span>
                    <span className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">{opp.matchScore}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block font-mono">IMPACT</span>
                    <span className="text-lg font-black text-rose-600 font-['Outfit',sans-serif]">{opp.careerImpact}%</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] text-slate-400 font-semibold block font-mono">ELIGIBILITY</span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">{opp.eligibilityScore}%</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] text-slate-400 font-semibold block font-mono">READINESS</span>
                    <span className="text-xs font-bold text-amber-600 font-mono">{opp.readinessScore}%</span>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Award / Stipend:</span>
                    <strong className="text-slate-900 font-bold font-mono">{opp.stipendOrPrize}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Duration:</span>
                    <span>{opp.duration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Location:</span>
                    <span>{opp.location} ({opp.mode})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Deadline:</span>
                    <span className="font-bold text-rose-600 font-mono">{opp.daysLeft}d left</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Difficulty:</span>
                    <span className="font-medium">{opp.difficulty}</span>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase font-mono">Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {opp.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openIntelligence(opp.id)}
                  className="flex-1 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-colors text-center shadow-2xs font-['Outfit',sans-serif]"
                >
                  Deep Analysis
                </motion.button>
                <button
                  onClick={() => updateOpportunityStatus(opp.id, 'Applied')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors font-['Outfit',sans-serif]"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add more placeholder if < 3 */}
          {comparedOpps.length < 3 && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveTab('discover')}
              className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-400 flex flex-col items-center justify-center text-center cursor-pointer group transition-all min-h-[380px] bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                Add Another Role
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-[180px]">
                Compare up to 3 opportunities side-by-side.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};
