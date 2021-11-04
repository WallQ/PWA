const express = require('express');
require('dotenv').config();

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();
const db = require('./database');

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
