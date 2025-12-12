import request from "supertest";
import app from "./index.js";
import mongoose from "mongoose";
import News from "./models/news.model.js";

beforeAll(async () => {
    await News.deleteMany({}); // Limpiamos el tablón antes de empezar
});

describe('Pruebas del Módulo de Noticias', () => {

    test('Debería publicar una noticia con FOTO', async () => {
        // Simulamos una imagen (creamos un archivo falso en memoria)
        const imagenFalsa = Buffer.from("imagen_de_prueba");

        const res = await request(app)
            .post('/news')
            .field('title', 'Nueva Victoria') // Campo de texto
            .field('description', 'El equipo ganó 3-0') // Campo de texto
            .attach('image', imagenFalsa, 'foto_test.jpg'); // ADJUNTAMOS LA FOTO

        expect(res.status).toBe(201); // 201 = Creado
        expect(res.body.title).toBe('Nueva Victoria');
        expect(res.body).toHaveProperty('image'); // Verificamos que guardó la ruta
    });

    test('Debería ver la lista de noticias', async () => {
        const res = await request(app).get('/news');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});