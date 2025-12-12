import express from "express";
import { createNews, getNews } from "../controllers/news.controller.js";
//import upload from "../middlewares/upload.middleware.js"; // Necesario para la foto

const router = express.Router();

// Ver todas las noticias
router.get("/news", getNews);

// Publicar noticia (Recibe una imagen en el campo 'image')
// En el futuro, añada 'authMiddleware' antes de 'upload' para protegerlo
//router.post("/news", upload.single("image"), createNews);

//export default router;