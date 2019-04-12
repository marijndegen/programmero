export async function questions(lessonId) {
	const url = "http://localhost:4000/lessons/" + lessonId + "/codecards";
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status !== 200) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}" for "${url}"`
		);
	}
	return await response.json();
}

export async function question(lessonId, questionId) {
	const url = "http://localhost:4000/lessons/"+ lessonId +"/codecards/" + questionId;
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status !== 200) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}" for "${url}"`
		);
	}
	return await response.json();
}

export async function deleteQuestion(lessonId, questionId) {
	let response = await fetch("http://localhost:4000/lessons/" + lessonId + "/codecards/" + questionId, {
		method: "Delete",
		body: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});
	if (response.status !== 204) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	let status = await response.status;
	return status;
}

export async function postQuestion(lessonId, question, answer) {
	const response = await fetch(
		"http://localhost:4000/lessons/" + lessonId + "/codecards",
		{
			method: "POST",
			body: JSON.stringify({ question, answer, number: 0 }),
			headers: {
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem("usertoken")
			},
			credentials: "include",
			mode: "cors"
		}
	);
	if (response.status > 300) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
}

export async function putQuestion(lessonId, codeCardId, question, answer) {
	const response = await fetch(
		"http://localhost:4000/lessons/" + lessonId + "/codecards/" + codeCardId,
		{
			method: "PUT",
			body: JSON.stringify({ question, answer, number: 0 }),
			headers: {
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem("usertoken")
			},
			credentials: "include",
			mode: "cors"
		}
	);
	if (response.status !== 200) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
}