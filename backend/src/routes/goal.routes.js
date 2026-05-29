import express from "express";

import {

    createGoal,
    getGoal,
    updateGoal

} from "../controllers/goal.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// CREATE GOAL

router.post(
    "/",
    protect,
    createGoal
);


// GET GOAL

router.get(
    "/",
    protect,
    getGoal
);


// UPDATE GOAL

router.put(
    "/update",
    protect,
    updateGoal
);

export default router;