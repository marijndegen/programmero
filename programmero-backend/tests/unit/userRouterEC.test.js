const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");

const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");

const Lessons = mongoose.model("Lessons");
var lessonId = fakeLesson._id.toString();

var agent;

var baseURL = "/users/";

describe("User router edge case", () => {
	beforeAll((done) => {
		const stub = sinon.stub(authorization, "ensureAuthenticated");

		stub.onCall(0).callsFake((req, res, next) => {
			req.user = fakeUser.data;
			req.user.lessonResults = [];
			return next();
		});

		agent = require("supertest").agent(require("../../app"));
		done();
	});

	beforeEach(async (done) => {
		const lessonsModel = new Lessons(fakeLesson);
		await lessonsModel.save();
		done();
	});

	describe("GET /users/score/:lessonId", () => {
		describe("fails with", () => {
			test("404 NOT FOUND when there is no lessonresult to be found to show score of", async (done) => {
				const response = await agent.get(baseURL + "/score/" + lessonId);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("LESSONRESULT_NOT_FOUND");
				done();
			});
		});
	});
});