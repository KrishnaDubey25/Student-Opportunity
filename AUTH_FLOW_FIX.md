# Auth Flow Fix

- Landing page has only Get Started as the authentication entry point.
- Get Started opens Student / Organization portal choice first.
- Student and Organization authentication roles are stored separately from the logged-in workspace role.
- Organization registration stays in the Organization auth flow.
- Organization login always routes to Organization Dashboard, never Student Dashboard/Discover/Profile.
- Student login routes only to student workspace.
