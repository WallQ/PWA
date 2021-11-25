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

	router
		.route('/')
		.get(tryDecode, (req, res, next) => {
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: '-_id name description rating address contacts languages images facilities comments url';

			hotel
				.findAll(opt)
				.then((hotels) => {
					//console.log('Hotels found -> \n', hotels);
					res.status(200).send({
						message: 'Hotels have been successfully found.',
						hotels: hotels,
					});
				})
				.catch(next);
		})
		.post(verifyJWT, verifyROLES(roles.ADMIN), (req, res, next) => {
			let body = req.body;
			hotel
				.create(body)
				.then((hotel) => {
					//console.log('Hotel created -> \n', hotel);
					res.status(201).send({
						message: 'Hotel has been created successfully.',
						hotel: hotel,
					});
				})
				.catch(next);
		});

	router.route('/name/:hotelName').get((req, res, next) => {
		let hotelName = req.params.hotelName;
		hotel
			.findByName(hotelName)
			.then((hotel) => {
				//console.log('Hotel found -> \n', hotel);
				res.status(200).send({
					message: 'Hotel(s) have been successfully found.',
					hotel: hotel,
				});
			})
			.catch(next);
	});

	router
		.route('/:hotelId')
		.get((req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.findById(hotelId)
				.then((hotel) => {
					//console.log('Hotel found -> \n', hotel);
					res.status(200).send({
						message: 'Hotel has been successfully found.',
						hotel: hotel,
					});
				})
				.catch(next);
		})
		.put(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let hotelId = req.params.hotelId;
				let body = req.body;
				if (!req.roles?.includes(roles.ADMIN)) {
					hotel
						.verifyDirector(req.userId, hotelId)
						.then((result) => {
							if (!result) {
								return res.status(403).send({
									error: {
										status: 403,
										message:
											"You don't have permission to access this content.",
									},
								});
							}
							hotel
								.updateById(hotelId, body)
								.then((hotel) => {
									//console.log('Hotel updated -> \n', hotel);
									res.status(200).send({
										message:
											'Hotel has been successfully updated.',
										hotel: hotel,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					hotel
						.updateById(hotelId, body)
						.then((hotel) => {
							//console.log('Hotel updated -> \n', hotel);
							res.status(200).send({
								message: 'Hotel has been successfully updated.',
								hotel: hotel,
							});
						})
						.catch(next);
				}
			}
		)
		.delete(verifyJWT, verifyROLES(roles.ADMIN), (req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.deleteById(hotelId)
				.then((hotel) => {
					//console.log('Hotel removed -> \n', hotel);
					res.status(200).send({
						message: 'Hotel has been successfully deleted.',
						hotel: hotel,
					});
				})
				.catch(next);
		});

	return router;
}

module.exports = HotelRouter;
