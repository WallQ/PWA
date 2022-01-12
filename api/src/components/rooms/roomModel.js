const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	number: {
		type: String,
		required: true,
	},
	roomType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'roomTypes',
		strictPopulate: false,
		required: true,
	},
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hotel',
		required: true,
	},
});

const room = mongoose.model('room', roomSchema);

module.exports = room;
