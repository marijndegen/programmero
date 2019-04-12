import React from "react";
import { shallow } from "enzyme";

import { QuestionManagement } from "../../../components/pages/QuestionManagement";
import { getLessonsAction } from "../../../actions/lessonManagementAction";

let component;


describe("test launch", () => {
	
	it("should render correctly", () => {
		component = shallow(<QuestionManagement getLessonsAction={getLessonsAction}
			lessons={[{ _id: 1, name: "test" }, { _id: 2, name: "test2" }]}
			questions={[]} />);
	});

	it("expect lessons to be loaded", () => {
		component = shallow(<QuestionManagement getLessonsAction={getLessonsAction}
			lessons={[{ _id: 1, name: "test" }, { _id: 2, name: "test2" }]}
			questions={[]} />);
		const optionContainer = component.find("#lessonSelector");
		expect(optionContainer.props().children).toBeDefined();
	});

	it("expect questions to be showing", () => {
		let questions = [
			{
				parts: [],
				_id: "5c1394c925869607742a7714",
				question: "aaaaaa",
				number: 0
			},
			{
				parts: [],
				_id: "5c1394c925869607742a7712",
				question: "aaa",
				number: 1
			}
		];
		component = shallow(<QuestionManagement getLessonsAction={getLessonsAction}
			lessons={[{ _id: 1, name: "test" }, { _id: 2, name: "test2" }]}
			questions={questions} />);
		const question1 = component.find(".aaaaaa");
		expect(question1.props().children[0]).toBeDefined();
	});

	it("expect warningpop-up to show when in the correct state", () => {
		let questions = [
			{
				parts: [],
				checked: true,
				_id: "5c1394c925869607742a7714",
				question: "aaaaaa",
				number: 0
			},
			{
				parts: [],
				checked: true,
				_id: "5c1394c925869607742a7712",
				question: "aaa",
				number: 1
			}
		];
		component = shallow(<QuestionManagement getLessonsAction={getLessonsAction}
			lessons={[{ _id: 1, name: "test" }, { _id: 2, name: "test2" }]}
			questions={questions} />);
		component.setState({questionstoDelete:questions,"showWarningPopup": true});
		const confirmButton = component.find("#pop-up");
		expect(confirmButton.props().isOpen).toEqual(true);
	});
	afterEach(() => {
		component.unmount();
	});
});
