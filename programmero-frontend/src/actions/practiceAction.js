import { GET_CODE_CARD, ERROR, GET_CORRECT_ANSWER, GET_SCORE, GET_LESSONPROGRAM_SCORE, GET_LESSON, GET_END_LESSONRESULT_INFO } from "./actionTypes";
import { getCodeCard, getTheScore, getLessonprogramScore, getLesson, getEndLesson } from "../data/practice";

export const getCodeCardAction = lessonId => {
	return dispatch => {
		getCodeCard(lessonId)
			.then(data => {
				dispatch({ type: GET_CODE_CARD, data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message?error.message:"Server heeft niet gereageerd "
				});
			});
	};
};

export const getTheAnswers = (data, studentAnswer) => {
	return {
		type: GET_CORRECT_ANSWER,
		data,
		studentAnswer
	};
};

export const getScoreAction = () => {
	return dispatch => {
		getTheScore()
			.then(data => {
				dispatch({ type: GET_SCORE, data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message?error.message:"Server heeft niet gereageerd "
				});
			});
	};
};

export const getLessonprogramScoreAction = (lessonId) => {
	return dispatch => {
		getLessonprogramScore(lessonId)
			.then(data => {
				dispatch({ type: GET_LESSONPROGRAM_SCORE, data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message?error.message:"Server heeft niet gereageerd "
				});
			});
	};
};

export const getLessonAction = (lessonId) => {
	return dispatch => {
		getLesson(lessonId)
			.then(data => {
				dispatch({ type: GET_LESSON, data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message?error.message:"Server heeft niet gereageerd "
				});
			});
	};
};

export const getEndLessonAction = (lessonId) => {
	return dispatch => {
		getEndLesson(lessonId)
			.then(data => {
				dispatch({ type: GET_END_LESSONRESULT_INFO, data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message?error.message:"Server heeft niet gereageerd "
				});
			});
	};
};
