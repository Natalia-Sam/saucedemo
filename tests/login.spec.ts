import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Open main page', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(`https://www.saucedemo.com/`);
        await loginPage.login('standard_user', 'secret_sauce');
    });

    // test('Log in with standard user', async ({ loginPage, inventoryPage }) => {
    //     await loginPage.login('standard_user', 'secret_sauce');
    //     const countProducts = await inventoryPage.countItemsOnInventoryPage();
    //     await expect(countProducts).toEqual(6);
    // });

    test('Verify that the inventory page displays 6 items', async ({ inventoryPage }) => {
        const countProducts = await inventoryPage.countItemsOnInventoryPage();
        await expect(countProducts).toEqual(6);
    });

    // npx playwright test tests/login.spec.ts --ui
});