"use strict";
const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");

const Lessons = mongoose.model("Lessons");
const Users = mongoose.model("Users");
const objectId = require("mongodb").ObjectID;

const { lessonIdValidator, answerDataValidator } = require("../middleware/validationCheckers");
const calculateScoreModel = require("../../utils/calculateScoreModel");

const lessonResultsRouter = express.Router({ mergeParams: true });

/**
 * Creates a new lessonresult for a user by a given lessonId.
 * Returns the ObjectId of newly created lessonresult.
 * 
 * @params
 * lessonId - String
 *  
 * @returns Object
 */
lessonResultsRouter.post(
	"/:lessonId",
	lessonIdValidator,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		const lessonId = req.params.lessonId;
		let lessonResult;

		const lessonResults = req.user.lessonResults.filter((element) => element.lessonId.toString() === lessonId);

		if (lessonResults.length > 0) {
			for (let i = 0; i < lessonResults.length; i++) {
				if (!lessonResults[i].completed) return res.status(201).json({ _id: lessonResults[i]._id.toString() });
			}
		}

		lessonResult = {
			_id: objectId(),
			lessonId: lessonId,
			score: 0,
			completed: false,
			answers: []
		};

		Lessons.findOne({ _id: lessonId }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSON_NOT_FOUND" });

			Users.updateOne({ _id: req.user._id }, { $push: { lessonResults: lessonResult } }, (err) => {
				return (err) ?
					res.status(500).json({ errors: err }) :
					res.status(201).json({ _id: lessonResult._id.toString() });
			});
		});
	});

/**
 * Adds an answer to a lessonresult from a user.
 * Returns an object containing information if the card is correct.
 * 
 * @params
 * lessonId - String
 * 
 * @body Object
 * answer - [String]
 * index: Number
 * 
 * @returns Object
 * correct - Boolean
 * correctAnswer - [String]
 * newScore - Number
 * addedScore - Number
 */

lessonResultsRouter.post(
	"/:lessonId/answer",
	lessonIdValidator,
	answerDataValidator,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		const lessonId = req.params.lessonId;

		if (req.user.lessonResults.length <= 0) res.status(404).json({ errors: "NO_LESSONRESULTS" });

		const lessonResult = req.user.lessonResults.filter((element) => element.lessonId.toString() === lessonId && !element.completed)[0];

		if (!lessonResult) return res.status(404).json({ errors: "NO_LESSONRESULT_FOR_LESSON" });

		Lessons.findOne({ _id: lessonId }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return status(404).json({ errors: "LESSON_NOT_FOUND" });

			const codeCard = lesson.codeCards[req.body.index];
			const result = calculateScoreModel.calculateScore(req.body.answer, codeCard);

			let newScore;

			const newAnswer = {
				_id: objectId(),
				number: req.body.index,
				answer: req.body.answer,
				correct: result.correct,
				score: result.addedScore
			};

			lessonResult.answers.push(newAnswer);
			newScore = lessonResult.score + result.addedScore;
			lessonResult.score = newScore;

			if (lesson.codeCards.length === lessonResult.answers.length) lessonResult.completed = true;


			Users.updateOne({ _id: req.user._id }, { $inc: { score: result.addedScore }, lessonResults: req.user.lessonResults }, (err) => {
				if (err) return res.status(500).json({ errors: err });

				const response = {
					correct: result.correct,
					correctAnswer: codeCard.parts,
					newScore: newScore,
					addedScore: result.addedScore
				};

				return res.json(response);
			});
		});
	});

/**
 * Gets lessonresult from last result that user made in a lesson based on given ID
 * 
 * @params
 * lessonId: String
 * 
 * @returns Object
 */

lessonResultsRouter.get("/:lessonId/end", lessonIdValidator, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
	if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

	const lessonId = req.params.lessonId;

	if (req.user.lessonResults.length <= 0) res.status(404).json({ errors: "NO_LESSONRESULTS" });

	const lessonResult = req.user.lessonResults.filter((element) => element.lessonId.toString() === lessonId && element.completed)[req.user.lessonResults.length - 1];

	if (!lessonResult) res.status(404).json({ errors: "NO_LESSONRESULT_FOR_SESSION" });

	Lessons.findOne({ _id: lessonId }, (err, lesson) => {
		if (err) res.status(500).json({ errors: err });
		if (!lesson) res.status(404).json({ errors: "LESSON_NOT_FOUND" });

		let amountCorrect = 0;
		lessonResult.answers.forEach((answer) => {
			if (answer.correct) amountCorrect++;
		});

		const response = {
			lessonName: lesson.name,
			score: lessonResult.score,
			amountQuestions: lesson.codeCards.length,
			amountCorrect
		};

		return res.json(response);
	});
});

module.exports = lessonResultsRouter;