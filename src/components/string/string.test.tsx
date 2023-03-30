import { render, fireEvent, screen, getByRole } from "@testing-library/react";
import { Link, Router } from "react-router-dom";
import { StringComponent } from "./string";

// import { createMemoryHistory } from "history";
import App from "../app/app";

describe("StringComponent", () => {
  it("correctly reverses a string with even number of characters", async () => {
  
   // const history = createMemoryHistory();



   // render(<App />);
    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    // render(
    //   <Router history={history}>
    //     <StringComponent />
    //   </Router>
    // );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 4000));

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["d", "c", "b", "a"]);
  });

  it("correctly reverses a string with odd number of characters", async () => {
    
  const cont = render(<App />);
  const linkElementString = cont.getAllByRole("link");
  fireEvent.click(linkElementString[0]);
    
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "abcde" } });
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 4000));

    const circles = await screen.findAllByRole("listitem");
    expect(circles.map((c) => c.textContent)).toEqual(["e", "d", "c", "b", "a"]);
  });

  it("correctly reverses a string with one character", async () => {
    
    // const history = createMemoryHistory();
    // render(
    //   <Router history={history}>
    //     <StringComponent />
    //   </Router>
    // );

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
    // const history = createMemoryHistory();
   
    // render(
    //   <Router history={history}>
    //     <StringComponent />
    //   </Router>
    // );

    const cont = render(<App />);
    const linkElementString = cont.getAllByRole("link");
    fireEvent.click(linkElementString[0]);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /развернуть/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

   
    expect(button).toBeDisabled();

    // const circles = await screen.findAllByRole("listitem");
    // expect(circles.map((c) => c.textContent)).toEqual([]);
  });
});
