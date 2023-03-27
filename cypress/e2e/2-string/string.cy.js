/// <reference types="cypress" />

import { baseUrl } from "../1-app/const";


describe("StringComponent", function () {
  beforeEach(() => {
    cy.visit(`${baseUrl}/recursion`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should animate the string correctly", function () {
  
    const string = "12345";
    const firstChangeColorsArr = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const secondChangeString = "52341";
    const secondChangeColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];



    const endString = "54321";
    const endChangeColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.get("input").type(string);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get("li div[class*=circlediv]").each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      cy.get($el).contains(string[index]);
      cy.get($el).should("have.css", "border-color", firstChangeColorsArr[index]);
    });

    cy.wait(1000);

    cy.get("li div[class*=circlediv]").each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      cy.get($el).contains(secondChangeString[index]);
      cy.get($el).should(
        "have.css",
        "border-color",
        secondChangeColorsArr[index]
      );
    });

    cy.wait(1000);

    cy.get("li div[class*=circlediv]").each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      cy.get($el).contains(endString[index]);
      cy.get($el).should("have.css", "border-color", endChangeColorsArr[index]);
    });
  });
});

// describe("StringComponent", () => {
//   beforeEach(() => {
//     cy.visit(`${baseUrl}/recursion`);
//   });

//   it("disables the button when input is empty", () => {
//     cy.get("input").should("have.attr", "value", "");
//     cy.get("button[type=submit]").should("be.disabled");
//   });

//   it("enables the button when input has value", () => {
//     cy.get("input").type("hello");
//     cy.get("button[type=submit]").should("not.be.disabled");
//   });

//   it("reverses the string correctly", () => {
//     cy.get("input").type("hello");
//     cy.get("button[type=submit]").click();
//     cy.wait(1500);

//   cy.get("li p[class*=text_type_circle]").as("curcleElements");
//   cy.get("@curcleElements")

//     cy.get("@curcleElements").should("have.length", 5);
//     cy.get("@curcleElements").eq(0).should("contain.text", "o");
//     cy.get("@curcleElements").eq(1).should("contain.text", "l");
//     cy.get("@curcleElements").eq(2).should("contain.text", "l");
//     cy.get("@curcleElements").eq(3).should("contain.text", "e");
//     cy.get("@curcleElements").eq(4).should("contain.text", "h");
//   });

//   it("animates the string correctly", () => {
//     cy.get("input").type("hello");
//     cy.get("button[type=submit]").click();
//     cy.get("li div[class*=circlediv]").as("curcleElements");

//     cy.get("@curcleElements").should("have.length", 5);
//     cy.get("@curcleElements").eq(0).should("have.class", "default"); // initial state
//     cy.get("@curcleElements").eq(1).should("have.class", "default");
//     cy.get("@curcleElements").eq(2).should("have.class", "default");
//     cy.get("@curcleElements").eq(3).should("have.class", "default");
//     cy.get("@curcleElements").eq(4).should("have.class", "default");

//     cy.wait(1000); // wait for the animation to complete

//     cy.get("@curcleElements").eq(0).should("have.class", "changing"); // mid-state
//     cy.get("@curcleElements").eq(1).should("have.class", "default");
//     cy.get("@curcleElements").eq(2).should("have.class", "default");
//     cy.get("@curcleElements").eq(3).should("have.class", "default");
//     cy.get("@curcleElements").eq(4).should("have.class", "changing");

//     cy.wait(2000); // wait for the animation to complete

//     cy.get("@curcleElements").eq(0).should("have.class", "modified"); // final state
//     cy.get("@curcleElements").eq(1).should("have.class", "modified");
//     cy.get("@curcleElements").eq(2).should("have.class", "modified");
//     cy.get("@curcleElements").eq(3).should("have.class", "modified");
//     cy.get("@curcleElements").eq(4).should("have.class", "modified");
//   });

//   // it("should disable the button if the input is empty", () => {
//   //   cy.visit(`${baseUrl}/recursion`);

//   //   cy.get("input").clear();

//   //   cy.get("button[type='submit']").should("be.disabled");
//   // });

//   // it("should reverse the string correctly with animations and styles", () => {
//   //   cy.visit(`${baseUrl}/recursion`);

//   //   const inputString = "hello world";
//   //   const expectedOutputString = "dlrow olleh";

//   //   cy.get("input").type(inputString);

//   //   cy.get("button[type='submit']").should("not.be.disabled");

//   //   cy.get("button[type='submit']").click();

//   //   cy.get("Circle").then((circles) => {
//   //     const circlesText = Array.from(circles).map(
//   //       (circle) => circle.textContent
//   //     );
//   //     expect(circlesText.join("")).to.equal(inputString);
//   //   });

//   //   cy.wait(1500); // Wait for the animation to finish

//   //   cy.get("Circle").then((circles) => {
//   //     const circlesText = Array.from(circles).map(
//   //       (circle) => circle.textContent
//   //     );
//   //     expect(circlesText.join("")).to.equal(expectedOutputString);
//   //   });

//   //   cy.get("Circle").then((circles) => {
//   //     const colors = Array.from(circles).map(
//   //       (circle) => circle.style.backgroundColor
//   //     );
//   //     expect(colors).to.have.lengthOf(11); // 11 characters
//   //     expect(colors[0]).to.equal("rgb(255, 255, 255)"); // First circle should be white
//   //     expect(colors[1]).to.equal("rgb(255, 255, 0)"); // Second circle should be yellow
//   //     // ...
//   //     expect(colors[10]).to.equal("rgb(255, 255, 255)"); // Last circle should be white again
//   //   });
//   // });

//   // it('should disable the "Reverse" button if the input is empty', () => {
//   //   cy.get('input').should('have.attr', 'value', ''); // make sure the input is initially empty
//   //   cy.get('button[type="submit"]').should('be.disabled'); // make sure the "Reverse" button is disabled
//   // });

//   // it('should reverse the string and animate the letters', () => {
//   //   const input = 'Hello, world!';

//   //   cy.get('input').type(input);
//   //   cy.get('button[type="submit"]').should('not.be.disabled').click(); // enter a valid input and click the "Reverse" button

//   //   cy.get('li').should('have.length', input.length); // make sure the correct number of letters is displayed
//   //   cy.get('li:first').should('contain', input[0]).and('have.class', 'default'); // make sure the first letter is displayed and has the default color
//   //   cy.get('li:last').should('contain', input[input.length - 1]).and('have.class', 'default'); // make sure the last letter is displayed and has the default color

//   //   // simulate the animation by waiting for a fixed amount of time between each step
//   //   cy.wait(1000).then(() => {
//   //     cy.get('li:nth-child(2)').should('contain', input[1]).and('have.class', 'changing'); // make sure the second letter is displayed and has the changing color
//   //   });
//   //   cy.wait(1000).then(() => {
//   //     cy.get('li:nth-child(2)').should('have.class', 'modified'); // make sure the second letter has the modified color after it's been swapped with the second-to-last letter
//   //     cy.get('li:nth-child(3)').should('contain', input[2]).and('have.class', 'changing'); // make sure the third letter is displayed and has the changing color
//   //   });
//   //   // repeat for the remaining letters...
//   // });

// });
