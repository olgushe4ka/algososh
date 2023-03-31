import { render, fireEvent, screen, getByRole } from "@testing-library/react";
import App from "../app/app";



describe("StringComponent", () => {

  jest.setTimeout(15000);

  const reloadFn = () => {
    window.location.reload();
  };

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  it("correctly reverses a string with even number of characters", async () => {
    reloadFn();
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 4000));

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["d", "c", "b", "a"]);
  });

  it("correctly reverses a string with odd number of characters", async () => {
    reloadFn();
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    const input = screen.getByRole("textbox");
    // const input = document.getElementsByClassName("input");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcde" } });
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 4000));

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual([
      "e",
      "d",
      "c",
      "b",
      "a",
    ]);
  });

  it("correctly reverses a string with one character", async () => {
    reloadFn();
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 4000));

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["a"]);
  });

  it("correctly handles an empty string", async () => {
    reloadFn();
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
      });
      
});
