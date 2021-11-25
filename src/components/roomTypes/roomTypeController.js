function roomTypesController(roomTypeModel, bookModel, roomModel, hotelModel) {
	let services = {
		create,
		find,
		findAll,
		findById,
		findByIdAndUpdate,
		findByIdAndDelete,
		findPacksFromRoomType,
		findBooksFromRoomType,
		findRoomsFromRoomType,
	};

	function save(newRoomType) {
		return new Promise((resolve, reject) => {
			newRoomType.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newRoomType);
				}
			});
		});
	}

	function create(values) {
		let newRoomType = roomTypeModel(values);
		return save(newRoomType);
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

	function findAll() {
		return new Promise((resolve, reject) => {
			roomTypeModel.find({}, (err, roomTypes) => {
				if (err) reject(err);
				resolve(roomTypes);
			});
		});
	}
	function find(opt = {}) {
		return new Promise((resolve, reject) => {
			roomTypeModel.find(opt, (err, roomTypes) => {
				if (err) reject(err);
				resolve(roomTypes);
			});
		});
	}

	function findById(id) {
		return new Promise((resolve, reject) => {
			roomTypeModel.findById(id, (err, roomTypes) => {
				if (err) reject(err);
				resolve(roomTypes);
			});
		});
	}

	function findByIdAndUpdate(id, values) {
		return new Promise((resolve, reject) => {
			roomTypeModel.findByIdAndUpdate(
				id,
				values,
				{ new: true },
				(err, roomType) => {
					if (err) {
						reject(err);
					} else {
						if (roomType) {
							resolve(roomType);
						} else {
							reject({
								status: 404,
								message: 'No RoomType have been found.',
							});
						}
					}
				}
			);
		});
	}

	function findByIdAndDelete(roomTypeId) {
		return new Promise((resolve, reject) => {
			roomTypeModel.findByIdAndDelete(roomTypeId, (err, roomType) => {
				if (err) {
					reject(err);
				} else {
					if (roomType) {
						resolve(roomType);
					} else {
						reject({
							status: 404,
							message: 'No RoomType have been found.',
						});
					}
				}
			});
		});
	}

	function findPacksFromRoomType(id) {
		return new Promise((resolve, reject) => {
			roomTypeModel
				.findById(id)
				.populate('packs')
				.exec((err, room) => {
					if (err) reject(err);
					resolve(room.packs);
				});
		});
	}
	function findBooksFromRoomType(id) {
		return new Promise((resolve, reject) => {
			bookModel.find({ roomType: id }, (err, books) => {
				if (err) reject(err);
				resolve(books);
			});
		});
	}
	function findRoomsFromRoomType(id) {
		return new Promise((resolve, reject) => {
			roomModel.find({ roomType: id }, (err, rooms) => {
				if (err) reject(err);
				resolve(rooms);
			});
		});
	}

	return services;
}

module.exports = roomTypesController;
