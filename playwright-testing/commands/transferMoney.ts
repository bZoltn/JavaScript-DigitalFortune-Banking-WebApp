import { Page } from '@playwright/test';
import { PlaywrightUtils } from './general';

export async function transferMoney(page: Page) {
  // 1. Fill "Transfer to" field
  await PlaywrightUtils.typeIntoField(page, 'transfer-to', 'us');

  // 2. Fill "Amount" field
  await PlaywrightUtils.typeIntoField(page, 'amount', '1000');

  // 3. Click on "Begin New Mission Simulation" button
  await page.click('[data-testid="transfer-btn"]');
}
