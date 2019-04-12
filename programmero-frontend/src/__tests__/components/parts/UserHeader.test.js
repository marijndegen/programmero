import React from "react";
import { shallow } from "enzyme";

import { UserHeader } from "../../../components/parts/UserHeader";

let component;

describe("Test if userheader page loads under the following circumstances:", () => {
	it("should render correctly in \"debug\" mode", () => {
		component = shallow(<UserHeader debug />);
	});

	it("should logout if user clicks logout", () => {
		const name = "kees";
		component = shallow(<UserHeader name={name}/>);

		expect(component.find("#name").text()).toBe(name);
	});

	afterEach(() => {
		expect(component).toMatchSnapshot();
		component.unmount();
	});
});