"use strict";

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const Answer = require("./Answer");

module.exports = new mongoose.Schema({
	_id: {
		type: objectId,
		required: true
	},
	lessonId: {
		type: objectId,
		required: true
	},
	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	score: {
		type: Number,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	answers: [Answer]
});