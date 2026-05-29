import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'blue', description = '' }) => {
  // Set up color configurations matching our Tailwind directives
  const colorMap = {
    blue: {
      border: 'hover:border-sky-500/30',
      iconBg: 'bg-sky-500/10 text-sky-400',
      glow: 'group-hover:bg-sky-500/5'
    },
    green: {
      border: 'hover:border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      glow: 'group-hover:bg-emerald-500/5'
    },
    yellow: {
      border: 'hover:border-amber-500/30',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glow: 'group-hover:bg-amber-500/5'
    },
    rose: {
      border: 'hover:border-rose-500/30',
      iconBg: 'bg-rose-500/10 text-rose-400',
      glow: 'group-hover:bg-rose-500/5'
    }
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden glass-card glass-card-hover p-6 flex items-center justify-between border-slate-800/80 ${style.border}`}
    >
      {/* Background glow hover dot */}
      <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl transition-all duration-300 ${style.glow}`}></div>

      <div className="space-y-2">
        <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase block">
          {title}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-50 tracking-tight leading-none">
          {value !== undefined && value !== null ? value : '--'}
        </h3>
        {description && (
          <p className="text-slate-500 text-xs font-medium tracking-wide">
            {description}
          </p>
        )}
      </div>

      <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${style.iconBg} group-hover:scale-110 shadow-sm`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </motion.div>
  );
};

export default StatCard;
