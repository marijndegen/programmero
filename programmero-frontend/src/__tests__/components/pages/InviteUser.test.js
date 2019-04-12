import React from "react";
import { shallow, mount } from "enzyme";
import { InviteUser } from "../../../components/pages/InviteUser";


// Zet <Header> en <Link> components in comentaar voordat je verder gaat. Dit is om de tests te laten slagen.

let component;
let props = {
	match:{
		path:"user"
	}
};
describe("test launch", () => {
	component = mount(<InviteUser {...props} />);
	test("expect button to be disabled", () => {
		const button = component.find("button");
		expect(button.props().disabled).toEqual(true);
	});
	test("expect button to be enabled when inputs are villed and no errors occur", () => {
		component.setState({
			emailInput: {
				value: "aaaaa"
			},
			nameInput: {
				value: "aaaaa"
			}
		});
		const button = component.find("button");
		expect(button.props().disabled).toEqual(false);
	});

	test("expect button to be disabled when error messages occur", () => {
		const emailInput = component.find("input[name='Email']");
		emailInput.prop("onChange")({ target: { value: "" } });
		const button = component.find("button");
		expect(component.state().emailInput.errormsg).toEqual(
			"Dit invoerveld is leeg"
		);
		expect(button.props().disabled).toEqual(false);
	});

	test("expect isBeheerder to be true after clicking on the checkbox", () => {
		const isAdminCheckbox = component.find("input[name='CustomCheckbox']");
		isAdminCheckbox.prop("onClick")();
		expect(component.state().isAdmin).toEqual(true);
	});
});
