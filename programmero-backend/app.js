
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const lessonsRouter = require("./routes/lessons");
const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");

const authentication = require("./routes/middleware/authorization");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

// Open routes without authentication
app.use("/auth", authenticationRouter);

//Middleware
app.use(authentication.ensureAuthenticated);

//Authenticated routes
app.use("/lessons", lessonsRouter);
app.use("/users", usersRouter);

module.exports = app;