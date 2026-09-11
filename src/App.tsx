import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { MobileNav } from './components/navigation/MobileNav';

// Views
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { CollegeCenterView } from './views/CollegeCenterView';
import { DiscoverView } from './views/DiscoverView';
import { IntelligenceView } from './views/IntelligenceView';
import { SimulatorView } from './views/SimulatorView';
import { SkillGapView } from './views/SkillGapView';
import { RoadmapView } from './views/RoadmapView';
import { TrackerView } from './views/TrackerView';
import { DeadlinesView } from './views/DeadlinesView';
import { RecoveryView } from './views/RecoveryView';
import { CareerView } from './views/CareerView';
import { ProfileView } from './views/ProfileView';
import { ReadinessView } from './views/ReadinessView';
import { AnalyticsView } from './views/AnalyticsView';
import { TargetJobsView } from './views/TargetJobsView';
import { AuthModal } from './components/auth/AuthModal';
import { CollegeSelectModal } from './components/college/CollegeSelectModal';
import { GuidedOnboarding } from './components/onboarding/GuidedOnboarding';
import { PortalChoiceModal } from './components/auth/PortalChoiceModal';
import { OrganizationView } from './views/OrganizationView';

import { 
  Sparkles, 
  RotateCcw, 
  Compass, 
  Milestone, 
  Kanban, 
  ShieldCheck,
  Heart,
  CheckCircle2,
  Building2,
  BarChart3
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, toastMessage, workspaceMode } = useApp();

  const renderActiveView = () => {
    if (!currentUser && activeTab !== 'landing') {
      return <LandingView />;
    }

    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'college':
        return <CollegeCenterView />;
      case 'dashboard':
        return <DashboardView />;
      case 'discover':
        return <DiscoverView />;
      case 'intelligence':
        return <IntelligenceView />;
      case 'readiness':
        return <ReadinessView />;
      case 'simulator':
        return <SimulatorView />;
      case 'gap':
        return <SkillGapView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'tracker':
        return <TrackerView />;
      case 'deadlines':
        return <DeadlinesView />;
      case 'recovery':
        return <RecoveryView />;
      case 'career':
        return <CareerView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'target-jobs':
        return <TargetJobsView />;
      case 'profile':
        return <ProfileView />;
      case 'organization':
        return <OrganizationView />;
      default:
        return <DashboardView />;
    }
  };

  const isLanding = activeTab === 'landing' || !currentUser;
  const hasPrivateWorkspace = Boolean(currentUser) && !isLanding;

  return (
    <div className="app-shell min-h-screen bg-ivory-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-600 selection:text-white relative">
      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-950 text-white shadow-2xl border border-slate-800 text-xs font-bold font-['Outfit',sans-serif]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex w-full relative">
        {/* Collapsible Sidebar (Hidden on landing page & mobile) */}
        {hasPrivateWorkspace && workspaceMode === 'student' && <Sidebar />}

        {/* Dynamic Animated View Container */}
        <main
          id="main-scroll-container"
          className={`flex-1 w-full overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto bg-transparent ${
            isLanding ? 'p-0 max-w-none' : 'private-workspace-main'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>

          {/* Standard Footer */}
          {hasPrivateWorkspace && (
            <footer className="private-workspace-footer mt-16 pt-8 pb-12 border-t border-slate-200 text-xs text-[#6b5a4f]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    SO
                  </div>
                  <span className="font-bold text-slate-900">
                    Student Opportunity Engine
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">Discover • Prepare • Apply • Track • Grow</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-medium flex-wrap">
                  <button
                    onClick={() => setActiveTab('college')}
                    className="hover:text-slate-900 transition-colors"
                  >
                    Campus Center
                  </button>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="hover:text-slate-900 transition-colors"
                  >
                    Discover
                  </button>
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="hover:text-slate-900 transition-colors"
                  >
                    Simulator
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="hover:text-slate-900 transition-colors"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="hover:text-slate-900 transition-colors"
                  >
                    14-Day Roadmap
                  </button>
                </div>
              </div>
              <div className="mt-3 text-center sm:text-left text-[11px] text-slate-400 font-medium">
                © 2026 Student Opportunity Engine. High-impact career acceleration platform for engineering and university students.
              </div>
            </footer>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {hasPrivateWorkspace && workspaceMode === 'student' && <MobileNav />}

      {/* Global Auth Modal */}
      <PortalChoiceModal />
      <AuthModal />

      {/* Global College Selection Modal */}
      <CollegeSelectModal />

      {/* Guided onboarding after first successful sign-in / registration */}
      <GuidedOnboarding />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
