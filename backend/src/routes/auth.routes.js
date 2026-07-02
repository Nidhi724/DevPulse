import express from "express";

import {
    registerUser,
    loginUser,
    getMe,
    verifyEmail
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);

// VERIFY EMAIL
router.get("/verify/:token", verifyEmail);

// CURRENT USER
router.get("/me", protect, getMe);


export default router;