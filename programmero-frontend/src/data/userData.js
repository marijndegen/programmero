export async function createUser(email, name, isAdmin) {
	const response = await fetch("http://localhost:4000/users/", {
		method: "POST",
		body: JSON.stringify({ email, name, isAdmin }),
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("usertoken")
		},
		credentials: "include",
		mode: "cors"
	});

	isAuthorised(response);

	return await response.status;
}

export async function checkTheMailToken(mailToken){
	const response = await fetch("http://localhost:4000/auth/"+mailToken+"/check");
	const status = await response.json();
	return status  === "USER_FOUND";
}

export async function fillUserPassword(pass, passrepeat, mailToken) {
	const response = await fetch("http://localhost:4000/auth/secret", {
		method: "POST",
		body: JSON.stringify({ pass, passrepeat, mailToken }),
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
		mode: "cors"
	});

	isAuthorised(response);

	return await response.status;
}

function isAuthorised(response){
	if (response.status === 401) {
		throw new Error(
			`HTTP Request went wrong: got "${response.statusText}"`
		);
	}
}