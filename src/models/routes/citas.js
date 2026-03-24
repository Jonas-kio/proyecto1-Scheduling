const express = require('express');
const router = express.Router();
const Cita = require('../cita');

let citas = []; 

// POST /citas - Registrar una cita
router.post('/', (req, res) => {
  const { fecha, hora, duracion, email } = req.body;

  if (!fecha || !hora || !duracion || !email) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const nuevaCita = new Cita(fecha, hora, duracion, email);
  citas.push(nuevaCita);

  res.status(201).json({ mensaje: 'Cita registrada', cita: nuevaCita });
});

// PUT /citas/:id - Actualizar una cita
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const cita = citas.find(c => c.id === id);
  if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

  const { fecha, hora, duracion, email } = req.body;
  if (!fecha && !hora && !duracion && !email) {
    return res.status(400).json({ error: 'Al menos un campo para actualizar' });
  }

  if (fecha) cita.fecha = fecha;
  if (hora) cita.hora = hora;
  if (duracion) cita.duracion = duracion;
  if (email) cita.email = email;

  res.json({ mensaje: 'Cita actualizada', cita });
});

// DELETE /citas/:id - Cancelar una cita
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = citas.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Cita no encontrada' });

  const [removed] = citas.splice(index, 1);
  res.json({ mensaje: 'Cita cancelada', cita: removed });
});

module.exports = { router, citas };