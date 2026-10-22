
const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.listar);

// Buscar um cliente pelo ID
router.get('/:id', clienteController.buscarPorId);

// Cadastrar um cliente
router.post('/', clienteController.criar);

// Atualizar um cliente
router.put('/:id', clienteController.atualizar);

// Excluir um cliente
router.delete('/:id', clienteController.excluir);

module.exports = router;
