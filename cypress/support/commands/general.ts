/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      clickOnVisible(value: string): Chainable<JQuery<HTMLElement>>;
      typeIntoField(name: string, value: string): void;
      fillFormFields(fields: { dataCy: string; value: string }[]): void;
      clickFormFields(fields: { dataCy: string; value: string }[]): void;
      checkFieldValue(name: string, value: string): void;
      checkFormFields(fields: { dataCy: string; value: string }[]): void;
      checkButtonIsDisabled(name: string): Chainable<JQuery<HTMLElement>>;
      loginFlow(baseUrl, credentials): void;
      fillDate(selector: string): Chainable<JQuery<HTMLElement>>;
      fillTime(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('dataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('typeIntoField', (name: string, value: string) => {
  cy.dataCy(`${name}-field`).clear();
  cy.dataCy(`${name}-field`).type(value);
});

Cypress.Commands.add('fillFormFields', fields => {
  fields.forEach(field => {
    if (field.value !== undefined) {
      cy.typeIntoField(field.dataCy, field.value);
    }
  });
});

Cypress.Commands.add('checkFieldValue', (name: string, value: string) => {
  cy.dataCy(`${name}-field`).should('have.value', value);
});

Cypress.Commands.add('checkFormFields', fields => {
  fields.forEach(field => {
    cy.checkFieldValue(field.dataCy, field.value);
  });
});

Cypress.Commands.add('clickOnVisible', (selector: string) => {
  cy.get(`[data-cy="${selector}"]`)
    .should('be.visible')
    .should('not.be.disabled')
    .click();
});

Cypress.Commands.add('clickFormFields', (fields: { dataCy: string }[]) => {
  fields.forEach(field => {
    cy.clickOnVisible(field.dataCy);
  });
});

Cypress.Commands.add('checkButtonIsDisabled', (selector: string) => {
  return cy.get(`[data-cy='${selector}']`).should('be.disabled');
});

Cypress.Commands.add('fillDate', (selector: string) => {
  const currentDate = new Date();
  const formattedDate =
    new Intl.DateTimeFormat('en-GB').format(currentDate) + ' ';
  return cy.get(`[data-cy="${selector}-field"]`).type(formattedDate);
});

Cypress.Commands.add('fillTime', (selector: string) => {
  const currentDate = new Date();
  const formattedTime = `${currentDate.getHours()} / ${currentDate.getMinutes()} / ${currentDate.getSeconds()}`;
  return cy.get(`[data-cy="${selector}-field"]`).type(formattedTime);
});

Cypress.Commands.add('loginFlow', (baseUrl, credentials) => {
  // 1. Open App
  cy.visit(baseUrl);

  // 2. Fill "Email and Password" fields
  cy.fillFormFields(credentials);

  // 4. Click on "Login" button
  cy.dataCy('login-btn').click();
});
