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
					resolve(hotels);
				}
			});
		});
	}

	function findByName(hotelName) {
		return new Promise((resolve, reject) => {
			//hotelModel.findOne({ name: hotelName }, function (err, hotel) {});
			hotelModel.find({ name: hotelName }, (err, hotel) => {
				if (err) {
					reject(err);
				} else {
					resolve(hotel);
				}
			});
		});
	}

	function findById(hotelId) {
		return new Promise((resolve, reject) => {
			hotelModel.findById(hotelId, (err, hotel) => {
				if (err) {
					reject(err);
				} else {
					resolve(hotel);
				}
			});
		});
	}

	function updateById(hotelId, values) {
		return new Promise((resolve, reject) => {
			//hotelModel.findOneAndUpdate(hotelId, values, { new: true }, function (err, user) {});
			hotelModel.findByIdAndUpdate(
				hotelId,
				values,
				{ new: true },
				(err, hotel) => {
					if (err) {
						reject(err);
					} else {
						resolve(hotel);
					}
				}
			);
		});
	}

	function deleteById(hotelId) {
		return new Promise((resolve, reject) => {
			//hotelModel.findOneAndDelete(hotelId, function (err, hotel) {});
			hotelModel.findByIdAndDelete(hotelId, (err, hotel) => {
				if (err) {
					reject(err);
				} else {
					resolve(hotel);
				}
			});
		});
	}

	return service;
}

module.exports = hotelService;
