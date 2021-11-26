const { validationResult, check, body } = require('express-validator');

exports.results = (req) => {
	return validationResult(req);
};

exports.availability = [

  body('hotelID')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Can not be empty!')
    .isMongoId()
    .withMessage('This is not a ID'),

  body('numGuest')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Can not be empty!')
    .isNumeric({max:10}),

  body('numGuestChild')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Can not be empty!')
    .isNumeric({max:10}),

  body('checkIn_date')
    .not()
    .isEmpty()
    .withMessage('Can not be empty!')
    .isISO8601()
    .toDate().bail(),

  body('checkOut_date')
    .not()
    .isEmpty()
    .withMessage('Can not be empty!')
    .isISO8601()
    .toDate().bail()
    .custom((value, { req }) => value > req.body.checkIn_date)
    .withMessage("Check Out Date needs to be after of Ckeck In date"),
  next
];

function next(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({errors: errors.array()});
  next();
}
