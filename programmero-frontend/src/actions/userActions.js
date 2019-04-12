import { SET_USER, CREATE_USER, FILL_USER_PASSWORD, RESET_USER_REDUCER } from "./actionTypes";
import { createUser, fillUserPassword } from "../data/userData";

export const setUser = (isAdmin, email, name) => {
	return {
		type: SET_USER,
		isAdmin,
		name,
		email
	};
};

export const createUserAction = (email, name, isAdmin) => {
	return (dispatch) => {
		return createUser(email, name, isAdmin).then(statusCode => {
			dispatch({ type: CREATE_USER, statusCode: statusCode });
		}).then(() => {
			return Promise.resolve();
		});
	};
};

export const fillUserPasswordAction = (pass, passrepeat, mailToken) => {
	return (dispatch) => {
		return fillUserPassword(pass, passrepeat, mailToken).then(statusCode => {
			dispatch({ type: FILL_USER_PASSWORD, statusCode: statusCode });
		}).then(() => {
			return Promise.resolve();
		});
	};
};

export const resetUserReducer = () => {
	return { type: RESET_USER_REDUCER };
};