import Carrito from "../models/carrito.model.js";

// 1. CREAR PEDIDO (Finalizar compra)
export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.userId; // El ID viene del token del usuario logueado

        // Calculamos el precio total sumando cada producto (precio * cantidad)
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

        const newCart = new Carrito({
            user: userId,
            items: items,
            totalPrice: totalPrice,
            status: 'pagado' // Simulamos que ya se pagó al crear el pedido
        });

        await newCart.save();
        res.status(201).json(newCart);

    } catch (error) {
        res.status(500).json({ message: "Error al procesar el pedido", error });
    }
};

// 2. VER MIS PEDIDOS
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Buscamos solo los pedidos de este usuario
        const orders = await Carrito.find({ user: userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedidos", error });
    }
};