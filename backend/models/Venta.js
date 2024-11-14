const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  Rut_cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  id_evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento' },
  total_ventas: Number,
  cant_ticket: Number,
});

module.exports = mongoose.model('Venta', VentaSchema);
