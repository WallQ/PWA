const rooms = require('./roomModel');
const roomController = require('./roomController');

const service = roomController(rooms);

module.exports = service;