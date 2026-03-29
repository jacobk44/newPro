const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/orderValidate');
const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', ordersController.getAll);

router.get('/:id', ordersController.getSingle);

router.post('/', isAuthenticated, validation.validateOrder, ordersController.createOrder);

router.put('/:id',isAuthenticated,validation.validateOrder, ordersController.updateOrder);

router.delete('/:id',isAuthenticated, ordersController.deleteOrder);

module.exports = router;