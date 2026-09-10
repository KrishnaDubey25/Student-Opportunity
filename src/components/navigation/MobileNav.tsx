import React from 'react';
import { motion } from 'motion/react';
import { useApp, NavTab } from '../../context/AppContext';
import { Compass, LayoutDashboard, Kanban, User, Target } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useApp();

  if (!currentUser) return null;

  const tabs: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'discover', label: 'Explore', icon: Compass },
    { id: 'target-jobs', label: 'Target', icon: Target },
    { id: 'tracker', label: 'Track', icon: Kanban },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile workspace navigation"
      className="mobile-workspace-nav lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/96 backdrop-blur-xl px-2 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] shadow-[0_-12px_35px_rgba(39,34,31,.08)]"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative min-h-[52px] rounded-2xl px-1 py-1.5 flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'text-slate-950 font-black'
                  : 'text-slate-400 font-bold'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active-tab"
                  className="absolute inset-0 rounded-2xl bg-emerald-50 border border-emerald-200/80"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-xl ${
                isActive ? 'bg-emerald-700 text-white shadow-sm' : 'bg-transparent'
              }`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="relative z-10 mt-0.5 text-[10px] tracking-tight font-['Outfit',sans-serif]">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
