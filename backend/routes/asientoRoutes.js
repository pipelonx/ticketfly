const express = require('express');
const router = express.Router();
const asientoController = require('../controllers/asientoController');

// Ruta para agrupar los asientos por disponibilidad
router.get('/disponibilidad', asientoController.getAsientosGroupedByDisponibilidad);

router.get('/:id', asientoController.getAsientoById);
router.put('/:id', asientoController.updateAsiento);
router.delete('/:id', asientoController.deleteAsiento);

module.exports = router;
