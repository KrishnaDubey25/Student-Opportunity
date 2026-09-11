import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  BarChart3, 
  Milestone, 
  Kanban, 
  TrendingUp,
  Zap,
  ChevronRight,
  ShieldCheck,
  Target,
  Building2,
  Trophy,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Users,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { COLLEGES_LIST } from '../data/colleges';

export const LandingView: React.FC = () => {
  const { 
    setActiveTab, 
    currentUser, 
    selectedCollege, 
    setSelectedCollege,
    openCategoryInDiscover,
    setIsPortalChoiceOpen
  } = useApp();

  const keywords = [
    'Internships',
    'College Hackathons',
    'Scholarships',
    'Research Programs',
    'Open Source',
    'Campus Placements',
    'Competitions'
  ];

  const [keywordIndex, setKeywordIndex] = useState(0);
  const totalCampusOpportunities = COLLEGES_LIST.reduce((sum, college) => sum + college.partnerOpportunitiesCount, 0);
  const campusCount = COLLEGES_LIST.length;


  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex(prev => (prev + 1) % keywords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [keywords.length]);

  const handleGetStarted = () => {
    if (currentUser) {
      setActiveTab(currentUser.accountType === 'organization' ? 'organization' : 'dashboard');
      return;
    }
    setIsPortalChoiceOpen(true);
  };

  return (
    <div className="premium-page w-full flex flex-col min-h-screen bg-[#f7f3ee] text-[#241f1b] selection:bg-slate-900 selection:text-white pb-12 overflow-hidden">
      {/* Subtle Background Elements (Warm Ivory & Pure White) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="ambient-orb absolute -top-32 -left-32 w-96 h-96 bg-[#bda58f]/30 rounded-full blur-3xl opacity-65" />
        <div className="ambient-orb absolute top-48 -right-32 w-96 h-96 bg-[#8a6f5a]/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="landing-hero-stage relative z-10 mt-4 sm:mt-8 pt-10 sm:pt-14 pb-10 sm:pb-14 px-5 sm:px-7 lg:px-10 max-w-7xl mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] rounded-[30px] sm:rounded-[38px] bg-[#fffdf9] border border-[#ded4ca] shadow-[0_28px_90px_rgba(74,55,42,.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Tagline, & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Pill Tag */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#efe6dd] border border-[#d7c8ba] text-[#4d3c30] text-xs font-extrabold mb-5 shadow-sm backdrop-blur"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8a6042]" />
              <span>Campus Career Acceleration Platform</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.055em] text-slate-950 font-['Outfit',sans-serif] leading-[0.98]">
              Student Opportunity Engine
            </h1>

            {/* Tagline: Discover → Prepare → Apply → Track → Grow */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-sm sm:text-base font-extrabold text-[#fffaf4] font-['Outfit',sans-serif] bg-[#3a2d25] px-3 py-2 rounded-xl border border-slate-950 shadow-sm">
              <span>Discover</span>
              <span>→</span>
              <span>Prepare</span>
              <span>→</span>
              <span>Apply</span>
              <span>→</span>
              <span>Track</span>
              <span>→</span>
              <span className="text-[#e8c49a]">Grow</span>
            </div>

            {/* Dynamic Animated Keyword Banner */}
            <div className="mt-5 flex items-center gap-2 text-base sm:text-lg font-extrabold text-slate-700 font-['Outfit',sans-serif]">
              <span>Accelerating student careers in</span>
              <div className="h-9 min-w-[210px] relative overflow-hidden bg-[#f0e8e0] border border-[#d9cabe] rounded-xl shadow-sm flex items-center justify-center px-3 backdrop-blur">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywords[keywordIndex]}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#6e4f3c] font-black text-sm"
                  >
                    {keywords[keywordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Short explanation */}
            <p className="mt-5 text-[15px] sm:text-[17px] text-slate-600 max-w-xl leading-8 font-semibold">
              A focused career operating system for engineering and university students. Discover verified opportunities, understand readiness, track applications, and connect with relevant campus peers based on shared technical interests.
            </p>

            {/* CTAs: Get Started, Register, Login */}
            <div className="mt-7 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetStarted}
                className="premium-shine w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3a2d25] hover:bg-[#4a3a30] text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_14px_35px_rgba(74,55,42,.18)] transition-all font-['Outfit',sans-serif]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {currentUser && (
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#f4eee8] hover:bg-[#ede4dc] text-[#4a382c] border border-[#d8c9bc] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all font-['Outfit',sans-serif]"
                >
                  <span>Enter My Workspace</span>
                </motion.button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-9 pt-7 border-t border-[#e2d8cf] grid grid-cols-3 gap-6 w-full">
              <motion.div whileHover={{ y: -2 }}>
                <div className="text-3xl font-black text-[#2b241f] font-['Outfit',sans-serif]">12</div>
                <div className="text-xs text-[#766a61] font-bold">Opportunity Tracks</div>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <div className="text-3xl font-black text-[#2b241f] font-['Outfit',sans-serif]">96%</div>
                <div className="text-xs text-[#766a61] font-bold">Peak Fit Score</div>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <div className="text-3xl font-black text-[#6e4f3c] font-['Outfit',sans-serif]">14-Day</div>
                <div className="text-xs text-[#766a61] font-bold">Sprint Roadmaps</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Secure access experience — no public dashboard data */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="landing-access-panel landing-access-contrast relative mx-auto w-full max-w-md overflow-hidden rounded-[30px] border border-[#ded4ca] bg-[#fffdf9] p-5 sm:p-6 shadow-[0_24px_70px_rgba(74,55,42,.10)]">
              <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#dbc9b8]/55 blur-3xl ambient-orb" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-[#eadcc9]/55 blur-3xl ambient-orb" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3a2d25] text-white shadow-md">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6e4f3c]">Secure Portal Access</div>
                      <div className="mt-0.5 text-sm font-black text-slate-950 font-['Outfit',sans-serif]">Access begins after verification</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#dacbbe] bg-[#f3ece5] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#6e4f3c]">
                    Locked
                  </span>
                </div>

                <div className="mt-5 grid gap-2.5">
                  {[
                    { n: '01', title: 'Choose Student or Organization', text: 'Select your portal first, then sign in or create the correct account type.', icon: GraduationCap },
                    { n: '02', title: 'Sign in securely', text: 'Dashboard access is available only after a valid sign-in.', icon: ShieldCheck },
                    { n: '03', title: 'Complete guided setup', text: 'Choose campus, interests, skills and target outcomes.', icon: Sparkles }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.n}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28 + index * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="landing-access-step flex items-start gap-3 rounded-2xl border border-slate-200 bg-ivory-50/80 p-3.5"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 shadow-2xs">
                          <Icon className="h-4 w-4 text-[#6e4f3c]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black font-mono text-slate-400">{item.n}</span>
                            <h3 className="text-xs font-black text-slate-950 font-['Outfit',sans-serif]">{item.title}</h3>
                          </div>
                          <p className="mt-1 text-[11px] leading-4.5 text-slate-500">{item.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {!currentUser ? (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsPortalChoiceOpen(true)}
                      className="landing-auth-square group min-h-[92px] rounded-2xl border border-slate-300 bg-white p-3 text-left shadow-sm transition-all hover:border-slate-500 hover:shadow-md"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="mt-3 text-xs font-black text-slate-950 font-['Outfit',sans-serif]">Choose Portal</div>
                      <div className="mt-0.5 text-[10px] font-semibold text-slate-500">Use registered college email</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsPortalChoiceOpen(true)}
                      className="landing-auth-square premium-shine group min-h-[92px] rounded-2xl border border-[#463126] bg-[#463126] p-3 text-left text-white shadow-md shadow-emerald-900/15 transition-all hover:bg-[#5a4031]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/14 text-white border border-white/10">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div className="mt-3 text-xs font-black font-['Outfit',sans-serif]">Get Started</div>
                      <div className="mt-0.5 text-[10px] font-semibold text-[#eadbce]">Choose Student or Organization</div>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(currentUser?.accountType === 'organization' ? 'organization' : 'dashboard')}
                    className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-md"
                  >
                    Continue to My Workspace
                  </motion.button>
                )}

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#76533e]" />
                  Private workspace unlocks only after verified sign-in · Student and Organization accounts stay separate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LISTED PARTNER COLLEGES */}
      <section className="landing-campus-section relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold mb-3 font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#8a6042]" />
            <span>Verified Campus Network</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            Listed Colleges & Partner Campuses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Select your campus to unlock a unified opportunity feed, verified campus context, and interest-based peer discovery for hackathon teams, research collaboration, and career preparation.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 flex-wrap text-xs font-semibold text-slate-600">
            <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 inline-flex items-center gap-1.5 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#6e4f3c]" />
              {campusCount} Listed Partner Campuses
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 inline-flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              {totalCampusOpportunities}+ Campus Tracks
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 inline-flex items-center gap-1.5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#8a6042]" />
              Interest-Based Peer Discovery
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLEGES_LIST.slice(0, 6).map((college) => {
            const isSelected = selectedCollege.code === college.code;
            return (
              <motion.div
                key={college.code}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between bg-white ${
                  isSelected 
                    ? 'border-slate-900 shadow-md ring-1 ring-slate-900' 
                    : 'border-slate-200 hover:border-slate-400 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs font-['Outfit',sans-serif]">
                        {college.shortName.slice(0, 4)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {college.code}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif] leading-tight">
                          {college.name}
                        </h3>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#efe3d8] text-[#644938] shrink-0 font-mono">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                    <span className="text-slate-400">📍</span>
                    <span>{college.city}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-medium">{college.type}</span>
                  </p>

                  <div className="p-3.5 rounded-2xl bg-ivory-50 border border-slate-200/80 space-y-2 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">Flagship Hackathon:</span>
                      <span className="font-bold text-slate-900 text-[11px] truncate max-w-[160px]">
                        {college.featuredHackathon || 'Campus Tech Sprint'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">Live Opportunities:</span>
                      <span className="font-bold text-[#76533e] text-[11px] font-mono">
                        {college.partnerOpportunitiesCount} Active Tracks
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">Campus Access:</span>
                      <span className="font-bold text-plum-900 text-[11px] font-mono">
                        Verified Institutional Hub
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 text-[11px]">Student Network:</span>
                      <span className="font-bold text-[#6e4f3c] text-[11px] text-right">
                        Interest-Matched Collaborators
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedCollege(college);
                      setIsPortalChoiceOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs font-['Outfit',sans-serif]"
                  >
                    <span>Open Campus Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCollege(college);
                      setIsPortalChoiceOpen(true);
                    }}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                    title={`Sign in for ${college.shortName}`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. 12 OPPORTUNITY CATEGORIES GRID (Internships, Hackathons, Scholarships, Competitions, etc.) */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-ivory-50/70 border-y border-slate-200/90 rounded-3xl my-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-black text-plum-900 uppercase tracking-wider font-['Outfit',sans-serif]">
            Comprehensive Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
            Explore 12 Curated Technical & Academic Tracks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Every category contains verified eligibility criteria, required skills, and clear roadmap steps.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {[
            { title: 'Internships', label: 'INTERNSHIP', count: '14 Active', icon: Briefcase, desc: 'Verified software, AI, cloud and product internships matched to student readiness.' },
            { title: 'College Hackathons', label: 'HACKATHON', count: '6 Campus', icon: Trophy, desc: 'Verified campus innovation events, coding sprints and prototype challenges.' },
            { title: 'Inter-College Hackathons', label: 'HACKATHON', count: '10 National', icon: Award, desc: 'National innovation programs, major hackathons and competitive build challenges.' },
            { title: 'Scholarships', label: 'SCHOLARSHIP', count: '8 Grants', icon: GraduationCap, desc: 'Merit funding, tuition support and research grants with transparent eligibility.' },
            { title: 'Competitions', label: 'COMPETITION', count: '12 Live', icon: Target, desc: 'Technical contests, coding challenges and inter-college competitive showcases.' },
            { title: 'Workshops', label: 'WORKSHOP', count: '9 Hands-on', icon: Layers, desc: 'Hands-on learning sessions in AI, cloud, system design and emerging technologies.' },
            { title: 'Technical Events', label: 'TECH EVENT', count: '8 Meets', icon: Zap, desc: 'Developer conferences, technical festivals and expert-led campus sessions.' },
            { title: 'Cultural Events', label: 'CAMPUS EVENT', count: '4 Fests', icon: Users, desc: 'Campus festivals, creative showcases and student leadership experiences.' },
            { title: 'Research Programs', label: 'RESEARCH', count: '5 Fellowships', icon: BookOpen, desc: 'Research internships, faculty programs and publication-oriented student pathways.' },
            { title: 'Placement Opportunities', label: 'PLACEMENT', count: '18 Drives', icon: Building2, desc: 'Campus recruitment drives, pool placements and employer-ready preparation tracks.' },
            { title: 'Jobs', label: 'JOB', count: '22 Openings', icon: Briefcase, desc: 'Graduate roles and early-career openings aligned with your skills and graduation year.' },
            { title: 'Open Source Programs', label: 'OPEN SOURCE', count: '6 Programs', icon: Sparkles, desc: 'Structured open-source programs, fellowships and contributor pathways.' }
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: Math.min(i * 0.045, 0.3) }}
                whileHover={{ y: -6, scale: 1.018 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openCategoryInDiscover(cat.title as any)}
                className="category-launch-card p-4 rounded-[22px] border border-slate-200 bg-white hover:border-[#a27c61] transition-all cursor-pointer text-left flex flex-col justify-between shadow-xs group overflow-hidden relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-ivory-100 text-slate-900 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4 text-plum-900" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {cat.count}
                    </span>
                  </div>
                  <span className="inline-flex mt-1 mb-2 text-[9px] font-black tracking-[0.18em] text-[#6e4f3c] font-mono uppercase">
                    {cat.label}
                  </span>
                  <h3 className="text-sm font-black text-slate-950 font-['Outfit',sans-serif] leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-900 flex items-center gap-1">
                  <span>Browse Tracks</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ACCOUNT-BOUND CAMPUS ACCESS */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="campus-access-story relative overflow-hidden rounded-[30px] border border-[#6d5443] bg-[#5a4437] p-6 sm:p-8 text-[#fff8f0] shadow-[0_22px_60px_rgba(76,56,43,.22)]"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#9c7458]/18 blur-3xl ambient-orb" />
          <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-gold-500/14 blur-3xl ambient-orb" />
          <div className="relative z-10 grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#e5cdb9]">
                <Building2 className="h-3.5 w-3.5" />
                Account-Bound Campus Access
              </div>
              <h2 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight font-['Outfit',sans-serif]">
                Your college workspace appears only after registration and sign-in.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f2e6da]">
                A campus selection on the public page never opens private dashboards. Students create an account for their institution, sign in with that registered college email, complete personalization, and then receive campus-specific opportunities and collaboration context.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Fresh student profile', 'College-linked account', 'Private progress', 'Guided onboarding'].map(item => (
                  <span key={item} className="rounded-xl border border-[#d9c3b0]/35 bg-[#fff8f0]/10 px-3 py-1.5 text-[11px] font-bold text-[#fff4e9]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-2.5">
              {[
                { title: 'Register for your institution', text: `Current selection: ${selectedCollege.shortName}`, n: '01' },
                { title: 'Sign in with college email', text: 'No guest access to campus data', n: '02' },
                { title: 'Complete your setup', text: 'Interests, skills and career targets', n: '03' },
                { title: 'Unlock the private workspace', text: 'Campus + national opportunity intelligence', n: '04' }
              ].map((item, index) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ead7c6] text-[#3f2d24] text-[10px] font-black font-mono">{item.n}</div>
                  <div>
                    <div className="text-xs font-black font-['Outfit',sans-serif]">{item.title}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-slate-400">{item.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. "HOW IT WORKS" 6-STEP WORKFLOW */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider font-['Outfit',sans-serif]">
            Structured Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
            How The Opportunity Engine Works
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            From discovering your fit score to executing 14-day preparation sprints and receiving acceptance letters.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            { step: '01', title: 'Discover', desc: 'AI-curated opportunities across 12 tracks', icon: Compass, tab: 'discover' as const },
            { step: '02', title: 'Match', desc: 'Fit score and skill overlap analytics', icon: BarChart3, tab: 'intelligence' as const },
            { step: '03', title: 'Simulate', desc: 'What-If Skill simulator for instant ROI', icon: Zap, tab: 'simulator' as const },
            { step: '04', title: 'Prepare', desc: '14-day sprint roadmap with daily tasks', icon: Milestone, tab: 'roadmap' as const },
            { step: '05', title: 'Apply & Track', desc: 'Kanban pipeline with milestone stages', icon: Kanban, tab: 'tracker' as const },
            { step: '06', title: 'Audit Readiness', desc: 'Job & Hackathon readiness checklists', icon: ShieldCheck, tab: 'readiness' as const },
          ].map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.step}
                whileHover={{ y: -3, borderColor: '#21845f' }}
                onClick={() => setActiveTab(phase.tab)}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all cursor-pointer text-left flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-ivory-100 text-slate-900 flex items-center justify-center font-bold text-xs">
                      <Icon className="w-4 h-4 text-plum-900" />
                    </div>
                    <span className="text-xs font-black text-slate-300 font-mono">
                      {phase.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                    {phase.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {phase.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-900 flex items-center gap-1">
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. WHAT-IF SKILL SIMULATOR PREVIEW */}
      <section className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="px-3 py-1 rounded-full bg-ivory-100 text-plum-900 border border-plum-200 text-xs font-bold font-['Outfit',sans-serif]">
                High-Impact Feature
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                What-If Skill Simulator
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Wondering which skill to learn next? Turn on simulated skills like React, Docker, or Kubernetes to instantly see your match percentages jump and unlock high-stipend opportunities.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {['+ React (+17 Opps)', '+ TypeScript (+19 Opps)', '+ Docker (+13 Opps)', '+ System Design (+12 Opps)'].map((pill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-ivory-50 text-slate-800 border border-slate-200 font-mono shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('simulator')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs inline-flex items-center gap-2 transition-all font-['Outfit',sans-serif]"
                >
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>{currentUser ? 'Open Skill Simulator' : 'Get Started to Use Simulator'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-slate-200 bg-ivory-50 p-5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#6e4f3c]">
                  <Lock className="h-3.5 w-3.5" />
                  Personalized after sign-in
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    'Compare your current skill profile with role requirements',
                    'See which new skill unlocks the strongest opportunity gain',
                    'Convert skill gaps directly into a study or preparation plan'
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#6e4f3c] text-[10px] font-black font-mono">
                        0{index + 1}
                      </div>
                      <p className="text-[11px] font-semibold leading-5 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. CALL TO ACTION & FOOTER */}
      <section className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit',sans-serif]">
          Ready to Accelerate Your Student Career?
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Create your student account, sign in with your registered college email, complete the guided setup, and unlock a private career workspace built around your goals.
        </p>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGetStarted}
            className="premium-shine px-7 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-sm transition-all font-['Outfit',sans-serif] flex items-center gap-2"
          >
            <span>{currentUser ? 'Open My Workspace' : 'Create Student Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          {!currentUser && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsPortalChoiceOpen(true)}
              className="px-6 py-3 rounded-xl bg-plum-900 hover:bg-black text-white font-black text-sm shadow-sm transition-all font-['Outfit',sans-serif]"
            >
              <span>Register Free Account</span>
            </motion.button>
          )}
        </div>
      </section>
    </div>
  );
};
