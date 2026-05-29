import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false, skeleton = false, count = 3, message = 'Loading developer metrics...' }) => {
  // 1. Skeleton UI Loader
  if (skeleton) {
    return (
      <div className="space-y-4 w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-full rounded-xl p-4 bg-slate-800/20 border border-slate-800 space-y-3">
            <div className="h-5 rounded-md skeleton-pulse w-1/3"></div>
            <div className="h-10 rounded-lg skeleton-pulse w-full"></div>
            <div className="h-4 rounded-md skeleton-pulse w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Full-Screen Landing / Action Spinner
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        {/* Glow backdrop light */}
        <div className="absolute w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative flex flex-col items-center">
          {/* Animated Glow Logo Pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="w-20 h-20 mb-6 bg-slate-900 border-2 border-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/20"
          >
            <svg className="w-10 h-10 text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M30 50 H45 L52 25 L60 75 L68 50 H70" />
            </svg>
          </motion.div>

          {/* Glowing Spinner Ring */}
          <div className="w-12 h-12 border-4 border-slate-800 border-t-sky-400 rounded-full animate-spin"></div>
          
          <p className="mt-6 text-slate-400 font-medium tracking-wide text-sm animate-pulse">
            {message}
          </p>
        </div>
      </div>
    );
  }

  // 3. Simple Compact Spinner
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <div className="w-8 h-8 border-3 border-slate-800 border-t-sky-400 rounded-full animate-spin"></div>
      {message && <p className="mt-3 text-slate-500 text-xs font-medium">{message}</p>}
    </div>
  );
};

export default Loading;
