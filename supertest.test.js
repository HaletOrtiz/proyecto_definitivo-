import request from "supertest";
import app from "./index.js";
import mongoose from "mongoose";
import User from "./models/user.model.js";

const usuarioPrueba = {
    email: 'test_automatico@empresa.com',
    password: '123'
};

// ANTES DE EMPEZAR: Limpiamos la base de datos para no tener errores de "usuario duplicado"
beforeAll(async () => {
    await User.deleteMany({ email: usuarioPrueba.email });
});

describe('Pruebas de Autenticación', () => {

    // 1. Primero probamos que se puede REGISTRAR
    test('Debería registrar un usuario nuevo', async () => {
        const response = await request(app).post('/register').send(usuarioPrueba);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
    });

    // 2. Ahora probamos que ese mismo usuario puede ENTRAR
    test('Login correcto debería devolver token', async () => {
        const response = await request(app).post('/login').send(usuarioPrueba);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // 3. Pruebas de error
    test('Login con clave incorrecta debería fallar', async () => {
        const response = await request(app).post('/login').send({
            email: usuarioPrueba.email,
            password: 'CLAVE_FALSA'
        });
        expect(response.status).toBe(400);
    });
});

// AL FINALIZAR: Cerramos la conexión para que la terminal no se quede colgada
afterAll(async () => {
    await mongoose.connection.close();
});