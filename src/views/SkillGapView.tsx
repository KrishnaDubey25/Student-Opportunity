import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { skillGaps, setActiveTab } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-5xl mx-auto bg-white"
    >
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
          <GitPullRequest className="w-3.5 h-3.5 text-slate-900" />
          <span>Diagnostic Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Skill Gap Analysis
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xl">
          Verified competencies benchmarked against requirements from 500+ top student programs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
              {skillGaps.filter(s => s.priority === 'Critical' || s.priority === 'High').length} High Priority
            </div>
            <div className="text-[11px] text-slate-400">Blocking 30+ top tier programs</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
              {skillGaps.filter(s => s.gap === 'None').length} Met Benchmarks
            </div>
            <div className="text-[11px] text-slate-400">Python, Git & OSS verified</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
              +48 Roles Total
            </div>
            <div className="text-[11px] text-slate-400">Unlockable by bridging top 3 gaps</div>
          </div>
        </motion.div>
      </div>

      {/* VISUAL PROGRESS-BASED SKILL MATRIX */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
              Competency Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Current proficiency vs target benchmark
            </p>
          </div>
          <button
            onClick={() => setActiveTab('simulator')}
            className="text-xs font-bold text-slate-900 hover:text-black hover:underline flex items-center gap-1 font-['Outfit',sans-serif]"
          >
            <span>Simulate Impact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {skillGaps.map((item, idx) => {
            const isCompleted = item.gap === 'None';
            const isCritical = item.priority === 'Critical';

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:border-slate-300 transition-all space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-slate-900 font-['Outfit',sans-serif]">
                      {item.skill}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCritical
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isCompleted ? '✓ Target Met' : `${item.priority} Priority`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Current: </span>
                      <span className="font-bold text-slate-800 font-mono">
                        {item.currentLevel} ({item.currentPercentage}%)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Required: </span>
                      <span className="font-bold text-slate-900 font-mono">
                        {item.requiredLevel} ({item.targetPercentage}%)
                      </span>
                    </div>
                    {item.unlockableOpportunities > 0 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                        +{item.unlockableOpportunities} Roles
                      </span>
                    )}
                  </div>
                </div>

                {/* Layered Progress Bar */}
                <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-slate-300 rounded-full"
                    style={{ width: `${item.targetPercentage}%` }}
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isCompleted
                        ? 'bg-emerald-500'
                        : isCritical
                        ? 'bg-rose-500'
                        : 'bg-slate-900'
                    }`}
                    style={{ width: `${item.currentPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-0.5">
                  <span>
                    Gap: <strong className="text-slate-700 font-medium">{item.gap}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {isCompleted
                      ? 'Fully meets prerequisites'
                      : `Bridge ${item.targetPercentage - item.currentPercentage}% to qualify`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
