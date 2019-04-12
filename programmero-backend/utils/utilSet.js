module.exports.getRandomString = () => {
	var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
	var randomString = "";

	for (var i = 0; i < 15; i++) {
		randomString += chars[Math.floor(Math.random() * chars.length)];
	}
	return randomString;
};

module.exports.getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));