import { 
  Opportunity, 
  StudentProfile, 
  RoadmapStep, 
  NotificationItem, 
  SkillGapItem, 
  JobReadinessItem 
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Alex Sharma',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  degree: 'B.Tech in Computer Engineering',
  year: 'Third Year (Junior)',
  college: 'Shri L. R. Tiwari College of Engineering',
  collegeCode: 'SLRTCE-MUM',
  studentId: 'SLRTCE-2023-CS-184',
  gpa: '8.8 / 10.0',
  careerGoal: 'Software Engineer / AI Systems Engineer',
  streakDays: 7,
  lastActiveDate: '2026-09-05',
  skills: [
    { name: 'Python', level: 'Advanced', proficiency: 88 },
    { name: 'JavaScript', level: 'Advanced', proficiency: 84 },
    { name: 'React', level: 'Intermediate', proficiency: 76 },
    { name: 'Git', level: 'Intermediate', proficiency: 80 },
    { name: 'SQL', level: 'Intermediate', proficiency: 72 },
    { name: 'Machine Learning Basics', level: 'Intermediate', proficiency: 68 },
    { name: 'Data Structures & Algorithms', level: 'Beginner', proficiency: 54 },
  ],
  softSkills: ['Problem Solving', 'Technical Writing', 'Team Collaboration', 'Fast Learner'],
  interests: ['Artificial Intelligence', 'Web Development', 'Hackathons', 'Open Source Ecosystems', 'Distributed Systems'],
  projects: [
    {
      title: 'DevCollab AI Code Reviewer',
      tech: ['React', 'Python', 'FastAPI', 'TailwindCSS'],
      description: 'Automated pull-request code reviewer leveraging LLMs for vulnerability checks and code styling.',
      link: 'https://github.com/alexsharma/devcollab-ai'
    },
    {
      title: 'Campus Pulse Microservice',
      tech: ['JavaScript', 'Node.js', 'PostgreSQL', 'Redis'],
      description: 'High-throughput student event registration platform serving 4,000+ daily campus requests.',
      link: 'https://github.com/alexsharma/campus-pulse'
    }
  ],
  certifications: [
    'DeepLearning.AI: Neural Networks and Deep Learning',
    'Meta Frontend Developer Professional Certificate',
    'HackerRank Problem Solving (Intermediate)'
  ],
  experience: [
    {
      role: 'Frontend Engineering Intern',
      org: 'HyperScale Labs (Seed-stage Startup)',
      duration: 'Summer 2025 (3 Months)'
    },
    {
      role: 'Open Source Contributor',
      org: 'Layer5 / Meshery',
      duration: 'Jan 2025 - Present'
    }
  ],
  preferredDomains: ['Full Stack Development', 'AI / ML Engineering', 'Cloud & Systems', 'Developer Tooling'],
  preferredOpportunityTypes: ['Internship', 'Hackathon', 'Open Source', 'Placement', 'Research'],
  xp: 3450,
  level: 7,
  levelTitle: 'Opportunity Explorer',
  achievements: [
    {
      id: 'first-app',
      title: 'First Application',
      description: 'Submitted an application through the tracker pipeline',
      icon: 'Send',
      unlocked: true,
      unlockedDate: '2026-08-15',
      xpReward: 250
    },
    {
      id: 'hackathon-hunter',
      title: 'Hackathon Hunter',
      description: 'Explored and shortlisted 3 top-tier hackathons',
      icon: 'Trophy',
      unlocked: true,
      unlockedDate: '2026-08-28',
      xpReward: 400
    },
    {
      id: 'skill-builder',
      title: 'Skill Builder',
      description: 'Simulated career skill evolution pathways in What-If engine',
      icon: 'Sparkles',
      unlocked: true,
      unlockedDate: '2026-09-01',
      xpReward: 300
    },
    {
      id: 'research-explorer',
      title: 'Research Explorer',
      description: 'Bookmarked and analyzed global university lab grants',
      icon: 'GraduationCap',
      unlocked: false,
      xpReward: 500
    },
    {
      id: 'open-source-starter',
      title: 'Open Source Starter',
      description: 'Connected your profile to open-source fellowship roadmaps',
      icon: 'GitFork',
      unlocked: true,
      unlockedDate: '2026-08-10',
      xpReward: 350
    },
    {
      id: 'profile-master',
      title: '90% Profile Master',
      description: 'Reached 90% or above in profile completeness and verification',
      icon: 'CheckCircle2',
      unlocked: false,
      xpReward: 600
    }
  ]
};

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  // 1. SLRTCE College Hackathons
  {
    id: 'opp-slrtce-innobuzz',
    title: 'Innobuzz National Hackathon 2026',
    organization: 'Shri L. R. Tiwari College of Engineering',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=120',
    type: 'Hackathon',
    category: 'College Hackathons',
    domain: 'AI, IoT & Smart Cities',
    location: 'SLRTCE Campus, Mira Road, Mumbai',
    mode: 'In-Person Campus',
    deadline: '2026-09-18',
    daysLeft: 13,
    duration: '36 Hours Non-Stop',
    stipendOrPrize: '₹1,50,000 Cash Prize + Incubation',
    applicantsCount: 480,
    interestedCount: 720,
    appliedCount: 164,
    difficulty: 'Intermediate',
    eligibility: 'Open to all Engineering & Polytechnic students; Teams of 3-4',
    registrationStatus: 'Open',
    requiredSkills: ['Python', 'React', 'IoT Basics', 'API Integration'],
    preferredSkills: ['FastAPI', 'Computer Vision', 'Raspberry Pi'],
    description: 'Flagship annual hackathon at SLRTCE bringing together student innovators to build real-world IoT, AI, and Sustainable Tech solutions judged by senior industry leaders.',
    matchScore: 96,
    eligibilityScore: 100,
    readinessScore: 88,
    careerImpact: 92,
    priority: 'Critical',
    whyMatch: [
      'Official home college flagship hackathon with guaranteed on-campus presentation slots',
      'Matches your Python and React full-stack project background perfectly',
      'Direct fast-track interview opportunity with SLRTCE corporate incubation partners'
    ],
    missingSkills: ['Hardware Prototype Presentation', '3-Minute Elevator Pitch Deck'],
    recommendedActions: [
      'Lock in team members through SLRTCE student group',
      'Draft problem statement pitch under Smart Campus track',
      'Reserve hardware testing kit from IoT lab'
    ],
    status: 'Applied',
    hackathonStage: 'Idea Submitted'
  },

  // 2. Inter-College Hackathons
  {
    id: 'opp-sih-2026',
    title: 'Smart India Hackathon (SIH) 2026 Finale',
    organization: 'Ministry of Education & AICTE',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=120',
    type: 'Hackathon',
    category: 'Inter-College Hackathons',
    domain: 'AI & Smart Governance',
    location: 'Nodal Centers Across India',
    mode: 'In-Person Campus',
    deadline: '2026-09-08',
    daysLeft: 3,
    duration: '36 Hours Non-Stop',
    stipendOrPrize: '₹1,00,000 Cash Prize / Track',
    applicantsCount: 5200,
    interestedCount: 3800,
    appliedCount: 890,
    difficulty: 'Advanced',
    eligibility: 'B.Tech/BE Students with internal college nomination approval',
    registrationStatus: 'Closing Soon',
    requiredSkills: ['Python', 'Machine Learning Basics', 'React', 'APIs'],
    preferredSkills: ['FastAPI', 'Docker', 'GIS Mapping'],
    description: "World's largest open-innovation nationwide model. Build high-impact solutions for Indian Ministries, PSUs, and state governance bodies.",
    matchScore: 94,
    eligibilityScore: 100,
    readinessScore: 90,
    careerImpact: 95,
    priority: 'Critical',
    whyMatch: [
      'Perfect match for Python + React full-stack skill profile',
      'Strong portfolio projects verified for hackathon scrutiny',
      'Internal SLRTCE SPOC nomination already validated'
    ],
    missingSkills: ['High-Concurrency Architecture Walkthrough', 'Slide Deck Presentation Polish'],
    recommendedActions: [
      'Finalize problem statement code with faculty mentor',
      'Record a 90-second functional prototype walkthrough',
      'Rehearse Q&A responses for jury evaluation'
    ],
    status: 'Applied',
    hackathonStage: 'PPT Submitted'
  },

  // 3. Internships
  {
    id: 'opp-msft-intern',
    title: 'Software Engineering Summer Intern',
    organization: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    type: 'Internship',
    category: 'Internships',
    domain: 'Software Engineering & Cloud',
    location: 'Hyderabad / Bengaluru / Mumbai, India',
    mode: 'Hybrid',
    deadline: '2026-09-28',
    daysLeft: 23,
    duration: '10-12 Weeks (Summer 2027)',
    stipendOrPrize: '$1,250 / month (₹1,05,000) + Housing',
    applicantsCount: 1420,
    interestedCount: 2900,
    appliedCount: 420,
    difficulty: 'Competitive',
    eligibility: '3rd Year B.Tech students graduating in 2027; CGPA >= 7.5',
    registrationStatus: 'Open',
    requiredSkills: ['JavaScript', 'React', 'Data Structures', 'Algorithms', 'System Design Basics'],
    preferredSkills: ['TypeScript', 'Azure', 'C#'],
    description: 'Join Microsoft Core Platforms to architect scalable microservices, cloud telemetry pipelines, and planetary developer tooling.',
    matchScore: 92,
    eligibilityScore: 100,
    readinessScore: 78,
    careerImpact: 97,
    priority: 'Critical',
    whyMatch: [
      'Strong JavaScript and Python background directly matches Microsoft Cloud WebXT stack',
      'React frontend projects prove ability to build high-grade software',
      'Exact 3rd Year B.Tech Computer Engineering eligibility'
    ],
    missingSkills: ['TypeScript (highly suggested for WebXT)', 'Advanced Tree & Graph DSA'],
    recommendedActions: [
      'Take TypeScript crash course (est. 4 hours)',
      'Practice 20 medium DSA problems focused on Trees and Graphs',
      'Request student referral from Microsoft alumni network'
    ],
    status: 'Preparing'
  },

  // 4. Placement Opportunities
  {
    id: 'opp-slrtce-placement',
    title: 'Exclusive Campus Placement Drive: Capgemini & LTIMindtree',
    organization: 'SLRTCE Training & Placement Cell',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=120',
    type: 'Placement',
    category: 'Placement Opportunities',
    domain: 'Enterprise Software & Cloud Engineering',
    location: 'SLRTCE Auditorium & Online Assessment',
    mode: 'In-Person Campus',
    deadline: '2026-09-20',
    daysLeft: 15,
    duration: 'Full-Time Offer (Starting July 2027)',
    stipendOrPrize: 'CTC: ₹7.5 LPA - ₹12.0 LPA + Joining Bonus',
    applicantsCount: 380,
    interestedCount: 540,
    appliedCount: 220,
    difficulty: 'Intermediate',
    eligibility: 'B.Tech CS/IT/EXTC students with no active backlogs; CGPA >= 7.0',
    registrationStatus: 'Open',
    requiredSkills: ['SQL', 'Python or Java', 'Data Structures', 'Aptitude & Reasoning'],
    preferredSkills: ['Cloud Basics', 'REST APIs', 'Spring Boot or Django'],
    description: 'Exclusive on-campus recruitment drive organized by SLRTCE T&P Cell for pre-final and final year engineers. High volume selection with premier differential packages.',
    matchScore: 95,
    eligibilityScore: 100,
    readinessScore: 86,
    careerImpact: 91,
    priority: 'High',
    whyMatch: [
      'Zero active backlogs with 8.8 CGPA guarantees first-round screening clearance',
      'Core proficiency in SQL, Python, and web fundamentals',
      'SLRTCE registered student status directly verified'
    ],
    missingSkills: ['Speed Aptitude Quantitative Drills', 'Group Discussion Technical Etiquette'],
    recommendedActions: [
      'Attempt 2 mock aptitude speed tests in the campus portal',
      'Get college placement resume template formatted and verified',
      'Attend mandatory T&P pre-placement talk this Thursday'
    ],
    status: 'Applied'
  },

  // 5. Scholarships
  {
    id: 'opp-slrtce-scholarship',
    title: 'SLRTCE Academic Excellence & Innovation Scholarship',
    organization: 'Rahul Education Trust / SLRTCE',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=120',
    type: 'Scholarship',
    category: 'Scholarships',
    domain: 'Undergraduate Higher Education',
    location: 'SLRTCE Dean Office, Mumbai',
    mode: 'In-Person Campus',
    deadline: '2026-09-25',
    daysLeft: 20,
    duration: '1 Academic Year (Renewable)',
    stipendOrPrize: '₹50,000 Tuition Waiver + Research Grant',
    applicantsCount: 160,
    interestedCount: 310,
    appliedCount: 95,
    difficulty: 'Intermediate',
    eligibility: 'Enrolled SLRTCE students with CGPA >= 8.5 and demonstrated project work',
    registrationStatus: 'Open',
    requiredSkills: ['Academic Excellence', 'Project Portfolio', 'Good Conduct'],
    preferredSkills: ['Technical Paper Presentation', 'Extracurricular Contributions'],
    description: 'Annual merit scholarship endowed by Rahul Education Trust to foster undergraduate engineering talent with exceptional GPA and innovative technical creations.',
    matchScore: 98,
    eligibilityScore: 100,
    readinessScore: 92,
    careerImpact: 88,
    priority: 'Critical',
    whyMatch: [
      'Your 8.8 CGPA sits comfortably in the top 5% threshold',
      'DevCollab AI project provides ready evidence of innovation',
      'Directly applicable to your enrolled tuition fee'
    ],
    missingSkills: ['Faculty Recommendation Letter from HOD'],
    recommendedActions: [
      'Download application form from SLRTCE student portal',
      'Attach transcript and project report copy',
      'Submit signed packet to Dean Academics before deadline'
    ],
    status: 'Saved'
  },

  // 6. Competitions
  {
    id: 'opp-slrtce-robowars',
    title: 'SLRTCE National RoboWars & AI Combat',
    organization: 'SLRTCE Robotics Club & IEEE Student Branch',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=120',
    type: 'Competition',
    category: 'Competitions',
    domain: 'Robotics, Embedded AI & Mechatronics',
    location: 'SLRTCE Central Courtyard Arena',
    mode: 'In-Person Campus',
    deadline: '2026-09-14',
    daysLeft: 9,
    duration: '2-Day Combat Tournament',
    stipendOrPrize: '₹75,000 Cash Pool + Robot Master Trophy',
    applicantsCount: 90,
    interestedCount: 420,
    appliedCount: 52,
    difficulty: 'Advanced',
    eligibility: 'Teams of 2-5 students from recognized colleges; Bot specs 15kg/30kg',
    registrationStatus: 'Open',
    requiredSkills: ['Microcontrollers', 'Python/C++', 'Motor Drivers', 'Sensor Interfacing'],
    preferredSkills: ['Computer Vision', 'PID Control', 'Wireless Telemetry'],
    description: 'High-adrenaline combat robotics challenge hosted in an enclosed bulletproof arena with autonomous navigation bonus categories.',
    matchScore: 82,
    eligibilityScore: 100,
    readinessScore: 75,
    careerImpact: 85,
    priority: 'Medium',
    whyMatch: [
      'Hardware & AI integration interests match autonomous bot tracks',
      'Great chance for cross-department collaboration with EXTC/Mechanical students'
    ],
    missingSkills: ['PWM Speed Control Tuning', 'Battery Safety Standards Certification'],
    recommendedActions: [
      'Form team with robotics club specialists',
      'Register robot dimensions with technical committee',
      'Attend pit safety orientation session'
    ],
    status: 'Interested'
  },

  // 7. Workshops
  {
    id: 'opp-slrtce-genai-ws',
    title: 'Hands-on Generative AI & Autonomous Agents Bootcamp',
    organization: 'SLRTCE ACM Student Chapter & Google Cloud Campus',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=120',
    type: 'Workshop',
    category: 'Workshops',
    domain: 'Generative AI & LLM Systems',
    location: 'SLRTCE High Performance Computing Lab (Lab 402)',
    mode: 'In-Person Campus',
    deadline: '2026-09-10',
    daysLeft: 5,
    duration: '3-Day Hands-on Intensive Workshop',
    stipendOrPrize: 'Google Cloud Credits ($100) + Certificate of Mastery',
    applicantsCount: 210,
    interestedCount: 650,
    appliedCount: 175,
    difficulty: 'Intermediate',
    eligibility: 'Open to all SLRTCE Computer & IT engineering students; Laptop required',
    registrationStatus: 'Closing Soon',
    requiredSkills: ['Python', 'Basic Machine Learning', 'API Basics'],
    preferredSkills: ['LangChain', 'FastAPI', 'Vector Databases'],
    description: 'Master Retrieval-Augmented Generation (RAG), tool calling with Gemini models, vector search, and build production-ready agentic pipelines on campus GPU workstations.',
    matchScore: 97,
    eligibilityScore: 100,
    readinessScore: 94,
    careerImpact: 93,
    priority: 'Critical',
    whyMatch: [
      'Directly accelerates your DevCollab AI project with modern RAG techniques',
      'Free $100 cloud credits provided to deploy your hackathon projects',
      'Taught on high-spec college hardware with industry experts'
    ],
    missingSkills: ['Vector Database Indexing (Pinecone/Chroma)'],
    recommendedActions: [
      'Claim student seat before cap is reached',
      'Pre-install Python 3.11 environment on personal laptop',
      'Review transformer attention architecture slides'
    ],
    status: 'Applied'
  },

  // 8. Technical Events
  {
    id: 'opp-slrtce-technova',
    title: 'Technova 2026 - Annual Technical Symposium & Paper Contest',
    organization: 'Shri L. R. Tiwari College of Engineering',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=120',
    type: 'Event',
    category: 'Technical Events',
    domain: 'Research, Technical Papers & Demos',
    location: 'SLRTCE Campus Auditorium & Seminar Halls',
    mode: 'In-Person Campus',
    deadline: '2026-09-22',
    daysLeft: 17,
    duration: '2 Full Days',
    stipendOrPrize: '₹50,000 Cash Prizes + IEEE Publication Consideration',
    applicantsCount: 290,
    interestedCount: 510,
    appliedCount: 130,
    difficulty: 'Intermediate',
    eligibility: 'All branches of engineering students; Individual or Team of 2',
    registrationStatus: 'Open',
    requiredSkills: ['Technical Writing', 'Paper Presentation', 'Problem Analysis'],
    preferredSkills: ['IEEE Paper Format', 'Data Visualization', 'LaTeX'],
    description: 'Premier national technical symposium featuring research tracks, coding marathons, project exhibitions, and keynote lectures by leading CTOs.',
    matchScore: 90,
    eligibilityScore: 100,
    readinessScore: 84,
    careerImpact: 89,
    priority: 'High',
    whyMatch: [
      'DevCollab AI project can be directly adapted into an IEEE-format research paper',
      'Opportunity to present in front of visiting university researchers',
      'Elevates resume for higher studies and MS applications'
    ],
    missingSkills: ['LaTeX Formatting for Two-Column IEEE Templates'],
    recommendedActions: [
      'Format project findings into 4-page paper abstract',
      'Submit abstract before priority review deadline',
      'Create 10-slide presentation deck'
    ],
    status: 'Saved'
  },

  // 9. Cultural Events
  {
    id: 'opp-slrtce-utsav',
    title: 'SLRTCE Utsav 2026 - Inter-College Cultural & Youth Carnival',
    organization: 'SLRTCE Student Council & Cultural Committee',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=120',
    type: 'Event',
    category: 'Cultural Events',
    domain: 'Music, Drama, Creative Arts & Leadership',
    location: 'SLRTCE Ground & Amphitheatre, Mumbai',
    mode: 'In-Person Campus',
    deadline: '2026-09-30',
    daysLeft: 25,
    duration: '3 Days of Festivities',
    stipendOrPrize: '₹2,00,000 Total Cash Prizes + Trophies',
    applicantsCount: 650,
    interestedCount: 1400,
    appliedCount: 340,
    difficulty: 'Beginner',
    eligibility: 'All college students with valid College ID',
    registrationStatus: 'Open',
    requiredSkills: ['Team Organization', 'Creative Expression', 'Public Speaking'],
    preferredSkills: ['Event Management', 'Social Media Marketing', 'Anchoring'],
    description: 'The mega annual cultural extravaganza of SLRTCE welcoming 5,000+ students across Mumbai for music battles, street plays, dance, digital design, and student leadership opportunities.',
    matchScore: 78,
    eligibilityScore: 100,
    readinessScore: 90,
    careerImpact: 75,
    priority: 'Low',
    whyMatch: [
      'Great avenue to gain leadership, event organizing, and campus networking experience',
      'Provides verified student council organizing certificates valued by recruiters'
    ],
    missingSkills: ['Stage Coordination Briefing'],
    recommendedActions: [
      'Join the digital media or logistics committee',
      'Register campus technical exhibition stall'
    ],
    status: 'Interested'
  },

  // 10. Research Programs
  {
    id: 'opp-slrtce-research',
    title: 'SLRTCE Embedded AI & Edge IoT Lab Fellowship',
    organization: 'SLRTCE Center of Excellence in Emerging Technologies',
    collegeCode: 'SLRTCE-MUM',
    collegeName: 'Shri L. R. Tiwari College of Engineering',
    logo: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=120',
    type: 'Research',
    category: 'Research Programs',
    domain: 'Edge Computing & AI Microcontrollers',
    location: 'SLRTCE IoT Research Center (Lab 305)',
    mode: 'In-Person Campus',
    deadline: '2026-09-24',
    daysLeft: 19,
    duration: '6 Months (Fall 2026 - Spring 2027)',
    stipendOrPrize: '₹12,000 / month Stipend + Hardware Kit',
    applicantsCount: 85,
    interestedCount: 220,
    appliedCount: 48,
    difficulty: 'Advanced',
    eligibility: 'SLRTCE Computer, IT, or EXTC 2nd & 3rd year students with CGPA >= 8.0',
    registrationStatus: 'Open',
    requiredSkills: ['Python', 'C/C++', 'Microcontrollers', 'Machine Learning Basics'],
    preferredSkills: ['TensorFlow Lite', 'ESP32 / EdgeTPU', 'MQTT'],
    description: 'Funded faculty-mentored research fellowship focused on optimizing small language and neural models for low-power edge devices and smart city sensor grids.',
    matchScore: 93,
    eligibilityScore: 100,
    readinessScore: 82,
    careerImpact: 94,
    priority: 'High',
    whyMatch: [
      'Directly matches your Python proficiency and high academic GPA (8.8)',
      'Funded monthly research stipend while studying on campus',
      'Guaranteed paper co-authorship in indexed journals'
    ],
    missingSkills: ['TensorFlow Lite Quantization Basics'],
    recommendedActions: [
      'Draft 1-page proposal on edge-based anomaly detection',
      'Meet with Lab Director Dr. Patil during office hours',
      'Submit academic transcripts and GitHub profile'
    ],
    status: 'Saved'
  },

  // 11. Jobs
  {
    id: 'opp-razorpay-job',
    title: 'Associate Backend Engineer (Campus Grad 2027)',
    organization: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=120',
    type: 'Job',
    category: 'Jobs',
    domain: 'Fintech, Payments & High Scale',
    location: 'Bengaluru / Hybrid',
    mode: 'Hybrid',
    deadline: '2026-10-05',
    daysLeft: 30,
    duration: 'Full-Time Position',
    stipendOrPrize: 'CTC: ₹18.5 LPA - ₹24.0 LPA + ESOPs',
    applicantsCount: 1850,
    interestedCount: 3400,
    appliedCount: 510,
    difficulty: 'Competitive',
    eligibility: 'B.Tech graduating in 2027; Exceptional problem solving & systems aptitude',
    registrationStatus: 'Open',
    requiredSkills: ['Python or Go', 'SQL', 'Data Structures', 'System Design', 'APIs'],
    preferredSkills: ['Distributed Systems', 'Kafka', 'Redis', 'PostgreSQL'],
    description: 'Work at India’s premier fintech unicorn building checkout pipelines handling 10,000 transactions per second with ultra-low latency.',
    matchScore: 89,
    eligibilityScore: 96,
    readinessScore: 76,
    careerImpact: 98,
    priority: 'Critical',
    whyMatch: [
      'Your Campus Pulse project highlights Redis and PostgreSQL database engineering',
      'Python & SQL skills rated solid intermediate/advanced',
      'Demonstrated interest in high-scale developer infrastructure'
    ],
    missingSkills: ['Distributed Transactions & Idempotency', 'Advanced Data Structures Medium/Hard'],
    recommendedActions: [
      'Study Razorpay API idempotency architecture',
      'Solve 25 medium/hard DSA questions on LeetCode',
      'Review ACID database transaction guarantees'
    ],
    status: 'Saved'
  },

  // 12. Open Source Programs
  {
    id: 'opp-gsoc-2027',
    title: 'Google Summer of Code (GSoC) 2027',
    organization: 'Google Open Source Programs Office',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=120',
    type: 'Open Source',
    category: 'Open Source Programs',
    domain: 'Open Source Distributed Systems',
    location: 'Global (Worldwide)',
    mode: 'Remote',
    deadline: '2026-09-12',
    daysLeft: 7,
    duration: '12-22 Weeks (Flexible)',
    stipendOrPrize: '$3,000 - $6,600 Stipend (₹2,50,000 - ₹5,50,000)',
    applicantsCount: 7800,
    interestedCount: 4600,
    appliedCount: 920,
    difficulty: 'Competitive',
    eligibility: 'Open to all enrolled students aged 18+ worldwide',
    registrationStatus: 'Closing Soon',
    requiredSkills: ['Git', 'Python', 'Open Source Collaboration', 'Code Review'],
    preferredSkills: ['Go', 'Docker', 'Kubernetes', 'Documentation'],
    description: 'Spend your summer working on world-class open source projects mentored by maintainers from Apache, Linux Foundation, Blender, and Python Software Foundation.',
    matchScore: 91,
    eligibilityScore: 100,
    readinessScore: 84,
    careerImpact: 99,
    priority: 'High',
    whyMatch: [
      'Your Layer5 / Meshery open source contribution history is a strong differentiator',
      'Solid Git proficiency (80%) meets maintainer standard expectations',
      'Python scripting and developer tooling project experience'
    ],
    missingSkills: ['Formal Proposal Drafting standard', 'Automated CI/CD Test writing'],
    recommendedActions: [
      'Introduce yourself on the organization Discord channel today',
      'Submit 1 micro good-first-issue PR to get maintainer recognition',
      'Draft your 10-page GSoC timeline proposal using the official template'
    ],
    status: 'Shortlisted'
  },

  // Additional High Impact Opportunities across categories
  {
    id: 'opp-stripe-intern',
    title: 'Software Engineering Intern - Infrastructure',
    organization: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
    type: 'Internship',
    category: 'Internships',
    domain: 'Distributed Systems & Fintech',
    location: 'Bengaluru / Singapore / Remote',
    mode: 'Hybrid',
    deadline: '2026-10-04',
    daysLeft: 29,
    duration: '12 Weeks',
    stipendOrPrize: '$1,600 / month (₹1,35,000) + Equity Grant',
    applicantsCount: 980,
    interestedCount: 2100,
    appliedCount: 380,
    difficulty: 'Competitive',
    eligibility: 'Undergraduate engineering students with strong systems foundations',
    registrationStatus: 'Open',
    requiredSkills: ['Python', 'SQL', 'Data Structures', 'APIs', 'Distributed Systems'],
    preferredSkills: ['Ruby', 'Go', 'Redis', 'Kafka'],
    description: 'Work on payment rails moving billions of dollars per day. Build reliable fault-tolerant infrastructure with 99.999% uptime guarantees.',
    matchScore: 88,
    eligibilityScore: 95,
    readinessScore: 74,
    careerImpact: 97,
    priority: 'High',
    whyMatch: [
      'Campus Pulse project highlights Redis and PostgreSQL database engineering',
      'Python & SQL skills rated solid intermediate/advanced',
      'Demonstrated interest in high-scale developer infrastructure'
    ],
    missingSkills: ['Distributed Transactions & Idempotency', 'Advanced Data Structures Medium/Hard'],
    recommendedActions: [
      'Study Stripe API idempotency design and write a sample idempotent endpoint',
      'Practice 15 dynamic programming questions on LeetCode',
      'Revise ACID database transaction guarantees'
    ],
    status: 'Saved'
  },
  {
    id: 'opp-tata-scholarship',
    title: 'Tata Trusts Higher Technical Education Grant',
    organization: 'Tata Trusts',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=120',
    type: 'Scholarship',
    category: 'Scholarships',
    domain: 'Engineering & Technology',
    location: 'All India',
    mode: 'Remote',
    deadline: '2026-09-29',
    daysLeft: 24,
    duration: '1 Year Full Academic Grant',
    stipendOrPrize: '₹1,00,000 Direct Tuition Grant',
    applicantsCount: 1450,
    interestedCount: 2300,
    appliedCount: 460,
    difficulty: 'Advanced',
    eligibility: 'Indian students enrolled in 2nd/3rd year engineering; Family income < ₹6 LPA; CGPA >= 8.0',
    registrationStatus: 'Open',
    requiredSkills: ['Academic Record', 'Financial Eligibility', 'Essay on Career Impact'],
    preferredSkills: ['Community Service', 'Innovation Projects'],
    description: 'Need-cum-merit scholarship program supporting deserving engineering students across accredited institutions in India with direct tuition grants.',
    matchScore: 92,
    eligibilityScore: 95,
    readinessScore: 88,
    careerImpact: 90,
    priority: 'High',
    whyMatch: [
      'Your 8.8 CGPA exceeds the 8.0 threshold comfortably',
      'Accredited degree program verified',
      'Strong letter of intent ready for submission'
    ],
    missingSkills: ['Income Certificate Attestation'],
    recommendedActions: [
      'Upload verified marksheet of Semester 4 and 5',
      'Draft 500-word statement of purpose regarding AI systems ambitions',
      'Get college endorsement signed'
    ],
    status: 'Preparing'
  },
  {
    id: 'opp-codevita',
    title: 'TCS CodeVita Season 14 - Global Coding Contest',
    organization: 'Tata Consultancy Services',
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=120',
    type: 'Competition',
    category: 'Competitions',
    domain: 'Competitive Programming & Algorithms',
    location: 'Online Contest Platform',
    mode: 'Remote',
    deadline: '2026-09-16',
    daysLeft: 11,
    duration: '6-Hour Virtual Coding Round',
    stipendOrPrize: '$20,000 USD Global Pool + Direct Job Offers',
    applicantsCount: 42000,
    interestedCount: 12000,
    appliedCount: 8400,
    difficulty: 'Advanced',
    eligibility: 'Undergraduate & Postgraduate students graduating 2026-2028',
    registrationStatus: 'Open',
    requiredSkills: ['Python or C++ or Java', 'Data Structures', 'Algorithms', 'Speed Coding'],
    preferredSkills: ['Dynamic Programming', 'Graph Theory', 'Number Theory'],
    description: 'Guinness World Record holder for the largest competitive programming contest. Top coders receive direct job offers with TCS Digital & Innovator bands.',
    matchScore: 84,
    eligibilityScore: 100,
    readinessScore: 70,
    careerImpact: 91,
    priority: 'Medium',
    whyMatch: [
      'Validates algorithms and speed problem solving under pressure',
      'Direct shortcut to premium placement offers without aptitude screening'
    ],
    missingSkills: ['Speed debugging under 20-minute constraints', 'Graph shortest path algorithms'],
    recommendedActions: [
      'Solve previous year CodeVita Round 1 problems',
      'Set up local competitive programming boilerplate in Python/C++'
    ],
    status: 'Interested'
  },
  {
    id: 'opp-mit-hack-missed',
    title: 'HackMIT 2026 Global Undergraduate Hackathon',
    organization: 'Massachusetts Institute of Technology',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120',
    type: 'Hackathon',
    category: 'Inter-College Hackathons',
    domain: 'Software & Applied AI',
    location: 'Cambridge, MA / Virtual',
    mode: 'Hybrid',
    deadline: '2026-08-20',
    daysLeft: 0,
    duration: '36 Hours',
    stipendOrPrize: '$30,000 Prize Pool',
    applicantsCount: 6500,
    interestedCount: 3100,
    appliedCount: 1200,
    difficulty: 'Competitive',
    eligibility: 'Undergraduate students worldwide',
    registrationStatus: 'Closing Soon',
    requiredSkills: ['Full Stack', 'Machine Learning', 'API Development'],
    description: 'Premier undergraduate hackathon held at MIT. Applications closed on August 20, 2026.',
    matchScore: 92,
    eligibilityScore: 100,
    readinessScore: 85,
    careerImpact: 96,
    priority: 'High',
    whyMatch: ['High relevance to your hackathon project interests'],
    missingSkills: ['Early registration cycle deadline management'],
    recommendedActions: ['Explore similar active hackathons (SIH 2026, Innobuzz 2026)'],
    status: 'Rejected',
    isMissed: true,
    missedOriginalId: 'opp-mit-hack-missed',
    similarityScore: 95,
    recoveryPlan: {
      nextCycleDate: 'August 2027 (Pre-registration opens June 2027)',
      alternativeOpportunities: ['opp-slrtce-innobuzz', 'opp-sih-2026'],
      prepStepsForNextCycle: [
        'Set up early email alert 60 days before submission opens',
        'Have a complete project walkthrough video on YouTube or GitHub ready',
        'Form international multidisciplinary team beforehand'
      ]
    }
  }
];

