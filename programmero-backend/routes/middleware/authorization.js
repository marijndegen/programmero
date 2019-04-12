const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Users = mongoose.model("Users");

/**
 * Authorizes the user and assigns if it is an admin to request.
 * Goes to next route or middleware to process request.
 * 
 * @headers
 * authorization - String
 */
module.exports.ensureAuthenticated = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		var decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) return res.status(401).json({ errors: "NO_TOKEN" });

	} catch (err) {
		return res.status(401).json({ errors: err });
	}

	Users.findOne({ _id: decoded._id }, (err, user) => {
		if (err) {
			return res.status(500).json({ errors: err });
		}

		if (!user) {
			return res.status(401).json({ errors: "USER_NOT_FOUND" });
		}
		req.user = user;
		return next();
	});
};