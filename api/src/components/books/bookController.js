function booksController(bookModel, hotelModel, roomModel, roomTypeModel) {
	let services = {
		create,
		find,
		findAll,
		findById,
		findByUser,
		findByIdAndUpdate,
		findByIdAndDelete,
		findRoomTypes,
		getAvailableRoomTypes,
	};

	function save(newBook) {
		return new Promise((resolve, reject) => {
			newBook.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newBook);
				}
			});
		});
	}

	function create(values) {
		let newBook = bookModel(values);
		return save(newBook);
	}

	function find(opt = {}) {
		return new Promise((resolve, reject) => {
			bookModel.find(opt, (err, books) => {
				if (err) reject(err);
				resolve(books);
			});
		});
	}

	function findAll() {
		return new Promise((resolve, reject) => {
			bookModel.find({}, (err, books) => {
				if (err) reject(err);
				resolve(books);
			});
		});
	}

	function findById(id) {
		return new Promise((resolve, reject) => {
			bookModel.findById(id, (err, book) => {
				if (err) reject(err);
				resolve(book);
			});
		});
	}

	function findByUser(id) {
		return new Promise((resolve, reject) => {
			bookModel.find({ client: id }, (err, book) => {
				if (err) reject(err);
				resolve(book);
			});
		});
	}

	function findByIdAndUpdate(id, values) {
		return new Promise((resolve, reject) => {
			bookModel.findByIdAndUpdate(id, values, (err, book) => {
				if (err) reject(err);
				resolve(book);
			});
		});
	}

	function findByIdAndDelete(bookId) {
		return new Promise((resolve, reject) => {
			bookModel.findByIdAndDelete(bookId, (err, book) => {
				if (err) {
					reject(err);
				} else {
					if (book) {
						resolve(book);
					} else {
						reject({
							status: 404,
							message: 'No book have been found.',
						});
					}
				}
			});
		});
	}

	function findRoomTypes(roomTypes) {
		return new Promise((resolve, reject) => {
			roomTypeModel
				.find({ _id: { $in: roomTypes } })
				.populate('packs')
				.exec((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	async function getAvailableRoomTypes(
		hotelID,
		numGuest,
		numGuestChild,
		dataCheckIn,
		dataCheckOut
	) {
		try {
			let opt = {
				$and: [
					{ hotel: String(hotelID) },
					{ maxGuest: { $gte: numGuest } },
					{ maxGuestChild: { $gte: numGuestChild } },
				],
			};
			const matchRoomTypes = await roomTypeModel.find(opt).exec();
			//console.log("matchRoomTypes: ",matchRoomTypes)
			let res = [];

			for (const roomType of matchRoomTypes) {
				if (
					await haveAvailability(
						roomType._id,
						dataCheckIn,
						dataCheckOut
					)
				) {
					res.push(roomType._id);
				}
			}
			return res;
		} catch (error) {
			throw error;
		}
	}

	async function haveAvailability(roomTypeId, dataCheckIn, dataCheckOut) {
		let opt = {
			$or: [
				{
					$and: [
						{ checkIn_date: { $lte: new Date(dataCheckIn) } },
						{ checkOut_date: { $gt: new Date(dataCheckIn) } },
					],
				},
				{
					$and: [
						{ checkIn_date: { $lt: new Date(dataCheckOut) } },
						{ checkOut_date: { $gte: new Date(dataCheckOut) } },
					],
				},
				{
					$and: [
						{ checkIn_date: { $gte: new Date(dataCheckIn) } },
						{ checkOut_date: { $lte: new Date(dataCheckOut) } },
					],
				},
			],
			roomType: roomTypeId,
		};

		try {
			const matchRoomTypes = await bookModel.find(opt).exec();

			if (
				(numBooks =
					matchRoomTypes.length <
					(numMaxAvailable = await countRoomTypeRooms(roomTypeId)))
			) {
				return true;
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	async function countRoomTypeRooms(roomTypeId) {
		try {
			let opt = { roomType: roomTypeId };
			const roomCount = await roomModel.countDocuments(opt).exec();
			return roomCount;
		} catch (error) {
			throw error;
		}
	}

	return services;
}

module.exports = booksController;
