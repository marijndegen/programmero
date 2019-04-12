import {
	SELECT_ALL_QUESIONS,
	ADD_ONE_QUESTION,
	SET_CHECKBOXES_STATE,
	CHANGE_CHECKBOX_STATE,
	DELETE_SELECTED_QUESTION,
	GET_QUESTION
} from "../actions/actionTypes";
import { deleteQuestion } from "../data/questionData";

const initialState = {
	questions: [],
	lessonId: ""
};

let checkboxesState, checkBoxes, newState, questions;

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_QUESTION:
			/* Get questions from backend*/
			newState = { ...state };
			newState.questions = action.questions;
			newState.lessonId = action.lessonId;
			newState.questions.forEach(question => {
				question.checked = false;
				question.parent = action.lessonId;
			});
			return newState;

		case SET_CHECKBOXES_STATE:
			newState = { ...state };
			newState.questions = action.checkboxesState;
			return newState;

		case SELECT_ALL_QUESIONS:
			checkboxesState = action.checkboxesState;
			checkBoxes = action.checkBoxes;
			checkboxesState.forEach((checkbox, i) => {
				checkBoxes[i].checked = true;
				checkbox.checked = true;
			});
			newState = { ...state };
			newState.questions = checkboxesState;
			return newState;

		case CHANGE_CHECKBOX_STATE:
			newState = { ...state };
			state.questions.forEach(question => {
				if (question._id === action.evt.target.id) {
					question.checked = !question.checked;
				}
				newState.questions = state.questions;
			});
			return newState;

		case DELETE_SELECTED_QUESTION:
			newState = { ...state };
			newState.questionstoDelete = state.questions.filter(lesson => {
				return lesson.checked === true;
			});

			newState.questions = state.questions.filter(lesson => {
				return lesson.checked === false;
			});

			checkBoxes = action.checkBoxes;
			newState.questions.forEach((checkbox, i) => {
				checkBoxes[i].checked = false;
			});

			/* Backend delete*/
			newState.questionstoDelete.forEach(lesson => {
				deleteQuestion(lesson.parent, lesson._id);
			});
			return newState;
		case ADD_ONE_QUESTION:
			newState = { ...state };
			questions = [...state.questions];
			if (questions.length > 0) {
				if (questions[0].parent === action.question.parent) {
					questions.push(action.question);
					questions[questions.length - 1].number = questions.length - 1;
				}
			}
			newState.questions = questions;
			return newState;

		default:
			return state;
	}
}
