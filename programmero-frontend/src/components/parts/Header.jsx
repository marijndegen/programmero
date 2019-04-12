import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import logo from "../../images/logo-programmero.svg";
import {
	Collapse,
	Navbar,
	NavLink,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";

class Header extends Component {
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
		const { isAdmin, name, isLoggedIn } = this.props;
		return (
			<div>
				<Navbar color="primary" expand="md" dark>
					<NavbarBrand href="/">
						<img src={logo} height="50" className="d-inline-block align-top" alt="" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						{
							isLoggedIn ?
								<Nav className="ml-auto" navbar>
									<NavItem>
										<NavLink className="links" name="home" href={isAdmin ? "/admin" : "/student"}>
											Home
										</NavLink>
									</NavItem>
									<NavItem>
									</NavItem>
									<UncontrolledDropdown nav inNavbar>
										<DropdownToggle nav caret>
											{name}
										</DropdownToggle>
										<DropdownMenu right>
											<Link className="links-black" onClick={this.logout} to="/">
												<DropdownItem>Logout</DropdownItem>
											</Link>
										</DropdownMenu>
									</UncontrolledDropdown>
									<UncontrolledDropdown nav inNavbar>
										<DropdownToggle nav caret>
											Menu
										</DropdownToggle>
										<DropdownMenu right>
											<Link className="links-black" to="/admin"><DropdownItem>Home</DropdownItem></Link>
											<Link className="links-black" to="/add-question"><DropdownItem>Voeg een vraag toe</DropdownItem></Link>
											<Link className="links-black" to="/invite-user"><DropdownItem>Voeg een gebruiker toe</DropdownItem></Link>
											<Link className="links-black" to="/lesson-management"><DropdownItem>Lesbeheer</DropdownItem></Link>
											<Link className="links-black" to="/question-management"><DropdownItem>Vraagbeheer</DropdownItem></Link>
										</DropdownMenu>
									</UncontrolledDropdown>
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
		isLoggedIn: state.authReducer.isLoggedIn
	};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Header);