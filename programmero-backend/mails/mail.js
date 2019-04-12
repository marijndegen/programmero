"use strict";

const nodemailer = require("nodemailer");
const fs = require("fs");
var ejs = require("ejs");

module.exports.transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

module.exports.compose = (to, subject, templateName, replace) => {
	const template = fs.readFileSync("./mails/" + templateName + ".html", { encoding: "utf-8" });
	const html = ejs.render(template, replace);
	return {
		from: "<info@programmero.nl>",
		to,
		subject,
		html
	};
};