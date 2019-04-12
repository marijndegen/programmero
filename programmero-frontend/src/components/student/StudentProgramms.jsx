import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLessonsAction } from "../../actions/lessonManagementAction";
import { sendErrorAction } from "../../actions/questionManagementAction";
import UserHeader from "../parts/UserHeader";
import { creatLessonResults } from "../../data/practice";
import { getScoreAction } from "../../actions/practiceAction";

class StudentProgramms extends Component {
	constructor(props) {
		super(props);
		this.props.getLessonsAction();
		this.props.getScoreAction();

	}
	render() {

		const onclick = lessonId => {
			creatLessonResults(lessonId)
				.then(res => this.props.history.push("/student/practice/" + lessonId))
				.catch(error => {
					this.props.sendErrorAction(error.message?error.message:"Server heeft niet gereageerd ");
					this.setState({ isLoading: false });
				});
		};
		const { error, score } = this.props;
		return (
			<div>
				<UserHeader score={score} />
				<div className="lesprogramma-container container-fluid">
					<h1 className="text-center mb-5">Lesprogramma's</h1>
					{error ? (
						<div className="col-sm-12 alert alert-danger">
							<strong>{error}</strong>
						</div>
					) : (
						""
					)}
					<div className="row">
						{this.props.lessons.map(lesson => (
							<div key={lesson._id} className="col-sm-4 programma-wrapper">
								<div className="lesProgramma">
									<h4>{lesson.name}</h4>
									<button
										className="btn btn-primary"
										onClick={() => onclick(lesson._id)}
									>
										Oefenen
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		lessons: state.lessonManagementReducer.lessons,
		score: state.studentReducer.score,
		error: state.appReducer.error
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({ getLessonsAction, sendErrorAction, getScoreAction }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(StudentProgramms);
