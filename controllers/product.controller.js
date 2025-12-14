import Product from "../models/product.model.js"; // Asegúrese de haber creado este modelo antes

// 1. VER CATÁLOGO
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al cargar la tienda", error });
    }
};

// 2. AÑADIR PRODUCTO (Admin)
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};