import React from "react";
import { shallow } from "enzyme";
import {Practice} from "../../../components/student/Practice";

const history = {push: jest.fn()};

let component;
let props = {
	match:{
		params:{
			id:1
		}
	},
	answers:["1","2"],
	question:"test",
	answer:["if", "test"],
	getCodeCardAction: function(){},
	getScoreAction: function(){}
};
describe("Practice Component", () => {
	let wrapper;

	it("Test if question works", () => {
		wrapper = shallow(<Practice {...props}/>);
		expect(wrapper.find("h4").text()).toEqual("test");
	});

	it("Test if answers are loaded into the code parts section", () => {
		wrapper = shallow(<Practice {...props} />);

		expect(wrapper.find("ul > li").length).toEqual(2);
	});
	
	it("should render correctly in \"debug\" mode", () => {
		component = shallow(<Practice {...props}  debug />);
	});
});
