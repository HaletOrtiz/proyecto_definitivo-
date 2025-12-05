import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesDrawn: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
});


export default mongoose.model("Team", teamSchema);