import { BasePage } from "../core/BasePage";
import type { Page } from "@playwright/test";

export class OverviewPage extends BasePage {
    //Localizadores
    private readonly continueOverview;
    private readonly totalPriceWithoutTax;
    private readonly tax;
    private readonly totalPriceTax;


    constructor(page: Page) {
        super(page);
        this.continueOverview = page.locator('[data-test="continue"]');
        this.totalPriceWithoutTax = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPriceTax = page.locator('[data-test="total-label"]');
    }

    async getTotalPriceAndTax() {
        const rawTax = await this.getText(this.tax);
        const rawTotal = await this.getText(this.totalPriceTax);

        return {
            tax: this.extractNumber(rawTax),
            totalPriceTax: this.extractNumber(rawTotal)
        };
    }

    async ordenTotalPriceOverview(): Promise<number> {
        const raw = await this.getText(this.totalPriceWithoutTax);
        console.log("RAW TOTAL PRICE (sin procesar) =>", raw);
        const extracted = this.extractNumber(raw);
        console.log("TOTAL PRICE EXTRAÍDO =>", extracted);
        return extracted;
    }

    private extractNumber(text: string): number {
        return Number(text.replace(/[^0-9.]/g, ""));
    }

    async goToOverview() {
        await this.click(this.continueOverview);
    }
}


