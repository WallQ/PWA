const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || 27017;
const name = process.env.DB_NAME || 'undefined';

mongoose
	.connect(`mongodb://${host}:${port}/${name}`)
	.then(() => {
		console.log('Connection established successfully with MongoDB!');
	})
	.catch((err) => {
		console.log('Connection established unsuccessful with MongoDB!', err);
	});

module.exports = mongoose;
