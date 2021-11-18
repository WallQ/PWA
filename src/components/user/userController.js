const config = require('../../config/config')[process.env.NODE_ENV || 'development'];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function userService(userModel) {
	let service = {
		createUser,
		createToken,
		verifyToken,
		verifyUser,
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
		let token = jwt.sign(
			{ id: user._id },
			config.jsonwebtoken.secret,
			{
				algorithm: 'HS256',
			},
			{
				expiresIn: config.jsonwebtoken.expires_time,
			}
		);

		return token;
	}

	function verifyToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.jsonwebtoken.secret, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
	}

	function verifyUser({ email, password }) {
		return new Promise((resolve, reject) => {
			userModel.findOne({ email }, (err, user) => {
				if (err) {
					reject(err);
				}
				if (email && password) {
					if (!user) {
						reject({
							status: 200,
							message: 'Email not registered.',
						});
					} else {
						resolve(user);
					}
				} else {
					reject({
						status: 400,
						message: 'Invalid syntax.',
					});
				}
			});
		}).then((user) => {
			return verifyPassword(password, user.password).then((match) => {
				if (!match) {
					return Promise.reject({
						status: 401,
						message: 'Invalid email or password.',
					});
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
