import { test } from '@playwright/test';
import { loginFlow } from '../commands/login';
import { emailAndPass, url } from '../data/credentials';
import { transferMoney } from '../commands/transferMoney';
import { recipient, amount } from '../data/transfer';
import { requestLoan } from '../commands/requestLoan';
import { request } from '../data/requestLoan';

test('should log in with user credentials', async ({ page }) => {
  await loginFlow(page, url, emailAndPass);
});

test('should transfer money', async ({ page }) => {
  await loginFlow(page, url, emailAndPass);
  await transferMoney(page, recipient, amount);
});

test('should request a loan', async ({ page }) => {
  await loginFlow(page, url, emailAndPass);
  await requestLoan(page, request);
});
