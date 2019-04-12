import isEmpty from "lodash/isEmpty";

export const validateInput = (data)=>{
	let errors = {};
	if (data.email === ""){
		errors.email = "Email is vereist";
	}
	if (data.password === ""){
		errors.password = "Wachtwoord is vereist";
	}
	return{
		errors,
		isValid: isEmpty(errors)
	};
};