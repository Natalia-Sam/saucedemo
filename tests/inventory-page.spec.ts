import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Open main page', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(`https://www.saucedemo.com/`);
        await loginPage.login('standard_user', 'secret_sauce');
    });


    test('Add 1st item to the shopping card', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCard(0);
        const badgeCount = await inventoryPage.shoppingCardBadgeCount();
        expect(badgeCount).toBe("1");
    });

    // npx playwright test tests/inventory-page.spec.ts --ui
});