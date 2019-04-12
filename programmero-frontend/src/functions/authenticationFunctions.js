export async function login(user) {
	let sendingBody = JSON.stringify({
		email: user.email,
		password: user.password
	});
	const url = "http://localhost:4000/auth/login";
	const response =  await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: sendingBody
	});
	const json = await response.json();
	if (response.status !== 200) {
		throw new Error(json.code);
	}
	return json;
}
