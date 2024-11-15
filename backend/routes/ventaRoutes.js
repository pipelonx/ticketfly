const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/', ventaController.getVentas);
router.post('/', ventaController.createVenta);

// Nueva ruta para obtener ventas agrupadas por cliente(prox entrega)
router.get('/agrupadas-por-cliente', ventaController.getTotalVentasByCliente);

module.exports = router;
