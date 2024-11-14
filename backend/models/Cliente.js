const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  Rut_cliente: { type: String, unique: true },
  nombre_cliente: String,
  apellido_cliente: String,
  contrasena_cliente: String,
  email: String,
  cliente_vip: { type: Boolean, default: false },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
