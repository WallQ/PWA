const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');

const options = {
	key: fs.readFileSync('./pwa.key'),
	cert: fs.readFileSync('./pwa.cer'),
};

http.createServer(app).listen(
	config.server.http.port,
	config.server.host,
	() => {
		console.log(
			`Server running at -> http://${config.server.host}:${config.server.http.port}/`
		);
	}
);

https
	.createServer(options, app)
	.listen(config.server.https.port, config.server.host, () => {
		console.log(
			`Server running at -> https://${config.server.host}:${config.server.https.port}/`
		);
	});
