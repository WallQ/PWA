const config = require('../../config/config')[process.env.NODE_ENV || 'development'];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function userService(userModel) {
	let service = {
		createUser,
		createToken,
		verifyToken,
		findUser,
		hashPassword,
		verifyPassword,
	};

	function createUser(user) {
		return hashPassword(user.password).then((hashedPassword, err) => {
			if (err) {
				return Promise.reject(err);
			}

			let newUserUpdated = {
				...user,
				password: hashedPassword,
			};

			let newUser = userModel(newUserUpdated);
			return save(newUser);
		});
	}

	function save(newUser) {
		return new Promise((resolve, reject) => {
			newUser.save((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(newUser);
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
			userModel.findOne({ email }, (err, user) => {
				if (err) {
					reject(err);
				}

				if (!user) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		}).then((user) => {
			return verifyPassword(password, user.password).then((match) => {
				if (!match) {
					return Promise.reject('Incorrect email or password.');
				} else {
					return Promise.resolve(user);
				}
			});
		});
	}

	function hashPassword(password) {
		return bcrypt.hash(password, parseInt(config.bcrypt.saltRounds));
	}

	function verifyPassword(password, hashedPassword) {
		return bcrypt.compare(password, hashedPassword);
	}

	return service;
}

module.exports = userService;
