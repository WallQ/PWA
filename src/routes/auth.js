const express = require('express');
const users = require('../components/users');

function AuthRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router.route('/register').post(function (req, res, next) {
		console.log('Create user');
		let body = req.body;
		users
			.create(body)
			.then((user) => users.createToken(user))
			.then((response) => {
				res.status(200);
				res.send(response);
				next();
			})
			.catch((err) => {
				console.log('Player already exist!', err);
				res.status(500);
				next();
			});
	});

	router.route('/login').post(function (req, res, next) {
		console.log('Login user');
		let body = req.body;

		users
			.findUser(body)
			.then((user) => users.createToken(user))
			.then((response) => {
				res.status(200);
				res.send(response);
				next();
			})
			.catch((err) => {
				console.log('Incorrect data!', err);
				res.status(500);
				next();
			});
	});

	router.route('/me').get(function (req, res, next) {
		console.log('Login user');
		let token = req.headers['x-access-token'];

		if (!token) {
			res.status(401).send({
				auth: false,
				message: 'No token provided.',
			});
		}

		users
			.verifyToken(token)
			.then((decoded) => {
				res.status(202).send({ auth: true, decoded });
			})
			.catch((err) => {
				res.status(500);
				res.send(err);
				next();
			});
	});

	return router;
}

module.exports = AuthRouter;
