const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder*="username"]');
    this.passwordInput = page.locator('input[placeholder*="password"]');
    this.loginButton = page.getByText('Login', { exact: true });
    this.titleText = page.locator('text=Debonairs Pizza');
    this.subTitleText = page.locator('text=Cashier Portal Login');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    // Set up dialog handler
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.loginButton.click()
    ]);
    return dialog;
  }

  async getTitleText() {
    return this.titleText;
  }
}

module.exports = { LoginPage };
