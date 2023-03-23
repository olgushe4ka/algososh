
import { render, screen, fireEvent } from "@testing-library/react";
import { SortingPage } from "./sorting-page";

describe("SortingPage", () => {
  it("correctly sorts an empty array", async () => {
    render(<SortingPage />);
    const upButton = screen.getByText("По возрастанию");
    fireEvent.click(upButton);
    const array = await screen.findAllByTestId("array-item");
    expect(array).toHaveLength(0);
  });

  it("correctly sorts an array with one element", async () => {
    render(<SortingPage />);
    const upButton = screen.getByText("По возрастанию");
    fireEvent.click(upButton);
    const array = await screen.findAllByTestId("array-item");
    expect(array).toHaveLength(1);
  });

  it("correctly sorts an array with multiple elements", async () => {
    render(<SortingPage />);
    const upButton = screen.getByText("По возрастанию");
    fireEvent.click(upButton);
    const array = await screen.findAllByTestId("array-item");
    const values = array.map((el) => parseInt(el.textContent!));
    expect(values).toEqual([...values].sort());
  });
});