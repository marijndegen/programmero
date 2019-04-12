import React, { Component } from "react";
import Header from "../parts/Header";
import enter from "../../images/keyboard-key-enter.png";
import {
	FormGroup,
	Label,
	InputGroupAddon,
	InputGroup,
	Button,
	ListGroup,
	UncontrolledCollapse,
	Card

} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	addQuestion,
	addAnswer,
	inEditing,
	deleteAnswer
} from "../../actions/questionManagementAction";
import { refreshTheReducer } from "../../actions/questionManagementAction";
import { postQuestion } from "../../data/questionData";
import { getLessonsAction } from "../../actions/lessonManagementAction";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { getQuestions } from "../../actions/questionManagementAction";
library.add(faPlus, faTrash, faCheck);

class AddQuestion extends Component {
	constructor(props) {
		super(props);

		const { isAdmin } = this.props;
		if (!isAdmin) {
			this.props.history.push("/student");
		}
		this.props.getLessonsAction();
		this.state = {
			showSave: false,
			isLoading: false,
			successed: false,
			indexClicked: -1
		};
		this.answer = React.createRef();
		this.question = React.createRef();
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
			let lessonId = this.refs.lesson.value;
			postQuestion(lessonId, question, answers)
				.then(res => {
					this.setState({ successed: true, isLoading: false });
					this.props.refreshTheReducer();
					if (this.state.questionListId === lessonId) {
						this.props.getQuestions(lessonId);
					}
					this.question.current.value = "";
				}
				)
				.catch(this.setState({ isLoading: false }));
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
						return <Card key={codeCard._id}> <div><Link to={"/question/" + codeCard._id + "/" + program._id} >{codeCard.question}</Link></div> </Card>;
					})
					}
				</UncontrolledCollapse>);
			}
		};

		const handleEvent = (evt, indexClicked) => {
			this.props.getQuestions(evt.target.value);
			this.setState({ indexClicked: indexClicked, questionListId: evt.target.value });
		};
		const handleTheEnter = (event) => {
			if (event.keyCode === 13) sendAnswer();
		};
		return (
			<div>
				<Header />
				<div className="addQuestion">
					<div className="add-question-form container-fluid justify-content-center container">
						<h1>Voeg vraag toe</h1>
						{
							this.state.successed ?
								<div className="alert alert-success">
									De vraag is succesvol aangepast!
								</div> : ""
						}
						<FormGroup>
							<Label for="question">Vraag</Label>
							<input
								className="form-control"
								onChange={handleQuestion}
								type="text"
								name="question-input"
								placeholder="Vul een vraag in"
								id="question"
								ref={this.question}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="les-program">Lesprogramma</Label>
							<select
								className="form-control"
								ref="lesson"
								name="les-program"
								id="les-program"
							>
								{this.props.lessons.map(({ name, _id }) => (
									<option value={_id} key={_id}>
										{name}
									</option>
								))}
							</select>
						</FormGroup>
						<FormGroup>
							<Label>kaart toevoegen</Label>
							<InputGroup>
								<input type="text" placeholder="Code" ref={this.answer} id="codecardadd" onKeyUp={handleTheEnter} />
								<InputGroupAddon addonType="append">
									{this.props.inEditingId === "" ? (
										<button ref="append" className="btn btn-primary" onClick={sendAnswer}>
											{" "}
											<FontAwesomeIcon icon="plus" />
										</button>
									) : (
										<button className="btn btn-success" onClick={sendAnswer}>
											{" "}
											<FontAwesomeIcon icon="check" />{" "}
										</button>
									)}
									<div><img alt="enter" className="enterImage" src={enter} /></div>
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
								<Button id="save-question" onClick={sendQuestion} disabled={this.state.isLoading}>
									Opslaan
								</Button>
							) : ("")}
						</div>
						<div>
							<h3>Lesprogramma's</h3>
						</div>
						<div className="lesprogrammas scrollbar scrollbar-primary">
							<ListGroup>
								{this.props.lessons.map((lesson, index) => {
									return <div key={lesson._id}>
										{this.state.indexClicked === index ?
											<Button onClick={(evt) => handleEvent(evt, index)} className="d-flex text-center" color="succes" id={"target" + index} style={{ width: 100 + "%", marginBottom: "1rem" }} value={lesson._id} >{lesson.name}</Button>
											:
											<Button onClick={(evt) => handleEvent(evt, index)} className="d-flex text-center" color="primary" id={"target" + index} style={{ width: 100 + "%", marginBottom: "1rem" }} value={lesson._id} >{lesson.name}</Button>}

										{this.state.indexClicked === index ? (makeLessons(index, lesson)) : ""}
									</div>;
								})}
							</ListGroup>
						</div>
						<Link to="/" id="home"><Button><FontAwesomeIcon className="text-white" icon="chevron-circle-left" /> Ga terug</Button></Link>
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
		isAdmin: state.authReducer.isAdmin,
		name: state.authReducer.name,
		lessons: state.lessonManagementReducer.lessons,
		questions: state.questionListReducer.questions
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators(
		{ addQuestion, addAnswer, getLessonsAction, inEditing, refreshTheReducer, deleteAnswer, getQuestions },
		dispatch
	);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(AddQuestion);
