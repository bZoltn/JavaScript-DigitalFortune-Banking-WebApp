import { test } from '@playwright/test';
import { loginFlow } from '../commands/login';
import { emailAndPass, url } from '../data/credentials';
import { transferMoney } from '../commands/transferMoney';

test('should log in with user credentials', async ({ page }) => {
  await loginFlow(page, url, emailAndPass);
});

test('money transfer test', async ({ page }) => {
  await transferMoney(page);
});
