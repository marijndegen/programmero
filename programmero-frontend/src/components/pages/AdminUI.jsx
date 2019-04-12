import React, { Component } from "react";
import { Container, Col, Row, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";
import Header from "../parts/Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setUser } from "../../actions/userActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faWrench,
	faGraduationCap,
	faInfo,
	faUser
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faWrench, faGraduationCap, faInfo, faUser);


class AdminUI extends Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem("usertoken") !== null) {
			const { isAdmin } = this.props;
			if (!isAdmin) this.props.history.push("/student");
		} else {
			this.props.history.push("/");
		}
	}
	render() {
		return <div>
			<Header />
			<Container fluid={true}>
				<Row className="firstRow">
					<Col className="p-0 ">
						<Link id="addQuestion" to="/add-question" className="add-Question btn linkWrap">
							<Jumbotron className="my-0 text-center newQuestion homeItem" fluid>
								<div style={{ fontSize: 100 }} className="d-flex justify-content-center ">
									<FontAwesomeIcon className="homeTilt text-dark" icon="plus" />
								</div>
								<h2 className="text-center">Voeg een vraag toe</h2>
							</Jumbotron>
						</Link>
					</Col>

					<Col className="p-0">
						<Link to="/question-management" className="question-Management btn linkWrap">
							<Jumbotron className="text-center maintainQuestion homeItem" fluid>

								<div style={{ fontSize: 100 }} className="d-flex justify-content-center">
									<FontAwesomeIcon className="homeTilt text-dark" icon="wrench" />
								</div>

								<h2 className="text-center">Beheer vragen</h2>
							</Jumbotron>
						</Link>
					</Col>
				</Row>

				<Row className="seccondRow">
					<Col className="p-0">
						<Link to="/lesson-management" className="btn linkWrap" id="lessonManagement">
							<Jumbotron className="text-center lessonProgram homeItem" fluid={true}>

								<div style={{ fontSize: 100 }} className="d-flex justify-content-center" >
									<FontAwesomeIcon className="homeTilt text-dark" icon="graduation-cap" />
								</div>

								<h2 className="text-center ">Lesprogramma beheer</h2>
							</Jumbotron>
						</Link>
					</Col>
					<Col className="p-0">
						<Link to="/invite-user" className="btn linkWrap" id="inviteUser">
							<Jumbotron className="text-center newUser homeItem" fluid={true}>

								<div style={{ fontSize: 100 }} className="d-flex justify-content-center" >
									<FontAwesomeIcon className="homeTilt text-dark" icon="user" />
								</div>

								<h2 className="text-center ">Gebruiker toevoegen</h2>
							</Jumbotron>
						</Link>
					</Col>
				</Row>
			</Container>
		</div >;
	}
}

const mapStateToProps = state => {
	return { isAdmin: state.authReducer.isAdmin };
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({ setUser }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(AdminUI);