import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  Code2,
  Compass,
  GraduationCap,
  Lightbulb,
  Rocket,
  Sparkles,
  ShieldCheck,
  Target,
  Trophy,
  UsersRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { OpportunityType } from '../../types';

const INTEREST_OPTIONS = [
  'Artificial Intelligence',
  'Web Development',
  'Hackathons',
  'Open Source Ecosystems',
  'Cybersecurity',
  'Cloud & DevOps',
  'Data Science',
  'Product Building',
  'Research',
  'Entrepreneurship',
  'UI / UX Design',
  'Competitive Programming'
];

const SKILL_OPTIONS = [
  'Python',
  'JavaScript',
  'React',
  'Java',
  'C++',
  'SQL',
  'Git',
  'Node.js',
  'Machine Learning Basics',
  'Data Structures & Algorithms',
  'UI / UX',
  'Cloud Fundamentals'
];

const OPPORTUNITY_OPTIONS: { type: OpportunityType; description: string; icon: React.ElementType }[] = [
  { type: 'Hackathon', description: 'Build, compete and ship ideas', icon: Trophy },
  { type: 'Internship', description: 'Gain real industry experience', icon: BriefcaseBusiness },
  { type: 'Scholarship', description: 'Find funding and academic support', icon: GraduationCap },
  { type: 'Open Source', description: 'Contribute to real engineering projects', icon: Code2 },
  { type: 'Research', description: 'Explore labs, papers and fellowships', icon: BookOpen },
  { type: 'Competition', description: 'Challenge your skills nationally', icon: Target }
];

const CAREER_GOALS = [
  'Software Engineer',
  'AI / ML Engineer',
  'Full-Stack Developer',
  'Data Scientist',
  'Cloud / DevOps Engineer',
  'Cybersecurity Engineer',
  'Product Engineer',
  'Research Engineer',
  'Startup Founder'
];

