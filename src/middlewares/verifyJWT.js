const jwt = require('jsonwebtoken');
const config =
	require('../config/config')[process.env.NODE_ENV || 'development'];

const verifyJWT = (req, res, next) => {
	const token = req.headers['x-access-token'] || req.query['x-access-token'];

	if (!token) {
		return res.status(401).send({
			auth: false,
			message: 'No token provided.',
		});
	}
	jwt.verify(token, config.jsonwebtoken.secret, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.send({
					auth: false,
					message: 'Invalid token.',
				})
				.end();
		}

		req.userId = decoded.id;
		req.email = decoded.email;
		req.roles = decoded.roles;
		next();
	});
};

module.exports = verifyJWT;
