/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      transferMoney(): void;
    }
  }
}

// *******************  Simulation Setup / Mission Name  *******************
Cypress.Commands.add('transferMoney', () => {
  // 1. Fill "Transfer to" field
  cy.typeIntoField('transfer-to', 'us');

  // 2. Fill "Password" field
  cy.typeIntoField('amount', '1000');

  // 3. Click on "Begin New Mission Simulation" button
  cy.clickOnVisible('transfer-btn');
});
