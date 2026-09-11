import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Code2,
  Database,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TerminalSquare,
  RotateCcw,
  BriefcaseBusiness,
  ListChecks,
  BrainCircuit,
  CloudCog,
  Plus,
  X,
  ExternalLink,
  PlayCircle,
  Building2,
  BookMarked
} from 'lucide-react';
import { useApp } from '../context/AppContext';

type Topic = {
  id: string;
  title: string;
  note: string;
  hours: number;
  level: 'Foundation' | 'Core' | 'Interview';
};

type SyllabusModule = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  topics: Topic[];
};

type TargetRole = {
  id: string;
  title: string;
  track: string;
  fitFor: string;
  summary: string;
  interviewFocus: string[];
  keywords: string[];
  modules: SyllabusModule[];
};

const topic = (
  id: string,
  title: string,
  note: string,
  hours: number,
  level: Topic['level'] = 'Core'
): Topic => ({ id, title, note, hours, level });


type LearningResource = {
  title: string;
  provider: string;
  type: 'YouTube' | 'Official' | 'Practice';
  url: string;
  note: string;
};

const TRUSTED_LEARNING_RESOURCES: LearningResource[] = [
  { title: 'Full Stack & Programming Courses', provider: 'freeCodeCamp', type: 'YouTube', url: 'https://www.youtube.com/@freecodecamp', note: 'Long-form English courses for JavaScript, React, Python, DSA, databases and full-stack development.' },
  { title: 'Developer Skills & Product Engineering', provider: 'Microsoft Developer', type: 'YouTube', url: 'https://www.youtube.com/@MicrosoftDeveloper', note: 'Official engineering videos covering JavaScript, cloud, GitHub, AI and modern developer workflows.' },
  { title: 'Cloud & Developer Learning', provider: 'Amazon Web Services', type: 'YouTube', url: 'https://www.youtube.com/@amazonwebservices', note: 'Official AWS English content for cloud fundamentals, architecture, deployment and developer tooling.' },
  { title: 'Interview Warmup', provider: 'Google Career Certificates', type: 'Practice', url: 'https://grow.google/certificates/interview-warmup/', note: 'Practice explaining answers clearly before internship and placement interviews.' },
  { title: 'GitHub Skills', provider: 'GitHub', type: 'Official', url: 'https://skills.github.com/', note: 'Hands-on guided labs for Git, GitHub, collaboration, pull requests and developer workflows.' },
  { title: 'IBM SkillsBuild', provider: 'IBM', type: 'Official', url: 'https://skillsbuild.org/', note: 'Structured learning for AI, cybersecurity, data and professional skills from IBM.' }
];

