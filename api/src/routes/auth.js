const express = require('express');
const user = require('../components/user');
const mailSender = require('../utils/mailSender');
const { verifyRecoverPasswordJWT } = require('../middlewares/verifyJWT');
const cookieParser = require('cookie-parser');

function AuthRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/sign-up').post((req, res, next) => {
		let body = req.body;
		user.register(body)
			.then((userData) => user.createToken(userData))
			.then((token) => {
				res.status(200).send({
					status: 200,
					message: 'Successfully signed up.',
					data: token,
				});
			})
			.catch(next);
	});

	router.route('/sign-in').post((req, res, next) => {
		let body = req.body;
        return  user.findUser(body)
        .then((userResponse)=> user.createToken(userResponse))
        .then((response) => {
            res.cookie('token', response.token, {httpOnly: true});
            res.status(200);
            res.send(response);
        })
        .catch((err) => {
            res.status(500);
            res.send(err)
            next();
        })
	});
	router.use(cookieParser)
	router.use(verifyRecoverPasswordJWT)

	router.route('/me')
    .get((req, res, next) => {
        res.status(202).send({auth:true})
    })

	router.route('/sign-out')
	.get((req, res, next) => {
		res.cookie('token', req.cookies.token, {httpOnly: true, maxAge:0})

            res.status(200);
            res.send({logout: true})
            next();
	});

	router.route('/forgot-password')
	.post((req, res, next) => {
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

	router.route('/new-password')
	.post((req, res, next) => {
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
						message:
							'Some error on reset your password : ' + err,
					});
				});
		}
	});

	return router;
}

module.exports = AuthRouter;