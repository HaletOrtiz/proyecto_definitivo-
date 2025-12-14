import mongoose from "mongoose";
import dotenv from "dotenv";
import Team from "./models/team.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

// Lista de equipos basada en sus archivos
const equiposLiga = [
    { name: "U.D. Villalba", shield: "/public/escudos/logo-udvillalba.png" },
    { name: "A.D. Castilla", shield: "/public/escudos/ADCastilla.png" },
    { name: "C.D. Galapagar", shield: "/public/escudos/cdg.png" },
    { name: "Colmenarejo", shield: "/public/escudos/Colmenarejo.png" },
    { name: "Inter Majadahonda", shield: "/public/escudos/InterMajadahonda.png" },
    { name: "Las Rozas C.F.", shield: "/public/escudos/LasRozas.png" },
    { name: "Nuevo Boadilla", shield: "/public/escudos/NuevoBoadilla.png" },
    { name: "Olympia Las Rozas", shield: "/public/escudos/olympia.png" },
    { name: "Puerta de Madrid", shield: "/public/escudos/PuertaMadrid.png" },
    { name: "Rayo Majadahonda", shield: "/public/escudos/RayoMajadahonda.png" },
    { name: "Villanueva del Pardillo", shield: "/public/escudos/VILLANUEVA.png" }
];

const seedTeams = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🌱 Conectado a la Base de Datos...");

        // Opcional: Borrar equipos antiguos para empezar de cero
        // await Team.deleteMany({});
        // console.log("🧹 Equipos antiguos borrados.");

        for (const equipo of equiposLiga) {
            // Usamos findOneAndUpdate con 'upsert: true'
            // Esto significa: "Si existe, no hagas nada. Si no existe, créalo".
            // Así evitamos duplicados si ejecuta el script varias veces.
            await Team.findOneAndUpdate(
                { name: equipo.name },
                equipo,
                { upsert: true, new: true }
            );
        }

        console.log(`✅ ${equiposLiga.length} equipos listos para la liga.`);
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error al cargar equipos:", error);
    }
};

seedTeams();