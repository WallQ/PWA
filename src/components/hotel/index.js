const hotelModel = require('./hotelModel');
const roomModel = require('../rooms/roomModel');
const roomTypeModel = require('../roomTypes/roomTypeModel');
const bookModel = require('../books/bookModel');
const packsModel = require('../packs/packModel');
const hotelController = require('./hotelController');

const service = hotelController(
	hotelModel,
	roomModel,
	roomTypeModel,
	bookModel,
	packsModel
);

module.exports = service;
