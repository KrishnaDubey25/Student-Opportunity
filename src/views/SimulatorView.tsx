import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_SIMULATOR_SKILLS } from '../data/mockData';
import {
  Sparkles,
  Unlock,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const SimulatorView: React.FC = () => {
  const { opportunities, openIntelligence } = useApp();
  const [selectedSkillName, setSelectedSkillName] = useState<string>('React');

  const selectedSkill = AVAILABLE_SIMULATOR_SKILLS.find(s => s.name === selectedSkillName) || AVAILABLE_SIMULATOR_SKILLS[0];

  const baseQualifiedCount = 24;
  const simulatedQualifiedCount = baseQualifiedCount + selectedSkill.boostOpps;

  const baseMatchAvg = 68;
  const simulatedMatchAvg = Math.min(96, baseMatchAvg + selectedSkill.boostMatch);

  const unlockedOpps = opportunities
    .filter(o => !o.isMissed && (o.requiredSkills.includes(selectedSkill.name) || o.preferredSkills?.includes(selectedSkill.name)))
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 bg-white"
    >
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Predictive Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          What-If Skill Impact
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xl">
          Simulate how mastering a specific competency directly expands your eligibility and match scores.
        </p>
      </div>

      {/* SKILL SELECTION CHIPS */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Select Competency
          </span>
          <span className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
            Instant Projection
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {AVAILABLE_SIMULATOR_SKILLS.map((skill) => {
            const isSelected = selectedSkillName === skill.name;
            return (
              <motion.button
                key={skill.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSkillName(skill.name)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs font-['Outfit',sans-serif]">{skill.name}</span>
                  {isSelected ? (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-600 font-mono">
                      +{skill.boostOpps}
                    </span>
                  )}
                </div>
                <div className={`mt-0.5 text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {skill.category}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* SIMULATION VISUAL IMPACT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Before vs After Card */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-900 uppercase font-mono">
                Projection: {selectedSkill.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                +{selectedSkill.boostOpps} Roles Unlocked
              </span>
            </div>

            {/* Before vs After comparison numbers */}
            <div className="mt-4 grid grid-cols-2 gap-3 items-center">
              {/* Before */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-400 font-medium">Current Baseline</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-0.5 font-mono">{baseQualifiedCount}</div>
                <div className="mt-1.5 text-[11px] text-slate-500">
                  Avg Match: <strong className="text-slate-800 font-mono">{baseMatchAvg}%</strong>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: `${baseMatchAvg}%` }} />
                </div>
              </div>

              {/* After */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 font-bold">With {selectedSkill.name}</span>
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-0.5 font-mono">
                  {simulatedQualifiedCount}
                </div>
                <div className="mt-1.5 text-[11px] text-slate-300">
                  Projected: <strong className="font-mono text-emerald-400">{simulatedMatchAvg}% (+{selectedSkill.boostMatch}%)</strong>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: `${simulatedMatchAvg}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Breakdown by Category
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Internships</span>
                <span className="text-base font-black text-slate-800 font-mono">+{selectedSkill.boostBreakdown.internships}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Hackathons</span>
                <span className="text-base font-black text-slate-800 font-mono">+{selectedSkill.boostBreakdown.hackathons}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Open Source</span>
                <span className="text-base font-black text-slate-800 font-mono">+{selectedSkill.boostBreakdown.openSource}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Jobs & Placement</span>
                <span className="text-base font-black text-slate-800 font-mono">+{selectedSkill.boostBreakdown.jobs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Pathway */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                Sprint Roadmap: {selectedSkill.name}
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast-track 12-hour micro-curriculum.
            </p>

            <div className="mt-3.5 space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex justify-between text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                  <span>1. Fundamentals</span>
                  <span className="text-slate-900 font-mono">Days 1–3</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Core syntax and 3 functional exercises.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex justify-between text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                  <span>2. Mini-Project</span>
                  <span className="text-slate-900 font-mono">Days 4–8</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Full implementation integrated into GitHub repository.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex justify-between text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                  <span>3. Interview Practice</span>
                  <span className="text-slate-900 font-mono">Days 9–12</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Edge cases, performance profiling, and drills.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Commitment:</span>
            <span className="font-bold text-slate-800 font-mono">12-14 Hours</span>
          </div>
        </div>
      </div>

      {/* NEWLY UNLOCKED OPPORTUNITY SPOTLIGHT */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
            Roles Benefiting From {selectedSkill.name}
          </h2>
          <p className="text-xs text-slate-400">
            Immediate fit uplift upon completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {unlockedOpps.length > 0 ? (
            unlockedOpps.map(opp => (
              <motion.div
                key={opp.id}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => openIntelligence(opp.id)}
                className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-900 uppercase font-mono">
                      {opp.type}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">
                      +{selectedSkill.boostMatch}%
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-black transition-colors mt-1 line-clamp-1 font-['Outfit',sans-serif]">
                    {opp.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{opp.organization}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-900 flex items-center justify-between font-['Outfit',sans-serif]">
                  <span>Inspect Fit</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 p-6 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-400">
              Multiple additional opportunities are unlocked in the extended database.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
