import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, // Ej: "Consejos para tener energía en el partido"
        required: true
    },
    type: {
        type: String,

        enum: ['Infantil', 'Competición', 'Recuperación', 'Vegetariana', 'General'],
        default: 'General'
    },
    // La tabla se mantiene igual, es perfecta para organizar la semana
    weeklyPlan: [{
        day: { type: String, required: true }, // "Lunes"
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true }, // Comida del mediodía
        dinner: { type: String, required: true },
        snacks: { type: String } // Merienda (Muy importante a esta edad)
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Diet", dietSchema);