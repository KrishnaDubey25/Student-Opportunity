import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityApplication, OpportunityCategory, OpportunityType, UserAccount } from '../types';
import { useCampusOperations } from '../hooks/useCampusOperations';
import {
  Users, Plus, Send, BriefcaseBusiness, ClipboardCheck, Search, Trash2, Eye,
  TrendingUp, Sparkles, Activity, Target, AlertTriangle, GraduationCap,
  CalendarDays, Trophy, X, ArrowUpRight, Filter, UserRoundCheck,
  Clock3, Building2, ShieldCheck, CheckSquare2, BookOpenCheck, Link2,
  UsersRound, Presentation, Radio, CircleDot, FileCheck2, BrainCircuit
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
  const campusOps = useCampusOperations(selectedCollege.code);

  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [showPublisher, setShowPublisher] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>();
  const [profileStudent, setProfileStudent] = useState<UserAccount | null>(null);
  const [applicationDetail, setApplicationDetail] = useState<OpportunityApplication | null>(null);
  const [msgTitle, setMsgTitle] = useState('Campus Update');
  const [msgBody, setMsgBody] = useState('');
  const [opsTab, setOpsTab] = useState<'tasks'|'resources'|'collab'>('tasks');
  const [taskForm, setTaskForm] = useState({ title:'', description:'', category:'PPT', dueDate:'2026-10-01', assignedTo:'' });
  const [resourceForm, setResourceForm] = useState({ title:'', subject:'', description:'', level:'All Students', label:'Study Link', url:'https://' });
  const [collabForm, setCollabForm] = useState({ partnerCollege:'', title:'', type:'Hackathon', status:'Open', date:'2026-10-10', seats:'50', description:'' });
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
  const completedTaskSignals = campusOps.tasks.reduce((n,t)=>n+Object.values(t.statusByStudent).filter(s=>s==='Completed').length,0);
  const selectedProfileApps = profileStudent ? campusApps.filter(a => a.studentUserId === profileStudent.id) : [];

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

  return <div className="organization-premium space-y-7 pb-20">
    <section className="org-premium-hero relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-emerald-50/70 to-amber-50/60 text-slate-950 p-7 sm:p-9 border border-emerald-100 shadow-sm">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute left-1/3 -bottom-28 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[.24em] font-black text-[#76533e]"><Radio className="w-3.5 h-3.5"/>Live Organization OS</div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight font-['Outfit',sans-serif]">{selectedCollege.shortName} Campus Command Center</h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">Run student opportunity operations, assignments, learning channels, applications and inter-college collaborations from one live workspace.</p>
          <div className="mt-5 flex flex-wrap gap-2">{(selectedCollege.campusFocus || []).map(item => <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-black text-[#76533e]">{item}</span>)}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowPublisher(true)} className="px-5 py-3.5 rounded-2xl bg-slate-950 text-white text-sm font-black flex items-center gap-2 hover:-translate-y-0.5 transition"><Plus className="w-4 h-4" />Add Opportunity</button>
          <button onClick={() => setShowMessage(true)} className="px-5 py-3.5 rounded-2xl bg-[#463126] text-white text-sm font-black flex items-center gap-2 hover:-translate-y-0.5 transition"><Send className="w-4 h-4" />Broadcast Update</button>
        </div>
      </div>
    </section>

    <section className="grid sm:grid-cols-2 xl:grid-cols-6 gap-4">
      {[
        ['Students', allCampusStudents.length, Users, 'Registered campus users'],
        ['Live Opportunities', campusOpps.length, BriefcaseBusiness, selectedCollege.placementSignal || 'Campus pipeline'],
        ['Applications', campusApps.length, ClipboardCheck, `${activeApplicants} active students`],
        ['Shortlist Rate', `${shortlistRate}%`, UserRoundCheck, 'Shortlisted + selected'],
        ['Profile Health', `${avgProgress}%`, TrendingUp, `${atRiskStudents} need attention`],
        ['Task Signals', completedTaskSignals, CheckSquare2, `${campusOps.tasks.length} active task boards`]
      ].map(([label, val, Icon, note]: any) => <motion.div whileHover={{ y: -4 }} key={label} className="premium-soft-card rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between"><Icon className="w-5 h-5 text-[#76533e]" /><ArrowUpRight className="w-4 h-4 text-slate-300" /></div>
        <div className="mt-3 text-2xl font-black text-slate-950">{val}</div><div className="mt-1 text-sm font-black text-slate-700">{label}</div><div className="mt-1 text-[11px] font-semibold text-slate-400">{note}</div>
      </motion.div>)}
    </section>

    <section className="rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div><div className="text-[11px] font-black uppercase tracking-[.18em] text-[#76533e]">Campus Execution Layer</div><h2 className="mt-1 text-3xl font-black text-slate-950 font-['Outfit',sans-serif]">Tasks, study channels & collaborations</h2><p className="mt-1 text-sm text-slate-500">Anything you publish here appears on the student side and stays synced across open tabs.</p></div>
        <div className="flex rounded-2xl bg-slate-100 p-1">{([['tasks','Tasks'],['resources','Study Channel'],['collab','Collaborations']] as const).map(([id,label])=><button key={id} onClick={()=>setOpsTab(id)} className={`px-4 py-2.5 rounded-xl text-xs font-black transition ${opsTab===id?'bg-slate-950 text-white shadow':'text-slate-600'}`}>{label}</button>)}</div>
      </div>

      {opsTab==='tasks' && <div className="grid xl:grid-cols-[.85fr_1.15fr] gap-0">
        <form onSubmit={e=>{e.preventDefault(); if(!taskForm.title.trim()) return; campusOps.addTask({title:taskForm.title,description:taskForm.description,category:taskForm.category as any,dueDate:taskForm.dueDate,assignedTo:taskForm.assignedTo || undefined,createdBy:selectedCollege.shortName}); setTaskForm({...taskForm,title:'',description:''});}} className="p-6 border-b xl:border-b-0 xl:border-r border-slate-100 bg-slate-50/60">
          <div className="text-sm font-black text-slate-950 flex items-center gap-2"><CheckSquare2 className="w-4 h-4 text-[#76533e]"/>Create a campus task</div>
          <div className="mt-4 grid gap-3"><input className="field" placeholder="Task title — e.g. Finalize PPT solution" value={taskForm.title} onChange={e=>setTaskForm({...taskForm,title:e.target.value})}/><textarea className="field min-h-24" placeholder="What exactly should be completed?" value={taskForm.description} onChange={e=>setTaskForm({...taskForm,description:e.target.value})}/><div className="grid sm:grid-cols-2 gap-3"><select className="field" value={taskForm.category} onChange={e=>setTaskForm({...taskForm,category:e.target.value})}><option>PPT</option><option>Review</option><option>Presentation</option><option>Research</option><option>Documentation</option><option>Duty</option><option>Other</option></select><input type="date" className="field" value={taskForm.dueDate} onChange={e=>setTaskForm({...taskForm,dueDate:e.target.value})}/></div><select className="field" value={taskForm.assignedTo} onChange={e=>setTaskForm({...taskForm,assignedTo:e.target.value})}><option value="">All campus students</option>{allCampusStudents.map(s=><option key={s.id} value={s.id}>{s.name} • {s.profile.year}</option>)}</select><button className="rounded-2xl bg-violet-700 text-white px-4 py-3 text-sm font-black">Publish Task Live</button></div>
        </form>
        <div className="p-6 space-y-3 max-h-[520px] overflow-y-auto">{campusOps.tasks.map(task=><div key={task.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-black text-slate-950">{task.title}</div><div className="mt-1 text-[11px] font-bold text-slate-500">{task.category} • Due {task.dueDate}</div></div><button onClick={()=>campusOps.removeTask(task.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button></div><p className="mt-2 text-xs text-slate-600">{task.description}</p><div className="mt-3 flex flex-wrap gap-2">{Object.entries(task.statusByStudent).map(([studentId,status])=>{const st=allCampusStudents.find(s=>s.id===studentId); return <span key={studentId} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-700">{st?.name || 'Student'}: {status}</span>})}{!Object.keys(task.statusByStudent).length && <span className="text-[11px] font-bold text-slate-400">No student activity yet</span>}</div></div>)}{!campusOps.tasks.length && <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-slate-500">No task published yet.</div>}</div>
      </div>}

      {opsTab==='resources' && <div className="grid xl:grid-cols-[.85fr_1.15fr]">
        <form onSubmit={e=>{e.preventDefault(); if(!resourceForm.title.trim()||!resourceForm.url.trim()) return; campusOps.addResource({title:resourceForm.title,subject:resourceForm.subject,description:resourceForm.description,level:resourceForm.level,links:[{label:resourceForm.label,url:resourceForm.url}]}); setResourceForm({...resourceForm,title:'',description:'',url:'https://'});}} className="p-6 border-b xl:border-b-0 xl:border-r border-slate-100 bg-emerald-50/40"><div className="text-sm font-black flex items-center gap-2"><BookOpenCheck className="w-4 h-4 text-[#76533e]"/>Publish a study resource channel</div><div className="mt-4 grid gap-3"><input className="field" placeholder="Channel title" value={resourceForm.title} onChange={e=>setResourceForm({...resourceForm,title:e.target.value})}/><input className="field" placeholder="Subject / topic" value={resourceForm.subject} onChange={e=>setResourceForm({...resourceForm,subject:e.target.value})}/><textarea className="field min-h-20" placeholder="What should students study?" value={resourceForm.description} onChange={e=>setResourceForm({...resourceForm,description:e.target.value})}/><div className="grid sm:grid-cols-2 gap-3"><input className="field" placeholder="Link label" value={resourceForm.label} onChange={e=>setResourceForm({...resourceForm,label:e.target.value})}/><input className="field" placeholder="https://..." value={resourceForm.url} onChange={e=>setResourceForm({...resourceForm,url:e.target.value})}/></div><button className="rounded-2xl bg-emerald-700 text-white px-4 py-3 text-sm font-black">Publish Resource Channel</button></div></form>
        <div className="p-6 space-y-3">{campusOps.resources.map(r=><div key={r.id} className="rounded-2xl border border-slate-200 p-4 flex items-start justify-between gap-3"><div><div className="text-sm font-black">{r.title}</div><div className="mt-1 text-[11px] font-bold text-[#76533e]">{r.subject} • {r.level}</div><p className="mt-2 text-xs text-slate-600">{r.description}</p><div className="mt-3 flex gap-2">{r.links.map(l=><a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-black text-[#76533e]"><Link2 className="w-3 h-3"/>{l.label}</a>)}</div></div><button onClick={()=>campusOps.removeResource(r.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button></div>)}{!campusOps.resources.length && <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-slate-500">No study channel published yet.</div>}</div>
      </div>}

      {opsTab==='collab' && <div className="grid xl:grid-cols-[.85fr_1.15fr]">
        <form onSubmit={e=>{e.preventDefault(); if(!collabForm.partnerCollege.trim()||!collabForm.title.trim()) return; campusOps.addCollaboration({partnerCollege:collabForm.partnerCollege,title:collabForm.title,type:collabForm.type as any,status:collabForm.status as any,date:collabForm.date,seats:Number(collabForm.seats)||undefined,description:collabForm.description}); setCollabForm({...collabForm,partnerCollege:'',title:'',description:''});}} className="p-6 border-b xl:border-b-0 xl:border-r border-slate-100 bg-amber-50/50"><div className="text-sm font-black flex items-center gap-2"><UsersRound className="w-4 h-4 text-amber-700"/>Open an inter-college collaboration</div><div className="mt-4 grid gap-3"><input className="field" placeholder="Partner college" value={collabForm.partnerCollege} onChange={e=>setCollabForm({...collabForm,partnerCollege:e.target.value})}/><input className="field" placeholder="Collaboration title" value={collabForm.title} onChange={e=>setCollabForm({...collabForm,title:e.target.value})}/><div className="grid sm:grid-cols-2 gap-3"><select className="field" value={collabForm.type} onChange={e=>setCollabForm({...collabForm,type:e.target.value})}><option>Hackathon</option><option>Workshop</option><option>Research</option><option>Placement</option><option>Club</option><option>Other</option></select><select className="field" value={collabForm.status} onChange={e=>setCollabForm({...collabForm,status:e.target.value})}><option>Planning</option><option>Open</option><option>Live</option><option>Completed</option></select></div><div className="grid sm:grid-cols-2 gap-3"><input type="date" className="field" value={collabForm.date} onChange={e=>setCollabForm({...collabForm,date:e.target.value})}/><input className="field" placeholder="Seats" value={collabForm.seats} onChange={e=>setCollabForm({...collabForm,seats:e.target.value})}/></div><textarea className="field min-h-20" placeholder="Purpose, eligibility, next steps" value={collabForm.description} onChange={e=>setCollabForm({...collabForm,description:e.target.value})}/><button className="rounded-2xl bg-amber-600 text-white px-4 py-3 text-sm font-black">Publish Collaboration</button></div></form>
        <div className="p-6 grid sm:grid-cols-2 gap-3">{campusOps.collaborations.map(c=><div key={c.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-black">{c.title}</div><div className="mt-1 text-[11px] font-bold text-slate-500">with {c.partnerCollege}</div></div><button onClick={()=>campusOps.removeCollaboration(c.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button></div><div className="mt-3 flex gap-2 flex-wrap"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black text-amber-800">{c.status}</span><span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-black text-violet-800">{c.type}</span></div><p className="mt-3 text-xs text-slate-600">{c.description}</p><div className="mt-3 text-[11px] font-bold text-slate-400">{c.date}{c.seats ? ` • ${c.seats} seats` : ''}</div></div>)}{!campusOps.collaborations.length && <div className="sm:col-span-2 rounded-2xl border border-dashed p-8 text-center text-sm text-slate-500">No collaboration published yet.</div>}</div>
      </div>}
    </section>

    <section className="grid xl:grid-cols-[1.25fr_.75fr] gap-5">
      <div className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 lg:items-center justify-between"><div><div className="text-[11px] font-black uppercase tracking-[.18em] text-[#76533e]">Student Population</div><h2 className="mt-1 font-black text-slate-950 text-2xl">Student Directory & Progress</h2><p className="text-sm text-slate-500 mt-1">Open a student to inspect profile, skills, projects, certifications and application journey.</p></div><div className="flex gap-2 flex-wrap"><div className="relative"><Search className="w-4 h-4 absolute left-3 top-3 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student, roll, class..." className="pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs w-full sm:w-64 outline-none focus:border-violet-400"/></div><div className="relative"><Filter className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400"/><select value={yearFilter} onChange={e=>setYearFilter(e.target.value)} className="pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"><option>All</option>{years.map(y=><option key={y}>{y}</option>)}</select></div></div></div>
        <div className="divide-y divide-slate-100">{students.map(u=>{const progress=profileProgress(u); const appCount=campusApps.filter(a=>a.studentUserId===u.id).length; return <div key={u.id} className="p-5 grid lg:grid-cols-[1.3fr_.75fr_1fr_.75fr_auto] gap-4 items-center hover:bg-[#f3e8de]/35 transition-colors"><div><div className="font-black text-slate-950">{u.name}</div><div className="text-xs text-slate-500 mt-1">{u.studentId || u.profile.studentId} • {u.profile.degree} • {u.profile.year}</div></div><div><div className="text-[10px] font-black uppercase text-slate-400">Profile</div><div className="mt-1 text-lg font-black">{progress}%</div></div><div><div className="text-[10px] font-black uppercase text-slate-400">Goal</div><div className="mt-1 text-xs font-bold text-slate-700 line-clamp-2">{u.profile.careerGoal || 'Not set'}</div></div><div><div className="text-[10px] font-black uppercase text-slate-400">Applications</div><div className="mt-1 text-lg font-black">{appCount}</div></div><button onClick={()=>setProfileStudent(u)} className="rounded-xl bg-slate-950 text-white px-3 py-2 text-[11px] font-black inline-flex items-center gap-1"><Eye className="w-3.5 h-3.5"/>View Profile</button></div>})}{!students.length && <div className="p-10 text-center text-sm text-slate-500">No matching students yet.</div>}</div>
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><div className="text-[11px] font-black uppercase tracking-[.18em] text-[#76533e]">Live Applications</div><h2 className="mt-1 text-2xl font-black">Who applied, when & where</h2></div><Activity className="w-5 h-5 text-[#76533e]"/></div><div className="mt-5 space-y-3 max-h-[560px] overflow-y-auto">{campusApps.slice().sort((a,b)=>new Date(b.appliedAt).getTime()-new Date(a.appliedAt).getTime()).map(a=><button key={a.id} onClick={()=>setApplicationDetail(a)} className="w-full rounded-2xl border border-slate-200 p-4 text-left hover:border-[#b9957c] hover:-translate-y-0.5 transition"><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-black">{a.studentName}</div><div className="mt-1 text-xs text-slate-500">{a.opportunityTitle}</div></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black">{a.status}</span></div><div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400"><Clock3 className="w-3 h-3"/>{new Date(a.appliedAt).toLocaleString()} • {a.participationType}</div></button>)}{!campusApps.length && <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-slate-500">Applications will appear here live.</div>}</div></div>
    </section>

    <section className="grid md:grid-cols-3 gap-4">
      {[['Engagement Risk', `${atRiskStudents} students`, AlertTriangle, 'Profiles under 45% completion need intervention.'],['Placement Momentum', `${shortlistRate}% shortlist rate`, BrainCircuit, 'Tracks conversion from application to shortlist/selection.'],['Cross-Campus Network', `${campusOps.collaborations.length} collaborations`, UsersRound, 'Shows active partnerships and shared opportunities.']].map(([title,value,Icon,desc]:any)=><div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5"><Icon className="w-5 h-5 text-[#76533e]"/><div className="mt-4 text-sm font-black text-slate-600">{title}</div><div className="mt-1 text-2xl font-black text-slate-950">{value}</div><p className="mt-2 text-xs text-slate-500">{desc}</p></div>)}
    </section>

    {profileStudent && <div className="fixed inset-0 z-[95] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div className="flex items-center gap-4">{profileStudent.profile.avatar && <img src={profileStudent.profile.avatar} alt={profileStudent.name} className="h-16 w-16 rounded-2xl object-cover border border-[#d8c9bb]"/>}<div><div className="text-[11px] font-black uppercase tracking-[.16em] text-[#76533e]">Student 360° Profile</div><h3 className="text-3xl font-black mt-1">{profileStudent.name}</h3><p className="text-sm text-slate-500 mt-1">{profileStudent.profile.degree} • {profileStudent.profile.year} • {profileStudent.studentId || profileStudent.profile.studentId}</p></div></div><button onClick={()=>setProfileStudent(null)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5"/></button></div><div className="mt-6 grid sm:grid-cols-4 gap-3">{[['Profile',`${profileProgress(profileStudent)}%`],['GPA',profileStudent.profile.gpa||'—'],['Projects',profileStudent.profile.projects.length],['Applications',selectedProfileApps.length]].map(([k,v])=><div key={k} className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-black uppercase text-slate-400">{k}</div><div className="mt-1 text-xl font-black">{v}</div></div>)}</div><div className="mt-6 grid md:grid-cols-2 gap-4"><div className="rounded-2xl border p-4"><div className="text-sm font-black">Skills</div><div className="mt-3 flex flex-wrap gap-2">{profileStudent.profile.skills.map(s=><span key={s.name} className="rounded-full bg-[#f3e8de] px-2.5 py-1 text-[11px] font-bold text-[#76533e]">{s.name} • {s.level}</span>)}</div></div><div className="rounded-2xl border p-4"><div className="text-sm font-black">Career Goal</div><p className="mt-2 text-sm text-slate-600">{profileStudent.profile.careerGoal || 'Not set'}</p></div></div><div className="mt-4 rounded-2xl border p-4"><div className="text-sm font-black">Application Journey</div><div className="mt-3 space-y-2">{selectedProfileApps.map(a=><div key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"><div><div className="text-xs font-black">{a.opportunityTitle}</div><div className="text-[10px] text-slate-400 mt-1">{new Date(a.appliedAt).toLocaleString()} • {a.participationType}{a.teamName?` • ${a.teamName}`:''}</div></div><span className="text-[10px] font-black">{a.status}</span></div>)}{!selectedProfileApps.length && <div className="text-xs text-slate-400">No application yet.</div>}</div></div></div></div>}

    {applicationDetail && <div className="fixed inset-0 z-[96] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><div className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-2xl"><div className="flex justify-between"><div><div className="text-[11px] font-black uppercase tracking-[.16em] text-[#76533e]">Application Detail</div><h3 className="text-2xl font-black mt-1">{applicationDetail.opportunityTitle}</h3></div><button onClick={()=>setApplicationDetail(null)}><X className="w-5 h-5"/></button></div><div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-3">{applicationDetail.studentAvatar ? <img src={applicationDetail.studentAvatar} alt={applicationDetail.studentName} className="application-avatar-frame h-12 w-12 rounded-xl object-cover border border-slate-200"/> : <div className="application-avatar-frame h-12 w-12 rounded-xl flex items-center justify-center text-sm font-black">{applicationDetail.studentName?.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()}</div>}<div><div className="text-[10px] uppercase font-black text-slate-400">Student</div><div className="mt-1 font-black">{applicationDetail.studentName}</div><div className="text-xs text-slate-500">{applicationDetail.studentRoll}</div></div></div></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] uppercase font-black text-slate-400">Applied At</div><div className="mt-1 font-black">{new Date(applicationDetail.appliedAt).toLocaleString()}</div></div></div>{applicationDetail.participationType==='Team' && <div className="mt-3 rounded-2xl border p-4"><div className="text-sm font-black">Team: {applicationDetail.teamName || 'Unnamed Team'}</div><div className="mt-2 flex flex-wrap gap-2">{applicationDetail.teamMembers.map(m=><span key={m} className="rounded-full bg-[#f3e8de] px-2.5 py-1 text-[11px] font-bold text-[#76533e]">{m}</span>)}</div></div>}{applicationDetail.profileSnapshot && <div className="mt-3 rounded-2xl border border-[#e0d3c7] bg-[#fbf7f2] p-4"><div className="text-sm font-black text-[#30251f]">Submitted profile snapshot</div><div className="mt-2 text-xs text-[#6f6258]">{applicationDetail.profileSnapshot.degree} • {applicationDetail.profileSnapshot.year}</div><div className="mt-2 flex flex-wrap gap-2">{applicationDetail.profileSnapshot.skills.slice(0,6).map(skill=><span key={skill} className="rounded-full bg-white border border-[#dfd2c6] px-2 py-1 text-[10px] font-bold text-[#684b39]">{skill}</span>)}</div></div>}{applicationDetail.attachmentDataUrl && <div className="mt-3 rounded-2xl border border-[#e0d3c7] p-4"><div className="text-sm font-black text-[#30251f]">Application attachment</div><img src={applicationDetail.attachmentDataUrl} alt={applicationDetail.attachmentName || 'Application attachment'} className="application-image-preview mt-3 max-h-80 min-h-40 w-full rounded-xl object-contain bg-[#f7f1eb] p-2"/><div className="mt-2 text-[11px] font-bold text-[#77685d]">{applicationDetail.attachmentName}</div></div>}<div className="mt-5"><div className="text-xs font-black text-slate-500 mb-2">Review Status — organization controlled</div><div className="flex flex-wrap gap-2">{(['Applied','Under Review','Shortlisted','Selected','Rejected'] as const).map(status=><button key={status} onClick={()=>{updateApplicationReviewStatus(applicationDetail.id,status);setApplicationDetail({...applicationDetail,status});}} className={`px-3 py-2 rounded-xl text-[11px] font-black border ${applicationDetail.status===status?'v13-primary-button bg-slate-950 text-white border-slate-950':'bg-white text-slate-700 border-slate-300'}`}>{status}</button>)}</div></div></div></div>}

    {showPublisher && <div className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><form onSubmit={publish} className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"><h3 className="text-2xl font-black">Publish Campus Opportunity</h3><p className="text-sm text-slate-500 mt-1">This will be available in the student opportunity feed for {selectedCollege.shortName}.</p><div className="mt-5 grid sm:grid-cols-2 gap-3"><input required placeholder="Opportunity title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="sm:col-span-2 field"/><select value={form.type} onChange={e=>setForm({...form,type:e.target.value as any})} className="field"><option>Internship</option><option>Hackathon</option><option>Workshop</option><option>Event</option><option>Competition</option><option>Placement</option></select><select value={form.category} onChange={e=>setForm({...form,category:e.target.value as any})} className="field"><option>Internships</option><option>College Hackathons</option><option>Workshops</option><option>Technical Events</option><option>Competitions</option><option>Placement Opportunities</option></select><input placeholder="Domain" value={form.domain} onChange={e=>setForm({...form,domain:e.target.value})} className="field"/><input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} className="field"/><input placeholder="Prize / stipend / benefit" value={form.benefit} onChange={e=>setForm({...form,benefit:e.target.value})} className="field"/><input placeholder="Skills, comma separated" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} className="field"/><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="field sm:col-span-2 min-h-24"/></div><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={()=>setShowPublisher(false)} className="px-4 py-2.5 rounded-xl border text-xs font-black">Cancel</button><button className="px-4 py-2.5 rounded-xl bg-violet-700 text-white text-xs font-black">Publish Now</button></div></form></div>}

    {showMessage && <div className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4"><div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl"><h3 className="text-2xl font-black">Send Campus Message</h3><input value={msgTitle} onChange={e=>setMsgTitle(e.target.value)} className="field mt-5" placeholder="Title"/><textarea value={msgBody} onChange={e=>setMsgBody(e.target.value)} className="field mt-3 min-h-28" placeholder="Write notification/message..."/><div className="mt-5 flex justify-end gap-2"><button onClick={()=>{setShowMessage(false);setSelectedStudentId(undefined);}} className="px-4 py-2.5 rounded-xl border text-xs font-black">Cancel</button><button onClick={()=>{if(msgBody.trim()){sendCampusMessage(msgTitle,msgBody,selectedStudentId);setMsgBody('');setShowMessage(false);setSelectedStudentId(undefined);}}} className="v13-primary-button px-4 py-2.5 rounded-xl bg-[#463126] text-white text-xs font-black">Send Message</button></div></div></div>}
  </div>;
};
