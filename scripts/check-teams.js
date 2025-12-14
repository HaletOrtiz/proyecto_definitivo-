// scripts/check-teams.js

import mongoose from "mongoose";
import Team from '../models/team.model.js'; // AJUSTAR: Ruta real de su Modelo de Equipo

// AJUSTAR: Su URL de conexión a MongoDB Atlas
const DB_URL = 'mongodb+srv://halet_ortiz:12345@cluster0.wvhqfwx.mongodb.net/backendUDVillalba';

async function getTeamIDs() {
    try {
        await mongoose.connect(DB_URL);
        console.log('✅ Conectado. Listando equipos...');

        // Buscar todos los equipos y seleccionar solo el ID y el Nombre
        const equipos = await Team.find().select('_id name');

        if (equipos.length === 0) {
            console.log('⚠️ La colección de equipos está vacía.');
            return;
        }

        console.log('\n--- EQUIPOS ENCONTRADOS ---');
        equipos.forEach(equipo => {
            // Esto imprimirá el ID exacto y el nombre exacto de la DB
            console.log(`ID: ${equipo._id} | Nombre: "${equipo.name}"`);
        });
        console.log('---------------------------\n');

    } catch (error) {
        console.error('❌ ERROR al listar equipos. Verifique la URL de conexión.', error);
    } finally {
        await mongoose.disconnect();
    }
}

getTeamIDs();