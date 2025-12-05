import Team from "../models/team.model.js"; // Importamos el modelo (la hoja de cálculo)

export const updateTeamStats = async (req, res) => {
    try {
        const { teamId, result } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: "Equipo no encontrado" });


        team.gamesPlayed += 1;


        if (result === "ganado") {
            team.gamesWon += 1;
            team.points += 3;
        } else if (result === "empatado") {
            team.gamesDrawn += 1;
            team.points += 1;
        } else if (result === "perdido") {
            team.gamesLost += 1;

        }


        await team.save();

        res.status(200).json({ message: "Clasificación actualizada", team });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
};


export const createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const newTeam = new Team({ name }); // Crea el equipo con 0 puntos por defecto
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Error al crear equipo", error });
    }
};