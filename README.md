# Student Opportunity Engine

Student Opportunity Engine is a hackathon-ready, local-first career and opportunity intelligence platform for students. It brings campus-specific opportunities, internships, hackathons, scholarships, readiness tracking, target-job preparation, application progress, and organization-side campus operations into one responsive web application.

## Problem

Students often discover opportunities across disconnected channels, miss eligibility details and deadlines, and lack a clear way to understand whether they are actually ready to apply. Colleges and student organizations also lack a unified view of applications, campus activity, and student progress.

## Solution

The platform creates a private student workspace after college registration and sign-in. The experience is scoped to the user's registered institution, while national and global opportunities remain available to everyone. Organizations get a separate workspace to publish opportunities, review applications, update statuses, assign tasks, and communicate with students.

## Core Features

- College-aware registration, sign-in, onboarding, and campus context
- College-specific hackathons, workshops, scholarships, internships, communities, and events
- Shared national/global opportunities such as large hackathons, open-source programs, and internships
- Personalized opportunity recommendations and match/readiness signals
- Student application tracker with organization-controlled review status
- Individual and team hackathon application flow
- Target Jobs workspace with syllabus, study progress, notes, and next-topic guidance
- Student profile, skills, projects, certificates, goals, and readiness context
- Campus rank/snapshot and student opportunity analytics
- Organization dashboard for student directory, applicant review, opportunity publishing, messages, tasks, and campus intelligence
- Same-browser live synchronization using local storage and BroadcastChannel
- Responsive, animated UI for desktop and mobile

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Lucide React
- Browser localStorage + BroadcastChannel for the current hackathon prototype

## Project Structure

```text
Student-Opportunity/
├── docs/
│   ├── ARCHITECTURE.md
│   └── DEMO_GUIDE.md
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── charts/
│   │   ├── college/
│   │   ├── navigation/
│   │   ├── onboarding/
│   │   ├── opportunities/
│   │   └── readiness/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Validate

```bash
npm run lint
npm run build
```

## Deploy

The project is Vite-compatible and can be deployed directly to Vercel:

```bash
vercel --prod
```

No API key or environment variable is required for the current hackathon prototype.

## Demo Notes

Use separate student and organization accounts during the demo. The student dashboard is private and should open only after registration/sign-in and onboarding. Campus content should follow the account's registered institution; national/global opportunities remain common across colleges.

For a judge-friendly walkthrough, see [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md). For the internal module layout and data flow, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Prototype Scope

This version is intentionally local-first for a fast, zero-setup hackathon demo. Authentication and account data are stored in the browser. A production rollout should replace this with secure server-side authentication, a database, and real-time backend services for cross-device synchronization.
