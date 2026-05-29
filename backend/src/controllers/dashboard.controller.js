import Progress from "../models/progress.model.js";

export const getDashboard = async (req, res) => {

    try {

        const latestProgress = await Progress.findOne({

            user: req.user._id

        }).sort({ createdAt: -1 });

        if (!latestProgress) {

            return res.status(404).json({

                success: false,
                message: "No progress data found"

            });

        }

        res.status(200).json({

            success: true,

            dashboard: {

                github: {

                    username: latestProgress.githubUsername,

                    followers: latestProgress.githubFollowers,

                    repos: latestProgress.githubRepos

                },

                leetcode: {

                    username: latestProgress.leetcodeUsername,

                    solved: latestProgress.leetcodeSolved

                },

                codeforces: {

                    username: latestProgress.codeforcesUsername,

                    rating: latestProgress.codeforcesRating

                },

                ats: {

                    score: latestProgress.atsScore

                }

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};