// import { emailAndPass, url } from '../support/data/log-inData';

//  Credentials
export const emailAndPass = [
  {
    dataCy: 'user',
    value: 'zb',
  },
  {
    dataCy: 'password',
    value: '1234',
  },
];

//  Credentials
export const url = [
  {
    value: 'https://digitalfortune-demo.netlify.app/',
  },
];

it('should log in with user credentials', () => {
  console.log(emailAndPass, '***', url);
  cy.loginFlow(url[0].value, emailAndPass);
});
