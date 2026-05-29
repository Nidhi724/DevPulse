import express from "express";

import {

    getMyProfile,
    updateProfile,
    getFullProfile,
    syncProfile

} from "../controllers/profile.controller.js";

import protect from "../middleware/auth.middleware.js";

import validateProfile from "../middleware/validate.middleware.js";

const router = express.Router();


// GET MY PROFILE

router.get("/me", protect, getMyProfile);


// UPDATE PROFILE

router.put(
    "/update",
    protect,
    validateProfile,
    updateProfile
);


// SYNC PROFILE

router.post(
    "/sync",
    protect,
    syncProfile
);


// FULL PROFILE API

router.post("/full", getFullProfile);


export default router;