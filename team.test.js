import request from "supertest";
import app from "./index.js";
import mongoose from "mongoose";
import Team from "./models/team.model.js";

// Limpiamos la base de datos antes de empezar
beforeAll(async () => {
    await Team.deleteMany({});
});

describe('Pruebas de la Liga (Clasificación)', () => {
    let teamId;

    // 1. Prueba de Inscripción
    test('Debería crear un equipo nuevo con 0 puntos', async () => {
        const res = await request(app).post('/teams').send({ name: 'Las Leonas FC' });
        expect(res.status).toBe(201);
        expect(res.body.points).toBe(0);
        teamId = res.body._id; // Guardamos el ID para el siguiente paso
    });

    // 2. Prueba de Partido Ganado (La Lógica Matemática)
    test('Si gana, debería sumar 1 partido jugado y 3 puntos', async () => {
        const res = await request(app).put('/teams/stats').send({
            teamId: teamId,
            result: 'ganado'
        });

        expect(res.status).toBe(200);
        // Aquí viene la magia:
        expect(res.body.team.gamesPlayed).toBe(1); // ¿Sumó el partido?
        expect(res.body.team.points).toBe(3);      // ¿Sumó los 3 puntos?
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});