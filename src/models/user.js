const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name field is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name field is required'],
	},
	email: {
		type: String,
		unique: [true, 'Email must be unique'],
		required: [true, 'Email field is required'],
	},
	password: {
		type: String,
		required: [true, 'Password field is required'],
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
