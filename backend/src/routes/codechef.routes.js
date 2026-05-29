import express from "express";

import { getCodeChefProfile } from "../controllers/codechef.controller.js";

const router = express.Router();


// GET CODECHEF PROFILE

router.get("/:username", getCodeChefProfile);


export default router;