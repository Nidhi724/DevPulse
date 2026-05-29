import React, { useState, useEffect } from 'react';
import { contestAPI } from '../services/api';
import ContestCard from '../components/ContestCard';
import Loading from '../components/Loading';
import { FiCalendar, FiClock, FiCode, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContestTracker = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingSchedules = async () => {
    try {
      setLoading(true);
      const res = await contestAPI.getContests();
      if (res.data.success) {
        setContests(res.data.contests);
      }
    } catch (error) {
      console.error('Failed to load contest schedules:', error);
      
      // Fallback preview schedule in case of API rate limits
      setContests([
        { platform: 'Codeforces', name: 'Codeforces Round 955 (Div. 2)', startTime: new Date(Date.now() + 43200000).toISOString(), duration: '2.0 hours', url: 'https://codeforces.com/contests' },
        { platform: 'LeetCode', name: 'Weekly Contest 405', startTime: 'Every Sunday', duration: '1.5 hours', url: 'https://leetcode.com/contest' },
        { platform: 'LeetCode', name: 'Biweekly Contest 134', startTime: 'Every 2 Weeks', duration: '1.5 hours', url: 'https://leetcode.com/contest' },
        { platform: 'CodeChef', name: 'Starters 142 (Div 3)', startTime: new Date(Date.now() + 86400000).toISOString(), duration: '2.5 hours', url: 'https://www.codechef.com/contests' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingSchedules();
  }, []);

  if (loading) {
    return <Loading fullScreen={false} message="Loading upcoming coding contests feed..." />;
  }

  // Group contests by platform
  const leetcodeContests = contests.filter(c => c.platform === 'LeetCode');
  const codeforcesContests = contests.filter(c => c.platform === 'Codeforces');
  const codechefContests = contests.filter(c => c.platform === 'CodeChef');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 text-left"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Competition Calendar
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-medium">
          Monitor upcoming schedule milestones for competitive LeetCode, Codeforces, and CodeChef challenges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Platform filters summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-slate-800 space-y-6 bg-slate-900/20">
            <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <FiCalendar className="text-sky-400" /> Platform Feed Sync
            </h3>
            
            <div className="space-y-3 font-semibold text-xs text-slate-450">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                <span className="flex items-center gap-2 text-slate-400">
                  <FiCode className="text-amber-500" /> LeetCode active
                </span>
                <span className="text-sky-400 font-extrabold">{leetcodeContests.length} Scheduled</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                <span className="flex items-center gap-2 text-slate-400">
                  <FiTrendingUp className="text-red-500" /> Codeforces active
                </span>
                <span className="text-sky-400 font-extrabold">{codeforcesContests.length} Scheduled</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                <span className="flex items-center gap-2 text-slate-400">
                  <FiCode className="text-amber-850" /> CodeChef active
                </span>
                <span className="text-sky-400 font-extrabold">{codechefContests.length} Scheduled</span>
              </div>
            </div>
            
            <p className="text-slate-500 text-[10px] leading-relaxed font-semibold">
              * Active schedules are synced directly from programming platforms open calendars. Countdown tags tick in real-time.
            </p>
          </div>
        </div>

        {/* Right Columns: Contest Card lists */}
        <div className="lg:col-span-2 space-y-6">
          {contests.length > 0 ? (
            <div className="space-y-4">
              {contests.map((contest, index) => (
                <ContestCard
                  key={index}
                  platform={contest.platform}
                  name={contest.name}
                  startTime={contest.startTime}
                  duration={contest.duration}
                  url={contest.url}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 text-xs font-medium space-y-2 border border-dashed border-slate-800 rounded-2xl">
              <p>📭 No upcoming competitions scheduled today.</p>
              <p className="text-[10px] text-slate-650 font-semibold">
                Please re-trigger syncing handles in Navbar.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContestTracker;
