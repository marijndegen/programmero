"use strict";

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
	_id: {
		type: objectId,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	question: {
		type: String,
		required: true
	},
	parts: {
		type: [String],
		required: true
	}
});
