const { validationResult, check } = require('express-validator')

exports.results = (req) => {
    return validationResult(req);
  }

exports.newRoom = () => {
    return [
      check('number')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('number is required')
        .isNumeric()
    ]
  }