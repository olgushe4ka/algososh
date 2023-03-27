/// <reference types="cypress" />

import { baseUrl } from "../1-app/const";

const modifiedColor = "rgb(127, 224, 81)";
const defaultColor = "rgb(0, 50, 255)";

describe("ListComponent", function () {
  beforeEach(() => {
    cy.visit(`${baseUrl}/list`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("contains default list", function () {
    cy.get("li p[class*=text_type_circle]").should("have.length", 4);
  });

  it("should add element to head correctly", () => {
    cy.get('input[placeholder*="Введите значение"]').type("test");

    cy.get("button").contains("Добавить в head").click();

    cy.get("li p[class*=text_type_circle]")
      .eq(0)
      .should("contain.text", "test");

    cy.get("li").eq(0).should("contain.text", "head");
  });

  it("should add element to tail correctly", () => {
    cy.get('input[placeholder*="Введите значение"]').type("test");

    cy.get("button").contains("Добавить в tail").click();

    cy.get("li p[class*=text_type_circle]")
      .eq(4)
      .should("contain.text", "test");

    cy.get("li").eq(4).should("contain.text", "tail");
  });

  it("should add element by index correctly", () => {
    cy.get('input[placeholder*="Введите значение"]').type("test");
    cy.get('input[placeholder*="Введите индекс"]').type("2");

    cy.get("button").contains("Добавить по индексу").click();

    cy.get("li p[class*=text_type_circle]")
      .eq(2)
      .should("contain.text", "test");
  });

  it("deletes element from head correctly", () => {
    cy.get('input[placeholder*="Введите значение"]').type("test");
    cy.get("button").contains("Добавить в head").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 5);

    cy.get("button").contains("Удалить из head").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 4);
    cy.get("li p[class*=text_type_circle]").eq(1).should("contain.text", "1");
    cy.get("li").eq(0).should("contain.text", "head");
  });

  it("deletes element from tail correctly", () => {
    cy.get("li p[class*=text_type_circle]").should("have.length", 4);
    cy.get("button").contains("Удалить из tail").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 3);
    cy.get("li p[class*=text_type_circle]").eq(2).should("contain.text", "4");
    cy.get("li").eq(2).should("contain.text", "tail");
  });

  
  it("deletes element by index correctly", () => {
    cy.get("li p[class*=text_type_circle]").should("have.length", 4);

    cy.get('input[placeholder*="Введите индекс"]').type("2");
    cy.get("button").contains("Удалить по индексу").click();
    cy.get("li p[class*=text_type_circle]").should("have.length", 3);
   
  });

});
