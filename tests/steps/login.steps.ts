import { Given, When, Then, BeforeAll, AfterAll, Before, After, World } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { credentials } from '../testData.ts';

declare module '@cucumber/cucumber' {
  interface World {
    browser: Browser;
    page: Page;
  }
}
let loginPage: LoginPage;
let browser: Browser;

const { validCredentials, inValidCredentials, emptyCredentials } = credentials;

BeforeAll(async function () {
  browser = await chromium.launch({ 
      headless: false, 
  });
});

Before(async function (this: World) {
  this.page = await browser.newPage();
});

Given('the user is on the login page', async function (this: World) {
  loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When('the user enters valid credentials', async function () {
  await loginPage.login(validCredentials.userName, validCredentials.password);
});

Then('print the amount displayed on the page post-login.', async function () {
  const balance = await loginPage.getAccountOverview();
  console.log("balance:", balance)
});

When('the user enters invalid credentials', async function () {
  await loginPage.login(inValidCredentials.userName, inValidCredentials.password);
});

Then('an error message should be displayed', async function () {
  await loginPage.assertErrorMessage('The username and password could not be verified');
});

When('the user submits empty login form', async function () {
  await loginPage.login(emptyCredentials.userName, emptyCredentials.password);
});

Then('a validation error should be displayed', async function () {
  await loginPage.assertErrorMessage('Please enter a username and password.');
});

Given('the user is logged in', async function (this: World) {
  loginPage = new LoginPage(this.page);
  await loginPage.open();
  await loginPage.login(validCredentials.userName, validCredentials.password);
});

When('the user clicks logout', async function () {
  await loginPage.logout();
});

After(async function (this: World) {
  await this.page.close();
});

AfterAll(async function () {
  await browser.close();
});
