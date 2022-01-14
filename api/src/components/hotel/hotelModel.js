const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilityType = require('../../utils/facilityType');

const addressType = new Schema({
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

const contactType = new Schema({
	type: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
});

const languageType = new Schema({
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

const imageType = new Schema({
	path: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
	},
});

const reviewType = new Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

const hotelSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	averagePrice: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	languages: [
		{
			type: languageType,
		},
	],
	address: {
		type: addressType,
		required: true,
	},	
	contacts: [
		{
			type: contactType,
			required: true,
		},
	],
	facilities: [
		{
			type: facilityType,
		},
	],
	url: {
		type: String,
	},
	coverImage: {
		type: imageType,
	},
	images: [
		{
			type: imageType,
		},
	],
	reviews: [
		{
			type: reviewType,
		},
	],
	createdDate: {
		type: Date,
		default: Date.now,
	},
	director: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	employee: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	],
});

const hotel = mongoose.model('hotel', hotelSchema);

module.exports = hotel;
