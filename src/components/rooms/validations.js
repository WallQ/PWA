const { validationResult, check } = require('express-validator');

exports.results = (req) => {
	return validationResult(req);
};

exports.newRoom = () => {
	return [
		check('username')
			.trim()
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 40 })
			.withMessage('password must be 8 characters')
			.escape(),
	];
};
