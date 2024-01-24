import { Page } from '@playwright/test';
import { PlaywrightUtils } from './general';
import { Credential } from '../data/credentials';

export async function loginFlow(
  page: Page,
  baseUrl: string,
  credentials: Credential[]
) {
  await page.goto(baseUrl);

  // Fill in the credentials
  await PlaywrightUtils.fillFormFields(page, credentials);

  // Click on the login button
  await PlaywrightUtils.clickOnVisible(page, 'login-btn');

  // Click on the logout button
  await PlaywrightUtils.clickOnVisible(page, 'logout-btn');
}
