import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Bookmark, 
  Share2, 
  Copy, 
  Send, 
  Sparkles, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Building2, 
  Trophy, 
  ShieldCheck, 
  Target,
  AlertTriangle,
  Kanban
} from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, featured = false }) => {
  const { 
    openIntelligence, 
    toggleSaveOpportunity, 
    applyToOpportunity, 
    submitOpportunityApplication,
    shareOpportunity, 
    copyOpportunityDigest,
    navigateToTab,
    profile,
    selectedCollege
  } = useApp();

  const [showApply, setShowApply] = useState(false);
  const [participation, setParticipation] = useState<'Individual'|'Team'>('Individual');
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState(['']);
  const isSaved = opportunity.status === 'Saved';
  const isApplied = opportunity.status === 'Applied' || opportunity.status === 'Submitted';
  const isClosingSoon = opportunity.daysLeft <= 4;
  const isHackathon = opportunity.type === 'Hackathon' || opportunity.category.includes('Hackathon');
  const isRecommended = opportunity.matchScore >= 80;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-coral-50 text-coral-600 border-coral-200';
      case 'High':
        return 'bg-plum-50 text-plum-900 border-plum-200';
      case 'Medium':
        return 'bg-gold-50 text-gold-600 border-gold-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <>
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`opportunity-card-pro relative rounded-[22px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        featured ? 'ring-2 ring-plum-700/30' : ''
      }`}
    >
      {/* Top Section: Category, Priority, Urgency */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-950 text-white text-[10px] font-black tracking-[0.16em] uppercase font-mono">
            {opportunity.type}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
            {opportunity.category}
          </span>
          {isRecommended && <span className="ml-auto px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black uppercase tracking-wide flex items-center gap-1"><Sparkles className="w-3 h-3"/>Recommended for you</span>}
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-ivory-100 text-slate-700 border border-slate-200">
              {opportunity.domain}
            </span>
            {opportunity.collegeName && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-plum-50 text-plum-900 border border-plum-200">
                Campus Exclusive
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getPriorityBadge(opportunity.priority)}`}>
              {opportunity.priority}
            </span>
            {isClosingSoon && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-coral-50 text-coral-600 border border-coral-200 animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Closing Soon
              </span>
            )}
          </div>
        </div>

        {/* Title & Organization — text-first to keep the card lightweight. */}
        <div className="mb-3 min-w-0 border-l-2 border-emerald-600 pl-3">
          <h3 
            onClick={() => openIntelligence(opportunity.id)}
            className="text-base font-bold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 font-['Outfit',sans-serif]"
          >
            {opportunity.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{opportunity.organization}</span>
            <span className="text-slate-300">•</span>
            <span>{opportunity.location}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Key Attributes Bento Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Benefit / Award</span>
            <span className="font-bold text-gold-600 truncate block text-[11px]">
              {opportunity.stipendOrPrize}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Deadline</span>
            <span className={`font-bold truncate block text-[11px] ${isClosingSoon ? 'text-coral-600' : 'text-slate-800'}`}>
              {opportunity.deadline} ({opportunity.daysLeft}d left)
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Applicants</span>
            <span className="font-bold text-slate-800 truncate block text-[11px]">
              {opportunity.applicantsCount} students
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Mode</span>
            <span className="font-bold text-slate-800 truncate block text-[11px]">
              {opportunity.mode}
            </span>
          </div>
        </div>

        {/* Eligibility Line */}
        <div className="text-[11px] text-slate-500 mb-3 bg-white p-2 rounded-lg border border-slate-100 flex items-center gap-1.5">
          <span className="font-bold text-slate-700">Eligibility:</span>
          <span className="truncate text-slate-600">{opportunity.eligibility}</span>
        </div>

        {/* Required Skills Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {opportunity.requiredSkills.slice(0, 4).map((skill, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
            >
              {skill}
            </span>
          ))}
          {opportunity.requiredSkills.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500">
              +{opportunity.requiredSkills.length - 4} more
            </span>
          )}
        </div>

        {/* Intelligence Scores Strip */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center mb-4">
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-500">Match Fit</div>
            <div className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">{opportunity.matchScore}%</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-500">Readiness</div>
            <div className="text-sm font-black text-emerald-600 font-['Outfit',sans-serif]">{opportunity.readinessScore}%</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-500">Career Impact</div>
            <div className="text-sm font-black text-plum-900 font-['Outfit',sans-serif]">{opportunity.careerImpact}%</div>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Left utility buttons: Save, Share, Copy, Track */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleSaveOpportunity(opportunity.id)}
            title={isSaved ? 'Remove from Saved' : 'Save Opportunity'}
            className={`p-2 rounded-lg border transition-colors ${
              isSaved 
                ? 'bg-plum-50 border-plum-200 text-plum-900' 
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-plum-900 text-plum-900' : ''}`} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => shareOpportunity(opportunity)}
            title="Share Opportunity"
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => copyOpportunityDigest(opportunity)}
            title="Copy Opportunity Summary"
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateToTab('tracker')}
            title="Track in Application Center"
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Kanban className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Right main CTAs: Details + Apply */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openIntelligence(opportunity.id)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
          >
            Details
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowApply(true)}
            disabled={isApplied}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
              isApplied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-slate-900 hover:bg-black text-white shadow-xs'
            }`}
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Applied</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Apply</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>

    <AnimatePresence>
      {showApply && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[95] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{opacity:0,y:20,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:.98}} className="w-full max-w-2xl rounded-[30px] bg-white p-6 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="text-[10px] uppercase tracking-[.18em] font-black text-emerald-700">Application Flow</div>
            <h3 className="mt-1 text-2xl font-black text-slate-950">Apply to {opportunity.title}</h3>
            <p className="mt-1 text-sm text-slate-500">Complete the application once. It will appear in My Applications and your college organization dashboard.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-black uppercase tracking-wide"><div className="rounded-xl bg-emerald-600 text-white p-2 text-center">1. Applicant</div><div className="rounded-xl bg-slate-100 text-slate-700 p-2 text-center">2. Participation</div><div className="rounded-xl bg-slate-100 text-slate-700 p-2 text-center">3. Submit</div></div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 border border-slate-100 p-3"><div className="text-[10px] uppercase font-black text-slate-400">Student</div><div className="mt-1 text-sm font-black">{profile.name}</div><div className="text-[10px] text-slate-500">{profile.studentId}</div></div><div className="rounded-2xl bg-slate-50 border border-slate-100 p-3"><div className="text-[10px] uppercase font-black text-slate-400">College</div><div className="mt-1 text-sm font-black">{selectedCollege.shortName}</div><div className="text-[10px] text-slate-500">{selectedCollege.code} • verified campus</div></div></div>
            {isHackathon && <div className="mt-5"><label className="text-sm font-black text-slate-800">Participation type</label><div className="mt-2 grid grid-cols-2 gap-2">{(['Individual','Team'] as const).map(v=><button type="button" key={v} onClick={()=>setParticipation(v)} className={`rounded-xl px-3 py-3 text-sm font-black border ${participation===v?'bg-slate-950 text-white border-slate-950':'bg-white text-slate-700 border-slate-200'}`}>{v}</button>)}</div></div>}
            {isHackathon && participation==='Team' && <div className="mt-4 space-y-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-4"><div><div className="text-sm font-black text-slate-900">Team registration form</div><div className="text-[11px] text-slate-500 mt-1">Add team name and each member's name / roll number. College will receive the same team record.</div></div><input className="field" placeholder="Team name *" value={teamName} onChange={e=>setTeamName(e.target.value)}/><div className="text-xs font-black text-slate-700">Team members</div>{members.map((m,i)=><input key={i} className="field" placeholder={`Member ${i+1} name / roll number`} value={m} onChange={e=>setMembers(prev=>prev.map((x,j)=>j===i?e.target.value:x))}/>)}<button type="button" onClick={()=>setMembers(prev=>[...prev,''])} className="text-xs font-black text-violet-700">+ Add another member</button></div>}
            <div className="mt-6 flex justify-end gap-2"><button onClick={()=>setShowApply(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-black">Cancel</button><button onClick={()=>{ if(isHackathon){ if(participation==='Team' && !teamName.trim()) return; submitOpportunityApplication(opportunity.id,participation,teamName,members); } else { submitOpportunityApplication(opportunity.id,'Individual'); } setShowApply(false); }} className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black">Submit Application</button></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
