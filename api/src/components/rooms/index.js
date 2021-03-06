const roomsModel = require('./roomModel');
const booksModel = require('../books/bookModel');
const roomController = require('./roomController');

const service = roomController(roomsModel, booksModel);

module.exports = service;
