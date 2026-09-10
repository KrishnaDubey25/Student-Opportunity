import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { OpportunityCategory, Opportunity } from '../types';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Trophy, 
  Sparkles, 
  GraduationCap, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  UserPlus,
  MessageCircle,
  Heart,
  Star,
  Check,
} from 'lucide-react';

const ALL_12_CATEGORIES: { key: OpportunityCategory | 'All'; label: string; countBadge?: number }[] = [
  { key: 'All', label: 'All Opportunities' },
  { key: 'College Hackathons', label: 'College Hackathons' },
  { key: 'Inter-College Hackathons', label: 'Inter-College Hackathons' },
  { key: 'Scholarships', label: 'Scholarships' },
  { key: 'Internships', label: 'Internships' },
  { key: 'Competitions', label: 'Competitions' },
  { key: 'Workshops', label: 'Workshops' },
  { key: 'Technical Events', label: 'Technical Events' },
  { key: 'Cultural Events', label: 'Cultural Events' },
  { key: 'Research Programs', label: 'Research Programs' },
  { key: 'Placement Opportunities', label: 'Placement Opportunities' },
  { key: 'Jobs', label: 'Jobs' },
  { key: 'Open Source Programs', label: 'Open Source Programs' }
];



export const CollegeCenterView: React.FC = () => {
  const { 
    selectedCollege, 
    opportunities, 
    profile,
    registeredUsers,
    currentUser,
    openIntelligence,
    setActiveTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'All' | 'Campus Only' | 'Inter-College & National'>('All');
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);

  const connectionsKey = currentUser ? `soe_user_${currentUser.id}_campus_connections` : '';

  useEffect(() => {
    if (!currentUser) {
      setConnectedPeers([]);
      return;
    }
    try {
      const saved = localStorage.getItem(connectionsKey);
      setConnectedPeers(saved ? JSON.parse(saved) : []);
    } catch {
      setConnectedPeers([]);
    }
  }, [currentUser?.id, connectionsKey]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(connectionsKey, JSON.stringify(connectedPeers));
  }, [connectedPeers, connectionsKey, currentUser]);

  const interestMatchedPeers = useMemo(() => {
    if (!currentUser) return [];

    const myInterests = new Set(profile.interests.map(item => item.toLowerCase()));
    const mySkills = new Set(profile.skills.map(item => item.name.toLowerCase()));

    return registeredUsers
      .filter(user => user.id !== currentUser.id && user.collegeCode === selectedCollege.code)
      .map(user => {
        let peerProfile = user.profile;
        try {
          const savedProfile = localStorage.getItem(`soe_user_${user.id}_profile`);
          if (savedProfile) peerProfile = JSON.parse(savedProfile);
        } catch {
          // Fall back to the registered profile snapshot.
        }

        const peerInterests = peerProfile.interests || [];
        const peerSkills = (peerProfile.skills || []).map(skill => skill.name);
        const sharedInterests = peerInterests.filter(item => myInterests.has(item.toLowerCase()));
        const sharedSkills = peerSkills.filter(item => mySkills.has(item.toLowerCase()));

        const interestBase = Math.max(1, new Set([...profile.interests.map(i => i.toLowerCase()), ...peerInterests.map(i => i.toLowerCase())]).size);
        const skillBase = Math.max(1, new Set([...profile.skills.map(i => i.name.toLowerCase()), ...peerSkills.map(i => i.toLowerCase())]).size);
        const match = Math.min(100, Math.round((sharedInterests.length / interestBase) * 70 + (sharedSkills.length / skillBase) * 30));

        const initials = user.name
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map(part => part[0]?.toUpperCase())
          .join('');

        return {
          id: user.id,
          name: user.name,
          role: peerProfile.careerGoal || 'Student Builder',
          year: peerProfile.year || 'Student',
          focus: peerProfile.preferredDomains?.[0] || peerProfile.interests?.[0] || 'Exploring opportunities',
          interests: peerInterests,
          skills: peerSkills,
          sharedInterests,
          sharedSkills,
          match,
          initials: initials || 'ST',
          status: 'Registered same-campus profile'
        };
      })
      .sort((a, b) => b.match - a.match);
  }, [registeredUsers, currentUser, selectedCollege.code, profile.interests, profile.skills]);

  const togglePeerConnection = (peerId: string) => {
    setConnectedPeers(prev => prev.includes(peerId) ? prev.filter(id => id !== peerId) : [...prev, peerId]);
  };

  const campusPulse = useMemo(() => {
    if (!currentUser) {
      return { registeredCount: 0, topInterests: [] as string[], topSkills: [] as string[] };
    }

    const campusUsers = registeredUsers.filter(user => user.collegeCode === selectedCollege.code);
    const interestCounts = new Map<string, number>();
    const skillCounts = new Map<string, number>();

    campusUsers.forEach(user => {
      let campusProfile = user.profile;
      try {
        const savedProfile = localStorage.getItem(`soe_user_${user.id}_profile`);
        if (savedProfile) campusProfile = JSON.parse(savedProfile);
      } catch {
        // Use the registered profile snapshot when local profile data is unavailable.
      }

      (campusProfile.interests || []).forEach(interest => {
        interestCounts.set(interest, (interestCounts.get(interest) || 0) + 1);
      });
      (campusProfile.skills || []).forEach(skill => {
        skillCounts.set(skill.name, (skillCounts.get(skill.name) || 0) + 1);
      });
    });

    const rank = (counts: Map<string, number>) =>
      [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 4)
        .map(([label]) => label);

    return {
      registeredCount: campusUsers.length,
      topInterests: rank(interestCounts),
      topSkills: rank(skillCounts),
    };
  }, [registeredUsers, currentUser, selectedCollege.code]);

  // Filter opportunities for the selected college
  const collegeOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Category filter
      if (selectedCategory !== 'All' && opp.category !== selectedCategory) {
        return false;
      }

      // Campus vs National filter
      const isCampusSpecific = opp.collegeCode === selectedCollege.code || 
                              opp.organization.toLowerCase().includes(selectedCollege.shortName.toLowerCase());

      if (filterMode === 'Campus Only' && !isCampusSpecific) {
        return false;
      }
      if (filterMode === 'Inter-College & National' && isCampusSpecific) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organization.toLowerCase().includes(q);
        const matchesSkills = opp.requiredSkills.some(s => s.toLowerCase().includes(q));
        const matchesCategory = opp.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesSkills && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [opportunities, selectedCollege, selectedCategory, filterMode, searchQuery]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: opportunities.length };
    opportunities.forEach(opp => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, [opportunities]);

  const campusExclusiveCount = opportunities.filter(
    o => o.collegeCode === selectedCollege.code || o.organization.toLowerCase().includes(selectedCollege.shortName.toLowerCase())
  ).length;

  return (
    <div className="w-full space-y-6 pb-16 bg-white">
      {/* 1. Dedicated College Opportunity Center Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-ivory-50 border border-slate-200/90 p-6 sm:p-8 relative overflow-hidden shadow-2xs"
      >
        {/* Subtle background accents */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-plum-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-coral-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-plum-50 text-plum-900 border border-plum-200">
                <Building2 className="w-3.5 h-3.5" />
                Verified Campus Hub
              </span>
              <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                Code: {selectedCollege.code}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Profile Stage: {profile.year}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Outfit',sans-serif]">
              {selectedCollege.name} Opportunity Center
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              A focused campus intelligence layer for hackathons, placement drives, scholarships, workshops, research opportunities, and high-value student connections at <span className="font-bold text-slate-900">{selectedCollege.shortName}</span>.
            </p>
          </div>

          {/* Campus is bound to the authenticated college account. */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-2 font-['Outfit',sans-serif]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Account-Bound Campus</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('tracker')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all font-['Outfit',sans-serif]"
            >
              <span>View Application Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: 'Campus Opportunities', value: `${campusExclusiveCount}`, detail: 'Verified campus tracks' },
            { label: 'National Access', value: `${opportunities.length - campusExclusiveCount}`, detail: 'Inter-college & national' },
            { label: 'Interest Matches', value: `${interestMatchedPeers.length}`, detail: 'Relevant student profiles' },
            { label: 'Your Focus Areas', value: `${profile.interests.length}`, detail: 'Profile interests detected' },
            { label: 'Campus Location', value: selectedCollege.city, detail: selectedCollege.state },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.05 }}
              className="campus-metric-card rounded-2xl bg-white/85 border border-slate-200 p-3.5"
            >
              <span className="text-[10px] uppercase tracking-[0.13em] text-slate-500 font-black block">{item.label}</span>
              <span className="text-xl font-black text-slate-950 font-['Outfit',sans-serif] block mt-0.5 truncate">{item.value}</span>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5 truncate">{item.detail}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Selected-college context: compact, factual and driven by the signed-in campus. */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.42 }}
        className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5"
      >
        <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Campus Snapshot</span>
            </div>
            <h2 className="mt-1 text-lg font-black text-slate-950 font-['Outfit',sans-serif]">
              What is active around {selectedCollege.shortName}
            </h2>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-800">
            {campusPulse.registeredCount} registered campus {campusPulse.registeredCount === 1 ? 'profile' : 'profiles'}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
            <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">College Context</span>
            <p className="mt-1 text-sm font-black text-slate-950">{selectedCollege.type}</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">{selectedCollege.city} • {selectedCollege.state}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
            <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Featured Campus Track</span>
            <p className="mt-1 text-sm font-black text-slate-950 leading-snug">{selectedCollege.featuredHackathon || 'Campus opportunity track'}</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">Selected-college opportunity context</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
            <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Trending Interests</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(campusPulse.topInterests.length ? campusPulse.topInterests : profile.interests.slice(0, 3)).map(item => (
                <span key={item} className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-900">{item}</span>
              ))}
            </div>
            <p className="mt-2 text-[9px] font-semibold text-slate-500">Based on registered {selectedCollege.shortName} profiles</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
            <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">Skills Pulse</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(campusPulse.topSkills.length ? campusPulse.topSkills : profile.skills.slice(0, 3).map(skill => skill.name)).map(item => (
                <span key={item} className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-900">{item}</span>
              ))}
            </div>
            <p className="mt-2 text-[9px] font-semibold text-slate-500">Updates as more students from this campus join</p>
          </div>
        </div>
      </motion.section>

      {/* 2. CAMPUS INTEREST NETWORK */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
        className="campus-network-shell rounded-[30px] border border-slate-200 bg-slate-950 text-white p-5 sm:p-6 relative overflow-hidden"
      >
        <div className="campus-network-orb campus-network-orb-one" />
        <div className="campus-network-orb campus-network-orb-two" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/20 text-emerald-200 text-[10px] font-black uppercase tracking-[0.16em]">
                  <Users className="w-3.5 h-3.5" /> Campus Interest Network
                </span>
                <span className="text-[10px] text-slate-300 font-bold">Personalized from your profile interests</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight font-['Outfit',sans-serif]">
                People worth connecting with at {selectedCollege.shortName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Discover students whose technical interests overlap with yours. Match strength is calculated from shared interests and skills across registered same-campus profiles.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {profile.interests.slice(0, 4).map(interest => (
                <span key={interest} className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-[10px] font-bold text-slate-200">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {interestMatchedPeers.map((peer, index) => {
              const isConnected = connectedPeers.includes(peer.id);
              return (
                <motion.article
                  key={peer.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06, duration: 0.42 }}
                  whileHover={{ y: -6, scale: 1.012 }}
                  className="campus-peer-card rounded-[24px] border border-white/10 bg-white/[0.065] backdrop-blur-sm p-4 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="campus-avatar-ring shrink-0">
                        <div className="w-11 h-11 rounded-2xl bg-white text-slate-950 flex items-center justify-center text-sm font-black font-['Outfit',sans-serif]">
                          {peer.initials}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-black text-white truncate">{peer.name}</h3>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold truncate">{peer.role} • {peer.year}</p>
                      </div>
                    </div>
                    <span className="shrink-0 px-2 py-1 rounded-lg bg-emerald-400/15 border border-emerald-300/20 text-emerald-200 text-[10px] font-black font-mono">
                      {peer.match}% MATCH
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/15 border border-white/8">
                    <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500 font-black">Primary Focus</span>
                    <p className="text-xs font-bold text-slate-100 mt-0.5">{peer.focus}</p>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Heart className="w-3 h-3 text-amber-300" />
                      <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Shared Interests</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 min-h-[46px] content-start">
                      {peer.sharedInterests.length > 0 ? peer.sharedInterests.map(interest => (
                        <span key={interest} className="px-2 py-1 rounded-lg bg-amber-300/10 text-amber-100 border border-amber-200/10 text-[9px] font-bold">
                          {interest}
                        </span>
                      )) : (
                        <span className="text-[10px] text-slate-500">No shared interests yet</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 min-w-0">
                      <Star className="w-3 h-3 text-amber-300 shrink-0" />
                      <span className="truncate">{peer.status}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePeerConnection(peer.id)}
                      className={`shrink-0 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1.5 transition-all ${isConnected ? 'bg-white text-slate-950' : 'bg-emerald-500 hover:bg-emerald-400 text-white'}`}
                    >
                      {isConnected ? <Check className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                      <span>{isConnected ? 'Connected' : 'Connect'}</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}

            {interestMatchedPeers.length === 0 && (
              <div className="md:col-span-2 xl:col-span-4 rounded-[22px] border border-dashed border-white/15 bg-white/[0.04] p-5 sm:p-6 text-center">
                <Users className="mx-auto h-6 w-6 text-emerald-300" />
                <h3 className="mt-2 text-sm font-black text-white">No same-campus profiles to match yet</h3>
                <p className="mx-auto mt-1 max-w-xl text-xs leading-5 text-slate-400">
                  Peer matching only uses real accounts registered for {selectedCollege.shortName}. When another student completes their profile, matching will appear here automatically.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap text-[10px] text-slate-400">
            <span>Interest matching is profile-driven and designed for project teams, hackathons, research, and peer learning.</span>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="inline-flex items-center gap-1.5 text-amber-200 hover:text-amber-100 font-black"
            >
              Improve match accuracy in Profile <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 3. Controls & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search titles, skills (e.g. React, Python), benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 shrink-0">Scope:</span>
          {(['All', 'Campus Only', 'Inter-College & National'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterMode === mode
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 4. 12 Category Tabs (Horizontal Scrollable Pills) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
            Filter by Opportunity Category (12 Categories)
          </span>
          <span className="text-xs font-medium text-slate-500">
            Showing {collegeOpportunities.length} of {opportunities.length} opportunities
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ALL_12_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const count = categoryCounts[cat.key] || 0;
            return (
              <motion.button
                key={cat.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-plum-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. Opportunity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {collegeOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {collegeOpportunities.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-slate-200 bg-slate-50/50">
          <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No opportunities match this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Try switching to "All Opportunities" or changing the campus scope filter above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setFilterMode('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs hover:bg-black transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
