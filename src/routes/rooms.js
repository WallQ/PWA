const express = require('express');
const rooms = require('../components/rooms');
let validator = require('../components/rooms/validations');

function RoomRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router
		.route('/')
		.get(validator.newRoom(), (req, res, next) => {
			let err = validator.results(req);
			if (!err.isEmpty()) {
				return res.status(400).json({ errors: err.array() });
			}

			console.log(req.body);
			rooms
				.findAll()
				.then((rooms) => {
					res.status(200).send(rooms);
					next();
				})
				.catch((err) => {
					res.status(404).send('Error');
					next();
				});
		})
		.post(function (req, res, next) {
			let body = req.body;
			rooms
				.create(body)
				.then(() => {
					console.log('Player saved!');
					res.status(200);
					res.send(body);
					next();
				})
				.catch((err) => {
					console.log('Player already exist!', err);
					res.status(401);
					next();
				});
		});

	router
		.route('/:roomID')
		.get(function (req, res, next) {
			console.log('Get specific player');
			let playerId = req.params.roomID;
			rooms
				.findById(playerId)
				.then((player) => {
					console.log('Player found!');
					res.status(200);
					res.send(player);
					next();
				})
				.catch((err) => {
					console.log('Player not found!', err);
					res.status(404);
					next();
				});
		})
		.put(function (req, res, next) {
			console.log('Update specific player');
			let playerId = req.params.playersId;
			let body = req.body;
			rooms
				.update(playerId, body)
				.then((player) => {
					console.log('Player updated!');
					res.status(200);
					res.send(player);
					next();
				})
				.catch((err) => {
					console.log('Player not found!', err);
					res.status(404);
					next();
				});
		})
		.delete(function (req, res, next) {
			console.log('Delete specific player');
			let playerId = req.params.playersId;
			rooms
				.removeById(playerId)
				.then(() => {
					console.log('Player deleted!');
					res.status(200).json();
					next();
				})
				.catch((err) => {
					console.log('Player not found!', err);
					res.status(404);
					next();
				});
		});

	return router;
}

module.exports = RoomRouter;
