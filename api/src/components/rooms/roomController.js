function roomsController(roomModel, bookModel) {
	let services = {
		create,
		findAll,
		findById,
		findByIdAndUpdate,
		findByIdAndDelete,
		findBooksFromRoom,
	};

	function create(values) {
		let newRoom = roomModel(values);
		return save(newRoom);
	}

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

	function findAll(pagination) {
		const {limit, skip}= pagination;
		return new Promise((resolve, reject) => {
			roomModel.find({},{},{skip,limit}, (err, rooms) => {
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
