import express from "express";
import { createExtraTraining, getExtraTrainings } from "../controllers/extraTraining.controller.js";

const router = express.Router();

// Obtener la lista (puede filtrar poniendo ?category=Fuerza al final)
router.get("/extra-trainings", getExtraTrainings);

// Crear nuevo entrenamiento (En el futuro esto debería ir protegido con authMiddleware)
router.post("/extra-trainings", createExtraTraining);

export default router;