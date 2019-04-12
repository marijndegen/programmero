import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavbarBrand
} from "reactstrap";


export class OefenProgrammaHeader extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
		if (this.props.match !== undefined && !this.props.match.params.id) {
			this.props.getLessonprogramAction(this.props.match.params.id);
		}
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logout(event) {
		event.preventDefault();
		localStorage.clear();
		window.location.replace("/");
	}

	render() {
		const { numberOfQuestion, allQuestion, lesson, lessonScore } = this.props;
		return (
			<div>
				<Navbar color="primary" expand="md" dark>
					<NavbarBrand>
						<h2 className="text-light">Vraag {numberOfQuestion} / {allQuestion} {lesson.name}</h2>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<h3 className="text-light">Score {lessonScore}</h3>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAdmin: state.authReducer.isAdmin,
		name: state.authReducer.name,
		isLoggedIn: state.authReducer.isLoggedIn,
		score: state.studentReducer.score,
		numberOfQuestion: state.studentReducer.numberOfQuestion,
		allQuestion: state.studentReducer.allQuestion,
		lessonprogram: state.studentReducer.lessonProgram
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(OefenProgrammaHeader);