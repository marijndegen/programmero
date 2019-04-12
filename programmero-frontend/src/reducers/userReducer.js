import { CREATE_USER, FILL_USER_PASSWORD, RESET_USER_REDUCER } from "../actions/actionTypes";

const initialState = {
	userSubmittedSuccesfull: 0,
	passwordChangedSuccessfull: 0
};

let newState;

export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_USER:
			if (action.statusCode !== 201) return newState = { ...state, userSubmittedUnSuccesfull: action.statusCode };
			newState = { ...state, userSubmittedSuccesfull: action.statusCode };
			return newState;
		case FILL_USER_PASSWORD:
			if (action.statusCode !== 200) return newState = { ...state, passwordChangedUnSuccessfull: action.statusCode };
			newState = { ...state, passwordChangedSuccessfull: action.statusCode };
			return newState;
		case RESET_USER_REDUCER:
			newState = { ...initialState };
			return newState;
		default:
			return state;
	}
}