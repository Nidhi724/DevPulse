import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiRefreshCw, FiUser, FiCode, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, profile, syncProfileStats } = useAuth();
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    if (syncing) return;
    setSyncing(true);
    await syncProfileStats();
    setSyncing(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 px-6 py-4 flex items-center justify-between w-full">
      {/* Search Bar Placeholder or Title */}
      <div className="flex items-center gap-3">
        <FiCode className="text-sky-400 w-5 h-5" />
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest hidden sm:inline-block">
          Growth System Terminal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak Counter display */}
        {profile && profile.streak > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shadow-md shadow-amber-500/5">
            <FiZap className="fill-amber-400 stroke-none w-3.5 h-3.5 animate-pulse" />
            <span>{profile.streak} DAY STREAK</span>
          </div>
        )}

        {/* Global profile refresh and synchronization button */}
        {user && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 text-sky-400 hover:bg-sky-500/5 disabled:opacity-50 transition-all duration-200"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{syncing ? 'Syncing...' : 'Sync Profiles'}</span>
          </button>
        )}

        {/* User profile dropdown indicator */}
        <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

        {user ? (
          <Link to="/profile" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
            {/* Mock avatar from username initial */}
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-bold text-sm shadow-inner uppercase">
              {user.username ? user.username.charAt(0) : 'U'}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-extrabold text-slate-200 tracking-wide block">
                {user.username}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Developer
              </span>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="glow-btn text-xs px-4 py-2 flex items-center gap-1">
            <FiUser /> Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
