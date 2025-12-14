

import mongoose from "mongoose";
import Team from '../models/team.model.js'; // AJUSTAR: Ruta real de su Modelo de Equipo

// AJUSTAR: Su URL de conexión a MongoDB Atlas
const DB_URL = 'mongodb+srv://halet_ortiz:12345@cluster0.wvhqfwx.mongodb.net/backendUDVillalba';

async function insertTeams() {
    try {
        await mongoose.connect(DB_URL);
        console.log('✅ DB conectada. Insertando 10 equipos...');

        const equiposIniciales = [
            // Los nombres deben coincidir EXACTAMENTE con su clasificación en Angular:
            { name: 'UD Villalba', points: 6, gamesPlayed: 2 },
            { name: 'Las Rozas', points: 4, gamesPlayed: 2 },
            { name: 'Inter Majadahonda', points: 1, gamesPlayed: 2 },
            { name: 'Rayo Majadahonda', points: 0, gamesPlayed: 2 },
            { name: 'Olympia', points: 0, gamesPlayed: 2 },
            { name: 'Puerta de Madrid', points: 0, gamesPlayed: 2 },
            { name: 'Nuevo Boadilla', points: 0, gamesPlayed: 2 },
            { name: 'AD Castilla', points: 0, gamesPlayed: 2 }, // Corregido: "AD Castilla"
            { name: 'CDG', points: 0, gamesPlayed: 2 },
            { name: 'Colmenarejo', points: 0, gamesPlayed: 2 },
            // Agregue los que falten si tiene más equipos en su liga.
        ];

        // insertMany es la función para insertar varios documentos a la vez
        const resultado = await Team.insertMany(equiposIniciales, { ordered: false });
        console.log(`✅ ${resultado.length} equipos insertados con éxito en la colección 'teams'.`);

    } catch (error) {
        console.error('❌ ERROR al insertar equipos. ¿Ya estaban insertados?', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

// Ejecute esta función solo una vez.
insertTeams();