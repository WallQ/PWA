const express = require('express');
const packs = require('../components/packs');
let validator = require('../components/packs/validations')

function PackRouter() {
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
			packs.findAll()
			.then((packs) => {
				res.status(200).send(packs);
				next();
			})
			.catch((err) => {
				res.status(404).send("Error");
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
			packs.create(body)
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
	router.route('/:packID')
		.get(function (req, res, next) {
			let packID = req.params.packID;
			packs
				.findById(packID)
				.then((packs) => {
					res.status(200);
					res.send(packs);
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		})
		.put(function (req, res, next) {
			let packID = req.params.packID;
			let body = req.body;
			packs.findByIdAndUpdate(packID, body)
				.then((pack) => {
					res.status(200);
					res.send(pack);
					next();
				})
				.catch((err) => {
					res.status(404);
					next();
				});
		})
		.delete(function (req, res, next) {
			let bookID = req.params.packID;
			packs
				.findByIdAndDelete(bookID)
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

module.exports = PackRouter;
