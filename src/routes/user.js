const express = require('express');
const user = require('../components/user');
const roles = require('../config/roles');
const {verifyJWT} = require('../middlewares/verifyJWT');
const tryDecode = require('../middlewares/tryDecode');
const verifyROLES = require('../middlewares/verifyROLES');

function UserRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use(verifyJWT);

	router
		.route('/')
		.get(verifyROLES(roles.ADMIN), (req, res, next) => {
			user.findAll()
				.then((users) => {
					res.status(200).send({
						message: 'Users have been successfully found.',
						data: users,
					});
				})
				.catch(next);
		})
		.post(verifyROLES(roles.ADMIN), (req, res, next) => {
			let body = req.body;
			user.create(body)
				.then((user) => {
					res.status(201).send({
						message: 'User has been created successfully.',
						data: user,
					});
				})
				.catch(next);
		});

	router
		.route('/email/:userEmail')
		.get(
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			// devolver dados veridficar
			(req, res, next) => {
				let userEmail = req.params.userEmail;
				user.findByEmail(userEmail)
					.then((user) => {
						res.status(200).send({
							message: 'User has been successfully found.',
							user: user,
						});
					})
					.catch(next);
			}
		);

	router.route('/change-password').put((req, res, next) => {
		let tokenId = req.userId;
		let currentPassword = req.body.password;
		let newPassword = req.body.new_password;
		user.verifyPassword(tokenId, currentPassword)
			.then((userData) => {
				user.hashPassword(newPassword)
					.then((hashedPassword) => {
						let body = {
							password: hashedPassword,
						};
						user.updateById(tokenId, body)
							.then((user) => {
								//console.log('Password updated -> \n', user);
								res.status(200).send({
									message:
										'Password has been successfully changed.',
								});
							})
							.catch(next);
					})
					.catch(next);
			})
			.catch(next);
	});

	router
		.route('/:userId')
		.get((req, res, next) => {
			let userId = req.params.userId;
			if (req.userId === userId) {
				user.findById(userId)
					.then((user) => {
						//console.log('User information -> \n', user);
						res.status(200).send({
							message: 'User has been successfully found.',
							data: user,
						});
					})
					.catch(next);
			} else {
				let err = new Error(
					"You don't have permission to access this content."
				);
				err.status = 403;
				next(err);
			}
		})
		.put(tryDecode, (req, res, next) => {
			let body;
			req.roles?.includes(roles.ADMIN)
				? (body = {
						name: req.body.name,
						surname: req.body.surname,
						email: req.body.email,
						roles: req.body.roles,
				  })
				: (body = {
						name: req.body.name,
						surname: req.body.surname,
						email: req.body.email,
				  });
			let userId = req.params.userId;
			if (req.userId === userId || req.roles?.includes(roles.ADMIN)) {
				user.updateById(userId, body)
					.then((user) => {
						//console.log('User updated -> \n', user);
						res.status(200).send({
							message: 'User has been successfully updated.',
							user: user,
						});
					})
					.catch(next);
			} else {
				let err = new Error(
					"You don't have permission to access this content."
				);
				err.status = 403;
				next(err);
			}
		})
		.delete((req, res, next) => {
			let userId = req.params.userId;
			let password = req.body.password;
			let tokenId = req.userId;
			if (tokenId === userId) {
				user.verifyPassword(tokenId, password)
					.then((userData) => {
						user.deleteById(userId)
							.then((user) => {
								//console.log('User deleted -> \n', user);
								res.status(200).send({
									message:
										'User has been successfully deleted.',
									user: user,
								});
							})
							.catch(next);
					})
					.catch(next);
			} else {
				let err = new Error(
					"You don't have permission to access this content."
				);
				err.status = 403;
				next(err);
			}
		});

	return router;
}

module.exports = UserRouter;
