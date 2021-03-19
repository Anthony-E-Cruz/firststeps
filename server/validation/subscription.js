const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateSubscriptionInput(data) {
  let errors = {};

  data.option = validText(data.option) ? data.option : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.option)) {
    errors.option = 'option is required';
  }

  if (!Validator.isBoolean(data.active)) {
    errors.active = 'active status required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};