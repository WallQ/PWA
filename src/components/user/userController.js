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
		removeById,
		createToken,
		register,
		verifyUser,
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
		let newUser = playerModel(user);
		return save(newUser);
	}

	function findAll() {
		return new Promise((resolve, reject) => {
			userModel.find({}, (err, users) => {
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
		return new Promise((resolve, reject) => {
			userModel.findById(userId, (err, user) => {
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
				function (err, user) {
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

	function removeById(userId) {
		return new Promise((resolve, reject) => {
			userModel.findByIdAndRemove(userId, (err, user) => {
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
