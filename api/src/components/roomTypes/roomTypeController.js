function roomTypesController(roomTypeModel, bookModel, roomModel) {
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

	function find(opt = {}) {
		return new Promise((resolve, reject) => {
			roomTypeModel.find(opt, (err, roomTypes) => {
				if (err) reject(err);
				resolve(roomTypes);
			});
		});
	}


	function findAll(pagination) {
		const {limit, skip}= pagination;

		return new Promise((resolve, reject) => {
			roomTypeModel.find({},{},{skip,limit},(err, roomTypes) => {
				if (err) reject(err);
				resolve(roomTypes);
			});
		})
		.then( async (roomTypes) => {
            const totalRoomTypes = await roomTypeModel.count();

            return Promise.resolve({
                roomTypes: roomTypes,
                pagination:{
                    pageSize: limit,
                    page: Math.floor(skip / limit),
                    hasMore: (skip + limit) < totalRoomTypes,
                    total: totalRoomTypes
                }
            });
        });
	}

	function findById(roomTypeId, params) {
		return new Promise((resolve, reject) => {
			roomTypeModel.findById(roomTypeId, params, (err, roomTypes) => {
				if (err) {
					reject(err);
				} else {
					if (roomTypes) {
						resolve(roomTypes);
					} else {
						reject({
							status: 404,
							message: 'No roomType have been found.',
						});
					}
				}
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

	function findPacksFromRoomType(roomTypeId) {
		return new Promise((resolve, reject) => {
			roomTypeModel
				.findById(roomTypeId)
				.populate('packs')
				.exec((err, room) => {
					if (err) reject(err);
					resolve(room.packs);
				});
		});
	}

	function findBooksFromRoomType(roomTypeId) {
		return new Promise((resolve, reject) => {
			bookModel.find({ roomType: roomTypeId }, (err, books) => {
				if (err) reject(err);
				resolve(books);
			});
		});
	}

	function findRoomsFromRoomType(roomTypeId) {
		return new Promise((resolve, reject) => {
			roomModel.find({ roomType: roomTypeId }, (err, rooms) => {
				if (err) reject(err);
				resolve(rooms);
			});
		});
	}

	return services;
}

module.exports = roomTypesController;
