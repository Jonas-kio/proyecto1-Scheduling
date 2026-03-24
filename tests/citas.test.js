const request = require('supertest');
const app = require('../src/app');

describe('POST /citas - Registrar cita', () => {

  test('Registra una cita correctamente', async () => {
    const res = await request(app).post('/citas').send({
      fecha: '2026-03-25',
      hora: '10:00',
      duracion: 30,
      email: 'test@correo.com'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.cita).toHaveProperty('id');
    expect(res.body.cita.email).toBe('test@correo.com');
  });

  test('Falla si falta un campo', async () => {
    const res = await request(app).post('/citas').send({
      fecha: '2026-03-25',
      hora: '10:00'
      
    });

    expect(res.statusCode).toBe(400);
  });

});