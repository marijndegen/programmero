import React from "react";
import { shallow } from "enzyme";
import {Login} from "../../../components/pages/Login";

const history = {push: jest.fn()};

let component;

describe("Test if loggin page loads under the following circumstances:", () => {
	it("should render correctly in \"debug\" mode", () => {
		component = shallow(<Login debug />);
	});

	it("Redirect if logged in", () => {
		component = shallow(<Login isLoggedIn={true} history={history}/>);
		expect(history.push).toHaveBeenCalled();
	});

	it("Don't loggin under false credentials", () => {
		component = shallow(<Login isLoggedIn={false} />);
		component.find("button").simulate("click");
	});

	afterEach(() => {
		expect(component).toMatchSnapshot();
		component.unmount();
	});
});