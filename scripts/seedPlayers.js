import mongoose from "mongoose";
import dotenv from "dotenv";
import Player from "../models/player.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

const plantillaInicial = [
    {
        name: 'Sofía García',
        dorsal: 10,
        posicion: 'Portera',
        photoUrl: 'assets/imagenes/portera.png',
        videoUrl: 'assets/video/video-portera.mp4',
    },
    {
        name: 'Elena Pérez',
        dorsal: 5,
        posicion: 'Defensa Central',
        photoUrl: 'assets/imagenes/jugadora4.png',
        videoUrl: 'assets/video/video-jugadora4.mp4',
    },
    {
        name: 'Carla Ruiz',
        dorsal: 1,
        posicion: 'Defensa Central',
        photoUrl: 'assets/imagenes/jugadora3.png',
        videoUrl: 'assets/video/video-jugadora3.mp4',
    },
    {
        name: 'María López',
        dorsal: 7,
        posicion: 'Delantera',
        photoUrl: 'assets/imagenes/jugadora1.png',
        videoUrl: 'assets/video/video-jugadora1.mp4',
    },
    {
        name: 'Lucía Castro',
        dorsal: 8,
        posicion: 'Pivote',
        photoUrl: 'assets/imagenes/jugadora2.png',
        videoUrl: 'assets/video/video-jugadora2.mp4',
    },
    {
        name: 'Ana Torres',
        dorsal: 3,
        posicion: 'Lateral',
        photoUrl: 'assets/imagenes/jugadora6.png',
        videoUrl: 'assets/video/video-jugadora6.mp4',
    },
    {
        name: 'Paula Gómez',
        dorsal: 11,
        posicion: 'Extremo',
        photoUrl: 'assets/imagenes/jugadora3.png',
        videoUrl: 'assets/video/video-jugadora3.2.mp4',
    },
    {
        name: 'Andrea Vidal',
        dorsal: 4,
        posicion: 'Defensa Lateral',
        photoUrl: 'assets/imagenes/jugadora5.png',
        videoUrl: 'assets/video/video-jugadora5.mp4',
    },
    {
        name: 'Irene Montes',
        dorsal: 9,
        posicion: 'Mediapunta',
        photoUrl: 'assets/imagenes/jugadora4.png',
        videoUrl: 'assets/video/video-jugadora4.2.mp4',
    },
    {
        name: 'Alba Hernandez',
        dorsal: 12,
        posicion: 'Defensa Central',
        photoUrl: 'assets/imagenes/jugadora6.png',
        videoUrl: 'assets/video/video-jugadora6.mp4',
    },
    {
        name: 'Susana Rodriguez',
        dorsal: 15,
        posicion: 'Defensa Central',
        photoUrl: 'assets/imagenes/jugadora4.png',
        videoUrl: 'assets/video/video-jugadora4.mp4',
    },
    {
        name: 'María Gonzalez',
        dorsal: 11,
        posicion: 'Defensa Central',
        photoUrl: 'assets/imagenes/jugadora2.png',
        videoUrl: 'assets/video/video-jugadora2.mp4',
    }
];

const sembrarPlantilla = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🌱 Conectando al vestuario...");

        await Player.deleteMany({});
        console.log("🧹 Pizarra borrada.");

        await Player.insertMany(plantillaInicial);
        console.log("✅ Jugadoras fichadas en la base de datos.");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error:", error);
    }
};

sembrarPlantilla();