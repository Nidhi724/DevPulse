import express from "express";

import { tailorResume } from "../controllers/tailor.controller.js";

const router = express.Router();

router.post("/tailor", tailorResume);

export default router;