export const INITIAL_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'step-1',
    dayRange: 'Day 1 - 2',
    title: 'Profile Audit & Resume Metrics Refactoring',
    category: 'Resume',
    description: 'Refactor portfolio and resume bullet points into Google XYZ format: Accomplished [X] measured by [Y] by doing [Z]. Verify GitHub link readiness.',
    completed: true,
    estimatedHours: 4,
    resources: [
      { name: 'Google XYZ Resume Blueprint', url: 'https://careers.google.com' },
      { name: 'ATS Keyword Checker', url: 'https://resumeworded.com' }
    ]
  },
  {
    id: 'step-2',
    dayRange: 'Day 3 - 5',
    title: 'Core DSA Sprint: Dynamic Programming & Graphs',
    category: 'DSA',
    description: 'Solve 15 LeetCode Medium problems covering BFS/DFS, topological sort, memoization, and interval overlapping techniques.',
    completed: true,
    estimatedHours: 10,
    resources: [
      { name: 'NeetCode 150 Core Roadmap', url: 'https://neetcode.io' },
      { name: 'Graph Algorithms Interactive Visualizer', url: 'https://visualgo.net' }
    ]
  },
  {
    id: 'step-3',
    dayRange: 'Day 6 - 8',
    title: 'TypeScript & Component State Deep-Dive',
    category: 'Tech',
    description: 'Refactor JavaScript repositories into strict TypeScript. Implement clean generic types, union discrimination, and React context hooks.',
    completed: false,
    estimatedHours: 8,
    resources: [
      { name: 'TypeScript Handbook for React Developers', url: 'https://www.typescriptlang.org/docs/' },
      { name: 'Total TypeScript Interactive Exercises', url: 'https://www.totaltypescript.com' }
    ]
  },
  {
    id: 'step-4',
    dayRange: 'Day 9 - 11',
    title: 'Deploy End-to-End Microservice with CI/CD',
    category: 'Project',
    description: 'Package DevCollab AI project into multi-stage Docker container. Configure GitHub Actions workflow with automated test runs.',
    completed: false,
    estimatedHours: 9,
    resources: [
      { name: 'GitHub Actions CI/CD Template', url: 'https://docs.github.com/actions' },
      { name: 'Docker Multi-Stage Best Practices', url: 'https://docs.docker.com' }
    ]
  },
  {
    id: 'step-5',
    dayRange: 'Day 12 - 13',
    title: 'System Design Basics & API Idempotency',
    category: 'Interview',
    description: 'Learn database indexing, Redis cache invalidation strategies, rate limiting, and write a sample idempotent POST API handler.',
    completed: false,
    estimatedHours: 6,
    resources: [
      { name: 'ByteByteGo System Design Primer', url: 'https://bytebytego.com' },
      { name: 'Designing Data-Intensive Applications (DDIA)', url: 'https://dataintensive.net' }
    ]
  },
  {
    id: 'step-6',
    dayRange: 'Day 14',
    title: 'Final Batch Submission & Alumni Referral Outreaches',
    category: 'Application',
    description: 'Submit polished applications for Microsoft Summer Intern, SIH 2026, and Innobuzz Hackathon. Send 3 personalized referral messages on LinkedIn.',
    completed: false,
    estimatedHours: 3,
    resources: [
      { name: 'LinkedIn Alumni Outreach Messaging Template', url: 'https://linkedin.com' },
      { name: 'Cold Referral Checklist', url: 'https://careers.google.com' }
    ]
  }
];