export const GuidedOnboarding: React.FC = () => {
  const {
    isOnboardingOpen,
    completeOnboarding,
    currentUser,
    profile,
    updateProfile,
    collegesList,
    selectedCollege,
    showToast
  } = useApp();

  const [step, setStep] = useState(1);
  const [collegeCode, setCollegeCode] = useState(profile.collegeCode || selectedCollege.code);
  const [degree, setDegree] = useState(profile.degree || 'B.Tech in Computer Engineering');
  const [year, setYear] = useState(profile.year || 'Third Year (Junior)');
  const [interests, setInterests] = useState<string[]>(profile.interests?.slice(0, 8) || []);
  const [skills, setSkills] = useState<string[]>(profile.skills?.map(item => item.name).slice(0, 8) || []);
  const [opportunityTypes, setOpportunityTypes] = useState<OpportunityType[]>(profile.preferredOpportunityTypes?.slice(0, 5) || ['Hackathon', 'Internship']);
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal || '');
  const [error, setError] = useState<string | null>(null);

  const progress = Math.round((step / 3) * 100);
  const selectedCollegeInfo = useMemo(
    () => collegesList.find(college => college.code === collegeCode) || selectedCollege,
    [collegeCode, collegesList, selectedCollege]
  );

  if (!isOnboardingOpen || !currentUser) return null;

  const toggleString = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, max = 8) => {
    setter(prev => {
      if (prev.includes(value)) return prev.filter(item => item !== value);
      if (prev.length >= max) {
        showToast(`You can select up to ${max} items here.`);
        return prev;
      }
      return [...prev, value];
    });
    setError(null);
  };

  const toggleOpportunity = (type: OpportunityType) => {
    setOpportunityTypes(prev => {
      if (prev.includes(type)) return prev.filter(item => item !== type);
      if (prev.length >= 5) {
        showToast('Choose up to 5 opportunity priorities.');
        return prev;
      }
      return [...prev, type];
    });
    setError(null);
  };

  const goNext = () => {
    if (step === 1) {
      if (!degree.trim()) {
        setError('Add your degree or program before continuing.');
        return;
      }
      updateProfile({ degree: degree.trim(), year });
    }

    if (step === 2) {
      if (interests.length < 3) {
        setError('Select at least 3 interests so we can personalize your opportunity feed.');
        return;
      }
      if (skills.length < 3) {
        setError('Select at least 3 current skills for better match and readiness scores.');
        return;
      }

      const nextSkills = skills.map(name => {
        const existing = profile.skills.find(item => item.name === name);
        return existing || { name, level: 'Beginner' as const, proficiency: 45 };
      });
      updateProfile({ interests, skills: nextSkills });
    }

    setError(null);
    setStep(prev => Math.min(3, prev + 1));
  };

  const finish = () => {
    if (opportunityTypes.length < 2) {
      setError('Choose at least 2 opportunity types to build a useful dashboard.');
      return;
    }
    if (!careerGoal.trim()) {
      setError('Choose a primary career direction.');
      return;
    }

    updateProfile({
      careerGoal,
      preferredOpportunityTypes: opportunityTypes,
      interests,
      preferredDomains: Array.from(new Set([...profile.preferredDomains, ...interests.slice(0, 4)]))
    });
    setError(null);
    completeOnboarding();
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/75 backdrop-blur-xl p-3 sm:p-6">
      <div className="min-h-full flex items-center justify-center py-4">
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-[#fffdf8] shadow-[0_30px_100px_rgba(15,23,42,0.35)]"
        >
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] lg:min-h-[650px]">
            <aside className="relative hidden lg:block overflow-hidden bg-slate-950 px-6 py-7 sm:px-8 sm:py-9 text-white">
              <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

              <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20">SO</div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Student Opportunity Engine</div>
                    <div className="mt-1 text-sm text-slate-400">Personal setup guide</div>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Step {step} of 3 · {progress}% complete
                  </div>
                  <h2 className="mt-5 max-w-md text-3xl sm:text-4xl font-black tracking-tight font-['Outfit',sans-serif] leading-[1.06]">
                    Build a dashboard that understands what you want next.
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                    We use your campus, interests, skills and goals to rank opportunities, surface the right people and generate your next best actions.
                  </p>
                </div>

                <div className="mt-9 space-y-3">
                  {[
                    { n: 1, title: 'Campus Setup', text: 'Verify your college and academic context', icon: Building2 },
                    { n: 2, title: 'Interests & Skills', text: 'Tell us what you enjoy and what you can build', icon: Lightbulb },
                    { n: 3, title: 'Career Direction', text: 'Choose the opportunities and outcomes you want', icon: Rocket }
                  ].map(item => {
                    const Icon = item.icon;
                    const active = item.n === step;
                    const done = item.n < step;
                    return (
                      <div key={item.n} className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-all ${active ? 'border-emerald-400/40 bg-emerald-400/10' : done ? 'border-white/10 bg-white/[0.06]' : 'border-white/5 bg-white/[0.025]'}`}>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-emerald-400 text-slate-950' : done ? 'bg-white text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                          {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className={`text-sm font-black ${active || done ? 'text-white' : 'text-slate-500'}`}>{item.title}</div>
                          <div className="mt-0.5 text-xs text-slate-500">{item.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-10">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                      <UsersRound className="h-4 w-4" /> Why this matters
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Better profile context improves opportunity match scores, campus recommendations and interest-based peer discovery.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="px-4 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Welcome, {currentUser.name.split(' ')[0]}</div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-['Outfit',sans-serif]">
                    {step === 1 && 'Confirm your campus profile'}
                    {step === 2 && 'Personalize your interest graph'}
                    {step === 3 && 'Choose what success looks like'}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {step === 1 && 'This anchors college-specific hackathons, scholarships, workshops, student communities and campus opportunities.'}
                    {step === 2 && 'Pick at least three interests and three skills. We will use them to calculate stronger match signals.'}
                    {step === 3 && 'Choose at least two opportunity priorities and one career direction. You can change these anytime.'}
                  </p>
                </div>
                <div className="hidden sm:flex h-11 min-w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 shadow-sm">
                  {progress}%
                </div>
              </div>

              <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-emerald-600"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -16, filter: 'blur(3px)' }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-[330px] sm:min-h-[390px]"
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Registered Campus</label>
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3.5">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-black text-slate-950">{selectedCollegeInfo.name}</div>
                            <div className="mt-0.5 text-[11px] font-bold text-emerald-700">Bound to your registered college account · {selectedCollegeInfo.code}</div>
                          </div>
                          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-700" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Degree / Program</label>
                          <input
                            value={degree}
                            onChange={event => setDegree(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="B.Tech in Computer Engineering"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Academic Year</label>
                          <select
                            value={year}
                            onChange={event => setYear(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                          >
                            <option>First Year</option>
                            <option>Second Year</option>
                            <option>Third Year (Junior)</option>
                            <option>Final Year (Senior)</option>
                            <option>Postgraduate</option>
                          </select>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Campus context detected</div>
                            <div className="mt-1.5 text-lg font-black text-slate-950">{selectedCollegeInfo.shortName} Opportunity Center</div>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{selectedCollegeInfo.partnerOpportunitiesCount}+ partner opportunities · campus-specific events · interest-matched student network</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-7">
                      <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="text-sm font-black text-slate-950">Your interests</div>
                          <div className="text-xs font-bold text-slate-400">{interests.length}/8 selected · minimum 3</div>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {INTEREST_OPTIONS.map(item => {
                            const selected = interests.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleString(item, interests, setInterests)}
                                className={`rounded-full border px-4 py-2.5 text-xs font-black transition-all ${selected ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/15' : 'border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950'}`}
                              >
                                {selected && <Check className="mr-1.5 inline h-3.5 w-3.5" />}{item}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="text-sm font-black text-slate-950">Current skills</div>
                          <div className="text-xs font-bold text-slate-400">{skills.length}/8 selected · minimum 3</div>
                        </div>
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                          {SKILL_OPTIONS.map(item => {
                            const selected = skills.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleString(item, skills, setSkills)}
                                className={`flex items-center justify-between rounded-2xl border px-3.5 py-3 text-left text-xs font-black transition-all ${selected ? 'border-slate-950 bg-slate-950 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950'}`}
                              >
                                <span>{item}</span>
                                <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${selected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-100 text-slate-400'}`}>
                                  {selected ? <Check className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-7">
                      <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="text-sm font-black text-slate-950">Opportunity priorities</div>
                          <div className="text-xs font-bold text-slate-400">{opportunityTypes.length}/5 selected · minimum 2</div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {OPPORTUNITY_OPTIONS.map(item => {
                            const Icon = item.icon;
                            const selected = opportunityTypes.includes(item.type);
                            return (
                              <button
                                key={item.type}
                                type="button"
                                onClick={() => toggleOpportunity(item.type)}
                                className={`group rounded-2xl border p-4 text-left transition-all ${selected ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'}`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-950 group-hover:text-white'}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 text-sm font-black text-slate-950">{item.type}{selected && <Check className="h-4 w-4 text-emerald-600" />}</div>
                                    <div className="mt-1 text-xs leading-5 text-slate-500">{item.description}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Primary Career Direction</label>
                        <select
                          value={careerGoal}
                          onChange={event => setCareerGoal(event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        >
                          {CAREER_GOALS.map(goal => <option key={goal}>{goal}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: interests.length, label: 'Interests', icon: Compass },
                          { value: skills.length, label: 'Skills', icon: Code2 },
                          { value: opportunityTypes.length, label: 'Priorities', icon: Target }
                        ].map(metric => {
                          const Icon = metric.icon;
                          return (
                            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                              <Icon className="mx-auto h-4 w-4 text-emerald-600" />
                              <div className="mt-2 text-xl font-black text-slate-950">{metric.value}</div>
                              <div className="mt-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{metric.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700">
                  {error}
                </motion.div>
              )}

              <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(prev => Math.max(1, prev - 1));
                  }}
                  disabled={step === 1}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    Continue Setup <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finish}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    <Sparkles className="h-4 w-4" /> Build My Opportunity Dashboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
