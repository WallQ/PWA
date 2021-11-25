function roomsController(roomModel, bookModel, hotelModel) {
	let services = {
		create,
		exists,
		verifyDirector,
		findAll,
		findById,
		findByIdPopulated,
		findByNumber,
		findByHotel,
		findByIdAndUpdate,
		findByNumberAndUpdate,
		findByIdAndDelete,
		findOneAndDeleteByNumber,
		findBooksFromRoom,
	};

	function save(newRoom) {
		return new Promise((resolve, reject) => {
			newRoom.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newRoom);
				}
			});
		});
	}

	function create(values) {
		let newRoom = roomModel(values);
		return save(newRoom);
	}

	function verifyDirector(idUser, idHotel) {
		return new Promise((resolve, reject) => {
			hotelModel.findOne(
				{ director: idUser, _id: idHotel },
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			);
		});
	}

	function exists(id) {
		return new Promise(function (resolve, reject) {
			newRoom.exists((_id = id), function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	function findAll() {
		return new Promise((resolve, reject) => {
			roomModel.find({}, (err, rooms) => {
				if (err) {
					reject(err);
				} else {
					if (rooms.length) {
						resolve(rooms);
					} else {
						reject({
							status: 404,
							message: 'No rooms have been found.',
						});
					}
				}
			});
		});
	}

	function findById(id) {
		return new Promise((resolve, reject) => {
			roomModel.findById(id, (err, room) => {
				if (err) reject(err);
				resolve(room);
			});
		});
	}

	function findByIdPopulated(id) {
		return new Promise((resolve, reject) => {
			roomModel
				.find({})
				.populate('roomType')
				.exec((err, room) => {
					if (err) reject(err);
					resolve(room);
				});
		});
	}

	function findByNumber(number) {
		return new Promise((resolve, reject) => {
			roomModel.find({ number: number }, (err, room) => {
				if (err) reject(err);
				resolve(room);
			});
		});
	}

	function findByHotel(hotelID) {
		return new Promise((resolve, reject) => {
			roomModel.find({ hotel: hotelID }, (err, room) => {
				if (err) reject(err);
				resolve(room);
			});
		});
	}

	function findByIdAndUpdate(id, values) {
		return new Promise((resolve, reject) => {
			roomModel.findByIdAndUpdate(
				id,
				values,
				{ new: true },
				(err, room) => {
					if (err) {
						reject(err);
					} else {
						if (room) {
							resolve(room);
						} else {
							reject({
								status: 404,
								message: 'No Room have been found.',
							});
						}
					}
				}
			);
		});
	}

	function findByNumberAndUpdate(number, values) {
		return new Promise((resolve, reject) => {
			roomModel.findOneAndUpdate(
				{ number: number },
				values,
				(err, room) => {
					if (err) reject(err);
					resolve(room);
				}
			);
		});
	}

	function findByIdAndDelete(roomId) {
		return new Promise((resolve, reject) => {
			roomModel.findByIdAndDelete(roomId, (err, room) => {
				if (err) {
					reject(err);
				} else {
					if (room) {
						resolve(room);
					} else {
						reject({
							status: 404,
							message: 'No Room have been found.',
						});
					}
				}
			});
		});
	}

	function findOneAndDeleteByNumber(number) {
		return new Promise((resolve, reject) => {
			roomModel.findOneAndDelete({ number: number }, (err, room) => {
				if (!room) reject('Can not delete item!');
				resolve(room);
			});
		});
	}

	function findBooksFromRoom(roomId) {
		return new Promise((resolve, reject) => {
			bookModel.find({ room: roomId }, (err, books) => {
				if (err) reject(err);
				resolve(books);
			});
		});
	}

	return services;
}

module.exports = roomsController;
