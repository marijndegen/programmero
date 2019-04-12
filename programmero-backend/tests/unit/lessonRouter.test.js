const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");
const mongoUtil = require("../../utils/mongoUtil");
const utilSet = require("../../utils/utilSet");
const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");

const Lessons = mongoose.model("Lessons");

var agent;

var randomUrlPart = utilSet.getRandomString();

var baseURL = "/lessons";

var idURL = baseURL + "/" + fakeLesson._id.toString();
var weirdIdURL = baseURL + "/" + randomUrlPart;

describe("Lesson router should", () => {

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

	describe("GET /lessons", () => {
		describe("succeed with", () => {
			test("200 OK lessons can be found", async (done) => {
				const response = await agent.get(baseURL);

				expect(response.statusCode).toBe(200);
				expect(response.body.length).toBe(1);
				expect(response.body[0]._id).toBe(fakeLesson._id.toString());
				expect(response.body[0].name).toBe(fakeLesson.name);
				expect(response.body[0].description).toBe(fakeLesson.description);
				expect(response.body[0].programmingLanguage).toBe(fakeLesson.programmingLanguage);
				done();
			});
		});
	});

	describe("GET /lessons/:lessonId", () => {
		describe("succeed with", () => {
			test("200 OK a lesson can be found", async (done) => {
				const response = await agent.get(idURL);

				expect(response.statusCode).toBe(200);
				expect(response.body._id).toBe(fakeLesson._id.toString());
				expect(response.body.name).toBe(fakeLesson.name);
				expect(response.body.description).toBe(fakeLesson.description);
				expect(response.body.programmingLanguage).toBe(fakeLesson.programmingLanguage);
				done();
			});
		});

		describe("fail with", () => {
			test("404 NOT FOUND if no lesson can be found because database is empty", async (done) => {
				await mongoUtil.clearDB();
				const response = await agent.get(idURL);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("LESSONS_NOT_FOUND");
				done();
			});

			test("422 UNPROCCESABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.get(weirdIdURL);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});
		});
	});

	describe("POST /lessons", () => {
		describe("succeed with", () => {
			test("201 CREATED  a full new lesson has been created", async (done) => {
				const lesson = {
					name: "POST test",
					description: "This is a test where we send a POST request to the server",
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(201);

				const postedLesson = await Lessons.findOne({ _id: response.body._id }).then((lesson) => lesson);

				expect(postedLesson.name).toBe(lesson.name);
				expect(postedLesson.description).toBe(lesson.description);
				expect(postedLesson.programmingLanguage).toBe(lesson.programmingLanguage);
				done();
			});

			test("201 CREATED  a new lesson without description has been created", async (done) => {
				const lesson = {
					name: "POST test",
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(201);

				const postedLesson = await Lessons.findOne({ _id: response.body._id }).then((lesson) => lesson);

				expect(postedLesson.name).toBe(lesson.name);
				expect(postedLesson.description).toBe(undefined);
				expect(postedLesson.programmingLanguage).toBe(lesson.programmingLanguage);
				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when no programming language has been given", async (done) => {
				const lesson = {
					name: "POST test"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when no name has been given", async (done) => {
				const lesson = {
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when name has wrong type", async (done) => {
				const lesson = {
					name: 0,
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when programming language has wrong type", async (done) => {
				const lesson = {
					name: "POST test",
					programmingLanguage: 0
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});
		});
	});

	describe("PUT /lessons/:lessonId", () => {
		describe("succeed with", () => {
			test("200 OK a full lesson is edited", async (done) => {
				const lesson = {
					name: "PUT test",
					description: "This is a test where we send a PUT request to the server",
					programmingLanguage: "PutTestLanguage"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(200);

				expect(response.body._id).toBe(fakeLesson._id.toString());
				expect(response.body.name).toBe(lesson.name);
				expect(response.body.description).toBe(lesson.description);
				expect(response.body.programmingLanguage).toBe(lesson.programmingLanguage);

				const updatedLesson = await Lessons.findOne({ _id: fakeLesson._id }).then((lesson) => lesson);

				expect(updatedLesson._id.toString()).toBe(fakeLesson._id.toString());
				expect(updatedLesson.name).toBe(lesson.name);
				expect(updatedLesson.description).toBe(lesson.description);
				expect(updatedLesson.programmingLanguage).toBe(lesson.programmingLanguage);
				done();
			});

			test("200 OK a lesson without description is edited", async (done) => {
				const lesson = {
					name: "PUT test",
					programmingLanguage: "PutTestLanguage"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(200);

				expect(response.body._id).toBe(fakeLesson._id.toString());
				expect(response.body.name).toBe(lesson.name);
				expect(response.body.programmingLanguage).toBe(lesson.programmingLanguage);

				const updatedLesson = await Lessons.findOne({ _id: fakeLesson._id }).then((lesson) => lesson);

				expect(updatedLesson._id.toString()).toBe(fakeLesson._id.toString());
				expect(updatedLesson.name).toBe(lesson.name);
				expect(updatedLesson.programmingLanguage).toBe(lesson.programmingLanguage);
				done();
			});
		});


		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when weird lessonId has been given", async (done) => {
				const lesson = {
					name: "PUT test",
					description: "This is a test where we send a PUT request to the server",
					programmingLanguage: "PutTestLanguage"
				};

				const response = await agent.put(weirdIdURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});

			test("422 UNPROCCESABLE ENTITY when no programming language has been given", async (done) => {
				const lesson = {
					name: "POST test"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when no name has been given", async (done) => {
				const lesson = {
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when name has wrong type", async (done) => {
				const lesson = {
					name: 0,
					programmingLanguage: "PostTestLanguage"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when programming language has wrong type", async (done) => {
				const lesson = {
					name: "POST test",
					programmingLanguage: 0
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(lesson);

				expect(response.statusCode).toBe(422);
				done();
			});
		});
	});

	describe("DELETE /lessons/:lessonId", () => {
		describe("succeed with", () => {
			test("204 NO CONTENT a lesson is deleted", async (done) => {
				const response = await agent.delete(idURL);
				expect(response.statusCode).toBe(204);

				const deletedLesson = await Lessons.findOne({ _id: fakeLesson._id }).then((lesson) => lesson);
				expect(deletedLesson).toBe(null);
				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.delete(weirdIdURL);
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});
		});
	});
});