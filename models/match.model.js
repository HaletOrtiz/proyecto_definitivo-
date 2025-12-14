// models/match.model.js

import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    matchday: { type: Number, required: true },

    // Referencia al ID del Equipo (Team)
    localTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    visitorTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },

    date: { type: Date, required: true },
    localGoals: { type: Number, default: 0 },
    visitorGoals: { type: Number, default: 0 },
    isPlayed: { type: Boolean, default: false }
});

export default mongoose.model("Match", matchSchema);