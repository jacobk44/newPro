const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/proValidate');
const {isAuthenticated} = require('../middleware/authenticate')


router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/',isAuthenticated, validation.validateProduct, productsController.createProduct);

router.put('/:id',isAuthenticated, validation.validateProduct, productsController.updateProduct);

router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;