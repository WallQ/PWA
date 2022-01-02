const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facilityType = new Schema({
	icon: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = facilityType;
