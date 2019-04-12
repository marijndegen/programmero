import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	Collapse,
	Navbar,
	NavLink,
	NavbarToggler,
	Nav,
	NavItem,
	NavbarBrand
} from "reactstrap";

export class UserHeader extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};

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
		const { name, isLoggedIn, score } = this.props;
		return (
			<div>
				<Navbar color="primary" expand="md" dark>
					<NavbarBrand href="/">
						<h2><span id="name">{name}</span> - score {score}</h2>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						{
							isLoggedIn ?
								<Nav className="ml-auto" navbar>
									<NavItem>
										{isLoggedIn ?
											<NavLink className="links" onClick={this.logout} to="/">
												Logout
											</NavLink> : ""}

									</NavItem>
								</Nav> : ""
						}
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
		score: state.studentReducer.score
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(UserHeader);