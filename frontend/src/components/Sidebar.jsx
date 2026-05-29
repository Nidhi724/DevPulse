import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiGrid, FiUser, FiTarget, FiActivity, FiAward, 
  FiFileText, FiCalendar, FiSettings, FiLogOut, FiMenu, FiX 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Goals', path: '/goals', icon: FiTarget },
    { name: 'Progress', path: '/progress', icon: FiActivity },
    { name: 'Achievements', path: '/achievements', icon: FiAward },
    { name: 'Resume Analyzer', path: '/resume', icon: FiFileText },
    { name: 'Contest Tracker', path: '/contests', icon: FiCalendar },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950/80 backdrop-blur-md border-r border-slate-900/60 p-6">
      {/* Brand Logo header */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <svg className="w-5 h-5 text-slate-950" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 50 H45 L52 25 L60 75 L68 50 H70" />
          </svg>
        </div>
        <div className="text-left">
          <h1 className="text-lg font-black tracking-wider text-slate-100 leading-none">
            DEVPULSE
          </h1>
          <span className="text-[10px] font-extrabold text-sky-400 tracking-widest uppercase">
            AI Platform
          </span>
        </div>
      </div>

      {/* Navigations links list */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400 shadow-md shadow-sky-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom logout control */}
      <div className="border-t border-slate-900/80 pt-6">
        <button
          onClick={logout}
          className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-wide text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* 2. Floating Mobile Hamburger Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/30 scale-110 active:scale-95 transition-transform"
        >
          {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* 3. Mobile Slide-in Drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Blur screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950 z-30"
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 z-35"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
