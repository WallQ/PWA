const hotel = require('./hotelModel');
const hotelService = require('./hotelController');

const service = hotelService(hotel);

module.exports = service;
