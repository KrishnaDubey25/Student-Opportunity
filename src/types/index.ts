export type OpportunityType = 
  | 'Internship'
  | 'Hackathon'
  | 'Scholarship'
  | 'Research'
  | 'Open Source'
  | 'Competition'
  | 'Workshop'
  | 'Event'
  | 'Placement'
  | 'Job';

export type OpportunityCategory = 
  | 'College Hackathons'
  | 'Inter-College Hackathons'
  | 'Scholarships'
  | 'Internships'
  | 'Competitions'
  | 'Workshops'
  | 'Technical Events'
  | 'Cultural Events'
  | 'Research Programs'
  | 'Placement Opportunities'
  | 'Jobs'
  | 'Open Source Programs';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site' | 'In-Person Campus';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ApplicationStatus = 
  | 'Saved'
  | 'Interested'
  | 'Applied'
  | 'Submitted'
  | 'Qualified'
  | 'Shortlisted'
  | 'Rejected'
  | 'Completed'
  | 'Preparing'
  | 'Interview'
  | 'Selected';

export type HackathonStage = 
  | 'Registered'
  | 'Team Formed'
  | 'Idea Submitted'
  | 'PPT Submitted'
  | 'Prototype Ready'
  | 'Prototype Submitted'
  | 'Qualified'
  | 'Finalist'
  | 'Winner';

export interface CollegeInfo {
  id: string;
  code: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  type: string; // Engineering, University, Autonomous, etc.
  partnerOpportunitiesCount: number;
  featuredHackathon?: string;
  logoText: string;
  isPopular?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logo: string;
  type: OpportunityType;
  category: OpportunityCategory;
  collegeCode?: string; // If tied to a specific college (e.g. SLRTCE-MUM)
  collegeName?: string;
  domain: string;
  location: string;
  mode: WorkMode;
  deadline: string; // YYYY-MM-DD
  daysLeft: number;
  duration: string;
  stipendOrPrize: string;
  applicantsCount: number;
  interestedCount: number;
  appliedCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Competitive';
  eligibility: string;
  registrationStatus: 'Open' | 'Closing Soon' | 'Invited Only' | 'Registered' | 'Applied';
  requiredSkills: string[];
  preferredSkills?: string[];
  description: string;
  
  // Intelligence Scores (Calculated or Baseline)
  matchScore: number;
  eligibilityScore: number;
  readinessScore: number;
  careerImpact: number;
  priority: PriorityLevel;
  
  // Deep-dive intelligence
  whyMatch: string[];
  missingSkills: string[];
  recommendedActions: string[];
  
  // Application Tracking
  status: ApplicationStatus;
  appliedDate?: string;
  notes?: string;
  hackathonStage?: HackathonStage;
  
  // Flags & Missed Opportunity Recovery
  isMissed?: boolean;
  missedOriginalId?: string;
  similarityScore?: number;
  recoveryPlan?: {
    nextCycleDate: string;
    alternativeOpportunities: string[];
    prepStepsForNextCycle: string[];
  };
}

export interface StudentProfile {
  name: string;
  avatar: string;
  degree: string;
  year: string;
  college: string;
  collegeCode: string;
  studentId: string;
  gpa: string;
  careerGoal: string;
  skills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; proficiency: number }[];
  softSkills: string[];
  interests: string[];
  projects: { title: string; tech: string[]; link?: string; description: string }[];
  certifications: string[];
  experience: { role: string; org: string; duration: string }[];
  preferredDomains: string[];
  preferredOpportunityTypes: OpportunityType[];
  
  // Gamification & Engagement
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
}

export interface NextActionItem {
  id: string;
  title: string;
  description: string;
  category: 'Skill' | 'Resume' | 'Deadline' | 'Project' | 'Profile' | 'Aptitude';
  impactText: string;
  xpReward: number;
  completed: boolean;
  targetTab?: string;
  actionLabel?: string;
}

export interface RoadmapStep {
  id: string;
  dayRange: string;
  title: string;
  category: 'Resume' | 'DSA' | 'Tech' | 'Project' | 'GitHub' | 'Interview' | 'Application';
  description: string;
  completed: boolean;
  estimatedHours: number;
  resources: { name: string; url?: string }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'match' | 'deadline' | 'skill' | 'achievement' | 'system';
  targetTab?: string;
}

export interface SkillGapItem {
  skill: string;
  currentLevel: 'None' | 'Beginner' | 'Intermediate' | 'Advanced';
  requiredLevel: 'Intermediate' | 'Advanced';
  gap: 'None' | 'Low' | 'Medium' | 'High';
  priority: PriorityLevel;
  currentPercentage: number;
  targetPercentage: number;
  unlockableOpportunities: number;
}

export interface UserAccount {
  id: string;
  name: string;
  studentIdOrEmail: string;
  password: string;
  createdAt: string;
  studentId?: string;
  email?: string;
  collegeCode?: string;
  profile: StudentProfile;
}

export interface JobReadinessItem {
  id: string;
  category: 'DSA' | 'Full-Stack' | 'System Design' | 'Resume' | 'Interview';
  title: string;
  description: string;
  impactScore: number;
  difficulty: 'Essential' | 'Medium' | 'Advanced';
  completed: boolean;
  resourceTip: string;
}

export type WorkspaceMode = 'student' | 'organization';

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  studentUserId: string;
  studentName: string;
  studentRoll: string;
  collegeCode: string;
  participationType: 'Individual' | 'Team';
  teamName?: string;
  teamMembers?: string[];
  appliedAt: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Selected' | 'Rejected';
}

export interface CampusMessage {
  id: string;
  collegeCode: string;
  studentUserId?: string;
  title: string;
  message: string;
  createdAt: string;
  sender: string;
}
