import React, { Component } from "react";
import Header from "../parts/Header";
import isEmpty from "lodash/isEmpty";

class Invited extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "example@example.nl",
			name: "example",
			password: "",
			errors: {
				notValidated: "yes"
			}
		};
	}

	render() {
		const validatePassword = event => {
			let { password } = this.refs;
			let errors = {};
			if (event.target.name === "repeat") {
				if (event.target.value !== password.value) {
					errors.repeat =
						"Herhaling wachtwoord komt niet heen met de wachtwoord";
				}
			} else {
				if (event.target.value.length < 8) {
					errors.password = "Wachtwoord moet minimal 8 tekens bevaten!";
				}
			}
			this.setState({ errors });
		};
		const checkError = error => (error ? "is-invalid" : "");

		const signUp = () => {
			if (isEmpty(this.state.errors)) {
				if (
					this.refs.password.value.length >= 8 &&
					this.refs.repeat.value.length >= 8
				) {
					this.props.history.push("/");
				}
			}
		};
		let { errors } = this.state;
		return (
			<div>
				<Header />
				<div className="container">
					<div className="">
						<div className="form-group row">
							<label htmlFor="email" className="col-sm-2 col-form-label">
								Email:
							</label>
							<div className="col-sm-10">
								<input
									type="email"
									className="form-control"
									id="email"
									value={this.state.email}
									readOnly
								/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="name" className="col-sm-2 col-form-label">
								Naam:
							</label>
							<div className="col-sm-10">
								<input
									type="text"
									className="form-control"
									id="name"
									value={this.state.name}
									readOnly
								/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="password" className="col-sm-2 col-form-label">
								Wachtwoord:
							</label>
							<div className="col-sm-10">
								<input
									type="password"
									ref="password"
									className={`form-control  ${checkError(errors.password)}`}
									id="password"
									name="password"
									onChange={validatePassword}
								/>
								<div className="invalid-feedback">{errors.password}</div>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="repeat" className="col-sm-2 col-form-label">
								Herhaling herhaling:
							</label>
							<div className="col-sm-10">
								<input
									type="password"
									className={`form-control  ${checkError(errors.repeat)}`}
									id="inputDanger1"
									name="repeat"
									onChange={validatePassword}
									ref="repeat"
								/>
								<div className="invalid-feedback">{errors.repeat}</div>
							</div>
							<button className="btn btn-primary" onClick={signUp}>
								Registreren
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Invited;
