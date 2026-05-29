import express from "express";

import {
    saveProgress,
    getUserProgress,
    updateProgress,
    deleteProgress
} from "../controllers/progress.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// SAVE PROGRESS

router.post("/save", protect, saveProgress);


// GET MY PROGRESS

router.get("/", protect, getUserProgress);


// UPDATE PROGRESS

router.put("/update/:progressId", protect, updateProgress);


// DELETE PROGRESS

router.delete("/delete/:progressId", protect, deleteProgress);


export default router;