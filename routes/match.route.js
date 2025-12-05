import express from "express";
// 1. IMPORTANTE: Añadimos 'getCalendar' a la lista de importaciones
import { createMatch, getCalendar } from "../controllers/match.controller.js";

const router = express.Router();

// 2. IMPORTANTE: Añadimos la ruta para VER (GET) el calendario
router.get("/matches", getCalendar);

// Ruta para CREAR (POST) partidos
router.post("/matches", createMatch);

export default router;