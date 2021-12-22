const nodemailer = require("nodemailer");
const userController = require('../../components/user');
const emailController = require('./emailController');

const service = emailController(nodemailer,userController);

module.exports = service;
