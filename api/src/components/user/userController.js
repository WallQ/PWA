const config = require('../../config/config')[process.env.NODE_ENV || 'development'];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function userService(userModel) {
	let service = {
		create,
		findAll,
		findByEmail,
		findById,
		updateById,
		deleteById,
		createToken,
		createTokenRecoverPassword,
		verifyRecoverPassword,
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

	function findByEmail(userEmail, params) {
		return new Promise((resolve, reject) => {
			userModel.findOne({ email: userEmail }, params, (err, user) => {
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

	function createTokenRecoverPassword(user) {
		return new Promise((resolve, reject) => {
			hashPassword(user.password.slice(-7))
				.then((val) => {
					let token = jwt.sign(
						{
							id: user._id,
							email: user.email,
							validationHash: val,
						},
						config.jsonwebtoken.recover_secret,
						{ algorithm: 'HS256' },
						{ expiresIn: config.nodemailer.expires_time }
					);
					resolve(token);
				})
				.catch((err) => reject(err));
		});
	}

	function verifyRecoverPassword(userId, newPassword, validationHash) {
		return new Promise((resolve, reject) => {
			userModel
				.findById(userId)
				.then((user) =>
					bcrypt.compare(
						user.password.slice(-7).toString(),
						validationHash.toString()
					)
				)
				.then((match) => {
					if (!match)
						reject('Password already changed. Token is invalid!');
					hashPassword(newPassword).then((hash) =>
						updateById(userId, { password: hash })
					);
				})
				.then(() => {
					resolve();
				})
				.catch((err) => reject(err));
		});
	}

	function register(name, surname, email, password) {
		return hashPassword(password).then((hashedPassword, err) => {
			if (err) {
				return Promise.reject(err);
			}
			let newUserUpdated = {
				name: name,
				surname: surname,
				email: email,
				password: hashedPassword,
			};
			let newUser = userModel(newUserUpdated);
			return save(newUser);
		});
	}

	function verifyUser(email, password ) {
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
