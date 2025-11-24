import { expect } from "@playwright/test";
import { test } from "../src/fixtures/pageLogin";
import { ERRORS } from "../src/config/errors";

test.describe('Checkout Scenarios', () => {
    test('Checkout con todo sus datos', async ({ checkoutPage, inventoryPage, cartPage }) => {
        await inventoryPage.addProductForName('Sauce Labs Backpack');
        await inventoryPage.addProductForName('Sauce Labs Bike Light');
        await cartPage.goToCar();
        await checkoutPage.goToCheckout();
        await checkoutPage.sendInformationCheckout("Jhon", "Sacnhez", "101110");        
    });

    test('Checkout sin firstName', async ({ checkoutPage, inventoryPage, cartPage }) =>{
        await inventoryPage.addProductForName('Sauce Labs Backpack');
        await inventoryPage.addProductForName('Sauce Labs Bike Light');
        await cartPage.goToCar();
        await checkoutPage.goToCheckout();
        const msgError = await checkoutPage.sendInformationCheckoutwithoutData("", "Sanchez", "101110");
        expect(msgError).toBe(ERRORS.firstNameRequired);
    });

    test('Checkout sin LasttName', async ({ checkoutPage, inventoryPage, cartPage }) =>{
        await inventoryPage.addProductForName('Sauce Labs Backpack');
        await inventoryPage.addProductForName('Sauce Labs Bike Light');
        await cartPage.goToCar();
        await checkoutPage.goToCheckout();
        const msgError = await checkoutPage.sendInformationCheckoutwithoutData("Jhon", "", "101110");
        expect(msgError).toBe(ERRORS.lastNameRequired);
    });

    test('Checkout sin postalCode', async ({ checkoutPage, inventoryPage, cartPage }) =>{
        await inventoryPage.addProductForName('Sauce Labs Backpack');
        await inventoryPage.addProductForName('Sauce Labs Bike Light');
        await cartPage.goToCar();
        await checkoutPage.goToCheckout();
        const msgError = await checkoutPage.sendInformationCheckoutwithoutData("Jhon", "Sanchez", "");
        expect(msgError).toBe(ERRORS.postalCodeRequired);
    })
})