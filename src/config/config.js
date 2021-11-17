require('dotenv').config();

const config = {
	development: {
		server: {
			host: process.env.SERVER_HOST || '127.0.0.1',
			port: process.env.SERVER_PORT || 3000,
		},
		database: {
			host: process.env.DATABASE_HOST || '127.0.0.1',
			port: process.env.DATABASE_PORT || 27017,
			name: process.env.DATABASE_NAME || 'sample',
		},
		jsonwebtoken: {
			secret: process.env.JWT_SECRET || 3000,
			expires_time: process.env.JWT_EXPIRES_TIME || 3600,
		},
		bcrypt: {
			saltRounds: process.env.SALT_ROUNDS || 10,
		},
	},
	production: {},
};

module.exports = config;
