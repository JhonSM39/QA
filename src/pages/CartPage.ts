import { BasePage } from '../core/BasePage';
import { ProductComponent } from '../core/components/ProductComponent';
import type { Page } from '@playwright/test';

export class CartPage extends BasePage {
  //Localizadores
  private readonly cart;
  private readonly product: ProductComponent;

  constructor(page: Page) {
    super(page);
    this.cart = page.locator('#shopping_cart_container');
    this.product = new ProductComponent(page);
  }

  async getNameAndPriceProductHome(
    productName: string
  ): Promise<{ name: string; price: number }> {
    const { name, price } = await this.product.getNameAndPrice(productName);

    return {
      name: name?.trim() || '',
      price: this.extractNumber(price)  // <--- limpia aquí
    };
  }

  private extractNumber(text: string): number {
      return Number(text.replace(/[^0-9.]/g, ""));
  }

  async removeProductCart(productName: string) {
    await this.product.getRemoveProductButton(productName).click();
  }

  async goToCar() {
    await this.click(this.cart);
  }
}
