import { Page } from '@playwright/test';
import { PlaywrightUtils } from './general';

export async function requestLoan(page: Page, request) {
  // Fill "Request loan" field
  await PlaywrightUtils.typeIntoField(page, request.dataTestId, request.value);

  // Click on "Transfer" button
  await PlaywrightUtils.clickOnVisible(page, 'transfer-btn');

  // Click on the logout button
  await PlaywrightUtils.clickOnVisible(page, 'logout-btn');
}
