import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "¡Alto! Necesitas estar logueado (Falta Token)" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Carnet falso o caducado" });
    }
};

export default authMiddleware;