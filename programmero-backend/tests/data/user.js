const objectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");

const lesson = require("./lesson");
const utilSet = require("../../utils/utilSet");

const user = {
	_id: objectId(),
	name: "test",
	email: utilSet.getRandomString() + "@test.nl",
	password: "$2b$10$m6VURTskC1Pp6xcZjfuIQOmF8NgfnzncdROnVMvovXnP/n6ehCFJu",
	isAdmin: true,
	score: 75,
	lessonResults: [
		{
			answers: [],
			_id: objectId(),
			lessonId: lesson._id,
			score: 25,
			completed: false
		},
		{
			answers: [],
			_id: objectId(),
			lessonId: objectId(),
			score: 50,
			completed: true
		}
	]
};

const userToken = jwt.sign({
	_id: user._id,
	name: user.name,
	email: user.email,
	isAdmin: user.isAdmin,
	score: user.isAdmin
},
process.env.JWT_SECRET);

module.exports.data = user;
module.exports.token = userToken;
