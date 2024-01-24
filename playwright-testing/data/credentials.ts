export interface Credential {
  dataTestId: string;
  value: string;
}

export const emailAndPass: Credential[] = [
  {
    dataTestId: 'user',
    value: 'test@email.com',
  },
  {
    dataTestId: 'password',
    value: '1234',
  },
];

export const url: string = 'https://digitalfortune-demo.netlify.app/';
