// credentials.ts
export interface Credential {
  dataTestId: string;
  value: string;
}

export const emailAndPass: Credential[] = [
  {
    dataTestId: 'user',
    value: 'zb',
  },
  {
    dataTestId: 'password',
    value: '1234',
  },
];

export const url: string = 'https://digitalfortune-demo.netlify.app/';
