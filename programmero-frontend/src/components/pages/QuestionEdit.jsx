import React, { Component } from "react";
import Header from "../parts/Header";
import enter from "../../images/keyboard-key-enter.png";

import {
	FormGroup,
	Label,
	InputGroupAddon,
	InputGroup,
	Button,
	UncontrolledCollapse,
	ListGroup,
	Card
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	addQuestion,
	addAnswer,
	inEditing,
	deleteAnswer,
	refreshTheReducer,
	sendErrorAction,
	getSpecificQuestion,
	getQuestions
} from "../../actions/questionManagementAction";

import { putQuestion } from "../../data/questionData";
import { getLessonsAction } from "../../actions/lessonManagementAction";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

library.add(faPlus, faTrash, faCheck);

class AddQuestion extends Component {
	constructor(props) {
		super(props);
		this.props.getLessonsAction();
		this.state = {
			showSave: true,
			isLoading: false,
			successed: false,
			failed: false,
			indexClicked: -1,
			message: ""
		};
		this.answer = React.createRef();
		this.question = React.createRef();
		this.counter = 0;

		this.props.getSpecificQuestion(this.props.match.params.lessonId, this.props.match.params.id);
	}

	componentWillUpdate() {
		this.counter++;
	}

	render() {
		const handleQuestion = event => {
			if (event.target.value.length > 5)
				return this.setState({ showSave: true });
			this.setState({ showSave: false });
		};
		const sendQuestion = () => {
			this.setState({ isLoading: true });
			let question = this.question.current.value;
			let { answers } = this.props;
			putQuestion(
				this.props.match.params.lessonId,
				this.props.match.params.id,
				question,
				answers
			)
				.then(res => {
					this.setState({ successed: true, message: "Vraag succesvol veranderd!", isLoading: false });
					if (this.state.questionListId === this.props.match.params.lessonId) {
						this.props.getQuestions(this.props.match.params.lessonId);
					}
					window.scrollTo(0, 0);
				})
				.catch(error => {
					this.props.sendErrorAction("iets ging mis. Probeer het later eens!");
					this.setState({ isLoading: false });
				});
		};
		const sendAnswer = () => {
			let answer = this.answer.current.value;
			if (answer.length > 0) {
				this.props.addAnswer(answer, this.props.inEditingId);
				this.answer.current.value = "";
			}
		};
		const handleEdititing = (id, answerText) => {
			this.answer.current.value = answerText;
			this.props.inEditing(id);
		};
		const handleDelete = id => {
			this.answer.current.value = "";
			this.props.deleteAnswer(id);
		};

		const makeLessons = (index, program) => {
			if (this.props.questions) {
				return (<UncontrolledCollapse toggler={"#target" + index} >
					{this.props.questions.map((codeCard) => {
						return <Card key={codeCard._id}> <div><a href={"/question/" + codeCard._id + "/" + program._id} >{codeCard.question}</a></div> </Card>;
					})
					}
				</UncontrolledCollapse>);
			}
		};

		const handleEvent = (evt, indexClicked) => {
			this.setState({ indexClicked: indexClicked, questionListId: evt.target.value });
			this.props.getQuestions(evt.target.value);
		};
		const handleTheEnter = (event) => {
			if (event.keyCode === 13) sendAnswer();
		};
		const { error } = this.props;

		return (
			<div>
				<Header />
				<div className="addQuestion">
					<div className="container-fluid justify-content-center container">
						{this.state.successed ? (
							<div className="alert alert-success">
								<strong>Prima! </strong>De vraag is aangepast!
							</div>
						) : (
							""
						)}
						{error ? (
							<div className="w-50 my-0 py-4 alert alert-danger">
								<strong>{error}</strong>
							</div>
						) : (
							""
						)}
						<h1>Vraag bewerken</h1>

						<FormGroup>
							<Label for="question">Vraag</Label>
							<input
								className="form-control"
								onChange={handleQuestion}
								type="text"
								name="question-input"
								id="question"
								ref={this.question}
								defaultValue={this.props.question}
							/>
						</FormGroup>
						<FormGroup>
							<Label>kaart toevoegen</Label>
							<InputGroup>
								<input type="text" placeholder="Code" ref={this.answer} onKeyUp={handleTheEnter} />
								<InputGroupAddon addonType="append">
									{this.props.inEditingId === "" ? (
										<button className="btn btn-primary" onClick={sendAnswer}>
											{" "}
											<FontAwesomeIcon icon="plus" />
										</button>
									) : (
										<button className="btn btn-success" onClick={sendAnswer}>
											{" "}
											<FontAwesomeIcon icon="check" />{" "}
										</button>
									)}
									<div><img alt="Enter button" className="enterImage" src={enter} /></div>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
						<div>
							<h3>Antwoord</h3>

							<ul className="answers rounded answerField">
								{this.props.answers.map((answer, index) => {
									if (index === this.props.inEditingId) {
										return (
											<li key={index} className="inEditing">
												{answer}&nbsp;
												<button
													className="btn btn-danger fadeIn"
													onClick={() => handleDelete(index)}
												>
													<FontAwesomeIcon icon="trash" />
												</button>
											</li>
										);
									}
									return (
										<li
											onClick={() => handleEdititing(index, answer)}
											key={index}
											className="answer fadeIn"
										>
											{answer}
										</li>
									);
								})}
							</ul>
						</div>
						<div>
							{this.state.showSave ? (
								<Button onClick={sendQuestion} disabled={this.state.isLoading}>
									Bewerken
								</Button>
							) : (
								""
							)}
						</div>
						<div>
							<h3>Lesprogramma's</h3>
						</div>
						<div className="lesprogrammas scrollbar scrollbar-primary">
							<ListGroup>
								{this.props.lessons.map((lesson, index) => {
									return (
										<div key={lesson._id}>
											{this.state.indexClicked === index ? (
												<Button
													onClick={evt => handleEvent(evt, index)}
													className="d-flex text-center"
													color="succes"
													id={"target" + index}
													style={{ width: 100 + "%", marginBottom: "1rem" }}
													value={lesson._id}
												>
													{lesson.name}
												</Button>
											) : (
												<Button
													onClick={evt => handleEvent(evt, index)}
													className="d-flex text-center"
													color="primary"
													id={"target" + index}
													style={{ width: 100 + "%", marginBottom: "1rem" }}
													value={lesson._id}
												>
													{lesson.name}
												</Button>
											)}

											{this.state.indexClicked === index
												? makeLessons(index, lesson)
												: ""}
										</div>
									);
								})}
							</ListGroup>
						</div>
						<Link to="/question-management" id="home"><Button><FontAwesomeIcon className="text-white" icon="chevron-circle-left" /> Ga terug</Button></Link>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		answers: state.appReducer.answers,
		inEditingId: state.appReducer.inEditing,
		lessons: state.lessonManagementReducer.lessons,
		questions: state.questionListReducer.questions,
		error: state.appReducer.error,
		question: state.appReducer.question
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addQuestion,
			getSpecificQuestion,
			addAnswer,
			getLessonsAction,
			inEditing,
			refreshTheReducer,
			deleteAnswer,
			getQuestions,
			sendErrorAction
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(AddQuestion);
