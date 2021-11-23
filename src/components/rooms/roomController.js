function roomsController(roomModel, bookModel) {
	let services = {
		create,
		exists,
		findAll,
		findById,
		findByIdPopulated,
		findByNumber,
		findByHotel,
		findByIdAndUpdate,
		findByNumberAndUpdate,
		findOneAndDelete,
		findOneAndDeleteByNumber,
		findBooksFromRoom,
	};

	function create(values) {
		let newRoom = roomModel(values);
		return save(newRoom);
	}

	function save(newRoom) {
		return new Promise(function (resolve, reject) {
			newRoom.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Room created successfully!');
				}
			});
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
				if (err) reject(err);
				resolve(rooms);
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
			roomModel.findByIdAndUpdate(id, values, (err, room) => {
				if (err) reject(err);
				resolve(room);
			});
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

	function findOneAndDelete(id) {
		return new Promise((resolve, reject) => {
			roomModel.findOneAndDelete({ _id: id }, (err, room) => {
				if (!room) reject('Can not delete item!');
				resolve(room);
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
