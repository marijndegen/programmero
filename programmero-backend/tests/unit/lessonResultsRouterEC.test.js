const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");
const mongoUtil = require("../../utils/mongoUtil");

const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");

const Lessons = mongoose.model("Lessons");
var lessonId = fakeLesson._id.toString();

var agent;

var baseURL = "/users/lessonresults/" + lessonId;

describe("lessonResult router edge case", () => {
	beforeAll((done) => {
		const stub = sinon.stub(authorization, "ensureAuthenticated");

		stub.callsFake((req, res, next) => {
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

	describe("POST /users/lessonresults/:lessonId", () => {
		describe("and succeed with", () => {
			test("201 CREATED when no lessonresult is found by user, search for right one", async (done) => {
				const response = await agent.post(baseURL);
				expect(response.statusCode).toBe(201);
				done();
			});
		});

		describe("and fail with", () => {
			test("404 NOT FOUND  when no lesson can be found with the idea when no lessonresult is found by user", async (done) => {
				await mongoUtil.clearDB();
				const response = await agent.post(baseURL);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("LESSON_NOT_FOUND");
				done();
			});
		});
	});

	describe("POST /users/lessonresults/:lessonId/answer", () => {
		describe("and fail with", () => {
			test("404 NOT FOUND when there is no lessonresult", async (done) => {
				const request = {
					answer: ["TestPart1", "TestPart2"],
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("NO_LESSONRESULTS");
				done();
			});
		});
	});
});