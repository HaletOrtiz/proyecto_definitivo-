import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dorsal: {
        type: Number,
        required: true
    },
    // En su front lo llama 'posicion' (en español), así que lo cambiamos aquí también para que coincida
    posicion: {
        type: String,
        required: true,
        // Puede ajustar o quitar este enum si quiere más libertad
        enum: ['Portera', 'Defensa Lateral', 'Defensa Central', 'Lateral', 'Pivote', 'Centrocampista', 'Mediapunta', 'Extremo', 'Delantera']
    },
    photoUrl: {
        type: String, // Ruta de la foto
        default: ""
    },
    videoUrl: {
        type: String, // Ruta del video
        default: ""
    }
});

export default mongoose.model("Player", playerSchema);