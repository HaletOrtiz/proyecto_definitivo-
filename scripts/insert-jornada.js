// scripts/insert-jornada-final.js (Código CORREGIDO)

import mongoose from "mongoose";
import Team from '../models/team.model.js'; // AJUSTAR: Ruta real de su Modelo de Equipo
import Match from '../models/match.model.js'; // AJUSTAR: Ruta real de su Modelo de Partido


const DB_URL = 'mongodb+srv://halet_ortiz:12345@cluster0.wvhqfwx.mongodb.net/backendUDVillalba';

async function insertFirstRealMatchday() {
    try {
        // ... (Conexión a la DB)

        // 1. OBTENER LOS IDs REALES DE LOS EQUIPOS POR SU NOMBRE EXACTO
        const villalba = await Team.findOne({ name: 'UD Villalba' }); // Corregido: Sin puntos
        const lasRozas = await Team.findOne({ name: 'Las Rozas' }); // Nombre Exacto
        const interMajadahonda = await Team.findOne({ name: 'Inter Majadahonda' }); // Nombre Exacto
        const rayoMajadahonda = await Team.findOne({ name: 'Rayo Majadahonda' }); // Nombre Exacto

        const olympia = await Team.findOne({ name: 'Olympia' }); // Nombre Exacto
        const puertaDeMadrid = await Team.findOne({ name: 'Puerta de Madrid' }); // Nombre Exacto

        if (!villalba || !lasRozas || !interMajadahonda || !rayoMajadahonda || !olympia || !puertaDeMadrid) {
            console.error('❌ Error: No se encontraron todos los equipos. Verifique que los nombres de arriba están EXACTOS en su DB.');
            return;
        }

        // 2. CREAR LOS PARTIDOS DE LA JORNADA 1 USANDO LOS IDs REALES
        const partidosJornada1 = [
            {
                matchday: 1,
                localTeam: villalba._id,
                visitorTeam: lasRozas._id,
                date: new Date('2025-12-21T10:00:00Z'), // 10:00 AM
                localGoals: 0,
                visitorGoals: 0,
                isPlayed: false
            },
            {
                matchday: 1,
                localTeam: interMajadahonda._id,
                visitorTeam: rayoMajadahonda._id,
                date: new Date('2025-12-21T12:00:00Z'), // 12:00 PM
                localGoals: 0,
                visitorGoals: 0,
                isPlayed: false
            },
            {
                matchday: 1,
                localTeam: olympia._id,
                visitorTeam: puertaDeMadrid._id,
                date: new Date('2025-12-21T16:00:00Z'), // 4:00 PM
                localGoals: 0,
                visitorGoals: 0,
                isPlayed: false
            }
        ];

        // 3. INSERTAR EN LA BASE DE DATOS
        await Match.insertMany(partidosJornada1);
        console.log(`✅ ${partidosJornada1.length} partidos de la Jornada 1 insertados con éxito.`);

    } catch (error) {
        // ... (Manejo de error)
    } finally {
        // ... (Desconexión)
    }
}