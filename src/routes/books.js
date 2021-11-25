const express = require('express');
const books = require('../components/books');
const {verifyJWT} = require('../middlewares/verifyJWT');

function BookRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router
		.route('/')
		.get(verifyJWT, (req, res, next) => {
			// verificar hotel
			books
				.findAll()
				.then((rooms) => {
					res.status(200).send({
						status: 200,
						message: 'Book have been successfully found.',
						data: rooms,
					});
				})
				.catch(next);
		})
		.post(verifyJWT, (req, res, next) => {
			let body = req.body;
			books
				.create(body)
				.then((book) => {
					res.status(200).send({
						status: 200,
						message: 'Book has been created successfully.',
						data: book,
					});
				})
				.catch(next);
		});

	router
		.route('/:bookId')
		.get((req, res, next) => {
			let bookId = req.params.bookId;
			books
				.findById(bookId)
				.then((book) => {
					res.status(200).send({
						status: 200,
						message: 'Book has been successfully found.',
						data: book,
					});
				})
				.catch(next);
		})
		.put((req, res, next) => {
			let bookId = req.params.bookId;
			let body = req.body;
			books
				.findByIdAndUpdate(bookId, body)
				.then((book) => {
					res.status(200).send({
						status: 200,
						message: 'Book has been successfully found.',
						data: book,
					});
				})
				.catch(next);
		})
		.delete((req, res, next) => {
			let bookId = req.params.bookId;
			books
				.findByIdAndDelete(bookId)
				.then((book) => {
					res.status(200).send({
						status: 200,
						message: 'Book has been successfully deleted.',
						data: book,
					});
				})
				.catch(next);
		});

	router.route('/availability').post(async (req, res, next) => {
		let { hotelID, numGuest, numGuestChild, checkIn_date, checkOut_date } =
			req.body;

		try {
			let roomTypesAvailable = await books.getAvailableRoomTypes(
				hotelID,
				numGuest,
				numGuestChild,
				checkIn_date,
				checkOut_date
			);

			books
				.finRoomTypes(roomTypesAvailable)
				.then((books) => {
					res.status(200).send({
						status: 200,
						message: 'Rooms have been successfully found.',
						data: books,
					});
				})
				.catch(next);
		} catch (err) {
			next(err);
		}
	});

	return router;
}

module.exports = BookRouter;