export const INITIAL_SKILL_GAPS: SkillGapItem[] = [
  {
    skill: 'Data Structures & Algorithms',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    gap: 'High',
    priority: 'Critical',
    currentPercentage: 54,
    targetPercentage: 80,
    unlockableOpportunities: 22
  },
  {
    skill: 'Git & Open Source',
    currentLevel: 'Intermediate',
    requiredLevel: 'Intermediate',
    gap: 'None',
    priority: 'Low',
    currentPercentage: 80,
    targetPercentage: 75,
    unlockableOpportunities: 0
  },
  {
    skill: 'TypeScript',
    currentLevel: 'None',
    requiredLevel: 'Intermediate',
    gap: 'High',
    priority: 'High',
    currentPercentage: 20,
    targetPercentage: 80,
    unlockableOpportunities: 19
  },
  {
    skill: 'Technical Communication & Pitching',
    currentLevel: 'Intermediate',
    requiredLevel: 'Advanced',
    gap: 'Medium',
    priority: 'Medium',
    currentPercentage: 70,
    targetPercentage: 88,
    unlockableOpportunities: 8
  },
  {
    skill: 'System Design Basics',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    gap: 'High',
    priority: 'High',
    currentPercentage: 42,
    targetPercentage: 75,
    unlockableOpportunities: 14
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Top Match Alert 🔥',
    message: '3 new opportunities match your profile above 90% (SLRTCE Innobuzz, SIH 2026, Microsoft Internship).',
    timestamp: '10m ago',
    read: false,
    type: 'match',
    targetTab: 'discover'
  },
  {
    id: 'notif-2',
    title: 'Deadline Urgency ⚠️',
    message: 'Smart India Hackathon (SIH) internal nomination closes in 3 days.',
    timestamp: '2h ago',
    read: false,
    type: 'deadline',
    targetTab: 'deadlines'
  },
  {
    id: 'notif-3',
    title: 'Skill Unlock Available 💡',
    message: 'Learning React Advanced Concepts could unlock 13+ currently available internships.',
    timestamp: '5h ago',
    read: false,
    type: 'skill',
    targetTab: 'simulator'
  },
  {
    id: 'notif-4',
    title: 'Profile Strength Boost ✨',
    message: 'Your profile strength increased to 88% after verifying your SLRTCE enrollment details.',
    timestamp: '1d ago',
    read: true,
    type: 'achievement',
    targetTab: 'profile'
  },
  {
    id: 'notif-5',
    title: 'Roadmap Milestone 🎯',
    message: 'You have completed Day 2 of your 14-Day Placement Roadmap. Next: TypeScript & State Deep-Dive.',
    timestamp: '2d ago',
    read: true,
    type: 'system',
    targetTab: 'roadmap'
  }
];

