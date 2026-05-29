import Progress from "../models/progress.model.js";


// SAVE PROGRESS

export const saveProgress = async (req, res) => {

    try {

        const {

            githubUsername,
            leetcodeUsername,
            codeforcesUsername,
            githubFollowers,
            githubRepos,
            leetcodeSolved,
            codeforcesRating,
            atsScore

        } = req.body;

        const progress = await Progress.create({

            user: req.user._id,

            githubUsername,

            leetcodeUsername,

            codeforcesUsername,

            githubFollowers,

            githubRepos,

            leetcodeSolved,

            codeforcesRating,

            atsScore

        });

        res.status(201).json({

            success: true,

            message: "Progress saved successfully",

            progress

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};




// GET USER PROGRESS

export const getUserProgress = async (req, res) => {

    try {

        const progress = await Progress.find({

            user: req.user._id

        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            progress

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};




// UPDATE PROGRESS

export const updateProgress = async (req, res) => {

    try {

        const { progressId } = req.params;

        const updatedProgress = await Progress.findOneAndUpdate(

            {
                _id: progressId,
                user: req.user._id
            },

            req.body,

            {
                new: true
            }

        );

        if (!updatedProgress) {

            return res.status(404).json({

                success: false,
                message: "Progress not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Progress updated successfully",

            updatedProgress

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};




// DELETE PROGRESS

export const deleteProgress = async (req, res) => {

    try {

        const { progressId } = req.params;

        const deletedProgress = await Progress.findOneAndDelete({

            _id: progressId,
            user: req.user._id

        });

        if (!deletedProgress) {

            return res.status(404).json({

                success: false,
                message: "Progress not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Progress deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};