const books = require('./bookModel');
const hotels = require('../hotel/hotelModel');
const rooms = require('../rooms/roomModel');
const roomsTypes = require('../roomTypes/roomTypeModel');
const bookController = require('./bookController');

const service = bookController(books, hotels, rooms, roomsTypes);

module.exports = service;
