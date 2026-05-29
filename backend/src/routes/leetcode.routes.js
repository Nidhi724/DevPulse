import express from "express";

import { getLeetCodeProfile } from "../controllers/leetcode.controller.js";

const router = express.Router();


// GET LEETCODE PROFILE

router.get("/:username", getLeetCodeProfile);


export default router;