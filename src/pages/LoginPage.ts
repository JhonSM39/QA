import { BasePage } from '../core/BasePage';
import { Locator, Page, expect } from '@playwright/test';
import { AssertionError } from '../errors/AssertionError';
import { logger } from '../core/logger';


export class LoginPage extends BasePage {
    //Localizadores
    private readonly usernameInput;
    private readonly passwordInput;
    private readonly loginButton;
    private readonly errorMessage;
    private readonly errorIcon;

    //Constructor
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorIcon = page.locator('.error_icon');        
    }

    async navigate() {
        const start = Date.now();
        await this.page.goto('/')
        const duration = Date.now() - start;
        logger.info(`Login page load time: ${duration}ms`);
        await expect(this.usernameInput).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.click(this.loginButton);
    }

    async loginWithoutUsername(password: string): Promise<string> {
        await this.type(this.passwordInput, password)
        await this.click(this.loginButton);
        return this.getError();
    }

    async loginWithoutPassword(username: string): Promise<string> {
        await this.type(this.usernameInput, username)
        await this.click(this.loginButton);
        return this.getError();
    }

    async loginWithoutCredentials(): Promise<string> {
        await this.usernameInput.focus();
        await this.usernameInput.blur();
        await this.passwordInput.blur();
        await this.click(this.loginButton);
        return this.getError();
    }

    async getError() {
        await expect(this.errorMessage).toHaveText(/Epic sadface/i, { timeout: 8000 });

        const message = await this.getText(this.errorMessage);
        return message;
    }

    async assertNotLoggedIn() {
        await expect(this.page).not.toHaveURL(/inventory/);
    }

    async assertErrorIconVisible() {
        await expect(this.errorIcon).toBeVisible();
    }

    async assertErrorEquals(expected: string) {
        const msg = await this.getError();
        expect(msg).toBe(expected);
    }
}