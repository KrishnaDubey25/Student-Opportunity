import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JobReadinessSection } from '../components/readiness/JobReadinessSection';
import { 
  Sparkles, 
  Target, 
  Milestone, 
  ShieldCheck, 
  Code, 
  FileCheck,
  Award
} from 'lucide-react';

export const ReadinessView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-16 bg-white max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Job & Internship Readiness Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Diagnostic
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Measure your technical baseline against 2026 Tier-1 campus hiring benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('simulator')}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors font-['Outfit',sans-serif]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulate Impact</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors font-['Outfit',sans-serif]"
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>14-Day Roadmap</span>
          </motion.button>
        </div>
      </div>

      {/* Main Readiness Engine Component */}
      <JobReadinessSection />

      {/* HIRING SCREEN BENCHMARK MATRIX */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
              Hiring Screening Stages Benchmark
            </h3>
            <p className="text-xs text-slate-500">
              Where candidates drop off and what skills convert to offers
            </p>
          </div>
          <span className="text-xs font-bold text-slate-900 font-mono">
            SWE Internship & New Grad
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
              <span>1. Resume & ATS Screen</span>
              <FileCheck className="w-4 h-4 text-slate-900" />
            </div>
            <div className="text-xl font-black text-slate-900 mt-2 font-mono">Top 20%</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Keyword matching, verified GitHub repos, GPA ≥ 3.5 or 8.0/10.0, quantified project bullets.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
              <span>2. Online Assessment (OA)</span>
              <Code className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-slate-900 mt-2 font-mono">Top 8%</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              2 Medium/Hard DSA problems in 70 minutes. Requires high confidence in DP, Trees, and Graphs.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
              <span>3. Tech Live Interview</span>
              <Target className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-xl font-black text-slate-900 mt-2 font-mono">Top 3%</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Whiteboard DSA, clean code architecture, handling edge cases, and continuous verbal explanation.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
              <span>4. Final Offer Round</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-emerald-600 mt-2 font-mono">Top 1.5%</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              STAR behavioral alignment, culture fit, curiosity about team mission, compensation negotiation.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
