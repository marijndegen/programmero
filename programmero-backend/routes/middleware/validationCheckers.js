const { check } = require("express-validator/check");

module.exports.registerDataValidator = [
	check("name")
		.isString().withMessage("name needs to be a string")
		.not().isEmpty().withMessage("name cannot be empty"),
	check("email")
		.isEmail().withMessage("email needs to be an email")
		.not().isEmpty().withMessage("email cannot be empty"),
	check("isAdmin")
		.isBoolean().withMessage("isAdmin needs to be a boolean")
		.not().isEmpty().withMessage("isAdmin cannot be empty")
];

module.exports.passwordRegisterValidator = [
	check("mailToken")
		.isString().withMessage("mailToken has to be a string")
		.not().isEmpty().withMessage("mailToken cannot be empty"),
	check("pass")
		.isString().withMessage("pass has to be a string")
		.not().isEmpty().withMessage("pass cannot be empty"),
	check("passrepeat")
		.isString().withMessage("pass has to be a string")
		.not().isEmpty().withMessage("pass cannot be empty")
];

module.exports.loginDataValidator = [
	check("email")
		.exists().withMessage("login needs an email")
		.not().isEmpty().withMessage("email cannot be empty")
		.isEmail(),
	check("password")
		.exists().withMessage("login needs a password")
		.not().isEmpty().withMessage("password cannot be empty")
];

module.exports.lessonDataValidator = [
	check("name")
		.isString().withMessage("name needs to be a string")
		.not().isEmpty().withMessage("name cannot be empty"),
	check("description")
		.optional({ nullable: true, checkFalsy: true })
		.isString().withMessage("description needs to be a string")
		.isLength({ min: 4, max: 100 }).withMessage("description needs to a minimal of 4 and a maximal of 100 characters"),
	check("programmingLanguage")
		.isString().withMessage("programmingLanguage needs to be a string")
		.not().isEmpty().withMessage("programmingLanguage cannot be empty")
];

module.exports.codeCardDataValidator = [
	check("question")
		.exists().withMessage("codecard needs a question")
		.isString().withMessage("question needs to be a string")
		.not().isEmpty().withMessage("question cannot be empty"),
	check("answer")
		.exists().withMessage("codecard needs a answer")
		.isArray().withMessage("needs to be an array")
];

module.exports.answerDataValidator = [
	check("answer")
		.exists().withMessage("lessonresult needs a answer")
		.isArray().withMessage("answer needs to be an array")
		.not().isEmpty().withMessage("answer cannot be empty"),
	check("index")
		.exists().withMessage("endpoint needs an index")
		.isNumeric().withMessage("index has to be numeric")
];

module.exports.lessonIdValidator = [
	check("lessonId")
		.isString().withMessage("lessonId has to be a string")
		.not().isEmpty().withMessage("lessonId cannot be empty")
];

module.exports.codeCardIdValidator = [
	check("codeCardId")
		.isString().withMessage("codeCardId has to be a string")
		.not().isEmpty().withMessage("codeCardId cannot be empty")
];