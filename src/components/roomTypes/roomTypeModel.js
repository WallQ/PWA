const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilityType = require('../../utils/facilityType');

let defaultByMounth = new Schema({
	mounth: { type: Number, required: true },
	default_price: { type: Number, required: true },
	wekend_price: { type: Number, required: true },
});

const extraDays = new Schema({
	day: { type: Date, required: true },
	price: { type: Number, required: true },
});

const roomTypeSchema = new Schema({
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hotel',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	packs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'packs',
		},
	],
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
	facilities: [{ type: facilityType, required: true }],
	priceByMounth: [{ type: defaultByMounth }],
	priceExtraDays: [{ type: extraDays }],
});

const packs = mongoose.model('roomTypes', roomTypeSchema);

module.exports = packs;
