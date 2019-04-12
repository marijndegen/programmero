const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");
const mongoUtil = require("../../utils/mongoUtil");
const utilSet = require("../../utils/utilSet");
const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");

const lessonId = fakeLesson._id.toString();

const Lessons = mongoose.model("Lessons");

var agent;

var baseURL = "/users/lessonresults/" + lessonId;
var weirdBaseURL = "/users/lessonresults/" + utilSet.getRandomString();

describe("LessonResult router should", () => {
	beforeAll((done) => {
		sinon.stub(authorization, "ensureAuthenticated")
			.callsFake((req, res, next) => {
				req.user = fakeUser.data;
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
			test("201 CREATED when endpoint can find current lessonresult", async (done) => {
				const response = await agent.post(baseURL);
				expect(response.statusCode).toBe(201);
				expect(response.body._id).toBe(fakeUser.data.lessonResults[0]._id.toString());
				done();
			});
		});

		describe("and fail with", () => {
			test("422 UNPROCCESSABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.post(weirdBaseURL);
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});
		});
	});

	describe("POST /users/lessonresults/:lessonId/answer", () => {
		describe("and succeed with", () => {
			test("200 OK when answer is fully correct", async (done) => {
				const request = {
					answer: ["TestPart1", "TestPart2"],
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(200);
				done();
			});
		});

		describe("and fail with", () => {
			test("404 NOT FOUND  when no lessonresult can be found because all lessonresults on lessonID are already completed", async (done) => {
				await mongoUtil.clearDB();
				const request = {
					answer: ["TestPart1", "TestPart2"],
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("NO_LESSONRESULT_FOR_LESSON");
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when weird lessonId has been given", async (done) => {
				const request = {
					answer: ["TestPart1", "TestPart2"],
					index: 0
				};
				const response = await agent.post(weirdBaseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when no answer has been given", async (done) => {
				const request = {
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when no index has been given", async (done) => {
				const request = {
					answer: []
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when empty answer has been given", async (done) => {
				const request = {
					answer: [],
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when answer is not a array", async (done) => {
				const request = {
					answer: 0,
					index: 0
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESSABLE ENTITY when index is not a number", async (done) => {
				const request = {
					answer: ["TestPart1", "TestPart2"],
					index: ""
				};
				const response = await agent.post(baseURL + "/answer").send(request);
				expect(response.statusCode).toBe(422);
				done();
			});
		});
	});
});