import React from 'react';
import { motion } from 'framer-motion';

const GoalCard = ({ title, current = 0, target = 100, color = 'blue', prefix = '', suffix = '' }) => {
  // Safe calculation to avoid division by zero or infinite outputs
  const safeTarget = Math.max(1, target);
  const percentage = Math.min(100, Math.round((current / safeTarget) * 100));

  const colorMap = {
    blue: {
      bar: 'bg-sky-500 shadow-sky-500/20',
      text: 'text-sky-400',
      bg: 'bg-sky-500/10'
    },
    green: {
      bar: 'bg-emerald-500 shadow-emerald-500/20',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    yellow: {
      bar: 'bg-amber-500 shadow-amber-500/20',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    rose: {
      bar: 'bg-rose-500 shadow-rose-500/20',
      text: 'text-rose-400',
      bg: 'bg-rose-500/10'
    }
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div className="glass-card p-5 border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-slate-200 text-sm font-semibold tracking-wide">
          {title}
        </h4>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>
          {percentage}%
        </span>
      </div>

      <div className="space-y-2">
        {/* Animated Progress Track */}
        <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className={`h-full rounded-full shadow-lg ${style.bar}`}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>
            Current: <strong className="text-slate-200">{prefix}{current}{suffix}</strong>
          </span>
          <span>
            Target: <strong className="text-slate-200">{prefix}{target}{suffix}</strong>
          </span>
        </div>
      </div>

      {percentage >= 100 ? (
        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
          🎉 Goal Achieved! Great work!
        </p>
      ) : (
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
          🎯 {target - current > 0 ? `${target - current} more to reach your target!` : 'Keep going!'}
        </p>
      )}
    </div>
  );
};

export default GoalCard;
