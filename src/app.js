const express = require('express');
const router = require('./routes');

var app = express();
app.use(express.json());
app.use(router.initialize());

const db = require('./database');

module.exports = app;
