import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // Usuario que hace el pedido (conectado con la colección de usuarios)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Lista de productos en el carrito
    items: [{
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 }
    }],
    // Precio total del carrito
    totalPrice: {
        type: Number,
        default: 0
    },
    // Estado del pedido
    status: {
        type: String,
        enum: ['pendiente', 'pagado', 'enviado'],
        default: 'pendiente'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Carrito", cartSchema);