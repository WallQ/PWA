const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilityType = require('../../utils/facilityType');

let defaultByMonth = new Schema({
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

const roomTypeSchema = new Schema({
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'hotel',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		default: 0,
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
	packs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'packs',
		},
	],
	facilities: [
		{
			type: String
		},
	],
	images: [
		{
			type: String
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

const packs = mongoose.model('roomTypes', roomTypeSchema);

module.exports = packs;
