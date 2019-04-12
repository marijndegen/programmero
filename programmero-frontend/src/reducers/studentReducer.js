import { GET_CODE_CARD, GET_CORRECT_ANSWER, GET_SCORE, GET_LESSONPROGRAM_SCORE, GET_LESSON, GET_END_LESSONRESULT_INFO } from "../actions/actionTypes";
const initialState = {
	lessonProgram: "SPD A",
	question: "Voorbeeld vraag?",
	answerParts: [],
	correctAnswer: [],
	studentAnswer: [],
	correct: false,
	score: 0,
	lastQuestion: false,
	numberOfQuestion: 0,
	allQuestion: 0,
	addedScore: 0,
	lessonScore: 0,
	amountCorrectQuestions: 0,
	lesson: {}

};
let newState;

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CODE_CARD:
			newState = { ...state };
			newState.question = action.data.question;
			newState.answerParts = action.data.parts;
			newState.numberOfQuestion = action.data.indexCurrentQuestion + 1;
			newState.allQuestion = action.data.amountQuestions;
			newState.lastQuestion = action.data.indexCurrentQuestion + 1 === action.data.amountQuestions;
			return newState;
		case GET_CORRECT_ANSWER:
			newState = { ...state };
			newState.correct = action.data.correct;
			newState.correctAnswer = action.data.correctAnswer;
			newState.studentAnswer = action.studentAnswer;
			newState.addedScore = action.data.addedScore;
			newState.score += action.data.newScore;
			return newState;
		case GET_SCORE:
			newState = { ...state };
			newState.score = action.data;
			return newState;
		case GET_LESSONPROGRAM_SCORE:
			newState = { ...state };
			newState.lessonScore = action.data;
			return newState;
		case GET_LESSON:
			newState = { ...state };
			newState.lesson = action.data;
			return newState;
		case GET_END_LESSONRESULT_INFO:
			newState = {...state};
			newState.lessonProgram = action.data.lessonName;
			newState.amountQuestions = action.data.amountQuestions;
			newState.lessonScore = action.data.score;
			newState.amountCorrectQuestions = action.data.amountCorrect;
			return newState;
		default:
			return state;
	}
}
