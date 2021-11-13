const express = require('express');
const hotel = require('../components/hotel');

function HotelRouter() {
	let router = express();

	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.use((req, res, next) => {
		console.log('Timer:', Date.now());
		next();
	});

	router
		.route('/')
		.get((req, res, next) => {
			hotel
				.findAll()
				.then((hotels) => {
					console.log('Hotels found -> \n', hotels);
					res.status(200);
					res.send(hotels);
					next();
				})
				.catch((err) => {
					console.log('Something went wrong!', err);
					res.status(404);
					next();
				});
		})
		.post((req, res, next) => {
			let body = req.body;
			hotel
				.create(body)
				.then((hotel) => {
					console.log('Hotel saved -> \n', hotel);
					res.status(201);
					res.send(body);
					next();
				})
				.catch((err) => {
					console.log('Something went wrong!', err);
					res.status(401);
					next();
				});
		});

	router.route('/name/:hotelName').get((req, res, next) => {
		let hotelName = req.params.hotelName;
		hotel
			.findByName(hotelName)
			.then((hotel) => {
				console.log('Hotel found -> \n', hotel);
				res.status(200);
				res.send(hotel);
				next();
			})
			.catch((err) => {
				console.log('Something went wrong!', err);
				res.status(404);
				next();
			});
	});

	router
		.route('/id/:hotelId')
		.get((req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.findById(hotelId)
				.then((hotel) => {
					console.log('Hotel found -> \n', hotel);
					res.status(200);
					res.send(hotel);
					next();
				})
				.catch((err) => {
					console.log('Something went wrong!', err);
					res.status(404);
					next();
				});
		})
		.put((req, res, next) => {
			let hotelId = req.params.hotelId;
			let body = req.body;
			hotel
				.updateById(hotelId, body)
				.then((hotel) => {
					console.log('Hotel updated -> \n', hotel);
					res.status(200);
					res.send(hotel);
					next();
				})
				.catch((err) => {
					console.log('Something went wrong!', err);
					res.status(404);
					next();
				});
		})
		.delete((req, res, next) => {
			let hotelId = req.params.hotelId;
			hotel
				.deleteById(hotelId)
				.then((hotel) => {
					console.log('Hotel removed -> \n', hotel);
					res.status(200);
					next();
				})
				.catch((err) => {
					console.log('Something went wrong!', err);
					res.status(404);
					next();
				});
		});

	return router;
}

module.exports = HotelRouter;
