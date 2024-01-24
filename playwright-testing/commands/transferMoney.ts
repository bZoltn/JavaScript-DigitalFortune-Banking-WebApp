import { Page } from '@playwright/test';
import { PlaywrightUtils } from './general';

export async function transferMoney(page: Page, recipient, amount) {
  // Fill "Transfer to" field
  await PlaywrightUtils.typeIntoField(
    page,
    recipient.dataTestId,
    recipient.value
  );

  // Fill "Amount" field
  await PlaywrightUtils.typeIntoField(page, amount.dataTestId, amount.value);

  // Click on "Transfer" button
  await PlaywrightUtils.clickOnVisible(page, 'transfer-btn');

  // Click on the logout button
  await PlaywrightUtils.clickOnVisible(page, 'logout-btn');
}
