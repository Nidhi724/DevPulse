import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },

    githubUsername: {

        type: String

    },

    leetcodeUsername: {

        type: String

    },

    codeforcesUsername: {

        type: String

    },

    githubFollowers: {

        type: Number,

        default: 0

    },

    githubRepos: {

        type: Number,

        default: 0

    },

    leetcodeSolved: {

        type: Number,

        default: 0

    },

    codeforcesRating: {

        type: Number,

        default: 0

    },

    atsScore: {

        type: Number,

        default: 0

    }

}, {

    timestamps: true

});

const Progress = mongoose.model(
    "Progress",
    progressSchema
);

export default Progress;