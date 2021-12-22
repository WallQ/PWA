const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(router.initialize());
//Handle Error404
app.use((req, res, next) => {
	const err = new Error("Oops! Sorry, we couldn't found you're looking for.");
	err.status = 404;
	next(err);
});
app.use(errorHandler);

const db = require('./database');

module.exports = app;
