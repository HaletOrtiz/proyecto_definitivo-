import ExtraTraining from "../models/extraTraining.model.js";

// 1. CREAR (Para que usted llene la base de datos)
export const createExtraTraining = async (req, res) => {
    try {
        const training = new ExtraTraining(req.body);
        await training.save();
        res.status(201).json(training);
    } catch (error) {
        res.status(500).json({ message: "Error al crear entrenamiento extra", error });
    }
};

// 2. OBTENER (Con filtro opcional por categoría)
// Si la web llama a "/extra-trainings?category=Fuerza", solo devuelve fuerza.
export const getExtraTrainings = async (req, res) => {
    try {
        const { category } = req.query; // Miramos si hay filtro en la url

        // Si hay categoría, buscamos solo esa. Si no, buscamos todo ({})
        const filtro = category ? { category: category } : {};

        const trainings = await ExtraTraining.find(filtro);
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener entrenamientos", error });
    }
};