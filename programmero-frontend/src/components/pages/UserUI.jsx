import React, { Component } from "react";
import { connect } from "react-redux";
import UserHeader from "../parts/UserHeader";


class UserUI extends Component {
	render() {
		return <div>
			<UserHeader />
		</div>;
	}
}

const mapStateToProps = state => {
	return {};
};

const matchDispatchToProps = dispatch => ({

});

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(UserUI);
