import { Page, expect } from '@playwright/test';

export class PlaywrightUtils {
  static async dataTestId(page: Page, selector: string) {
    return page.locator(`[data-testid="${selector}"]`);
  }

  static async typeIntoField(page: Page, name: string, value: string) {
    const field = await this.dataTestId(page, `${name}-field`);
    await field.fill(value);
  }

  static async fillFormFields(
    page: Page,
    fields: { dataTestId: string; value: string }[]
  ) {
    for (const field of fields) {
      await this.typeIntoField(page, field.dataTestId, field.value);
    }
  }

  static async clickOnVisible(page: Page, selector: string) {
    const element = await this.dataTestId(page, selector);
    await element.click();
  }

  static async checkFieldValue(page: Page, name: string, value: string) {
    const field = await this.dataTestId(page, `${name}-field`);
    await expect(field).toHaveValue(value);
  }

  static async checkButtonIsDisabled(page: Page, selector: string) {
    const button = await this.dataTestId(page, selector);
    await expect(button).toBeDisabled();
  }
}
