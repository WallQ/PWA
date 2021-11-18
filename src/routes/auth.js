const express = require('express');
const user = require('../components/user');

function AuthRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router.route('/sign-up').post((req, res, next) => {
		let body = req.body;
		user.createUser(body)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				console.log(token);
				res.status(200).send({
					message: 'User created successfully.',
				});
				next();
			})
			.catch((err) => {
				console.log(err);
				res.status(err.status || 500).send({
					error: {
						status: err.status || 500,
						message: err.message || "Internal Server Error",
					},
				});
				next();
			});
	});

	router.route('/sign-in').post((req, res, next) => {
		let body = req.body;
		user.verifyUser(body)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				console.log(token);
				res.status(200).send({
					message: 'User authenticated successfully.',
				});
				next();
			})
			.catch((err) => {
				console.log(err);
				res.status(err.status || 500).send({
					error: {
						status: err.status || 500,
						message: err.message || "Internal Server Error",
					},
				});
				next();
			});
	});

	router.route('/me').get((req, res, next) => {
		let token =
			req.body.token || req.query.token || req.headers['x-access-token'];

		if (!token) {
			console.log(token);
			res.status(401).send({
				message: 'No token provided.',
			});
		} else {
			user.verifyToken(token)
				.then((decoded) => {
					console.log(decoded);
					res.status(202).send({
						message: 'Valid token.',
					});
					next();
				})
				.catch((err) => {
					console.log(err);
					res.status(403).send({
						message: 'Invalid token.',
					});
					next();
				});
		}
	});

	return router;
}

module.exports = AuthRouter;
