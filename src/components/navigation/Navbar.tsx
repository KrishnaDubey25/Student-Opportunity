import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Compass, 
  LayoutDashboard, 
  Sparkles, 
  Milestone, 
  Kanban, 
  TrendingUp, 
  Bell, 
  Moon, 
  Sun, 
  Award,
  Search,
  Check,
  GraduationCap,
  ShieldCheck,
  LogIn,
  LogOut,
  User,
  Building2,
  BarChart3,
  UserPlus,
  Target,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    profile, 
    notifications, 
    isNotificationOpen, 
    setIsNotificationOpen,
    markAllNotificationsRead,
    markNotificationRead,
    currentUser,
    openAuthModal,
    setIsPortalChoiceOpen,
    logout,
    selectedCollege,
    startOnboarding,
    workspaceMode
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const studentNavLinks: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'college', label: 'Campus', icon: Building2 },
    { id: 'discover', label: 'Opportunities', icon: Compass },
    { id: 'target-jobs', label: 'Target Jobs', icon: Target },
    { id: 'readiness', label: 'Readiness', icon: ShieldCheck },
    { id: 'tracker', label: 'Applications', icon: Kanban },
  ];
  const navLinks = workspaceMode === 'organization' ? [{ id: 'organization' as NavTab, label: 'Organization', icon: Building2 }] : studentNavLinks;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center text-white shadow-md shadow-slate-950/20 group-hover:shadow-slate-950/30 transition-shadow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 font-['Outfit',sans-serif] flex items-center gap-1.5">
              <span className="hidden min-[390px]:inline">Student Opportunity</span><span className="min-[390px]:hidden">SO</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-plum-50 text-plum-900 border border-plum-200">
                ENGINE
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Discover • Prepare • Apply • Track
            </p>
          </div>
        </motion.button>

        {/* Authenticated workspace navigation */}
        {currentUser && (
        <nav className="hidden md:flex items-center gap-0.5 relative bg-slate-50/90 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all z-10 ${
                  isActive 
                    ? 'text-slate-950 font-black' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span className="font-['Outfit',sans-serif]">{link.label}</span>
              </button>
            );
          })}
        </nav>
        )}

        {/* Right Action Icons & User Account */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Campus identity is account-bound after sign-in */}
          {currentUser && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-ivory-100 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-mono text-[11px] text-slate-800">{selectedCollege.code}</span>
            </div>
          )}

          {/* Notifications are private workspace content */}
          {currentUser && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 text-white rounded-full text-[10px] font-black flex items-center justify-center font-mono ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-coral-50 text-coral-600 border border-coral-200">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-900"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.targetTab) setActiveTab(n.targetTab as any);
                          setIsNotificationOpen(false);
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          n.read
                            ? 'bg-slate-50/60 border-slate-100 text-slate-600'
                            : 'bg-white border-slate-200 text-slate-900 font-medium shadow-2xs hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          )}


          {/* User Account / Auth CTA */}
          {currentUser ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-2xs"
              >
                <img
                  src={profile.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs font-bold text-slate-900 hidden lg:block font-['Outfit',sans-serif]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-2 space-y-1"
                  >
                    <div className="p-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono truncate">{currentUser.studentIdOrEmail}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {selectedCollege.shortName}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab(workspaceMode === 'organization' ? 'organization' : 'profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{workspaceMode === 'organization' ? 'Organization Account' : 'Student Profile'}</span>
                    </button>


                    {workspaceMode === 'student' && (
                      <button
                        onClick={() => {
                          startOnboarding();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Personalization Guide</span>
                      </button>
                    )}
                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsPortalChoiceOpen(true)}
                className="premium-shine h-9 sm:h-11 px-3 sm:px-5 rounded-xl bg-emerald-700 text-white text-xs font-black flex items-center gap-2 shadow-md shadow-emerald-900/15 hover:bg-emerald-800 transition-all font-['Outfit',sans-serif]"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Get Started</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
