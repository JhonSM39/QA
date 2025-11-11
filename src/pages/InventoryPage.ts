import { BasePage } from '../core/BasePage';
import type { Page } from '@playwright/test';

export class InventoryPage extends BasePage {
  //Localizadores
  private readonly cartContainer;
  private readonly cartBadga;
  private readonly productContainer;

  //Constructor
  constructor(page: Page) {
    super(page);
    this.productContainer = page.locator('[data-test="inventory-container"]');
    this.cartBadga = page.locator('[data-test="shopping-cart-badge"]');
    this.cartContainer = page.locator('[data-test="shopping_cart_container"]');
  }

  async verifyPageLoaded() {
    await this.productContainer.first().waitFor({ state: 'visible' });
  }

  async addProductForName(productName: string) {
    const addProductForName = this.page.locator(
      `[data-test="inventory-item"]:has([data-test="inventory-item-name"]:has-text("${productName}")) [data-test^="add-to-cart"]`
    );
    await addProductForName.click();
  }

  async getCartBadgeValue(): Promise<number> {
    if ((await this.cartBadga.count()) === 0) return 0;

    const text = await this.cartBadga.innerText();
    return parseInt(text, 10);
  }
}
