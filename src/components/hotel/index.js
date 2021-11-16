const hotelModel = require('./hotelModel');
const hotelController = require('./hotelController');

const service = hotelController(hotelModel);

module.exports = service;
