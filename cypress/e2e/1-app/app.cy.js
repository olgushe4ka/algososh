/// <reference types="cypress" />

import { baseUrl } from "./const";

describe("Application work check", () => {
  it("App should be available", () => {
    cy.visit(baseUrl);
    cy.contains("МБОУ АЛГОСОШ");
  });
});

describe("Routing test", () => {
  it("should navigate to all algorithm pages", () => {
    cy.visit(baseUrl);
    cy.contains("МБОУ АЛГОСОШ").click();
    cy.url().should("include", "/");

    cy.visit(baseUrl);
    cy.get("a[href='/fibonacci']").click();
    cy.url().should("include", "/fibonacci");

    cy.visit(baseUrl);
    cy.get("a[href='/sorting']").click();
    cy.url().should("include", "/sorting");

    cy.visit(baseUrl);
    cy.get("a[href='/stack']").click();
    cy.url().should("include", "/stack");

    cy.visit(baseUrl);
    cy.get("a[href='/queue']").click();
    cy.url().should("include", "/queue");

    cy.visit(baseUrl);
    cy.get("a[href='/list']").click();
    cy.url().should("include", "/list");
  });



  



});
