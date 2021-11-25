const roomsModel = require('./roomModel');
const booksModel = require('../books/bookModel');
const hotelModel = require('../books/bookModel');
const roomController = require('./roomController');

const service = roomController(roomsModel, booksModel, hotelModel);

module.exports = service;
