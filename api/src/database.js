const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const mongoose = require('mongoose');

mongoose
	.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`)
	.then(() => {
		console.log(`Database running at -> mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);
	})
	.catch((err) => {
		console.log('Connection failure with database!', err);
	});

module.exports = mongoose;
