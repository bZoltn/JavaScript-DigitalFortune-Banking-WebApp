import { test, expect, Page } from '@playwright/test';
import LoginPage from '../commands/login';

test.describe('Login functionality', () => {
  test('should log in successfully', async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login();
    expect(await page.locator('user-field').isVisible()).toBeTruthy();
  });
});
