const express = require('express');
const hotel = require('../components/hotel');
const roles = require('../config/roles');
const verifyJWT = require('../middlewares/verifyJWT');
const tryDecode = require('../middlewares/tryDecode');
const verifyROLES = require('../middlewares/verifyROLES');

function HotelRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router
		.route('/')
		.get(tryDecode, (req, res, next) => {
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: 'name description';

			hotel
				.findAll(opt)
				.then((hotels) => {
					//console.log('Hotels found -> \n', hotels);
					res.status(200).send(hotels);
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
			hotel
				.create(body)
				.then((hotel) => {
					console.log('Hotel created -> \n', hotel);
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

	router.route('/name/:hotelName').get((req, res, next) => {
		let hotelName = req.params.hotelName;
		hotel
			.findByName(hotelName)
			.then((hotel) => {
				console.log('Hotel found -> \n', hotel);
				res.status(200).send(hotel);
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
		.route('/:hotelId')
		.get((req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.findById(hotelId)
				.then((hotel) => {
					console.log('Hotel found -> \n', hotel);
					res.status(200).send(hotel);
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
		.put(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let hotelId = req.params.hotelId;
				let body = req.body;
				hotel
					.verifyDirector(req.userId, hotelId)
					.then((result) => {
						if (!result) {
							return res.status(400).send('merda');
						}
						hotel
							.updateById(hotelId, body)
							.then((hotel) => {
								//console.log('Hotel updated -> \n', hotel);
								res.status(200).send(hotel);
								next();
							})
							.catch((err) => {
								console.log(err);
								res.status(err.status || 500).send({
									error: {
										status: err.status || 500,
										message:
											err.message ||
											'Internal Server Error',
									},
								});
							});
					})
					.catch((err) => {
						console.log(err);
						res.status(err.status || 500).send({
							error: {
								status: err.status || 500,
								message: err.message || 'Internal Server Error',
							},
						});
					});
			}
		)
		.delete((req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.deleteById(hotelId)
				.then((hotel) => {
					console.log('Hotel removed -> \n', hotel);
					res.status(200).send(hotel);
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

module.exports = HotelRouter;
