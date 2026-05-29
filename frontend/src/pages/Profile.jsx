import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiGithub, FiLinkedin, FiCode, FiSave, FiEdit2, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, profile, updateProfile, syncProfileStats } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    githubUsername: profile?.githubUsername || '',
    linkedinUsername: profile?.linkedinUsername || '',
    leetcodeUsername: profile?.leetcodeUsername || '',
    codeforcesUsername: profile?.codeforcesUsername || '',
    codechefUsername: profile?.codechefUsername || '',
    skillsInput: profile?.skills?.join(', ') || ''
  });

  const [saving, setSaving] = useState(false);

  const handleEditToggle = () => {
    // Populate form data from fresh context values
    setFormData({
      username: user?.username || '',
      githubUsername: profile?.githubUsername || '',
      linkedinUsername: profile?.linkedinUsername || '',
      leetcodeUsername: profile?.leetcodeUsername || '',
      codeforcesUsername: profile?.codeforcesUsername || '',
      codechefUsername: profile?.codechefUsername || '',
      skillsInput: profile?.skills?.join(', ') || ''
    });
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const skillsArray = formData.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const result = await updateProfile({
      githubUsername: formData.githubUsername,
      linkedinUsername: formData.linkedinUsername,
      leetcodeUsername: formData.leetcodeUsername,
      codeforcesUsername: formData.codeforcesUsername,
      codechefUsername: formData.codechefUsername,
      skills: skillsArray
    });

    setSaving(false);
    if (result.success) {
      setIsEditing(false);
      // Trigger a profile sync immediately to capture fresh score values
      await syncProfileStats();
    }
  };

  const skills = profile?.skills || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Developer Profile
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-medium">
          Manage your portfolio, connected accounts, and technical skill stack
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Premium Portfolio Card */}
        <div className="glass-card p-6 border-slate-800 flex flex-col justify-between items-center text-center relative overflow-hidden bg-slate-900/40">
          <div className="absolute top-0 right-0 bg-sky-500/5 w-24 h-24 rounded-full blur-xl"></div>
          
          <div className="space-y-6 flex flex-col items-center w-full">
            {/* Custom avatar initial */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 border-2 border-sky-500/30 flex items-center justify-center font-black text-3xl text-slate-950 uppercase shadow-lg shadow-sky-500/10">
              {user?.username ? user.username.charAt(0) : 'U'}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-200">{user?.username}</h3>
              <p className="text-slate-400 text-xs font-semibold">{user?.email}</p>
            </div>

            <div className="h-px w-full bg-slate-800/60"></div>

            {/* List of accounts connected */}
            <div className="w-full text-left space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Connected Handles
              </span>

              {/* GitHub */}
              <div className="flex items-center justify-between text-xs text-slate-350 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                <span className="flex items-center gap-2 font-bold text-slate-400">
                  <FiGithub /> GitHub
                </span>
                <span className="font-semibold text-slate-300">
                  {profile?.githubUsername ? `@${profile.githubUsername}` : 'Not connected'}
                </span>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between text-xs text-slate-350 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                <span className="flex items-center gap-2 font-bold text-slate-400">
                  <FiLinkedin /> LinkedIn
                </span>
                <span className="font-semibold text-slate-300">
                  {profile?.linkedinUsername ? `@${profile.linkedinUsername}` : 'Not connected'}
                </span>
              </div>

              {/* LeetCode */}
              <div className="flex items-center justify-between text-xs text-slate-350 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                <span className="flex items-center gap-2 font-bold text-slate-400">
                  <FiCode /> LeetCode
                </span>
                <span className="font-semibold text-slate-300">
                  {profile?.leetcodeUsername ? `@${profile.leetcodeUsername}` : 'Not connected'}
                </span>
              </div>

              {/* Codeforces */}
              <div className="flex items-center justify-between text-xs text-slate-350 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                <span className="flex items-center gap-2 font-bold text-slate-400">
                  <FiCode /> Codeforces
                </span>
                <span className="font-semibold text-slate-300">
                  {profile?.codeforcesUsername ? `@${profile.codeforcesUsername}` : 'Not connected'}
                </span>
              </div>

              {/* CodeChef */}
              <div className="flex items-center justify-between text-xs text-slate-350 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                <span className="flex items-center gap-2 font-bold text-slate-400">
                  <FiCode /> CodeChef
                </span>
                <span className="font-semibold text-slate-300">
                  {profile?.codechefUsername ? `@${profile.codechefUsername}` : 'Not connected'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleEditToggle}
            className="w-full outline-glow-btn text-xs py-2.5 mt-6 flex items-center justify-center gap-1.5"
          >
            <FiEdit2 /> Edit Profile Handles
          </button>
        </div>

        {/* Right Column: Skills tags and editing forms */}
        <div className="lg:col-span-2 space-y-6">
          
          <AnimatePresence mode="wait">
            {!isEditing ? (
              // Skills display screen
              <motion.div
                key="display"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 border-slate-800 space-y-6 min-h-[300px]"
              >
                <div className="pb-4 border-b border-slate-800/60">
                  <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                    Technical Skill Matrix
                  </h3>
                </div>

                <div className="space-y-3 text-left">
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    Here are your validated skill categories parsed from your synced repositories and optimization files. Update these to build dynamic growth reports.
                  </p>
                  
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5 pt-4">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-500/10 border border-sky-500/20 text-sky-400 shadow-md shadow-sky-500/5 hover:scale-105 duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs font-medium space-y-2">
                      <p>⚠️ No skills tags added yet.</p>
                      <button onClick={handleEditToggle} className="text-sky-400 hover:underline">
                        Edit profile to configure skills
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Edit profiles forms
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                  <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                    Edit Console Handles
                  </h3>
                  <button onClick={handleEditToggle} className="text-slate-400 hover:text-slate-200">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* GitHub Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        GitHub Username
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                          <FiGithub />
                        </span>
                        <input
                          type="text"
                          name="githubUsername"
                          value={formData.githubUsername}
                          onChange={handleInputChange}
                          placeholder="github_username"
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650"
                        />
                      </div>
                    </div>

                    {/* LinkedIn Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        LinkedIn Username
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                          <FiLinkedin />
                        </span>
                        <input
                          type="text"
                          name="linkedinUsername"
                          value={formData.linkedinUsername}
                          onChange={handleInputChange}
                          placeholder="linkedin_username"
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650"
                        />
                      </div>
                    </div>

                    {/* LeetCode Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        LeetCode Username
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                          <FiCode />
                        </span>
                        <input
                          type="text"
                          name="leetcodeUsername"
                          value={formData.leetcodeUsername}
                          onChange={handleInputChange}
                          placeholder="leetcode_username"
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650"
                        />
                      </div>
                    </div>

                    {/* Codeforces Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        Codeforces Username
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                          <FiCode />
                        </span>
                        <input
                          type="text"
                          name="codeforcesUsername"
                          value={formData.codeforcesUsername}
                          onChange={handleInputChange}
                          placeholder="codeforces_username"
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650"
                        />
                      </div>
                    </div>

                    {/* CodeChef Input */}
                    <div className="space-y-2 col-span-1 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        CodeChef Username
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                          <FiCode />
                        </span>
                        <input
                          type="text"
                          name="codechefUsername"
                          value={formData.codechefUsername}
                          onChange={handleInputChange}
                          placeholder="codechef_username"
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills input list */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      Skills Tags (Comma-Separated)
                    </label>
                    <textarea
                      name="skillsInput"
                      value={formData.skillsInput}
                      onChange={handleInputChange}
                      placeholder="React, Node.js, Express, MongoDB, TypeScript, Git"
                      rows="3"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-650 font-medium leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 justify-end">
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="outline-glow-btn text-xs py-2 px-5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="glow-btn text-xs py-2 px-5 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <FiSave /> {saving ? 'Saving...' : 'Save Handles'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
