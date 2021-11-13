const express = require('express');
let PlayerAPI = require('./players');
let HotelAPI = require('./hotel');
let AuthAPI = require('./auth');

function initialize() {
	let api = express();

	api.use('/team', PlayerAPI());
	api.use('/hotel', HotelAPI());
	api.use('/auth', AuthAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
