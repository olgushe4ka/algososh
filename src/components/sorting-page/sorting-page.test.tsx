
import { render, fireEvent, screen } from '@testing-library/react';

import App from '../app/app';

jest.setTimeout(155000);

describe("SortingPage", () => {

  const reloadFn = () => {
    window.location.reload();
  };

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });



  it('clicking "По возрастанию" button sorts the array in ascending order', async () => {
 
  reloadFn();
  const cont = render(<App />);
  const linkElementString = cont.getAllByRole("link");
  fireEvent.click(linkElementString[2]);

 const ascendingButton = screen.getByText('По возрастанию');



  fireEvent.click(ascendingButton);

  await new Promise((r) => setTimeout(r, 150000));


  const arrayElements2: any =  await screen.findAllByRole("listitem");

  for (let i = 0; i < arrayElements2.length - 1; i++) {
    expect(parseInt(arrayElements2[i].textContent)).toBeLessThanOrEqual(
      parseInt(arrayElements2[i + 1].textContent)
    );
  }
});

it('clicking "По убыванию" button sorts the array in descending order', async () => {

  reloadFn();
  const cont = render(<App />);
  const linkElementString = cont.getAllByRole("link");
  fireEvent.click(linkElementString[2]);

  const descendingButton = screen.getByText('По убыванию');


  fireEvent.click(descendingButton);

  await new Promise((r) => setTimeout(r, 150000));


  //const arrayElements:any = screen.getAllByTestId('array-element');
  const arrayElements: any =  await screen.findAllByRole("listitem");
  for (let i = 0; i < arrayElements.length - 1; i++) {
    expect(parseInt(arrayElements[i].textContent)).toBeGreaterThanOrEqual(
      parseInt(arrayElements[i + 1].textContent)
    );
  }
});
});