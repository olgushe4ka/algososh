/// <reference types="cypress" />

import { baseUrl } from "../1-app/const";

const modifiedColor = "rgb(127, 224, 81)";
const defaultColor = "rgb(0, 50, 255)";

describe("QueueComponent", function () {
  beforeEach(() => {
    cy.visit(`${baseUrl}/queue`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should add element to the stack and animates correctly", () => {
    cy.get("input").type("test");

    cy.contains("Добавить").click();
    cy.get("li div[class*=circlediv]")
      .eq(0)
      .should("have.css", "border-color", defaultColor);
    cy.get("li p[class*=text_type_circle]")
      .eq(0)
      .should("contain.text", "test");
    cy.wait(600);
    cy.get("li div[class*=circlediv]").should(
      "have.css",
      "border-color",
      defaultColor
    );

    cy.get("li").eq(0).should("contain.text", "tail");
    cy.get("li").eq(0).should("contain.text", "head");

    cy.get("input").type("test");

    cy.contains("Добавить").click();
    cy.get("li div[class*=circlediv]")
      .eq(1)
      .should("have.css", "border-color", defaultColor);
    cy.get("li p[class*=text_type_circle]")
      .eq(1)
      .should("contain.text", "test");
    cy.wait(600);
    cy.get("li div[class*=circlediv]").should(
      "have.css",
      "border-color",
      defaultColor
    );

    cy.get("li").eq(1).should("contain.text", "tail");
    cy.get("li").eq(0).should("contain.text", "head");
  });

  it("deletes element from the stack and animates correctly", () => {
    cy.get("input").type("test");
    cy.contains("Добавить").click();
    cy.get("input").type("test");
    cy.contains("Добавить").click();

    cy.contains("Удалить").click();
    cy.get("li div[class*=circlediv]")
      .eq(0)
      .should("have.css", "border-color", defaultColor);
    cy.get("li div[class*=circlediv]")
      .eq(0)
      .should("have.css", "border-color", defaultColor);

    cy.get("li p[class*=text_type_circle]").eq(1).should("contain.text", "");
    cy.get("li").eq(1).should("contain.text", "tail");
    cy.get("li").eq(1).should("contain.text", "head");
  });

  it("clears the stack correctly", () => {
    cy.get("input").type("test");
    cy.contains("Добавить").click();
    cy.get("input").type("test");
    cy.contains("Добавить").click();

    cy.get("li p[class*=text_type_circle]")
      .eq(0)
      .should("contain.text", "test");
    cy.get("li p[class*=text_type_circle]")
      .eq(1)
      .should("contain.text", "test");

    cy.get("li").eq(1).should("contain.text", "tail");

    cy.contains("Очистить").click();
    cy.get("li p[class*=text_type_circle]").eq(0).should("contain.text", "");
    cy.get("li p[class*=text_type_circle]").eq(1).should("contain.text", "");
  });
});
