import { test as base } from '@playwright/test';
import LoginPage from './pages/login-page';
import InventoryPage from './pages/inventory-page';

export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}>({
    /** @type { LoginPage } */
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    /** @type { InventoryPage } */
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
});
