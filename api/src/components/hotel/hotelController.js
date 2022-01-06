function hotelService(
	hotelModel,
	roomModel,
	roomTypeModel,
	bookModel,
	packsModel
) {
	let service = {
		create,
		findAll,
		findByName,
		findById,
		findByIdAndUpdate,
		findByIdAndDelete,
		findRoomsByHotelId,
		findRoomTypesByHotelId,
		findBooksByHotelId,
		findPacksByHotelId,
	};

	function save(newHotel) {
		return new Promise((resolve, reject) => {
			newHotel.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newHotel);
				}
			});
		});
	}

	function create(values) {
		let newHotel = hotelModel(values);
		return save(newHotel);
	}

	function findAll(opt) {
		return new Promise((resolve, reject) => {
			hotelModel.find({}, opt, (err, hotels) => {
				if (err) {
					reject(err);
				} else {
					if (hotels.length) {
						resolve(hotels);
					} else {
						reject({
							status: 404,
							message: 'No hotels have been found.',
						});
					}
				}
			});
		});
	}

	function findByName(hotelName, params) {
		return new Promise((resolve, reject) => {
			hotelModel.find(
				{ name: { $regex: hotelName, $options: 'i' } },
				params,
				(err, hotel) => {
					if (err) {
						reject(err);
					} else {
						if (hotel) {
							resolve(hotel);
						} else {
							reject({
								status: 404,
								message: 'No hotel have been found.',
							});
						}
					}
				}
			);
		});
	}

	function findById(hotelId, params) {
		return new Promise((resolve, reject) => {
			hotelModel.findById(hotelId, params, (err, hotel) => {
				console.log(hotel);
				if (err) {
					reject(err);
				} else {
					if (hotel) {
						resolve(hotel);
					} else {
						reject({
							status: 404,
							message: 'No hotel have been found.',
						});
					}
				}
			}).populate(
				'reviews.userID',
				'-_id name surname'
			);
		});
	}

	function findByIdAndUpdate(hotelId, values) {
		return new Promise((resolve, reject) => {
			hotelModel.findByIdAndUpdate(
				hotelId,
				values,
				{ new: true },
				(err, hotel) => {
					if (err) {
						reject(err);
					} else {
						if (hotel) {
							resolve(hotel);
						} else {
							reject({
								status: 404,
								message: 'No hotel have been found.',
							});
						}
					}
				}
			);
		});
	}

	function findByIdAndDelete(hotelId) {
		return new Promise((resolve, reject) => {
			hotelModel.findByIdAndDelete(hotelId, (err, hotel) => {
				if (err) {
					reject(err);
				} else {
					if (hotel) {
						resolve(hotel);
					} else {
						reject({
							status: 404,
							message: 'No hotel have been found.',
						});
					}
				}
			});
		});
	}

	function findRoomsByHotelId(hotelId,pagination) {
		const { limit, skip } = pagination;
		return new Promise((resolve, reject) => {
			roomModel.find({ hotel: hotelId },{},{ skip, limit },(err, rooms) => {
				if (err) {
					reject(err);
				} else {
					if (rooms) {
						resolve(rooms);
					} else {
						reject({
							status: 404,
							message: 'No rooms have been found.',
						});
					}
				}
			});	
		})
		.then( async (rooms) => {
			const totalRooms = await roomModel.count({ hotel: hotelId });
			return Promise.resolve({
				rooms: rooms,
				pagination:{
					pageSize: limit,
					page: Math.floor(skip / limit),
					hasMore: (skip + limit) < totalRooms,
					total: totalRooms
				}
			});
		});
	}

	function findRoomTypesByHotelId(hotelId, params, pagination) {
		const { limit, skip } = pagination;
		return new Promise((resolve, reject) => {
			roomTypeModel
				.find({ hotel: hotelId }, params, { skip, limit } , (err, roomTypes) => {
					if (err) {
						reject(err);
					} else {
						if (roomTypes) {
							resolve(roomTypes);
						} else {
							reject({
								status: 404,
								message: 'No roomTypes have been found.',
							});
						}
					}
				})
				.populate(
					'packs',
					'-_id name freeCancel maxGuests maxGuestsChild dailyPrice sale include'
				)
				.select('-_id');
		})
		.then( async (roomTypes) => {
            //const totalRoomTypes = await roomTypeModel.count();
			const totalRoomTypes = await roomTypeModel.count({ hotel: hotelId });
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

	function findBooksByHotelId(hotelId) {
		return new Promise((resolve, reject) => {
			bookModel.find({ hotel: hotelId }, (err, books) => {
				if (err) {
					reject(err);
				} else {
					if (books) {
						resolve(books);
					} else {
						reject({
							status: 404,
							message: 'No books have been found.',
						});
					}
				}
			});
		});
	}

	function findPacksByHotelId(hotelId) {
		return new Promise((resolve, reject) => {
			packsModel.find({ hotel: hotelId }, (err, packs) => {
				if (err) {
					reject(err);
				} else {
					if (packs) {
						resolve(packs);
					} else {
						reject({
							status: 404,
							message: 'No packs have been found.',
						});
					}
				}
			});
		});
	}

	return service;
}

module.exports = hotelService;
