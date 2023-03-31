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
      cy.get($el).should(
        "have.css",
        "border-color",
        firstChangeColorsArr[index]
      );
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
