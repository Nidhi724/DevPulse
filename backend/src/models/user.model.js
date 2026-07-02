import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        // Email Verification
        isVerified: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
            default: null,
        },

        verificationTokenExpiry: {
            type: Date,
            default: null,
        },

        githubUsername: {
            type: String,
            default: "",
        },

        linkedinUsername: {
            type: String,
            default: "",
        },

        leetcodeUsername: {
            type: String,
            default: "",
        },

        codeforcesUsername: {
            type: String,
            default: "",
        },

        codechefUsername: {
            type: String,
            default: "",
        },

        skills: {
            type: [String],
            default: [],
        },

        streak: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;