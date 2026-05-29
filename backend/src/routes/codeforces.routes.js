import express from "express";

import { getCodeforcesProfile } from "../controllers/codeforces.controller.js";

const router = express.Router();


// GET CODEFORCES PROFILE

router.get("/:username", getCodeforcesProfile);


export default router;