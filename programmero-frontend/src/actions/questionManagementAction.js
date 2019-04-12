import {
	ADD_QUESTION,
	ADD_ANSWER,
	EDIT_ANSWER,
	DELETE_ANSWER,
	GET_SPECIFIC_QUESTION,
	SELECT_ALL_QUESIONS,
	SET_CHECKBOXES_STATE,
	CHANGE_CHECKBOX_STATE,
	DELETE_SELECTED_QUESTION,
	GET_QUESTION,
	REFRESH_THE_REDUCER,
	QUESTION_IN_EDITING,
	ERROR,
	ADD_ONE_QUESTION
} from "./actionTypes";
import { questions, question } from "../data/questionData";

export const addQuestion = (question) => {
	return {
		type: ADD_QUESTION,
		question
	};
};

export const addAnswer = (answer, id = "") => {
	return {
		type: ADD_ANSWER,
		answer,
		id
	};
};
export const inEditing = (answerId) => {
	return {
		type: EDIT_ANSWER,
		answerId
	};
};
export const deleteAnswer = (id) => {
	return {
		type: DELETE_ANSWER,
		id
	};
};

export const selectAllQuestions = (checkboxesState, checkBoxes) => {
	return {
		type: SELECT_ALL_QUESIONS,
		checkboxesState,
		checkBoxes
	};
};

export const setCheckboxesState = checkboxesState => {
	return {
		type: SET_CHECKBOXES_STATE,
		checkboxesState
	};
};

export const changeCheckboxState = (evt, question) => {
	return {
		type: CHANGE_CHECKBOX_STATE,
		evt,
		question
	};
};

export const deleteSelectedQuestion = (question, checkBoxes) => {
	return {
		type: DELETE_SELECTED_QUESTION,
		question,
		checkBoxes
	};
};

export function getQuestions(lessonId) {
	return (dispatch) => {
		questions(lessonId).then(data => {
			dispatch({ type: GET_QUESTION, questions: data, lessonId });
		});
	};
}

export function getSpecificQuestion(lessonId, questionId) {
	return (dispatch) => {
		question(lessonId, questionId).then(data => {
			dispatch({ type: GET_SPECIFIC_QUESTION, data });
		});
	};
}

export function refreshTheReducer(newQuestion) {
	return {
		type: REFRESH_THE_REDUCER,
		newQuestion
	};
}

export function sendQuestion(question) {
	return {
		type: QUESTION_IN_EDITING,
		question
	};
}
export function sendErrorAction(error) {
	return {
		type: ERROR,
		error
	};
}
export function addOneQuestion(question) {
	return {
		type: ADD_ONE_QUESTION,
		question
	};
}