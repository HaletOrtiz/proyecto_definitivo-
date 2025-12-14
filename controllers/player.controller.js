import Player from "../models/player.model.js";

export const createPlayer = async (req, res) => {
    try {
        // Recibimos los datos directamente del cuerpo del mensaje (req.body)
        // El Frontend nos enviará las rutas escritas como texto
        const { name, dorsal, posicion, photoUrl, videoUrl } = req.body;

        const newPlayer = new Player({
            name,
            dorsal,
            posicion,
            photoUrl, // Guardamos el texto tal cual (ej: "assets/img/jugadora1.png")
            videoUrl
        });

        await newPlayer.save();
        res.status(201).json(newPlayer);

    } catch (error) {
        res.status(500).json({ message: "Error al fichar jugadora", error: error.message });
    }
};

export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener jugadoras", error });
    }
};