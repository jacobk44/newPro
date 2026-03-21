const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
// const validation = require('../middleware/validate');

router.get('/', ordersController.getAll);

router.get('/:id', ordersController.getSingle);

router.post('/', ordersController.createProduct);

router.put('/:id', ordersController.updateProduct);

router.delete('/:id', ordersController.deleteProduct);

module.exports = router;