const rooms = require('./roomModel');
const books = require('../books/bookModel');
const roomController = require('./roomController');

const service = roomController(rooms,books);

module.exports = service;
