const objectId = require("mongodb").ObjectID;
const utilSet = require("../../utils/utilSet");

const name = utilSet.getRandomString();

const codeCards = [
	{
		_id: objectId(),
		number: 0,
		question: "Test question",
		parts: ["TestPart1", "TestPart2"]
	}
];

module.exports = {
	_id: objectId(),
	name,
	description: "Test lesson for automated testing",
	programmingLanguage: "TestLanguage",
	codeCards
};