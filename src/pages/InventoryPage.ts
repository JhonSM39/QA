import { BasePage } from '../core/BasePage';
import { ProductComponent } from '../core/components/ProductComponent';
import type { Page } from '@playwright/test';

export class InventoryPage extends BasePage {
  //Localizadores
  private readonly cartContainer;
  private readonly cartBadge;
  private readonly productContainer;
  private readonly product: ProductComponent;

  //Constructor
  constructor(page: Page) {
    super(page);
    this.productContainer = page.locator('[data-test="inventory-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartContainer = page.locator('[data-test="shopping_cart_container"]');
    this.product = new ProductComponent(page);
  }

  async verifyPageLoaded() {
    await this.productContainer.first().waitFor({ state: 'visible' });
  }

  async addProductForName(productName: string) {
    await this.product.getAddProductButton(productName).click();
  }

  async getCartBadgeValue(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;

    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }
}
