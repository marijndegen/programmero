"use strict";

const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const LessonResult = require("./schemas/LessonResult");

const usersSchema = new mongoose.Schema({
	_id: {
		type: objectId,
		required: true
	},
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	mailToken: String,
	isAdmin: {
		type: Boolean,
		required: true
	},
	score: Number,
	lessonResults: [LessonResult]

}, { collection: "users" });

usersSchema.methods.getUser = async function (id) {
	return id;
};

mongoose.model("Users", usersSchema);