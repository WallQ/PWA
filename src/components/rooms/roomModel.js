const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facility = new Schema({
	icon: String,
    description: String
})

let defaultByMounth = new  Schema({
    mounth: {type: Number, required: true},
    default_price: {type: Number, required: true},
    wekend_price: {type: Number, required: true}
})

const extraDays = new  Schema({
    day: {type: Date, required: true},
    price: {type: Number, required: true}
})

const roomSchema = new Schema({
	number: {
		type: String,
		required: true,
		unique:true
	},
    name: {
		type: String,
		required: true
	},
    description: {
		type: String,
		required: true
	},
    maxGuest:{
		type: Number,
		required: true
	},
    maxGuestChild:{
		type: Number,
		required: true
	},
    area: {
		type: Number,
		required: true
	},
    sale:{
		type: Number,
		default: 0
	},
    facilities: [{type:facility, required:true}],
    priceByMounth:[{type:defaultByMounth}],
    priceExtraDays:[{type:extraDays}]
});

const room = mongoose.model('room', roomSchema);

module.exports = room;
