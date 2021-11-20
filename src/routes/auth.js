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
		user.register(body)
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
						message: err.message || 'Internal Server Error',
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
						message: err.message || 'Internal Server Error',
					},
				});
				next();
			});
	});

	return router;
}

module.exports = AuthRouter;
