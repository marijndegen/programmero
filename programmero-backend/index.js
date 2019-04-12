/* eslint-disable no-console */
"use strict";

require("dotenv").config();

require("./models/Users");
require("./models/Lessons");

const mongoose = require("mongoose");
const app = require("./app");

/**
 * Starts an Express server on given IP and port
 * Starts a MongoDB instance on given IP, port and database name
**/
const server = app.listen(process.env.APP_PORT, async () => {
	mongoose.set("useCreateIndex", true);
	await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });

	console.info("MongoDB started.");
	console.info(`Server started on port ${server.address().port}`);
});