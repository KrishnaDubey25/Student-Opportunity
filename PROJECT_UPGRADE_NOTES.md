# V5 Upgrade Notes — Authenticated Career Workspace

## Authentication & privacy flow
- Public visitors can access the landing experience only.
- Dashboard, sidebar, mobile app navigation, opportunity intelligence and student workspaces are gated behind sign-in.
- Registration and sign-in are separate actions.
- Registration requires an institutional college/university email in the UI and a valid email in application logic.
- First successful sign-in opens the guided onboarding before the dashboard.
- The campus selected at registration is account-bound after sign-in.
- Legacy built-in sessions are rejected during session hydration.
- Each account receives clean, account-scoped progress instead of inheriting another user's workspace.

## Campus network
- Removed hard-coded student peer profiles.
- Interest matching now reads actually registered same-campus profiles.
- Match percentage is derived from shared interests and skills.
- Campus connections persist per logged-in account.
- A professional empty state appears when no same-campus peer account is available.

## Target Jobs
- Added a searchable role-based Target Jobs workspace.
- Each role contains structured syllabus modules, topic difficulty and estimated hours.
- Students can mark topics/modules complete and see remaining work.
- Role progress, notes and extra studied topics persist per account.
- Students can manually record additional topics they have studied without inflating syllabus completion.
- The next unfinished syllabus topic is surfaced automatically.

## UI / UX & mobile
- Strengthened landing and private workspace contrast using ivory, charcoal, emerald, wine and gold.
- Added ambient motion, sheen, card lift, animated progress and reduced-motion fallbacks.
- Mobile dashboard workspace cards become compact horizontal tiles.
- Mobile onboarding removes the large desktop-only side panel.
- Added compact bottom navigation: Home, Explore, Target, Track and Profile.
- Target Jobs layout and progress card are optimized for narrow screens.

## Data integrity
- Job-readiness scores now start at zero and grow from completed account actions.
- Hackathon readiness is calculated from profile evidence instead of an artificial baseline.
- Removed misleading fixed readiness pillar percentages from the dashboard.
- Button audit: all interactive button elements have an action or submit behavior.

## Tooling
- Removed unused Gemini, Express and dotenv dependencies.
- Removed the stale Bun lockfile so deployment can install from the current package.json.
- Vite configuration no longer depends on AI Studio environment variables.
- Current application requires no API key.

## V6 Focused Fixes
- Fixed Target Jobs syllabus disclosures with explicit accessible expand/collapse state and removed fragile auto-height disclosure animation.
- Added missing Target Jobs icon imports used by custom studied-topic controls.
- Removed remote photo banners from authenticated dashboard workspace cards.
- Removed opportunity organization logo images from opportunity cards for a lighter, text-first interface.
- Strengthened landing-page contrast with a framed hero stage, stronger dark/emerald/gold/wine accents, and clearer access-panel depth.
- Reduced inner-card visual weight and mobile density while keeping all primary actions available.

## V7 — Campus Context Only
- No global UI or workflow changes from V6.
- Added a compact Campus Snapshot inside College Center.
- Snapshot follows the authenticated college and shows college type/location, featured campus track, registered-campus interest trends, and registered-campus skill trends.
- Interest/skill pulse is calculated from actual registered profiles for the selected college; no fake student names were added.
