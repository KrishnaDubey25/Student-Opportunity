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
    selectedCollege 
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
      className="w-full space-y-6 pb-20 bg-white"
    >
      {/* 1. HEADER & NAVIGATION TABS */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'applications'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Status Board ({trackedOpportunities.length})</span>
            </button>

            <button
              onClick={() => setActiveBoard('hackathons')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'hackathons'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Hackathon Milestones ({hackathons.length})</span>
            </button>

            <button
              onClick={() => setActiveBoard('activity')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-['Outfit',sans-serif] ${
                activeBoard === 'activity'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>My Activity Log ({activityLogs.length})</span>
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors flex items-center gap-1.5 shadow-xs font-['Outfit',sans-serif]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Track Opportunity</span>
          </motion.button>
        </div>
      </div>

      {/* 2. BOARD 1: APPLICATION STATUS KANBAN BOARD */}
      {activeBoard === 'applications' && (
        <div className="space-y-4">
          
          {/* Fast Category Filter Chips */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1 font-mono">
                <Filter className="w-3 h-3 text-slate-400" />
                <span>Filter by Category:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {(['All', 'Hackathon', 'Internship', 'Scholarship'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                      categoryFilter === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Showing {displayedOpportunities.length} of {trackedOpportunities.length} active tracked items
            </span>
          </div>

          {/* Kanban Columns */}
          <div className="flex gap-4 overflow-x-auto pb-6 pt-1 scrollbar-thin">
            {columns.map((col) => {
              const colOpps = displayedOpportunities.filter(o => o.status === col.id);

              return (
                <div
                  key={col.id}
                  className="w-72 sm:w-80 flex-shrink-0 flex flex-col rounded-3xl bg-slate-50 border border-slate-200 p-4 max-h-[780px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 font-['Outfit',sans-serif]">
                        {col.title}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${col.badgeClass}`}>
                        {colOpps.length}
                      </span>
                    </div>
                  </div>

                  {/* Column Cards Container */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {colOpps.length === 0 ? (
                      <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                        No entries in this stage
                      </div>
                    ) : (
                      colOpps.map((opp) => (
                        <motion.div
                          key={opp.id}
                          whileHover={{ y: -2 }}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-2.5 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                              {opp.category}
                            </span>
                            <span className="text-[10px] font-mono font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {opp.matchScore}% Match
                            </span>
                          </div>

                          <div>
                            <h4 
                              onClick={() => openIntelligence(opp.id)}
                              className="text-xs font-black text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 font-['Outfit',sans-serif]"
                            >
                              {opp.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {opp.organization}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{opp.deadline}</span>
                            </span>
                            <span className="font-bold text-amber-600 truncate max-w-[110px] font-mono">
                              {opp.stipendOrPrize}
                            </span>
                          </div>

                          {/* Quick Advance Button & Dropdown */}
                          <div className="pt-2 border-t border-slate-100 space-y-2">
                            {col.nextStatus && (
                              <button
                                onClick={() => handleAdvanceStage(opp, col.nextStatus!)}
                                className="w-full py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center gap-1 font-['Outfit',sans-serif]"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Advance to {col.nextStatus}</span>
                              </button>
                            )}

                            <div className="flex items-center justify-between gap-2">
                              <select
                                value={opp.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as ApplicationStatus;
                                  handleAdvanceStage(opp, newStatus);
                                }}
                                className="text-[11px] font-semibold py-1 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-slate-900 cursor-pointer flex-1"
                              >
                                {allStatuses.map(status => (
                                  <option key={status} value={status}>Move to: {status}</option>
                                ))}
                              </select>

                              <button
                                onClick={() => openIntelligence(opp.id)}
                                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                                title="Open Detail View"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  updateOpportunityStatus(opp.id, 'Interested');
                                  showToast(`Removed ${opp.title} from active tracker.`);
                                }}
                                className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Remove from Tracker"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
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
