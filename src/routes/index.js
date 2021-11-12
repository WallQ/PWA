const express = require('express');
let PlayerAPI = require('./players');
let AuthAPI = require('./auth');

function initialize() {
	let api = express();

	api.use('/team', PlayerAPI());
	api.use('/auth', AuthAPI());

	return api;
}

module.exports = {
	initialize: initialize,
};
