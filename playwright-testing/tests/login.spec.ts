import { test } from '@playwright/test';
import { loginFlow } from '../commands/login';
import { emailAndPass, url } from '../data/credentials';

test('should log in with user credentials', async ({ page }) => {
  await loginFlow(page, url, emailAndPass);
});
