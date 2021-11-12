function playerService(playerModel) {
	let service = {
		create,
		findAll,
		findById,
		update,
		removeById,
		findHobbiesById,
	};

	function create(values) {
		let newPlayer = playerModel(values);
		return save(newPlayer);
	}

	function save(newPlayer) {
		return new Promise(function (resolve, reject) {
			newPlayer.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Player created successfully!');
				}
			});
		});
	}

	function findAll() {
		return new Promise(function (resolve, reject) {
			playerModel.find({}, function (err, users) {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
	}

	function findById(playerId) {
		return new Promise(function (resolve, reject) {
			playerModel.findById(playerId, function (err, user) {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
	}

	function update(playerId, values) {
		return new Promise(function (resolve, reject) {
			playerModel.findByIdAndUpdate(
				playerId,
				values,
				{ new: true },
				function (err, user) {
					if (err) {
						reject(err);
					} else {
						resolve(user);
					}
				}
			);
		});
	}

	function removeById(playerId) {
		return new Promise(function (resolve, reject) {
			playerModel.findByIdAndRemove(playerId, function (err, user) {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
	}

	function findHobbiesById(playerId) {
		return new Promise(function (resolve, reject) {
			playerModel.findOne(
				{ _id: playerId },
				'hobbies',
				function (err, user) {
					if (err) {
						reject(err);
					} else {
						resolve(user);
					}
				}
			); //.select(-_id);
		});
	}

	return service;
}

module.exports = playerService;
