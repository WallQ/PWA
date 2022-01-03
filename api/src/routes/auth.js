const express = require('express');
const user = require('../components/user');
const mailSender = require('../utils/mailSender');
const {
	verifyJWT,
	verifyRecoverPasswordJWT,
} = require('../middlewares/verifyJWT');

function AuthRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/sign-up').post((req, res, next) => {
		let { name, surname, email, password } = req.body;
		user.register(name, surname, email, password)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				res.cookie('token', token, {
					maxAge: 1800000,
					expires: new Date(Date.now()) + 1800000,
					httpOnly: true,
				})
					.status(200)
					.send({
						status: 200,
						auth: true,
						message: 'Successfully signed up.',
					});
			})
			.catch((error) => {
				res.status(200).send({
					status: error.status,
					auth: false,
					message: error.message,
				});
			});
	});

	router.route('/sign-in').post((req, res, next) => {
		let { email, password } = req.body;
		return user
			.verifyUser(email, password)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				res.cookie('token', token, {
					maxAge: 1800000,
					expires: new Date(Date.now()) + 1800000,
					httpOnly: true,
				})
					.status(200)
					.send({
						status: 200,
						auth: true,
						message: 'Successfully signed in.',
					});
			})
			.catch((error) => {
				res.status(200).send({
					status: error.status,
					auth: false,
					message: error.message,
				});
			});
	});

	router.route('/sign-out').get(verifyJWT, (req, res, next) => {
		res.clearCookie('token')
			.status(200)
			.send({
				status: 200,
				auth: false,
				message: 'Successfully signed out.',
			});
	});

	router.route('/signed').get(verifyJWT, (req, res, next) => {
		res.status(200)
			.send({
				status: 200,
				auth: true,
				roles: req.roles,
				message: 'User authenticated!',
			});
	});

	router.use(verifyRecoverPasswordJWT);

	router.route('/forgot-password').post((req, res, next) => {
		let email = req.body.email;
		user.findByEmail(email)
			.then((userData) =>
				user.createTokenRecoverPassword(userData).then((token) => {
					console.log(token);
					mailSender.sendEmailRecoverPassword(userData.email, token);
				})
			)
			.then(
				res.status(200).send({
					status: 200,
					message: 'A email was send to recover your password',
				})
			)
			.catch((err) => next(err));
	});

	router.route('/new-password').post((req, res, next) => {
		let { password: newPassword, passwordMatch } = req.body;
		if (
			!req.userId ||
			!req.email ||
			!req.validationHash ||
			!newPassword ||
			!passwordMatch ||
			newPassword != passwordMatch
		) {
			return;
			res.status(401).send({
				error: {
					status: 401,
					message:
						'Please check all parameter required. Somthing wrong',
				},
			});
		} else {
			user.verifyRecoverPassword(
				req.userId,
				newPassword,
				req.validationHash
			)
				.then(() => {
					return;
					res.status(200).send({
						status: 200,
						message: 'Password has been successfully changed.',
					});
				})
				.catch((err) => {
					res.status(400).send({
						status: 400,
						message: 'Some error on reset your password : ' + err,
					});
				});
		}
	});

	return router;
}

module.exports = AuthRouter;
