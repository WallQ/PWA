const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roles = require('../../config/roles');

const imageType = new Schema({
	path: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
	},
});

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: [
		{
			type: String,
			default: 'Client',
		},
	],
	image: {
		type: imageType,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

const user = mongoose.model('user', userSchema);

module.exports = user;
