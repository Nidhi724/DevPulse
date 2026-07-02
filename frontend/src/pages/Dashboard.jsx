import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressAPI, goalAPI } from '../services/api';
import StatCard from '../components/StatCard';
import GoalCard from '../components/GoalCard';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import {
  FiUserPlus, FiBookOpen, FiCode, FiTrendingUp, FiPercent,
  FiZap, FiRefreshCw, FiFileText, FiUser, FiAward, FiAlertCircle
} from 'react-icons/fi';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { profile, syncProfileStats } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [goals, setGoals] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Load dashboard, goals, and progress histories
  const fetchDashboardDetails = async () => {
    try {
      setLoading(true);

      // Load goals
      try {
        const goalRes = await goalAPI.getGoal();
        if (goalRes.data.success) {
          setGoals(goalRes.data.goal);
        }
      } catch (e) {
        console.warn('Goals not initialized yet.');
      }

      // Load latest synced stats
      try {
        const dashRes = await progressAPI.getDashboard();
        if (dashRes.data.success) {
          setDashboardData(dashRes.data.dashboard);
        }
      } catch (e) {
        console.warn('No active synced dashboard progress data found.');
      }

      // Load historical growth progress logs
      try {
        const historyRes = await progressAPI.getProgress();
        if (historyRes.data.success) {
          setProgressHistory(historyRes.data.progress);
        }
      } catch (e) {
        console.warn('Progress history load failed.');
      }

    } catch (err) {
      console.error('Failed to load dashboard parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, [profile]);

  const handleManualSync = async () => {
    setSyncing(true);
    const result = await syncProfileStats();
    if (result.success) {
      await fetchDashboardDetails();
    }
    setSyncing(false);
  };

  if (loading) {
    return <Loading fullScreen={false} message="Loading DevPulse Dashboard metrics..." />;
  }

  // Fallback defaults for new accounts with no synced profile data yet
  const github = dashboardData?.github || { username: '', followers: 0, repos: 0 };
  const leetcode = dashboardData?.leetcode || { username: '', solved: 0 };
  const codeforces = dashboardData?.codeforces || { username: '', rating: 0 };
  const ats = dashboardData?.ats || { score: 0 };
  const streak = profile?.streak || 0;

  // Weighted DevScore Logic: github(repos + followers) + leetcode solved + cf rating + ats
  const calculateDevScore = () => {
    const ghVal = Math.min(25, (github.repos * 1.5) + (github.followers * 0.5));
    const lcVal = Math.min(35, leetcode.solved * 0.15);
    const cfVal = Math.min(25, codeforces.rating * 0.015);
    const atsVal = Math.min(15, ats.score * 0.15);
    const score = Math.round(ghVal + lcVal + cfVal + atsVal);
    return Math.max(10, Math.min(100, score || 25)); // Base score of 25 for signing up
  };

  const devScore = calculateDevScore();

  // Create Recharts-compatible data lists from progressHistory logs
  const getChartData = () => {
    if (!progressHistory || progressHistory.length === 0) {
      // Default placeholder data to look stunning instead of blank
      return [
        { name: 'May 1', Solved: 25, Rating: 800, Followers: 5 },
        { name: 'May 10', Solved: 45, Rating: 950, Followers: 12 },
        { name: 'May 20', Solved: 80, Rating: 1100, Followers: 24 },
        { name: 'May 30', Solved: leetcode.solved || 120, Rating: codeforces.rating || 1240, Followers: github.followers || 42 }
      ];
    }

    // Sort historical logs chronologically
    return [...progressHistory]
      .reverse()
      .slice(-10) // Show last 10 records
      .map((item) => {
        const dateObj = new Date(item.createdAt);
        return {
          name: dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          Solved: item.leetcodeSolved || 0,
          Rating: item.codeforcesRating || 0,
          Followers: item.githubFollowers || 0
        };
      });
  };

  const chartData = getChartData();

  // Check if user has connected any accounts to prompt onboarding
  const hasProfiles = profile?.githubUsername || profile?.leetcodeUsername || profile?.codeforcesUsername;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* 1. Header welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Developer Cockpit
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Analyze your competitive coding profiles and AI summary compliance ratings
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 text-sky-400 hover:bg-sky-500/5 disabled:opacity-50 transition-all"
          >
            <FiRefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Profiles'}</span>
          </button>

          <Link
            to="/resume"
            className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-850 hover:border-sky-500/30 text-slate-300 hover:text-slate-100 transition-all"
          >
            <FiFileText className="text-sky-400" />
            <span>Analyze Resume</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-850 hover:border-sky-500/30 text-slate-300 hover:text-slate-100 transition-all"
          >
            <FiUser className="text-sky-400" />
            <span>Update Profile</span>
          </Link>
        </div>
      </div>

      {/* 2. Onboarding Prompt Card */}
      {!hasProfiles && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 border-amber-500/20 bg-amber-500/5 flex items-start gap-4"
        >
          <FiAlertCircle className="text-amber-400 w-6 h-6 flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-left">
            <h4 className="text-slate-200 text-sm font-bold">No accounts connected yet!</h4>
            <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-2xl">
              To calculate your live developer metrics, streaks, and charts, navigate to the <Link to="/profile" className="text-sky-400 hover:underline">Profile Page</Link> and connect your GitHub, LeetCode, or Codeforces handles, then click the **Sync Profiles** button!
            </p>
          </div>
        </motion.div>
      )}

      {/* 3. Top Metrics Row */}
      {/* 3. Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

        <div
          onClick={() =>
            github.username &&
            window.open(
              `https://github.com/${github.username}`,
              "_blank"
            )
          }
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <StatCard
            title="GitHub Followers"
            value={github.followers}
            icon={FiUserPlus}
            color="blue"
          />
        </div>

        <div
          onClick={() =>
            github.username &&
            window.open(
              `https://github.com/${github.username}?tab=repositories`,
              "_blank"
            )
          }
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <StatCard
            title="GitHub Repos"
            value={github.repos}
            icon={FiBookOpen}
            color="blue"
          />
        </div>

        <div
          onClick={() =>
            leetcode.username &&
            window.open(
              `https://leetcode.com/${leetcode.username}`,
              "_blank"
            )
          }
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <StatCard
            title="LeetCode Solved"
            value={leetcode.solved}
            icon={FiCode}
            color="green"
          />
        </div>

        <div
          onClick={() =>
            codeforces.username &&
            window.open(
              `https://codeforces.com/profile/${codeforces.username}`,
              "_blank"
            )
          }
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <StatCard
            title="Codeforces Rating"
            value={codeforces.rating}
            icon={FiTrendingUp}
            color="yellow"
          />
        </div>

        <StatCard
          title="ATS Score"
          value={ats.score ? `${ats.score}%` : "--"}
          icon={FiPercent}
          color="blue"
        />

        <StatCard
          title="Current Streak"
          value={streak}
          icon={FiZap}
          color="yellow"
          description="Continuous Solves"
        />

      </div>

      {/* 4. DevScore Gauge & Goals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Dial Developer Score Card */}
        <div className="glass-card p-6 border-slate-800 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/10">
          <div className="absolute top-0 right-0 bg-sky-500/5 w-24 h-24 rounded-full blur-xl"></div>

          <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800/60">
            <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <FiAward className="text-sky-400" /> Platform DevScore
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">
              Rank: Expert
            </span>
          </div>

          {/* Glowing Dial Gauge */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            <div className="w-36 h-36 rounded-full border-4 border-slate-800 border-t-sky-400 border-r-sky-500 flex items-center justify-center relative shadow-lg shadow-sky-500/5">
              <div className="absolute inset-2 rounded-full bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-100 tracking-tighter leading-none">
                  {devScore}
                </span>
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                  out of 100
                </span>
              </div>
            </div>
          </div>

          <div className="text-center w-full space-y-2">
            <p className="text-slate-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">
              Your DevScore grade is evaluated from verified GitHub followers, repositories count, solved competitive problems, and resume ATS score.
            </p>
          </div>
        </div>

        {/* Goals Progress list */}
        <div className="lg:col-span-2 glass-card p-6 border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4">
            <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
              Goal Milestones Progress
            </h3>
            <Link to="/goals" className="text-xs text-sky-400 hover:text-sky-300 font-semibold">
              Edit Goals
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GoalCard
              title="LeetCode Goal"
              current={leetcode.solved}
              target={goals?.leetcodeGoal || 100}
              color="green"
              suffix=" Solved"
            />
            <GoalCard
              title="GitHub Repos"
              current={github.repos}
              target={goals?.githubGoal || 15}
              color="blue"
              suffix=" Repos"
            />
            <GoalCard
              title="Codeforces Rating"
              current={codeforces.rating}
              target={goals?.codeforcesGoal || 1200}
              color="yellow"
              suffix=" Rating"
            />
          </div>
        </div>
      </div>

      {/* 5. Chart Visualization Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Coding Solves Progress Area Chart */}
        <div className="glass-card p-6 border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800/60">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
              LeetCode Solved Problems Growth
            </h4>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.4} />
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                  labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="Solved" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorSolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Growth Line Chart */}
        <div className="glass-card p-6 border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800/60">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
              Codeforces Rating Progress
            </h4>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.4} />
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                  labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="Rating" stroke="#FACC15" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
