import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js"; // Asegúrate de que creaste este modelo en el paso anterior

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_proyecto_backend";

const productosIniciales = [
    {
        nombre: 'Camiseta Oficial 1ª Equipación',
        precio: 45.0,
        imagen: 'assets/imagenes/camiseta-jugador.jpeg', // LA RUTA SE QUEDA IGUAL (apunta al frontend)
        descripcion: 'Camiseta oficial de la primera equipación temporada 2025/26. Color amarillo.'
    },
    {
        nombre: 'Camiseta Oficial Portero',
        precio: 45.0,
        imagen: 'assets/imagenes/camiseta-portero.jpeg',
        descripcion: 'Camiseta oficial de la equipación portero. Color rojo.'
    },
    {
        nombre: 'Bufanda U.D. Villalba',
        precio: 15.0,
        imagen: 'assets/imagenes/bufanda.jpeg',
        descripcion: 'Bufanda de lana con el escudo y los colores del club. ¡Anima a tu equipo!'
    }
];

const sembrarProductos = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🌱 Conectando al almacén...");

        // Borramos si había algo antiguo para no duplicar
        await Product.deleteMany({});
        console.log("🧹 Estanterías limpiadas.");

        // Insertamos los productos
        await Product.insertMany(productosIniciales);
        console.log("✅ Productos colocados en la base de datos.");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error:", error);
    }
};

sembrarProductos();