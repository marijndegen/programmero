"use strict";

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const CodeCard = require("./schemas/CodeCard");

const lessonSchema = new mongoose.Schema({
	_id: {
		type: objectId,
		required: true
	},
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: String,
	programmingLanguage: {
		type: String,
		required: true
	},
	codeCards: [CodeCard]

}, { collection: "lessons" });

lessonSchema.methods.getLesson = async function (id) {
	return id;
};

mongoose.model("Lessons", lessonSchema);