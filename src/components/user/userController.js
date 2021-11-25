const config = require('../../config/config')[
	process.env.NODE_ENV || 'development'
];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../../config/roles');

function userService(userModel) {
	let service = {
		create,
		findAll,
		findByEmail,
		findById,
		updateById,
		deleteById,
		createToken,
		register,
		verifyUser,
		verifyPassword,
		hashPassword,
	};

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

	function create(user) {
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

	function findAll() {
		let opt = {
			_id: 1,
			name: 1,
			surname: 1,
			email: 1,
			roles: 1,
			createdDate: 1,
		};
		return new Promise((resolve, reject) => {
			userModel.find({}, opt, (err, users) => {
				if (err) {
					reject(err);
				} else {
					if (users.length) {
						resolve(users);
					} else {
						reject({
							status: 404,
							message: 'No users have been found.',
						});
					}
				}
			});
		});
	}

	function findByEmail(userEmail) {
		return new Promise((resolve, reject) => {
			userModel.findOne({ email: userEmail }, (err, user) => {
				if (err) {
					reject(err);
				} else {
					if (user) {
						resolve(user);
					} else {
						reject({
							status: 404,
							message: 'No user have been found.',
						});
					}
				}
			});
		});
	}

	function findById(userId) {
		let params = {
			_id: 0,
			name: 1,
			surname: 1,
			email: 1,
		};
		return new Promise((resolve, reject) => {
			userModel.findById(userId, params, (err, user) => {
				if (err) {
					reject(err);
				} else {
					if (user) {
						resolve(user);
					} else {
						reject({
							status: 404,
							message: 'No user have been found.',
						});
					}
				}
			});
		});
	}

	function updateById(userId, values) {
		return new Promise((resolve, reject) => {
			userModel.findByIdAndUpdate(
				userId,
				values,
				{ new: true },
				(err, user) => {
					if (err) {
						reject(err);
					} else {
						if (user) {
							resolve(user);
						} else {
							reject({
								status: 404,
								message: 'No user have been found.',
							});
						}
					}
				}
			);
		});
	}

	function deleteById(userId) {
		return new Promise((resolve, reject) => {
			userModel.findByIdAndDelete(userId, (err, user) => {
				if (err) {
					reject(err);
				} else {
					if (user) {
						resolve(user);
					} else {
						reject({
							status: 404,
							message: 'No user have been found.',
						});
					}
				}
			});
		});
	}

	function createToken(user) {
		let token = jwt.sign(
			{ id: user._id, email: user.email, roles: user.roles },
			config.jsonwebtoken.secret,
			{ algorithm: 'HS256' },
			{ expiresIn: config.jsonwebtoken.expires_time }
		);
		return token;
	}

	function register(user) {
		return hashPassword(user.password).then((hashedPassword, err) => {
			if (err) {
				return Promise.reject(err);
			}
			let newUserUpdated = {
				...user,
				password: hashedPassword,
				roles: [roles.CLIENT],
			};
			let newUser = userModel(newUserUpdated);
			return save(newUser);
		});
	}

	function verifyUser({ email, password }) {
		return new Promise((resolve, reject) => {
			userModel.findOne({ email: email }, (err, user) => {
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
			return comparePassword(password, user.password).then((match) => {
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

	function verifyPassword(userId, password) {
		return new Promise((resolve, reject) => {
			userModel.findById(userId, (err, user) => {
				if (err) {
					reject(err);
				}
				if (password) {
					if (!user) {
						reject({
							status: 200,
							message: 'User not found.',
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
			return comparePassword(password, user.password).then((match) => {
				if (!match) {
					return Promise.reject({
						status: 401,
						message: 'Invalid password.',
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

	function comparePassword(password, hashedPassword) {
		return bcrypt.compare(password, hashedPassword);
	}

	return service;
}

module.exports = userService;
