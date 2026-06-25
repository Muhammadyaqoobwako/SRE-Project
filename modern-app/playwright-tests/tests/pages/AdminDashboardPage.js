const { expect } = require('@playwright/test');

class AdminDashboardPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('text=Admin Sales Board');
    this.totalRevenueLabel = page.locator('text=Total Revenue').first();
    this.revenueSplitHeader = page.locator('text=Category Revenue Split');
    this.manageMenuButton = page.locator('text=Manage Menu Items 🍔');
    this.salesSummaryHeader = page.locator('text=Sales Summary');
  }

  async navigateToMenuManager() {
    await this.manageMenuButton.click();
  }
}

module.exports = { AdminDashboardPage };
