const jwt = require('jsonwebtoken');
const config =
	require('../config/config')[process.env.NODE_ENV || 'development'];

exports.verifyJWT = (req, res, next) => {
	const token = req.cookies.jwt || req.headers['X-Access-Token'];

	if (!token) {
		return res.status(401).send({
			error: {
				status: 401,
				message: 'Your token provided is invalid or has expired.',
			},
		});
	}
	jwt.verify(token, config.jsonwebtoken.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				error: {
					status: 401,
					message: 'Your token provided is invalid or has expired.',
				},
			});
		}

		req.userId = decoded.id;
		req.email = decoded.email;
		req.roles = decoded.roles;
		next();
	});
};

exports.verifyRecoverPasswordJWT = (req, res, next) => {
	const token = req.headers['x-access-token'] || req.query['x-access-token'];

	if (!token) {
		return res.status(401).send({
			error: {
				status: 401,
				message: 'Your token provided is invalid or has expired.',
			},
		});
	}
	jwt.verify(token, config.jsonwebtoken.recover_secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				error: {
					status: 401,
					message: 'Your token provided is invalid or has expired.',
				},
			});
		}

		req.userId = decoded.id;
		req.email = decoded.email;
		req.validationHash = decoded.validationHash;

		next();
	});
};
