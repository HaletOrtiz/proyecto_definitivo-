import mongoose from "mongoose";

const extraTrainingSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Fuerza', 'Velocidad', 'Resistencia', 'Propiocepción'] // Las 4 opciones del menú principal
    },
    title: {
        type: String, // Ej: "Introducción a la Fuerza"
        required: true
    },
    description: {
        type: String, // El texto explicativo de abajo
        required: true
    },
    level: {
        type: String,
        enum: ['Básico', 'Intermedio', 'Avanzado'], // Para la etiqueta de color
        default: 'Básico'
    },
    duration: {
        type: Number, // Ej: 30 (minutos)
        required: true
    },
    image: {
        type: String, // Ruta de la foto de la tarjeta
        required: true
    },
    keyExercises: [{
        type: String // Una lista de textos. Ej: ["Sentadillas", "Plancha", "Puente"]
    }]
});

export default mongoose.model("ExtraTraining", extraTrainingSchema);