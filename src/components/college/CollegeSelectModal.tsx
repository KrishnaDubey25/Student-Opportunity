import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, Building2, MapPin, Check, X, Sparkles, ArrowRight } from 'lucide-react';

export const CollegeSelectModal: React.FC = () => {
  const { 
    isCollegeModalOpen, 
    setIsCollegeModalOpen, 
    collegesList, 
    selectedCollege, 
    setSelectedCollege,
    selectCollegeByCodeOrName
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [customCode, setCustomCode] = useState('');

  if (!isCollegeModalOpen) return null;

  const filteredColleges = collegesList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCode.trim()) {
      selectCollegeByCodeOrName(customCode.trim());
      setCustomCode('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-200">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                  Select Your College Opportunity Center
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Connect your verified campus network to access exclusive on-campus hackathons, placements, and departmental grants.
              </p>
            </div>
            <button
              onClick={() => setIsCollegeModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search college name, code (e.g. SLRTCE, IITB, VJTI) or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* College List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-2">
            {filteredColleges.map((college) => {
              const isSelected = selectedCollege.id === college.id;
              return (
                <motion.div
                  key={college.id}
                  whileHover={{ y: -1 }}
                  onClick={() => {
                    setSelectedCollege(college);
                    setIsCollegeModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected 
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-500/20 shadow-xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 font-mono">
                      {college.logoText}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {college.name}
                        </h4>
                        {college.isPopular && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold-50 text-gold-600 border border-gold-200">
                            Verified Hub
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-mono text-slate-600 font-bold">{college.code}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {college.city}, {college.state}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">
                          {college.partnerOpportunitiesCount} active tracks
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-2xs">
                        <Check className="w-3.5 h-3.5" />
                        Active Center
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900">
                        Select
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {filteredColleges.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold">No campus match found for "{searchQuery}"</p>
                <p className="text-xs text-slate-400 mt-1">
                  You can enter your custom College Code or Name below to instantiate your college center!
                </p>
              </div>
            )}
          </div>

          {/* Custom College Code or ID entry */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or enter custom College Code / ID (e.g. SLRTCE-2026, IITD-EXT)"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Connect Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
