import express from "express";

import {
    registerUser,
    loginUser,
    getMe
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);


// CURRENT USER
router.get("/me", protect, getMe);


export default router;