import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1. RUTA DE REGISTRO (Para crear usuario)
router.post('/register', async (req, res) => {
    try {
        // Recibimos los datos del "paquete" (body)
        const { email, password, nombre } = req.body;

        // Encriptamos la contraseña (nadie debe verla texto plano)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creamos el usuario en memoria con el molde
        const user = new User({
            email: email,
            password: hashedPassword,
            nombre: nombre
        });

        // Guardamos en la Base de Datos
        await user.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(400).json({ message: "Error al registrar", error: error.message });
    }
});

// 2. RUTA DE LOGIN (Para entrar)
router.post('/login', async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        // Buscamos si el email existe en la BD
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Comparamos la contraseña que nos dan con la encriptada de la BD
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Si todo ok, le damos su Token (su carnet de socio)
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        res.json({ token: token, nombre: user.nombre });
    } catch (error) {
        res.status(400).json({ message: "Error en el login" });
    }
});

export default router;