"use strict";

const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");
const { lessonDataValidator, lessonIdValidator } = require("./middleware/validationCheckers");

const lessonsRouter = express.Router();
const codecardsRouter = require("./nested/codeCards");

const Lessons = mongoose.model("Lessons");
const objectId = require("mongodb").ObjectID;

lessonsRouter.use("/:lessonId/codecards", codecardsRouter);

//All return formats are in JSON.

/**
 * Gets all lessons.
 * Returns an array of all lessons.
 * 
 * @returns Array
 */
lessonsRouter.get("/", (req, res) => {
	Lessons.find({}, { codeCards: false }, (err, allLessons) => {
		if (err) return res.status(500).json({ errors: err });

		return res.json(allLessons);
	});
});

/**
 * Gets a specific lesson by ID.
 * Returns a full lesson object.
 * 
 * @params lessonId - ObjectId
 *
 * @returns Object
 */
lessonsRouter.get(
	"/:lessonId",
	lessonIdValidator,
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.findOne({ _id: req.params.lessonId }, { codeCards: false }, (err, lesson) => {
			if (err) return res.status(500).json({ errors: err });
			if (!lesson) return res.status(404).json({ errors: "LESSONS_NOT_FOUND" });

			return res.json(lesson);
		});
	});

/**
 * Creates a new resource for a lesson that can hold multiple codecards.
 * Returns the ObjectId of newly created lesson.
 * 
 * @body
 * name: String
 * description: String
 * programmingLanguage: String
 * 
 * @returns String
 */
lessonsRouter.post(
	"/",
	lessonDataValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) 	return res.status(422).json({ errors: errors.array() });

		const lesson = new Lessons({
			_id: objectId(),
			name: req.body.name,
			description: req.body.description,
			programmingLanguage: req.body.programmingLanguage
		});

		lesson.save((err) => {
			return (err) ?
				res.status(500).json({ errors: err }) :
				res.status(201).json({ _id: lesson._id });
		});
	});

/**
 * Updates a lesson by ID.
 * Returns updated lesson in form of an object.
 * 
 * @params lessonId - ObjectId
 * 
 * @body
 * name: String
 * description: String
 * programmingLanguage: String
 * 
 * @returns Object
 */
lessonsRouter.put(
	"/:lessonId",
	lessonIdValidator,
	lessonDataValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		const newLesson = {
			_id: req.params.lessonId,
			name: req.body.name,
			description: req.body.description,
			programmingLanguage: req.body.programmingLanguage
		};

		Lessons.updateOne({ _id: newLesson._id }, newLesson, (err) => {
			return (err) ?
				res.status(500).json({ errors: err }) :
				res.json(newLesson);
		});
	});

/**
 * Deletes a lesson by ID.
 * Only returns the status of the request.
 * 
 * @params lessonId - ObjectId
 * 
 * @returns Status 204: No content
 */
lessonsRouter.delete(
	"/:lessonId",
	lessonIdValidator,
	(req, res) => {
		if (!req.user.isAdmin) return res.status(401).json({ errors: "NO_PERMISSION" });

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		if (!objectId.isValid(req.params.lessonId)) return res.status(422).json({ errors: "OBJECTID_NOT_VALID" });

		Lessons.deleteOne({ _id: req.params.lessonId }, (err) => {
			return (err) ?
				res.status(500).json({ errors: err }) :
				res.status(204).send();
		});
	});

module.exports = lessonsRouter;