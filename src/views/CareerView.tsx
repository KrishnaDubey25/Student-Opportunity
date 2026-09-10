import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const CareerView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-5xl mx-auto bg-white"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
          <TrendingUp className="w-3.5 h-3.5 text-slate-900" />
          <span>Long-Term Modeling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Career Impact & Trajectory
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Early opportunity participation is the primary indicator of post-graduate offer velocity.
        </p>
      </div>

      {/* Trajectory KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
        >
          <span className="text-[11px] font-semibold text-slate-500">Tier-1 Placement Readiness</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">78%</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: '78%' }} />
          </div>
          <p className="text-[10px] text-slate-800 font-bold mt-2 font-mono">
            Top 12% among college cohort
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
        >
          <span className="text-[11px] font-semibold text-slate-500">Compensation Multiplier</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-mono">+2.4x</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            Verified OSS/hackathons boost offers
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
        >
          <span className="text-[11px] font-semibold text-slate-500">Screening Pass Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">91%</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: '91%' }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            Public proof-of-work bypasses ATS
          </p>
        </motion.div>
      </div>

      {/* CAREER TRAJECTORY PATHWAYS */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
            Milestone Progression Map
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Phased trajectory anchored to portfolio and sprint achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
          >
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white font-mono">
              Months 1–3
            </span>
            <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">OSS & Hackathons</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Target: GSoC, SIH, LFX. Builds verifiable public proof-of-work.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
          >
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white font-mono">
              Months 4–7
            </span>
            <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">Tier-1 Internship</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Target: Microsoft, Stripe, Atlassian. Production system deployments.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
          >
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white font-mono">
              Months 8–14
            </span>
            <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">PPO Conversion</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Conversion rate rises to 78% for returning interns with OSS background.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
          >
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-900 text-white font-mono">
              Year 3+
            </span>
            <h3 className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">Senior / Lead SWE</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Accelerated promotion cycle driven by early architectural autonomy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STUDENT ALUMNI CASE STUDY */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center gap-1.5 text-slate-900 text-xs font-black uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Case Study</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
          From Tier-3 College to GSoC & Microsoft
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          "In my 2nd year with zero referrals, I felt invisible. Opportunity Engine showed my React & Git skills already matched Google Summer of Code organizations. Following the 14-day roadmap and fixing my DSA gaps led directly to GSoC, which fast-tracked my Microsoft interview."
        </p>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
          <div><strong className="text-slate-800">Ananya Rao</strong> • 2024 Graduate</div>
          <div>Tier-3 Institute → SDE @ Microsoft</div>
        </div>
      </motion.div>
    </motion.div>
  );
};
