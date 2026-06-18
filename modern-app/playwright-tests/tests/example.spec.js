const { test, expect } = require('@playwright/test');

test.describe('Modernization Dashboard Verification', () => {

  test('Verify dashboard loads successfully [KAN-3]', async ({ page }) => {
    // Navigate to the React dashboard (dev server should be running on localhost:3000)
    await page.goto('/');

    // Verify the title or main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toContainText('Enterprise Modernization Dashboard');
  });

  test('Form validation error triggers alert [KAN-3]', async ({ page }) => {
    // Navigate to the React dashboard
    await page.goto('/');

    // Intentionally assert an incorrect heading to cause a test failure
    // This is used to test the auto-Jira bug creation and duplicate prevention!
    const heading = page.locator('h1');
    await expect(heading).toContainText('Non-existent Dashboard Title');
  });

});
