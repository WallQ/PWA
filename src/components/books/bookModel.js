const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'clients',
		required: true
	},
	room:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'room',
		required: true
	},
    pack: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'packs',
		required: true
	},
    total_price: {
		type: Number,
		required: true
	},
    purchase_date:{
		type: Date,
		default: Date.now()
	},
    checkIn_date:{
		type: Date,
		required: true
	},
    checkOut_date: {
		type: Date,
		required: true
	},
});

const book = mongoose.model('books', bookSchema);

module.exports = book;
