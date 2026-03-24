class Cita {
  constructor(fecha, hora, duracion, email) {
    this.id = Date.now();
    this.fecha = fecha;
    this.hora = hora;
    this.duracion = duracion;
    this.email = email;
  }
}

module.exports = Cita;