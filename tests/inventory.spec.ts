import { test, expect } from '../src/fixtures/pages';

test.describe('Inventory Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    const username = process.env.STD_USER;
    const password = process.env.STD_PASS;
    if (!username || !password)
      throw new Error('La variable de entorno STD_USER o STD_PASS no está definida');

    await loginPage.login(username, password);
  });

  test('Agregar 2 productos y validar el badge', async ({ inventorPage }) => {
    await inventorPage.verifyPageLoaded();

    await inventorPage.addProductForName('Sauce Labs Backpack');
    await inventorPage.addProductForName('Sauce Labs Bike Light');

    const badge = await inventorPage.getCartBadgeValue();
    expect(badge).toBe(2);
  });
});
