import React, { Component } from "react";
import Header from "../parts/Header";
import { Input, CustomInput, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserAction, resetUserReducer } from "../../actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class InviteUser extends Component {
	constructor(props) {
		super(props);
		const { isAdmin } = this.props;
		if (!isAdmin) {
			this.props.history.push("/student");
		}
		this.state = {
			emailInput: { value: "", errormsg: "" },
			nameInput: { value: "", errormsg: "" },
			isAdmin: false,
			notification: {}
		};
	}

	checkEmailInput(evt) {
		let value = evt.target.value;
		let emailInput = {};
		emailInput.value = value;
		if (value.length === 0) {
			emailInput.errormsg = "Dit invoerveld is leeg";
		} else if (value.length < 5) {
			emailInput.errormsg = "Email moet minstens 5 karakters bevatten";
		}
		this.setState({ emailInput: emailInput, notification: {} });
	}

	checkNameInput(evt) {
		let value = evt.target.value;
		let nameInput = {};
		nameInput.value = value;
		if (value.length > 20) {
			nameInput.errormsg = "Naam mag niet langer dan 20 karakters zijn";
		} else if (value.length === 0) {
			nameInput.errormsg = "Dit invoerveld is leeg";
		}
		this.setState({ nameInput: nameInput, notification: {} });
	}

	showErrorMsg(input) {
		let emailErrorMsg = this.state.emailInput.errormsg;
		let nameErrorMsg = this.state.nameInput.errormsg;
		if (emailErrorMsg !== "" && input === "email") {
			return <span className="text-danger">{emailErrorMsg}</span>;
		} else if (nameErrorMsg !== "" && input === "name") {
			return <span className="text-danger">{nameErrorMsg}</span>;
		}
	}

	changeCheckbox() {
		this.setState({ isAdmin: !this.state.isAdmin });
	}

	showButton() {
		if (
			this.state.emailInput.errormsg === undefined &&
			this.state.nameInput.errormsg === undefined
		)
			return (
				<Button className="w-100" disabled={false}>
					Stuur uitnodiging
				</Button>
			);
		else
			return (
				<Button className="w-100" disabled={true}>
					Stuur uitnodiging
				</Button>
			);
	}
	handleResponse(success, fail) {
		let notification = {};
		if (fail) {
			notification = {
				type: "danger",
				message:
					"Kan user niet uitnodigen, user is al uitgenodigd of is al actief"
			};
			this.props.resetUserReducer();
		} else if (success) {
			notification = {
				type: "success",
				message: "Uitnodiging verzonden"
			};
			this.props.resetUserReducer();
		}
		this.setState({
			notification
		});
	}

	sendForm(evt) {
		evt.preventDefault();
		this.props
			.createUserAction(
				this.state.emailInput.value,
				this.state.nameInput.value,
				this.state.isAdmin
			)
			.then(() => {
				this.handleResponse(this.props.success, this.props.fail);
			});
	}

	render() {
		var { path } = this.props.match;
		path = path.replace("-", " ");
		return (
			<div>
				<Header />
				<div className="p-3 invite-user">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<span>{path.slice(1, path.length)}</span>
							</li>
						</ol>
					</nav>
					<div>
						{this.state.notification ? <div className={`alert alert-${this.state.notification.type}`}>{this.state.notification.message}</div> : ""}
					</div>
					<div>
						<h1 className="text-center">Gebruiker toevoegen</h1>
					</div>
					<form onSubmit={evt => this.sendForm(evt)}>
						<div>
							<label htmlFor="Email">E-mail</label>
							<Input
								id="email"
								onChange={evt => this.checkEmailInput(evt)}
								type="email"
								name="Email"
							/>
							{this.showErrorMsg("email")}
						</div>
						<div>
							<label htmlFor="Naam">Naam</label>
							<Input
								id="name"
								onChange={evt => this.checkNameInput(evt)}
								type="text"
							/>
							{this.showErrorMsg("name")}
						</div>
						<div>
							<div className="p-3">
								<CustomInput
									id="isAdmin"
									type="checkbox"
									onClick={() => this.changeCheckbox()}
									name="CustomCheckbox"
									label="Is beheerder?"
								/>
							</div>
						</div>

						<div>{this.showButton()}</div>
					</form>
					<div className="p-3">
						<Link to="/">
							<button className="btn btn-primary">
								<FontAwesomeIcon
									className="text-white"
									icon="chevron-circle-left"
								/>{" "}
								Ga terug
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		success: state.userReducer.userSubmittedSuccesfull,
		fail: state.userReducer.userSubmittedUnSuccesfull,
		isAdmin: state.authReducer.isAdmin
	};
};

const matchDispatchToProps = dispatch => {
	return bindActionCreators({ createUserAction, resetUserReducer }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(InviteUser);
