const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

function emailController(nodemailer,userController) {
	let services = {
		sendEmailRecoverPassword
	};

	function sendEmailRecoverPassword(sendTo,recoverToken){
		return new Promise((resolve, reject) => {
			
			let transporter = nodemailer.createTransport({
				host: config.nodemailer.smtp,
				port: config.nodemailer.port,
				auth: {
					user: config.nodemailer.email,
					pass: config.nodemailer.password
				}
			});

			let mailOptions = {
				from: config.nodemailer.email,
				to: sendTo,
				subject: 'Recover Password',
				html: `<b>http://127.0.0.1:3000/auth/forgot-password/${recoverToken}</b>`, // html body
			};

			transporter.sendMail(mailOptions,  (error, info) => {
				if (error) reject("Error on sending Email for user!")
				resolve("Email Send")
			});	
			
		})
	}

	return services;
}

module.exports = emailController;