export const AVAILABLE_SIMULATOR_SKILLS = [
  { name: 'React', icon: 'Atom', category: 'Frontend', boostOpps: 13, boostBreakdown: { internships: 7, hackathons: 3, openSource: 2, jobs: 1 }, boostMatch: 16 },
  { name: 'Docker & Kubernetes', icon: 'Box', category: 'DevOps', boostOpps: 11, boostBreakdown: { internships: 5, hackathons: 2, openSource: 3, jobs: 1 }, boostMatch: 12 },
  { name: 'TypeScript', icon: 'FileCode2', category: 'Language', boostOpps: 14, boostBreakdown: { internships: 8, hackathons: 2, openSource: 3, jobs: 1 }, boostMatch: 15 },
  { name: 'Next.js', icon: 'Globe', category: 'Full-Stack', boostOpps: 10, boostBreakdown: { internships: 4, hackathons: 4, openSource: 1, jobs: 1 }, boostMatch: 11 },
  { name: 'PyTorch / GenAI', icon: 'Brain', category: 'AI/Data', boostOpps: 12, boostBreakdown: { internships: 5, hackathons: 4, openSource: 2, jobs: 1 }, boostMatch: 14 },
  { name: 'System Design', icon: 'Server', category: 'CS Core', boostOpps: 15, boostBreakdown: { internships: 9, hackathons: 1, openSource: 2, jobs: 3 }, boostMatch: 18 },
  { name: 'AWS Cloud', icon: 'Cloud', category: 'Cloud', boostOpps: 12, boostBreakdown: { internships: 7, hackathons: 2, openSource: 1, jobs: 2 }, boostMatch: 13 },
  { name: 'PostgreSQL', icon: 'Database', category: 'Database', boostOpps: 8, boostBreakdown: { internships: 4, hackathons: 2, openSource: 1, jobs: 1 }, boostMatch: 9 }
];

