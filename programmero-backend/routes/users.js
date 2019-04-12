"use strict";

const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const uuid = require("uuid/v1");
const mail = require("../mails/mail");
const userRouter = express.Router();
const objectId = mongoose.Types.ObjectId;
const lessonResultsRouter = require("./nested/lessonResults");

const { lessonIdValidator, registerDataValidator } = require("./middleware/validationCheckers");
const { validationResult } = require("express-validator/check");

userRouter.use("/lessonresults", lessonResultsRouter);

/**
 * Gets the total score of a user
 * Returns a Number with the score
 * 
 * @returns Number
 */
userRouter.get("/score", (req, res) => {
	return res.json(req.user.score);
});

/**
 * Gets the total score of a user from a specific lesson
 * Returns a Number with the score
 * 
 * @returns Number
 */
userRouter.get("/score/:lessonId", lessonIdValidator, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
	if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

	const lessonResult = req.user.lessonResults.filter((element) => element.lessonId.toString() === req.params.lessonId)[0];
	if (!lessonResult) return res.status(404).json({ errors: "LESSONRESULT_NOT_FOUND" });

	return res.json(lessonResult.score);
});

/**
 * Creates a new resource for a user that can hold multiple lessonresults.
 * Returns the ObjectId of newly created user.
 * 
 * @returns String
 */
userRouter.post("/", registerDataValidator, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

	const { name, email, isAdmin } = req.body;
	const mailToken = uuid();
	let userData = {
		_id: objectId(),
		name,
		email,
		mailToken,
		isAdmin
	};

	if (!isAdmin) userData.score = 0;

	const user = new User(userData);

	user.save()
		.then(user => {
			const transport = mail.transport;
			const mailMessage = mail.compose(email, "Activate account", "studentRegistration", user);
			transport.sendMail(mailMessage, err => {
				if (err) {
					res.status(500).json({ errors: "EMAIL_NOT_SEND" });

				} else {
					res.status(201).send();
				}
			});
		})
		.catch(err => res.status(400).json(err));
});

module.exports = userRouter;