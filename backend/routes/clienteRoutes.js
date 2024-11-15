const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas públicas
router.post('/register', clienteController.register);
router.post('/login', clienteController.login);

// Rutas protegidas (requeriría un middleware de autenticación)
router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.getClienteById);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
