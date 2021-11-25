const roomTypesModel = require('./roomTypeModel');
const bookModel = require('../books/bookModel');
const roomModel = require('../rooms/roomModel');
const hotelModel = require('../hotel/hotelModel');
const roomTypeController = require('./roomTypeController');

const service = roomTypeController(
	roomTypesModel,
	bookModel,
	roomModel,
	hotelModel
);

module.exports = service;
