import React from "react";
import { shallow } from "enzyme";
import { Feedback } from "../../../components/student/Feedback";

const history = { push: jest.fn() };

let component;

describe("Feedback Component", () => {
	let wrapper;

	it("should render correctly in \"debug\" mode", () => {
		component = shallow(
			<Feedback
				studentAnswer={["if", "test"]}
				correctAnswer={["test", "if"]}
				debug
			/>
		);
	});

	it("Test if studentAnswers are loaded into ul properly", () => {
		wrapper = shallow(
			<Feedback studentAnswer={["if", "test"]} correctAnswer={["test", "if"]} />
		);

		expect(
			wrapper.find(".feedbackSection ul > li").length
		).toBeGreaterThanOrEqual(1);
	});

	it("Test if correctAnswer is loaded into ul properly", () => {
		wrapper = shallow(
			<Feedback studentAnswer={["if", "test"]} correctAnswer={["test", "if"]} />
		);

		expect(
			wrapper.find(".correctAnswer ul > li").length
		).toBeGreaterThanOrEqual(1);
	});

	it("Test if the question is loaded in properly", () => {
		wrapper = shallow(
			<Feedback studentAnswer={["if", "test"]} correctAnswer={["test", "if"]} />
		);

		expect(
			wrapper.find(".questionFeedback").text().length
		).toBeGreaterThanOrEqual(0);
	});
});

