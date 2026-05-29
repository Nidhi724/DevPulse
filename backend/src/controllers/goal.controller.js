import Goal from "../models/goal.model.js";


// CREATE GOAL

export const createGoal = async (req, res) => {

    try {

        const {

            leetcodeGoal,
            githubGoal,
            codeforcesGoal

        } = req.body;

        const existingGoal = await Goal.findOne({

            user: req.user._id

        });

        if (existingGoal) {

            return res.status(400).json({

                success: false,
                message: "Goal already exists"

            });

        }

        const goal = await Goal.create({

            user: req.user._id,

            leetcodeGoal,

            githubGoal,

            codeforcesGoal

        });

        res.status(201).json({

            success: true,

            message: "Goal created successfully",

            goal

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// GET GOAL

export const getGoal = async (req, res) => {

    try {

        const goal = await Goal.findOne({

            user: req.user._id

        });

        res.status(200).json({

            success: true,

            goal

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// UPDATE GOAL

export const updateGoal = async (req, res) => {

    try {

        const updatedGoal = await Goal.findOneAndUpdate(

            {

                user: req.user._id

            },

            req.body,

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            message: "Goal updated successfully",

            goal: updatedGoal

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};