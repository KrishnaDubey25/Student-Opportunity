# Student Opportunity Engine — Student + Organization Upgrade

## Added
- Get Started role gateway: Student / Organization.
- Same account can switch between Student and Organization workspaces.
- Organization Command Center with student directory (roll number, class, skills, progress), campus opportunity publishing/removal, applicant review, and targeted/campus messaging.
- Campus opportunities are injected into the matching college student feed.
- Student opportunity cards now show “Recommended for you” for strong profile matches.
- Hackathon application flow supports Individual / Team, team name and member entries.
- Applications appear in the organization dashboard with review status controls.
- Campus messages are converted to student notifications at sign-in.
- Browser storage-event synchronization for organization posts/applications/messages across tabs/windows on the same origin.
- Stronger dark/violet/emerald organization UI with motion and improved contrast.

## Cross-device note
This project currently has no shared cloud database/API credentials. localStorage cannot synchronize two different computers. The shared data layer is isolated behind context actions (`publishCampusOpportunity`, `submitOpportunityApplication`, `sendCampusMessage`, etc.), so it can be connected to Supabase/Firebase/backend later without rebuilding the UI.
