const players = require('./playerModel');
const playersService = require('./playerController');

const service = playersService(players);

module.exports = service;
