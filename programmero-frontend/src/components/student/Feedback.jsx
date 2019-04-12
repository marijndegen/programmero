import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OefenProgrammaHeader from "../parts/OefenProgrammaHeader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { sendErrorAction } from "../../actions/questionManagementAction";
import { bindActionCreators } from "redux";
import {
	getCodeCardAction,
	getTheAnswers,
	getScoreAction,
	getLessonprogramScoreAction,
	getLessonAction
} from "../../actions/practiceAction";

export class Feedback extends Component {
	constructor(props) {
		super(props);
		this.props.getLessonAction(this.props.match.params.id);
		this.props.getLessonprogramScoreAction(this.props.match.params.id);
		this.props.getCodeCardAction(this.props.match.params.id);
		this.props.getScoreAction();

		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {

		const compareTheAnswer = (correct, answer) =>
			correct === answer ? "success" : "false";
		const {
			correctAnswer,
			studentAnswer,
			question,
			correct,
			addedScore,
			lessonScore
		} = this.props;
		const nextQuestion = () => {
			const link = this.props.lastQuestion
				? "/student/" + this.props.match.params.id + "/results"
				: "/student/practice/" + this.props.match.params.id;
			this.props.history.push(link);
		};
		const { error } = this.props;
		return (
			<div>
				<OefenProgrammaHeader lesson={this.props.lesson} lessonScore={lessonScore} />

				<div className="lesprogramma-container container-fluid">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="/" onClick={this.toggle}>Home</a>
							</li>
							<li className="breadcrumb-item">
								<span>Practice</span>
							</li>
							<li className="breadcrumb-item" aria-current="page">
								<span>{this.props.lessonprogram} vraag {this.props.numberOfQuestion}</span>
							</li>
						</ol>
					</nav>
					{error ? (
						<div className="col-sm-12 alert alert-danger">
							<strong>{error}</strong>
						</div>
					) : (
						""
					)}

					<h4 className="scoreFeedback">+{addedScore}</h4>
					<h4 className={correct + " questionFeedback"}>{question}</h4>
					<div className="feedbackSection">
						<h4>Jouw antwoord</h4>
						<ul>
							{studentAnswer.map((answer, index) => (
								<li
									className={`${compareTheAnswer(
										correctAnswer[index],
										answer
									)}`}
									key={index}
								>
									{answer}
								</li>
							))}
						</ul>
					</div>
					<div className="correctAnswer">
						<h4>Correcte antwoord</h4>
						<ul className="answers">
							{correctAnswer.map((answer, index) => (
								<li className="answer" key={index}>
									{answer}
								</li>
							))}
						</ul>
					</div>
					<div className="buttonControl d-flex justify-content-between">
						<button className="btn btn-light" onClick={this.toggle}>
							Oefening bëeindigen
						</button>
						<button
							className="btn btn-light"
							type="button"
							onClick={nextQuestion}
						>
							Volgende
						</button>
					</div>
				</div>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Oefening bëeindigen</ModalHeader>
					<ModalBody>Wil je zeker de Oefeing bëeindigen?</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>
							Nee
						</Button>{" "}
						<Link
							className="btn btn-secondary"
							to="/student"
							onClick={this.toggle}
						>
							Ja
						</Link>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		correctAnswer: state.studentReducer.correctAnswer,
		studentAnswer: state.studentReducer.studentAnswer,
		question: state.studentReducer.question,
		correct: state.studentReducer.correct,
		lastQuestion: state.studentReducer.lastQuestion,
		addedScore: state.studentReducer.addedScore,
		lessonScore: state.studentReducer.lessonScore,
		lesson: state.studentReducer.lesson,
		numberOfQuestion: state.studentReducer.numberOfQuestion,
		error: state.appReducer.error
	};
};

const matchDispatchToProps = dispatch =>
	bindActionCreators(
		{ getCodeCardAction, getTheAnswers, getScoreAction, sendErrorAction, getLessonprogramScoreAction, getLessonAction },
		dispatch
	);

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Feedback);
