const { test, expect } = require('@playwright/test');

test.describe('Modernized Fast-Food System Frontend E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the React Native Web frontend
    await page.goto('/');
  });

  test('Verify Login Screen loads successfully [KAN-3]', async ({ page }) => {
    // Verify the title "Debonairs Pizza" is displayed (since it is a Text component, we look for its content)
    await expect(page.locator('text=Debonairs Pizza')).toBeVisible();
    await expect(page.locator('text=Cashier Portal Login')).toBeVisible();

    // Verify username and password fields are visible via their placeholders
    const usernameInput = page.locator('input[placeholder*="username"]');
    const passwordInput = page.locator('input[placeholder*="password"]');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('Verify Cashier Login flow with correct credentials [KAN-3]', async ({ page }) => {
    const usernameInput = page.locator('input[placeholder*="username"]');
    const passwordInput = page.locator('input[placeholder*="password"]');
    const loginButton = page.getByText('Login', { exact: true });

    // Fill in credentials
    await usernameInput.fill('dorry');
    await passwordInput.fill('dorry');

    // Setup dialog listener and click login concurrently
    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      loginButton.click()
    ]);

    expect(dialog.message()).toContain('WELCOME TO');
    await dialog.accept();

    // Verify transition to Home screen (welcome text and cashier username)
    await expect(page.locator('text=Welcome back,')).toBeVisible();
    await expect(page.locator('text=dorry')).toBeVisible();
  });

  test('Verify Navigation to Admin Board [KAN-3]', async ({ page }) => {
    // Log in first
    const usernameInput = page.locator('input[placeholder*="username"]');
    const passwordInput = page.locator('input[placeholder*="password"]');
    const loginButton = page.getByText('Login', { exact: true });

    await usernameInput.fill('dorry');
    await passwordInput.fill('dorry');

    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      loginButton.click()
    ]);
    await dialog.accept();

    // Click on Admin Board option
    const adminBoardBtn = page.locator('text=Admin Board');
    await expect(adminBoardBtn).toBeVisible();
    await adminBoardBtn.click();

    // Verify Admin Sales Board screen loads
    await expect(page.locator('text=Admin Sales Board')).toBeVisible();
    await expect(page.locator('text=Total Revenue').first()).toBeVisible();
    await expect(page.locator('text=Category Revenue Split')).toBeVisible();
  });

  test('Form validation error triggers alert [KAN-3]', async ({ page }) => {
    // Intentionally trigger a validation alert by entering incorrect credentials
    const usernameInput = page.locator('input[placeholder*="username"]');
    const passwordInput = page.locator('input[placeholder*="password"]');
    const loginButton = page.getByText('Login', { exact: true });

    await usernameInput.fill('dorry');
    await passwordInput.fill('wrongpassword');

    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      loginButton.click()
    ]);
    expect(dialog.message()).toContain('INVALID PASSWORD OR USERNAME');
    await dialog.accept();
  });

});
