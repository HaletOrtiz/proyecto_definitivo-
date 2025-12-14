import News from "../models/news.model.js";

// 1. PUBLICAR NOTICIA (Con foto)
export const createNews = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Si no suben foto, damos error (una noticia sin foto queda fea)
        if (!req.file) {
            return res.status(400).json({ message: "La noticia necesita una imagen" });
        }

        const imagePath = `/public/uploads/${req.file.filename}`;

        const newNews = new News({
            title,
            description,
            content,
            category,
            image: imagePath
        });

        await newNews.save();
        res.status(201).json(newNews);

    } catch (error) {
        res.status(500).json({ message: "Error al publicar noticia", error });
    }
};

// 2. LEER NOTICIAS (Las más nuevas primero)
export const getNews = async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener noticias", error });
    }
};