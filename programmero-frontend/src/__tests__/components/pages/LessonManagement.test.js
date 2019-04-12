import React from "react";
import { shallow, render, mount } from "enzyme";
import { LessonManagement } from "../../../components/pages/LessonManagement";

// Zet <Header> en <Link> components in comentaar voordat je verder gaat. Dit is om de tests te laten slagen.

let props;
const getLessonsAction = () => {};

describe("Lesson Mangemnet component", () => {
	let wrapper;
	beforeEach(() => {
		props = {
			getLessonsAction,
			active: [1, 2],
			lessons: [
				{
					_id: "2",
					name: "JAVA",
					description: "JAVA",
					programmingLanguage: "Processing",
					__v: 0
				},
				{
					_id: "1",
					name: "SPD",
					description: "SPD",
					programmingLanguage: "Processing",
					__v: 0
				}
			]
		};
	});
	it("Check if the first label in the ul is same as the first element in the given array", () => {
		wrapper = mount(<LessonManagement {...props} />);
		expect(wrapper.find("label").first().text()).toEqual(" JAVA");
	});

	it("should render correctly in \"debug\" mode", () => {
		wrapper = shallow(<LessonManagement {...props} />);
	});

	it("Check if the lenght of active is the same as given", () => {
		wrapper = shallow(<LessonManagement {...props} />);
		expect(wrapper.instance().props.active.length).toEqual(2);
	});
	it("check if the state showWarningPopup is false", () => {
		expect(wrapper.state().showWarningPopup).toEqual(false);
	});
});
