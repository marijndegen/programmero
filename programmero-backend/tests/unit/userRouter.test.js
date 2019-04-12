const sinon = require("sinon");

const utilSet = require("../../utils/utilSet");

const authorization = require("../../routes/middleware/authorization");
const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");
const lessonId = fakeLesson._id.toString();

var agent;

var baseURL = "/users";

describe("User router should", () => {
	beforeAll((done) => {
		sinon.stub(authorization, "ensureAuthenticated")
			.callsFake((req, res, next) => {
				req.user = fakeUser.data;
				return next();
			});

		agent = require("supertest").agent(require("../../app"));

		done();
	});

	describe("GET /users/score", () => {
		describe("and succeed with", () => {
			test("200 OK when user score can be found", async (done) => {
				const response = await agent.get(baseURL + "/score");
				expect(response.statusCode).toBe(200);
				expect(response.body).toBe(fakeUser.data.score);
				done();
			});
		});
	});

	describe("GET /users/score/:lessonId", () => {
		describe("and succeed with", () => {
			test("200 OK when user has lessonresult to get score of", async (done) => {
				const response = await agent.get(baseURL + "/score/" + lessonId);
				expect(response.statusCode).toBe(200);
				expect(response.body).toBe(fakeUser.data.lessonResults[0].score);
				done();
			});
		});

		describe("and fail with", () => {
			test("422 UNPROCCESSABLE ENTITY when lessonId is incorrect", async (done) => {
				const response = await agent.get(baseURL + "/score/" + utilSet.getRandomString());
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});
		});
	});
});