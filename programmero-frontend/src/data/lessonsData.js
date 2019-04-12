
/*
Async action creators
*/

export const getLessons = async () => {
	const url = "http://localhost:4000/lessons/";
	const response = await fetch(url, {
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status > 300) {
		throw new Error(`HTTP Request went wrong: got "${response.statusText}" for "${url}"`);
	}
	const json = await response.json();
	return json;
};

export const createLesson = async (lesson) => {
	const response = await fetch("http://localhost:4000/lessons/", {
		method: "POST",
		body: JSON.stringify(lesson),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});
	if (response.status >300) {
		throw new Error(`${response.status}: HTTP Request ging verkeerd, verkregen ${response.statusText}`);
	}
	return response;
};



export const updateLesson = async (lessonId, lesson ) => {
	const response = await fetch("http://localhost:4000/lessons/"+ lessonId, {
		method: "Put",
		body: JSON.stringify(lesson),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});
	if (response.status >300) {
		throw new Error(`${response.status}: HTTP Request ging verkeerd, verkregen ${response.statusText}`);
	}
	return response.status;
};

export const deleteLesson = async (lessonId) => {
	const response = await fetch("http://localhost:4000/lessons/" + lessonId, {
		method: "DELETE",
		credentials: "include",
		mode: "cors",
		headers: {
			"Authorization": localStorage.getItem("usertoken")
		}
	});
	if (response.status >300) {
		throw new Error(`${response.status}: HTTP Request ging verkeerd, verkregen ${response.statusText}`);
	}
	return response.status;
};