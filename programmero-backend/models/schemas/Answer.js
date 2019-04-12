"use strict";

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
	_id: objectId,
	number: {
		type: Number,
		required: true
	},
	answer: {
		type: [String],
		required: true
	},
	correct: {
		type: Boolean,
		required: true
	},
	score: {
		type: Number,
		required: true
	}
});