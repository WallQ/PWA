const express = require('express');

const AuthAPI = require('./auth');
const UserAPI = require('./user');
const HotelAPI = require('./hotel');
const RoomAPI = require('./rooms');
const RoomTypeAPI = require('./roomTypes');
const BookAPI = require('./books');
const PackAPI = require('./packs');

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
