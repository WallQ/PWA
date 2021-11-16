const express = require('express');
let PlayerAPI = require('./players');
let HotelAPI = require('./hotel');
let AuthAPI = require('./auth');
let RoomAPI = require('./rooms');

function initialize() {
	let api = express();

	api.use('/team', PlayerAPI());
	api.use('/hotel', HotelAPI());
	api.use('/auth', AuthAPI());
	api.use('/rooms', RoomAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
