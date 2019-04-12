//import types
import { CREATE_LESSON, SWITCH_LESSON_SELECTION, DELETE_SELECTED_LESSONS, CHANGE_SELECTED_LESSON_NAME, GET_LESSONS,RESET_STATUS_CODE } from "../actions/actionTypes";

const initState = {
	lessons: [],
	active: []
};

let newLessons, element, newActive;
export default function (state = initState, action) {
	switch (action.type) {
		case CREATE_LESSON:
			newLessons = [...state.lessons];
			newLessons.push({
				_id: action._id,
				name: action.name,
				description: action.description,
				programmingLanguage: action.programmingLanguage
			});
			return { ...state, lessons: newLessons,statusCode: action.errorCode };
		case SWITCH_LESSON_SELECTION:
			element = state.active.find(lessonName => {
				return lessonName === action.name;
			});

			if (typeof element === "string") {
				newActive = state.active.filter(lessonName => lessonName !== element);
			} else {
				newActive = [...state.active, action.name];
			}
			return { ...state, active: newActive };
		case DELETE_SELECTED_LESSONS:
			newLessons = [...state.lessons];
			newLessons = newLessons.filter(lesson => {
				return !state.active.includes(lesson.name);
			});
			return { ...state, lessons: newLessons, active: [], statusCode: action.errorCode };
		case CHANGE_SELECTED_LESSON_NAME:
			element = state.lessons.find(lesson => lesson.name === action.oldName);
			element.name = action.newName;
			return { ...state, active: [], statusCode: action.errorCode };
		case GET_LESSONS:
			newLessons = action.lessons;
			return { ...state, lessons: newLessons };

		case RESET_STATUS_CODE:
			state.statusCode = 0;
			return {...state};
		default:
			return state;
	}
}