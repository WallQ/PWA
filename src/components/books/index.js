const books = require('./bookModel');
const hotels = require('../hotel/hotelModel');
const rooms = require('../rooms/roomModel');
const bookController = require('./bookController');

const service = bookController(books,hotels,rooms);

module.exports = service;