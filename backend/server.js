// server.js
const express = require('express');
const config = require('./config/config');
const mongoose = require('./config/db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/asientos', require('./routes/asientoRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/eventos', require('./routes/eventoRoutes'));
app.use('/api/productoras', require('./routes/productoraRoutes'));
app.use('/api/ventas', require('./routes/ventaRoutes'));

app.listen(config.port, () => {
  console.log(`Servidor está corriendo en el puerto ${config.port}`);
});
