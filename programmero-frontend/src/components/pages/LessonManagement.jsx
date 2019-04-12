import React, { Component } from "react";
import Header from "../parts/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
	Container,
	Col,
	Row,
	Button,
	InputGroup,
	Input,
	ListGroupItem,
	ListGroup,
	ModalHeader,
	Modal,
	ModalBody,
	ModalFooter
} from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { createLessonAction, switchLessonSelection, deleteSelectedLessons, changeSelectedLessonName, getLessonsAction, resetStatusCodeAction } from "../../actions/lessonManagementAction";

library.add(faEdit, faTrashAlt, faChevronCircleLeft);

export class LessonManagement extends Component {

	constructor(props) {
		super(props);
		this.props.getLessonsAction();
		this.state = {
			showWarningPopup: false
		};
	}

	componentDidUpdate() {
		if (this.props.statusCode > 0) {
			this.props.getLessonsAction();
			this.props.resetStatusCodeAction(this.props.statusCode);
		}
	}

	createLesson() {
		const input = document.getElementById("lessonName");

		const lesson = this.props.lessons.find(lesson => lesson.name === input.value);

		if (input.value.length > 3 && lesson === undefined) {
			this.props.createLessonAction(input.value);
			input.value = "";
		}
	}

	switchLessonSelection(evt) {
		this.props.switchLessonSelection(evt.target.value);
	}

	deleteSelectedLessons() {
		this.props.active.forEach(activeLessonName => {
			let lesson = this.props.lessons.find(lesson => {
				return lesson.name === activeLessonName;
			});
			this.props.deleteSelectedLessons(lesson._id);
		});
		
		
		this.setshowWarningPopup(false);
	}
	setshowWarningPopup(bool) {
		this.setState({ showWarningPopup: bool });
	}

	changeSelectedLessonName() {
		const checkboxes = document.getElementsByClassName("lessonCheckbox");
		const oldName = this.props.active[0];
		let newName = document.getElementById("newName").value;

		if (oldName !== newName && newName.length > 3) {
			Array.prototype.forEach.call(checkboxes, checkbox => {
				checkbox.checked = false;
			});
			this.props.changeSelectedLessonName(this.props.lessons, oldName, newName);
			newName = "";
		}
	}

	render() {
		const numberOfSelected = this.props.active.length;
		const { error } = this.props;
		return (
			<div>
				<Header />
				<div><h1 className="text-center my-0 py-4">Lesprogramma beheer</h1></div>
				<Container fluid={true}>
					<Row className="row-eq-height">
						<Col className="p-0 ">
							{error ? <div className="col-sm-12 alert alert-danger"><strong>{error}</strong></div> : ""}
							<h2 className="text-center">Lesprogramma toevoegen</h2>
							<div className="d-flex justify-content-center mt-2">
								<InputGroup className="w-50 ">
									<Input id="lessonName" placeholder="Les programma" ref="lesInput" />
								</InputGroup>
							</div>

							<div className="d-flex justify-content-center mt-2">
								<Button id="addLessonButton" onClick={() => this.createLesson()}>Toevoegen</Button>
							</div>
						</Col>

						<Col className="p-0">
							<h2 className="text-center">Lesprogrammas</h2>

							<div className="scrollWindow">
								<ListGroup flush id="lessons">
									{this.props.lessons.map(lesson => <ListGroupItem key={lesson._id}>
										<div className="custom-control custom-checkbox">
											<input type="checkbox" onClick={evt => this.switchLessonSelection(evt)} value={lesson.name} className="custom-control-input lessonCheckbox" id={`customCheck${lesson._id}`} />
											<label className="custom-control-label" htmlFor={`customCheck${lesson._id}`}> {lesson.name}</label>
										</div>
									</ListGroupItem>)}

								</ListGroup>
							</div>
							<div className="d-flex justify-content-between my-3">
								{(numberOfSelected === 1) ?
									<Button id="edit" color="primary" onClick={() => this.changeSelectedLessonName()}>Bewerk <FontAwesomeIcon className="text-white" icon="edit" /></Button> :
									<Button color="primary" disabled>Bewerk <FontAwesomeIcon className="text-white" icon="edit" /></Button>
								}

								{numberOfSelected === 1 ?
									<Input id="newName" type="text" placeholder={this.props.active[0]}></Input> :
									<span></span>
								}

								{(numberOfSelected > 0) ?
									<Button id="delete" color="danger" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setshowWarningPopup(true)}>Verwijder selectie <FontAwesomeIcon className="text-white" icon="trash-alt" /></Button> :
									<Button color="danger" disabled>Verwijder selectie <FontAwesomeIcon className="text-white" icon="trash-alt" /></Button>
								}
							</div>
							<Modal isOpen={this.state.showWarningPopup} toggle={() => this.setshowWarningPopup(true)} className={this.props.className}>
								<ModalHeader toggle={() => this.setshowWarningPopup(false)}>Waarschuwing</ModalHeader>
								<ModalBody>
									U staat op het punt de volgende lesprogramma's te verwijderen:
									<ListGroup>
										{this.props.active.map(active => {
											return <ListGroupItem key={active}>{active}</ListGroupItem>;
										})}
									</ListGroup>
								</ModalBody>
								<ModalFooter>
									<Button id="confirmdelete" color="primary" onClick={() => this.deleteSelectedLessons()}>Verwijder de geselecteerde lessons</Button>
									<Button color="secondary" onClick={() => this.setshowWarningPopup(false)}>Annuleer</Button>
								</ModalFooter>
							</Modal>
						</Col>
					</Row>
					<Link to="/" id="home"><Button><FontAwesomeIcon className="text-white" icon="chevron-circle-left" /> Ga terug</Button></Link>
				</Container>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		lessons: state.lessonManagementReducer.lessons,
		active: state.lessonManagementReducer.active,
		statusCode: state.lessonManagementReducer.statusCode,
		error: state.appReducer.error
	};
};

const matchDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			createLessonAction,
			switchLessonSelection,
			deleteSelectedLessons,
			changeSelectedLessonName,
			getLessonsAction,
			resetStatusCodeAction
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(LessonManagement);
