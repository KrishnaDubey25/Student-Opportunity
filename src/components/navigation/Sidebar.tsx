import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp, NavTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Star,
  Sparkles,
  GitPullRequest,
  Milestone,
  Kanban,
  Clock,
  RotateCcw,
  TrendingUp,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  LogOut,
  LogIn,
  Building2,
  BarChart3,
  Target
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    stats, 
    resetWorkspaceData,
    currentUser,
    logout,
    openAuthModal,
    profile,
    selectedCollege
  } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navSections: {
    title: string;
    items: { id: NavTab; label: string; icon: React.ElementType; badge?: string | number }[];
  }[] = [
    {
      title: 'Campus & Core',
      items: [
        { id: 'college', label: 'Campus Center', icon: Building2, badge: selectedCollege.shortName },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'discover', label: 'Discover Engine', icon: Compass, badge: stats.totalOpportunities },
        { id: 'readiness', label: 'Job Readiness', icon: ShieldCheck, badge: `${stats.readinessScore}%` },
      ]
    },
    {
      title: 'Action & Execution',
      items: [
        { id: 'target-jobs', label: 'Target Jobs', icon: Target },
        { id: 'simulator', label: 'Skill Simulator', icon: Sparkles },
        { id: 'tracker', label: 'My Applications', icon: Kanban, badge: stats.activeApplications },
        { id: 'roadmap', label: 'Preparation Roadmap', icon: Milestone },
        { id: 'deadlines', label: 'Deadlines Radar', icon: Clock },
      ]
    },
    {
      title: 'Analytics & Growth',
      items: [
        { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'profile', label: 'Student Profile', icon: User },
        { id: 'recovery', label: 'Opportunity Recovery', icon: RotateCcw },
        { id: 'career', label: 'Career Trajectory', icon: TrendingUp },
      ]
    }
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-slate-100 bg-white transition-all duration-300 flex-shrink-0 z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header with Collapse Toggle */}
      <div className="h-14 px-4 border-b border-slate-100 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-['Outfit',sans-serif]">
              Opportunity Engine
            </span>
          </div>
        ) : <div className="mx-auto"><span className="w-2 h-2 rounded-full bg-slate-900 block" /></div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links Grouped */}
      <div className="flex-1 py-3 px-3 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-['Outfit',sans-serif]">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: collapsed ? 0 : 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {!collapsed && (
                    <span className="truncate text-left flex-1 font-['Outfit',sans-serif]">
                      {item.label}
                    </span>
                  )}
                  {!collapsed && item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Account & Footer Action */}
      {!collapsed ? (
        <div className="p-3 border-t border-slate-100 space-y-2.5">
          {/* User Account Card */}
          {currentUser ? (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 flex-shrink-0"
                />
                <div className="overflow-hidden text-left">
                  <p className="text-xs font-bold text-slate-900 truncate font-['Outfit',sans-serif]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {currentUser.studentIdOrEmail}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openAuthModal('login')}
              className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-black transition-colors font-['Outfit',sans-serif]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </motion.button>
          )}

          {/* Next Best Action Promo */}
          <div className="p-2.5 rounded-xl bg-ivory-100 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-900 text-xs font-extrabold font-['Outfit',sans-serif]">
              <Zap className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Next Best Action</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
              Master React to unlock +13 active internships.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('simulator')}
              className="mt-2 w-full py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-black transition-colors shadow-xs"
            >
              Simulate Skills →
            </motion.button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset this account workspace progress? Your profile and account will remain.')) {
                resetWorkspaceData();
              }
            }}
            className="w-full text-[10px] font-semibold text-slate-400 hover:text-slate-600 py-0.5 transition-colors flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Workspace Progress
          </button>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-100 flex flex-col items-center gap-2">
          {currentUser ? (
            <button
              onClick={logout}
              title="Logout"
              className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              title="Sign In"
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('simulator')}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-2xs"
            title="Next Best Action Simulator"
          >
            <Zap className="w-4 h-4 text-gold-600" />
          </motion.button>
        </div>
      )}
    </aside>
  );
};
