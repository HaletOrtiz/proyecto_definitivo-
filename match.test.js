import request from "supertest";
import app from "./index.js";
import mongoose from "mongoose";
import Match from "./models/match.model.js";
import Team from "./models/team.model.js";

// Limpieza antes de empezar: Borramos partidos y equipos viejos
beforeAll(async () => {
    await Match.deleteMany({});
    await Team.deleteMany({});
});

describe('Pruebas del Calendario (Jornadas)', () => {
    let localId, visitorId;

    // 1. PRIMERO: Necesitamos equipos para poder jugar
    test('Debería crear equipos para el partido', async () => {
        const team1 = await request(app).post('/teams').send({ name: 'Rojos FC' });
        const team2 = await request(app).post('/teams').send({ name: 'Azules FC' });

        // Guardamos sus carnets de identidad (IDs)
        localId = team1.body._id;
        visitorId = team2.body._id;

        expect(team1.status).toBe(201);
    });

    // 2. SEGUNDO: El Admin agenda el partido (usando los IDs)
    test('Debería agendar un partido', async () => {
        const res = await request(app).post('/matches').send({
            matchday: 1,
            localTeam: localId,
            visitorTeam: visitorId,
            date: new Date() // Fecha de hoy
        });

        expect(res.status).toBe(201);
    });

    // 3. TERCERO: El Hincha mira el calendario (Aquí probamos su código manual)
    test('El calendario debería mostrar los NOMBRES reales, no códigos', async () => {
        const res = await request(app).get('/matches');

        expect(res.status).toBe(200);

        // Aquí está la clave: ¿Nos devuelve el nombre o el código raro?
        // Si su código manual funciona, debería decir "Rojos FC"
        console.log("El calendario dice:", res.body[0]); // Para que lo vea en consola

        expect(res.body[0].local).toBe('Rojos FC');
        expect(res.body[0].visitante).toBe('Azules FC');
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});