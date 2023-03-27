/// <reference types="cypress" />

import { baseUrl } from "../1-app/const";

describe("FibonacchiComponent", function () {
  beforeEach(() => {
    cy.visit(`${baseUrl}/fibonacci`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should animate correctly", function () {
    const string = "4";

    const endArray = [1, 1, 2, 3, 5];

    cy.get("input").type(string);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.wait(4000);
    cy.get("li p[class*=text_type_circle]").as("curcleElements");

    cy.get("@curcleElements").should("have.length", 5);

    cy.get("@curcleElements").eq(0).should("contain.text", endArray[0]);
    cy.get("@curcleElements").eq(1).should("contain.text", endArray[1]);
    cy.get("@curcleElements").eq(2).should("contain.text", endArray[2]);
    cy.get("@curcleElements").eq(3).should("contain.text", endArray[3]);
    cy.get("@curcleElements").eq(4).should("contain.text", endArray[4]);
  });
});
