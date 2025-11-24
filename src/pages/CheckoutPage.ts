import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";

export class CheckoutPage extends BasePage {
    //Localizadores
    private readonly checKout;
    private readonly firstName;
    private readonly lastName;
    private readonly postalCode;
    private readonly continueOverview;
    private readonly errorMessage;

    constructor(page: Page) {
        super(page);
        this.checKout = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueOverview = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goToCheckout() {
        await this.click(this.checKout);
    }

    async sendInformationCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.sendText(this.firstName, firstName);
        await this.sendText(this.lastName, lastName);
        await this.sendText(this.postalCode, postalCode);
    }

    async sendInformationCheckoutwithoutData(firstName: string, lastName: string, postalCode: string): Promise<string> {
        await this.sendText(this.firstName, firstName);
        await this.sendText(this.lastName, lastName);
        await this.sendText(this.postalCode, postalCode);
        await this.click(this.continueOverview);
        return this.getError()        
    }

    async getError(): Promise<string> {
        await expect(this.errorMessage).toBeVisible({ timeout: 8000 });
        const message = await this.getText(this.errorMessage);
        return message;
    }

}