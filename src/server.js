const express = require('express');
require('dotenv').config();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const db = require('./database');

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
