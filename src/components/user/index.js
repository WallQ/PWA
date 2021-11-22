const userModel = require('./userModel');
const userController = require('./userController');

const service = userController(userModel);

module.exports = service;
