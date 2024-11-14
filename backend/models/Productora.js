const mongoose = require('mongoose');

const ProductoraSchema = new mongoose.Schema({
  RUN_prod: { type: String, unique: true },
  nombre_prod: String,
  nro_ventas: { type: Number, default: 0 },
  contrasena_prod: String,
});

module.exports = mongoose.model('Productora', ProductoraSchema);
