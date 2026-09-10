import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { roadmapSteps, toggleRoadmapStep } = useApp();

  const completedCount = roadmapSteps.filter(s => s.completed).length;
  const totalCount = roadmapSteps.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (id: string) => {
    toggleRoadmapStep(id);
    const step = roadmapSteps.find(s => s.id === id);
    if (!step?.completed && completedCount + 1 === totalCount) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-4xl mx-auto bg-white"
    >
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
          <Milestone className="w-3.5 h-3.5 text-slate-900" />
          <span>Execution Roadmap</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              14-Day Preparation Sprint
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Structured daily curriculum to polish skills, projects, and interview readiness.
            </p>
          </div>

          {/* Dynamic Completion Pill */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 flex-shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-200"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-slate-900 transition-all duration-700"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-black text-slate-900 font-mono">
                {completionPercentage}%
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                Sprint Progress
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {completedCount} / {totalCount} completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative pl-6 sm:pl-10 space-y-4 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {roadmapSteps.map((step) => {
          const isDone = step.completed;

          return (
            <motion.div
              key={step.id}
              whileHover={{ y: -2 }}
              className={`relative p-4 sm:p-5 rounded-xl border transition-all ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200/90 bg-white shadow-2xs hover:border-slate-400'
              }`}
            >
              {/* Timeline marker node */}
              <button
                onClick={() => handleToggle(step.id)}
                className={`absolute -left-[29px] sm:-left-[37px] top-5 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-600 text-white ring-3 ring-emerald-100'
                    : 'bg-white border-2 border-slate-300 hover:border-slate-900 text-transparent'
                }`}
                title={isDone ? 'Mark incomplete' : 'Mark complete'}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200 flex-shrink-0 font-mono">
                    {step.dayRange}
                  </span>
                  <h3
                    onClick={() => handleToggle(step.id)}
                    className={`text-sm font-bold cursor-pointer transition-colors font-['Outfit',sans-serif] ${
                      isDone
                        ? 'line-through text-slate-400'
                        : 'text-slate-900 hover:text-black'
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{step.estimatedHours} hrs</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                    {step.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {step.description}
              </p>

              {/* Recommended resource links */}
              {step.resources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Resources:</span>
                  {step.resources.map((res, rIdx) => (
                    <span
                      key={rIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <span>{res.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
