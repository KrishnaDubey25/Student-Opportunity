import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityApplication, OpportunityCategory, OpportunityType, UserAccount } from '../types';
import {
  Users, Plus, Send, BriefcaseBusiness, ClipboardCheck, Search, Trash2, Eye,
  TrendingUp, MessageSquare, Sparkles, Activity, Target, AlertTriangle, GraduationCap,
  CalendarDays, Trophy, Code2, Award, X, ArrowUpRight, Filter, BarChart3, UserRoundCheck,
  Clock3, Building2, ShieldCheck
} from 'lucide-react';

const profileProgress = (u: UserAccount) => Math.min(100,
  (u.profile.skills.length * 8) +
  (u.profile.projects.length * 12) +
  (u.profile.certifications.length * 6) +
  (u.profile.experience.length * 8) +
  (u.profile.careerGoal ? 10 : 0)
);

export const OrganizationView: React.FC = () => {
  const {
    registeredUsers, selectedCollege, applications, opportunities,
    publishCampusOpportunity, removeCampusOpportunity, sendCampusMessage,
    updateApplicationReviewStatus
  } = useApp();

  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [showPublisher, setShowPublisher] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>();
  const [profileStudent, setProfileStudent] = useState<UserAccount | null>(null);
  const [applicationDetail, setApplicationDetail] = useState<OpportunityApplication | null>(null);
  const [msgTitle, setMsgTitle] = useState('Campus Update');
  const [msgBody, setMsgBody] = useState('');
  const [form, setForm] = useState({
    title: '', type: 'Internship' as OpportunityType, category: 'Internships' as OpportunityCategory,
    domain: 'Technology', deadline: '2026-10-15', benefit: 'Certificate + Mentorship',
    description: '', skills: 'React, JavaScript', mode: 'Hybrid' as Opportunity['mode']
  });

  const allCampusStudents = useMemo(() => registeredUsers.filter(u =>
    (u.accountType || 'student') === 'student' &&
    (u.collegeCode || u.profile?.collegeCode) === selectedCollege.code
  ), [registeredUsers, selectedCollege.code]);

  const years = useMemo(() => Array.from(new Set(allCampusStudents.map(u => u.profile.year).filter(Boolean))), [allCampusStudents]);

  const students = useMemo(() => allCampusStudents.filter(u => {
    const q = `${u.name} ${u.studentId || ''} ${u.profile?.degree || ''} ${u.profile?.year || ''}`.toLowerCase();
    return q.includes(search.toLowerCase()) && (yearFilter === 'All' || u.profile.year === yearFilter);
  }), [allCampusStudents, search, yearFilter]);

  const campusOpps = opportunities.filter(o => o.collegeCode === selectedCollege.code);
  const campusApps = applications.filter(a => a.collegeCode === selectedCollege.code);
  const avgProgress = allCampusStudents.length ? Math.round(allCampusStudents.reduce((a, u) => a + profileProgress(u), 0) / allCampusStudents.length) : 0;
  const activeApplicants = new Set(campusApps.map(a => a.studentUserId)).size;
  const shortlisted = campusApps.filter(a => ['Shortlisted', 'Selected'].includes(a.status)).length;
  const shortlistRate = campusApps.length ? Math.round((shortlisted / campusApps.length) * 100) : 0;
  const atRiskStudents = allCampusStudents.filter(u => profileProgress(u) < 45).length;

  const recentActivity = useMemo(() => [
    ...campusApps.map(a => ({ id: `a-${a.id}`, title: `${a.studentName} applied`, detail: a.opportunityTitle, at: a.appliedAt, type: 'Application' })),
    ...campusOpps.map(o => ({ id: `o-${o.id}`, title: `Opportunity live: ${o.title}`, detail: `${o.type} • deadline ${o.deadline}`, at: o.appliedDate || new Date().toISOString(), type: 'Opportunity' }))
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 5), [campusApps, campusOpps]);

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    const now = new Date();
    const dl = new Date(form.deadline);
    const days = Math.max(0, Math.ceil((dl.getTime() - now.getTime()) / 86400000));
    publishCampusOpportunity({
      id: 'campus_' + Date.now(), title: form.title, organization: selectedCollege.name,
      logo: selectedCollege.logoText, type: form.type, category: form.category,
      collegeCode: selectedCollege.code, collegeName: selectedCollege.name,
      domain: form.domain, location: selectedCollege.city, mode: form.mode, deadline: form.deadline,
      daysLeft: days, duration: 'Flexible', stipendOrPrize: form.benefit, applicantsCount: 0,
      interestedCount: 0, appliedCount: 0, difficulty: 'Intermediate',
      eligibility: 'Students of ' + selectedCollege.shortName, registrationStatus: 'Open',
      requiredSkills: skills, description: form.description || 'Official campus opportunity published by the organization.',
      matchScore: 88, eligibilityScore: 96, readinessScore: 78, careerImpact: 90, priority: 'High',
      whyMatch: ['Published by your college', 'Aligned with your student profile'], missingSkills: [],
      recommendedActions: ['Review requirements', 'Apply before deadline'], status: 'Interested'
    });
    setShowPublisher(false);
    setForm({ ...form, title: '', description: '' });
  };

  const selectedProfileApps = profileStudent ? campusApps.filter(a => a.studentUserId === profileStudent.id) : [];

  return <div className="space-y-7 pb-20">
    <section className="relative overflow-hidden rounded-[34px] bg-[#0d1018] text-white p-7 sm:p-9 border border-violet-400/20 shadow-2xl">
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute left-1/3 -bottom-28 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[.24em] font-black text-violet-300">Organization Command Center</div>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight font-['Outfit',sans-serif]">{selectedCollege.shortName} Campus Intelligence</h1>
          <p className="mt-3 text-base text-slate-300 max-w-3xl leading-relaxed">Track every student journey, manage opportunities, review applications and understand what is happening across your campus in one live workspace.</p>
          <div className="mt-4 flex flex-wrap gap-2">{(selectedCollege.campusFocus || []).map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-black text-emerald-200">{item}</span>)}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowPublisher(true)} className="px-5 py-3.5 rounded-2xl bg-violet-400 text-slate-950 text-sm font-black flex items-center gap-2 hover:-translate-y-0.5 transition"><Plus className="w-4 h-4" />Add Opportunity</button>
          <button onClick={() => setShowMessage(true)} className="px-5 py-3.5 rounded-2xl bg-emerald-400 text-slate-950 text-sm font-black flex items-center gap-2 hover:-translate-y-0.5 transition"><Send className="w-4 h-4" />Broadcast Update</button>
        </div>
      </div>
    </section>

    <section className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {[
        ['Students', allCampusStudents.length, Users, 'Registered campus users'],
        ['Live Opportunities', campusOpps.length, BriefcaseBusiness, selectedCollege.placementSignal || 'Campus pipeline'],
        ['Applications', campusApps.length, ClipboardCheck, `${activeApplicants} active students`],
        ['Shortlist Rate', `${shortlistRate}%`, UserRoundCheck, 'Shortlisted + selected'],
        ['Profile Health', `${avgProgress}%`, TrendingUp, `${atRiskStudents} need profile attention`]
      ].map(([label, val, Icon, note]: any) => <motion.div whileHover={{ y: -4 }} key={label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between"><Icon className="w-5 h-5 text-violet-700" /><ArrowUpRight className="w-4 h-4 text-slate-300" /></div>
        <div className="mt-4 text-3xl font-black text-slate-950">{val}</div>
        <div className="mt-1 text-sm font-black text-slate-700">{label}</div>
        <div className="mt-1 text-[11px] font-semibold text-slate-400">{note}</div>
      </motion.div>)}
    </section>

    <section className="grid xl:grid-cols-[1.35fr_.65fr] gap-5">
      <div className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          <div><div className="text-[11px] font-black uppercase tracking-[.18em] text-violet-700">Student Population</div><h2 className="mt-1 font-black text-slate-950 text-2xl">Student Directory & Progress</h2><p className="text-sm text-slate-500 mt-1">Open a student to inspect profile, skills, projects, certifications and application journey.</p></div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative"><Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student, roll, class..." className="pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs w-full sm:w-64 outline-none focus:border-violet-400" /></div>
            <div className="relative"><Filter className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" /><select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"><option>All</option>{years.map(y => <option key={y}>{y}</option>)}</select></div>
          </div>
        </div>
        <div className="divide-y divide-slate-100">{students.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No registered students found for this college yet.</div> : students.map(u => {
          const appCount = campusApps.filter(a => a.studentUserId === u.id).length;
          const progress = profileProgress(u);
          return <div key={u.id} className="p-5 grid lg:grid-cols-[1.3fr_.75fr_1fr_.75fr_auto] gap-4 items-center hover:bg-violet-50/35 transition-colors">
            <div className="flex items-center gap-3"><img src={u.profile.avatar} className="w-12 h-12 rounded-2xl border border-slate-200" /><div><div className="text-base font-black text-slate-900">{u.name}</div><div className="text-[11px] text-slate-500 font-mono">{u.studentId || u.profile.studentId}</div><div className="mt-1 text-[10px] font-bold text-violet-700">{u.profile.careerGoal || 'Career goal pending'}</div></div></div>
            <div><div className="text-[10px] uppercase text-slate-400 font-bold">Class</div><div className="text-sm font-black">{u.profile.year}</div><div className="text-[10px] text-slate-500">{u.profile.degree}</div></div>
            <div><div className="text-[10px] uppercase text-slate-400 font-bold">Top skills</div><div className="text-xs font-black">{u.profile.skills.slice(0, 3).map(s => s.name).join(', ') || 'Profile pending'}</div><div className="mt-1 text-[10px] text-slate-500">{u.profile.projects.length} projects • {u.profile.certifications.length} certificates</div></div>
            <div><div className="flex justify-between text-[10px] font-bold"><span>Profile</span><span>{progress}%</span></div><div className="mt-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-emerald-500" style={{ width: `${progress}%` }} /></div><div className="mt-1 text-[10px] text-slate-500">{appCount} applications</div></div>
            <div className="flex gap-2"><button onClick={() => setProfileStudent(u)} className="px-3 py-2 rounded-xl bg-slate-950 text-white text-xs font-black flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />View</button><button onClick={() => { setSelectedStudentId(u.id); setMsgTitle(`Message for ${u.name}`); setShowMessage(true); }} className="p-2 rounded-xl border border-slate-200 hover:bg-emerald-50"><MessageSquare className="w-4 h-4" /></button></div>
          </div>;
        })}</div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 to-violet-950 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between"><div className="text-[11px] font-black uppercase tracking-[.18em] text-violet-300">Campus Pulse</div><Activity className="w-5 h-5 text-emerald-300" /></div>
          <h2 className="mt-2 text-2xl font-black">Live operating signals</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-3"><div className="flex justify-between text-xs"><span>Active applicant coverage</span><b>{allCampusStudents.length ? Math.round(activeApplicants / allCampusStudents.length * 100) : 0}%</b></div></div>
            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-3"><div className="flex justify-between text-xs"><span>Profiles needing attention</span><b>{atRiskStudents}</b></div></div>
            <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-3"><div className="flex justify-between text-xs"><span>Opportunity supply</span><b>{campusOpps.length >= 5 ? 'Healthy' : 'Needs more'}</b></div></div>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between"><h2 className="font-black text-xl">Recent Live Activity</h2><Clock3 className="w-5 h-5 text-violet-700" /></div>
          <div className="mt-4 space-y-3">{recentActivity.length ? recentActivity.map(item => <div key={item.id} className="rounded-2xl bg-slate-50 p-3 border border-slate-100"><div className="text-sm font-black">{item.title}</div><div className="mt-1 text-xs text-slate-500">{item.detail}</div><div className="mt-2 text-[10px] font-bold text-slate-400">{new Date(item.at).toLocaleString()}</div></div>) : <p className="text-sm text-slate-500">Activity will appear when students apply or the organization publishes opportunities.</p>}</div>
        </div>
      </div>
    </section>

    <section className="grid xl:grid-cols-2 gap-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><div className="text-[11px] uppercase tracking-[.16em] font-black text-emerald-700">Opportunity Control</div><h2 className="mt-1 font-black text-2xl">Published Opportunities</h2></div><Sparkles className="w-5 h-5 text-emerald-600" /></div><div className="mt-5 space-y-3">{campusOpps.length === 0 ? <p className="text-sm text-slate-500">Publish an internship, hackathon, workshop or event to make it appear on student dashboards.</p> : campusOpps.slice(0, 8).map(o => <div key={o.id} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between gap-3"><div><div className="text-sm font-black">{o.title}</div><div className="text-[11px] text-slate-500 mt-1">{o.type} • {o.deadline} • {campusApps.filter(a => a.opportunityId === o.id).length} applications</div></div><button onClick={() => removeCampusOpportunity(o.id)} className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></button></div>)}</div></div>
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><div className="text-[11px] uppercase tracking-[.16em] font-black text-violet-700">Applicant Pipeline</div><h2 className="mt-1 font-black text-2xl">Latest Applications</h2></div><ClipboardCheck className="w-5 h-5 text-violet-700" /></div><div className="mt-5 space-y-3">{campusApps.length === 0 ? <p className="text-sm text-slate-500">Student applications will appear here automatically.</p> : campusApps.slice().sort((a,b)=>new Date(b.appliedAt).getTime()-new Date(a.appliedAt).getTime()).slice(0, 8).map(a => <div key={a.id} className="rounded-2xl bg-slate-50 border border-slate-100 p-4"><div className="flex justify-between gap-3"><div><div className="text-sm font-black">{a.studentName} • {a.studentRoll}</div><div className="text-[11px] text-slate-500 mt-1">{a.opportunityTitle} • {a.participationType}{a.teamName ? ` • ${a.teamName}` : ''}</div><div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-slate-400"><CalendarDays className="w-3 h-3" />{new Date(a.appliedAt).toLocaleString()}</div></div><select value={a.status} onChange={e => updateApplicationReviewStatus(a.id, e.target.value as any)} className="h-9 text-[10px] font-bold border border-slate-200 rounded-lg bg-white px-2"><option>Applied</option><option>Under Review</option><option>Shortlisted</option><option>Selected</option><option>Rejected</option></select></div><button onClick={() => setApplicationDetail(a)} className="mt-3 text-xs font-black text-violet-700 flex items-center gap-1">View complete application <ArrowUpRight className="w-3 h-3" /></button></div>)}</div></div>
    </section>

    <AnimatePresence>{profileStudent && <div className="fixed inset-0 z-[95] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur p-6"><div><div className="text-[11px] font-black uppercase tracking-[.18em] text-violet-700">Student 360° Profile</div><h3 className="text-2xl font-black">{profileStudent.name}</h3></div><button onClick={() => setProfileStudent(null)} className="p-2 rounded-xl border"><X className="w-4 h-4" /></button></div><div className="p-6 space-y-6"><div className="grid md:grid-cols-[auto_1fr] gap-5"><img src={profileStudent.profile.avatar} className="w-24 h-24 rounded-[26px] border"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{[['Roll No.', profileStudent.studentId || profileStudent.profile.studentId], ['Class', profileStudent.profile.year], ['Degree', profileStudent.profile.degree], ['GPA', profileStudent.profile.gpa || 'Not added']].map(([k,v])=><div key={k} className="rounded-2xl bg-slate-50 p-3"><div className="text-[10px] uppercase font-black text-slate-400">{k}</div><div className="mt-1 text-sm font-black">{v}</div></div>)}</div></div><div><h4 className="font-black text-lg">Career Goal</h4><p className="mt-2 rounded-2xl bg-violet-50 p-4 text-sm font-semibold text-violet-950">{profileStudent.profile.careerGoal || 'Not added yet'}</p></div><div className="grid md:grid-cols-2 gap-5"><div><h4 className="font-black text-lg flex items-center gap-2"><Code2 className="w-4 h-4"/>Skills</h4><div className="mt-3 flex flex-wrap gap-2">{profileStudent.profile.skills.map(s=><span key={s.name} className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-black">{s.name} • {s.level}</span>)}</div></div><div><h4 className="font-black text-lg flex items-center gap-2"><Trophy className="w-4 h-4"/>Projects</h4><div className="mt-3 space-y-2">{profileStudent.profile.projects.length ? profileStudent.profile.projects.map(p=><div key={p.title} className="rounded-2xl border p-3"><div className="text-sm font-black">{p.title}</div><div className="text-[11px] text-slate-500 mt-1">{p.tech.join(', ')}</div></div>) : <div className="text-sm text-slate-500">No projects added.</div>}</div></div></div><div className="grid md:grid-cols-2 gap-5"><div><h4 className="font-black text-lg flex items-center gap-2"><Award className="w-4 h-4"/>Certifications</h4><div className="mt-3 text-sm text-slate-600">{profileStudent.profile.certifications.join(', ') || 'No certifications added.'}</div></div><div><h4 className="font-black text-lg flex items-center gap-2"><Target className="w-4 h-4"/>Application Journey</h4><div className="mt-3 space-y-2">{selectedProfileApps.length ? selectedProfileApps.map(a=><div key={a.id} className="rounded-2xl bg-slate-50 p-3"><div className="text-sm font-black">{a.opportunityTitle}</div><div className="mt-1 text-[11px] text-slate-500">{a.status} • {a.participationType} • {new Date(a.appliedAt).toLocaleDateString()}</div></div>) : <div className="text-sm text-slate-500">No applications yet.</div>}</div></div></div></div></motion.div></div>}</AnimatePresence>

    <AnimatePresence>{applicationDetail && <div className="fixed inset-0 z-[96] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"><motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} className="w-full max-w-2xl rounded-[30px] bg-white p-6 shadow-2xl"><div className="flex justify-between"><div><div className="text-[11px] font-black uppercase tracking-[.16em] text-violet-700">Complete Application</div><h3 className="mt-1 text-2xl font-black">{applicationDetail.opportunityTitle}</h3></div><button onClick={() => setApplicationDetail(null)} className="p-2 rounded-xl border"><X className="w-4 h-4"/></button></div><div className="mt-5 grid sm:grid-cols-2 gap-3">{[['Student', applicationDetail.studentName], ['Roll Number', applicationDetail.studentRoll], ['Participation', applicationDetail.participationType], ['Applied On', new Date(applicationDetail.appliedAt).toLocaleString()], ['Status', applicationDetail.status], ['Team Name', applicationDetail.teamName || 'Individual']].map(([k,v])=><div key={k} className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] uppercase font-black text-slate-400">{k}</div><div className="mt-1 text-sm font-black">{v}</div></div>)}</div>{applicationDetail.teamMembers?.length ? <div className="mt-4 rounded-2xl border p-4"><div className="text-xs font-black uppercase text-slate-400">Team Members</div><div className="mt-2 flex flex-wrap gap-2">{applicationDetail.teamMembers.map((m,i)=><span key={`${m}-${i}`} className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-800">{m}</span>)}</div></div> : null}</motion.div></div>}</AnimatePresence>

    {showPublisher && <div className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><form onSubmit={publish} className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"><h3 className="text-2xl font-black">Publish Campus Opportunity</h3><p className="text-sm text-slate-500 mt-1">This will be available in the student opportunity feed for {selectedCollege.shortName}.</p><div className="mt-5 grid sm:grid-cols-2 gap-3"><input required placeholder="Opportunity title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="sm:col-span-2 field" /><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className="field"><option>Internship</option><option>Hackathon</option><option>Workshop</option><option>Event</option><option>Competition</option><option>Placement</option></select><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })} className="field"><option>Internships</option><option>College Hackathons</option><option>Workshops</option><option>Technical Events</option><option>Competitions</option><option>Placement Opportunities</option></select><input placeholder="Domain" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} className="field" /><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className="field" /><input placeholder="Prize / stipend / benefit" value={form.benefit} onChange={e => setForm({ ...form, benefit: e.target.value })} className="field" /><input placeholder="Skills, comma separated" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} className="field" /><textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="field sm:col-span-2 min-h-24" /></div><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setShowPublisher(false)} className="px-4 py-2.5 rounded-xl border text-xs font-black">Cancel</button><button className="px-4 py-2.5 rounded-xl bg-violet-700 text-white text-xs font-black">Publish Now</button></div></form></div>}

    {showMessage && <div className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl"><h3 className="text-2xl font-black">Send Campus Message</h3><input value={msgTitle} onChange={e => setMsgTitle(e.target.value)} className="field mt-5" placeholder="Title" /><textarea value={msgBody} onChange={e => setMsgBody(e.target.value)} className="field mt-3 min-h-28" placeholder="Write notification/message..." /><div className="mt-5 flex justify-end gap-2"><button onClick={() => { setShowMessage(false); setSelectedStudentId(undefined); }} className="px-4 py-2.5 rounded-xl border text-xs font-black">Cancel</button><button onClick={() => { if (msgBody.trim()) { sendCampusMessage(msgTitle, msgBody, selectedStudentId); setMsgBody(''); setShowMessage(false); setSelectedStudentId(undefined); } }} className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black">Send Message</button></div></div></div>}
  </div>;
};
