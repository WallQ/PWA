const express = require('express');
const roomTypes = require('../components/roomTypes');
const roles = require('../config/roles');
const {verifyJWT} = require('../middlewares/verifyJWT');
const verifyROLES = require('../middlewares/verifyROLES');
const verifyBelongHotel = require('../utils/verifyBelongHotel');

function RoomTypeRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router
		.route('/')
		.get((req, res, next) => {
			roomTypes
				.findAll()
				.then((rooms) => {
					res.status(200).send({
						status: 200,
						message: 'RoomTypes have been successfully found.',
						rooms: rooms,
					});
				})
				.catch(next);
		})
		.post(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			//verificar se pertence
			(req, res, next) => {
				let body = req.body;
				roomTypes
					.create(body)
					.then((roomType) => {
						res.status(201).send({
							message: 'RoomType has been created successfully.',
							roomType: roomType,
						});
					})
					.catch(next);
			}
		);

	router
		.route('/:roomTypeId')
		.get((req, res, next) => {
			//sensibilizar dados
			let roomId = req.params.roomTypeId;
			roomTypes
				.findById(roomId)
				.then((room) => {
					res.status(200).send({
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
									//console.log('RoomType updated -> \n', roomType);
									res.status(200).send({
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
							//console.log('RoomType updated -> \n', roomType);
							res.status(200).send({
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
			//verificar se pertence
			(req, res, next) => {
				let roomId = req.params.roomTypeId;
				roomTypes
					.findByIdAndDelete(roomId)
					.then((roomType) => {
						//console.log('RoomType removed -> \n', roomType);
						res.status(200).send({
							message: 'RoomType has been successfully deleted.',
							roomType: roomType,
						});
					})
					.catch(next);
			}
		);

	router.route('/:roomTypeId/packs').get(function (req, res, next) {
		let roomId = req.params.roomTypeId;
		roomTypes
			.findPacksFromRoomType(roomId)
			.then((packs) => {
				//console.log('Packs found -> \n', packs);
				res.status(200).send({
					message: 'Packs have been successfully found.',
					packs: packs,
				});
			})
			.catch(next);
	});

	router.route('/:roomTypeId/books').get(function (req, res, next) {
		let roomId = req.params.roomTypeId;
		roomTypes
			.findBooksFromRoomType(roomId)
			.then((books) => {
				//console.log('Books found -> \n', books);
				res.status(200).send({
					message: 'Books have been successfully found.',
					books: books,
				});
			})
			.catch(next);
	});

	router.route('/:roomTypeId/rooms').get(function (req, res, next) {
		let roomId = req.params.roomTypeId;
		roomTypes
			.findRoomsFromRoomType(roomId)
			.then((rooms) => {
				//console.log('Rooms found -> \n', rooms);
				res.status(200).send({
					message: 'Rooms have been successfully found.',
					rooms: rooms,
				});
			})
			.catch(next);
	});

	return router;
}

module.exports = RoomTypeRouter;
