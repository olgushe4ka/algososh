/// <reference types="cypress" />

import { baseUrl } from "../1-app/const";

const modifiedColor = "rgb(127, 224, 81)";
const defaultColor = "rgb(0, 50, 255)";

describe("StackComponent", function () {
  beforeEach(() => {
    cy.visit(`${baseUrl}/stack`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should add element to the stack and animates correctly", () => {
    cy.get("input").type("test");

    cy.contains("Добавить").click();

    cy.get("li p[class*=text_type_circle]").should("have.length", 1);
    cy.get("li p[class*=text_type_circle]").and("contain", "test");

    cy.get("li div[class*=circlediv]").should(
      "have.css",
      "border-color",
      modifiedColor
    );

    cy.wait(600);

    cy.get("li div[class*=circlediv]").should(
      "have.css",
      "border-color",
      defaultColor
    );
  });

  it("deletes element from the stack and animates correctly", () => {
    cy.get("input").type("test");
    cy.contains("Добавить").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 1);

    cy.contains("Удалить").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 0);

    cy.get("li p[class*=text_type_circle]").should("not.exist");
  });

  it("clears the stack correctly", () => {
    cy.get("input").type("test");
    cy.contains("Добавить").click();
    cy.get("input").type("test");
    cy.contains("Добавить").click();

    cy.get("li p[class*=text_type_circle]").should("have.length", 2);

    cy.contains("Очистить").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 0);

    cy.get("li p[class*=text_type_circle]").should("not.exist");
  });
});
