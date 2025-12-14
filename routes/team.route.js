import express from "express";
import { createTeam, updateTeamStats, getTeams } from "../controllers/team.controller.js"; // Añadir getTeams

const router = express.Router();

router.get("/teams", getTeams); // <--- ESTO FALTABA
router.post("/teams", createTeam);
router.put("/teams/stats", updateTeamStats);

export default router;