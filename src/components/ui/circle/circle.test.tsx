import React from "react";
import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  it("renders correctly without letter", () => {
    const { container } = render(<Circle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with letter", () => {
    const { container } = render(<Circle letter="A" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with head", () => {
    const { container } = render(<Circle head="H" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with React element in head", () => {
    const { container } = render(
      <Circle head={<span className="test">Test</span>} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with tail", () => {
    const { container } = render(<Circle tail="T" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with React element in tail", () => {
    const { container } = render(
      <Circle tail={<span className="test">Test</span>} tailType="element" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with index", () => {
    const { container } = render(<Circle index={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with isSmall prop", () => {
    const { container } = render(<Circle isSmall={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly in default state", () => {
    const { container } = render(<Circle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly in changing state", () => {
    const { container } = render(<Circle state={ElementStates.Changing} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly in modified state", () => {
    const { container } = render(<Circle state={ElementStates.Modified} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});