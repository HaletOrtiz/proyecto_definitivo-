import express from "express";
import { createOrder, getMyOrders } from "../controllers/carrito.controller.js";
//import authMiddleware from "../middlewares/auth.middleware.js"; // Necesario para saber quién compra

const router = express.Router();

// Crear pedido (Requiere login)
router.post("/carrito", createOrder);

// Ver mis pedidos (Requiere login)
router.get("/carrito", getMyOrders);

export default router;