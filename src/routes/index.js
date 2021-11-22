const express = require('express');

let HotelAPI = require('./hotel');
let AuthAPI = require('./auth');
let RoomAPI = require('./rooms');
let RoomTypeAPI = require('./roomTypes');
let BookAPI = require('./books');
let PackAPI = require('./packs');
let UserAPI = require('./user');


function initialize() {
	let api = express();

	api.use('/auth', AuthAPI());
	api.use('/user', UserAPI());
	api.use('/hotel', HotelAPI());
	api.use('/rooms', RoomAPI());
	api.use('/roomTypes', RoomTypeAPI());
	api.use('/books', BookAPI());
	api.use('/packs', PackAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
