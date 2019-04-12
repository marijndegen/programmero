import React, { Component } from "react";
import Header from "../parts/Header";
import { Table, Container, Row, Col, CustomInput, Button, ModalHeader, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencilAlt, faGraduationCap, faInfo, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { selectAllQuestions, setCheckboxesState, changeCheckboxState, deleteSelectedQuestion, getQuestions, sendQuestion } from "../../actions/questionManagementAction";
import { getLessonsAction } from "../../actions/lessonManagementAction";
import { connect } from "react-redux";
library.add(faPlus, faPencilAlt, faGraduationCap, faInfo, faChevronCircleLeft);

export class QuestionManagement extends Component {
	/**
	 * Fetches the lessons from the server.
	 * @param {*} props 
	 */
	constructor(props) {
		super(props);
		this.props.getLessonsAction();
		this.state = {
			showWarningPopup: false,
			questionstoDelete: []
		};
	}

	/**
	 * Fetches the lessons from the server.
	 */
	didComponentRender() {
		this.props.getLessonsAction();
	}

	getCodeCardsOfLessons() {
		let selectValue = document.getElementById("lessonSelector").value;
		if (selectValue.length > 0) {
			this.props.getQuestions(selectValue);
		}
	}
	setshowWarningPopup(bool) {
		let questionstoDelete = this.props.questions.filter(lesson => {
			return lesson.checked === true;
		});
		this.setState({ showWarningPopup: bool, questionstoDelete: questionstoDelete });
	}

	deleteSelectedQuestionHandler() {
		this.props.deleteSelectedQuestion(this.props.lessons, document.getElementsByName("checkbox"));
		this.setshowWarningPopup(false);
	}

	render() {
		let i = -1;
		return (
			<div className="content">
				<Header></Header>

				<div className="managementHead" align="center">
					<Container>
						<h1>Vragen beheren</h1>
						<h3>Selecteer een lesprogramma</h3>
						<select id="lessonSelector" onChange={() => this.getCodeCardsOfLessons()}>
							<option disabled selected value="">Selecteer een les</option>
							{this.props.lessons.map(lesson => {

								i++;
								return <option name={"Lesson" + i} key={lesson._id} value={lesson._id}>{lesson.name}</option>;
							})}
						</select>
					</Container>
				</div>
				<div className="questionEditList container-fluid center ">
					<Container>
						<div className="tableContainer">
							<Table className="questionList">
								<thead>
									<tr>
										<th>Selecteer</th>
										<th>Vraag</th>
										<th>Wijzig</th>
									</tr>
								</thead>
								<tbody >
									{
										(this.props.questions.length === 0) ?
											<tr><td>Er zijn nog geen vragen aangemaakt voor deze les!</td></tr>
											:
											this.props.questions.map(question => {
												return <tr key={question._id} className={question.question}>
													<th><CustomInput type="checkbox" name="checkbox" onClick={(evt) => this.props.changeCheckboxState(evt, this.props.questions)} id={question._id} inline /></th>
													<td >{question.question}</td>
													<td>
														<Link className="edit" onClick={() => { this.props.sendQuestion(question); }} to={`/question/${question._id}/${this.props.lessonId}`}>
															<FontAwesomeIcon className="text-dark pencilQuestion tiltAnimation" icon="pencil-alt" />
														</Link>
													</td>
												</tr>;
											})
									}
								</tbody>
							</Table>
						</div>
						<Row className="buttonControl">
							<Col>
								<Button className="selectAll" onClick={() => { this.props.selectAllQuestions(this.props.questions, document.getElementsByName("checkbox")); }} color="secondary">Selecteer alle</Button>
							</Col>
							<Col>
								<Button className="float-right verwijder-selectie" color="danger" onClick={() => this.setshowWarningPopup(true)}>Verwijder selectie</Button>
							</Col>
						</Row>
					</Container>
					<Modal id="pop-up" isOpen={this.state.showWarningPopup} toggle={() => this.setshowWarningPopup(true)} className={this.props.className}>
						<ModalHeader toggle={() => this.setshowWarningPopup(false)}>Waarschuwing</ModalHeader>
						<ModalBody>
							U staat op het punt de volgende vragen te verwijderen:
							<ListGroup>
								{this.state.questionstoDelete.map(active => {
									return <ListGroupItem key={active._id}>{active.question}</ListGroupItem>;
								})}
							</ListGroup>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" className="verwijder-definitief" onClick={() => this.deleteSelectedQuestionHandler()}>Verwijder de geselecteerde vragen</Button>
							<Button color="secondary" className="annuleer" onClick={() => this.setshowWarningPopup(false)}>Annuleer</Button>
						</ModalFooter>
					</Modal>
					<Link to="/"><Button><FontAwesomeIcon className="text-white" icon="chevron-circle-left" /> Ga terug</Button></Link>				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		questions: state.questionListReducer.questions,
		lessons: state.lessonManagementReducer.lessons,
		lessonId: state.questionListReducer.lessonId

	};
}

const matchDispatchToProps = dispatch => {
	return bindActionCreators({ sendQuestion, getQuestions, getLessonsAction, deleteSelectedQuestion, changeCheckboxState, setCheckboxesState, selectAllQuestions }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(QuestionManagement);