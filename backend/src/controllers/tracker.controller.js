const Tracker = require('../models/tracker.model');
const User = require('../models/user.model');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Add or update daily coding progress, calculate DevScores and update streaks
 * @route   POST /api/tracker/progress
 * @access  Private
 */
const addCodingProgress = async (req, res, next) => {
  try {
    const { solvedQuestionCount, weeklyGoals, dailyProgress } = req.body;
    const userId = req.user._id;

    // Default to today's date in local YYYY-MM-DD format if not provided
    const todayStr = req.body.date || new Date().toISOString().split('T')[0];

    // 1. Fetch previous day's record to compute streaks
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if tracker already exists for today
    let dailyLog = await Tracker.findOne({ user: userId, date: todayStr });
    const isNewLog = !dailyLog;

    let solvedDifference = solvedQuestionCount;

    if (!isNewLog) {
      // Calculate how many NEW questions were solved during this update
      solvedDifference = Math.max(0, solvedQuestionCount - dailyLog.solvedQuestionCount);

      // Update existing record
      dailyLog.solvedQuestionCount = solvedQuestionCount;
      dailyLog.dailyProgress = dailyProgress || dailyLog.dailyProgress;
      if (weeklyGoals && weeklyGoals.length > 0) {
        dailyLog.weeklyGoals = weeklyGoals;
      }
      await dailyLog.save();
    } else {
      // Create new daily log
      dailyLog = await Tracker.create({
        user: userId,
        date: todayStr,
        solvedQuestionCount,
        weeklyGoals,
        dailyProgress
      });
    }

    // 2. Perform Gamification and Streak updates
    const user = await User.findById(userId);
    let newStreak = user.streak;

    if (isNewLog) {
      // If user has never logged before, start streak at 1
      if (user.streak === 0) {
        newStreak = 1;
      } else {
        // Find user's last login date before today
        const lastLog = await Tracker.findOne({
          user: userId,
          date: { $ne: todayStr }
        }).sort({ date: -1 });

        if (lastLog) {
          if (lastLog.date === yesterdayStr) {
            // Logged yesterday, increment streak
            newStreak = user.streak + 1;
          } else if (lastLog.date === todayStr) {
            // Already logged today (should not happen as isNewLog is true, but safe fallback)
            newStreak = user.streak;
          } else {
            // Gap detected! Reset streak to 1
            newStreak = 1;
          }
        } else {
          // No prior logs, start streak
          newStreak = 1;
        }
      }
    }

    // Calculate DevScore reward points: +10 base points for committing progress, plus +5 points per solved question
    const baseReward = isNewLog ? 10 : 0;
    const questionsReward = solvedDifference * 5;
    const totalReward = baseReward + questionsReward;

    // Apply updates to the User record
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { streak: newStreak },
        $inc: { devScore: totalReward }
      },
      { new: true }
    ).select('-password');

    return sendSuccess(
      res,
      isNewLog ? 'Daily progress logged successfully!' : 'Daily progress updated successfully!',
      {
        log: dailyLog,
        devScore: updatedUser.devScore,
        streak: updatedUser.streak,
        pointsAwarded: totalReward
      },
      isNewLog ? 201 : 200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get detailed coding logs, weekly goals, solved count, and metrics history
 * @route   GET /api/tracker/history
 * @access  Private
 */
const getTrackerHistory = async (req, res, next) => {
  try {
    const history = await Tracker.find({ user: req.user._id }).sort({ date: -1 });

    // Aggregate total metrics
    const totalQuestions = history.reduce((sum, item) => sum + item.solvedQuestionCount, 0);
    
    // Aggregate weekly goals across logs
    const activeGoals = [];
    history.forEach((log) => {
      if (log.weeklyGoals && log.weeklyGoals.length > 0) {
        log.weeklyGoals.forEach((goal) => {
          activeGoals.push({
            date: log.date,
            title: goal.title,
            isCompleted: goal.isCompleted,
            _id: goal._id
          });
        });
      }
    });

    return sendSuccess(res, 'Coding tracker history loaded successfully!', {
      totalQuestionsSolved: totalQuestions,
      logsCount: history.length,
      logs: history,
      goals: activeGoals.slice(0, 15) // Return last 15 logged weekly goals
    }, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCodingProgress,
  getTrackerHistory
};
