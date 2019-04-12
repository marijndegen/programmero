/* eslint-disable no-console */

/**
 * Creates a user password for testing purposes. 
 * Put the created hashed password in the database for your user that you're going to test.
 * Execute with node.
 * Use "npm rebuild bcrypt --build-from-source" if it gives an error about a lazy symbol
 */

const bcrypt = require("bcryptjs");

const PASSWORD = "test";
const SALT = 10;

bcrypt.hash(PASSWORD, SALT, (err, hash) => console.log(hash));