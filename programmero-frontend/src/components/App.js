import React, { Component } from "react";
import AdminUI from "./pages/AdminUI";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
import {setUser} from "../actions/userActions";
import {BrowserRouter , Switch , Route} from "react-router-dom";
import Addquestion from "./pages/AddQuestion";
import AddPassword from "./pages/AddPassword";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import QuestionManagement from "./pages/QuestionManagement";
import LessonManagement from "./pages/LessonManagement";
import QuestionEdit from "./pages/QuestionEdit";

import Invited from "./Inviting/Invited";
import Student from "./student/Student";
import InviteUser from "./pages/InviteUser";



class App extends Component {
	constructor(props){
		super(props);
		if(localStorage.getItem("usertoken") !== null){
			let userToken = localStorage.usertoken;
			userToken = jwtDecode(userToken);
			const {name,isAdmin,email} = userToken;
			this.props.setUser(isAdmin,email,name);
		}
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact={true} component={Login} />
					<Route path= "/admin" component={AdminUI} />
					<Route path= "/validate/:mailToken" component={AddPassword} />
					<Route path= "/add-question" component={Addquestion} />
					<Route path= "/question-management" component={QuestionManagement} />
					<Route path= "/lesson-management" component={LessonManagement} />
					<Route path= "/question/:id/:lessonId" component={QuestionEdit} />
					<Route path= "/invited" component={Invited} />
					<Route path= "/student" component={Student} />
					<Route path= "/invite-user" component={InviteUser} />
					<Route component={NotFound} />

				</Switch>
			</BrowserRouter>
		);
	}
}
const mapStateToProps = state => {
	return {};
};
const matchDispatchToProps = dispatch => {
	return bindActionCreators({setUser}, dispatch);
};
  
export default connect(
	mapStateToProps,
	matchDispatchToProps
)(App);