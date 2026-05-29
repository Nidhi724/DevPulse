import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    leetcodeGoal: {

        type: Number,

        default: 0

    },

    githubGoal: {

        type: Number,

        default: 0

    },

    codeforcesGoal: {

        type: Number,

        default: 0

    }

}, {

    timestamps: true

});

const Goal = mongoose.model(
    "Goal",
    goalSchema
);

export default Goal;