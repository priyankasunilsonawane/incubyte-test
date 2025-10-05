import { test, expect } from '@playwright/test';

test('Valid login with correct credentials', async ({ page }) => {
  const url = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";
  await page.goto(url);
  await expect(page).toHaveURL(url);
  await expect(page.locator(`[name="username"]`)).toBeVisible()
  await page.locator(`[name="username"]`).fill("Priyanka");
  await expect(page.locator(`[name="password"]`)).toBeVisible()
  await page.locator(`[name="password"]`).fill("12345@abcd");
  await expect(page.getByRole(`button`, { name: "Log In" })).toBeVisible()
  await page.getByRole(`button`, { name: "Log In" }).click();
  const text = await page.locator(`#overviewAccountsApp td[align="right"] b`).textContent();
  const total = await page.locator(`//div[@id='overviewAccountsApp']//div//table//thead/following-sibling::tbody//tr//td[@align='right']//following-sibling::td/b`).textContent();
  console.log("Total amount is :", text, total);
});

test('Invalid password should show error', async ({ page }) => {
  const url = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";
  await page.goto(url);
  await expect(page).toHaveURL(url);
  await expect(page.locator(`[name="username"]`)).toBeVisible()
  await page.locator(`[name="username"]`).fill("PriyankaS");
  await expect(page.locator(`[name="password"]`)).toBeVisible()
  await page.locator(`[name="password"]`).fill("12345@abcd");
  await expect(page.getByRole(`button`, { name: "Log In" })).toBeVisible()
  await page.getByRole(`button`, { name: "Log In" }).click();
  await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  await expect(page.getByText('The username and password could not be verified')).toBeVisible();
});

test('Empty fields should show validation errors', async ({ page }) => {
  const url = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";
  await page.goto(url);
  await expect(page).toHaveURL(url);
  await expect(page.locator(`[name="username"]`)).toBeVisible()
  await page.locator(`[name="username"]`).fill("");
  await expect(page.locator(`[name="password"]`)).toBeVisible()
  await page.locator(`[name="password"]`).fill("");
  await expect(page.getByRole(`button`, { name: "Log In" })).toBeVisible()
  await page.getByRole(`button`, { name: "Log In" }).click();
  await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  await expect(page.getByText('Please enter a username and password.')).toBeVisible();
});

test('User should be able to logout successfully', async ({ page }) => {

  const url = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";
  await page.goto(url);
  await expect(page).toHaveURL(url);
  await expect(page.locator(`[name="username"]`)).toBeVisible()
  await page.locator(`[name="username"]`).fill("Priyanka");
  await expect(page.locator(`[name="password"]`)).toBeVisible()
  await page.locator(`[name="password"]`).fill("12345@abcd");
  await expect(page.getByRole(`button`, { name: "Log In" })).toBeVisible()
  await page.getByRole(`button`, { name: "Log In" }).click();
  await page.getByRole(`link`, { name: "Log Out" }).click();
  await expect(page).toHaveURL(url);
});

