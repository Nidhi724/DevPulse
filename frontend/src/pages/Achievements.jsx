import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import AchievementCard from '../components/AchievementCard';
import Loading from '../components/Loading';
import { FiAward, FiInfo, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Achievements = () => {
  const { profile } = useAuth();
  
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const res = await progressAPI.getDashboard();
        if (res.data.success) {
          setDashboard(res.data.dashboard);
        }
      } catch (e) {
        console.warn('Dashboard stats not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [profile]);

  if (loading) {
    return <Loading fullScreen={false} message="Unlocking DevPulse AI Badges room..." />;
  }

  const leetcodeSolved = dashboard?.leetcode?.solved || 0;
  const githubRepos = dashboard?.github?.repos || 0;
  const codeforcesRating = dashboard?.codeforces?.rating || 0;
  const hasSynced = !!dashboard;

  // Badge list evaluation rules
  const badgesList = [
    {
      title: 'First Sync',
      description: 'Connected and synchronized your first developer console handle.',
      badge: '🥉',
      isUnlocked: hasSynced,
      category: 'Auth'
    },
    {
      title: '100 Problems Solved',
      description: 'Logged 100 or more problems solved on LeetCode competitive sheets.',
      badge: '🥈',
      isUnlocked: leetcodeSolved >= 100,
      category: 'DSA'
    },
    {
      title: '300 Problems Solved',
      description: 'Logged 300 or more problems solved on LeetCode competitive sheets.',
      badge: '🥇',
      isUnlocked: leetcodeSolved >= 300,
      category: 'DSA'
    },
    {
      title: 'GitHub Explorer',
      description: 'Created 10 or more active public repositories linked to your profile.',
      badge: '🏆',
      isUnlocked: githubRepos >= 10,
      category: 'Repos'
    },
    {
      title: 'Codeforces Specialist',
      description: 'Hit an active rating of 1400 or more on Codeforces competitive charts.',
      badge: '🏆',
      isUnlocked: codeforcesRating >= 1400,
      category: 'Rating'
    }
  ];

  const unlockedCount = badgesList.filter(b => b.isUnlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Trophy Room
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Earn developer rank badges and unlock milestone rewards as you log coding solves
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold shadow-md">
          <FiAward />
          <span>{unlockedCount} / {badgesList.length} BADGES UNLOCKED</span>
        </div>
      </div>

      {/* Grid of badges cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {badgesList.map((badge, index) => (
          <AchievementCard
            key={index}
            title={badge.title}
            description={badge.description}
            badge={badge.badge}
            isUnlocked={badge.isUnlocked}
            category={badge.category}
          />
        ))}
      </div>

      {/* Helpful Info Alert Banner */}
      <div className="glass-card p-5 border-slate-800 bg-slate-900/10 flex items-start gap-4">
        <FiInfo className="text-sky-400 w-6 h-6 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-slate-200 text-sm font-bold">Unlocking Milestones</h4>
          <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-4xl">
            Trophy states are automatically computed based on synchronized metrics in your Cockpit. Run manual synchronization triggers in the Navbar to update unlock achievements immediately.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
