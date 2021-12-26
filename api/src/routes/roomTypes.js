const express = require('express');
const roomTypes = require('../components/roomTypes');
const roles = require('../config/roles');
const { verifyJWT } = require('../middlewares/verifyJWT');
const tryDecode = require('../middlewares/tryDecode');
const verifyROLES = require('../middlewares/verifyROLES');
const verifyBelongHotel = require('../utils/verifyBelongHotel');
const pagination = require('../middlewares/pagination');

function RoomTypeRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/')
		.get(pagination,(req, res, next) => {
			roomTypes
				.findAll(req.pagination)
				.then((rooms) => {
					const response = {
						auth:true,
						status: 200,
						message: 'RoomTypes have been successfully found.',
						...rooms
					}
					res.send(response);
					
				})
				.catch(next);
		})
		.post(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let body = req.body;
				if (!req.roles?.includes(roles.ADMIN)) {
					rooms
						.verifyBelongHotel(req.userId, body.hotel)
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
							roomTypes
								.create(body)
								.then((roomType) => {
									res.status(201).send({
										status: 201,
										message:
											'RoomType has been created successfully.',
										roomType: roomType,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					roomTypes
						.create(body)
						.then((roomType) => {
							res.status(201).send({
								status: 201,
								message:
									'RoomType has been created successfully.',
								roomType: roomType,
							});
						})
						.catch(next);
				}
			}
		);

	router.route('/:roomTypeId')
		.get(tryDecode, (req, res, next) => {
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: 'name description maxGuest maxGuestChild area sale packs facilities';
			let roomId = req.params.roomTypeId;
			roomTypes
				.findById(roomId, opt)
				.then((room) => {
					res.status(200).send({
						status: 200,
						message: 'RoomType have been successfully found.',
						room: room,
					});
				})
				.catch(next);
		})
		.put(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomTypeId = req.params.roomTypeId;
				let body = req.body;
				if (!req.roles?.includes(roles.ADMIN)) {
					rooms
						.verifyBelongHotel(req.userId, body.hotel)
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
							rooms;
							roomTypes
								.findByIdAndUpdate(roomTypeId, body)
								.then((roomType) => {
									res.status(200).send({
										status: 200,
										message:
											'RoomType has been successfully updated.',
										roomType: roomType,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					roomTypes
						.findByIdAndUpdate(roomTypeId, body)
						.then((roomType) => {
							res.status(200).send({
								status: 200,
								message:
									'RoomType has been successfully updated.',
								roomType: roomType,
							});
						})
						.catch(next);
				}
			}
		)
		.delete(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomId = req.params.roomTypeId;
				roomTypes
					.findByIdAndDelete(roomId)
					.then((roomType) => {
						res.status(200).send({
							status: 200,
							message: 'RoomType has been successfully deleted.',
							roomType: roomType,
						});
					})
					.catch(next);
			}
		);

	router.route('/:roomTypeId/packs')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let roomId = req.params.roomTypeId;
				roomTypes
					.findPacksFromRoomType(roomId)
					.then((packs) => {
						res.status(200).send({
							status: 200,
							message: 'Packs have been successfully found.',
							packs: packs,
						});
					})
					.catch(next);
			}
		);

	router.route('/:roomTypeId/books')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let roomId = req.params.roomTypeId;
				roomTypes
					.findBooksFromRoomType(roomId)
					.then((books) => {
						res.status(200).send({
							status: 200,
							message: 'Books have been successfully found.',
							books: books,
						});
					})
					.catch(next);
			}
		);

	router.route('/:roomTypeId/rooms')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let roomId = req.params.roomTypeId;
				roomTypes
					.findRoomsFromRoomType(roomId)
					.then((rooms) => {
						res.status(200).send({
							status: 200,
							message: 'Rooms have been successfully found.',
							rooms: rooms,
						});
					})
					.catch(next);
			}
		);

	return router;
}

module.exports = RoomTypeRouter;
