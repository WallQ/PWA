let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let hobbies = new Schema({
	name: {
		type: String,
		required: true
	},
});

let playerSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	hobbies: [{
		type: hobbies
	}]
});

let player = mongoose.model('players', playerSchema);

module.exports = player;
