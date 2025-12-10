import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signrouter from "./routes/sign.route.js";
import teamRouter from "./routes/team.route.js";
import matchRouter from "./routes/match.route.js";
import playerRouter from "./routes/player.route.js";
import extraTrainingRouter from "./routes/extraTraining.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// --- LA VITRINA (Archivos Públicos) ---
// Esta línea es fundamental. Le dice al servidor:
// "Si alguien pide algo que empiece por '/public', búscalo en la carpeta 'public' y muéstralo".
// Sin esto, las fotos de las jugadoras darían error 404.
app.use("/public", express.static("public"));


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

mongoose.connect(MONGO_URI)
    .then(() => console.log(" Conectado a la Base de Datos (MongoDB)"))
    .catch((err) => console.error(" Error conectando a la BD:", err));

// --- ACTIVACIÓN DE RUTAS ---
app.use(signrouter);   // Usuarios (Login/Registro)
app.use(teamRouter);   // Equipos (Puntos)
app.use(matchRouter);  // Partidos (Calendario)
app.use(playerRouter); // Jugadoras (Plantilla y Fotos)
app.use(extraTrainingRouter); // Entrenamientos Extra

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor conectado al puerto ${PORT}`);
});

export default app;