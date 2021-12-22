const verifyROLES = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.roles) {
			return res.status(401).send({
				error: {
					status: 401,
					message:
						"You don't have permission to access this content.",
				},
			});
		}
		const roles = [...allowedRoles];

		const result = req.roles
			.map((role) => roles.includes(role))
			.find((val) => val === true);

		if (!result) {
			return res.status(401).send({
				error: {
					status: 401,
					message:
						"You don't have permission to access this content.",
				},
			});
		}

		next();
	};
};

module.exports = verifyROLES;
