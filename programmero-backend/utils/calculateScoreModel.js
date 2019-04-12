module.exports.calculateScore = (answer, codeCard) => {
	let addedScore;
	let amountGood = 0;
	const flatScoreMultiplier = 20;
	let correct = false;

	for (let i = 0; i < answer.length; i++) {
		if (answer[i] === codeCard.parts[i]) amountGood++;
	}

	addedScore = amountGood * flatScoreMultiplier;

	if (codeCard.parts.length === amountGood) {
		addedScore = addedScore + 100;
		correct = true;
	}

	return { addedScore, correct };
};
