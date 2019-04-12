export const getCodeCard = async (lessonId) => {
	const url = "http://localhost:4000/lessons/"+lessonId+"/codecards/student";
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status >300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}" `
		);
	}
	const json = await response.json();
	return json;
};

export const creatLessonResults = async (lessonId) => {
	const response = await fetch("http://localhost:4000/users/lessonresults/"+lessonId, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});
	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}" `
		);
	}
	const json = await response.json();
	return json;
};

export const sendAnswerBackend = async (lessonId,answer, currentQuestionIndex) => {
	const response = await fetch("http://localhost:4000/users/lessonresults/"+lessonId+"/answer", {
		method: "POST",
		body: JSON.stringify({answer, index: currentQuestionIndex - 1 }),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});
	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
};

export const getTheScore = async () => {
	const url = "http://localhost:4000/users/score";
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}""`
		);
	}
	const json = await response.json();
	return json;
};

export const getLesson = async (lessonId) => {
	const url = "http://localhost:4000/lessons/"+lessonId;
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
};

export const getLessonprogramScore = async (lessonId) => {
	const url = "http://localhost:4000/users/score/"+lessonId;
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
};

export const getEndLesson = async (lessonId) => {
	const url = "http://localhost:4000/users/lessonresults/" + lessonId + "/end";
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});

	if (response.status > 300) {
		throw new Error(
			`${response.status} : HTTP Request went wrong: got "${response.statusText}"`
		);
	}
	const json = await response.json();
	return json;
};