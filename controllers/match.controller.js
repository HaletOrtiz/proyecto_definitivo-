// controllers/match.controller.js

import Match from "../models/match.model.js";
import Team from "../models/team.model.js" // Necesario para la referencia, no para la búsqueda manual

// 1. AGENDAR PARTIDO (Ruta POST)
export const createMatch = async (req, res) => {
    try {
        const { matchday, localTeam, visitorTeam, date } = req.body;
        const newMatch = new Match({ matchday, localTeam, visitorTeam, date });
        await newMatch.save();
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(500).json({ message: "Error al crear partido", error });
    }
};

// 2. VER CALENDARIO (Ruta GET) - OPTIMIZADO con POPULATE
export const getCalendar = async (req, res) => {
    try {
        // **QUITAMOS EL POPULATE** - Solo trae los IDs y los datos básicos del partido.
        const matches = await Match.find().sort('date');

        // Enviamos la respuesta inmediatamente.
        return res.status(200).json(matches);

    } catch (error) {
        console.error("Error en la prueba de fuego (debe funcionar):", error);
        return res.status(500).json({ message: "Prueba fallida." });
    }
};
// 3. ACTUALIZAR MARCADOR (Ruta PUT)
// ASUMIR que existe un router.put("/matches/score") que llama a esta función
export const updateScore = async (req, res) => {
    try {
        const { _id, localGoals, visitorGoals, isPlayed } = req.body;

        const updatedMatch = await Match.findByIdAndUpdate(_id,
            { localGoals, visitorGoals, isPlayed },
            { new: true } // Para devolver el documento actualizado
        );

        if (!updatedMatch) {
            return res.status(404).json({ message: "Partido no encontrado." });
        }

        res.status(200).json(updatedMatch);
    } catch (error) {
        console.error("Error al actualizar el marcador:", error);
        res.status(500).json({ message: "Error al actualizar marcador." });
    }
};