const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  RUN_prod: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora' },
  ID_recinto: { type: mongoose.Schema.Types.ObjectId, ref: 'Recinto' },
  nombre_evento: String,
  fecha: Date,
  hora_inicio: String,
  hora_termino: String,
  descripcion: String,
});

module.exports = mongoose.model('Evento', EventoSchema);
