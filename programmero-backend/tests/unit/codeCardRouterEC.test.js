const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");

const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");

const Lessons = mongoose.model("Lessons");
var lessonId = fakeLesson._id.toString();

var agent;

var baseURL = "/lessons/" + lessonId + "/codecards";

describe("Codecard router edge case", () => {
	beforeAll((done) => {
		const stub = sinon.stub(authorization, "ensureAuthenticated");

		// 409 CONFLICT when there is a wrong index on the codecard
		stub.onFirstCall().callsFake((req, res, next) => {
			req.user = fakeUser.data;
			req.user.lessonResults[0].answers = [1, 2, 3, 4, 5];
			return next();
		});

		// 404 NOT FOUND when there is no lessonResults with given lessonId created for the user
		stub.onSecondCall().callsFake((req, res, next) => {
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

	describe("GET /lessons/:lessonId/codecards/student", () => {
		describe("fails with", () => {
			test("409 CONFLICT when there is a wrong index on the codecard", async (done) => {
				const response = await agent.get(baseURL + "/student");
				expect(response.statusCode).toBe(409);
				expect(response.body.errors).toBe("CODECARD_WRONG_INDEX");
				done();
			});

			test("404 NOT FOUND when there is no lessonResults with given lessonId created for the user", async (done) => {
				const response = await agent.get(baseURL + "/student");
				expect(response.statusCode).toBe(404);
				done();
			});
		});
	});
});