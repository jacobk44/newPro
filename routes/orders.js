const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/orderValidate');

router.get('/', ordersController.getAll);

router.get('/:id', ordersController.getSingle);

router.post('/', validation.validateOrder, ordersController.createProduct);

router.put('/:id',validation.validateOrder, ordersController.updateProduct);

router.delete('/:id', ordersController.deleteProduct);

module.exports = router;