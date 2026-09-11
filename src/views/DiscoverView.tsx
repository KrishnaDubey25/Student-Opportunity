import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { OpportunityCategory, Opportunity } from '../types';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import {
  Search,
  ArrowUpDown,
  Compass,
  Bookmark,
  Clock,
  MapPin,
  Users,
  X,
  Sparkles,
  ArrowUpRight,
  Filter,
  Building2
} from 'lucide-react';

const CATEGORIES_LIST: (OpportunityCategory | 'All')[] = [
  'All',
  'College Hackathons',
  'Inter-College Hackathons',
  'Scholarships',
  'Internships',
  'Competitions',
  'Workshops',
  'Technical Events',
  'Cultural Events',
  'Research Programs',
  'Placement Opportunities',
  'Jobs',
  'Open Source Programs'
];

export const DiscoverView: React.FC = () => {
  const { 
    opportunities, 
    setActiveTab,
    selectedCollege,
    activeCategoryFilter,
    setActiveCategoryFilter
  } = useApp();

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState<OpportunityCategory | 'All'>(activeCategoryFilter);

  const setSelectedCategory = (cat: OpportunityCategory | 'All') => {
    setSelectedCategoryState(cat);
    setActiveCategoryFilter(cat);
  };

  // Sync with global category changes
  React.useEffect(() => {
    setSelectedCategoryState(activeCategoryFilter);
  }, [activeCategoryFilter]);
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'impact' | 'deadline' | 'applicants' | 'readiness'>('match');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);

  // Extract unique skills across all opportunities
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    opportunities.forEach(o => o.requiredSkills.forEach(s => skillSet.add(s)));
    return Array.from(skillSet).sort();
  }, [opportunities]);

  // Filtered & Sorted opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter(opp => !opp.isMissed)
      .filter(opp => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchOrg = opp.organization.toLowerCase().includes(q);
          const matchSkill = opp.requiredSkills.some(s => s.toLowerCase().includes(q));
          const matchDomain = opp.domain.toLowerCase().includes(q);
          const matchCategory = opp.category.toLowerCase().includes(q);
          if (!matchTitle && !matchOrg && !matchSkill && !matchDomain && !matchCategory) return false;
        }

        if (selectedCategory !== 'All') {
          if (selectedCategory.includes('Hackathon')) {
            if (!opp.category.includes('Hackathon') && opp.type !== 'Hackathon') return false;
          } else if (selectedCategory.includes('Internship')) {
            if (!opp.category.includes('Internship') && opp.type !== 'Internship') return false;
          } else if (selectedCategory.includes('Scholarship')) {
            if (!opp.category.includes('Scholarship') && opp.type !== 'Scholarship') return false;
          } else if (selectedCategory.includes('Competition')) {
            if (!opp.category.includes('Competition') && opp.type !== 'Competition') return false;
          } else if (opp.category !== selectedCategory) {
            return false;
          }
        }
        if (selectedMode !== 'All' && opp.mode !== selectedMode) return false;
        if (selectedDifficulty !== 'All' && opp.difficulty !== selectedDifficulty) return false;
        if (selectedSkill !== 'All' && !opp.requiredSkills.includes(selectedSkill)) return false;
        if (opp.matchScore < minMatchScore) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.matchScore - a.matchScore;
        if (sortBy === 'impact') return b.careerImpact - a.careerImpact;
        if (sortBy === 'deadline') return a.daysLeft - b.daysLeft;
        if (sortBy === 'applicants') return b.applicantsCount - a.applicantsCount;
        if (sortBy === 'readiness') return b.readinessScore - a.readinessScore;
        return 0;
      });
  }, [opportunities, searchQuery, selectedCategory, selectedMode, selectedDifficulty, selectedSkill, sortBy, minMatchScore]);

  return (
    <div className="w-full space-y-6 pb-24 bg-white">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-ivory-50 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Opportunity Discovery Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-900 border border-slate-200 font-mono">
              {filteredOpportunities.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Search and filter verified opportunities across 12 categories, with instant match intelligence and campus filters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('college')}
            className="px-4 py-2.5 rounded-xl bg-plum-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs font-['Outfit',sans-serif]"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{selectedCollege.shortName} Center</span>
          </motion.button>
        </div>
      </motion.div>

      {/* SEARCH AND FILTER BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5"
      >
        {/* Top search & sorting row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company (Microsoft, SLRTCE...), or skill (React, Python...)"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 w-full">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-slate-900 cursor-pointer"
              >
                <option value="match">Sort by: Best Match %</option>
                <option value="impact">Sort by: Career Impact</option>
                <option value="deadline">Sort by: Deadline (Urgent First)</option>
                <option value="readiness">Sort by: Readiness Score</option>
                <option value="applicants">Sort by: Applicants Count</option>
              </select>
            </div>
          </div>
        </div>

        {/* 12 Categories Pill Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter chips row (Mode, Difficulty, Skill) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 text-[11px]">Filters:</span>

          {/* Mode */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-xs focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="All">All Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="In-Person Campus">In-Person Campus</option>
          </select>

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-xs focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Competitive">Competitive</option>
          </select>

          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-xs focus:outline-none focus:border-slate-900 cursor-pointer max-w-[150px]"
          >
            <option value="All">All Skills</option>
            {allSkills.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {(searchQuery || selectedCategory !== 'All' || selectedMode !== 'All' || selectedDifficulty !== 'All' || selectedSkill !== 'All' || minMatchScore > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedMode('All');
                setSelectedDifficulty('All');
                setSelectedSkill('All');
                setMinMatchScore(0);
              }}
              className="text-[11px] font-bold text-coral-600 hover:text-coral-700 underline ml-auto"
            >
              Clear all filters
            </button>
          )}
        </div>
      </motion.div>

      {/* OPPORTUNITY CARDS GRID */}
      {filteredOpportunities.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
          <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800 font-['Outfit',sans-serif]">
            No opportunities found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMode('All');
              setSelectedDifficulty('All');
              setSelectedSkill('All');
              setMinMatchScore(0);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs font-['Outfit',sans-serif]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
