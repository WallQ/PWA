const express = require('express');
const user = require('../components/user');

function UserRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router
		.route('/')
		.get((req, res, next) => {
			user.findAll()
				.then((users) => {
					console.log('Users found -> \n', users);
					res.status(200).send(users);
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
		})
		.post((req, res, next) => {
			let body = req.body;
			user.create(body)
				.then((user) => {
					console.log('User created -> \n', user);
					res.status(201).send(body);
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

	router.route('/email/:userEmail').get((req, res, next) => {
		let userEmail = req.params.userEmail;
		user.findByEmail(userEmail)
			.then((user) => {
				console.log('User found -> \n', user);
				res.status(200).send(user);
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

	router
		.route('/:userId')
		.get((req, res, next) => {
			let userId = req.params.userId;
			user.findById(userId)
				.then((user) => {
					console.log('User found -> \n', user);
					res.status(200).send(user);
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
		})
		.put((req, res, next) => {
			let userId = req.params.userId;
			let body = req.body;
			user.updateById(userId, body)
				.then((user) => {
					console.log('User updated -> \n', user);
					res.status(200).send(user);
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
		})
		.delete((req, res, next) => {
			let userId = req.params.userId;
			user.deleteById(userId)
				.then((user) => {
					console.log('User removed -> \n', user);
					res.status(200).send(user);
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

module.exports = UserRouter;
