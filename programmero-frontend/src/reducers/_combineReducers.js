import { combineReducers } from "redux";
import appReducer from "./questionAddAndEditReducer";
import authReducer from "./authReducer";
import lessonManagementReducer from "./lessonManagementReducer";
import questionListReducer from "./questionReadAndDeleteReducer";
import studentReducer from "./studentReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
	appReducer,
	authReducer,
	lessonManagementReducer,
	questionListReducer,
	studentReducer,
	userReducer

});

export default allReducers;