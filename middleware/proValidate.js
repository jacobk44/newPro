// middlewares/validateProduct.js
const validator = require('../helpers/validate');

const validateProduct = (req, res, next) => {
  // Convert price & stackQuantity to numbers first
  req.body.price = Number(req.body.price);
  req.body.stackQuantity = Number(req.body.stackQuantity);
  const validationRule = {
    productName: 'required|string',
    description: 'string',
    price: 'required|numeric|min:0',
    stackQuantity: 'required|numeric|min:0'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

module.exports = {
  validateProduct
};