import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Asegúrate de que la ruta a tu modelo es correcta
import Team from '../models/team.model.js';

dotenv.config();


const teams = [
    { position: 1, name: 'Las Rozas', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/LasRozas.png' },
    { position: 2, name: 'Rayo Majadahonda', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/RayoMajadahonda.png' },

    // ⚠️ CAMBIO IMPORTANTE: .jpg
    { position: 3, name: 'UD Villalba', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/logo-udvillalba.jpg' },

    { position: 4, name: 'Inter Majadahonda', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/InterMajadahonda.png' },

    // ⚠️ CAMBIO: minusculas 'olympia.png'
    { position: 5, name: 'Olympia', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/olympia.png' },

    // ⚠️ CAMBIO: De Villanueva a Puerta de Madrid (según tu foto)
    { position: 6, name: 'Puerta de Madrid', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/PuertaMadrid.png' },

    { position: 7, name: 'Nuevo Boadilla', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/NuevoBoadilla.png' },
    { position: 8, name: 'AD Castilla', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/ADCastilla.png' },

    // ⚠️ CAMBIO: minusculas 'cdg.png'
    { position: 9, name: 'CDG', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/cdg.png' },

    { position: 10, name: 'Colmenarejo', points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, shieldUrl: 'assets/escudos/Colmenarejo.png' }
];
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("🌱 Conectando a la Liga...");

        // 1. Borrar lo anterior
        await Team.deleteMany({});
        console.log("🧹 Pizarra borrada.");

        // 2. Insertar los nuevos equipos a 0
        await Team.insertMany(teams);
        console.log("✅ Equipos inscritos para la nueva temporada.");

        process.exit();
    })
    .catch((err) => {
        console.error("❌ Error:", err);
        process.exit(1);
    });