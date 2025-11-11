import { Page, Locator, expect } from '@playwright/test';
import { logger } from './logger';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async click(element: Locator) {
    try {
      await element.waitFor({ state: 'visible', timeout: 5000 });

      // Scroll para evitar overlays
      await element.scrollIntoViewIfNeeded();

      // Esperar que NO esté cubierto
      await expect(element).toBeEnabled();
      await expect(element).toBeEnabled();

      // No uses trial en Safari/WebKit
      await element.click();
    } catch {
      logger.warn('Retrying click with force due to WebKit issues...');
      await this.page.waitForTimeout(300);
      await element.click();
    }
  }

  protected async type(element: Locator, text: string) {
    logger.info(`Typing "${text}" into ${element}`);
    await element.waitFor({ state: 'visible' });
    await element.fill(text);
  }

  protected async getText(element: Locator): Promise<string> {
    const text = (await element.textContent())?.trim();
    logger.info(`Obtained text: ${text}`);
    return text || '';
  }

  protected async attachScreenshot(name: string = 'error-state') {
    if (this.page.isClosed()) {
      return;
    }

    await this.page.screenshot({
      path: `screenshots/${Date.now()}-${name}.png`,
      fullPage: true,
    });
  }
}
