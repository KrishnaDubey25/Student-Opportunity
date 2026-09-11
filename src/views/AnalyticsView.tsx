import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { OpportunityGrowthChart } from '../components/charts/OpportunityGrowthChart';
import { OpportunityDistributionChart } from '../components/charts/OpportunityDistributionChart';
import { ApplicationStatusChart } from '../components/charts/ApplicationStatusChart';
import { SkillsRadarChart } from '../components/charts/SkillsRadarChart';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Sparkles, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Flame, 
  GraduationCap, 
  Brain,
  Building2,
  Share2
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { 
    opportunities, 
    profile, 
    jobReadinessItems, 
    stats, 
    selectedCollege,
    showToast 
  } = useApp();

  const totalExplored = opportunities.length;
  const appliedList = opportunities.filter(o => ['Applied', 'Shortlisted', 'Interview', 'Selected'].includes(o.status));
  const appliedCount = appliedList.length;
  const qualificationRate = totalExplored > 0 ? Math.round((appliedCount / totalExplored) * 100) : 0;
  const hackathons = opportunities.filter(o => o.type === 'Hackathon' || o.category.includes('Hackathon'));
  const hackathonsApplied = hackathons.filter(o => ['Applied', 'Shortlisted', 'Interview', 'Selected'].includes(o.status)).length;
  const completedReadiness = jobReadinessItems.filter(i => i.completed).length;

  const careerGrowthScore = Math.min(
    99,
    Math.round(
      (stats.readinessScore * 0.35) + 
      (stats.matchScore * 0.25) + 
      (qualificationRate * 0.2) + 
      (profile.skills.length * 2.5)
    )
  );

  const monthlyActivity = [
    { month: 'April 2026', applied: 3, interviewed: 1, xp: 450 },
    { month: 'May 2026', applied: 5, interviewed: 2, xp: 820 },
    { month: 'June 2026', applied: 8, interviewed: 3, xp: 1200 },
    { month: 'July 2026', applied: 12, interviewed: 5, xp: 1650 },
    { month: 'August 2026', applied: 14, interviewed: 6, xp: 2100 },
    { month: 'Sept 2026 (Current)', applied: appliedCount + 4, interviewed: 4, xp: profile.xp }
  ];

  const handleExportReport = () => {
    window.print();
    showToast('Student Opportunity Report ready for print / PDF export!');
  };

  return (
    <div className="w-full space-y-6 pb-16 bg-white">
      {/* 1. Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-ivory-50 border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-plum-50 text-plum-900 border border-plum-200">
              Student Intelligence & Progress
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Generated for {profile.name} • {selectedCollege.shortName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-['Outfit',sans-serif]">
            Performance & Opportunity Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Comprehensive audit of opportunity pipeline velocity, qualification conversion, and domain readiness trajectory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExportReport}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Career PDF</span>
          </motion.button>
        </div>
      </div>

      {/* 2. Top Metric KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Explored</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">{totalExplored} Opportunities</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 12 verified categories</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Applications Submitted</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 font-['Outfit',sans-serif]">{appliedCount} Active</div>
          <div className="text-[11px] text-emerald-700 mt-1 font-semibold">{qualificationRate}% qualification velocity</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Hackathon Engagements</span>
            <div className="w-8 h-8 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gold-600 font-['Outfit',sans-serif]">{hackathonsApplied} Tracked</div>
          <div className="text-[11px] text-slate-500 mt-1">{selectedCollege.featuredHackathon || `${selectedCollege.shortName} Campus Hackathon`} + SIH 2026</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Career Growth Score</span>
            <div className="w-8 h-8 rounded-xl bg-plum-50 text-plum-900 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-plum-900 font-['Outfit',sans-serif]">{careerGrowthScore} / 100</div>
          <div className="text-[11px] text-plum-700 mt-1 font-semibold">Top 6% in College cohort</div>
        </motion.div>
      </div>

      {/* 3. Deep Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Trend Over Months */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Unlockable Opportunity Growth
              </h3>
              <p className="text-xs text-slate-500">
                Number of opportunities unlocked as skills and projects were added
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
              +350% Growth
            </span>
          </div>

          <div className="py-2">
            <OpportunityGrowthChart />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Milestone: System Design Basics unlocked 15 opportunities</span>
            <span className="font-bold text-slate-800">Current Velocity: High</span>
          </div>
        </div>

        {/* Opportunity Category Distribution */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Opportunity Category Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Live distribution of verified campus and national tracks
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-plum-50 text-plum-900 border border-plum-200">
              12 Active Sectors
            </span>
          </div>

          <div className="py-2">
            <OpportunityDistributionChart opportunities={opportunities} />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Most Active Domain: Full Stack & AI Systems</span>
            <span className="font-bold text-slate-800">Campus Exclusive: 38%</span>
          </div>
        </div>
      </div>

      {/* 4. Second Row of Visual Insights: Status Funnel + Skills Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Pipeline Status */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Application Funnel & Status Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Conversion through Saved → Applied → Interviewing → Selected
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              Healthy Pipeline
            </span>
          </div>

          <ApplicationStatusChart opportunities={opportunities} />
        </div>

        {/* Skills Radar / Benchmark */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Skill Readiness Competency Radar
              </h3>
              <p className="text-xs text-slate-500">
                Candidate profile skills vs. market requirements for Tier-1 Opportunities
              </p>
            </div>
            <span className="text-xs font-bold text-plum-900 bg-plum-50 px-2 py-0.5 rounded-lg border border-plum-200">
              88% Average Fit
            </span>
          </div>

          <SkillsRadarChart />
        </div>
      </div>

      {/* 5. Monthly Activity Breakdown Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              Monthly Activity Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Audit trail of application velocity, technical interviews, and platform XP gains
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Last updated today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-bold">
              <tr>
                <th className="px-5 py-3">Timeframe</th>
                <th className="px-5 py-3">Applications Submitted</th>
                <th className="px-5 py-3">Shortlists & Interviews</th>
                <th className="px-5 py-3">Platform XP Earned</th>
                <th className="px-5 py-3">Status Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {monthlyActivity.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{row.month}</td>
                  <td className="px-5 py-3.5">{row.applied} Opportunities</td>
                  <td className="px-5 py-3.5 text-emerald-600 font-bold">{row.interviewed} Calls</td>
                  <td className="px-5 py-3.5 font-mono text-plum-900 font-bold">+{row.xp} XP</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                      {idx === monthlyActivity.length - 1 ? 'Surging' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
