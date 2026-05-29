import User from "../models/user.model.js";
import Progress from "../models/progress.model.js";


// GET MY PROFILE

export const getMyProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user._id
        ).select("-password");

        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// UPDATE PROFILE

export const updateProfile = async (req, res) => {

    try {

        const {

            githubUsername,
            linkedinUsername,
            leetcodeUsername,
            codeforcesUsername,
            codechefUsername,
            skills

        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(

            req.user._id,

            {

                githubUsername,
                linkedinUsername,
                leetcodeUsername,
                codeforcesUsername,
                codechefUsername,
                skills

            },

            {

                new: true

            }

        ).select("-password");

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: updatedUser

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// SYNC PROFILE

export const syncProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const githubResponse = await fetch(
            `https://api.github.com/users/${user.githubUsername}`
        );

        const githubData = await githubResponse.json();

        const leetcodeResponse = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${user.leetcodeUsername}`
        );

        const leetcodeData = await leetcodeResponse.json();

        const codeforcesResponse = await fetch(
            `https://codeforces.com/api/user.info?handles=${user.codeforcesUsername}`
        );

        const codeforcesData = await codeforcesResponse.json();

        const cfUser = codeforcesData.result[0];

        const progress = await Progress.create({

            user: req.user._id,

            githubUsername: user.githubUsername,

            leetcodeUsername: user.leetcodeUsername,

            codeforcesUsername: user.codeforcesUsername,

            githubFollowers: githubData.followers,

            githubRepos: githubData.public_repos,

            leetcodeSolved: leetcodeData.totalSolved,

            codeforcesRating: cfUser.rating,

            atsScore: 0

        });

        res.status(200).json({

            success: true,

            message: "Profile synced successfully",

            progress

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// FULL PROFILE API

export const getFullProfile = async (req, res) => {

    try {

        const {

            github,
            leetcode,
            codeforces

        } = req.body;

        const githubResponse = await fetch(
            `https://api.github.com/users/${github}`
        );

        const githubData = await githubResponse.json();

        const leetcodeResponse = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${leetcode}`
        );

        const leetcodeData = await leetcodeResponse.json();

        const codeforcesResponse = await fetch(
            `https://codeforces.com/api/user.info?handles=${codeforces}`
        );

        const codeforcesData = await codeforcesResponse.json();

        const cfUser = codeforcesData.result[0];

        const insights = [];

        if (leetcodeData.totalSolved > 300) {

            insights.push("Strong DSA skills");

        } else {

            insights.push("Need more DSA practice");

        }

        if (githubData.public_repos > 5) {

            insights.push("Good project building consistency");

        } else {

            insights.push("Build more real-world projects");

        }

        if (cfUser.rating > 1400) {

            insights.push("Good competitive programming profile");

        }

        res.status(200).json({

            success: true,

            profile: {

                github: {

                    username: githubData.login,
                    followers: githubData.followers,
                    publicRepos: githubData.public_repos,
                    avatar: githubData.avatar_url

                },

                leetcode: {

                    totalSolved: leetcodeData.totalSolved,
                    easySolved: leetcodeData.easySolved,
                    mediumSolved: leetcodeData.mediumSolved,
                    hardSolved: leetcodeData.hardSolved

                },

                codeforces: {

                    handle: cfUser.handle,
                    rating: cfUser.rating,
                    rank: cfUser.rank

                },

                aiInsights: insights

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};