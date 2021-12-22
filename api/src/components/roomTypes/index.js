const roomTypesModel = require('./roomTypeModel');
const bookModel = require('../books/bookModel');
const roomModel = require('../rooms/roomModel');
const roomTypeController = require('./roomTypeController');

const service = roomTypeController(roomTypesModel, bookModel, roomModel);

module.exports = service;
