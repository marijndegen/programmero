import React, { Component } from "react";
import Header from "../parts/Header";
import { FormGroup, Label, Container } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	fillUserPasswordAction,
	resetUserReducer
} from "../../actions/userActions";
import { checkTheMailToken } from "../../data/userData";

export class AddPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shwoForm: false,
			notification: {},
			count: 3
		};
		checkTheMailToken(this.props.match.params.mailToken)
			.then(res => {
				this.setState({ shwoForm: res });
			})
			.catch();
	}
	tick() {
		this.setState({ count: (this.state.count + 1) });
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	handleAlert(success, fail) {
		if (fail) {
			this.props.resetUserReducer();
			this.setState({
				notification: { type: "warning", message: "User bestaat al" }
			});
		} else if (success) {
			this.props.resetUserReducer();
			this.setState({
				notification: {
					type: "success",
					message: "Wachtwoord is gezet, u kunt nu inloggen!. U wordt verwezen naar inlog pagina"
				}
			});
			setInterval(() => this.props.history.push("/"), 3000);
		}
	}
	sendPasswords() {
		const pass = document.getElementById("pass").value;
		const passrepeat = document.getElementById("passrepeat").value;
		const mailToken = this.props.match.params.mailToken;
		if (pass === "" || passrepeat === "") {
			this.setState({
				notification: {
					type: "warning",
					message: "Wachtwoord and wachtwoord herhaling mogen niet leeg zijn"
				}
			});
		} else {
			if (pass === passrepeat) {
				this.props
					.fillUserPasswordAction(pass, passrepeat, mailToken)
					.then(() => {
						this.handleAlert(this.props.success, this.props.fail);
					});
			} else {
				this.setState({
					notification: {
						type: "warning",
						message: "Wachtwoord and wachtwoord herhaling moeten gelijk zijn"
					}
				});
			}
		}
	}

	render() {
		return (
			<div>
				<Header />
				<Container>
					<div>
						{this.state.notification ? (
							<div className={`alert alert-${this.state.notification.type}`}>
								{this.state.notification.message}
							</div>
						) : (
							""
						)}
					</div>
					<h1>Wachtwoord invoeren</h1>
					{this.state.shwoForm ? (
						<div>
							<FormGroup>
								<Label for="pass">Wachtwoord</Label>
								<input
									className="form-control"
									type="password"
									placeholder="Voer uw wachtwoord in"
									id="pass"
									onChange={() => this.setState({ notification: {} })}
								/>
								<br />
								<Label for="passrepeat">Wachtwoord</Label>
								<input
									className="form-control"
									type="password"
									placeholder="Nogmaals ter conformatie"
									id="passrepeat"
									onChange={() => this.setState({ notification: {} })}
								/>
							</FormGroup>
							<button
								className="btn btn-primary"
								onClick={() => this.sendPasswords()}
							>
								Maak account compleet
							</button>
						</div>
					) : (
						<div className="alert alert-danger">
								De mail token is niet bij ons bekend
						</div>
					)}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		success: state.userReducer.passwordChangedSuccessfull,
		fail: state.userReducer.passwordChangedUnSuccessfull
	};
};

const matchDispatchToProps = dispatch => {
	return bindActionCreators(
		{ fillUserPasswordAction, resetUserReducer },
		dispatch
	);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(AddPassword);