export const INITIAL_JOB_READINESS_ITEMS: JobReadinessItem[] = [
  {
    id: 'readiness-1',
    category: 'DSA',
    title: 'Dynamic Programming & Graph Patterns',
    description: 'Solve 15 LeetCode Medium problems covering DFS/BFS, topological sort, and 1D/2D memoization.',
    impactScore: 6,
    difficulty: 'Essential',
    completed: false,
    resourceTip: 'Focus on NeetCode 150 - Graphs & 1D DP playlists.'
  },
  {
    id: 'readiness-2',
    category: 'Full-Stack',
    title: 'Containerization with Docker & Multi-Stage Builds',
    description: 'Package frontend and backend into lightweight Alpine Docker images and create docker-compose for local testing.',
    impactScore: 5,
    difficulty: 'Medium',
    completed: true,
    resourceTip: 'Docker documentation on multi-stage Node/Python builds.'
  },
  {
    id: 'readiness-3',
    category: 'System Design',
    title: 'Database Indexing & Caching Layer',
    description: 'Add Redis caching for hot queries and verify execution plans using EXPLAIN ANALYZE on PostgreSQL.',
    impactScore: 5,
    difficulty: 'Medium',
    completed: false,
    resourceTip: 'Designing Data-Intensive Applications (DDIA) Chapter 3.'
  },
  {
    id: 'readiness-4',
    category: 'Resume',
    title: 'Google XYZ Bullet Points & Metrics Quantification',
    description: 'Revise resume project bullets to format: Accomplished [X] as measured by [Y], by doing [Z].',
    impactScore: 4,
    difficulty: 'Essential',
    completed: true,
    resourceTip: 'e.g., "Reduced bundle size by 38% by implementing code-splitting & tree-shaking".'
  },
  {
    id: 'readiness-5',
    category: 'Interview',
    title: 'STAR Method Behavioral Stories',
    description: 'Prepare 4 structured stories: Technical Challenge, Disagreement with Teammate, Production Failure, Leadership moment.',
    impactScore: 4,
    difficulty: 'Essential',
    completed: false,
    resourceTip: 'Record yourself on camera for 2 minutes per story.'
  },
  {
    id: 'readiness-6',
    category: 'Full-Stack',
    title: 'Production CI/CD Deployment with Health Checks',
    description: 'Configure GitHub Actions workflow for automated linting, test suite execution, and cloud deployment.',
    impactScore: 5,
    difficulty: 'Medium',
    completed: false,
    resourceTip: 'Set up automated pull-request validation checks.'
  },
  {
    id: 'readiness-7',
    category: 'DSA',
    title: 'Binary Search & Sliding Window Fluency',
    description: 'Master 10 standard two-pointer and sliding window interval problems under 25-minute timer.',
    impactScore: 4,
    difficulty: 'Medium',
    completed: true,
    resourceTip: 'Practice monotonic queues and variable-length window patterns.'
  }
];
