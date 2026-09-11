import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, GraduationCap, LogIn, UserPlus, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PortalChoiceModal: React.FC = () => {
  const { isPortalChoiceOpen, setIsPortalChoiceOpen, openPortalAuth } = useApp();
  if (!isPortalChoiceOpen) return null;

  const enter = (mode: 'student'|'organization', tab: 'login'|'register') => openPortalAuth(mode, tab);

  const cards = [
    {
      mode: 'student' as const,
      icon: GraduationCap,
      title: 'Student Workspace',
      eyebrow: 'PERSONAL OPPORTUNITY OS',
      copy: 'Discover opportunities, build skills, apply, follow college-reviewed status, and grow your profile.',
      features: ['Recommendations & readiness', 'Campus opportunities', 'Application status & roadmap']
    },
    {
      mode: 'organization' as const,
      icon: Building2,
      title: 'Organization Workspace',
      eyebrow: 'CAMPUS CONTROL CENTER',
      copy: 'Manage your own college students, publish opportunities, review submissions, and update application decisions.',
      features: ['College-isolated student data', 'Applicant review & status control', 'Announcements & opportunity publishing']
    }
  ];

  return <AnimatePresence><motion.div className="fixed inset-0 z-[80] bg-[#201711]/60 backdrop-blur-lg flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.div initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16,scale:.98}} transition={{duration:.28,ease:[.22,1,.36,1]}} className="w-full max-w-4xl overflow-hidden rounded-[34px] border border-[#d8c9bb] bg-[#fbf7f1] text-[#261d18] shadow-[0_34px_100px_rgba(58,42,31,.22)]">
      <div className="p-6 sm:p-8 border-b border-[#e0d3c7] flex items-start justify-between gap-4 bg-[linear-gradient(135deg,#fffaf4_0%,#f1e6dc_60%,#e8d8cb_100%)]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ccb8a7] bg-white/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#684b39]"><ShieldCheck className="h-3.5 w-3.5"/>Secure role-based access</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-[-.045em] text-[#241b16]">Choose your workspace</h2>
          <p className="mt-2 max-w-2xl text-[14px] sm:text-[15px] font-semibold leading-6 text-[#695b51]">Student and Organization accounts are separate. Your selected college controls exactly which campus data you can access.</p>
        </div>
        <button onClick={()=>setIsPortalChoiceOpen(false)} className="p-2.5 rounded-xl border border-[#d8c9bb] bg-white text-[#594538] hover:bg-[#f2e8df] transition"><X className="w-5 h-5"/></button>
      </div>

      <div className="grid md:grid-cols-2 gap-5 p-5 sm:p-7">
        {cards.map(({mode,icon:Icon,title,eyebrow,copy,features}) => <motion.div key={mode} whileHover={{y:-5}} transition={{duration:.24}} className="group rounded-[28px] border border-[#d9ccbf] bg-white p-6 shadow-[0_15px_42px_rgba(62,45,35,.08)] hover:shadow-[0_24px_64px_rgba(62,45,35,.14)] hover:border-[#bca38f] transition-all">
          <div className="flex items-center justify-between gap-3">
            <div className="w-13 h-13 rounded-2xl bg-[#463126] text-[#fff7ef] flex items-center justify-center shadow-[0_10px_26px_rgba(70,49,38,.22)]"><Icon className="w-6 h-6"/></div>
            <span className="rounded-full bg-[#f1e5da] px-3 py-1.5 text-[10px] font-extrabold tracking-[.15em] text-[#745441]">{eyebrow}</span>
          </div>
          <h3 className="mt-5 text-2xl font-extrabold tracking-[-.035em] text-[#261d18]">{title}</h3>
          <p className="mt-2 text-[14px] font-semibold leading-6 text-[#6f6258]">{copy}</p>
          <div className="mt-5 space-y-2.5">{features.map(f=><div key={f} className="flex items-center gap-2 text-[13px] font-bold text-[#4f4036]"><span className="h-1.5 w-1.5 rounded-full bg-[#9b7356]"/>{f}</div>)}</div>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button onClick={()=>enter(mode,'login')} className="rounded-xl border border-[#cdbdaf] bg-[#fffaf5] px-3 py-3 text-[13px] font-extrabold text-[#44342a] hover:bg-[#f1e5da] transition flex items-center justify-center gap-2"><LogIn className="w-4 h-4"/>Sign In</button>
            <button onClick={()=>enter(mode,'register')} className="rounded-xl bg-[#463126] px-3 py-3 text-[13px] font-extrabold text-white hover:bg-[#5a4031] transition flex items-center justify-center gap-2 shadow-[0_9px_24px_rgba(70,49,38,.18)]"><UserPlus className="w-4 h-4"/>Create Account</button>
          </div>
        </motion.div>)}
      </div>
      <div className="px-7 pb-6 text-[12px] font-semibold text-[#796b61] flex items-center gap-2">College-specific access keeps TCET, SLRTCE, Atharva and every other campus workspace separated. <ArrowRight className="w-3.5 h-3.5"/></div>
    </motion.div>
  </motion.div></AnimatePresence>;
};
