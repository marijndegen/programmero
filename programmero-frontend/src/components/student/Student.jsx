import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import StudentProgramms from "./StudentProgramms";
import Practice from "./Practice";
import Feedback from "./Feedback";
import { bindActionCreators } from "redux";
import { getScoreAction } from "../../actions/practiceAction";
import LessonprogramResult from "./LessonprogramResult";


export class Student extends Component {
	constructor(props) {
		super(props);
		if (!this.props.isLoggedIn) {
			this.props.history.push("/");
		}
	}
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/student" component={StudentProgramms} />
					<Route exact path="/student/practice/:id" component={Practice} />
					<Route exact path="/student/:id/feedback" component={Feedback} />
					<Route exact path="/student/:id/results" component={LessonprogramResult} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.authReducer.isLoggedIn
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({ getScoreAction }, dispatch);
};
export default connect(
	mapStateToProps,
	matchDispatchToProps,
)(Student);



