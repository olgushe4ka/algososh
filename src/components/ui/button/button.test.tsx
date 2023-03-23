import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
    it("renders a button with text", () => {
      const { container } = render(<Button text="Click me" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  
    it("renders a button without text", () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toMatchSnapshot();
    });
  
    it("renders a disabled button", () => {
      const { container } = render(<Button disabled={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  
    it("calls the onClick function when the button is clicked", () => {
      const handleClick = jest.fn();
      const { getByText } = render(<Button text="Click me" onClick={handleClick} />);
      fireEvent.click(getByText("Click me"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });