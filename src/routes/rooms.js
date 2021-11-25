const express = require('express');
const rooms = require('../components/rooms');
const roles = require('../config/roles');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyROLES = require('../middlewares/verifyROLES');

function RoomRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router
		.route('/')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				rooms
					.findAll()
					.then((rooms) => {
						//console.log('Rooms found -> \n', rooms);
						res.status(200).send({
							message: 'Rooms have been successfully found.',
							rooms: rooms,
						});
					})
					.catch(next);
			}
		)
		.post(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let body = req.body;
				rooms
					.create(body)
					.then((hotel) => {
						//console.log('Room created -> \n', hotel);
						res.status(201).send({
							message: 'Room has been created successfully.',
							hotel: hotel,
						});
					})
					.catch(next);
			}
		);

	router
		.route('/:roomId')
		.get((req, res, next) => {
			let roomId = req.params.roomId;
			rooms
				.findById(roomId)
				.then((room) => {
					res.status(200).send({
						message: 'Room has been successfully found.',
						room: room,
					});
				})
				.catch(next);
		})
		.put(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomId = req.params.roomId;
				let body = req.body;
				if (!req.roles?.includes(roles.ADMIN)) {
					rooms
						.verifyDirector(req.userId, body.hotel)
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
							rooms
								.findByIdAndUpdate(roomId, body)
								.then((room) => {
									//console.log('Room updated -> \n', hotel);
									res.status(200).send({
										message:
											'Room has been successfully updated.',
										room: room,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					rooms
						.findByIdAndUpdate(roomId, body)
						.then((room) => {
							//console.log('Room updated -> \n', hotel);
							res.status(200).send({
								message: 'Room has been successfully updated.',
								room: room,
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
				let roomId = req.params.roomId;
				rooms
					.findByIdAndDelete(roomId)
					.then((room) => {
						//console.log('Room removed -> \n', hotel);
						res.status(200).send({
							message: 'Room has been successfully deleted.',
							room: room,
						});
					})
					.catch(next);
			}
		);

	router
		.route('/:roomId/books')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomId = req.params.roomId;
				rooms
					.findBooksFromRoom(roomId)
					.then((books) => {
						//console.log('Room books found -> \n', books);
						res.status(200).send({
							message: 'Room books has been successfully found.',
							books: books,
						});
					})
					.catch(next);
			}
		);

	return router;
}

module.exports = RoomRouter;
