import { expect } from "@playwright/test";
import { test } from "../src/fixtures/pageLogin";

test.describe('Overview Scenarios', () => {
    test('Valida nombres, precios individuales por product, suma total del pedido y precio total con el tax incluido', async ({cartPage, checkoutPage, inventoryPage, overviewPage}) => {
        await inventoryPage.addProductForName('Sauce Labs Backpack');
        await inventoryPage.addProductForName('Sauce Labs Bike Light');
        await cartPage.goToCar();
        const { name: nameBackpackHome, price: priceBackpackHome } =
        await cartPage.getNameAndPriceProductHome('Sauce Labs Backpack');
        const { name: nameBikeHome, price: priceBikeHome } =
        await cartPage.getNameAndPriceProductHome('Sauce Labs Bike Light');
        await checkoutPage.goToCheckout();
        await checkoutPage.sendInformationCheckout("Jhon", "Sanchez", "101110");
        await overviewPage.goToOverview();
        const { name: nameBackpackOverview} = await cartPage.getNameAndPriceProductHome('Sauce Labs Backpack');
        const { name: nameBikeOverview } = await cartPage.getNameAndPriceProductHome('Sauce Labs Bike Light');
        const priceTotalCheckout = Number(priceBackpackHome) + Number(priceBikeHome);
        expect(nameBackpackHome).toEqual(nameBackpackOverview);
        expect(nameBikeHome).toEqual(nameBikeOverview);
        console.log("TOTAL PRICE =>", priceTotalCheckout, priceBackpackHome, priceBikeHome);
        const priceTotalOverview = await overviewPage.ordenTotalPriceOverview();
        expect(priceTotalCheckout).toBe(priceTotalOverview);
        const { tax, totalPriceTax } = await overviewPage.getTotalPriceAndTax();
        const total = priceTotalCheckout + tax;
        expect(total).toBe(totalPriceTax);
    })
})