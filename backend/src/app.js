import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import analyzerRoutes from "./routes/analyzer.routes.js";
import tailorRoutes from "./routes/tailor.routes.js";
import githubRoutes from "./routes/github.routes.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";
import codeforcesRoutes from "./routes/codeforces.routes.js";
import codechefRoutes from "./routes/codechef.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import goalRoutes from "./routes/goal.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();


// MIDDLEWARE

app.use(cors());
app.use(express.json());


// TEST ROUTE

app.get("/", (req, res) => {

  res.send("DevPulse Backend Running");

});


// AUTH ROUTES

app.use("/api/auth", authRoutes);


// RESUME ROUTES

app.use("/api/resume", resumeRoutes);


// ANALYZER ROUTES

app.use("/api/analyzer", analyzerRoutes);


// TAILOR ROUTES

app.use("/api/tailor", tailorRoutes);


// GITHUB ROUTES

app.use("/api/github", githubRoutes);


// LEETCODE ROUTES

app.use("/api/leetcode", leetcodeRoutes);


// CODEFORCES ROUTES

app.use("/api/codeforces", codeforcesRoutes);


// CODECHEF ROUTES

app.use("/api/codechef", codechefRoutes);


// PROFILE ROUTES

app.use("/api/profile", profileRoutes);


// CONTEST ROUTES

app.use("/api/contests", contestRoutes);


// PROGRESS ROUTES

app.use("/api/progress", progressRoutes);


// DASHBOARD ROUTES

app.use("/api/dashboard", dashboardRoutes);


// GOAL ROUTES

app.use("/api/goals", goalRoutes);


// GLOBAL ERROR HANDLER

app.use(errorHandler);

export default app;