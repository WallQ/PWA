const users = require('./userModel');
const usersService = require('./userController');

const service = usersService(users);

module.exports = service;