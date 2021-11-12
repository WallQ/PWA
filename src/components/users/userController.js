const config = require('../../config/config')[process.env.NODE_ENV || 'development'];
const jwt = require('jsonwebtoken');

function userService(userModel) {
	let service = {
		create,
		createToken,
		verifyToken,
		findUser,
	};

	function create(values) {
		let newUser = userModel(values);
		return save(newUser);
	}

	function save(newUser) {
		return new Promise(function (resolve, reject) {
			newUser.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Player created successfully!');
				}
			});
		});
	}

	function createToken(user) {
		let token = jwt.sign({ id: user._id }, config.jsonwebtoken.secret, {
			expiresIn: config.jsonwebtoken.expires_time,
		});

		return { auth: true, token };
	}

	function verifyToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.jsonwebtoken.secret, (err, decoded) => {
				if (err) {
					reject(err);
				}

				return resolve(decoded);
			});
		});
	}

	function findUser({ email, password }) {
		return new Promise((resolve, reject) => {
			userModel.findOne({ email, password }, function (err, user) {
				if (err) {
					reject(err);
				}

				if (!user) {
					reject('This data is wrong', err);
				}

				resolve(user);
			});
		});
	}

	return service;
}

module.exports = userService;
