import { SET_USER } from "../actions/actionTypes";
const initialState = {
	isLoggedIn: false,
	name: "",
	email: "",
	isAdmin: ""
};
let newState;

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			newState = { ...state };
			newState.isAdmin = action.isAdmin;
			newState.email = action.email;
			newState.name = action.name;
			newState.isLoggedIn = true;
			return newState;
		default:
			return state;
	}
}
