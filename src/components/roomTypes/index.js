const roomTypes = require('./roomTypeModel');
const books = require('../books/bookModel');
const rooms = require('../rooms/roomModel');
const roomTypeController = require('./roomTypeController');

const service = roomTypeController(roomTypes,books,rooms);

module.exports = service;