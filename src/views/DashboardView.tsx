import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_SIMULATOR_SKILLS } from '../data/mockData';
import { OpportunityDistributionChart } from '../components/charts/OpportunityDistributionChart';
import { SkillsRadarChart } from '../components/charts/SkillsRadarChart';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  Building2,
  Trophy,
  Flame,
  Award,
  Check,
  Briefcase,
  GraduationCap,
  Layers,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Compass,
  Kanban,
  Code2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { OpportunityCategory, Opportunity } from '../types';

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    opportunities, 
    stats, 
    selectedCollege,
    nextActions,
    toggleNextAction,
    setActiveTab,
    overallJobReadinessScore,
    hackathonReadinessScore,
    jobReadinessItems,
    profileStrength,
    openIntelligence,
    showToast,
    openCategoryInDiscover
  } = useApp();

  // In-dashboard category preview filter
  const [previewCategory, setPreviewCategory] = useState<'All' | 'Hackathons' | 'Internships' | 'Scholarships' | 'Competitions'>('All');

  // Interactive Skill Simulator state on dashboard
  const [simulatedSkillName, setSimulatedSkillName] = useState<string | null>(null);

  // Selected simulated skill object
  const activeSimulatedSkill = AVAILABLE_SIMULATOR_SKILLS.find(s => s.name === simulatedSkillName) || null;
  const boostPercent = activeSimulatedSkill ? Math.min(18, activeSimulatedSkill.boostMatch) : 0;
  
  // Evidence-based readiness starts from the student's own profile and completed work.
  const baseIndustryScore = Math.round((overallJobReadinessScore + profileStrength + hackathonReadinessScore) / 3);
  const currentIndustryProgress = Math.min(100, baseIndustryScore + boostPercent);
  const completedReadinessItems = jobReadinessItems.filter(item => item.completed).length;

  // Filter specific opportunities for feature cards
  const collegeHackathons = opportunities.filter(
    o => o.type === 'Hackathon' || o.category.includes('Hackathon')
  );

  const internships = opportunities.filter(
    o => o.type === 'Internship' && !o.isMissed
  );

  const scholarships = opportunities.filter(
    o => o.type === 'Scholarship' && !o.isMissed
  );

  const competitions = opportunities.filter(
    o => o.type === 'Competition' || o.category.includes('Competition')
  );

  // Handle simulator toggle
  const handleToggleSkill = (skillName: string) => {
    if (simulatedSkillName === skillName) {
      setSimulatedSkillName(null);
      showToast('Simulation reset.');
    } else {
      setSimulatedSkillName(skillName);
      const skillObj = AVAILABLE_SIMULATOR_SKILLS.find(s => s.name === skillName);
      showToast(`Simulated ${skillName}! Industry Readiness boosted by +${skillObj?.boostMatch || 12}%.`);
    }
  };

  // Filtered preview list
  const previewOpportunities = opportunities.filter(opp => {
    if (previewCategory === 'All') return true;
    if (previewCategory === 'Hackathons') return opp.type === 'Hackathon' || opp.category.includes('Hackathon');
    if (previewCategory === 'Internships') return opp.type === 'Internship';
    if (previewCategory === 'Scholarships') return opp.type === 'Scholarship';
    if (previewCategory === 'Competitions') return opp.type === 'Competition' || opp.category.includes('Competition');
    return true;
  }).slice(0, 6);

  // Feature Cards definition with real Unsplash images and direct navigation
  const featureCards = [
    {
      id: 'hackathons',
      title: 'College & National Hackathons',
      categoryLabel: 'HACKATHON',
      subtitle: 'Build, compete and ship solutions at campus and national innovation events.',
      countLabel: `${collegeHackathons.length} Active Events`,
      prizeLabel: 'Browse Active Events',
      icon: Trophy,
      badgeColor: 'bg-amber-500 text-slate-950',
      accentColor: 'border-amber-400/40 hover:border-amber-500',
      actionText: 'Go to Hackathons',
      onClick: () => openCategoryInDiscover('College Hackathons')
    },
    {
      id: 'internships',
      title: 'High-Growth Tech Internships',
      categoryLabel: 'INTERNSHIP',
      subtitle: 'Verified software, AI and product internships matched to your current skills.',
      countLabel: `${internships.length} Verified Openings`,
      prizeLabel: 'Role-Based Openings',
      icon: Briefcase,
      badgeColor: 'bg-emerald-500 text-white',
      accentColor: 'border-emerald-400/40 hover:border-emerald-500',
      actionText: 'Go to Internships',
      onClick: () => openCategoryInDiscover('Internships')
    },
    {
      id: 'scholarships',
      title: 'Merit & Need Scholarships',
      categoryLabel: 'SCHOLARSHIP',
      subtitle: 'Merit scholarships, tuition support and research grants with clear eligibility.',
      countLabel: `${scholarships.length} Active Grants`,
      prizeLabel: 'Check Eligibility',
      icon: GraduationCap,
      badgeColor: 'bg-rose-600 text-white',
      accentColor: 'border-rose-400/40 hover:border-rose-500',
      actionText: 'Go to Scholarships',
      onClick: () => openCategoryInDiscover('Scholarships')
    },
    {
      id: 'competitions',
      title: 'Inter-College Tech Competitions',
      categoryLabel: 'COMPETITION',
      subtitle: 'Technical competitions, robotics challenges and inter-college showcases.',
      countLabel: `${competitions.length} Techfests`,
      prizeLabel: 'Build Competitive Proof',
      icon: Flame,
      badgeColor: 'bg-rose-600 text-white',
      accentColor: 'border-rose-400/40 hover:border-rose-500',
      actionText: 'Go to Competitions',
      onClick: () => openCategoryInDiscover('Competitions')
    },
    {
      id: 'tracker',
      title: 'My Applications Status Tracker',
      categoryLabel: 'APPLICATIONS',
      subtitle: 'Track every application stage, milestone, deadline and submission status.',
      countLabel: 'Your Private Pipeline',
      prizeLabel: 'Track Every Stage',
      icon: Kanban,
      badgeColor: 'bg-emerald-600 text-white',
      accentColor: 'border-emerald-400/40 hover:border-emerald-500',
      actionText: 'Open Status Tracker',
      onClick: () => setActiveTab('tracker')
    },
    {
      id: 'simulator',
      title: 'What-If Skill Simulator',
      categoryLabel: 'SKILL SIMULATOR',
      subtitle: 'Test how learning a new skill changes your readiness and opportunity match.',
      countLabel: 'Skill Impact Model',
      prizeLabel: 'Explore Skill Impact',
      icon: Zap,
      badgeColor: 'bg-orange-500 text-slate-950',
      accentColor: 'border-orange-400/40 hover:border-orange-500',
      actionText: 'Launch Simulator',
      onClick: () => setActiveTab('simulator')
    },
    {
      id: 'college',
      title: `${selectedCollege.shortName} Campus Center`,
      categoryLabel: 'CAMPUS CENTER',
      subtitle: 'Verified campus notices, placement drives and college-exclusive opportunities.',
      countLabel: `${selectedCollege.city} Hub`,
      prizeLabel: 'Campus-Verified Updates',
      icon: Building2,
      badgeColor: 'bg-amber-600 text-white',
      accentColor: 'border-amber-400/40 hover:border-amber-500',
      actionText: 'Visit Campus Hub',
      onClick: () => setActiveTab('college')
    },
    {
      id: 'target-jobs',
      title: 'Target Job Study Tracker',
      categoryLabel: 'TARGET JOBS',
      subtitle: 'Search a role, open its syllabus, mark studied topics and track what remains.',
      countLabel: 'Role-Based Syllabus',
      prizeLabel: 'Progress by Topic',
      icon: Target,
      badgeColor: 'bg-plum-900 text-white',
      accentColor: 'border-plum-300/60 hover:border-plum-700',
      actionText: 'Open Target Jobs',
      onClick: () => setActiveTab('target-jobs')
    },
    {
      id: 'roadmap',
      title: '14-Day Placement Roadmap',
      categoryLabel: 'CAREER ROADMAP',
      subtitle: 'A structured preparation sprint with clear daily actions and measurable progress.',
      countLabel: '14 Structured Steps',
      prizeLabel: 'Structured Preparation',
      icon: Target,
      badgeColor: 'bg-slate-900 text-white',
      accentColor: 'border-slate-400/40 hover:border-slate-900',
      actionText: 'View Roadmap Steps',
      onClick: () => setActiveTab('roadmap')
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="dashboard-premium w-full space-y-8 pb-16 text-slate-900">
      
      {/* 1. STUDENT & CAMPUS BANNER */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="dashboard-hero p-6 sm:p-8 rounded-[28px] bg-white border border-slate-200 text-slate-900 shadow-sm relative overflow-hidden">
        {/* Background decorative blur */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none ambient-orb" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none ambient-orb" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gold-50 text-gold-600 border border-gold-200 font-mono">
                <Building2 className="w-3.5 h-3.5 text-gold-600" />
                <span>{selectedCollege.shortName} Campus Hub</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Partner Network</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-['Outfit',sans-serif] text-slate-950">
              Welcome, {profile.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              {profile.degree} • {selectedCollege.name}. Your private workspace combines campus context, opportunities, target-job study plans, readiness and application progress.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('target-jobs')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-ivory-50 border border-slate-300 text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-plum-900" />
              <span>Plan Target Job</span>
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>My Activity & Status</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. PROFESSIONAL WORKSPACE NAVIGATION CARDS */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase text-emerald-700 font-mono tracking-[0.16em]">
                Opportunity Command Center
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-gold-50 text-gold-600 border border-gold-200">
                9 focused workspaces
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              Explore Your Opportunity Workspace
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Each workspace is designed around a single student goal for faster navigation and clearer decisions.
          </p>
        </div>

        {/* Highly visual, animated workspace cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: Math.min(0.28, featureCards.indexOf(card) * 0.045), ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -7, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={card.onClick}
                className={`opportunity-board-card group relative rounded-[26px] overflow-hidden border ${card.accentColor} shadow-xs hover:shadow-xl transition-all cursor-pointer bg-white flex flex-col justify-between`}
              >
                {/* Lightweight category header: no remote image banner. */}
                <div className="workspace-card-head relative min-h-[82px] overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3.5 sm:p-4">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl" />
                  <div className="relative z-10 flex h-full items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300 font-mono">Student Workspace</span>
                      <div className="mt-1 text-lg sm:text-xl font-black tracking-tight text-white font-['Outfit',sans-serif] leading-none">
                        {card.categoryLabel}
                      </div>
                      <div className="mt-2 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[9px] font-black text-slate-200">
                        <span className="truncate">{card.countLabel}</span>
                      </div>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(33,132,95,.08)]" />
                      <span className="text-[9px] font-black tracking-[0.16em] text-slate-400 font-mono uppercase">Student Workspace</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-950 group-hover:text-emerald-700 transition-colors font-['Outfit',sans-serif] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1.5 line-clamp-2">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 font-['Outfit',sans-serif]">
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
Open workspace
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. VISUAL GRAPHS & INDUSTRY LEVEL READINESS GAUGE */}
      <div className="space-y-3 pt-2">
        <div>
          <span className="text-[11px] font-black uppercase text-emerald-600 font-mono tracking-wider">
            Student Analytics & Metrics
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            How Much Progress to the Industry Level?
          </h2>
          <p className="text-xs text-slate-500">
            Real-time readiness gauge with interactive skill booster and category distribution graph.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Industry Gauge (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black font-['Outfit',sans-serif] text-white">
                      Evidence-Based Career Readiness
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Calculated from your profile and completed preparation
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-gold-600">
                    {currentIndustryProgress}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">
                    {boostPercent > 0 ? `+${boostPercent}% Boosted` : 'Current Score'}
                  </span>
                </div>
              </div>

              {/* Progress Ring Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/10 mb-5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentIndustryProgress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-400"
                />
              </div>

              {/* Readiness signals use only account-specific evidence. */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Profile Evidence</span>
                  <span className="text-sm font-black text-white font-mono">{profileStrength}%</span>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${profileStrength}%` }} />
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Preparation Tasks</span>
                  <span className="text-sm font-black text-white font-mono">{completedReadinessItems}/{jobReadinessItems.length}</span>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${overallJobReadinessScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Hackathon Evidence</span>
                  <span className="text-sm font-black text-white font-mono">{hackathonReadinessScore}%</span>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${hackathonReadinessScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Applications</span>
                  <span className="text-sm font-black text-white font-mono">{stats.activeApplications} active</span>
                  <div className="mt-1.5 text-[10px] font-bold text-slate-400">Only your account activity</div>
                </div>
              </div>

              {/* Interactive Skill Booster Chips */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explore how an added skill could affect your readiness estimate:</span>
                  </span>
                  {simulatedSkillName && (
                    <button
                      onClick={() => setSimulatedSkillName(null)}
                      className="text-[11px] text-slate-400 hover:text-white underline font-mono"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {AVAILABLE_SIMULATOR_SKILLS.slice(0, 6).map((skill) => {
                    const isSelected = simulatedSkillName === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => handleToggleSkill(skill.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-amber-400 text-slate-950 shadow-xs' 
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                        }`}
                      >
                        <span>{skill.name}</span>
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-slate-900' : 'text-gold-600'}`}>
                          +{skill.boostMatch}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>What-If Skill Impact</span>
              <button
                onClick={() => setActiveTab('simulator')}
                className="text-gold-600 font-bold hover:underline flex items-center gap-1 font-mono"
              >
                <span>Full What-If Simulator View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Distribution Graph (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                  Opportunity Ecosystem Graph
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                  {opportunities.length} Total Openings
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Live distribution of hackathons, internships, and grants.
              </p>
              
              <div className="h-44 w-full flex items-center justify-center">
                <OpportunityDistributionChart opportunities={opportunities} />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Fast Navigation:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCategoryInDiscover('College Hackathons')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Hackathons
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={() => openCategoryInDiscover('Internships')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Internships
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. ON-DASHBOARD OPPORTUNITY REVIEW (Interactive Category Switcher) */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              Explore Active Opportunities Right Here
            </h2>
            <p className="text-xs text-slate-500">
              Filter active opportunities or jump straight to the complete Discover workspace.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold flex-wrap">
            {(['All', 'Hackathons', 'Internships', 'Scholarships', 'Competitions'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setPreviewCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all font-['Outfit',sans-serif] ${
                  previewCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewOpportunities.map((opp) => (
            <motion.div
              key={opp.id}
              whileHover={{ y: -2 }}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {opp.category}
                  </span>
                  <span className="text-xs font-black font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {opp.matchScore}% Match
                  </span>
                </div>

                <h3 
                  onClick={() => openIntelligence(opp.id)}
                  className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer font-['Outfit',sans-serif] line-clamp-1"
                >
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {opp.organization} {opp.collegeName && `• ${opp.collegeName}`}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.deadline} ({opp.daysLeft}d left)</span>
                  </span>
                  <span className="font-bold text-amber-600 font-mono">
                    {opp.stipendOrPrize}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => openIntelligence(opp.id)}
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all text-center font-['Outfit',sans-serif]"
                  >
                    View Details & Apply
                  </button>
                  <button
                    onClick={() => {
                      showToast(`Added ${opp.title} to your Tracker!`);
                      setActiveTab('tracker');
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all"
                    title="Track in Pipeline"
                  >
                    Track
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('discover')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-all font-['Outfit',sans-serif]"
          >
            <span>Open All Opportunities in Discover Hub ({opportunities.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. TRIPLE ACTION STATUS CARDS: Next Actions, Completed & In Progress, Gaps */}
      <div className="space-y-3 pt-2">
        <div>
          <span className="text-[11px] font-black uppercase text-emerald-600 font-mono tracking-wider">
            Execution Roadmap
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            Status & Execution Cards
          </h2>
          <p className="text-xs text-slate-500">
            Keep track of what you need to do next, what is already submitted, and what gaps need bridging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Next Actions (Next Actions / To-Do Steps) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                      Next Actions
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">
                      Next Actions & Deadlines
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700">
                  {nextActions.filter(a => !a.completed).length} Pending
                </span>
              </div>

              <div className="space-y-2.5 my-3">
                {nextActions.filter(a => !a.completed).slice(0, 3).map((action) => (
                  <div
                    key={action.id}
                    onClick={() => toggleNextAction(action.id)}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer flex items-start gap-2.5"
                  >
                    <div className="w-4 h-4 rounded-md border border-slate-300 mt-0.5 flex items-center justify-center bg-white flex-shrink-0">
                      {action.completed && <Check className="w-3 h-3 text-emerald-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {action.title}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {action.impactText} • +{action.xpReward} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-1 font-['Outfit',sans-serif]"
            >
              <span>View 14-Day Action Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Completed & In Progress (Applied & Completed) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                      Completed & In Progress
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">
                      Applied & Completed
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700">
                  4 Verified
                </span>
              </div>

              <div className="space-y-2.5 my-3">
                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Innobuzz 2026 Team Registered</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">Stage 2</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Team: ByteWarriors • SLRTCE Campus Techfest
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Google Cloud Architecture Certificate</span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">Completed</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Verified badge added to student profile
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Microsoft SWE Application</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">Under Review</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Online assessment round pending
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('tracker')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1 font-['Outfit',sans-serif]"
            >
              <span>Manage in Status Tracker</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Gaps Requiring Attention (Skill Gaps & Attention Items) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                      Gaps Requiring Attention
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">
                      Gaps & Attention Needed
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700">
                  2 Pending Gaps
                </span>
              </div>

              <div className="space-y-2.5 my-3">
                <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Docker & Kubernetes Missing</span>
                    <span className="text-[10px] font-mono text-rose-700 font-bold">-14% Match</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Required by 18 top internship openings
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Innobuzz PPT Submission</span>
                    <span className="text-[10px] font-mono text-amber-700 font-bold">5 Days Left</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Submit problem statement deck on campus portal
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('simulator')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 font-['Outfit',sans-serif]"
            >
              <span>Bridge Gaps with Simulator</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </motion.div>
  );
};
