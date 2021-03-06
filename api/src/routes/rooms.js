const express = require('express');
const { trusted } = require('mongoose');
const rooms = require('../components/rooms');
const roles = require('../config/roles');
const { verifyJWT } = require('../middlewares/verifyJWT');
const verifyROLES = require('../middlewares/verifyROLES');
const pagination = require('../middlewares/pagination');
const verifyBelongHotel = require('../utils/verifyBelongHotel');

function RoomRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use(pagination);

	router
		.route('/')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				rooms
					.findAll(req.pagination)
					.then((rooms) => {
						const response = {
							status: 200,
							message: 'Rooms have been successfully found.',
							auth:true,
							data: rooms
						}
						res.send(response);
					})
					.catch(next);
			}
		)
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
										auth: false,
										message:
											"You don't have permission to access this content.",
									},
								});
							}
							rooms
								.create(body)
								.then((room) => {
									res.status(201).send({
										status: 201,
										auth: true,
										message:
											'Room have been created successfully.',
										data: room,
									});
								})
								.catch(next);
						})
						.catch(next);
				} else {
					rooms
						.create(body)
						.then((room) => {
							res.status(201).send({
								status: 201,
								auth: true,
								message: 'Room have been created successfully.',
								data: room,
							});
						})
						.catch(next);
				}
			}
		);

	router
		.route('/:roomId')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let roomId = req.params.roomId;
				rooms
					.findById(roomId)
					.then((room) => {
						res.status(200).send({
							status: 200,
							message: 'Room has been successfully found.',
							data: room,
						});
					})
					.catch(next);
			}
		)
		.put(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomId = req.params.roomId;
				let body = req.body;
				if (!req.roles?.includes(roles.ADMIN)) {
					rooms
						.verifyBelongHotel(req.userId, body.hotel)
						.then((result) => {
							if (!result) {
								return res.status(403).send({
									error: {
										status: 403,
										auth: false,
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
										auth: true,
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
								auth: true,
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
						res.status(200).send({
							message: 'Room has been successfully deleted.',
							auth: true,
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
			verifyROLES(roles.ADMIN, roles.DIRECTOR, roles.EMPLOYEE),
			(req, res, next) => {
				let roomId = req.params.roomId;
				rooms
					.findBooksFromRoom(roomId)
					.then((books) => {
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
