import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, HackathonStage, Opportunity } from '../types';
import {
  Clock,
  Plus,
  Trophy,
  Kanban,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Send,
  Building2,
  ChevronRight,
  ExternalLink,
  Trash2,
  Sparkles,
  History,
  Activity,
  Check,
  X,
  Filter
} from 'lucide-react';

const HACKATHON_STAGES: HackathonStage[] = [
  'Registered',
  'Team Formed',
  'Idea Submitted',
  'PPT Submitted',
  'Prototype Ready',
  'Finalist',
  'Winner'
];

interface ActivityLogItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  status: string;
  icon: string;
}

export const TrackerView: React.FC = () => {
  const { 
    opportunities, 
    updateOpportunityStatus, 
    updateHackathonStage,
    openIntelligence, 
    setActiveTab,
    showToast,
    selectedCollege,
    applications,
    currentUser
  } = useApp();

  // Active view tab: applications, hackathons, or activity
  const [activeBoard, setActiveBoard] = useState<'applications' | 'hackathons' | 'activity'>('applications');

  // Filter within applications
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Hackathon' | 'Internship' | 'Scholarship'>('All');

  // "+ Track New Opportunity" Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOppToAdd, setSelectedOppToAdd] = useState(opportunities[0]?.id || '');
  const [targetStatusToAdd, setTargetStatusToAdd] = useState<ApplicationStatus>('Applied');

  // Custom activity log state
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([
    {
      id: 'log-1',
      title: 'Innobuzz National Hackathon 2026',
      category: 'Hackathon',
      timestamp: 'Today, 2:45 PM',
      status: 'Team Formed & Registered',
      icon: 'Trophy'
    },
    {
      id: 'log-2',
      title: 'Microsoft Graduate SWE Internship',
      category: 'Internship',
      timestamp: 'Yesterday, 6:10 PM',
      status: 'Shortlisted for Technical Interview',
      icon: 'Send'
    },
    {
      id: 'log-3',
      title: 'Google Summer of Code 2026',
      category: 'Open Source',
      timestamp: '2 days ago',
      status: 'Draft Proposal Saved',
      icon: 'CheckCircle2'
    },
    {
      id: 'log-4',
      title: 'Reliance Foundation Undergraduate Scholarship',
      category: 'Scholarship',
      timestamp: 'Aug 28, 2026',
      status: 'Documents Uploaded',
      icon: 'Check'
    }
  ]);

  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogCategory, setNewLogCategory] = useState('Hackathon');

  const columns: { id: ApplicationStatus; title: string; badgeClass: string; nextStatus?: ApplicationStatus }[] = [
    { id: 'Saved', title: 'Saved', badgeClass: 'bg-slate-100 text-slate-700', nextStatus: 'Preparing' },
    { id: 'Preparing', title: 'Preparing', badgeClass: 'bg-amber-100 text-amber-800', nextStatus: 'Applied' },
    { id: 'Applied', title: 'Applied', badgeClass: 'bg-emerald-100 text-emerald-800', nextStatus: 'Interview' },
    { id: 'Shortlisted', title: 'Shortlisted', badgeClass: 'bg-orange-100 text-orange-800', nextStatus: 'Interview' },
    { id: 'Interview', title: 'Interview / Review', badgeClass: 'bg-rose-100 text-rose-800', nextStatus: 'Selected' },
    { id: 'Selected', title: 'Accepted / Won 🎉', badgeClass: 'bg-emerald-100 text-emerald-800' },
    { id: 'Rejected', title: 'Archived', badgeClass: 'bg-slate-100 text-slate-500' },
  ];

  const allStatuses: ApplicationStatus[] = [
    'Saved',
    'Preparing',
    'Applied',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const myReviewedApplications = applications.filter(a => a.studentUserId === currentUser?.id && a.collegeCode === selectedCollege.code);

  // Opportunities in the tracker (exclude Interested unless forced)
  const trackedOpportunities = opportunities.filter(o => o.status !== 'Interested');

  // Filtered by category
  const displayedOpportunities = trackedOpportunities.filter(opp => {
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Hackathon') return opp.type === 'Hackathon' || opp.category.includes('Hackathon');
    if (categoryFilter === 'Internship') return opp.type === 'Internship';
    if (categoryFilter === 'Scholarship') return opp.type === 'Scholarship';
    return true;
  });

  const hackathons = opportunities.filter(
    o => o.type === 'Hackathon' || o.category.includes('Hackathon')
  );

  // Quick Advance Stage handler
  const handleAdvanceStage = (opp: Opportunity, nextStatus: ApplicationStatus) => {
    updateOpportunityStatus(opp.id, nextStatus);
    showToast(`Advanced "${opp.title}" to ${nextStatus}!`);

    // Add activity log
    const newLog: ActivityLogItem = {
      id: 'log-' + Date.now(),
      title: opp.title,
      category: opp.category,
      timestamp: 'Just now',
      status: `Moved to ${nextStatus}`,
      icon: 'Send'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Add Opportunity to Tracker handler
  const handleAddOpportunityToTracker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOppToAdd) return;

    updateOpportunityStatus(selectedOppToAdd, targetStatusToAdd);
    const opp = opportunities.find(o => o.id === selectedOppToAdd);
    const title = opp ? opp.title : 'Opportunity';

    showToast(`Added "${title}" to ${targetStatusToAdd} board!`);
    setIsAddModalOpen(false);

    // Add activity log
    const newLog: ActivityLogItem = {
      id: 'log-' + Date.now(),
      title,
      category: opp?.category || 'General',
      timestamp: 'Just now',
      status: `Tracked in ${targetStatusToAdd}`,
      icon: 'Plus'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Add custom student log
  const handleAddCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    const newLog: ActivityLogItem = {
      id: 'log-' + Date.now(),
      title: newLogTitle.trim(),
      category: newLogCategory,
      timestamp: 'Just now',
      status: 'Custom Activity Logged',
      icon: 'CheckCircle2'
    };

    setActivityLogs(prev => [newLog, ...prev]);
    setNewLogTitle('');
    showToast('Activity logged successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="tracker-page w-full space-y-6 pb-20 bg-[#f8f1ea]"
    >
      {/* 1. HEADER & NAVIGATION TABS */}
      <div className="tracker-hero p-6 rounded-3xl bg-[#6b4f3e] text-[#fffaf4] border border-[#80614e] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              My Activity & Status Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              Live Tracker
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Manage your applications, hackathon milestones, and complete activity history in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Main Tabs */}
          <div className="p-1 rounded-2xl bg-white/10 flex items-center gap-1 border border-white/10">
            <button
              onClick={() => setActiveBoard('applications')}
              className={`tracker-board-tab px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'applications'
                  ? 'tracker-board-tab-active bg-white text-slate-950 shadow-xs'
                  : 'tracker-board-tab-idle text-slate-300 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Status Board ({trackedOpportunities.length})</span>
            </button>

            <button
              onClick={() => setActiveBoard('hackathons')}
              className={`tracker-board-tab px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'hackathons'
                  ? 'tracker-board-tab-active bg-white text-slate-950 shadow-xs'
                  : 'tracker-board-tab-idle text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Hackathon Milestones ({hackathons.length})</span>
            </button>

            <button
              onClick={() => setActiveBoard('activity')}
              className={`tracker-board-tab px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'activity'
                  ? 'tracker-board-tab-active bg-white text-slate-950 shadow-xs'
                  : 'tracker-board-tab-idle text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>My Activity Log ({activityLogs.length})</span>
            </button>
          </div>

          <div className="px-4 py-2.5 rounded-xl border border-[#d5c5b8] bg-[#f1e6dc] text-[#604536] text-xs font-extrabold flex items-center gap-2">
            <Building2 className="w-4 h-4"/> Status is reviewed by your college
          </div>
        </div>
      </div>

      {/* 2. BOARD 1: ORGANIZATION-REVIEWED APPLICATION STATUS */}
      {activeBoard === 'applications' && (
        <div className="space-y-4">
          <div className="rounded-[24px] border border-[#d8c9bb] bg-[#fbf7f2] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div><div className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#795640]">College-reviewed application journey</div><h3 className="mt-1 text-xl font-extrabold text-[#251c17]">You submit. Your organization reviews.</h3><p className="mt-1 text-[13px] font-semibold text-[#74665c]">Students cannot mark themselves Shortlisted, Selected or Rejected. Decisions update here when your college changes the review status.</p></div>
            <div className="rounded-xl bg-[#463126] px-3 py-2 text-[12px] font-extrabold text-white">{myReviewedApplications.length} submitted</div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {myReviewedApplications.map(app => {
              const opp = opportunities.find(o => o.id === app.opportunityId);
              const statusTone = app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : app.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border-rose-200' : app.status === 'Shortlisted' ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-[#efe4da] text-[#634837] border-[#d8c5b4]';
              return <motion.div key={app.id} whileHover={{y:-4}} className="rounded-[24px] border border-[#ddd0c4] bg-white p-5 shadow-[0_12px_34px_rgba(61,44,34,.08)]">
                <div className="flex items-start justify-between gap-3"><div><div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#8a715f]">{opp?.type || 'Application'}</div><h4 className="mt-1 text-[16px] font-extrabold leading-5 text-[#241c17]">{app.opportunityTitle}</h4></div><span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${statusTone}`}>{app.status}</span></div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]"><div className="rounded-xl bg-[#f8f3ee] p-3"><div className="font-bold text-[#8a7a6f]">Applied</div><div className="mt-1 font-extrabold text-[#342821]">{new Date(app.appliedAt).toLocaleDateString()}</div></div><div className="rounded-xl bg-[#f8f3ee] p-3"><div className="font-bold text-[#8a7a6f]">Participation</div><div className="mt-1 font-extrabold text-[#342821]">{app.participationType}</div></div></div>
                {app.attachmentName && <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#e0d4ca] bg-[#fcf8f4] px-3 py-2 text-[12px] font-bold text-[#604b3e]"><ExternalLink className="w-3.5 h-3.5"/>{app.attachmentName}</div>}
                <div className="mt-4 flex items-center justify-between border-t border-[#eee5dd] pt-3"><span className="text-[11px] font-bold text-[#8a7a6f]">Status controlled by {selectedCollege.shortName}</span>{opp && <button onClick={()=>openIntelligence(opp.id)} className="text-[12px] font-extrabold text-[#634837] hover:underline">View opportunity</button>}</div>
              </motion.div>
            })}
            {!myReviewedApplications.length && <div className="md:col-span-2 xl:col-span-3 rounded-[24px] border border-dashed border-[#d8c9bb] bg-[#fbf7f2] p-10 text-center"><div className="text-base font-extrabold text-[#342821]">No submitted applications yet</div><p className="mt-1 text-[13px] font-semibold text-[#786a60]">Apply from an opportunity card. Your organization will review the submission and control its status.</p></div>}
          </div>
        </div>
      )}

      {/* 3. BOARD 2: HACKATHON MILESTONE STAGE TRACKER */}
      {activeBoard === 'hackathons' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
                  Hackathon Milestone & Stage Tracking
                </h3>
                <p className="text-xs text-slate-500">
                  Click any stage to update your team&apos;s progress in real time.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                {hackathons.length} Active Hackathons
              </span>
            </div>

            <div className="space-y-4">
              {hackathons.map((hack) => {
                const currentStage = hack.hackathonStage || 'Registered';
                const currentStageIdx = HACKATHON_STAGES.indexOf(currentStage);

                return (
                  <motion.div
                    key={hack.id}
                    whileHover={{ y: -1 }}
                    className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">
                            {hack.category}
                          </span>
                          {hack.collegeName && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Campus Exclusive
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-slate-500">
                            Deadline: {hack.deadline} ({hack.daysLeft}d left)
                          </span>
                        </div>
                        <h4 className="text-base font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                          {hack.title}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {hack.organization} • <span className="font-bold text-amber-600 font-mono">{hack.stipendOrPrize}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600">Current Milestone:</span>
                        <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-black text-xs shadow-xs font-mono">
                          {currentStage}
                        </span>
                      </div>
                    </div>

                    {/* Step-by-step interactive milestone pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {HACKATHON_STAGES.map((stage, idx) => {
                        const isPassed = idx <= currentStageIdx;
                        const isCurrent = idx === currentStageIdx;

                        return (
                          <button
                            key={stage}
                            onClick={() => {
                              updateHackathonStage(hack.id, stage);
                              showToast(`Updated "${hack.title}" to ${stage}!`);
                              const newLog: ActivityLogItem = {
                                id: 'log-' + Date.now(),
                                title: hack.title,
                                category: 'Hackathon',
                                timestamp: 'Just now',
                                status: `Reached: ${stage}`,
                                icon: 'Trophy'
                              };
                              setActivityLogs(prev => [newLog, ...prev]);
                            }}
                            className={`p-2.5 rounded-2xl text-center border text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs scale-102'
                                : isPassed
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className="text-[10px] font-mono text-slate-400 mb-0.5">Stage {idx + 1}</div>
                            <div className="truncate">{stage}</div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. BOARD 3: MY ACTIVITY & AUDIT LOG */}
      {activeBoard === 'activity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Timeline (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
                    My Activity Log & Progress Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chronological history of applications, status updates, and milestone achievements.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {activityLogs.length} Events Logged
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {activityLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-slate-100/70 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-slate-900 truncate font-['Outfit',sans-serif]">
                          {log.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                          {log.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {log.status}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white text-slate-700 border border-slate-200">
                          {log.category}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Recorded to Student Activity</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Log Form (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                  Log Custom Student Action
                </h3>
                <p className="text-xs text-slate-500">
                  Record interviews, submitted codes, or mentor meetings.
                </p>
              </div>

              <form onSubmit={handleAddCustomLog} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Activity Title / Event
                  </label>
                  <input
                    type="text"
                    value={newLogTitle}
                    onChange={e => setNewLogTitle(e.target.value)}
                    placeholder="e.g. Completed Round 1 Technical Interview"
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newLogCategory}
                    onChange={e => setNewLogCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  >
                    <option>Hackathon</option>
                    <option>Internship</option>
                    <option>Scholarship</option>
                    <option>Placement Drive</option>
                    <option>Open Source</option>
                    <option>Skill Certification</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition-all flex items-center justify-center gap-2 font-['Outfit',sans-serif]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Activity Log</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL: "+ TRACK OPPORTUNITY" */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
                    Track an Opportunity in Your Pipeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select any opportunity to track its application milestones.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddOpportunityToTracker} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Opportunity
                  </label>
                  <select
                    value={selectedOppToAdd}
                    onChange={e => setSelectedOppToAdd(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-white"
                  >
                    {opportunities.map(opp => (
                      <option key={opp.id} value={opp.id}>
                        {opp.title} ({opp.category} • {opp.organization})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Initial Stage
                  </label>
                  <select
                    value={targetStatusToAdd}
                    onChange={e => setTargetStatusToAdd(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-white"
                  >
                    {allStatuses.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition-all shadow-xs"
                  >
                    Add to Tracker
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
