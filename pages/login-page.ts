import { type Page, type Locator } from '@playwright/test';
import InventoryPage from './inventory-page';

export default class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.getByRole('textbox', {
            name: 'Password',
        });
        this.loginBtn = this.page.locator('#login-button');

    }

    // public async enterUsername(username: string) {
    //     await this.usernameInput.fill(username);
    // }

    // public async enterPassword(password: string) {
    //     await this.passwordInput.fill(password);
    // }

    // public async clickLoginBtn(){
    //     await this.loginBtn.click();
    // }

    public async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        return new InventoryPage(this.page)
    }
}