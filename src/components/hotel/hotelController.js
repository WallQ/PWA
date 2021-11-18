function hotelService(hotelModel) {
	let service = {
		create,
		findAll,
		findById,
		findByName,
		updateById,
		deleteById,
	};

	function create(values) {
		let newHotel = hotelModel(values);
		return save(newHotel);
	}

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

	function findAll() {
		return new Promise((resolve, reject) => {
			hotelModel.find({}, (err, hotels) => {
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
		return new Promise((resolve, reject) => {
			hotelModel.find(
				{ name: { $regex: hotelName, $options: 'i' } },
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
