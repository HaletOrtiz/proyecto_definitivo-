import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    // Número de jornada (Ej: 1, 2, 3...)
    matchday: {
        type: Number,
        required: true
    },
    // Equipo Local (Conectado con la colección 'Team')
    localTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    // Equipo Visitante (Conectado con la colección 'Team')
    visitorTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    // Fecha y hora del partido
    date: {
        type: Date,
        required: true
    },
    // Marcador (Si no se ha jugado, puede estar vacío o en 0)
    localGoals: {
        type: Number,
        default: 0
    },
    visitorGoals: {
        type: Number,
        default: 0
    },
    // ¿Ya se jugó? (Para saber si mostrar resultado o solo horario)
    isPlayed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Match", matchSchema);