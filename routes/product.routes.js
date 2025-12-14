import express from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js"; // (Crearemos este controlador luego)

const router = express.Router();

router.get("/products", getProducts); // Para que el frontend vea el catálogo
router.post("/products", createProduct); // Para que el admin cree productos

export default router;