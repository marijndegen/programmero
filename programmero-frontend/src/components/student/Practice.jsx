import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { sendErrorAction } from "../../actions/questionManagementAction";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";
import {
	getCodeCardAction,
	getTheAnswers,
	getScoreAction,
	getLessonprogramScoreAction,
	getLessonAction
} from "../../actions/practiceAction";
import OefenProgrammaHeader from "../parts/OefenProgrammaHeader";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { sendAnswerBackend } from "../../data/practice";

export class Practice extends Component {
	constructor(props) {
		super(props);
		this.props.getLessonAction(this.props.match.params.id);
		this.props.getLessonprogramScoreAction(this.props.match.params.id);
		this.props.getCodeCardAction(this.props.match.params.id);
		this.state = {
			containers: [],
			modal: false
		};
		this.toggle = this.toggle.bind(this);
		this.props.getScoreAction();
	}
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	componentDidMount() {
		dragula(this.state.containers, { revertOnSpill: true });
	}
	render() {
		const { question, answers, error, lessonScore } = this.props;
		const codeParts = componentBackingInstance => {
			if (componentBackingInstance) {
				this.state.containers.push(componentBackingInstance);
			}
		};

		const studentAnswer = componentBackingInstance => {
			if (componentBackingInstance) {
				this.state.containers.push(componentBackingInstance);
			}
		};
		const sendAnswer = link => {
			let studentAnswers = Array.from(
				document.querySelectorAll("#studentAnswers>li")
			);
			const newAnswers = studentAnswers.map(
				studentAnswer => studentAnswer.textContent
			);
			if (answers.length === newAnswers.length) {
				sendAnswerBackend(this.props.match.params.id, newAnswers, this.props.numberOfQuestion)
					.then(res => {
						this.props.getTheAnswers(res, newAnswers);
					})
					.catch(error => {
						this.props.sendErrorAction(
							error.message?error.message:"Server heeft niet gereageerd "
						);
						this.setState({ isLoading: false });
					});
				this.props.history.push(
					"/student/" + this.props.match.params.id + "/feedback"
				);
			}
		};
		return (
			<div>
				<OefenProgrammaHeader lesson={this.props.lesson} lessonScore={lessonScore} />
				<div className="lesprogramma-container container-fluid">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<span href="#" onClick={this.toggle}>
									Home
								</span>
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
					<h4 className="practiceTitle">{question}</h4>
					<ul
						id="studentAnswers"
						ref={studentAnswer}
						className="answers rounded answerField dragula"
					/>
					<ul ref={codeParts} className="dragula answerParts container-fluid">
						{answers.map((answer, index) => (
							<li key={index} className="card">
								{answer}
							</li>
						))}
					</ul>
					<div className="buttonControl d-flex justify-content-between">
						<button className="btn btn-light" onClick={this.toggle}>
							Oefening bëeindigen
						</button>
						<button
							className="btn btn-light"
							to="/student/1223456/feedback"
							type="button"
							onClick={sendAnswer}
						>
							Opsturen
						</button>
					</div>
					<div>
						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader toggle={this.toggle}>
								Oefening bëeindigen
							</ModalHeader>
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		question: state.studentReducer.question,
		answers: state.studentReducer.answerParts,
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
)(Practice);
