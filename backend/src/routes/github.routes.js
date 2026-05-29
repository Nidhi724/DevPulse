import express from "express";

import { getGithubProfile } from "../controllers/github.controller.js";

const router = express.Router();


// GET GITHUB PROFILE

router.get("/:username", getGithubProfile);


export default router;