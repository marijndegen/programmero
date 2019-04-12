const sinon = require("sinon");
const mongoose = require("mongoose");

const authorization = require("../../routes/middleware/authorization");
const mongoUtil = require("../../utils/mongoUtil");
const utilSet = require("../../utils/utilSet");
const fakeUser = require("../data/user");
const fakeLesson = require("../data/lesson");
var fakeCodeCard = fakeLesson.codeCards[0];

const Lessons = mongoose.model("Lessons");

var agent;

var lessonId = fakeLesson._id.toString();
var codeCardId = fakeCodeCard._id.toString();

var randomUrlPart = utilSet.getRandomString();

var baseURL = "/lessons/" + lessonId + "/codecards";
var weirdBaseURL = "/lessons/" + randomUrlPart + "/codecards";
var emptyBaseURL = "/lessons//codecards";

var idURL = baseURL + "/" + codeCardId;
var weirdCodeCardIdURL = baseURL + "/" + randomUrlPart;

var weirdLessonIdURL = weirdBaseURL + "/" + codeCardId;

describe("Codecard router should", () => {

	beforeAll((done) => {
		const stub = sinon.stub(authorization, "ensureAuthenticated");

		stub.callsFake((req, res, next) => {
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

	describe("GET /lessons/:lessonId/codecards/student", () => {
		describe("fail with", () => {

			test("422 UNPROCCESSABLE ENITITY when wrong lessonId has been given", async (done) => {
				const response = await agent.get(weirdBaseURL + "/student");
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});

			test("404 NOT FOUND when there is no lesson", async (done) => {
				await mongoUtil.clearDB();
				const response = await agent.get(baseURL + "/student");

				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("LESSON_NOT_FOUND");
				done();
			});

			test("404 NOT FOUND when there are no codecards in the lesson lesson", async (done) => {
				await Lessons.updateOne({ _id: fakeLesson._id }, { codeCards: [] });
				const response = await agent.get(baseURL + "/student");

				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("NO_CODECARDS_IN_LESSON");
				done();
			});
		});

		describe("succeed with", () => {
			test("200 OK when right lessonId is given and student has a lessonResult", async (done) => {
				const response = await agent.get(baseURL + "/student");
				expect(response.statusCode).toBe(200);
				expect(response.body.question).toBe(fakeCodeCard.question);
				expect(response.body.amountQuestions).toBe(fakeLesson.codeCards.length);
				expect(response.body.indexCurrentQuestion).toBe(0);
				done();
			});
		});
	});

	describe("GET /lessons/:lessonId/codecards", () => {
		describe("succeed with", () => {
			test("200 OK when right lessonId has been given and lesson can be found", async (done) => {
				const response = await agent.get(baseURL);

				expect(response.statusCode).toBe(200);
				expect(response.body.length).toBe(1);
				expect(response.body[0]._id).toBe(fakeCodeCard._id.toString());
				expect(response.body[0].parts[0]).toBe(fakeCodeCard.parts[0]);
				expect(response.body[0].parts[1]).toBe(fakeCodeCard.parts[1]);
				expect(response.body[0].number).toBe(fakeCodeCard.number);
				expect(response.body[0].question).toBe(fakeCodeCard.question);
				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when no lessonId has been given", async (done) => {
				const response = await agent.get(emptyBaseURL);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.get(weirdBaseURL);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});
		});
	});

	describe("GET /lessons/:lessonId/codecards/:codeCardId", () => {
		describe("succeed with", () => {
			test("200 OK when right lessonId and codeCardId has been given and codecard can be found", async (done) => {
				const response = await agent.get(idURL);

				expect(response.statusCode).toBe(200);
				expect(response.body._id).toBe(fakeCodeCard._id.toString());
				expect(response.body.parts[0]).toBe(fakeCodeCard.parts[0]);
				expect(response.body.parts[1]).toBe(fakeCodeCard.parts[1]);
				expect(response.body.number).toBe(fakeCodeCard.number);
				expect(response.body.question).toBe(fakeCodeCard.question);
				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESSABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.get(weirdLessonIdURL);
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});

			test("404 NOT FOUND when weird codeCardId has been given", async (done) => {
				const response = await agent.get(weirdCodeCardIdURL);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("CODECARD_NOT_FOUND");
				done();
			});

			test("404 NOT FOUND no record of codecard is there", async (done) => {
				await Lessons.updateOne({ _id: fakeLesson._id }, { codeCards: [] });
				const response = await agent.get(weirdCodeCardIdURL);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("CODECARD_NOT_FOUND");
				done();
			});
		});
	});

	describe("POST /lessons/:lessonId/codecards", () => {
		describe("succeed with", () => {
			test("201 CREATED when correct codecard has been provided and has been added to the lesson", async (done) => {
				const codeCard = {
					question: "What is an automatic test?",
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(201);

				const postedCodeCard = await Lessons.findOne({ _id: lessonId }).then((lesson) => lesson.codeCards[1]);

				expect(postedCodeCard.question).toBe(codeCard.question);
				expect(postedCodeCard.parts.length).toBe(3);

				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when no question has been given", async (done) => {
				const codeCard = {
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when no answer has been given", async (done) => {
				const codeCard = {
					question: "What is an automatic test?"
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when question has wrong type", async (done) => {
				const codeCard = {
					question: 0,
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when answer has wrong type", async (done) => {
				const codeCard = {
					question: "What is an automatic test?",
					answer: 0
				};

				const response = await agent.post(baseURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});
		});
	});

	describe("PUT /lessons/:lessonId/codecards/codeCardId", () => {
		describe("succeed with", () => {
			test("200 OK when correct codecard has been provided and has been edited in the lesson", async (done) => {
				const codeCard = {
					question: "What is an automatic test?",
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(200);

				const postedCodeCard = await Lessons.findOne({ _id: lessonId }).then((lesson) => lesson.codeCards[0]);

				expect(postedCodeCard.question).toBe(codeCard.question);
				expect(postedCodeCard.parts.length).toBe(3);

				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when no question has been given", async (done) => {
				const codeCard = {
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when no answer has been given", async (done) => {
				const codeCard = {
					question: "What is an automatic test?"
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when question has wrong type", async (done) => {
				const codeCard = {
					question: 0,
					answer: ["this", "is an", "automatic test"]
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});

			test("422 UNPROCCESABLE ENTITY when answer has wrong type", async (done) => {
				const codeCard = {
					question: "What is an automatic test?",
					answer: 0
				};

				const response = await agent.put(idURL)
					.set("Accept", "application/json")
					.send(codeCard);

				expect(response.statusCode).toBe(422);
				done();
			});
		});
	});

	describe("DELETE /lessons/:lessonId/codecards/:codeCardId", () => {
		describe("succeed with", () => {
			test("204 NO CONTENT when a codecard is deleted", async (done) => {
				const response = await agent.delete(idURL);
				expect(response.statusCode).toBe(204);

				const deletedCodeCard = await Lessons.findOne({ _id: fakeLesson._id }).then((lesson) => lesson.codeCards[0]);
				expect(deletedCodeCard).toBe(undefined);
				done();
			});
		});

		describe("fail with", () => {
			test("422 UNPROCCESABLE ENTITY when weird lessonId has been given", async (done) => {
				const response = await agent.delete(weirdLessonIdURL);
				expect(response.statusCode).toBe(422);
				expect(response.body.errors).toBe("OBJECTID_NOT_VALID");
				done();
			});

			test("404 NOT FOUND when weird codeCardId has been given", async (done) => {
				const response = await agent.delete(weirdCodeCardIdURL);
				expect(response.statusCode).toBe(404);
				expect(response.body.errors).toBe("NOTHING_DELETED");
				done();
			});
		});
	});
});
