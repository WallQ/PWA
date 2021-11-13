const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressType = new Schema({
	street: {
		type: String,
		required: true,
	},
	postCode: {
		type: String,
		required: true,
	},
	doorNumber: {
		type: Number,
		required: true,
	},
	district: {
		type: String,
		required: true,
	},
	locality: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	map: {
		type: String,
	},
});

let contactType = new Schema({
	type: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
});

let languageType = new Schema({
	initials: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
});

let imageType = new Schema({
	cover: {
		type: Boolean,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	tags: [
		{
			type: String,
		},
	],
});

let facilityType = new Schema({
	icon: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

let commentType = new Schema({
	userID: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

let hotelSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	address: {
		type: addressType,
		required: true,
	},
	contacts: [{
		type: contactType,
		required: true,
	}],
	languages: [{
		type: languageType,
	}],
	images: [{
		type: imageType,
	}],
	facilities: [{
		type: facilityType,
	}],
	comments: [{
		type: commentType,
	}],
});

let Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
