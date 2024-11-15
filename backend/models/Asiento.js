const mongoose = require('mongoose');

const AsientoSchema = new mongoose.Schema({
  disponibilidad: { type: Boolean, default: true },
  ID_recinto: { type: mongoose.Schema.Types.ObjectId, ref: 'Recinto' },
});

module.exports = mongoose.model('Asiento', AsientoSchema);
