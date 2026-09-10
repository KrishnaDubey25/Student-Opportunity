import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  User,
  Award,
  Save,
  X,
  Trophy
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    college: profile.college || '',
    degree: profile.degree || '',
    year: profile.year || '',
    cgpa: profile.gpa || '',
    skills: (profile.skills || []).map(s => typeof s === 'string' ? s : s.name),
    github: '',
    linkedin: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmed]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSave = () => {
    const formattedSkills = formData.skills.map(s => {
      const existing = (profile.skills || []).find(ps => (typeof ps === 'string' ? ps : ps.name) === s);
      if (existing && typeof existing !== 'string') return existing;
      return { name: s, level: 'Intermediate' as const, proficiency: 78 };
    });

    updateProfile({
      name: formData.name,
      college: formData.college,
      degree: formData.degree,
      year: formData.year,
      gpa: String(formData.cgpa),
      skills: formattedSkills
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const achievementsList = profile.achievements || [];
  const unlockedCount = achievementsList.filter(a => a.unlocked).length;

  const profileStrength = Math.min(
    100,
    Math.round(
      (formData.name ? 15 : 0) +
      (formData.college ? 15 : 0) +
      (formData.degree ? 15 : 0) +
      (formData.cgpa ? 15 : 0) +
      (formData.skills.length >= 5 ? 20 : formData.skills.length * 4) +
      (formData.github ? 10 : 0) +
      (formData.linkedin ? 10 : 0)
    )
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 pb-20 max-w-4xl mx-auto bg-white"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[11px] font-bold mb-2 font-mono">
            <User className="w-3.5 h-3.5 text-slate-900" />
            <span>Profile Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Candidate Credentials
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Parameters configured here calibrate your instant eligibility and match algorithms.
          </p>
        </div>

        {/* Level / XP Counter */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-base shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 font-mono">
              Level {profile.level || 7} {profile.levelTitle || 'Scout'}
            </div>
            <div className="text-base font-black text-slate-900 font-mono">
              {profile.xp || 3450} XP
            </div>
          </div>
        </div>
      </div>

      {/* Profile Strength Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex justify-between items-center text-xs font-bold font-['Outfit',sans-serif]">
          <span className="text-slate-800">
            Profile Strength
          </span>
          <span className="text-slate-900 font-mono">{profileStrength}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-slate-900 h-full rounded-full transition-all duration-700"
            style={{ width: `${profileStrength}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          Completing links and verifying competencies improves match precision.
        </p>
      </div>

      {/* GAMIFICATION BADGES */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 font-['Outfit',sans-serif]">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Achievements</span>
          </h2>
          <span className="text-[11px] font-semibold text-slate-400 font-mono">
            {unlockedCount} / {achievementsList.length || 6} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {achievementsList.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -2 }}
              className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-1 transition-all ${
                badge.unlocked 
                  ? 'border-amber-200/80 bg-amber-50/40 text-slate-900' 
                  : 'border-slate-200/60 bg-slate-50/40 text-slate-400 opacity-60'
              }`}
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-xs font-bold text-slate-900 font-['Outfit',sans-serif]">
                {badge.title}
              </span>
              <span className="text-[10px] text-slate-500 line-clamp-1">
                {badge.description}
              </span>
              {badge.unlocked ? (
                <span className="text-[9px] font-bold text-amber-600 font-mono">+{badge.xpReward} XP</span>
              ) : (
                <span className="text-[9px] text-slate-400 font-mono">Locked</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* EDIT PROFILE FORM */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
            Academic & Contact Details
          </h2>
          {saveSuccess && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-mono">
              Saved Successfully ✓
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Institution
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Program & Major
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                CGPA
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              GitHub URL
            </label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              LinkedIn URL
            </label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Verified Skills Management */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <label className="block text-xs font-bold text-slate-800 font-['Outfit',sans-serif]">
            Verified Competencies ({formData.skills.length})
          </label>

          <div className="flex flex-wrap gap-1.5">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold font-mono"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2 max-w-sm pt-1">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Docker, Rust)..."
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors font-['Outfit',sans-serif]"
            >
              Add
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 font-['Outfit',sans-serif]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
