import React from "react";
import { shallow } from "enzyme";
import Invited from "../../../components/Inviting/Invited";

let component;

describe("Invited Component", () => {
	let wrapper;

	it("should render correctly in \"debug\" mode", () => {
		component = shallow(<Invited debug match={{params: {userId: "yes"}}} />);
	});
});