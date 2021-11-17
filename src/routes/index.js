const express = require('express');
const AuthAPI = require('./auth');
const HotelAPI = require('./hotel');
const RoomAPI = require('./rooms');

function initialize() {
	let api = express();

	api.use('/auth', AuthAPI());
	api.use('/hotel', HotelAPI());
	api.use('/rooms', RoomAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
