import { expect } from '@playwright/test';
import { test } from '../src/fixtures/pageLogin';

test.describe('Cart Scenarios', () => {
  test('Valida que aparecen los mismos nombres y precios de los productos', async ({
    cartPage,
    inventoryPage,
  }) => {
    const { name: nameBackpackHome, price: priceBackpackHome } =
      await cartPage.getNameAndPriceProductHome('Sauce Labs Backpack');
    const { name: nameBikeHome, price: priceBikeHome } =
      await cartPage.getNameAndPriceProductHome('Sauce Labs Bike Light');
    await inventoryPage.addProductForName('Sauce Labs Backpack');
    await inventoryPage.addProductForName('Sauce Labs Bike Light');
    await cartPage.goToCar();
    const { name: nameBackpackCart, price: priceBackpackCart } =
      await cartPage.getNameAndPriceProductHome('Sauce Labs Backpack');
    const { name: nameBikeCart, price: priceBikeCart } =
      await cartPage.getNameAndPriceProductHome('Sauce Labs Bike Light');
    expect({ name: nameBackpackHome, price: priceBackpackHome }).toEqual({
      name: nameBackpackCart,
      price: priceBackpackCart,
    });
    expect({ name: nameBikeHome, price: priceBikeHome }).toEqual({
      name: nameBikeCart,
      price: priceBikeCart,
    });
  });

  test('Verifica que el contador baja correctamente', async ({
    cartPage,
    inventoryPage,
  }) => {
    await inventoryPage.addProductForName('Sauce Labs Backpack');
    await inventoryPage.addProductForName('Sauce Labs Bike Light');
    await cartPage.goToCar();
    await cartPage.removeProductCart('Sauce Labs Bike Light');
    const badge = await inventoryPage.getCartBadgeValue();
    expect(badge).toBe(1);
  });
});
