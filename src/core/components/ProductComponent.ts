import type { Page, Locator} from "@playwright/test";

export class ProductComponent {
    constructor (private readonly page: Page) {}

    private getProduct(productName: string): Locator {
        return this.page.locator(
            `[data-test="inventory-item"]:has([data-test="inventory-item-name"]:has-text("${productName}"))`
        );
    }

    getAddProductButton(productName: string) {
        return this.getProduct(productName).locator('[data-test^="add-to-cart"]');
    }

    getRemoveProductButton(productName: string) {
        return this.getProduct(productName).locator('[data-test^="remove"]');
    }

    async getNameAndPrice(productName: string) {
        const product = this.getProduct(productName);
        const name = (await product.locator('[data-test="inventory-item-name"]').textContent())?.trim() || '';
        const price = (await product.locator('[data-test="inventory-item-price"]').textContent())?.trim() || '';
        return { name, price };
    }
}