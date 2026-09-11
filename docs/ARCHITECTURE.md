# Architecture

## Application Layers

### 1. App shell and routing state
`src/App.tsx` controls the main application flow and switches between the public landing experience, authentication/onboarding, student views, and organization views.

### 2. Shared state
`src/context/AppContext.tsx` is the central state layer. It owns account/session data, profile state, opportunity/application state, target-job progress, organization actions, and browser persistence.

### 3. College-aware data
- `src/data/colleges.ts` contains supported institution definitions and college metadata.
- `src/data/campusOpportunities.ts` provides campus-specific opportunity catalogs.
- `src/data/mockData.ts` contains shared demo data used across the product.
- `src/hooks/useCampusOperations.ts` exposes campus/organization workflow helpers.

The current signed-in account determines which college-specific data is shown. National/global opportunities are intentionally shared across colleges.

### 4. Views
`src/views/` contains the major product surfaces, including Dashboard, Discover, Tracker, Target Jobs, Profile, Analytics, College Center, Organization, Readiness, Roadmap, and other career-intelligence views.

### 5. Reusable components
`src/components/` contains reusable authentication, navigation, onboarding, charting, opportunity, college, and readiness components.

### 6. Persistence and live demo sync
The prototype stores data in browser localStorage. BroadcastChannel/local browser events are used for same-browser live updates between student and organization flows where supported.

## Primary User Flow

```text
Landing
  → Choose Student / Organization
  → Register or Sign In
  → Institution-bound account
  → Guided setup (student)
  → Private role workspace
  → Opportunities / preparation / applications / campus operations
```

## Data Isolation Model

- Student and organization authentication paths are separate.
- Student campus context is resolved from the registered account rather than a public landing-page choice.
- Campus-specific opportunities are filtered by the resolved institution.
- Organization-published opportunities are scoped to that organization/campus.
- National/global opportunities remain visible across institutions.

## Production Extension Path

For production, keep the UI/state contracts and replace browser-only persistence with:

1. Secure authentication provider
2. Database-backed user, organization, opportunity, and application records
3. Server authorization for role/campus isolation
4. Object storage for uploaded proofs/profile media
5. Real-time subscriptions or WebSockets for cross-device updates
6. Audit logging and admin controls
