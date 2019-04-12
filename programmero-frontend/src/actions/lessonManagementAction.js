import {
	SWITCH_LESSON_SELECTION,
	DELETE_SELECTED_LESSONS,
	CHANGE_SELECTED_LESSON_NAME,
	GET_LESSONS,
	CREATE_LESSON,
	RESET_STATUS_CODE,
	ERROR
} from "./actionTypes";
import {
	getLessons,
	createLesson,
	deleteLesson,
	updateLesson
} from "../data/lessonsData";

export const createLessonAction = (
	name,
	description = null,
	programmingLanguage = null
) => {
	if (description === null) description = "A very cool lesson";
	if (programmingLanguage === null) programmingLanguage = "Processing";

	const createBody = { name, description, programmingLanguage };
	return dispatch => {
		createLesson(createBody)
			.then(data => {
				dispatch({
					type: CREATE_LESSON,
					_id: data._id,
					...createBody,
					errorCode: data.status
				});
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message ? "Server kon niet reageren":error.message
				});
			});
	};
};

export const switchLessonSelection = name => {
	return {
		type: SWITCH_LESSON_SELECTION,
		name
	};
};

export const deleteSelectedLessons = (lessonId) => {
	return dispatch => {
		deleteLesson(lessonId).then(result => {
			dispatch({ type: DELETE_SELECTED_LESSONS, errorCode: result });
		}).catch(error => {
			dispatch({
				type: ERROR,
				error: error.message ? "Server kon niet reageren":error.message
			});
		});
	};
};

export const changeSelectedLessonName = (lessons, oldName, newName) => {
	const lesson = lessons.find(element => {
		return element.name === oldName;
	});

	const lessonId = lesson._id;

	return dispatch => {
		updateLesson(lessonId, { ...lesson, name: newName })
			.then(result => {
				dispatch({
					type: CHANGE_SELECTED_LESSON_NAME,
					oldName,
					newName,
					errorCode: result
				});
			})
			.catch(error => {
				
				dispatch({
					type: ERROR,
					error: error.message ? "Server kon niet reageren":error.message
				});
			});
	};
};

export const getLessonsAction = () => {
	return dispatch => {
		getLessons()
			.then(data => {
				dispatch({ type: GET_LESSONS, lessons: data });
			})
			.catch(error => {
				dispatch({
					type: ERROR,
					error: error.message ? "Server kon niet reageren":error.message
				});
			});
	};
};

export const resetStatusCodeAction = () => {
	return {
		type: RESET_STATUS_CODE
	};
};
