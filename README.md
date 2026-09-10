# Student Opportunity Engine

A private, student-focused opportunity and career preparation workspace built with React, TypeScript, Vite, Tailwind CSS and Motion.

## Core flow

1. **Register** with an institutional college/university email.
2. **Sign in** separately with the registered college email.
3. Complete the **3-step guided setup**: campus profile, interests & skills, and career direction.
4. Enter the **private student workspace**. Public visitors cannot open the dashboard or private navigation.

Each registered account keeps its profile, application state, preparation progress, roadmap, Target Jobs progress, notes and campus connections in account-scoped browser storage.

## Target Jobs

The Target Jobs workspace lets students:
- search role-based career tracks;
- open a structured syllabus for the selected role;
- mark individual topics or modules as studied;
- see completed topics, remaining topics and estimated study hours;
- add extra topics they have already studied;
- maintain role-specific notes;
- see the next recommended study topic.

## Campus network

Campus matching uses other **actually registered same-campus profiles** available to the app. Hard-coded student profiles are not used. If no other same-campus account is available, the interface shows an empty state instead of invented people.

## UI / UX

- white/ivory base with charcoal, emerald, wine, terracotta and gold contrast;
- animated landing experience and authenticated workspace;
- compact mobile dashboard tiles and one-tap bottom navigation;
- responsive Target Jobs syllabus and guided onboarding;
- reduced-motion accessibility support.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Validate and build

```bash
npm run lint
npm run build
```

## Deploy to Vercel

```bash
vercel --prod
```

No API key or environment variable is required for the current local-first application.

> Note: authentication and account data are browser-local in this version. For a real production deployment with users across devices, replace local storage authentication with a secure backend/auth provider and database.
