import Diet from "../models/dieta.model.js";

// 1. CREAR NUEVA DIETA
export const createDiet = async (req, res) => {
    try {
        const newDiet = new Diet(req.body);
        await newDiet.save();
        res.status(201).json(newDiet);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la dieta", error });
    }
};

// 2. VER TODAS LAS DIETAS
export const getDiets = async (req, res) => {
    try {
        const diets = await Diet.find();
        res.status(200).json(diets);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener dietas", error });
    }
};

// 3. VER UNA DIETA ESPECÍFICA (Por si quiere ver el detalle)
export const getDietById = async (req, res) => {
    try {
        const diet = await Diet.findById(req.params.id);
        if (!diet) return res.status(404).json({ message: "Dieta no encontrada" });
        res.status(200).json(diet);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar dieta", error });
    }
};