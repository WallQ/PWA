const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilityType = require('../../utils/facilityType');

const defaultByMonth = new Schema({
	month: {
		type: Number,
		required: true,
	},
	default_price: {
		type: Number,
		required: true,
	},
	weekend_price: {
		type: Number,
		required: true,
	},
});

const extraDays = new Schema({
	day: {
		type: Date,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const roomSchema = new Schema({
	number: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	maxGuest: {
		type: Number,
		required: true,
	},
	maxGuestChild: {
		type: Number,
		required: true,
	},
	area: {
		type: Number,
		required: true,
	},
	sale: {
		type: Number,
		default: 0,
	},
	facilities: [
		{
			type: facilityType,
		},
	],
	priceByMonth: [
		{
			type: defaultByMonth,
		},
	],
	priceExtraDays: [
		{
			type: extraDays,
		},
	],
});

const room = mongoose.model('room', roomSchema);

module.exports = room;
