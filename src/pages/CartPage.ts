import { BasePage } from '../core/BasePage';
import type { Page } from '@playwright/test';

export class CartPage extends BasePage {
  //Localizadores
  private readonly cart;

  constructor(page: Page) {
    super(page);
    this.cart = page.locator('#shopping_cart_container');
  }

  async getNameAndPriceProductHome(
    productName: string
  ): Promise<{ name: string; price: string }> {
    const productLocator = this.page.locator(
      `[data-test="inventory-item"]:has([data-test="inventory-item-name"]:has-text("${productName}"))`
    );

    const priceLocator = productLocator.locator('[data-test="inventory-item-price"]');
    const nameLocator = productLocator.locator('[data-test="inventory-item-name"]');
    const nameProductText = await nameLocator.textContent();
    const priceProductText = await priceLocator.textContent();
    return {
      name: nameProductText?.trim() || '',
      price: priceProductText?.trim() || '',
    };
  }

  async removeProductCart(productName: string) {
    const removeProduct = this.page.locator(
      `[data-test="inventory-item"]:has([data-test="inventory-item-name"]:has-text("${productName}")) [data-test="remove-sauce-labs-bike-light"]`
    );
    await removeProduct.click();
  }

  async goToCar() {
    await this.click(this.cart);
  }
}
