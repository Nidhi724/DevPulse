import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiSettings, FiUser, FiInfo, FiSliders, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user, profile, logout } = useAuth();

  const accountCreatedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : 'Recently';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 text-left"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Platform Settings
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-medium">
          Configure dev terminal parameters, account specifications, and logging preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Fast shortcuts navigation */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-slate-800 space-y-6 bg-slate-900/10">
            <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <FiSettings className="text-sky-400" /> Settings Categories
            </h3>

            <div className="space-y-2 font-semibold text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center gap-2">
                <FiUser /> Account Information
              </div>
              <div className="p-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer transition-colors flex items-center gap-2">
                <FiSliders /> Theme Preferences
              </div>
              <div className="p-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer transition-colors flex items-center gap-2">
                <FiInfo /> About DevPulse
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Forms grids */}
        <div className="lg:col-span-2 space-y-6">

          {/* Account information card */}
          <div className="glass-card p-6 border-slate-800 space-y-6">
            <div className="pb-4 border-b border-slate-800/60">
              <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                Account Information Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Username</span>
                  <span className="text-xs font-bold text-slate-200">{user?.username || 'developer'}</span>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</span>
                  <span className="text-xs font-bold text-slate-200">{user?.email || 'name@email.com'}</span>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Member Since</span>
                  <span className="text-xs font-bold text-slate-200">{accountCreatedDate}</span>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Dev Score Baseline</span>
                  <span className="text-xs font-bold text-slate-200">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme card */}
          <div className="glass-card p-6 border-slate-800 space-y-6">
            <div className="pb-4 border-b border-slate-800/60">
              <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                Theme Preferences Selection
              </h3>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <p className="text-slate-400 font-medium leading-relaxed">
                Choose your default terminal IDE skin. Currently, DevPulse strictly locks into modern dark themes for developer visual safety.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-sky-500 bg-sky-500/5 text-sky-400 flex items-center justify-between shadow-md">
                  <span>Carbon Dark (Active)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                </div>
                <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 text-slate-500 opacity-60 flex items-center justify-between cursor-not-allowed">
                  <span>Light Mode (Disabled)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="glass-card p-6 border-slate-800/60 bg-slate-900/10 flex items-center justify-between">
            <div className="space-y-1.5 text-left">
              <h4 className="text-slate-200 text-sm font-bold">Close Terminal Session</h4>
              <p className="text-slate-400 text-xs font-medium">
                Log out of DevPulse from this device. You can sign back in at any time.
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 py-2.5 px-6 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-350 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 active:scale-95 transition-all"
            >
              <FiLogOut /> <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
