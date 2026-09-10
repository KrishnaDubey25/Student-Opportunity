import React from 'react';
import { motion } from 'motion/react';
import { useApp, NavTab } from '../../context/AppContext';
import {
  Compass,
  Star,
  Milestone,
  Send,
  Kanban,
  TrendingUp,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const FlowBar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const steps: {
    id: NavTab;
    number: string;
    label: string;
    desc: string;
    icon: React.ElementType;
  }[] = [
    { id: 'discover', number: '01', label: 'Discover', desc: 'Find Opps', icon: Compass },
    { id: 'intelligence', number: '02', label: 'Analyze', desc: 'Deep Match', icon: Star },
    { id: 'roadmap', number: '03', label: 'Prepare', desc: '14-Day Plan', icon: Milestone },
    { id: 'discover', number: '04', label: 'Apply', desc: 'Action Link', icon: Send },
    { id: 'tracker', number: '05', label: 'Track', desc: 'Kanban Board', icon: Kanban },
    { id: 'readiness', number: '06', label: 'Improve', desc: 'Job Ready', icon: TrendingUp }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3 sm:p-4 mb-5">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-['Outfit',sans-serif]">
            Student Career Journey Flow
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-400 hidden sm:inline font-mono">
          Discover → Analyze → Prepare → Apply → Track → Improve
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive =
            activeTab === step.id ||
            (step.label === 'Analyze' && activeTab === 'intelligence') ||
            (step.label === 'Prepare' && (activeTab === 'roadmap' || activeTab === 'gap' || activeTab === 'simulator')) ||
            (step.label === 'Track' && (activeTab === 'tracker' || activeTab === 'deadlines')) ||
            (step.label === 'Improve' && (activeTab === 'readiness' || activeTab === 'career'));

          return (
            <motion.button
              key={index}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(step.id)}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[10px] font-black font-mono ${
                    isActive ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {step.number}
                </span>
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </div>

              <div className="mt-2">
                <div
                  className={`text-xs font-extrabold font-['Outfit',sans-serif] ${
                    isActive ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {step.label}
                </div>
                <div className={`text-[10px] truncate hidden sm:block font-medium ${
                  isActive ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  {step.desc}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
