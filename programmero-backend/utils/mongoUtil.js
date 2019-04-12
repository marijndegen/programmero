const mongoose = require("mongoose");

module.exports.clearDB = async () => {
	for (var i in mongoose.connection.collections) {
		await mongoose.connection.collections[i].deleteMany();
	}
};