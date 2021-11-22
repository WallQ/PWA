const roomTypes = require('./roomTypeModel');
const roomTypeController = require('./roomTypeController');

const service = roomTypeController(roomTypes);

module.exports = service;