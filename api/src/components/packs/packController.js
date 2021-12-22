function packsController(packModel) {
	let services = {
		create,
		find,
		findAll,
		findById,
		findByIdAndUpdate,
		findByIdAndDelete,
	};

	function create(values) {
		let newPack = packModel(values);
		return save(newPack);
	}

	function save(newPack) {
		return new Promise((resolve, reject) => {
			newPack.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newPack);
				}
			});
		});
	}

	function findAll() {
		return new Promise((resolve, reject) => {
			packModel.find({}, (err, packs) => {
				if (err) reject(err);
				resolve(packs);
			});
		});
	}

	function find(opt = {}) {
		return new Promise((resolve, reject) => {
			packModel.find(opt, (err, packs) => {
				if (err) reject(err);
				resolve(packs);
			});
		});
	}

	function findById(id) {
		return new Promise((resolve, reject) => {
			packModel.findById(id, (err, pack) => {
				if (err) reject(err);
				resolve(pack);
			});
		});
	}

	function findByIdAndUpdate(id, values) {
		return new Promise((resolve, reject) => {
			packModel.findByIdAndUpdate(
				id,
				values,
				{ new: true },
				(err, pack) => {
					if (err) {
						reject(err);
					} else {
						if (pack) {
							resolve(pack);
						} else {
							reject({
								status: 404,
								message: 'No pack have been found.',
							});
						}
					}
				}
			);
		});
	}

	function findByIdAndDelete(packId) {
		return new Promise((resolve, reject) => {
			packModel.findByIdAndDelete(packId, (err, pack) => {
				if (err) {
					reject(err);
				} else {
					if (pack) {
						resolve(pack);
					} else {
						reject({
							status: 404,
							message: 'No pack have been found.',
						});
					}
				}
			});
		});
	}

	return services;
}

module.exports = packsController;
