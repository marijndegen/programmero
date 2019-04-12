import {
	ADD_QUESTION,
	ADD_ANSWER,
	EDIT_ANSWER,
	DELETE_ANSWER,
	REFRESH_THE_REDUCER,
	QUESTION_IN_EDITING,
	ERROR,
	GET_SPECIFIC_QUESTION
} from "../actions/actionTypes";
const initialState = {
	answers: [],
	question: "",
	inEditing: "",
	error: null
};

let newState, newAnswers;

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_QUESTION:
			newState = { ...state };
			newState.error = null;
			newState.question = action.question;
			return newState;
		case ADD_ANSWER:
			newAnswers = [...state.answers];
			if (action.id === "") {
				newAnswers.push(action.answer);
			} else {
				newAnswers[action.id] = action.answer;
			}
			newState = { ...state, answers: newAnswers, inEditing: "" };
			newState.error = null;
			return newState;
		case EDIT_ANSWER:
			newState = { ...state, inEditing: action.answerId };
			newState.error = null;
			return newState;
		case DELETE_ANSWER:
			newAnswers = [...state.answers];
			newAnswers.splice(action.id, 1);
			newState = { ...state, answers: newAnswers, inEditing: "" };
			newState.error = null;
			return newState;
		case REFRESH_THE_REDUCER:
			newState = {...state};
			newState.answers = [];
			newState.inEditing = "";
			newState.question = "";
			newState.error = null;
			return newState;
		case QUESTION_IN_EDITING:
			newState = {...state};
			newState.question = action.question.question;
			newAnswers = action.question.parts;
			newState.answers = newAnswers;
			newState.error = null;
			return newState;
		case ERROR:
			newState = {...state};
			newState.error = action.error;
			return newState;
		case GET_SPECIFIC_QUESTION:
			newState = {...state};
			newState.question = action.data.question;
			newAnswers = action.data.parts;
			newState.answers = newAnswers;
			return newState;
		default:
			state.error = "";
			return state;
	}
}
