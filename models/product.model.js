import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String, // Guardaremos la ruta de assets (ej: "assets/img/...")
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

export default mongoose.model("Product", productSchema);