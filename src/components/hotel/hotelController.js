function hotelService(hotelModel) {
	let service = {
		create,
		findAll,
		findByName,
		findById,
		updateById,
		deleteById,
		verifyDirector,
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

	function findByName(hotelName) {
		let opt = {
			_id: 0,
			name: 1,
			description: 1,
			rating: 1,
			address: 1,
			contacts: 1,
			languages: 1,
			images: 1,
			facilities: 1,
			comments: 1,
			url: 1,
		};
		return new Promise((resolve, reject) => {
			hotelModel.find(
				{ name: { $regex: hotelName, $options: 'i' } },
				opt,
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

	function findById(hotelId) {
		return new Promise((resolve, reject) => {
			hotelModel.findById(hotelId, (err, hotel) => {
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

	function updateById(hotelId, values) {
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

	function deleteById(hotelId) {
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

	return service;
}

module.exports = hotelService;
