const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/proValidate');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/',validation.validateProduct, productsController.createProduct);

router.put('/:id',validation.validateProduct, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;