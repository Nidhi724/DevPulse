import React from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiCheck } from 'react-icons/fi';

const AchievementCard = ({ title, description, badge, isUnlocked = false, category = 'General' }) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
      className={`relative overflow-hidden glass-card p-5 border-slate-800/80 transition-all duration-300 flex items-center gap-4 ${
        isUnlocked 
          ? 'bg-slate-800/40 hover:border-sky-500/20' 
          : 'bg-slate-900/40 opacity-55 saturate-50 select-none'
      }`}
    >
      {/* Badge Trophy Circle Container */}
      <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl text-2xl font-bold shadow-md ${
        isUnlocked 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-slate-100' 
          : 'bg-slate-950 border border-slate-800 text-slate-500'
      }`}>
        {badge}
        
        {/* Verification Checks / Padlocks Indicators */}
        <div className={`absolute -right-1.5 -bottom-1.5 w-5 h-5 rounded-full flex items-center justify-center border text-[9px] shadow-md ${
          isUnlocked 
            ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
            : 'bg-slate-800 border-slate-700 text-slate-400'
        }`}>
          {isUnlocked ? <FiCheck strokeWidth={4} /> : <FiLock />}
        </div>
      </div>

      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          <h4 className={`text-sm font-bold ${isUnlocked ? 'text-slate-100' : 'text-slate-500'}`}>
            {title}
          </h4>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400">
            {category}
          </span>
        </div>
        <p className="text-slate-400 text-xs font-medium">
          {description}
        </p>
      </div>

      {/* Lock status banner for accessibility */}
      {!isUnlocked && (
        <div className="absolute right-3 top-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-0.5">
          Locked
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;
