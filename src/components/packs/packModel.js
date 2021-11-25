const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	freeCancel: {
		type: Boolean,
	},
	maxGuests: {
		type: Number,
		required: true,
	},
	maxGuestsChild: {
		type: Number,
		required: true,
	},
	dailyPrice: {
		type: Number,
		required: true,
	},
	minNights: {
		type: Number,
	},
	sale: {
		type: Number,
	},
	include: [
		{
			type: String,
		},
	],
	start_date: {
		type: Date,
		required: true,
	},
	end_date: {
		type: Date,
		required: true,
	},
});

const packs = mongoose.model('packs', packSchema);

module.exports = packs;
