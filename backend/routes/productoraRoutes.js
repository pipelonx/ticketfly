const express = require('express');
const router = express.Router();
const productoraController = require('../controllers/productoraController');

router.post('/', productoraController.createProductora);
router.get('/', productoraController.getProductoras);
router.get('/:id', productoraController.getProductoraById);
router.put('/:id', productoraController.updateProductora);
router.delete('/:id', productoraController.deleteProductora);

module.exports = router;
