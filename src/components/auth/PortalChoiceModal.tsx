import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, GraduationCap, LogIn, UserPlus, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PortalChoiceModal: React.FC = () => {
  const { isPortalChoiceOpen, setIsPortalChoiceOpen, openPortalAuth } = useApp();
  if (!isPortalChoiceOpen) return null;

  const enter = (mode: 'student'|'organization', tab: 'login'|'register') => {
    openPortalAuth(mode, tab);
  };

  return <AnimatePresence><motion.div className="fixed inset-0 z-[80] bg-slate-950/65 backdrop-blur-md flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.div initial={{opacity:0,y:28,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.97}} className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/15 bg-[#100f18] text-white shadow-2xl">
      <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 bg-gradient-to-r from-violet-950/80 via-slate-950 to-emerald-950/60">
        <div><p className="text-[11px] font-black tracking-[.22em] uppercase text-emerald-300">Choose your workspace</p><h2 className="mt-2 text-2xl sm:text-3xl font-black font-['Outfit',sans-serif]">Student Opportunity Engine</h2><p className="mt-2 max-w-2xl text-sm text-slate-300">Choose the correct portal. Student and Organization accounts are completely separate.</p></div>
        <button onClick={()=>setIsPortalChoiceOpen(false)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><X className="w-5 h-5"/></button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 p-5 sm:p-7">
        <div className="rounded-[26px] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-white/[.03] p-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center"><GraduationCap/></div>
          <h3 className="mt-4 text-xl font-black">Student Workspace</h3><p className="mt-2 text-sm text-slate-300">Recommendations, skills, roadmap, campus opportunities, applications and progress tracking.</p>
          <div className="mt-6 grid grid-cols-2 gap-2"><button onClick={()=>enter('student','login')} className="rounded-xl bg-white text-slate-950 px-3 py-3 text-xs font-black flex items-center justify-center gap-2"><LogIn className="w-4 h-4"/>Sign In</button><button onClick={()=>enter('student','register')} className="rounded-xl bg-emerald-400 text-slate-950 px-3 py-3 text-xs font-black flex items-center justify-center gap-2"><UserPlus className="w-4 h-4"/>Create Account</button></div>
        </div>
        <div className="rounded-[26px] border border-violet-400/20 bg-gradient-to-br from-violet-400/10 to-white/[.03] p-5">
          <div className="w-12 h-12 rounded-2xl bg-violet-400 text-slate-950 flex items-center justify-center"><Building2/></div>
          <h3 className="mt-4 text-xl font-black">Organization Workspace</h3><p className="mt-2 text-sm text-slate-300">View college students, progress, publish opportunities, review applicants and send announcements.</p>
          <div className="mt-6 grid grid-cols-2 gap-2"><button onClick={()=>enter('organization','login')} className="rounded-xl bg-white text-slate-950 px-3 py-3 text-xs font-black flex items-center justify-center gap-2"><LogIn className="w-4 h-4"/>Sign In</button><button onClick={()=>enter('organization','register')} className="rounded-xl bg-violet-400 text-slate-950 px-3 py-3 text-xs font-black flex items-center justify-center gap-2"><UserPlus className="w-4 h-4"/>Create Account</button></div>
        </div>
      </div>
      <div className="px-7 pb-6 text-xs text-slate-400 flex items-center gap-2">Student credentials work only in the Student portal, and Organization credentials work only in the Organization portal. <ArrowRight className="w-3.5 h-3.5"/></div>
    </motion.div>
  </motion.div></AnimatePresence>;
};
