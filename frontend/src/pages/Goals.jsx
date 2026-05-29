import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { goalAPI, progressAPI } from '../services/api';
import GoalCard from '../components/GoalCard';
import Loading from '../components/Loading';
import { FiTarget, FiEdit2, FiSave, FiAward } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Goals = () => {
  const { profile } = useAuth();
  
  const [goals, setGoals] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    leetcodeGoal: 100,
    githubGoal: 15,
    codeforcesGoal: 1200
  });

  const fetchGoalMetrics = async () => {
    try {
      setLoading(true);
      
      // Load current goals
      try {
        const goalRes = await goalAPI.getGoal();
        if (goalRes.data.success && goalRes.data.goal) {
          setGoals(goalRes.data.goal);
          setFormData({
            leetcodeGoal: goalRes.data.goal.leetcodeGoal || 100,
            githubGoal: goalRes.data.goal.githubGoal || 15,
            codeforcesGoal: goalRes.data.goal.codeforcesGoal || 1200
          });
        }
      } catch (e) {
        console.warn('Goals not initialized');
      }

      // Load latest synced stats
      try {
        const dashRes = await progressAPI.getDashboard();
        if (dashRes.data.success) {
          setDashboard(dashRes.data.dashboard);
        }
      } catch (e) {
        console.warn('Dashboard stats not synced');
      }
    } catch (error) {
      console.error('Failed to load goals metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalMetrics();
  }, [profile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let result;
      if (!goals) {
        // Create new goals document if none exists
        result = await goalAPI.createGoal(formData);
      } else {
        // Update goals
        result = await goalAPI.updateGoal(formData);
      }

      if (result.data.success) {
        setGoals(result.data.goal);
        setIsEditing(false);
        await fetchGoalMetrics();
      }
    } catch (err) {
      console.error('Failed to save goals details:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading fullScreen={false} message="Loading DevPulse AI Goals..." />;
  }

  const leetcodeCurrent = dashboard?.leetcode?.solved || 0;
  const githubCurrent = dashboard?.github?.repos || 0;
  const codeforcesCurrent = dashboard?.codeforces?.rating || 0;

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
            Target Metrics
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Configure coding volume limits and competitive programming rating expectations
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 glow-btn text-xs py-2.5 px-4"
          >
            <FiEdit2 /> Edit Goal Metrics
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Config form */}
        <AnimatePresence mode="wait">
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 border-slate-800 space-y-6 text-left">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800/60">
                  <FiTarget className="text-sky-400 w-5 h-5" />
                  <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                    Edit Targets
                  </h3>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* LeetCode Solves Target */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      LeetCode Problems Goal
                    </label>
                    <input
                      type="number"
                      name="leetcodeGoal"
                      min="1"
                      value={formData.leetcodeGoal}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  {/* GitHub Repos Target */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      GitHub Repositories Goal
                    </label>
                    <input
                      type="number"
                      name="githubGoal"
                      min="1"
                      value={formData.githubGoal}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  {/* Codeforces Rating Target */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      Codeforces Rating Goal
                    </label>
                    <input
                      type="number"
                      name="codeforcesGoal"
                      min="100"
                      value={formData.codeforcesGoal}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 focus:outline-none rounded-xl py-2 px-4 text-xs text-slate-200"
                    />
                  </div>

                  <div className="flex gap-2 pt-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="outline-glow-btn text-xs py-2 px-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="glow-btn text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <FiSave /> {saving ? 'Saving...' : 'Save Goals'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Columns: Animated progress bars list */}
        <div className={isEditing ? 'lg:col-span-2 space-y-6' : 'col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6'}>
          <GoalCard 
            title="LeetCode Solved Problems" 
            current={leetcodeCurrent} 
            target={goals?.leetcodeGoal || 100} 
            color="green" 
            suffix=" Solved" 
          />
          <GoalCard 
            title="GitHub Public Repositories" 
            current={githubCurrent} 
            target={goals?.githubGoal || 15} 
            color="blue" 
            suffix=" Repos" 
          />
          <GoalCard 
            title="Codeforces Active Rating" 
            current={codeforcesCurrent} 
            target={goals?.codeforcesGoal || 1200} 
            color="yellow" 
            suffix=" Rating" 
          />
        </div>
      </div>
      
      {/* Dynamic onboarding encouragement banner */}
      <div className="glass-card p-6 border-slate-800/80 bg-slate-900/10 flex items-start gap-4 text-left">
        <FiAward className="text-sky-400 w-6 h-6 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h4 className="text-slate-200 text-sm font-bold">Configure Stretch Goals</h4>
          <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-4xl">
            Goals set here are synchronized in real-time onto your Cockpit Dashboard progress dials. Reevaluate your coding goals periodically.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Goals;
