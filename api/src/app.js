const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(router.initialize());
app.use('/public', express.static('public'))
app.use(notFound);
app.use(errorHandler);

const db = require('./database');

module.exports = app;
