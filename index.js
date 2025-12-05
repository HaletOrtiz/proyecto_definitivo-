import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signrouter from "./routes/sign.route.js";
import teamRouter from "./routes/team.route.js";
import matchRouter from "./routes/match.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

mongoose.connect(MONGO_URI)
    .then(() => console.log(" Conectado a la Base de Datos (MongoDB)"))
    .catch((err) => console.error(" Error conectando a la BD:", err));

app.use(signrouter);
app.use(teamRouter);
app.use(matchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor conectado al puerto ${PORT}`);
});

export default app;