import { Page, Locator } from '@playwright/test';
import { emailAndPassword, url } from '../data/credentials';

class LoginPage {
  private page: Page;
  private userInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.locator('[data-testid="user"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('text=Login');
  }

  async navigate(): Promise<void> {
    await this.page.goto(url);
  }

  async login(): Promise<void> {
    for (const credential of emailAndPassword) {
      const selector = `[data-testid="${credential.dataTestId}"]`;
      await this.page.fill(selector, credential.value);
    }
    await this.submitButton.click();
  }
}

export default LoginPage;
