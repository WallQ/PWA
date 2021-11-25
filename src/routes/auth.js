const express = require('express');
const user = require('../components/user');

function AuthRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/sign-up').post((req, res, next) => {
		let body = req.body;
		user.register(body)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				console.log(token);
				res.status(200).send({
					message: 'Successfully signed up.',
				});
			})
			.catch(next);
	});

	router.route('/sign-in').post((req, res, next) => {
		let body = req.body;
		user.verifyUser(body)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				console.log(token);
				res.status(200).send({
					message: 'Successfully signed in.',
				});
			})
			.catch(next);
	});

	router.route('/sign-out').get((req, res, next) => {
		res.status(200).send({
			message: 'Successfully signed out.',
		});
	});

	return router;
}

module.exports = AuthRouter;
