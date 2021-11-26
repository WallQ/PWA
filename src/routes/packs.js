const express = require('express');
const packs = require('../components/packs');
const roles = require('../config/roles');
const {verifyJWT} = require('../middlewares/verifyJWT');
const verifyROLES = require('../middlewares/verifyROLES');

function PackRouter() {
	let router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router
		.route('/')
		.get(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			//verificar se pertence
			(req, res, next) => {
				packs
					.findAll()
					.then((packs) => {
						res.status(200).send({
							status: 200,
							message: 'Packs have been successfully found.',
							data: packs,
						});
					})
					.catch(next);
			}
		)
		.post(
			verifyJWT,
			verifyROLES(roles.ADMIN, roles.DIRECTOR),
			(req, res, next) => {
				let body = req.body;
				packs
					.create(body)
					.then((pack) => {
						res.status(201).send({
							status: 201,
							message: 'Pack has been created successfully.',
							data: pack,
						});
					})
					.catch(next);
			}
		);

	router
		.route('/:packId')
		.get((req, res, next) => {
			let packId = req.params.packId;
			packs
				.findById(packId)
				.then((pack) => {
					res.status(200).send({
						status: 200,
						message: 'Pack has been successfully found.',
						data: pack,
					});
				})
				.catch(next);
		})
		.put((req, res, next) => {
			let packId = req.params.packId;
			let body = req.body;
			packs
				.findByIdAndUpdate(packId, body)
				.then((pack) => {
					res.status(200).send({
						status: 200,
						message: 'Pack has been successfully updated.',
						data: pack,
					});
				})
				.catch(next);
		})
		.delete((req, res, next) => {
			let packId = req.params.packId;
			packs
				.findByIdAndDelete(packId)
				.then((pack) => {
					res.status(200).send({
						status: 200,
						message: 'Pack has been successfully deleted.',
						data: pack,
					});
				})
				.catch(next);
		});

	return router;
}

module.exports = PackRouter;
