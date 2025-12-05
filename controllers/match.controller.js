import Match from "../models/match.model.js";
import Team from "../models/team.model.js"; // IMPORTANTE: Necesitamos acceso a los equipos para buscar sus nombres

// 1. AGENDAR PARTIDO (Para el Admin)
// Esta parte guarda el partido con los IDs (DNI) de los equipos
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

// 2. VER CALENDARIO (MÉTODO MANUAL / ARTESANAL)
// Aquí es donde hacemos el trabajo de "traducción" paso a paso
export const getCalendar = async (req, res) => {
    try {
        // PASO 1: Sacamos todos los partidos del cajón (vienen con IDs raros)
        const matches = await Match.find();

        // PASO 2: Preparamos una lista vacía para ir apuntando los resultados limpios
        const calendarLimpio = [];

        // PASO 3: Vamos partido por partido (Bucle) traduciendo los códigos
        for (const match of matches) {

            // Buscamos manualmente en el archivador de EQUIPOS quién es el local usando su ID
            const local = await Team.findById(match.localTeam);

            // Hacemos lo mismo para el visitante
            const visitor = await Team.findById(match.visitorTeam);

            // Seguridad: Si por algún motivo se borró un equipo y no existe, saltamos este partido
            if (!local || !visitor) continue;

            // PASO 4: Escribimos en nuestra lista limpia los Nombres Reales
            calendarLimpio.push({
                jornada: match.matchday,
                local: local.name,       // Ponemos el nombre real (ej: "Rojos FC")
                visitante: visitor.name, // Ponemos el nombre real (ej: "Azules FC")
                fecha: match.date,
                resultado: `${match.localGoals} - ${match.visitorGoals}`, // Formato bonito "3 - 1"
                jugado: match.isPlayed
            });
        }

        // PASO 5: Entregamos la lista limpia al cliente (Frontend)
        res.status(200).json(calendarLimpio);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener calendario", error });
    }
};