const express = require('express');
let PlayerAPI = require('./players');
let HotelAPI = require('./hotel');
let AuthAPI = require('./auth');
let RoomAPI = require('./rooms');
let BookAPI = require('./books');
let PackAPI = require('./packs');

function initialize() {
	let api = express();

	api.use('/team', PlayerAPI());
	api.use('/hotel', HotelAPI());
	api.use('/auth', AuthAPI());
	api.use('/rooms', RoomAPI());
	api.use('/books', BookAPI());
	api.use('/packs', PackAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
