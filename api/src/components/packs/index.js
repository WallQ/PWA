const packs = require('./packModel');
const packController = require('./packController');

const service = packController(packs);

module.exports = service;
