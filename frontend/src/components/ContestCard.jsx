import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiExternalLink, FiCalendar } from 'react-icons/fi';

const ContestCard = ({ platform, name, startTime, duration, url = '#' }) => {
  const [countdown, setCountdown] = useState('Checking...');

  // Effect to calculate real-time countdown to future starts
  useEffect(() => {
    // If start time is a friendly string (e.g. 'Every Sunday') rather than parsed ISO dates, skip ticking
    const isISODate = !isNaN(Date.parse(startTime));
    if (!isISODate) {
      setCountdown(startTime);
      return;
    }

    const calculateTimeRemaining = () => {
      const difference = new Date(startTime) - new Date();
      if (difference <= 0) {
        setCountdown('Active / Ended');
        return;
      }

      const diffSecs = Math.floor(difference / 1000);
      const days = Math.floor(diffSecs / 86400);
      const hours = Math.floor((diffSecs % 86400) / 3600);
      const minutes = Math.floor((diffSecs % 3600) / 60);

      const chunks = [];
      if (days > 0) chunks.push(`${days}d`);
      if (hours > 0) chunks.push(`${hours}h`);
      if (minutes > 0 || chunks.length === 0) chunks.push(`${minutes}m`);

      setCountdown(chunks.join(' ') + ' left');
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, [startTime]);

  const platformColors = {
    LeetCode: {
      border: 'hover:border-amber-500/20',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      iconGlow: 'shadow-amber-500/5',
      logoText: 'L'
    },
    Codeforces: {
      border: 'hover:border-red-500/20',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      iconGlow: 'shadow-red-500/5',
      logoText: 'CF'
    },
    CodeChef: {
      border: 'hover:border-amber-800/20',
      badge: 'bg-amber-800/10 text-amber-500 border-amber-800/20',
      iconGlow: 'shadow-amber-800/5',
      logoText: 'CC'
    }
  };

  const style = platformColors[platform] || platformColors.LeetCode;

  // Format the start date in user-friendly letters
  const formatStartDate = (dStr) => {
    const isISO = !isNaN(Date.parse(dStr));
    if (!isISO) return dStr;
    const date = new Date(dStr);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass-card p-5 border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card-hover ${style.border}`}
    >
      <div className="flex items-start gap-4">
        {/* Mock Platform Logo Avatar */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border border-slate-800 shadow-md ${style.badge} ${style.iconGlow}`}>
          {style.logoText}
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border tracking-wider ${style.badge}`}>
              {platform}
            </span>
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <FiClock /> {duration}
            </span>
          </div>
          <h4 className="text-slate-100 font-bold text-sm tracking-wide">
            {name}
          </h4>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <FiCalendar className="text-slate-500" /> {formatStartDate(startTime)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-800/40 md:border-t-0 pt-3 md:pt-0">
        <div className="text-left md:text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
            Countdown
          </span>
          <span className="text-xs font-semibold text-sky-400">
            {countdown}
          </span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 text-sky-400 hover:bg-sky-500/5 transition-all duration-200"
        >
          Register <FiExternalLink />
        </a>
      </div>
    </motion.div>
  );
};

export default ContestCard;
