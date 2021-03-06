const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const app = require('./app');

app.listen(config.server.http.port, config.server.host, () => {
		console.log(
			`Server running at -> http://${config.server.host}:${config.server.http.port}/`
		);
	}
);