// middlewares/validateOrder.js
const validator = require('../helpers/validate');

const validateOrder = (req, res, next) => {
  // Convert total_amount & user_id to numbers first
  req.body.user_id = Number(req.body.user_id);
  req.body.total_amount = Number(req.body.total_amount);
  const validationRule = {
    user_id: 'required|integer|min:1',
    order_date: 'required|string', // you can add date format if validator supports it
    total_amount: 'required|numeric|min:0',
    status: 'required|string'
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
  validateOrder
};