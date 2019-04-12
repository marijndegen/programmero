import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../parts/Header";
import giphyApiKey from "../../api/giphy.js";
import giphyRandom from "giphy-random";
import "react-circular-progressbar/dist/styles.css";
import { getEndLessonAction } from "../../actions/practiceAction";

export class LessonprogramResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gif: "",
			loaded: false
		};

		this.props.getEndLessonAction(this.props.match.params.id);

		(async () => {
			try {
				const API_KEY = giphyApiKey;

				const { data } = await giphyRandom(API_KEY, { tag: "happy", rating: "g" });
				this.setState({
					gif: data.images.original.url,
					loaded: true
				});

			} catch (err) {
				this.setState({
					gif: "https://media3.giphy.com/media/l41YxNLbtPJohIdKU/giphy.gif",
					loaded: true
				});
			}
		})();
	}

	render() {
		return <div>
			<Header />
			<div className="container-fluid lessonprogramResult">
				<div className="titles">
					<h1>{this.props.lessonName}</h1>
				</div>
				<div className="scores">
					<h1 className="score">Nieuwe score: {this.props.lessonScore}</h1>
				</div>
				<div>
					<h3>Hoeveelheid vragen goed: {this.props.amountCorrectQuestions}/{this.props.amountQuestions}</h3>
				</div>
				<div className="row-12">
					<img className="resultGif" src={this.state.gif} alt="Succes gif" />
				</div>
				<div className="row-12">
					<a className="btn btn-primary" href="/" role="button">Homepagina</a>
				</div>
			</div>
		</div>;
	}
}

const mapStateToProps = state => {
	return {
		lessonScore: state.studentReducer.lessonScore,
		lessonName: state.studentReducer.lessonProgram,
		amountCorrectQuestions: state.studentReducer.amountCorrectQuestions,
		amountQuestions: state.studentReducer.amountQuestions
	};
};

const matchDispatchToProps = dispatch => {
	return bindActionCreators({ getEndLessonAction }, dispatch);
};

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(LessonprogramResult);
