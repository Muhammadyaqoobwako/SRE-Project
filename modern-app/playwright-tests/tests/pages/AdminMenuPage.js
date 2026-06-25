const { expect } = require('@playwright/test');

class AdminMenuPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('text=Menu Item Manager');
    this.addButton = page.locator('text=Add New Menu Item ➕');
    this.saveButton = page.locator('text=Save Item');
    this.backButton = page.locator('text=Back to Board');
    
    // Form Inputs
    this.nameInput = page.locator('input[placeholder*="Sprite Double Blast"]');
    this.priceInput = page.locator('input[placeholder*="4.50"]');
    this.sizeInput = page.locator('input[placeholder*="300ml"]');
    this.optionsInput = page.locator('input[placeholder*="Cold, Diet"]');
    
    // Table Actions
    this.editButton = page.locator('text=✏️');
    this.deleteButton = page.locator('text=🗑️');
  }

  async clickAddMenuItem() {
    await this.addButton.click();
  }

  async selectCategory(categoryName) {
    await this.page.locator(`text=${categoryName}`).first().click();
  }

  async fillForm(name, price, size, options, category) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(price);
    await this.sizeInput.fill(size);
    await this.optionsInput.fill(options);
    if (category) {
      await this.selectCategory(category);
    }
  }

  async saveItem() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.saveButton.click()
    ]);
    return dialog;
  }

  async clickEditOnFirstItem() {
    await this.editButton.first().click();
  }

  async clickDeleteOnFirstItem() {
    // Return the confirm dialog handler
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.deleteButton.first().click()
    ]);
    return dialog;
  }
}

module.exports = { AdminMenuPage };
