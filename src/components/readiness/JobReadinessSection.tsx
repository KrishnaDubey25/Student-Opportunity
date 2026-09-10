import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Zap,
  TrendingUp,
  ShieldCheck,
  Code2,
  Database,
  FileText,
  Users,
  Plus,
  Milestone,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';

interface JobReadinessSectionProps {
  compact?: boolean;
}

export const JobReadinessSection: React.FC<JobReadinessSectionProps> = ({ compact = false }) => {
  const {
    jobReadinessItems,
    toggleJobReadinessItem,
    addReadinessToRoadmap,
    overallJobReadinessScore,
    setActiveTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const categories = ['All', 'DSA', 'Full-Stack', 'System Design', 'Resume', 'Interview'];

  const filteredItems = jobReadinessItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'pending' && !item.completed) ||
      (filterStatus === 'completed' && item.completed);
    return matchesCategory && matchesStatus;
  });

  const pendingCount = jobReadinessItems.filter(i => !i.completed).length;
  const completedCount = jobReadinessItems.filter(i => i.completed).length;

  // Pillar scores
  const pillars = [
    {
      name: 'DSA & Coding Speed',
      score: Math.min(95, 55 + (jobReadinessItems.filter(i => i.category === 'DSA' && i.completed).length * 18)),
      target: 85,
      icon: Code2,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
      ringColor: '#27221f'
    },
    {
      name: 'Production Full-Stack',
      score: Math.min(95, 60 + (jobReadinessItems.filter(i => i.category === 'Full-Stack' && i.completed).length * 15)),
      target: 80,
      icon: Database,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      ringColor: '#21845f'
    },
    {
      name: 'System Design & Arch',
      score: Math.min(95, 50 + (jobReadinessItems.filter(i => i.category === 'System Design' && i.completed).length * 25)),
      target: 75,
      icon: TrendingUp,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      ringColor: '#84294a'
    },
    {
      name: 'Resume & Portfolio',
      score: Math.min(95, 65 + (jobReadinessItems.filter(i => i.category === 'Resume' && i.completed).length * 20)),
      target: 90,
      icon: FileText,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      ringColor: '#a66d12'
    },
    {
      name: 'Interview Communication',
      score: Math.min(95, 58 + (jobReadinessItems.filter(i => i.category === 'Interview' && i.completed).length * 22)),
      target: 85,
      icon: Users,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      ringColor: '#bc4f38'
    }
  ];

  // Tier locks
  const tiers = [
    { name: 'Seed & Growth Startups', threshold: 70, roles: 'Full Stack / Frontend Interns' },
    { name: 'Mid-Market & Tech Unicorns', threshold: 78, roles: 'Software Engineer (L3)' },
    { name: 'Tier-1 Big Tech (Google, MSFT)', threshold: 85, roles: 'SWE Intern & New Grad' },
    { name: 'Elite Quantitative & Trading', threshold: 92, roles: 'Core Systems / Quantitative Dev' }
  ];

  // SVG Progress Ring Calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallJobReadinessScore / 100) * circumference;

  return (
    <div className="space-y-5 bg-white">
      {/* Top Banner & Circular Progress Hero */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Circular Progress Gauge */}
          <div className="flex items-center gap-5">
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-slate-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-slate-900"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] leading-none">
                  {overallJobReadinessScore}%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1 font-mono">
                  Readiness
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 text-xs font-bold font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {overallJobReadinessScore >= 85
                    ? 'Tier-1 Tech Ready'
                    : overallJobReadinessScore >= 75
                    ? 'Almost Job-Ready (Near Target)'
                    : 'Foundation Building Phase'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] mt-1">
                Job & Internship Readiness Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5 leading-snug">
                Identifies concrete blockers standing between your profile and passing Tier-1 technical screens.
                Target score is <strong>85%+</strong>.
              </p>
            </div>
          </div>

          {/* Quick Metrics & Roadmap trigger */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                <span className="font-mono">{pendingCount}</span> Blockers to Fix
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                <span className="font-mono">{completedCount}</span> Gaps Cleared
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors font-['Outfit',sans-serif]"
            >
              <Milestone className="w-3.5 h-3.5" />
              <span>Open 14-Day Sprint</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 5 CORE READINESS PILLARS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isMet = pillar.score >= pillar.target;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${pillar.bgColor} ${pillar.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono ${
                    isMet ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {isMet ? 'Passed' : `Need ${pillar.target}%`}
                </span>
              </div>

              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-700 truncate font-['Outfit',sans-serif]">
                  {pillar.name}
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-black text-slate-900 font-mono">{pillar.score}%</span>
                  <span className="text-[10px] text-slate-400 font-mono">Goal: {pillar.target}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.score}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: pillar.ringColor }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* COMPANY READINESS THRESHOLD UNLOCK METER */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span className="text-xs font-black text-slate-900 font-['Outfit',sans-serif]">
              Company Tier Unlock Thresholds
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Reach target scores to be shortlisted in candidate pools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {tiers.map((tier, i) => {
            const isUnlocked = overallJobReadinessScore >= tier.threshold;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className={`p-2.5 rounded-lg border transition-all ${
                  isUnlocked
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-500 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-['Outfit',sans-serif]">{tier.name}</span>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-mono">
                      <Unlock className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      <Lock className="w-3 h-3" /> {tier.threshold}% Req
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 truncate">{tier.roles}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* WHAT YOU NEED TO IMPROVE BEFORE BECOMING JOB-READY */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
                What You Need to Improve Before Becoming Job-Ready
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300 font-mono">
                {pendingCount} Active Action Items
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Check off completed items to simulate and verify readiness score increases.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Action Items List */}
        <div className="space-y-2.5">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.completed
                  ? 'bg-slate-50/70 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200/90 hover:border-slate-400 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Interactive Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleJobReadinessItem(item.id)}
                  className="mt-0.5 text-slate-900 hover:text-black transition-colors flex-shrink-0"
                  title={item.completed ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-slate-900" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
                      {item.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        item.difficulty === 'Essential'
                          ? 'bg-rose-50 text-rose-700'
                          : item.difficulty === 'Advanced'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">
                      +{item.impactScore}% Readiness
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-bold mt-1 font-['Outfit',sans-serif] ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {item.description}
                  </p>

                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Tip: {item.resourceTip}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                {!item.completed && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => addReadinessToRoadmap(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-900 bg-white text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs font-['Outfit',sans-serif]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Roadmap</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleJobReadinessItem(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors font-['Outfit',sans-serif] ${
                    item.completed
                      ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      : 'bg-slate-900 text-white hover:bg-black shadow-2xs'
                  }`}
                >
                  {item.completed ? 'Completed ✓' : 'Mark Done'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
