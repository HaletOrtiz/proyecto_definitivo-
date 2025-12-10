import Player from "../models/player.model.js";

export const createPlayer = async (req, res) => {
    try {
        const { name, dorsal, position } = req.body;

        // Si la cámara tomó una foto (req.file), guardamos la ruta.
        // Si no, lo dejamos vacío.
        // IMPORTANTE: Guardamos la ruta con una barra al principio para que la web la encuentre bien.
        const photoPath = req.file ? `/public/uploads/${req.file.filename}` : "";

        const newPlayer = new Player({
            name,
            dorsal,
            position,
            photo: photoPath // Aquí guardamos la dirección de la foto
        });

        await newPlayer.save();
        res.status(201).json(newPlayer);

    } catch (error) {
        res.status(500).json({ message: "Error al fichar jugadora", error });
    }
};

// Función extra para ver la plantilla completa
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener jugadoras", error });
    }
};