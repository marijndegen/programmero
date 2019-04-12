/* eslint-disable no-console */
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const objectId = require("mongodb").ObjectID;
const mongoUtil = require("./utils/mongoUtil");

require("./models/Users");
require("./models/Lessons");

var lessonsModel = mongoose.model("Lessons");
var usersModel = mongoose.model("Users");

var PASSWORD = "test";
var SALT = 10;

var users;
var lessons;

/**
 * Seeds the database with standard records. Should be used on first startup.
 * WARNING: Deletes whole database and seeds it with basic data. This script should only be run on startup of project and testing.
 */
mongoose.set("useCreateIndex", true);

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true }, async () => {
	await mongoUtil.clearDB();
	await setData();

	await usersModel.insertMany(users);
	await lessonsModel.insertMany(lessons);

	console.info("Database seeded!");
	mongoose.connection.close();
});

const setData = async () => {
	let hashedPassword = await bcrypt.hash(PASSWORD, SALT);

	users = [
		{
			_id: objectId(),
			name: "Admin",
			email: "admin@admin.nl",
			password: hashedPassword,
			mailtoken: "",
			isAdmin: true
		},
		{
			_id: objectId(),
			name: "Student",
			email: "student@student.nl",
			password: hashedPassword,
			mailToken: "",
			isAdmin: false,
			score: 0,
			lessonResults: []
		}
	];

	lessons = [
		{
			_id: objectId(),
			name: "Demo Programma",
			description: "A very cool lesson",
			programmingLanguage: "Processing",
			codeCards: []
		},
		{
			_id: objectId(),
			name: "Demo Programma 2",
			description: "A very cool lesson",
			programmingLanguage: "Processing",
			codeCards: [
				{
					_id: objectId(),
					question: "Schrijf een for loop",
					number: 0,
					parts: [
						"for",
						"(int i=0;i<10;i++)",
						"{",
						"System.out.println",
						"(i)",
						"}"
					]
				},
				{
					_id: objectId(),
					question: "Schrijf een print",
					number: 1,
					parts: [
						"System.out.println",
						"(",
						"Hello console",
						")",
						";"
					]
				},
				{
					_id: objectId(),
					question: "Schrijf een if statement",
					number: 2,
					parts: [
						"int i",
						"= 80;",
						"if",
						"(i>50)",
						"{",
						"System.out.println",
						"(i)",
						"}"
					]
				}
			]
		}
	];
};