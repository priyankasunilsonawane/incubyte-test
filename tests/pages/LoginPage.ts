import { expect } from '@playwright/test';
import type { Locator, Page } from 'playwright/test';
import { BASE_URL } from '../utils/constants.ts';

export class LoginPage {
  page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly errorHeading: Locator;
  readonly balanceAmount: Locator

  constructor(page: Page) {
    this.page = page;
    this.balanceAmount = page.locator(`//div[@id='overviewAccountsApp']//div//table//thead/following-sibling::tbody//tr//td[@align='right']//following-sibling::td/b`)
    this.username = page.locator('[name="username"]');
    this.password = page.locator('[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
  }

  async open() {
    await this.page.goto(`${BASE_URL}/parabank/index.htm?ConnType=JDBC`);
    await expect(this.username).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getAccountOverview() {
    await this.page.getByRole("link", { name: 'Accounts Overview' }).click();
    const balanceLocator = this.balanceAmount;
    await this.page.waitForLoadState('networkidle');
    await expect(balanceLocator).toBeVisible({ timeout: 5000 });
    const text = await balanceLocator.textContent();
    return text;
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Log Out' }).waitFor();
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }
  async assertErrorMessage(expectedText: string) {
    await expect(this.errorHeading).toBeVisible();
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }
}