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

		//Tested OK
	router.route('')
		.get((req, res, next)=> {
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
		.post((req, res, next)=> {
			let body = req.body;
			rooms.create(body)
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

	router.route('/:roomID')
		.get( (req, res, next)=> {
			let roomID = req.params.roomID;
			rooms
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
		.put((req, res, next)=> {
			let roomID = req.params.roomID;
			let body = req.body;
			rooms
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
		.delete((req, res, next)=> {
			let roomID = req.params.roomID;
			rooms
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

	router.route('/:roomID/books')
		.get((req, res, next)=>{
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
		})


	return router;
}

module.exports = RoomRouter;
