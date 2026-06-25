const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.welcomeText = page.locator('text=Welcome back,');
    this.cashierName = page.locator('text=dorry');
    this.adminBoardButton = page.locator('text=Admin Board');
    this.categoriesMenuHeader = page.locator('text=Categories Menu');
    this.sessionActivityHeader = page.locator('text=Session Activity');
    this.syncBar = page.locator('text*="Offline Orders Queue"');
    this.logoutButton = page.getByText('LOGOUT / EXIT', { exact: true });
  }

  async navigateToAdminBoard() {
    await this.adminBoardButton.click();
  }

  async getCategoryCard(categoryName) {
    return this.page.locator(`text=${categoryName}`).first();
  }

  async clickCategory(categoryName) {
    await (await this.getCategoryCard(categoryName)).click();
  }
}

module.exports = { HomePage };