const TARGET_ROLES: TargetRole[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    track: 'Product Engineering',
    fitFor: 'Web apps, UI systems, product teams',
    summary: 'Build responsive, accessible and production-ready interfaces using modern JavaScript and React.',
    interviewFocus: ['JavaScript fundamentals', 'React architecture', 'Browser concepts', 'UI problem solving'],
    keywords: ['frontend', 'react', 'javascript', 'web', 'ui', 'product'],
    modules: [
      {
        id: 'web-foundations',
        title: 'Web Foundations',
        subtitle: 'Browser basics you should understand before frameworks.',
        icon: Code2,
        topics: [
          topic('html-semantic', 'Semantic HTML', 'Forms, landmarks, document structure and accessibility-first markup.', 3, 'Foundation'),
          topic('css-layout', 'CSS Layout Systems', 'Flexbox, Grid, responsive breakpoints and fluid sizing.', 6, 'Foundation'),
          topic('responsive-ui', 'Responsive UI', 'Mobile-first layouts, touch targets and adaptive components.', 4, 'Foundation'),
          topic('web-accessibility', 'Web Accessibility', 'Keyboard navigation, ARIA basics and contrast requirements.', 3, 'Foundation')
        ]
      },
      {
        id: 'javascript-core',
        title: 'JavaScript Core',
        subtitle: 'The most frequently tested frontend programming concepts.',
        icon: TerminalSquare,
        topics: [
          topic('js-scope', 'Scope, Closures & Hoisting', 'Understand execution context, lexical scope and closures.', 5),
          topic('js-async', 'Promises & Async JavaScript', 'Event loop, async/await, Promise patterns and error handling.', 6),
          topic('js-arrays', 'Arrays, Objects & Functional Methods', 'Map, filter, reduce, immutability and object transformations.', 5),
          topic('js-dom', 'DOM & Browser Events', 'Event delegation, propagation, forms and browser APIs.', 4)
        ]
      },
      {
        id: 'react-core',
        title: 'React Engineering',
        subtitle: 'Component architecture and application state.',
        icon: Layers3,
        topics: [
          topic('react-components', 'Components, Props & Composition', 'Build reusable UI units with predictable interfaces.', 5),
          topic('react-hooks', 'Hooks & State Management', 'useState, useEffect, memoization and custom hooks.', 7),
          topic('react-routing', 'Routing & Data Flows', 'Protected routes, URL state and async data handling.', 4),
          topic('react-performance', 'React Performance', 'Render optimization, lazy loading and bundle awareness.', 5, 'Interview')
        ]
      },
      {
        id: 'frontend-interview',
        title: 'Interview & Portfolio',
        subtitle: 'Convert knowledge into placement-ready proof.',
        icon: BriefcaseBusiness,
        topics: [
          topic('frontend-dsa', 'Frontend DSA Basics', 'Arrays, strings, maps, stacks and common coding patterns.', 10, 'Interview'),
          topic('machine-coding', 'Machine Coding Practice', 'Build UI features under a time limit with clean structure.', 8, 'Interview'),
          topic('frontend-project', 'Production Project', 'Ship one polished app with auth, responsive UX and deployment.', 12, 'Interview'),
          topic('frontend-resume', 'Resume & Project Explanation', 'Prepare impact bullets, architecture explanation and tradeoffs.', 3, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    track: 'Software Engineering',
    fitFor: 'SaaS, startups, web platforms',
    summary: 'Own complete features across frontend, APIs, databases, authentication and deployment.',
    interviewFocus: ['JavaScript / TypeScript', 'React', 'APIs', 'SQL', 'system fundamentals'],
    keywords: ['full stack', 'fullstack', 'react', 'node', 'backend', 'web', 'software'],
    modules: [
      {
        id: 'fs-frontend',
        title: 'Frontend Application Layer',
        subtitle: 'Build usable product interfaces and client-side flows.',
        icon: Layers3,
        topics: [
          topic('fs-js', 'JavaScript / TypeScript', 'Types, async patterns, modules and clean application logic.', 8, 'Foundation'),
          topic('fs-react', 'React Fundamentals', 'Components, hooks, forms, routing and reusable UI.', 10),
          topic('fs-state', 'Client State & Data Fetching', 'Server state, loading states, optimistic UI and caching basics.', 5),
          topic('fs-responsive', 'Responsive Product UX', 'Mobile-first layouts and accessible interaction patterns.', 4)
        ]
      },
      {
        id: 'fs-backend',
        title: 'Backend & API Layer',
        subtitle: 'Create secure application services.',
        icon: TerminalSquare,
        topics: [
          topic('fs-node', 'Node.js Runtime', 'Modules, event loop, middleware and application structure.', 7),
          topic('fs-rest', 'REST API Design', 'Routes, status codes, validation, pagination and API contracts.', 6),
          topic('fs-auth', 'Authentication & Authorization', 'Sessions/JWT concepts, password handling and role checks.', 6),
          topic('fs-errors', 'Error Handling & Logging', 'Reliable API errors, validation and operational visibility.', 4)
        ]
      },
      {
        id: 'fs-data',
        title: 'Database & Data Modeling',
        subtitle: 'Store data correctly and query it efficiently.',
        icon: Database,
        topics: [
          topic('fs-sql', 'SQL Fundamentals', 'SELECT, JOIN, GROUP BY, subqueries and indexes.', 9),
          topic('fs-schema', 'Schema Design', 'Relationships, normalization and practical tradeoffs.', 5),
          topic('fs-transactions', 'Transactions & Consistency', 'Atomic updates and common concurrency concepts.', 4),
          topic('fs-orm', 'ORM / Query Layer', 'Model queries without losing database fundamentals.', 3)
        ]
      },
      {
        id: 'fs-deploy',
        title: 'Deployment & Interview Readiness',
        subtitle: 'Take a project from laptop to production.',
        icon: CloudCog,
        topics: [
          topic('fs-git', 'Git Workflow', 'Branches, pull requests, conflict resolution and clean commits.', 3),
          topic('fs-deploy-app', 'Deployment', 'Environment variables, builds, domains and production checks.', 5),
          topic('fs-system', 'System Design Fundamentals', 'Caching, queues, scaling basics and API tradeoffs.', 8, 'Interview'),
          topic('fs-project', 'Full-Stack Portfolio Project', 'Ship one complete feature-rich product and explain its architecture.', 14, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    track: 'Platform Engineering',
    fitFor: 'APIs, services, data-heavy applications',
    summary: 'Design reliable services, databases and APIs with strong programming and system fundamentals.',
    interviewFocus: ['DSA', 'API design', 'databases', 'OOP', 'backend architecture'],
    keywords: ['backend', 'java', 'node', 'python', 'api', 'database', 'server'],
    modules: [
      {
        id: 'be-programming',
        title: 'Programming Foundations',
        subtitle: 'Write maintainable backend code confidently.',
        icon: Code2,
        topics: [
          topic('be-language', 'One Backend Language Deeply', 'Choose Java, Python or Node.js and master core syntax and libraries.', 12, 'Foundation'),
          topic('be-oop', 'OOP & Clean Code', 'Interfaces, encapsulation, composition and maintainable design.', 7),
          topic('be-dsa', 'Data Structures & Algorithms', 'Arrays, hashing, trees, graphs and problem-solving patterns.', 18, 'Interview'),
          topic('be-testing', 'Unit & API Testing', 'Test service logic, endpoints and failure cases.', 5)
        ]
      },
      {
        id: 'be-api',
        title: 'API Engineering',
        subtitle: 'Build predictable and secure service interfaces.',
        icon: TerminalSquare,
        topics: [
          topic('be-rest', 'RESTful APIs', 'Resources, methods, status codes, pagination and versioning.', 6),
          topic('be-auth', 'Auth & Security Basics', 'Identity, authorization, password storage and API protection.', 6),
          topic('be-validation', 'Validation & Error Design', 'Input validation and consistent error contracts.', 4),
          topic('be-docs', 'API Documentation', 'OpenAPI-style thinking and clear integration contracts.', 3)
        ]
      },
      {
        id: 'be-database',
        title: 'Databases',
        subtitle: 'Model and access persistent data correctly.',
        icon: Database,
        topics: [
          topic('be-sql', 'SQL & Joins', 'Queries, joins, aggregation and indexes.', 10),
          topic('be-modeling', 'Relational Data Modeling', 'Keys, relationships, normalization and schema choices.', 6),
          topic('be-cache', 'Caching Fundamentals', 'Cache-aside, invalidation basics and performance tradeoffs.', 4),
          topic('be-nosql', 'NoSQL Concepts', 'When document/key-value models are useful and their tradeoffs.', 4)
        ]
      },
      {
        id: 'be-system',
        title: 'Systems & Production',
        subtitle: 'Understand how services behave beyond local development.',
        icon: Gauge,
        topics: [
          topic('be-http', 'HTTP & Networking Basics', 'Requests, DNS, TLS, latency and service communication.', 5),
          topic('be-scale', 'Scaling Fundamentals', 'Load balancing, replication, queues and stateless services.', 8, 'Interview'),
          topic('be-observe', 'Logging & Monitoring', 'Operational signals, errors and performance visibility.', 4),
          topic('be-project', 'Backend Service Project', 'Build, document, test and deploy one production-style API.', 12, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / ML Engineer',
    track: 'Applied AI',
    fitFor: 'Machine learning products, data teams, AI startups',
    summary: 'Learn the mathematical, coding and model-development workflow required for applied machine learning roles.',
    interviewFocus: ['Python', 'ML concepts', 'statistics', 'model evaluation', 'projects'],
    keywords: ['ai', 'ml', 'machine learning', 'python', 'data science', 'artificial intelligence'],
    modules: [
      {
        id: 'ml-python',
        title: 'Python & Data Stack',
        subtitle: 'The working toolkit for ML experiments.',
        icon: Code2,
        topics: [
          topic('ml-python-core', 'Python Programming', 'Functions, classes, collections, comprehensions and environments.', 10, 'Foundation'),
          topic('ml-numpy', 'NumPy', 'Arrays, vectorized computation and numerical operations.', 5, 'Foundation'),
          topic('ml-pandas', 'Pandas', 'Cleaning, transforming and analyzing tabular datasets.', 7),
          topic('ml-viz', 'Data Visualization', 'Communicate distributions, trends and model behavior clearly.', 4)
        ]
      },
      {
        id: 'ml-math',
        title: 'Math & Statistics',
        subtitle: 'Understand why models work, not only how to call libraries.',
        icon: BrainCircuit,
        topics: [
          topic('ml-linear', 'Linear Algebra Basics', 'Vectors, matrices, dot products and transformations.', 8),
          topic('ml-probability', 'Probability & Statistics', 'Distributions, expectation, variance and conditional probability.', 10),
          topic('ml-calculus', 'Calculus for Optimization', 'Derivatives, gradients and optimization intuition.', 6),
          topic('ml-metrics', 'Evaluation Metrics', 'Precision, recall, F1, ROC-AUC, regression metrics and validation.', 6, 'Interview')
        ]
      },
      {
        id: 'ml-core',
        title: 'Machine Learning Core',
        subtitle: 'Train, evaluate and improve common models.',
        icon: Sparkles,
        topics: [
          topic('ml-supervised', 'Supervised Learning', 'Linear/logistic regression, trees and ensemble methods.', 12),
          topic('ml-unsupervised', 'Unsupervised Learning', 'Clustering, dimensionality reduction and use cases.', 6),
          topic('ml-feature', 'Feature Engineering', 'Encoding, scaling, leakage prevention and feature selection.', 6),
          topic('ml-pipeline', 'Model Pipelines', 'Train/validation/test workflow, reproducibility and experiment tracking.', 7)
        ]
      },
      {
        id: 'ml-production',
        title: 'Applied AI Portfolio',
        subtitle: 'Demonstrate end-to-end engineering ability.',
        icon: BriefcaseBusiness,
        topics: [
          topic('ml-deep', 'Deep Learning Basics', 'Neural networks, training loops and when deep learning is appropriate.', 10),
          topic('ml-api', 'Serve a Model', 'Expose inference through an API with validation and monitoring basics.', 6),
          topic('ml-project', 'End-to-End ML Project', 'Dataset → model → evaluation → deployment → explanation.', 16, 'Interview'),
          topic('ml-explain', 'Explain Your Model', 'Tradeoffs, errors, bias, limitations and business impact.', 5, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    track: 'Analytics',
    fitFor: 'Business analytics, product analytics, operations',
    summary: 'Turn raw data into reliable analysis, dashboards and actionable business insights.',
    interviewFocus: ['SQL', 'Excel', 'statistics', 'dashboards', 'case studies'],
    keywords: ['data analyst', 'analytics', 'sql', 'excel', 'power bi', 'tableau'],
    modules: [
      {
        id: 'da-data',
        title: 'Data Handling',
        subtitle: 'Work confidently with structured data.',
        icon: Database,
        topics: [
          topic('da-excel', 'Excel / Sheets', 'Lookups, pivots, formulas, cleaning and analysis workflows.', 9, 'Foundation'),
          topic('da-sql', 'SQL', 'Filtering, joins, CTEs, aggregation and window functions.', 14),
          topic('da-clean', 'Data Cleaning', 'Missing values, duplicates, types and quality checks.', 5),
          topic('da-python', 'Python for Analysis', 'Pandas-based analysis for larger or repeatable workflows.', 8)
        ]
      },
      {
        id: 'da-stats',
        title: 'Statistics & Business Thinking',
        subtitle: 'Move from numbers to defensible conclusions.',
        icon: BrainCircuit,
        topics: [
          topic('da-stats-basic', 'Descriptive Statistics', 'Mean, median, variance, distributions and outliers.', 5),
          topic('da-hypothesis', 'Hypothesis Testing Basics', 'Confidence intervals, tests and interpretation.', 6),
          topic('da-metrics', 'Product / Business Metrics', 'Funnels, retention, conversion and cohort thinking.', 6),
          topic('da-story', 'Insight Storytelling', 'Explain the so-what, impact and recommendation.', 4, 'Interview')
        ]
      },
      {
        id: 'da-bi',
        title: 'Visualization & BI',
        subtitle: 'Create dashboards people can actually use.',
        icon: Gauge,
        topics: [
          topic('da-charts', 'Chart Selection', 'Choose visuals that fit comparisons, trends and distributions.', 4),
          topic('da-bi-tool', 'Power BI / Tableau', 'Data models, measures and interactive dashboard construction.', 10),
          topic('da-dashboard', 'Dashboard Design', 'Hierarchy, filters, KPIs and decision-focused layout.', 6),
          topic('da-present', 'Presentation Skills', 'Present findings clearly to technical and non-technical audiences.', 4)
        ]
      },
      {
        id: 'da-case',
        title: 'Portfolio & Interview',
        subtitle: 'Practice realistic analytics problems.',
        icon: BriefcaseBusiness,
        topics: [
          topic('da-case-study', 'Analytics Case Studies', 'Practice ambiguous questions and structured analysis.', 10, 'Interview'),
          topic('da-sql-interview', 'SQL Interview Practice', 'Timed joins, windows and aggregation problems.', 10, 'Interview'),
          topic('da-project', 'Analytics Portfolio Project', 'Raw dataset → analysis → dashboard → recommendations.', 12, 'Interview'),
          topic('da-resume', 'Resume Impact Bullets', 'Quantify findings, decisions and outcomes.', 3, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'devops',
    title: 'Cloud / DevOps Engineer',
    track: 'Cloud Engineering',
    fitFor: 'Infrastructure, platform, reliability teams',
    summary: 'Build the Linux, cloud, networking, CI/CD and container foundations required for DevOps roles.',
    interviewFocus: ['Linux', 'networking', 'Docker', 'CI/CD', 'cloud fundamentals'],
    keywords: ['devops', 'cloud', 'aws', 'docker', 'linux', 'kubernetes', 'sre'],
    modules: [
      {
        id: 'do-linux',
        title: 'Linux & Networking',
        subtitle: 'Core operating-system and network fundamentals.',
        icon: TerminalSquare,
        topics: [
          topic('do-linux-cli', 'Linux Command Line', 'Files, processes, permissions, services and package management.', 10, 'Foundation'),
          topic('do-shell', 'Shell Scripting', 'Automate repeatable operational tasks.', 6),
          topic('do-network', 'Networking Basics', 'IP, DNS, ports, HTTP/S, routing and troubleshooting.', 9),
          topic('do-git', 'Git for Teams', 'Branching, merges, pull requests and release workflows.', 4)
        ]
      },
      {
        id: 'do-cloud',
        title: 'Cloud Fundamentals',
        subtitle: 'Understand the building blocks of a cloud platform.',
        icon: CloudCog,
        topics: [
          topic('do-compute', 'Compute & Virtual Machines', 'Instances, images, scaling and basic security.', 6),
          topic('do-storage', 'Cloud Storage', 'Object/block storage concepts and lifecycle choices.', 4),
          topic('do-network-cloud', 'Cloud Networking', 'VPC/VNet, subnets, gateways and security groups.', 7),
          topic('do-iam', 'IAM Fundamentals', 'Users, roles, policies and least privilege.', 5)
        ]
      },
      {
        id: 'do-containers',
        title: 'Containers & Delivery',
        subtitle: 'Package and ship applications consistently.',
        icon: Layers3,
        topics: [
          topic('do-docker', 'Docker', 'Images, containers, Dockerfiles, volumes and networks.', 9),
          topic('do-cicd', 'CI/CD Pipelines', 'Build, test and deploy automation.', 8),
          topic('do-k8s', 'Kubernetes Basics', 'Pods, deployments, services and configuration.', 10),
          topic('do-iac', 'Infrastructure as Code Basics', 'Declarative infrastructure and repeatable environments.', 6)
        ]
      },
      {
        id: 'do-ops',
        title: 'Operations & Interview',
        subtitle: 'Learn how production systems are observed and recovered.',
        icon: ShieldCheck,
        topics: [
          topic('do-monitor', 'Monitoring & Logging', 'Metrics, logs, alerts and basic observability.', 6),
          topic('do-security', 'Cloud Security Basics', 'Secrets, patching, network controls and access reviews.', 5),
          topic('do-trouble', 'Troubleshooting Practice', 'Structured debugging for service and deployment failures.', 8, 'Interview'),
          topic('do-project', 'Cloud Deployment Project', 'Containerize and deploy a real app with CI/CD and monitoring.', 14, 'Interview')
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    track: 'Security',
    fitFor: 'SOC, security operations, defensive security',
    summary: 'Build practical foundations in networking, systems, security controls, monitoring and incident analysis.',
    interviewFocus: ['networking', 'Linux', 'security fundamentals', 'logs', 'incident response'],
    keywords: ['cybersecurity', 'security', 'soc', 'network', 'linux', 'defensive'],
    modules: [
      {
        id: 'sec-foundation',
        title: 'Security Foundations',
        subtitle: 'Understand systems before trying to defend them.',
        icon: ShieldCheck,
        topics: [
          topic('sec-network', 'Networking Fundamentals', 'TCP/IP, DNS, HTTP/S, ports and common protocols.', 10, 'Foundation'),
          topic('sec-linux', 'Linux Fundamentals', 'Users, permissions, processes, logs and services.', 8, 'Foundation'),
          topic('sec-models', 'Security Principles', 'CIA triad, least privilege, defense in depth and threat modeling.', 5),
          topic('sec-crypto', 'Cryptography Basics', 'Hashing, encryption, certificates and TLS concepts.', 5)
        ]
      },
      {
        id: 'sec-threats',
        title: 'Threats & Defensive Controls',
        subtitle: 'Recognize common attacks and how organizations reduce risk.',
        icon: Target,
        topics: [
          topic('sec-web', 'Web Security Basics', 'Authentication risks, injection, XSS and secure input handling.', 8),
          topic('sec-malware', 'Malware & Phishing Concepts', 'Common delivery methods and defensive indicators.', 5),
          topic('sec-identity', 'Identity & Access Management', 'Accounts, MFA, permissions and access review basics.', 5),
          topic('sec-vuln', 'Vulnerability Management', 'Scanning concepts, prioritization and remediation workflows.', 6)
        ]
      },
      {
        id: 'sec-soc',
        title: 'SOC & Log Analysis',
        subtitle: 'Practice the daily work of defensive monitoring.',
        icon: Gauge,
        topics: [
          topic('sec-logs', 'Windows / Linux Logs', 'Identify useful event sources and suspicious patterns.', 8),
          topic('sec-siem', 'SIEM Fundamentals', 'Search, correlation, alerts and investigation workflow.', 8),
          topic('sec-network-logs', 'Network Traffic Analysis', 'Interpret connections, DNS activity and basic flow data.', 7),
          topic('sec-ir', 'Incident Response Basics', 'Triage, containment, evidence preservation and lessons learned.', 6)
        ]
      },
      {
        id: 'sec-career',
        title: 'Portfolio & Interview',
        subtitle: 'Show practical defensive-security thinking.',
        icon: BriefcaseBusiness,
        topics: [
          topic('sec-lab', 'Home Security Lab', 'Create a safe local lab for log collection and analysis.', 10, 'Interview'),
          topic('sec-report', 'Security Incident Report', 'Write a concise investigation and remediation report.', 5, 'Interview'),
          topic('sec-case', 'Incident Case Practice', 'Walk through alert triage and explain decisions.', 8, 'Interview'),
          topic('sec-resume', 'Security Resume Preparation', 'Highlight labs, tools, findings and defensive outcomes.', 3, 'Interview')
        ]
      }
    ]
  }
];

const allTopics = (role: TargetRole) => role.modules.flatMap(module => module.topics);

export const TargetJobsView: React.FC = () => {
  const { currentUser, profile, showToast } = useApp();
  const [query, setQuery] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    const goal = profile.careerGoal.toLowerCase();
    return TARGET_ROLES.find(role => role.keywords.some(keyword => goal.includes(keyword)))?.id || 'fullstack';
  });
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [customStudied, setCustomStudied] = useState<Record<string, string[]>>({});
  const [customTopic, setCustomTopic] = useState('');

  const progressKey = currentUser ? `soe_target_jobs_progress_${currentUser.id}` : '';
  const notesKey = currentUser ? `soe_target_jobs_notes_${currentUser.id}` : '';
  const customKey = currentUser ? `soe_target_jobs_custom_${currentUser.id}` : '';

  useEffect(() => {
    if (!currentUser) return;
    try {
      const savedProgress = localStorage.getItem(progressKey);
      const savedNotes = localStorage.getItem(notesKey);
      const savedCustom = localStorage.getItem(customKey);
      setCompleted(savedProgress ? JSON.parse(savedProgress) : {});
      setNotes(savedNotes ? JSON.parse(savedNotes) : {});
      setCustomStudied(savedCustom ? JSON.parse(savedCustom) : {});
    } catch {
      setCompleted({});
      setNotes({});
      setCustomStudied({});
    }
  }, [currentUser?.id, progressKey, notesKey, customKey]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(progressKey, JSON.stringify(completed));
  }, [completed, progressKey, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(notesKey, JSON.stringify(notes));
  }, [notes, notesKey, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(customKey, JSON.stringify(customStudied));
  }, [customStudied, customKey, currentUser]);

  const addCustomStudiedTopic = () => {
    const value = customTopic.trim();
    if (!value) return;
    setCustomStudied(prev => {
      const existing = prev[selectedRoleId] || [];
      if (existing.some(item => item.toLowerCase() === value.toLowerCase())) return prev;
      return { ...prev, [selectedRoleId]: [...existing, value] };
    });
    setCustomTopic('');
    showToast('Added to your studied-topic record.');
  };

  const removeCustomStudiedTopic = (value: string) => {
    setCustomStudied(prev => ({
      ...prev,
      [selectedRoleId]: (prev[selectedRoleId] || []).filter(item => item !== value)
    }));
  };

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TARGET_ROLES;
    return TARGET_ROLES.filter(role =>
      role.title.toLowerCase().includes(q) ||
      role.track.toLowerCase().includes(q) ||
      role.keywords.some(keyword => keyword.includes(q) || q.includes(keyword))
    );
  }, [query]);

  const selectedRole = TARGET_ROLES.find(role => role.id === selectedRoleId) || TARGET_ROLES[0];
  const selectedTopics = allTopics(selectedRole);
  const completedForRole = completed[selectedRole.id] || [];
  const completedCount = selectedTopics.filter(item => completedForRole.includes(item.id)).length;
  const totalHours = selectedTopics.reduce((sum, item) => sum + item.hours, 0);
  const completedHours = selectedTopics
    .filter(item => completedForRole.includes(item.id))
    .reduce((sum, item) => sum + item.hours, 0);
  const progress = Math.round((completedCount / Math.max(1, selectedTopics.length)) * 100);
  const remainingHours = Math.max(0, totalHours - completedHours);

  const toggleTopic = (topicId: string) => {
    setCompleted(prev => {
      const existing = prev[selectedRole.id] || [];
      const next = existing.includes(topicId)
        ? existing.filter(id => id !== topicId)
        : [...existing, topicId];
      return { ...prev, [selectedRole.id]: next };
    });
  };

  const completeModule = (module: SyllabusModule) => {
    setCompleted(prev => {
      const existing = new Set(prev[selectedRole.id] || []);
      module.topics.forEach(item => existing.add(item.id));
      return { ...prev, [selectedRole.id]: Array.from(existing) };
    });
    showToast(`${module.title} marked complete.`);
  };

  const resetRoleProgress = () => {
    if (!confirm(`Reset study progress for ${selectedRole.title}?`)) return;
    setCompleted(prev => ({ ...prev, [selectedRole.id]: [] }));
    showToast(`${selectedRole.title} study progress reset.`);
  };

  const chooseRole = (id: string) => {
    setSelectedRoleId(id);
    const role = TARGET_ROLES.find(item => item.id === id);
    if (role) {
      setOpenModules({ [role.modules[0].id]: true });
    }
  };

  const toggleModule = (moduleId: string, currentlyOpen: boolean) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !currentlyOpen }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="target-jobs-page w-full space-y-5 pb-20 lg:pb-10"
    >
      <section className="target-jobs-hero relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-slate-200 bg-slate-950 text-white p-4 sm:p-7 lg:p-8 shadow-xl">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl ambient-orb" />
        <div className="absolute -left-16 -bottom-24 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl ambient-orb" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-300">
              <Target className="h-3.5 w-3.5" />
              Career Target Workspace
            </div>
            <h1 className="mt-3 sm:mt-4 max-w-3xl text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Outfit',sans-serif] leading-[1.03]">
              Pick a job. See the syllabus. Track what you have actually learned.
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-6 text-slate-300">
              Search a target role, open its structured study plan, mark completed topics and instantly see what remains before you are interview-ready.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: 'Completed', value: `${completedCount}/${selectedTopics.length}` },
              { label: 'Progress', value: `${progress}%` },
              { label: 'Hours Left', value: `${remainingHours}h` }
            ].map(item => (
              <div key={item.label} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.06] p-2 sm:p-3 text-center backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-black font-mono text-white">{item.value}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Search Target Job</label>
            <div className="relative mt-2">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="e.g. AI Engineer, Frontend, DevOps"
                className="w-full rounded-2xl border border-slate-200 bg-ivory-50 py-3 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>{filteredRoles.length} career tracks</span>
              <span>Search → Select → Study</span>
            </div>
          </div>

          <div className="target-role-list grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {filteredRoles.map((role, index) => {
              const roleTopics = allTopics(role);
              const done = (completed[role.id] || []).length;
              const pct = Math.round((done / Math.max(1, roleTopics.length)) * 100);
              const active = selectedRole.id === role.id;
              return (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.035, 0.2) }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => chooseRole(role.id)}
                  className={`group text-left rounded-2xl border p-3.5 transition-all ${
                    active
                      ? 'border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className={`text-[10px] font-black uppercase tracking-[0.12em] ${active ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {role.track}
                      </div>
                      <div className="mt-1 text-sm font-black text-slate-950 font-['Outfit',sans-serif]">{role.title}</div>
                    </div>
                    <div className={`shrink-0 rounded-xl px-2 py-1 text-[10px] font-black font-mono ${active ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {pct}%
                    </div>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate-500">{role.fitFor}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </motion.button>
              );
            })}

            {filteredRoles.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center">
                <Search className="mx-auto h-5 w-5 text-slate-400" />
                <p className="mt-2 text-xs font-bold text-slate-700">No matching role yet.</p>
                <p className="mt-1 text-[11px] text-slate-500">Try “frontend”, “AI”, “backend”, “data”, “cloud” or “security”.</p>
              </div>
            )}
          </div>
        </aside>

        <main className="min-w-0 space-y-4">
          <section className="rounded-[26px] border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{selectedRole.track}</span>
                  <span className="rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-[10px] font-black text-gold-600">
                    {selectedTopics.length} syllabus topics
                  </span>
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-['Outfit',sans-serif]">{selectedRole.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedRole.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedRole.interviewFocus.map(item => (
                    <span key={item} className="rounded-xl border border-slate-200 bg-ivory-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid w-full sm:min-w-[230px] grid-cols-[72px_1fr] sm:grid-cols-[92px_1fr] items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-slate-200 bg-ivory-50 p-3 sm:p-4">
                <div
                  className="relative flex h-[70px] w-[70px] sm:h-[88px] sm:w-[88px] items-center justify-center rounded-full"
                  style={{ background: `conic-gradient(#21845f ${progress * 3.6}deg, #e2dad3 0deg)` }}
                >
                  <div className="flex h-[54px] w-[54px] sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full bg-white shadow-inner">
                    <span className="text-lg font-black font-mono text-slate-950">{progress}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">Role readiness</div>
                  <div className="mt-1 text-xs font-bold text-slate-700">{completedHours}h studied</div>
                  <div className="text-xs text-slate-500">{remainingHours}h estimated remaining</div>
                  <button onClick={resetRoleProgress} className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-rose-600">
                    <RotateCcw className="h-3 w-3" /> Reset role
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">Structured Syllabus</div>
                <h3 className="text-xl font-black text-slate-950 font-['Outfit',sans-serif]">What to study for this job</h3>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <ListChecks className="h-4 w-4 text-emerald-600" />
                Tick a topic after you have genuinely studied it
              </div>
            </div>

            {selectedRole.modules.map((module, moduleIndex) => {
              const Icon = module.icon;
              const moduleDone = module.topics.filter(item => completedForRole.includes(item.id)).length;
              const moduleProgress = Math.round((moduleDone / module.topics.length) * 100);
              const isOpen = openModules[module.id] ?? moduleIndex === 0;

              return (
                <motion.article
                  key={module.id}
                  layout
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleModule(module.id, isOpen)}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`target-module-${module.id}`}
                    className="w-full p-4 sm:p-5 text-left hover:bg-ivory-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${moduleProgress === 100 ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {moduleProgress === 100 ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-black text-slate-950 font-['Outfit',sans-serif]">{module.title}</h4>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black font-mono text-slate-600">
                            {moduleDone}/{module.topics.length}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500">{module.subtitle}</p>
                      </div>
                      <div className="hidden sm:flex w-28 items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${moduleProgress}%` }} />
                        </div>
                        <span className="w-8 text-right text-[10px] font-black font-mono text-slate-500">{moduleProgress}%</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      id={`target-module-${module.id}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                        <div className="border-t border-slate-100 px-3 pb-3 sm:px-5 sm:pb-5">
                          <div className="divide-y divide-slate-100">
                            {module.topics.map(item => {
                              const done = completedForRole.includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => toggleTopic(item.id)}
                                  className="group w-full py-3 text-left"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                                      done
                                        ? 'border-emerald-700 bg-emerald-700 text-white'
                                        : 'border-slate-300 bg-white text-slate-300 group-hover:border-emerald-500 group-hover:text-emerald-500'
                                    }`}>
                                      {done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className={`text-xs sm:text-sm font-black font-['Outfit',sans-serif] ${done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                          {item.title}
                                        </span>
                                        <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                                          item.level === 'Foundation'
                                            ? 'bg-gold-50 text-gold-600'
                                            : item.level === 'Interview'
                                              ? 'bg-plum-50 text-plum-900'
                                              : 'bg-emerald-50 text-emerald-700'
                                        }`}>
                                          {item.level}
                                        </span>
                                      </div>
                                      <p className={`mt-1 text-[11px] sm:text-xs leading-5 ${done ? 'text-slate-400' : 'text-slate-500'}`}>{item.note}</p>
                                    </div>
                                    <div className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                                      {item.hours}h
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {moduleProgress < 100 && (
                            <button
                              onClick={() => completeModule(module)}
                              className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700 hover:bg-emerald-100"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Mark module complete
                            </button>
                          )}
                        </div>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_.8fr]">
            <div className="rounded-[26px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-gold-50 p-4 sm:p-5 shadow-sm xl:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <BookMarked className="h-4 w-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.15em]">Trusted Learning Channel</span>
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-slate-950 font-['Outfit',sans-serif]">What to study — and where to learn it</h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">English-first resources from trusted developer communities and major technology companies. Use these alongside the syllabus above instead of searching randomly.</p>
                </div>
                <div className="rounded-2xl border border-white bg-white/80 px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">Mapped to {selectedRole.title}</div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {TRUSTED_LEARNING_RESOURCES.map((resource, index) => (
                  <motion.a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ y: -5, rotate: index % 2 ? 0.4 : -0.4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${resource.type === 'YouTube' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'}`}>
                        {resource.type === 'YouTube' ? <PlayCircle className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                    </div>
                    <div className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{resource.provider} • {resource.type}</div>
                    <div className="mt-1 text-base font-black text-slate-950 font-['Outfit',sans-serif]">{resource.title}</div>
                    <p className="mt-1.5 text-xs leading-5 text-slate-600">{resource.note}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-plum-900" />
                <h3 className="text-sm font-black text-slate-950 font-['Outfit',sans-serif]">My Study Notes</h3>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Record extra topics you have already studied, then keep revision notes below. Custom topics are evidence only and do not artificially inflate syllabus progress.</p>

              <div className="mt-3 flex gap-2">
                <input
                  value={customTopic}
                  onChange={event => setCustomTopic(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addCustomStudiedTopic();
                    }
                  }}
                  placeholder="Add a topic you already studied"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-ivory-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={addCustomStudiedTopic}
                  className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-slate-950 px-3 py-2.5 text-[11px] font-black text-white hover:bg-black"
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              </div>

              {(customStudied[selectedRole.id] || []).length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {(customStudied[selectedRole.id] || []).map(item => (
                    <span key={item} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                      <Check className="h-3 w-3" />
                      {item}
                      <button type="button" onClick={() => removeCustomStudiedTopic(item)} className="ml-0.5 rounded-full p-0.5 hover:bg-emerald-100" aria-label={`Remove ${item}`}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <textarea
                value={notes[selectedRole.id] || ''}
                onChange={event => setNotes(prev => ({ ...prev, [selectedRole.id]: event.target.value }))}
                placeholder={`Notes for ${selectedRole.title}...`}
                className="mt-3 min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-ivory-50 p-3 text-sm leading-6 text-slate-800 outline-none focus:border-emerald-500"
              />
              <div className="mt-2 text-right text-[10px] font-bold text-slate-400">Saved automatically on this device</div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-4 sm:p-5 text-white shadow-sm">
              <div className="flex items-center gap-2 text-emerald-300">
                <Gauge className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.14em]">Next Study Decision</span>
              </div>
              {(() => {
                const nextTopic = selectedTopics.find(item => !completedForRole.includes(item.id));
                if (!nextTopic) {
                  return (
                    <div className="mt-4">
                      <div className="text-lg font-black font-['Outfit',sans-serif]">Syllabus complete.</div>
                      <p className="mt-1 text-xs leading-5 text-slate-400">Move to mock interviews, role-specific projects and real applications.</p>
                    </div>
                  );
                }
                return (
                  <div className="mt-4">
                    <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">Study next</div>
                    <div className="mt-1 text-lg font-black font-['Outfit',sans-serif]">{nextTopic.title}</div>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{nextTopic.note}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="rounded-xl bg-white/10 px-2.5 py-1.5 text-[10px] font-bold text-white">{nextTopic.hours}h estimate</span>
                      <span className="rounded-xl bg-emerald-400/10 px-2.5 py-1.5 text-[10px] font-bold text-emerald-300">{nextTopic.level}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        </main>
      </section>
    </motion.div>
  );
};
