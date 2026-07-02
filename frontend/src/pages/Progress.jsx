import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import Loading from '../components/Loading';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiActivity, FiCode, FiTrendingUp, FiGithub, FiPercent, FiPlus, FiSave, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Progress = () => {
  const { profile } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    githubUsername: profile?.githubUsername || '',
    leetcodeUsername: profile?.leetcodeUsername || '',
    codeforcesUsername: profile?.codeforcesUsername || '',
    githubFollowers: 0,
    githubRepos: 0,
    leetcodeSolved: 0,
    codeforcesRating: 0,
    atsScore: 0
  });

  const fetchProgressHistory = async () => {
    try {
      setLoading(true);
      const res = await progressAPI.getProgress();
      if (res.data.success) {
        setHistory(res.data.progress);

        // Populate default handles if available
        if (res.data.progress.length > 0) {
          const latest = res.data.progress[0];
          setFormData({
            githubUsername: latest.githubUsername || profile?.githubUsername || '',
            leetcodeUsername: latest.leetcodeUsername || profile?.leetcodeUsername || '',
            codeforcesUsername: latest.codeforcesUsername || profile?.codeforcesUsername || '',
            githubFollowers: latest.githubFollowers || 0,
            githubRepos: latest.githubRepos || 0,
            leetcodeSolved: latest.leetcodeSolved || 0,
            codeforcesRating: latest.codeforcesRating || 0,
            atsScore: latest.atsScore || 0
          });
        }
      }
    } catch (error) {
      console.error('Failed to load progress history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressHistory();
  }, [profile]);

  const handleInputChange = (e) => {
    const isNum = ['githubFollowers', 'githubRepos', 'leetcodeSolved', 'codeforcesRating', 'atsScore'].includes(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: isNum ? parseInt(e.target.value) || 0 : e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await progressAPI.saveProgress(formData);
      if (res.data.success) {
        setIsLogging(false);
        await fetchProgressHistory();
      }
    } catch (err) {
      console.error('Failed to log daily statistics:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading fullScreen={false} message="Loading DevPulse Growth Timeline..." />;
  }

  // Create Recharts-compatible chronology data
  const chartData = [...history]
    .reverse()
    .map((item) => {
      const dateObj = new Date(item.createdAt);
      return {
        name: dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        LeetCode: item.leetcodeSolved || 0,
        GitHub: item.githubRepos || 0,
        Codeforces: item.codeforcesRating || 0
      };
    });

  // Default placeholders for empty timelines
  const activeChartData = chartData.length > 0 ? chartData : [
    { name: 'May 1', LeetCode: 100, GitHub: 5, Codeforces: 800 },
    { name: 'May 15', LeetCode: 150, GitHub: 12, Codeforces: 1020 },
    { name: 'May 30', LeetCode: 220, GitHub: 18, Codeforces: 1200 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Growth Timeline
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Visualize your coding progression logs, problem volumes, and repository counts
          </p>
        </div>

        {!isLogging && (
          <button
            onClick={() => setIsLogging(true)}
            className="flex items-center gap-1.5 glow-btn text-xs py-2.5 px-4"
          >
            <FiPlus /> Add Today's Metrics Log
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Form overlay */}
        <AnimatePresence mode="wait">
          {isLogging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 border-slate-800 space-y-6 text-left relative bg-slate-900/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                  <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FiActivity className="text-sky-400" /> Log Today's Metrics
                  </h3>
                  <button onClick={() => setIsLogging(false)} className="text-slate-400 hover:text-slate-200">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Solves */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      LeetCode Solved Problems
                    </label>
                    <input
                      type="number"
                      name="leetcodeSolved"
                      value={formData.leetcodeSolved}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  {/* GitHub Repos */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      GitHub Public Repositories
                    </label>
                    <input
                      type="number"
                      name="githubRepos"
                      value={formData.githubRepos}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  {/* Codeforces rating */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      Codeforces Active Rating
                    </label>
                    <input
                      type="number"
                      name="codeforcesRating"
                      value={formData.codeforcesRating}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  <div className="flex gap-2 pt-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsLogging(false)}
                      className="outline-glow-btn text-xs py-2 px-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="glow-btn text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <FiSave /> {saving ? 'Logging...' : 'Log Metrics'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Columns: Chart and vertical chronological timeline */}
        <div className={isLogging ? 'lg:col-span-2 space-y-8' : 'col-span-3 space-y-8'}>

          {/* Chart Grid */}
          <div className="glass-card p-6 border-slate-800 space-y-4">
            <div className="pb-3 border-b border-slate-800/60">
              <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                LeetCode Solves Growth Growth Curve
              </h4>
            </div>
            <div className="h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.4} />
                  <XAxis dataKey="name" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                    labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="LeetCode" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorCurve)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div className="glass-card p-6 border-slate-800 space-y-6 text-left">
            <div className="pb-4 border-b border-slate-800/60">
              <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                Chronological Growth Log List
              </h3>
            </div>

            <div className="relative border-l border-slate-800 pl-6 space-y-8 ml-3 py-2">
              {history.length > 0 ? (
                history.map((log, index) => {
                  const dateStr = new Date(log.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  return (
                    <div key={log._id} className="relative group">
                      {/* Timeline node */}
                      <span className="absolute -left-[31px] top-1 bg-slate-950 border border-slate-800 text-sky-400 rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:border-sky-500 transition-all shadow-md">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping"></span>
                      </span>

                      <div className="space-y-2">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block">
                          {dateStr}
                        </span>

                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                            <FiCode className="text-green-500" /> {log.leetcodeSolved || 0} Problems Solved
                          </span>
                          <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                            <FiGithub className="text-sky-400" /> {log.githubRepos || 0} Repositories
                          </span>
                          {log.codeforcesRating > 0 && (
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                              <FiTrendingUp className="text-yellow-500" /> {log.codeforcesRating} CF Rating
                            </span>
                          )}
                          {log.atsScore > 0 && (
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                              <FiPercent className="text-sky-400" /> {log.atsScore}% ATS score
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Show beautiful default preview
                <>
                  <div className="relative group">
                    <span className="absolute -left-[31px] top-1 bg-slate-950 border border-slate-800 text-sky-400 rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
                    </span>
                    <div className="space-y-1">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block">May 30, 2026</span>
                      <span className="text-xs font-bold text-slate-350 flex items-center gap-2">
                        🎉 <strong className="text-slate-200">220 Problems Solved</strong> | 18 Repositories | 1200 CF Rating
                      </span>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] top-1 bg-slate-950 border border-slate-800 text-sky-400 rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
                    </span>
                    <div className="space-y-1">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block">May 15, 2026</span>
                      <span className="text-xs font-bold text-slate-350 flex items-center gap-2">
                        🎉 <strong className="text-slate-200">150 Problems Solved</strong> | 12 Repositories | 1020 CF Rating
                      </span>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] top-1 bg-slate-950 border border-slate-800 text-sky-400 rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
                    </span>
                    <div className="space-y-1">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block">May 1, 2026</span>
                      <span className="text-xs font-bold text-slate-350 flex items-center gap-2">
                        🥉 <strong className="text-slate-200">100 Problems Solved</strong> | 5 Repositories | 800 CF Rating
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Progress;
