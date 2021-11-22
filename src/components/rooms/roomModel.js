const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilityType = require('../../utils/facilityType');

const roomSchema = new Schema({
	number: {
		type: String,
		required: true
	},
	roomType:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'roomTypes',
		required: true
	},
	hotel:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Hotel'
	},
	notes:{
		type: String
	}

});

const room = mongoose.model('room', roomSchema);

module.exports = room;
