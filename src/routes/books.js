const express = require('express');
const books = require('../components/books');
const validator = require('../components/books/validations');

function BookRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	//
	router.route('')
		.get((req, res, next) => {
			books
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
		.post((req, res, next) => {
			/*
			let err = validator.results(req);
			if (!err.isEmpty()) {
				return res.status(400).json({ errors: err.array() });
			}
			console.log("passou a validação")
			*/

			let body = req.body;
			books
				.create(body)
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

	//
	router.route('/:bookID')
		.get(function (req, res, next) {
			let bookID = req.params.bookID;
			books
				.findById(bookID)
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
		.put(function (req, res, next) {
			let bookID = req.params.bookID;
			let body = req.body;
			books
				.findByIdAndUpdate(bookID, body)
				.then((book) => {
					res.status(200);
					res.send(book);
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		})
		.delete(function (req, res, next) {
			let bookID = req.params.bookID;
			books
				.findByIdAndDelete(bookID)
				.then(() => {
					res.status(200).json({ msg: 'OK- DELETED' });
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		});

	router.route('/availability')
		.post(async (req, res, next) => {

			let {hotelID, numGuest, numGuestChild,checkIn_date,checkOut_date} = req.body
			
			try {
				let roomTypesAvailable = await books.getAvailableRoomTypes(hotelID, numGuest,numGuestChild,checkIn_date,checkOut_date)
				
				books.finRoomTypes(roomTypesAvailable)
				.then((books) => {
					res.status(200);
					res.send(books);
				})
				.catch((err) => {
					
					res.status(400).send("ERROR");
				});
			} catch (error) {
				res.status(400).send("ERROR")
			}
		});

	return router;
}

module.exports = BookRouter;
