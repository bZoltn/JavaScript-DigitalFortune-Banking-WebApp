import { emailAndPass, url } from '../support/data/log-inData';

beforeEach(() => {
  cy.loginFlow(url[0].value, emailAndPass);
});

it('should transfer money to us', () => {
  cy.transferMoney();
});
