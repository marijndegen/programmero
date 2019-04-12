import React, { Component } from "react";
import Header from "../parts/Header";
import { bindActionCreators } from "redux";
import { setUser } from "../../actions/userActions";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { validateInput } from "../../functions/validationFunctions";
import { login } from "../../functions/authenticationFunctions";

export class Login extends Component {
	constructor(props) {
		super(props);
		if (this.props.isLoggedIn) {
			const sendingTo = this.props.isAdmin ? "/admin" : "/student";
			this.props.history.push(sendingTo);
		}
		this.state = {
			email: "",
			errors: {},
			isLoading: false
		};
	}
	render() {
		let alert;

		if (this.state.notification) {
			alert = <div class="alert alert-danger" role="alert">
				De door u ingevulde gegevens zijn niet bij ons bekend, controleer uw gegevens en probeer het nog eens.
			</div>;
		}

		const isValid = () => {
			const { errors, isValid } = validateInput(this.state);
			if (!isValid) {
				return this.setState({ errors });
			}
			return isValid;
		};
		const onsubmit = event => {
			event.preventDefault();
			if (isValid()) {
				this.setState({ isLoading: true, notification: false });
				const user = {
					email: this.state.email,
					password: this.state.password
				};
				login(user)
					.then(res => {
						this.setState({ errors: "", isLoading: false });
						localStorage.setItem("usertoken", res);
						let userToken = res;
						userToken = jwtDecode(userToken);
						const { name, isAdmin, email } = userToken;
						this.props.setUser(isAdmin, email, name);
						(isAdmin) ? this.props.history.push("/admin") : this.props.history.push("/student");
					})
					.catch(err => {
						this.setState({
							isLoading: false,
							notification: true,
							errors: {
								[err.message]: `${err.message} niet goed`
							}
						});
					});
			}
		};
		const onchange = event => {
			this.setState({ [event.target.name]: event.target.value });
		};
		const { errors, isLoading } = this.state;
		const checkError = error => (error ? "is-invalid" : "");
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						{alert}
					</div>
					<Form className="loginForm" onSubmit={onsubmit}>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="email">
								Email
							</label>
							<div className="col-sm-10">
								<input
									name="email"
									onChange={onchange}
									type="email"
									className={`form-control ${checkError(errors.email)}`}
									id="email"
									placeholder="Uw email"
								/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-sm-2 col-form-label" htmlFor="password">
								Wachtwoord
							</label>
							<div className="col-sm-10">
								<input
									onChange={onchange}
									type="password"
									className={`form-control ${checkError(errors.password)}`}
									id="password"
									name="password"
									placeholder="Uw wachtwoord"
								/>
							</div>
						</div>
						<button
							disabled={isLoading}
							className="btn btn-primary"
							type="submit"
							id="submit"
						>
							Inloggen
						</button>
					</Form>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAdmin: state.authReducer.isAdmin,
		name: state.authReducer.name,
		isLoggedIn: state.authReducer.isLoggedIn
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({ setUser }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Login);