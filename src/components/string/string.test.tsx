import { render, fireEvent, screen } from "@testing-library/react";
import { StringComponent } from "./string";

describe("StringComponent", () => {
  it("correctly reverses a string with even number of characters", async () => {
    render(<StringComponent />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["d", "c", "b", "a"]);
  });

  it("correctly reverses a string with odd number of characters", async () => {
    render(<StringComponent />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcde" } });
    fireEvent.click(button);

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["e", "d", "c", "b", "a"]);
  });

  it("correctly reverses a string with one character", async () => {
    render(<StringComponent />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.click(button);

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["a"]);
  });

  it("correctly handles an empty string", async () => {
    render(<StringComponent />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual([]);
  });
});