import express from "express";
import { createDiet, getDiets, getDietById } from "../controllers/diet.controller.js";

const router = express.Router();

router.get("/diets", getDiets);
router.get("/diets/:id", getDietById);
router.post("/diets", createDiet);

export default router;