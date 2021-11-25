const express = require('express');
const rooms = require('../components/rooms');
const validator = require('../components/rooms/validations');
const roles = require('../config/roles');
const verifyJWT = require('../middlewares/verifyJWT');
const tryDecode = require('../middlewares/tryDecode');
const verifyROLES = require('../middlewares/verifyROLES');

function RoomRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router
		.route('/')
		.get(tryDecode, (req, res, next) => {
			let err = validator.results(req);
			if (!err.isEmpty()) {
				return res.status(400).json({ errors: err.array() });
			}
			let opt = req.roles?.includes(roles.ADMIN)
				? ''
				: '-_id name description rating address contacts languages images facilities comments url';
			rooms
				.findAll(opt)
				.then((rooms) => {
					//console.log('Rotels found -> \n', rooms);
					res.status(200).send({
						message: 'Rooms have been successfully found.',
						rooms: rooms,
					});
				})
				.catch(next);
		})
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
				rooms
					.findByIdAndUpdate(roomId, body)
					.then((room) => {
						res.status(200);
						res.send(room);
						next();
					})
					.catch((err) => {
						res.status(404);
						next();
					});
			}
		)
		.delete(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let roomId = req.params.roomId;
				rooms
					.findOneAndDelete(roomId)
					.then(() => {
						res.status(200).json({ msg: 'OK- DELETED' });
						next();
					})
					.catch((err) => {
						res.status(404);
						next();
					});
			}
		);

	router.route('/:roomID/books').get((req, res, next) => {
		let roomID = req.params.roomID;
		rooms
			.findBooksFromRoom(roomID)
			.then((books) => {
				res.status(200);
				res.send(books);
				next();
			})
			.catch((err) => {
				res.status(404);
				next();
			});
	});

	return router;
}

module.exports = RoomRouter;
