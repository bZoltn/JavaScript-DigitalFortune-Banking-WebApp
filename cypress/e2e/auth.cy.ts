import { emailAndPass, url } from '../support/data/log-inData';

it('should log in with user credentials', () => {
  console.log(emailAndPass, url);
  cy.loginFlow(url[0].value, emailAndPass);
});
