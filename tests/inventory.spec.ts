import { test, expect } from '../src/fixtures/pages';

test.describe('Inventory Scenarios', () => {
  test('Agregar 2 productos y validar el badge', async ({ inventoryPage, loginPage }) => {
    const username = process.env.STD_USER!;
    const password = process.env.STD_PASS!;
    await loginPage.login(username, password);
    await inventoryPage.verifyPageLoaded();

    await inventoryPage.addProductForName('Sauce Labs Backpack');
    await inventoryPage.addProductForName('Sauce Labs Bike Light');

    const badge = await inventoryPage.getCartBadgeValue();
    expect(badge).toBe(2);
  });
});
