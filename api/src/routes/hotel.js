const express = require('express');
const hotel = require('../components/hotel');
const roles = require('../config/roles');
const { verifyJWT } = require('../middlewares/verifyJWT');
const tryDecode = require('../middlewares/tryDecode');
const verifyROLES = require('../middlewares/verifyROLES');
const verifyBelongHotel = require('../utils/verifyBelongHotel');
const pagination = require('../middlewares/pagination');

function HotelRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(pagination);

	router
		.route('/')
		.get(tryDecode, (req, res, next) => {
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: 'name description averagePrice rating languages address contacts facilities url coverImage images reviews createdDate';

			hotel
				.findAll(opt)
				.then((hotels) => {
					res.status(200).send({
						status: 200,
						message: 'Hotels have been successfully found.',
						data: hotels,
					});
				})
				.catch((error) => {
					res.status(200).send({
						status: error.status,
						message: error.message,
						data: [],
					});
				});
		})
		.post(verifyJWT, verifyROLES(roles.ADMIN), (req, res, next) => {
			let body = req.body;
			hotel
				.create(body)
				.then((hotel) => {
					res.status(201).send({
						status: 201,
						message: 'Hotel has been created successfully.',
						data: hotel,
					});
				})
				.catch(next);
		});

	router.route('/name/:hotelName').get((req, res, next) => {
		let opt = req.roles?.includes(roles.ADMIN)
			? ''
			: 'name description rating address contacts languages images facilities comments url';
		let hotelName = req.params.hotelName;
		hotel
			.findByName(hotelName, opt)
			.then((hotel) => {
				res.status(200).send({
					status: 200,
					message: 'Hotels have been successfully found.',
					data: hotel,
				});
			})
			.catch(next);
	});

	router.route('/workingon')
	.get(verifyJWT, verifyROLES(roles.ADMIN,roles.DIRECTOR,roles.EMPLOYEE),(req, res, next) => {
		let opt = '_id name';

		if(req.roles?.includes(roles.ADMIN)){
			hotel
				.findAll(opt)
				.then((hotels) => {
					res.status(200).send({
						status: 200,
						auth: true,
						message: 'Hotels have been successfully found.',
						data: hotels,
					});
				})
				.catch((error) => {
					res.status(200).send({
						status: error.status,
						auth: false,
						message: error.message,
						data: [],
					});
				});
		}else{

		}
	});

	router
		.route('/:hotelId')
		.get(tryDecode, (req, res, next) => {
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: 'name description rating address contacts languages images facilities comments url';
			let hotelId = req.params.hotelId;
			hotel
				.findById(hotelId, opt)
				.then((hotel) => {
					res.status(200).send({
						status: 200,
						message: 'Hotel has been successfully found.',
						data: hotel,
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
						.verifyBelongHotel(req.userId, hotelId)
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
									res.status(200).send({
										status: 200,
										message:
											'Hotel has been successfully updated.',
										data: hotel,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					hotel
						.updateById(hotelId, body)
						.then((hotel) => {
							res.status(200).send({
								status: 200,
								message: 'Hotel has been successfully updated.',
								data: hotel,
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
					res.status(200).send({
						status: 200,
						message: 'Hotel has been successfully deleted.',
						data: hotel,
					});
				})
				.catch(next);
		});

	router
		.route('/:hotelId/rooms')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let hotelId = req.params.hotelId;
				hotel
					.findRoomsByHotelId(hotelId)
					.then((rooms) => {
						res.status(200).send({
							status: 200,
							message: 'Rooms have been successfully found.',
							data: rooms,
						});
					})
					.catch(next);
			}
		);

	router.route('/:hotelId/roomTypes')
		.get((req, res, next) => {
		let opt = req.roles?.includes(roles.ADMIN, roles.DIRECTOR)
			? ''
			: 'name description maxGuest maxGuestChild area sale packs facilities';
		let hotelId = req.params.hotelId;
		hotel
			.findRoomTypesByHotelId(hotelId, opt, req.pagination)
			.then((roomTypes) => {
				res.status(200).send({
					status: 200,
					message: 'RoomTypes have been successfully found.',
					auth:true,
					data: roomTypes,
				});
			})
			.catch((error) => {
				res.status(200).send({
					status: error.status,
					message: error.message,
					data: [],
				});
			});
	});

	router
		.route('/:hotelId/books')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let hotelId = req.params.hotelId;
				if (!req.roles?.includes(roles.ADMIN)) {
					hotel
						.verifyBelongHotel(req.userId, hotelId)
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
								.findBooksByHotelId(hotelId)
								.then((books) => {
									res.status(200).send({
										status: 200,
										message:
											'Books have been successfully found.',
										data: books,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					hotel
						.findBooksByHotelId(hotelId)
						.then((books) => {
							res.status(200).send({
								status: 200,
								message: 'Books have been successfully found.',
								data: books,
							});
						})
						.catch(next);
				}
			}
		);

	router
		.route('/:hotelId/packs')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let hotelId = req.params.hotelId;
				if (!req.roles?.includes(roles.ADMIN)) {
					hotel
						.verifyBelongHotel(req.userId, hotelId)
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
								.findPacksByHotelId(hotelId)
								.then((packs) => {
									res.status(200).send({
										status: 200,
										message:
											'Packs have been successfully found.',
										data: packs,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					hotel
						.findPacksByHotelId(hotelId)
						.then((packs) => {
							res.status(200).send({
								status: 200,
								message: 'Packs have been successfully found.',
								data: packs,
							});
						})
						.catch(next);
				}
			}
		);

	return router;
}

module.exports = HotelRouter;
