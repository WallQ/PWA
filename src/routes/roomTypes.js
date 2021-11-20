const express = require('express');
const roomTypes = require('../components/roomTypes');
let validator = require('../components/roomTypes/validations')

function RoomTypeRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

		//Tested OK
	router.route('')
		.get((req, res, next) => {

			let err = validator.results(req);
			if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
			}

			console.log(req.body)
			roomTypes.findAll()
			.then((rooms) => {
				res.status(200).send(rooms);
				next();
			})
			.catch((err) => {
				res.status(404).send("Error");
				next();
			});
		})
		.post(function (req, res, next) {
			let body = req.body;
			roomTypes.create(body)
			.then(() => {
				res.status(200);
				res.send(body);
				next();
			})
			.catch((err) => {
				res.status(401);
				next();
			});
		});

		//Tested OK
	router.route('/:roomTypeID')
		.get(function (req, res, next) {
			let roomID = req.params.roomTypeID;
			roomTypes
				.findById(roomID)
				.then((rooms) => {
					res.status(200);
					res.send(rooms);
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		})
		.put(function (req, res, next) {
			let roomID = req.params.roomTypeID;
			let body = req.body;
			roomTypes
				.findByIdAndUpdate(roomID, body)
				.then((room) => {
					res.status(200);
					res.send(room);
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		})
		.delete(function (req, res, next) {
			let roomID = req.params.roomTypeID;
			roomTypes
				.findOneAndDelete(roomID)
				.then(() => {
					res.status(200).json({msg:"OK- DELETED"});
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		});
	return router;
}

module.exports = RoomTypeRouter;
