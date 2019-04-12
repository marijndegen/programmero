"use strict";
const express = require("express");
const mongoose = require("mongoose");
const utilSet = require("../../utils/utilSet");
const { validationResult } = require("express-validator/check");
const { codeCardDataValidator, lessonIdValidator, codeCardIdValidator } = require("../middleware/validationCheckers");

//This is a nested router
//SOURCE: https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

const codeCardsRouter = express.Router({ mergeParams: true });
const Lessons = mongoose.model("Lessons");

const objectId = require("mongodb").ObjectID;

/**
 * Gets all codecards in a lesson.
 * Returns an array of all codecards. 
 * 
 * @params lessonId - ObjectId
 * 
 * @returns Array
 */
codeCardsRouter.get(
	"/",
	lessonIdValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.findOne({ _id: req.params.lessonId }, { codeCards: true }, (err, lesson) => {
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });
			return (err) ?
				res.status(500).json({ errors: err }) :
				res.json(lesson.codeCards);
		});
	}
);
/**
 * Gets a specific codecard from a lesson by the users current progress on the lesson.
 * Returns an object with all info of the current lesson and a hussled que
 * 
 * @params lessonId - ObjectId
 * 
 * @returns Object
 */
codeCardsRouter.get(
	"/student",
	lessonIdValidator,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		const lessonId = req.params.lessonId;
		const lessonResult = req.user.lessonResults.filter((element) => element.lessonId.toString() === lessonId && !element.completed)[0];

		if (!lessonResult) return res.status(404).json({ errors: "LESSONRESULT_NOT_FOUND" });

		Lessons.findOne({ _id: lessonId }, { codeCards: true }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });

			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });
			if (lesson.codeCards.length <= 0) return res.status(404).json({ errors: "NO_CODECARDS_IN_LESSON" });

			const codeCard = lesson.codeCards.filter((element) => element.number === lessonResult.answers.length)[0];
			if (!codeCard) return res.status(409).json({ errors: "CODECARD_WRONG_INDEX" });

			let newparts = codeCard.parts;
			for (let i = 0; i < newparts.length; i++) {
				let randomValue = utilSet.getRandomInt(newparts.length);
				let value = newparts[i];
				let value2 = newparts[randomValue];
				newparts[i] = value2;
				newparts[randomValue] = value;
			}

			const response = {
				_id: codeCard._id,
				question: codeCard.question,
				parts: newparts,
				amountQuestions: lesson.codeCards.length,
				indexCurrentQuestion: lessonResult.answers.length
			};

			if (lessonResult.answers.length === lesson.codeCards.length) response.isLast = true;

			return res.json(response);
		});
	}
);

/**
 * Gets a specific codecard from a lesson by ID.
 * Returns a full codecard object.
 * 
 * @params lessonId - ObjectId
 * @params codeCardId - ObjectId
 * 
 * @returns Object
 */
codeCardsRouter.get(
	"/:codeCardId",
	lessonIdValidator,
	codeCardIdValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.findOne({ _id: req.params.lessonId }, { codeCards: true }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });

			const codeCard = lesson.codeCards.filter((element) => element._id.toString() === req.params.codeCardId)[0];
			return (codeCard) ? res.json(codeCard) : res.status(404).json({ errors: "CODECARD_NOT_FOUND" });
		});
	});

/**
 * Adds a new codecard in a lesson.
 * Returns the ObjectId of newly created codecard.
 * 
 * @params lessonId - ObjectId
 * 
 * @body
 * question: String
 * answer: [String]
 * 
 * @returns String
 */
codeCardsRouter.post(
	"/",
	lessonIdValidator,
	codeCardDataValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		const lessonId = req.params.lessonId;
		if (!objectId.isValid(lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.findOne({ _id: lessonId }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });

			const codeCard = {
				_id: objectId(),
				number: lesson.codeCards.length,
				question: req.body.question,
				parts: req.body.answer
			};

			Lessons.updateOne({ _id: lessonId }, { $push: { codeCards: codeCard } }, (err) => {
				return (err) ?
					res.status(500).json({ errors: err }) :
					res.status(201).json({ _id: codeCard._id.toString() });
			});
		});
	});

/**
 * Updates a specific codecard from a lesson by ID.
 * Returns updated codecard in form of an object.
 * 
 * @params lessonId - ObjectId
 * @params codeCardId - ObjectId
 * 
 * @body
 * number: Number
 * question: String
 * answer: [String]
 * 
 * @returns Object
 */
codeCardsRouter.put(
	"/:codeCardId",
	lessonIdValidator,
	codeCardIdValidator,
	codeCardDataValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });
		const errors = validationResult(req);

		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		const newCodeCard = {
			_id: req.params.codeCardId,
			question: req.body.question,
			parts: req.body.answer
		};

		Lessons.findOne({ _id: req.params.lessonId }, { codeCards: true }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });

			const codeCards = lesson.codeCards.map((element) => {
				if (element._id.toString() === newCodeCard._id) {
					newCodeCard.number = element.number;
					return newCodeCard;
				}
				return element;
			});

			Lessons.updateOne({ _id: req.params.lessonId }, { codeCards: codeCards }, (err) => {
				return (err) ?
					res.status(500).json({ errors: err }) :
					res.json(newCodeCard);
			});
		});
	});

/**
 * Deletes a codecard from a lesson by ID.
 * Only returns the status of the request.
 * 
 * @params lessonId - ObjectId
 * @params codeCardId - ObjectId
 * 
 * @returns Status 204: No content
 */
codeCardsRouter.delete(
	"/:codeCardId",
	lessonIdValidator,
	codeCardIdValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });
		const errors = validationResult(req);

		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.findOne({ _id: req.params.lessonId }, { codeCards: true }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });
			let amountDeleted = 0;
			const codeCards = lesson.codeCards.filter((element) => {
				if (element._id.toString() !== req.params.codeCardId) {
					return element;
				}
				amountDeleted++;
			});

			if (amountDeleted === 0) {
				return res.status(404).json({ errors: "NOTHING_DELETED" });
			}

			Lessons.updateOne({ _id: req.params.lessonId }, { codeCards }, (err) => {
				return (err) ?
					res.status(500).json({ errors: err }) :
					res.status(204).send();
			});
		});
	});

module.exports = codeCardsRouter;
