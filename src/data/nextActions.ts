import { NextActionItem } from '../types';

export const INITIAL_NEXT_ACTIONS: NextActionItem[] = [
  {
    id: 'act-react',
    title: 'Complete React & Component State Basics',
    description: 'Bridge the top missing competency for frontend & full-stack roles. Increases your qualification for 13+ internships.',
    category: 'Skill',
    impactText: '+16% Internship Readiness',
    xpReward: 120,
    completed: false,
    targetTab: 'simulator',
    actionLabel: 'Open Skill Simulator'
  },
  {
    id: 'act-resume',
    title: 'Update Resume with STAR Project Metrics',
    description: 'Add quantitative achievements to DevCollab AI project bullets to pass initial ATS and hiring manager screenings.',
    category: 'Resume',
    impactText: '+8% Profile Strength',
    xpReward: 80,
    completed: true,
    targetTab: 'profile',
    actionLabel: 'Review Profile'
  },
  {
    id: 'act-sih',
    title: 'Apply to Smart India Hackathon (SIH) Before Friday',
    description: 'Deadline closes in 2 days. Internal college nomination approval is already pre-validated.',
    category: 'Deadline',
    impactText: 'High Career ROI',
    xpReward: 150,
    completed: false,
    targetTab: 'discover',
    actionLabel: 'View SIH Opportunity'
  },
  {
    id: 'act-github',
    title: 'Add Prototype Walkthrough & Architecture Diagram to GitHub',
    description: 'Recruiters spend an average of 45 seconds on student GitHub repos. A clear README with GIF boosts shortlisting.',
    category: 'Project',
    impactText: '+12% Portfolio Trust',
    xpReward: 100,
    completed: false,
    targetTab: 'profile',
    actionLabel: 'Update Projects'
  },
  {
    id: 'act-profile',
    title: 'Complete Profile to Reach 100% Verification',
    description: 'Add your latest semester GPA and upload proof of certifications to unlock priority student badge.',
    category: 'Profile',
    impactText: 'Unlocks Level 8',
    xpReward: 200,
    completed: false,
    targetTab: 'profile',
    actionLabel: 'Edit Profile'
  },
  {
    id: 'act-aptitude',
    title: 'Prepare Aptitude & Speed Problem Solving',
    description: 'Practice quantitative and logical reasoning tests essential for tier-1 placement entrance rounds.',
    category: 'Aptitude',
    impactText: '+15% Placement Readiness',
    xpReward: 90,
    completed: false,
    targetTab: 'roadmap',
    actionLabel: 'View Daily Plan'
  }
];
