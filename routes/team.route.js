import express from "express";
import { createTeam, updateTeamStats } from "../controllers/team.controller.js";

const router = express.Router();


router.post("/teams", createTeam);
router.put("/teams/stats", updateTeamStats);

export default router;

