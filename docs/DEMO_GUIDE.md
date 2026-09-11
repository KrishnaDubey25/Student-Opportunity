# Hackathon Demo Guide

## Recommended 4–6 Minute Flow

### 1. Problem and landing page — 30 seconds
Explain that students currently search across scattered channels and often do not know what to apply for, whether they are eligible, or how ready they are.

### 2. College-aware student onboarding — 45 seconds
Create/sign in to a student account using one of the listed institutions. Show that the campus profile is derived from the registered account and not from a public-page campus selection.

### 3. Student dashboard — 60 seconds
Show:
- campus snapshot;
- recent campus updates;
- recommended opportunities;
- campus standing/readiness context.

Point out that campus-specific opportunities change with the signed-in college, while national/global opportunities remain shared.

### 4. Opportunity and application flow — 60 seconds
Open a hackathon or internship. Demonstrate eligibility/match context and submit an application. For a hackathon, show individual/team participation and team details.

### 5. Target Jobs / readiness — 60 seconds
Open Target Jobs, choose a role, review the syllabus, mark topics as studied, and show progress/next-topic guidance.

### 6. Organization workflow — 60 seconds
Sign in as an organization. Show the student/applicant view, open an application, review the submitted profile snapshot, and update status. Then switch back to the student flow to show that the status is reflected there.

## Judge Questions to Prepare For

**How is college isolation handled?**  
The registered account is bound to an institution. Campus-specific data and organization-published content are resolved against that institution, while national/global opportunities are shared.

**Is this using a backend?**  
The hackathon prototype is intentionally local-first and requires no API keys or environment variables. Browser storage is used for demo persistence; the architecture can be moved to a secure backend without changing the core UX model.

**What is intelligent about the platform?**  
The product combines profile evidence, eligibility, readiness, opportunity fit, career impact, application state, and target-role preparation into one decision workflow instead of only listing opportunities.

**What would be next after the hackathon?**  
Secure authentication, a database, organization verification, cross-device real-time updates, production analytics, and integrations with verified opportunity sources.

## Pre-Demo Checklist

- Run `npm install` and `npm run build` before presenting.
- Open the deployed link in a fresh browser profile if you want clean demo data.
- Prepare one student account and one organization account.
- Verify the chosen student college before the demo.
- Keep one team hackathon application ready to demonstrate.
- Test mobile responsiveness if judges may open the link on phones.
