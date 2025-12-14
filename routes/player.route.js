import express from "express";
import { createPlayer, getPlayers } from "../controllers/player.controller.js";

const router = express.Router();

// Ruta para ver jugadoras
router.get("/players", getPlayers);

// Ruta para crear jugadoras (SIN SUBIDA DE ARCHIVOS)
// Antes aquí había un "upload.fields(...)", ahora lo quitamos.
router.post("/players", createPlayer);

export default router;