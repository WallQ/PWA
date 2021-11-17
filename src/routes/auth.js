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
			.then((response) => {
				console.log(response);
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				console.log(err);
				res.status(409).send(err);
				next();
			});
	});

	router.route('/sign-in').post((req, res, next) => {
		let body = req.body;
		user.findUser(body)
			.then((userData) => user.createToken(userData))
			.then((response) => {
				console.log(response);
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send(err);
				next();
			});
	});

	router.route('/me').get((req, res, next) => {
		let token = req.headers['x-access-token'];

		if (!token) {
			res.status(401).send({
				auth: false,
				message: 'No token provided.',
			});
		}

		user.verifyToken(token)
			.then((decoded) => {
				res.status(202).send({ auth: true, decoded });
			})
			.catch((err) => {
				res.status(500).send(err);
				next();
			});
	});

	return router;
}

module.exports = AuthRouter;
