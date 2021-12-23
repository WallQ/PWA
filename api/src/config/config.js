require('dotenv').config();

const config = {
	development: {
		server: {
			host: process.env.SERVER_HOST || '127.0.0.1',
			http: {
				port: process.env.SERVER_HTTP_PORT || 3000,
			},
			https: {
				port: process.env.SERVER_HTTPS_PORT || 3030,
			},
		},
		database: {
			host: process.env.DATABASE_HOST || '127.0.0.1',
			port: process.env.DATABASE_PORT || 27017,
			name: process.env.DATABASE_NAME || 'pwa-project',
		},
		jsonwebtoken: {
			secret: process.env.JWT_SECRET || 'secret',
			recover_secret: process.env.JWT_RECOVER || 'secret',
			expires_time: process.env.JWT_EXPIRES_TIME || 3600,
		},
		bcrypt: {
			saltRounds: process.env.SALT_ROUNDS || 10,
		},
		nodemailer: {
			email: process.env.MAIL_EMAIL || 'example@example.com',
			password: process.env.MAIL_PASSWORD || 'example',
			smtp: process.env.MAIL_SMTP || 'smtp.gmail.com',
			port: process.env.MAIL_PORT || 587,
			expires_time: process.env.MAIL_EXPIRES_TIME || 900000,
		},
	},
	production: {},
};

module.exports = config;
