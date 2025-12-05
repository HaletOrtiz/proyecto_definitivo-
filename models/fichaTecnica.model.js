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
    position: {
        type: String,
        required: true,
        enum: ['Portera', 'Defensa', 'Centrocampista', 'Delantera'] // Solo permitimos estas opciones
    },
    photo: {
        type: String, // Guardaremos la ruta: "uploads/nombre-foto.jpg"
        default: ""   // Si no tiene foto, se queda vacío
    },
    // Opcional: Relacionar jugadora con un equipo (útil si hay varias categorías)
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

export default mongoose.model("Player", playerSchema);