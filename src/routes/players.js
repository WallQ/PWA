const express = require('express');
const players = require('../components/players');

function PlayerRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router
		.route('/players')
		.get(function (req, res, next) {
			console.log('Get all players');
			players
				.findAll()
				.then((players) => {
					console.log('Players found!');
					res.status(200);
					res.send(players);
					next();
				})
				.catch((err) => {
					console.log('Players not found!', err);
					res.status(404);
					next();
				});
		})
		.post(function (req, res, next) {
			console.log('Create player');
			let body = req.body;
			players
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
		.route('/players/:playersId')
		.get(function (req, res, next) {
			console.log('Get specific player');
			let playerId = req.params.playersId;
			players
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
			players
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
			players
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

		router.route('/players/:playersId/hobbies').get(function (req, res, next) {
			console.log('Get hobbies from specific player');
			let playerId = req.params.playersId;
			players
				.findHobbiesById(playerId)
				.then((hobbies) => {
					console.log('Hobbies found!');
					res.status(200);
					res.send(hobbies);
					next();
				})
				.catch((err) => {
					console.log('Hobbies not found!', err);
					res.status(404);
					next();
				});
		});
		

	return router;
}

module.exports = PlayerRouter;
