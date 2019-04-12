const mongoose = require("mongoose");
require("dotenv").config();

const mongoUtil = require("../utils/mongoUtil");

require("../models/Users");
require("../models/Lessons");

beforeAll((done) => {
	if (mongoose.connection.readyState === 0) {
		mongoose.connect(`mongodb://${process.env.DB_HOST_TEST_SUITE}:${process.env.DB_PORT_TEST_SUITE}/${process.env.DB_NAME_TEST_SUITE}`,
			{ useNewUrlParser: true },
			(err) => {
				if (err) throw Error(err);
				done();
			});
		mongoose.set("useCreateIndex", true);
	}
});

afterEach(async (done) => {
	await mongoUtil.clearDB();
	done();
});

afterAll((done) => {
	mongoose.disconnect(() => done());
});
