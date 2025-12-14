import express from "express";
import cors from "cors"; // Importamos CORS estilo moderno
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importación de rutas
import signrouter from "./routes/sign.route.js";
import teamRouter from "./routes/team.route.js";
import matchRouter from "./routes/match.route.js";
import playerRouter from "./routes/player.route.js";
import extraTrainingRouter from "./routes/entrenamientoExtra.route.js";
//import newsRouter from "./routes/news.route.js";
import carritoRouter from "./routes/carrito.route.js";
import userRouter from "./routes/user.route.js";
import dietaRouter from "./routes/dieta.route.js";

dotenv.config();

const app = express();

// --- 1. CONFIGURACIÓN (Importante el orden) ---
app.use(cors()); // ✅ AQUÍ DAMOS EL PERMISO AL PRINCIPIO
app.use(express.json());
app.use("/public", express.static("public"));

// --- 2. BASE DE DATOS ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a la Base de Datos (MongoDB)"))
    .catch((err) => console.error("❌ Error conectando a la BD:", err));

// --- 3. RUTAS ---
app.use(signrouter);       // Usuarios (Login/Registro)
app.use(teamRouter);       // Equipos
app.use(matchRouter);      // Partidos
app.use(playerRouter);     // Jugadoras
app.use(extraTrainingRouter); // Entrenamientos Extra
//app.use(newsRouter);     // Noticias
app.use(carritoRouter);    // Carrito
app.use(userRouter);       // Usuarios
app.use(dietaRouter);      // Dieta

// --- 4. ENCENDER SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor conectado al puerto ${PORT}`);
});

export default app;