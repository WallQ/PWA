function booksController(bookModel, hotelModel, roomModel) {
	let services = {
		create,
		find,
		findAll,
		findById,
		findByIdAndUpdate,
		findByIdAndDelete,
	};

	function create(values) {
		let newBook = bookModel(values);
		return save(newBook);
	}

	function save(newBook) {
		return new Promise(function (resolve, reject) {
			//Testar os IDS ( HOTEL, ROOM)
			newBook.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Book created successfully!');
				}
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
	function find(opt = {}) {
		return new Promise((resolve, reject) => {
			bookModel.find(opt, (err, books) => {
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

	function findByIdAndUpdate(id, values) {
		return new Promise((resolve, reject) => {
			bookModel.findByIdAndUpdate(id, values, (err, book) => {
				if (err) reject(err);
				resolve(book);
			});
		});
	}

	function findByIdAndDelete(id) {
		return new Promise((resolve, reject) => {
			bookModel.findByIdAndDelete(id, (err, book) => {
				if (!book) reject('Can not delete item!');
				resolve(book);
			});
		});
	}

	return services;
}

module.exports = booksController;
