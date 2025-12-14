import Team from "../models/team.model.js";

// ESTA ES LA FUNCIÓN CORREGIDA PARA EDITAR
export const updateTeamStats = async (req, res) => {
    try {
        // 1. Separamos el ID del resto de los datos
        const { _id, ...datosNuevos } = req.body;

        // 2. Buscamos por ID y actualizamos
        // { new: true } nos devuelve el dato ya cambiado para confirmar
        const team = await Team.findByIdAndUpdate(_id, datosNuevos, { new: true });

        if (!team) return res.status(404).json({ message: "Equipo no encontrado" });

        res.status(200).json({ message: "Datos actualizados correctamente", team });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
};

// --- Mantenemos las otras funciones que ya tenías ---
export const createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const newTeam = new Team({ name });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Error al crear equipo", error });
    }
};

export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ points: -1, gf: -1 }); // Ordenado por Puntos y Goles a favor
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clasificación", error });
    }
};