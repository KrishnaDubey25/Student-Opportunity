import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { COLLEGES_LIST } from '../../data/colleges';
import {
  X,
  Mail,
  Lock,
  User,
  School,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  BadgeCheck
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    selectedCollege,
    setSelectedCollege,
    workspaceMode
  } = useApp();

  // Login Fields
  const [loginEmailOrId, setLoginEmailOrId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Register Fields
  const [fullName, setFullName] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [studentRollId, setStudentRollId] = useState('');
  const [selectedCollegeName, setSelectedCollegeName] = useState(selectedCollege.name);
  const [degree, setDegree] = useState('B.Tech in Computer Engineering');
  const [year, setYear] = useState('Third Year (Junior)');
  const [registerPassword, setRegisterPassword] = useState('');

  // Status State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen && authModalTab === 'register') {
      setSelectedCollegeName(selectedCollege.name);
    }
  }, [isAuthModalOpen, authModalTab, selectedCollege.name]);

  if (!isAuthModalOpen) return null;

  // Email format validation helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isInstitutionalEmail = (email: string) => {
    const domain = email.trim().toLowerCase().split('@')[1] || '';
    const publicDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com', 'proton.me'];
    return isValidEmail(email) && !publicDomains.includes(domain);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const query = loginEmailOrId.trim();
    if (!query) {
      setErrorMessage('Please enter the college email used during registration.');
      return;
    }
    if (!isValidEmail(query)) {
      setErrorMessage('Sign in requires a valid registered college email address.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(query, loginPassword, rememberMe);
      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid credentials. Please verify and try again.');
      } else {
        setSuccessNotice(workspaceMode === 'organization' ? 'Sign-in verified. Opening organization workspace...' : 'Sign-in verified. Opening your private student workspace...');
      }
    }, 200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage(workspaceMode === 'organization' ? 'Please enter the account holder name.' : 'Please enter your full name.');
      return;
    }

    if (!collegeEmail.trim()) {
      setErrorMessage('Please enter your institutional email address.');
      return;
    }

    if (!isInstitutionalEmail(collegeEmail)) {
      setErrorMessage('Please use your institutional college/university email, not a personal email provider.');
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Find matching college or create info
      const matched = COLLEGES_LIST.find(c => 
        c.name.toLowerCase() === selectedCollegeName.toLowerCase() ||
        c.shortName.toLowerCase() === selectedCollegeName.toLowerCase()
      );

      const result = register(
        {
          name: fullName.trim(),
          studentIdOrEmail: collegeEmail.trim().toLowerCase(),
          password: registerPassword,
          college: selectedCollegeName,
          collegeCode: matched ? matched.code : undefined,
          degree,
          year,
          careerGoal: 'Software Engineer / AI Systems Engineer',
          studentRollId: studentRollId.trim() || undefined
        },
        rememberMe
      );

      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Failed to create account.');
      } else {
        setLoginEmailOrId(collegeEmail.trim().toLowerCase());
        setLoginPassword('');
        setRegisterPassword('');
        setAuthModalTab('login');
        setSuccessNotice('Account created successfully. Sign in with your college email to continue to guided setup.');
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="auth-premium-panel relative w-full max-w-xl bg-white rounded-[30px] border border-slate-200 shadow-2xl overflow-hidden z-10 my-4 sm:my-6"
        >
          {/* Header Banner */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-md">
                  SO
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight font-['Outfit',sans-serif]">
                    Student Opportunity Engine
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">
                    Verified Campus Career & Hackathon Network
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Switch Tabs */}
            <div className="mt-5 grid grid-cols-2 p-1 rounded-2xl bg-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab('login');
                  setErrorMessage(null);
                  setSuccessNotice(null);
                }}
                className={`py-2 rounded-xl transition-all font-['Outfit',sans-serif] ${
                  authModalTab === 'login'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Student Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab('register');
                  setErrorMessage(null);
                  setSuccessNotice(null);
                }}
                className={`py-2 rounded-xl transition-all font-['Outfit',sans-serif] ${
                  authModalTab === 'register'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                New Student Register
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-7">
            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
                {errorMessage.includes('already exists') && (
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmailOrId(collegeEmail);
                      setAuthModalTab('login');
                      setErrorMessage(null);
                    }}
                    className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors whitespace-nowrap"
                  >
                    Sign In Now
                  </button>
                )}
              </motion.div>
            )}

            {/* Success Message */}
            {successNotice && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{successNotice}</span>
              </motion.div>
            )}

            {authModalTab === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 font-['Outfit',sans-serif]">
                    Registered College Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginEmailOrId}
                      onChange={e => setLoginEmailOrId(e.target.value)}
                      placeholder="e.g. krishna@college.edu.in"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-800 font-['Outfit',sans-serif]">
                      Password *
                    </label>
                    <span className="text-[11px] text-slate-400">Min 6 characters</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>Remember login session</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-500 font-mono">
                    Private local session
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 font-['Outfit',sans-serif] mt-2"
                >
                  <span>{isSubmitting ? 'Signing in...' : 'Verify & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                    Full Student Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Krishna Sharma"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                      College Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={collegeEmail}
                        onChange={e => setCollegeEmail(e.target.value)}
                        placeholder="e.g. krishna@college.edu.in"
                        required
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                      Roll No / Student ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={studentRollId}
                      onChange={e => setStudentRollId(e.target.value)}
                      placeholder="e.g. 2024CS184"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                    />
                  </div>
                </div>

                {/* College Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800 font-['Outfit',sans-serif]">
                      College / University *
                    </label>
                    <span className="text-[10px] font-bold text-emerald-600 font-mono">
                      Institution
                    </span>
                  </div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedCollegeName}
                      onChange={e => setSelectedCollegeName(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all bg-white"
                    >
                      {COLLEGES_LIST.map(col => (
                        <option key={col.code} value={col.name}>
                          {col.name} ({col.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Select College Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-2">
                    {[
                      { short: 'SLRTCE', name: 'Shri L. R. Tiwari College of Engineering' },
                      { short: 'TCET', name: 'Thakur College of Engineering and Technology' },
                      { short: 'Atharva', name: 'Atharva College of Engineering (Atharva University)' },
                      { short: 'Mithibai', name: "SVKM's Mithibai College of Arts & Science" },
                      { short: 'VJTI', name: 'Veermata Jijabai Technological Institute' },
                      { short: 'SPIT', name: 'Sardar Patel Institute of Technology' }
                    ].map(col => (
                      <button
                        key={col.short}
                        type="button"
                        onClick={() => setSelectedCollegeName(col.name)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          selectedCollegeName === col.name
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {col.short}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                      Degree Track
                    </label>
                    <select
                      value={degree}
                      onChange={e => setDegree(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 font-medium bg-white"
                    >
                      <option>B.Tech in Computer Engineering</option>
                      <option>B.Tech in Artificial Intelligence & Data Science</option>
                      <option>B.Tech in Information Technology</option>
                      <option>B.Sc in Computer Science</option>
                      <option>BCA / MCA</option>
                      <option>Electronics & Telecommunication</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                      Academic Year
                    </label>
                    <select
                      value={year}
                      onChange={e => setYear(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 font-medium bg-white"
                    >
                      <option>First Year (Freshman)</option>
                      <option>Second Year (Sophomore)</option>
                      <option>Third Year (Junior)</option>
                      <option>Final Year (Senior)</option>
                      <option>Postgraduate / Masters</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-['Outfit',sans-serif]">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100 font-medium transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="save-local-pref"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                  />
                  <label htmlFor="save-local-pref" className="text-xs font-medium text-slate-600 cursor-pointer">
                    Save login session securely on this device
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 font-['Outfit',sans-serif] mt-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isSubmitting ? 'Registering Account...' : 'Register & Enter Student Dashboard'}</span>
                </motion.button>
              </form>
            )}

            {/* Privacy note */}
            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero external API keys required. 100% private in browser localStorage.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
