import { Page } from '@playwright/test';

export async function transferMoney(page: Page) {
  // 1. Fill "Transfer to" field
  await page.fill('[data-testid="transfer-to"]', 'us');

  // 2. Fill "Amount" field
  await page.fill('[data-testid="amount"]', '1000');

  // 3. Click on "Begin New Mission Simulation" button
  await page.click('[data-testid="transfer-btn"]');
}
