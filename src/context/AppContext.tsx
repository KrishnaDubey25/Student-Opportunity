import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Opportunity, 
  StudentProfile, 
  RoadmapStep, 
  NotificationItem, 
  SkillGapItem, 
  ApplicationStatus,
  UserAccount, 
  JobReadinessItem,
  CollegeInfo,
  NextActionItem,
  HackathonStage,
  OpportunityCategory,
  WorkspaceMode,
  OpportunityApplication,
  CampusMessage
} from '../types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_ROADMAP_STEPS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SKILL_GAPS,
  INITIAL_JOB_READINESS_ITEMS
} from '../data/mockData';
import { COLLEGES_LIST, DEFAULT_COLLEGE, detectCollegeFromEmail } from '../data/colleges';
import { INITIAL_NEXT_ACTIONS } from '../data/nextActions';

export type NavTab = 
  | 'landing'
  | 'dashboard'
  | 'college'
  | 'discover'
  | 'intelligence'
  | 'readiness'
  | 'simulator'
  | 'gap'
  | 'roadmap'
  | 'tracker'
  | 'deadlines'
  | 'recovery'
  | 'compare'
  | 'career'
  | 'target-jobs'
  | 'analytics'
  | 'profile'
  | 'organization';

interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  navigateToTab: (tab: NavTab) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  opportunities: Opportunity[];
  updateOpportunityStatus: (id: string, status: ApplicationStatus) => void;
  updateHackathonStage: (id: string, stage: HackathonStage) => void;
  toggleSaveOpportunity: (id: string) => void;
  applyToOpportunity: (id: string) => void;
  shareOpportunity: (opp: Opportunity) => void;
  copyOpportunityDigest: (opp: Opportunity) => void;
  selectedOpportunityId: string | null;
  setSelectedOpportunityId: (id: string | null) => void;
  openIntelligence: (id: string) => void;
  compareList: string[];
  toggleCompareOpportunity: (id: string) => void;
  clearCompareList: () => void;
  roadmapSteps: RoadmapStep[];
  toggleRoadmapStep: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  skillGaps: SkillGapItem[];
  profileStrength: number;
  stats: {
    matchScore: number;
    eligibilityScore: number;
    readinessScore: number;
    careerImpactScore: number;
    priorityScore: string;
    totalOpportunities: number;
    activeApplications: number;
    savedOpportunities: number;
    unlockedOpportunitiesCount: number;
    hackathonReadiness: number;
    streakDays: number;
  };
  resetWorkspaceData: () => void;

  // College Opportunity Center
  selectedCollege: CollegeInfo;
  setSelectedCollege: (college: CollegeInfo) => void;
  collegesList: CollegeInfo[];
  isCollegeModalOpen: boolean;
  setIsCollegeModalOpen: (open: boolean) => void;
  selectCollegeByCodeOrName: (codeOrName: string) => boolean;

  // Dynamic "What Should I Do Next?" Actions
  nextActions: NextActionItem[];
  toggleNextAction: (id: string) => void;

  // Category Filter for Discover
  activeCategoryFilter: OpportunityCategory | 'All';
  setActiveCategoryFilter: (cat: OpportunityCategory | 'All') => void;
  openCategoryInDiscover: (cat: OpportunityCategory | 'All') => void;

  // Feedback Toast System
  toastMessage: string | null;
  showToast: (msg: string) => void;


  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  authPortalMode: WorkspaceMode;
  openPortalAuth: (mode: WorkspaceMode, tab?: 'login' | 'register') => void;
  isPortalChoiceOpen: boolean;
  setIsPortalChoiceOpen: (open: boolean) => void;
  applications: OpportunityApplication[];
  submitOpportunityApplication: (opportunityId: string, participationType: 'Individual'|'Team', teamName?: string, teamMembers?: string[]) => void;
  campusMessages: CampusMessage[];
  publishCampusOpportunity: (opp: Opportunity) => void;
  removeCampusOpportunity: (id: string) => void;
  sendCampusMessage: (title: string, message: string, studentUserId?: string) => void;
  updateApplicationReviewStatus: (id: string, status: OpportunityApplication['status']) => void;

  // Authentication & LocalStorage Accounts
  currentUser: UserAccount | null;
  registeredUsers: UserAccount[];
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthModalTab: (tab: 'login' | 'register') => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  login: (studentIdOrEmail: string, password: string, remember?: boolean) => { success: boolean; error?: string };
  register: (data: {
    name: string;
    studentIdOrEmail: string;
    password: string;
    college?: string;
    collegeCode?: string;
    degree?: string;
    year?: string;
    careerGoal?: string;
    studentRollId?: string;
  }, remember?: boolean) => { success: boolean; error?: string };
  logout: () => void;

  // Guided onboarding after authentication
  isOnboardingOpen: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;

  // Job & Internship Readiness System
  jobReadinessItems: JobReadinessItem[];
  toggleJobReadinessItem: (id: string) => void;
  addReadinessToRoadmap: (id: string) => void;
  overallJobReadinessScore: number;
  hackathonReadinessScore: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to pristine 'light' white theme
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  const [activeTab, setActiveTabState] = useState<NavTab>('landing');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('student');
  const [authPortalMode, setAuthPortalMode] = useState<WorkspaceMode>('student');
  const [isPortalChoiceOpen, setIsPortalChoiceOpen] = useState(false);


  const [applications, setApplications] = useState<OpportunityApplication[]>(() => {
    try { return JSON.parse(localStorage.getItem('soe_campus_applications') || '[]'); } catch { return []; }
  });
  const [campusMessages, setCampusMessages] = useState<CampusMessage[]>(() => {
    try { return JSON.parse(localStorage.getItem('soe_campus_messages') || '[]'); } catch { return []; }
  });
  const [campusPublishedOpportunities, setCampusPublishedOpportunities] = useState<Opportunity[]>(() => {
    try { return JSON.parse(localStorage.getItem('soe_campus_published_opportunities') || '[]'); } catch { return []; }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // College Selection State
  const [selectedCollege, setSelectedCollegeState] = useState<CollegeInfo>(() => {
    try {
      const saved = localStorage.getItem('soe_selected_college');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_COLLEGE;
  });

  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);

  const setSelectedCollege = (college: CollegeInfo) => {
    if (currentUser?.collegeCode && currentUser.collegeCode !== college.code) {
      showToast('Your workspace is linked to the college used at registration. Sign out to use a different campus account.');
      return;
    }
    setSelectedCollegeState(college);
    localStorage.setItem('soe_selected_college', JSON.stringify(college));
    setProfile(prev => {
      const updated = {
        ...prev,
        college: college.name,
        collegeCode: college.code
      };
      if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'profile'), JSON.stringify(updated));
      return updated;
    });
    setCurrentUser(curr => {
      if (!curr) return null;
      const updatedUser: UserAccount = {
        ...curr,
        collegeCode: college.code,
        profile: {
          ...(curr.profile || INITIAL_STUDENT_PROFILE),
          college: college.name,
          collegeCode: college.code
        }
      };
      const remember = localStorage.getItem('soe_remember_me') === 'true';
      if (remember) localStorage.setItem('soe_current_user', JSON.stringify(updatedUser));
      else sessionStorage.setItem('soe_current_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    showToast(currentUser ? `${college.shortName} campus context confirmed.` : `${college.shortName} selected for registration.`);
  };

  const selectCollegeByCodeOrName = (query: string): boolean => {
    const q = query.trim().toLowerCase();
    const found = COLLEGES_LIST.find(
      c => c.code.toLowerCase() === q || 
           c.name.toLowerCase().includes(q) || 
           c.shortName.toLowerCase() === q
    );
    if (found) {
      setSelectedCollege(found);
      setIsCollegeModalOpen(false);
      return true;
    }
    // If not found in predefined list, create custom college
    const customCollege: CollegeInfo = {
      id: 'col-custom-' + Date.now(),
      code: query.toUpperCase().replace(/\s+/g, '-'),
      name: query,
      shortName: query.split(' ')[0],
      city: 'Campus Network',
      state: 'India',
      type: 'Recognized College',
      partnerOpportunitiesCount: 18,
      logoText: query.slice(0, 4).toUpperCase()
    };
    setSelectedCollege(customCollege);
    setIsCollegeModalOpen(false);
    return true;
  };

  // User-scoped workspace storage prevents one student's progress from appearing in another account.
  const userStorageKey = (userId: string, key: string) => `soe_user_${userId}_${key}`;

  const readUserWorkspace = <T,>(userId: string, key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(userStorageKey(userId, key));
      return saved ? JSON.parse(saved) as T : fallback;
    } catch {
      return fallback;
    }
  };

  const createInitialsAvatar = (name: string) => {
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() || '')
      .join('') || 'ST';
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="40" fill="#1b1816"/><circle cx="128" cy="28" r="42" fill="#21845f" opacity=".75"/><circle cx="26" cy="138" r="48" fill="#c58a21" opacity=".55"/><text x="80" y="94" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="800" fill="white">${initials}</text></svg>`
    )}`;
  };

  const getFreshOpportunities = (): Opportunity[] =>
    INITIAL_OPPORTUNITIES.map(opp => ({
      ...opp,
      status: 'Interested' as ApplicationStatus,
      appliedDate: undefined,
      notes: undefined,
      hackathonStage: undefined
    }));

  const getFreshRoadmap = (): RoadmapStep[] =>
    INITIAL_ROADMAP_STEPS.map(step => ({ ...step, completed: false }));

  const getFreshJobReadiness = (): JobReadinessItem[] =>
    INITIAL_JOB_READINESS_ITEMS.map(item => ({ ...item, completed: false }));

  const getFreshNextActions = (): NextActionItem[] =>
    INITIAL_NEXT_ACTIONS.map(item => ({ ...item, completed: false }));

  // Authentication State
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('soe_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed
            .filter((user: UserAccount) =>
              user.id !== 'usr_alex_default' &&
              user.email?.toLowerCase() !== 'alex.sharma@slrtce.edu.in'
            )
            .map((user: UserAccount) => ({ ...user, accountType: user.accountType || 'student' }));
          if (cleaned.length > 0) return cleaned;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const remember = localStorage.getItem('soe_remember_me') === 'true';
      const stored = remember 
        ? localStorage.getItem('soe_current_user')
        : sessionStorage.getItem('soe_current_user') || localStorage.getItem('soe_current_user');
      
      if (stored) {
        const parsed = JSON.parse(stored) as UserAccount;
        const isLegacyDemo =
          parsed.id === 'usr_alex_default' ||
          parsed.email?.toLowerCase() === 'alex.sharma@slrtce.edu.in';
        const isRegistered = registeredUsers.some(user =>
          user.id === parsed.id ||
          user.email?.toLowerCase() === parsed.email?.toLowerCase()
        );

        if (!isLegacyDemo && isRegistered) return parsed;

        localStorage.removeItem('soe_current_user');
        sessionStorage.removeItem('soe_current_user');
        localStorage.removeItem('soe_remember_me');
      }
    } catch {
      // ignore
    }
    return null;
  });


  useEffect(() => {
    if (currentUser?.accountType) {
      setWorkspaceMode(currentUser.accountType);
    }
  }, [currentUser]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [pendingTab, setPendingTab] = useState<NavTab | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<OpportunityCategory | 'All'>('All');

  const openCategoryInDiscover = (cat: OpportunityCategory | 'All') => {
    setActiveCategoryFilter(cat);
    if (!currentUser) {
      setPendingTab('discover');
      setIsPortalChoiceOpen(true);
      showToast('Choose Student or Organization, then sign in to continue.');
      return;
    }
    navigateToTab('discover');
  };

  // Data states with localStorage fallback
  const [profile, setProfile] = useState<StudentProfile>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'profile', currentUser.profile || INITIAL_STUDENT_PROFILE)
      : INITIAL_STUDENT_PROFILE
  );

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'opportunities', getFreshOpportunities())
      : getFreshOpportunities()
  );

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'roadmap', getFreshRoadmap())
      : getFreshRoadmap()
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'notifications', [])
      : []
  );

  const [jobReadinessItems, setJobReadinessItems] = useState<JobReadinessItem[]>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'job_readiness', getFreshJobReadiness())
      : getFreshJobReadiness()
  );

  const [nextActions, setNextActions] = useState<NextActionItem[]>(() =>
    currentUser
      ? readUserWorkspace(currentUser.id, 'next_actions', getFreshNextActions())
      : getFreshNextActions()
  );

  const [skillGaps] = useState<SkillGapItem[]>(INITIAL_SKILL_GAPS);

  // Persist registered users
  useEffect(() => {
    localStorage.setItem('soe_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Persist current user in the storage scope chosen at sign-in.
  useEffect(() => {
    if (currentUser) {
      const remember = localStorage.getItem('soe_remember_me') === 'true';
      if (remember) {
        localStorage.setItem('soe_current_user', JSON.stringify(currentUser));
        sessionStorage.removeItem('soe_current_user');
      } else {
        sessionStorage.setItem('soe_current_user', JSON.stringify(currentUser));
        localStorage.removeItem('soe_current_user');
      }
    } else {
      localStorage.removeItem('soe_current_user');
      sessionStorage.removeItem('soe_current_user');
    }
  }, [currentUser]);

  // Persist each authenticated student's workspace independently.
  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'job_readiness'), JSON.stringify(jobReadinessItems));
  }, [jobReadinessItems, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'next_actions'), JSON.stringify(nextActions));
  }, [nextActions, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'profile'), JSON.stringify(profile));
  }, [profile, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'opportunities'), JSON.stringify(opportunities));
  }, [opportunities, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'roadmap'), JSON.stringify(roadmapSteps));
  }, [roadmapSteps, currentUser]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'notifications'), JSON.stringify(notifications));
  }, [notifications, currentUser]);

  // Direct Navigation Handler. Every workspace except the landing page is authentication-gated.
  const navigateToTab = (tab: NavTab) => {
    if (tab !== 'landing' && !currentUser) {
      setPendingTab(tab);
      setIsPortalChoiceOpen(true);
      showToast('Choose your portal to access the correct workspace.');
      return;
    }

    setActiveTabState(tab);
    const mainEl = document.getElementById('main-scroll-container');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveTab = (tab: NavTab) => {
    navigateToTab(tab);
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const openPortalAuth = (mode: WorkspaceMode, tab: 'login' | 'register' = 'login') => {
    setAuthPortalMode(mode);
    setAuthModalTab(tab);
    setIsPortalChoiceOpen(false);
    setIsAuthModalOpen(true);
  };

  const onboardingStorageKey = (userId: string) => `soe_onboarding_complete_${userId}`;

  const startOnboarding = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setIsOnboardingOpen(true);
  };

  const completeOnboarding = () => {
    if (currentUser) {
      localStorage.setItem(onboardingStorageKey(currentUser.id), 'true');
    }
    setIsOnboardingOpen(false);
    setActiveTabState('dashboard');
    showToast('Your personalized opportunity dashboard is ready.');
    const mainEl = document.getElementById('main-scroll-container');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldOpenOnboarding = (user: UserAccount) =>
    localStorage.getItem(onboardingStorageKey(user.id)) !== 'true';

  // Authentication methods
  const login = (studentIdOrEmail: string, password: string, remember: boolean = true) => {
    const query = studentIdOrEmail.trim().toLowerCase();

    if (!query.includes('@')) {
      return { success: false, error: 'Please sign in using the college email used during registration.' };
    }

    const matchingEmailAccounts = registeredUsers.filter(
      u =>
        u.studentIdOrEmail.toLowerCase() === query ||
        u.email?.toLowerCase() === query
    );
    const user = matchingEmailAccounts.find(u => (u.accountType || 'student') === authPortalMode);

    if (!user) {
      if (matchingEmailAccounts.length > 0) {
        const otherPortal = authPortalMode === 'student' ? 'Organization' : 'Student';
        const thisPortal = authPortalMode === 'student' ? 'Student' : 'Organization';
        return { success: false, error: `This email is registered for the ${otherPortal} portal, not the ${thisPortal} portal.` };
      }
      return { success: false, error: `No ${authPortalMode} account found with this institutional email.` };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Please verify your credentials.' };
    }

    // Success — enter only the portal this account belongs to.
    setWorkspaceMode(user.accountType || 'student');
    setCurrentUser(user);
    if (user.profile) {
      const hydratedProfile = readUserWorkspace(user.id, 'profile', user.profile);
      setProfile(hydratedProfile);
      setOpportunities(() => {
        const personal = readUserWorkspace(user.id, 'opportunities', getFreshOpportunities());
        const campus = campusPublishedOpportunities.filter(o => !o.collegeCode || o.collegeCode === (user.collegeCode || hydratedProfile.collegeCode));
        const map = new Map([...personal, ...campus].map(o => [o.id, o]));
        return Array.from(map.values());
      });
      setRoadmapSteps(readUserWorkspace(user.id, 'roadmap', getFreshRoadmap()));
      const savedNotifications = readUserWorkspace(user.id, 'notifications', []);
      const messageNotifications: NotificationItem[] = campusMessages
        .filter(m => m.collegeCode === (user.collegeCode || hydratedProfile.collegeCode) && (!m.studentUserId || m.studentUserId === user.id))
        .map(m => ({ id: m.id, title: m.title, message: m.message, timestamp: new Date(m.createdAt).toLocaleDateString(), read: false, type: 'system' as const, targetTab: 'college' }));
      const notificationMap = new Map([...savedNotifications, ...messageNotifications].map(n => [n.id, n]));
      setNotifications(Array.from(notificationMap.values()).reverse());
      setJobReadinessItems(readUserWorkspace(user.id, 'job_readiness', getFreshJobReadiness()));
      setNextActions(readUserWorkspace(user.id, 'next_actions', getFreshNextActions()));
      setCompareList([]);
      setSelectedOpportunityId(null);

      const userCol = COLLEGES_LIST.find(
        c => c.code === user.collegeCode || 
             c.code === hydratedProfile.collegeCode || 
             c.name.toLowerCase() === hydratedProfile.college.toLowerCase()
      );
      if (userCol) {
        setSelectedCollegeState(userCol);
        localStorage.setItem('soe_selected_college', JSON.stringify(userCol));
      }
    }

    if (remember) {
      localStorage.setItem('soe_remember_me', 'true');
      localStorage.setItem('soe_current_user', JSON.stringify(user));
    } else {
      localStorage.setItem('soe_remember_me', 'false');
      localStorage.removeItem('soe_current_user');
      sessionStorage.setItem('soe_current_user', JSON.stringify(user));
    }

    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}!`);

    // Route strictly by the authenticated account type. Organization accounts can never enter student tabs.
    if ((user.accountType || 'student') === 'organization') {
      setIsOnboardingOpen(false);
      setPendingTab(null);
      setActiveTabState('organization');
    } else if (shouldOpenOnboarding(user)) {
      setIsOnboardingOpen(true);
      setActiveTabState('dashboard');
      setPendingTab(null);
    } else if (pendingTab && pendingTab !== 'organization') {
      setActiveTabState(pendingTab);
      setPendingTab(null);
    } else {
      setPendingTab(null);
      setActiveTabState('dashboard');
    }

    const mainEl = document.getElementById('main-scroll-container');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return { success: true };
  };

  const register = (
    data: {
      name: string;
      studentIdOrEmail: string;
      password: string;
      college?: string;
      collegeCode?: string;
      degree?: string;
      year?: string;
      careerGoal?: string;
      studentRollId?: string;
    },
    remember: boolean = true
  ) => {
    if (!data.name.trim() || !data.studentIdOrEmail.trim() || !data.password.trim()) {
      return { success: false, error: 'Name, college email, and password are required.' };
    }

    const query = data.studentIdOrEmail.trim().toLowerCase();
    const existingIndex = registeredUsers.findIndex(
      u =>
        (u.accountType || 'student') === authPortalMode &&
        (u.studentIdOrEmail.toLowerCase() === query ||
        u.email?.toLowerCase() === query ||
        u.studentId?.toLowerCase() === query)
    );

    const isEmail = data.studentIdOrEmail.includes('@');
    if (!isEmail) {
      return { success: false, error: 'Registration requires a valid college email address.' };
    }

    const emailDetectedCollege = detectCollegeFromEmail(data.studentIdOrEmail);
    const matchedCollege = emailDetectedCollege || COLLEGES_LIST.find(
      c => c.name.toLowerCase() === data.college?.toLowerCase() || 
           c.code.toLowerCase() === data.collegeCode?.toLowerCase() ||
           c.shortName.toLowerCase() === data.college?.toLowerCase()
    ) || (data.college ? {
      id: 'col-custom-' + Date.now(),
      code: data.college.toUpperCase().replace(/\s+/g, '-').slice(0, 10),
      name: data.college,
      shortName: data.college.split(' ')[0],
      city: 'Campus Network',
      state: 'India',
      type: 'Recognized College',
      partnerOpportunitiesCount: 18,
      logoText: data.college.slice(0, 4).toUpperCase()
    } : DEFAULT_COLLEGE);

    const studentRoll = data.studentRollId?.trim() || (isEmail ? 'STU-' + Math.floor(1000 + Math.random() * 9000) : data.studentIdOrEmail.trim());

    // Existing accounts must use the dedicated sign-in flow.
    if (existingIndex !== -1) {
      return {
        success: false,
        error: `A ${authPortalMode} account with this email already exists. Please sign in through the ${authPortalMode === 'student' ? 'Student' : 'Organization'} portal instead.`
      };
    }

    const newProfile: StudentProfile = {
      ...INITIAL_STUDENT_PROFILE,
      name: data.name.trim(),
      avatar: createInitialsAvatar(data.name.trim()),
      college: matchedCollege.name,
      collegeCode: matchedCollege.code,
      studentId: studentRoll,
      degree: data.degree?.trim() || 'B.Tech in Computer Engineering',
      year: data.year?.trim() || 'Third Year (Junior)',
      gpa: '',
      careerGoal: data.careerGoal?.trim() || '',
      skills: [],
      softSkills: [],
      interests: [],
      projects: [],
      certifications: [],
      experience: [],
      preferredDomains: [],
      preferredOpportunityTypes: [],
      xp: 0,
      level: 1,
      levelTitle: 'Getting Started',
      streakDays: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      achievements: INITIAL_STUDENT_PROFILE.achievements.map(item => ({ ...item, unlocked: false, unlockedDate: undefined }))
    };

    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      accountType: authPortalMode,
      name: data.name.trim(),
      studentIdOrEmail: data.studentIdOrEmail.trim(),
      studentId: studentRoll,
      email: isEmail ? data.studentIdOrEmail.trim() : `${studentRoll.toLowerCase()}@campus.edu`,
      collegeCode: matchedCollege.code,
      password: data.password,
      createdAt: new Date().toISOString().split('T')[0],
      profile: newProfile
    };

    // Update registered users list
    setRegisteredUsers(prev => {
      const filtered = prev.filter(u => !((u.accountType || 'student') === authPortalMode && (u.studentIdOrEmail.toLowerCase() === query || u.email?.toLowerCase() === query)));
      const updated = [...filtered, newUser];
      localStorage.setItem('soe_registered_users', JSON.stringify(updated));
      return updated;
    });

    // Registration and sign-in are intentionally separate. A new account starts clean.
    localStorage.removeItem(onboardingStorageKey(newUser.id));
    localStorage.setItem(userStorageKey(newUser.id, 'profile'), JSON.stringify(newProfile));
    localStorage.setItem(userStorageKey(newUser.id, 'opportunities'), JSON.stringify(getFreshOpportunities()));
    localStorage.setItem(userStorageKey(newUser.id, 'roadmap'), JSON.stringify(getFreshRoadmap()));
    localStorage.setItem(userStorageKey(newUser.id, 'notifications'), JSON.stringify([]));
    localStorage.setItem(userStorageKey(newUser.id, 'job_readiness'), JSON.stringify(getFreshJobReadiness()));
    localStorage.setItem(userStorageKey(newUser.id, 'next_actions'), JSON.stringify(getFreshNextActions()));

    setSelectedCollegeState(matchedCollege);
    localStorage.setItem('soe_selected_college', JSON.stringify(matchedCollege));
    showToast(`${authPortalMode === 'organization' ? 'Organization' : 'Student'} account created. Sign in through the same portal to continue.`);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsOnboardingOpen(false);
    localStorage.removeItem('soe_current_user');
    sessionStorage.removeItem('soe_current_user');
    localStorage.removeItem('soe_remember_me');
    setActiveTabState('landing');
    showToast('Logged out successfully.');
  };


  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      if (currentUser) localStorage.setItem(userStorageKey(currentUser.id, 'profile'), JSON.stringify(updated));
      return updated;
    });
    setCurrentUser(curr => {
      if (!curr) return null;
      const updatedUser: UserAccount = {
        ...curr,
        name: updates.name || curr.name,
        collegeCode: updates.collegeCode || curr.collegeCode,
        profile: {
          ...(curr.profile || INITIAL_STUDENT_PROFILE),
          ...updates
        }
      };
      const remember = localStorage.getItem('soe_remember_me') === 'true';
      if (remember) localStorage.setItem('soe_current_user', JSON.stringify(updatedUser));
      else sessionStorage.setItem('soe_current_user', JSON.stringify(updatedUser));
      setRegisteredUsers(all => {
        const updatedAccounts = all.map(u => (u.id === curr.id ? updatedUser : u));
        localStorage.setItem('soe_registered_users', JSON.stringify(updatedAccounts));
        return updatedAccounts;
      });
      return updatedUser;
    });
  };


  const publishCampusOpportunity = (opp: Opportunity) => {
    const normalized = { ...opp, collegeCode: opp.collegeCode || selectedCollege.code, collegeName: opp.collegeName || selectedCollege.name };
    setCampusPublishedOpportunities(prev => {
      const next = [normalized, ...prev.filter(o => o.id !== normalized.id)];
      localStorage.setItem('soe_campus_published_opportunities', JSON.stringify(next));
      return next;
    });
    setOpportunities(prev => [normalized, ...prev.filter(o => o.id !== normalized.id)]);
    showToast('Opportunity published to the student dashboard.');
  };

  const removeCampusOpportunity = (id: string) => {
    setCampusPublishedOpportunities(prev => {
      const next = prev.filter(o => o.id !== id);
      localStorage.setItem('soe_campus_published_opportunities', JSON.stringify(next));
      return next;
    });
    setOpportunities(prev => prev.filter(o => o.id !== id));
    showToast('Campus opportunity removed.');
  };

  const submitOpportunityApplication = (opportunityId: string, participationType: 'Individual'|'Team', teamName?: string, teamMembers: string[] = []) => {
    if (!currentUser) return;
    const opp = opportunities.find(o => o.id === opportunityId);
    if (!opp) return;
    const record: OpportunityApplication = {
      id: 'app_' + Date.now(), opportunityId, opportunityTitle: opp.title,
      studentUserId: currentUser.id, studentName: currentUser.name,
      studentRoll: profile.studentId, collegeCode: profile.collegeCode,
      participationType, teamName: teamName?.trim() || undefined,
      teamMembers: teamMembers.filter(Boolean), appliedAt: new Date().toISOString(), status: 'Applied'
    };
    setApplications(prev => {
      const next = [record, ...prev.filter(a => !(a.opportunityId === opportunityId && a.studentUserId === currentUser.id))];
      localStorage.setItem('soe_campus_applications', JSON.stringify(next));
      return next;
    });
    setOpportunities(prev => prev.map(o => o.id === opportunityId ? { ...o, status: 'Applied', appliedDate: new Date().toISOString().split('T')[0], appliedCount: o.appliedCount + 1 } : o));
    showToast(participationType === 'Team' ? 'Team application submitted and shared with your college.' : 'Application submitted and shared with your college.');
  };

  const sendCampusMessage = (title: string, message: string, studentUserId?: string) => {
    const item: CampusMessage = { id:'msg_'+Date.now(), collegeCode:selectedCollege.code, studentUserId, title, message, createdAt:new Date().toISOString(), sender: currentUser?.name || selectedCollege.shortName };
    setCampusMessages(prev => { const next=[item,...prev]; localStorage.setItem('soe_campus_messages', JSON.stringify(next)); return next; });
    if (!studentUserId || studentUserId === currentUser?.id) {
      setNotifications(prev => [{ id:item.id, title, message, timestamp:'Now', read:false, type:'system', targetTab:'college' }, ...prev]);
    }
    showToast(studentUserId ? 'Message sent to student.' : 'Campus announcement published.');
  };

  const updateApplicationReviewStatus = (id: string, status: OpportunityApplication['status']) => {
    setApplications(prev => { const next=prev.map(a => a.id===id ? {...a,status}:a); localStorage.setItem('soe_campus_applications', JSON.stringify(next)); return next; });
    showToast(`Application marked ${status}.`);
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'soe_campus_published_opportunities') { try { setCampusPublishedOpportunities(JSON.parse(e.newValue || '[]')); } catch {} }
      if (e.key === 'soe_campus_applications') { try { setApplications(JSON.parse(e.newValue || '[]')); } catch {} }
      if (e.key === 'soe_campus_messages') { try { setCampusMessages(JSON.parse(e.newValue || '[]')); } catch {} }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Opportunity Actions
  const updateOpportunityStatus = (id: string, status: ApplicationStatus) => {
    setOpportunities(prev =>
      prev.map(opp => (opp.id === id ? { ...opp, status } : opp))
    );
    showToast(`Status updated to "${status}"`);
  };

  const updateHackathonStage = (id: string, stage: HackathonStage) => {
    setOpportunities(prev =>
      prev.map(opp => (opp.id === id ? { ...opp, hackathonStage: stage } : opp))
    );
    showToast(`Hackathon milestone: ${stage}`);
  };

  const toggleSaveOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === id) {
          const isSaved = opp.status === 'Saved';
          const newStatus = isSaved ? 'Interested' : 'Saved';
          showToast(isSaved ? 'Removed from Saved' : 'Opportunity Saved to Tracker');
          return { ...opp, status: newStatus };
        }
        return opp;
      })
    );
  };

  const applyToOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === id) {
          const isHackathon = opp.type === 'Hackathon' || opp.category.includes('Hackathon');
          showToast(`Application submitted for ${opp.title}!`);
          return {
            ...opp,
            status: 'Applied',
            appliedDate: new Date().toISOString().split('T')[0],
            appliedCount: (opp.appliedCount || 0) + 1,
            hackathonStage: isHackathon ? 'Registered' : opp.hackathonStage
          };
        }
        return opp;
      })
    );
  };

  const copyTextSafely = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  };

  const shareOpportunity = async (opp: Opportunity) => {
    const url = `${window.location.origin}${window.location.pathname}#opportunity-${opp.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: opp.title,
          text: `${opp.title} — ${opp.organization}`,
          url
        });
        showToast('Opportunity shared successfully.');
        return;
      }
    } catch (error) {
      if ((error as DOMException)?.name === 'AbortError') return;
    }
    const copied = await copyTextSafely(url);
    showToast(copied ? 'Opportunity link copied to clipboard!' : 'Share link ready — copy it from the address bar.');
  };

  const copyOpportunityDigest = async (opp: Opportunity) => {
    const text = `🎯 ${opp.title} (${opp.organization})\n📅 Deadline: ${opp.deadline} (${opp.daysLeft} days left)\n🏆 Prize/Stipend: ${opp.stipendOrPrize}\n💡 Category: ${opp.category}\n🎓 Eligibility: ${opp.eligibility}\n⚡ Skills: ${opp.requiredSkills.join(', ')}`;
    const copied = await copyTextSafely(text);
    showToast(copied ? 'Opportunity digest copied to clipboard!' : 'Could not access clipboard. Try again from a secure tab.');
  };

  const toggleCompareOpportunity = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 opportunities can be compared at once.');
        return prev;
      }
      showToast('Added to Opportunity Comparison matrix');
      return [...prev, id];
    });
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  const toggleRoadmapStep = (id: string) => {
    setRoadmapSteps(prev =>
      prev.map(step => {
        if (step.id === id) {
          const updated = !step.completed;
          showToast(updated ? `Milestone completed! +50 XP` : `Milestone reverted`);
          if (updated) {
            updateProfile({ xp: profile.xp + 50 });
          }
          return { ...step, completed: updated };
        }
        return step;
      })
    );
  };

  const toggleJobReadinessItem = (id: string) => {
    setJobReadinessItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = !item.completed;
          showToast(updated ? `Readiness checked! +40 XP` : `Item unchecked`);
          if (updated) {
            updateProfile({ xp: profile.xp + 40 });
          }
          return { ...item, completed: updated };
        }
        return item;
      })
    );
  };

  const addReadinessToRoadmap = (id: string) => {
    const item = jobReadinessItems.find(i => i.id === id);
    if (!item) return;

    const newStep: RoadmapStep = {
      id: 'step-readiness-' + Date.now(),
      dayRange: 'Sprint Focus',
      title: item.title,
      category: item.category === 'DSA' ? 'DSA' : item.category === 'Resume' ? 'Resume' : 'Tech',
      description: item.description,
      completed: item.completed,
      estimatedHours: item.impactScore * 2,
      resources: [{ name: item.resourceTip }]
    };

    setRoadmapSteps(prev => [...prev, newStep]);
    showToast(`Added "${item.title}" to your 14-Day Sprint Roadmap`);
  };

  const toggleNextAction = (id: string) => {
    setNextActions(prev =>
      prev.map(act => {
        if (act.id === id) {
          const nextState = !act.completed;
          if (nextState) {
            showToast(`Action completed! +${act.xpReward} XP earned! 🎉`);
            updateProfile({ xp: profile.xp + act.xpReward });
          }
          return { ...act, completed: nextState };
        }
        return act;
      })
    );
  };

  // Dynamic Scores Calculation
  const completedWeight = jobReadinessItems
    .filter(i => i.completed)
    .reduce((sum, curr) => sum + curr.impactScore, 0);
  const totalWeight = jobReadinessItems.reduce((sum, curr) => sum + curr.impactScore, 0);
  // Readiness starts at zero for every new account and grows only from real actions.
  const overallJobReadinessScore = totalWeight > 0
    ? Math.min(100, Math.round((completedWeight / totalWeight) * 100))
    : 0;

  // Hackathon readiness is derived only from profile evidence; no artificial baseline score.
  const skillNames = profile.skills.map(skill => skill.name.toLowerCase());
  const hasFrontendSkill = skillNames.some(name =>
    ['react', 'javascript', 'typescript', 'html', 'css'].some(skill => name.includes(skill))
  );
  const hasBackendSkill = skillNames.some(name =>
    ['python', 'node', 'java', 'fastapi', 'express', 'django'].some(skill => name.includes(skill))
  );
  const hackathonReadinessScore = Math.min(
    100,
    (hasFrontendSkill ? 25 : 0) +
    (hasBackendSkill ? 25 : 0) +
    (profile.projects.length >= 1 ? 25 : 0) +
    (profile.softSkills.some(skill => skill.toLowerCase().includes('team')) ? 15 : 0) +
    (profile.interests.some(interest => interest.toLowerCase().includes('hackathon')) ? 10 : 0)
  );

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const openIntelligence = (id: string) => {
    if (!currentUser) {
      setPendingTab('intelligence');
      setSelectedOpportunityId(id);
      setIsPortalChoiceOpen(true);
      showToast('Choose your portal, then sign in to continue.');
      return;
    }
    setSelectedOpportunityId(id);
    navigateToTab('intelligence');
  };

  const resetWorkspaceData = () => {
    if (!currentUser) return;
    setOpportunities(getFreshOpportunities());
    setRoadmapSteps(getFreshRoadmap());
    setNotifications([]);
    setJobReadinessItems(getFreshJobReadiness());
    setNextActions(getFreshNextActions());
    setCompareList([]);
    setSelectedOpportunityId(null);

    localStorage.setItem(userStorageKey(currentUser.id, 'opportunities'), JSON.stringify(getFreshOpportunities()));
    localStorage.setItem(userStorageKey(currentUser.id, 'roadmap'), JSON.stringify(getFreshRoadmap()));
    localStorage.setItem(userStorageKey(currentUser.id, 'notifications'), JSON.stringify([]));
    localStorage.setItem(userStorageKey(currentUser.id, 'job_readiness'), JSON.stringify(getFreshJobReadiness()));
    localStorage.setItem(userStorageKey(currentUser.id, 'next_actions'), JSON.stringify(getFreshNextActions()));
    showToast('Workspace progress reset for this account.');
  };

  // Calculate dynamic profile strength percentage
  const profileStrength = Math.min(
    100,
    Math.round(
      (profile.skills.length >= 5 ? 25 : profile.skills.length * 5) +
        (profile.projects.length >= 2 ? 25 : profile.projects.length * 12) +
        (profile.experience.length >= 1 ? 20 : 0) +
        (profile.certifications.length >= 2 ? 15 : profile.certifications.length * 7) +
        (profile.gpa ? 15 : 0)
    )
  );

  // Dynamic KPI Stats calculation
  const validOpps = opportunities.filter(o => !o.isMissed);
  const avgMatch = Math.round(validOpps.reduce((acc, curr) => acc + curr.matchScore, 0) / (validOpps.length || 1));
  const avgEligibility = Math.round(validOpps.reduce((acc, curr) => acc + curr.eligibilityScore, 0) / (validOpps.length || 1));
  const avgReadiness = overallJobReadinessScore;
  const avgCareerImpact = Math.round(validOpps.reduce((acc, curr) => acc + curr.careerImpact, 0) / (validOpps.length || 1));
  const activeApplications = opportunities.filter(o => ['Applied', 'Shortlisted', 'Interview', 'Selected'].includes(o.status)).length;
  const savedOpportunities = opportunities.filter(o => o.status === 'Saved').length;

  const stats = {
    matchScore: avgMatch,
    eligibilityScore: avgEligibility,
    readinessScore: avgReadiness,
    careerImpactScore: avgCareerImpact,
    priorityScore: activeApplications > 0 ? 'High' : savedOpportunities > 0 ? 'Medium' : 'Low',
    totalOpportunities: validOpps.length,
    activeApplications,
    savedOpportunities,
    unlockedOpportunitiesCount: validOpps.filter(o => o.matchScore >= 85).length,
    hackathonReadiness: hackathonReadinessScore,
    streakDays: profile.streakDays || 0
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        activeTab,
        setActiveTab,
        navigateToTab,
        profile,
        updateProfile,
        opportunities,
        updateOpportunityStatus,
        updateHackathonStage,
        toggleSaveOpportunity,
        applyToOpportunity,
        shareOpportunity,
        copyOpportunityDigest,
        selectedOpportunityId,
        setSelectedOpportunityId,
        openIntelligence,
        compareList,
        toggleCompareOpportunity,
        clearCompareList,
        roadmapSteps,
        toggleRoadmapStep,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isNotificationOpen,
        setIsNotificationOpen,
        skillGaps,
        profileStrength,
        stats,
        resetWorkspaceData,

        // College Opportunity Center
        selectedCollege,
        setSelectedCollege,
        collegesList: COLLEGES_LIST,
        isCollegeModalOpen,
        setIsCollegeModalOpen,
        selectCollegeByCodeOrName,

        // Next Best Actions
        nextActions,
        toggleNextAction,

        // Category Filter
        activeCategoryFilter,
        setActiveCategoryFilter,
        openCategoryInDiscover,

        // Toast Feedback
        toastMessage,
        showToast,

        workspaceMode,
        setWorkspaceMode,
        authPortalMode,
        openPortalAuth,
        isPortalChoiceOpen,
        setIsPortalChoiceOpen,
        applications,
        submitOpportunityApplication,
        campusMessages,
        publishCampusOpportunity,
        removeCampusOpportunity,
        sendCampusMessage,
        updateApplicationReviewStatus,

        // Auth
        currentUser,
        registeredUsers,
        isAuthModalOpen,
        authModalTab,
        setIsAuthModalOpen,
        setAuthModalTab,
        openAuthModal,
        login,
        register,
        logout,
        isOnboardingOpen,
        startOnboarding,
        completeOnboarding,

        // Job Readiness
        jobReadinessItems,
        toggleJobReadinessItem,
        addReadinessToRoadmap,
        overallJobReadinessScore,
        hackathonReadinessScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
