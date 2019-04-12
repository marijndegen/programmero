"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator/check");
const { loginDataValidator, passwordRegisterValidator } = require("./middleware/validationCheckers");

const Users = mongoose.model("Users");

const authenticationRouter = express.Router();

//All return formats are in JSON.

/**
 * Checks if mailtoken exists
 * 
 * @params
 * mailtoken: String
 */

authenticationRouter.get("/:mailToken/check", (req, res) => {
	const { mailToken } = req.params;
	Users.findOne({ mailToken })
		.then(user => {
			if (!user) throw new Error("TOKEN_INVALID");
			else {
				return res.json("USER_FOUND");
			}
		})
		.catch(err => res.status(400).json({ errors: err.message }));
});

/**
 * Logs the user in and authenticates.
 * Returns a signed webtoken with user information.
 * 
 * @body
 * email: String
 * password: String
 * 
 * @returns WebToken
 */

authenticationRouter.post(
	"/login",
	loginDataValidator,
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		Users.findOne({ email: req.body.email }, (err, user) => {
			if (err) return res.status(500).json({ errors: err });

			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					const token = jwt.sign({
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin
					},
					process.env.JWT_SECRET, {
						expiresIn: "14d"
					});

					return res.json(token);
				} else {
					//Bad practice, code in the response doesnt represent a code, but represents a field in the frontend
					//TODO: make consistent over backend and make it compatible with frontend
					return res.status(400).json({
						error: "Password not correct.",
						code: "password"
					});
				}
			} else {
				//Bad practice, code in the response doesnt represent a code, but represents a field in the frontend
				//TODO: make consistent over backend and make it compatible with frontend
				return res.status(404).json({
					error: "User does not exist",
					code: "email"
				});
			}
		});
	});

/**
 * Validates passwords and sets password for user with given mailtoken
 * 
 * @body
 * pass: String
 * passrepeat: String
 * mailToken: String
 */

authenticationRouter.post("/secret", passwordRegisterValidator, (req, res) => {
	const { mailToken, pass, passrepeat } = req.body;

	if (pass !== passrepeat) return res.status(400).json({ errors: "PASSWORDS_DO_NOT_MATCH" });

	Users.findOne({ mailToken })
		.then(user => {
			if (!user) throw new Error("TOKEN_INVALID");
			bcrypt.hash(pass, 10, (err, hash) => {
				if (err) {
					throw new Error("PASSWORD_DOES_NOT_MEET_STANDARDS");
				} else {
					user.password = hash;
					user.mailToken = "";
					user.save()
						.then(() => res.status(200).send())
						.catch(() => res.status(400).send());
				}
			});
		})
		.catch(err => res.status(400).json({ "errors": err.message }));
});

module.exports = authenticationRouter;