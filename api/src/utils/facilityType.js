const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facilityType = new Schema({
	icon: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = facilityType;
